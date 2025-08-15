import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Star, 
  QrCode, 
  MessageCircle,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  BarChart3
} from 'lucide-react';
import { api, supabase } from '../utils/supabase/client';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<any>({});
  const [berater, setBerater] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddBerater, setShowAddBerater] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (session?.access_token) {
          const [analyticsData, beraterData] = await Promise.all([
            api.getAnalytics(session.access_token),
            api.getBerater()
          ]);

          setAnalytics(analyticsData);
          setBerater(Array.isArray(beraterData) ? beraterData : []);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleCreateBerater = async (beraterData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        alert('Authentifizierung erforderlich');
        return;
      }

      const newBerater = await api.createBerater(beraterData, session.access_token);
      if (!newBerater.error) {
        setBerater(prev => [...prev, newBerater]);
        setShowAddBerater(false);
        alert('Berater erfolgreich erstellt!');
      } else {
        alert('Fehler beim Erstellen des Beraters: ' + newBerater.error);
      }
    } catch (error) {
      console.error('Error creating berater:', error);
      alert('Fehler beim Erstellen des Beraters');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin-Zugang</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um das Admin-Dashboard zu verwenden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate('home')} className="w-full">
              Zur Startseite
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Übersicht', icon: BarChart3 },
    { id: 'berater', name: 'Berater', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('home')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-2xl">Admin Dashboard</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Angemeldet als: {user.user_metadata?.name || user.email}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Berater gesamt</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analytics.totalBerater || berater.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Bewertungen</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analytics.totalReviews || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">QR-Codes</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analytics.totalQRCodes || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">QR-Scans</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analytics.totalQRScans || 0}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Aktuelle Aktivitäten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge variant="secondary">Neu</Badge>
                    <span>System wurde initialisiert</span>
                    <span className="text-muted-foreground ml-auto">vor 1 Tag</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge variant="secondary">Berater</Badge>
                    <span>2 Standard-Berater wurden erstellt</span>
                    <span className="text-muted-foreground ml-auto">vor 1 Tag</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'berater' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Berater verwalten</h2>
              <Button onClick={() => setShowAddBerater(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Berater hinzufügen
              </Button>
            </div>

            <div className="grid gap-6">
              {berater.map((b) => (
                <Card key={b.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{b.name}</CardTitle>
                        <CardDescription>{b.location}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Bewertung</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>{b.rating || 0} ({b.reviewCount || 0})</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spezialisierungen</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(b.specialties || []).map((spec: string) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">WhatsApp</div>
                        <div className="text-sm">{b.whatsapp || 'Nicht verfügbar'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl">Analytics & Berichte</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Beliebte Kategorien</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Internet & TV</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mobilfunk</span>
                      <span>30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strom & Gas</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kredite</span>
                      <span>10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>QR-Code Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{analytics.totalQRScans || 0}</div>
                    <div className="text-sm text-muted-foreground">Gesamt-Scans</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Add Berater Modal */}
      {showAddBerater && (
        <AddBeraterModal 
          onSave={handleCreateBerater} 
          onClose={() => setShowAddBerater(false)} 
        />
      )}
    </div>
  );
};

// Add Berater Modal Component
const AddBeraterModal: React.FC<{ onSave: (data: any) => void; onClose: () => void }> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    whatsapp: '',
    specialties: '',
    aboutMe: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const beraterData = {
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      stats: {
        customers: '0',
        experience: '0 Jahre',
        responseTime: '< 1h'
      }
    };

    onSave(beraterData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Neuen Berater hinzufügen</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Standort *</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">E-Mail *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">WhatsApp</label>
              <Input
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                placeholder="+49..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Spezialisierungen (kommagetrennt)</label>
            <Input
              value={formData.specialties}
              onChange={(e) => setFormData({...formData, specialties: e.target.value})}
              placeholder="Internet & TV, Mobilfunk, Strom & Gas"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Über mich</label>
            <Textarea
              value={formData.aboutMe}
              onChange={(e) => setFormData({...formData, aboutMe: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Berater erstellen
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Abbrechen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};