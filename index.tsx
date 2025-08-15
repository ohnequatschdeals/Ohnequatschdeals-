import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS and logging middleware
app.use('*', cors())
app.use('*', logger(console.log))

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Helper function to get user from token
const getUser = async (request: Request) => {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) return null;
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error) {
    console.log('Auth error:', error);
    return null;
  }
  return user;
}

// Authentication routes
app.post('/make-server-47a8cd60/auth/signup', async (c) => {
  try {
    const { email, password, name, role = 'customer' } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Berater routes
app.get('/make-server-47a8cd60/berater', async (c) => {
  try {
    const berater = await kv.getByPrefix('berater:');
    return c.json(berater.map(b => b.value));
  } catch (error) {
    console.log('Get berater error:', error);
    return c.json({ error: 'Failed to fetch berater' }, 500);
  }
});

app.get('/make-server-47a8cd60/berater/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const berater = await kv.get(`berater:${id}`);
    
    if (!berater) {
      return c.json({ error: 'Berater not found' }, 404);
    }

    // Get reviews for this berater
    const reviews = await kv.getByPrefix(`review:berater:${id}:`);
    berater.reviews = reviews.map(r => r.value);

    return c.json(berater);
  } catch (error) {
    console.log('Get berater error:', error);
    return c.json({ error: 'Failed to fetch berater' }, 500);
  }
});

app.post('/make-server-47a8cd60/berater', async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const beraterData = await c.req.json();
    const beraterId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const berater = {
      id: beraterId,
      userId: user.id,
      ...beraterData,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`berater:${beraterId}`, berater);
    
    return c.json(berater);
  } catch (error) {
    console.log('Create berater error:', error);
    return c.json({ error: 'Failed to create berater profile' }, 500);
  }
});

// Reviews routes
app.post('/make-server-47a8cd60/reviews', async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { beraterId, rating, text } = await c.req.json();
    const reviewId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const review = {
      id: reviewId,
      beraterId,
      userId: user.id,
      rating,
      text,
      createdAt: new Date().toISOString()
    };

    await kv.set(`review:berater:${beraterId}:${reviewId}`, review);
    
    // Update berater rating
    const berater = await kv.get(`berater:${beraterId}`);
    if (berater) {
      const reviews = await kv.getByPrefix(`review:berater:${beraterId}:`);
      const totalRating = reviews.reduce((sum, r) => sum + r.value.rating, 0);
      const avgRating = totalRating / reviews.length;
      
      berater.rating = Math.round(avgRating * 10) / 10;
      berater.reviewCount = reviews.length;
      berater.updatedAt = new Date().toISOString();
      
      await kv.set(`berater:${beraterId}`, berater);
    }
    
    return c.json(review);
  } catch (error) {
    console.log('Create review error:', error);
    return c.json({ error: 'Failed to create review' }, 500);
  }
});

// Chat routes
app.post('/make-server-47a8cd60/chat/messages', async (c) => {
  try {
    const { sessionId, message, sender } = await c.req.json();
    const messageId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const chatMessage = {
      id: messageId,
      sessionId,
      message,
      sender, // 'user' or 'bot' or 'berater'
      timestamp: new Date().toISOString()
    };

    await kv.set(`chat:${sessionId}:${messageId}`, chatMessage);
    
    return c.json(chatMessage);
  } catch (error) {
    console.log('Chat message error:', error);
    return c.json({ error: 'Failed to save chat message' }, 500);
  }
});

app.get('/make-server-47a8cd60/chat/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const messages = await kv.getByPrefix(`chat:${sessionId}:`);
    
    // Sort by timestamp
    const sortedMessages = messages
      .map(m => m.value)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    return c.json(sortedMessages);
  } catch (error) {
    console.log('Get chat messages error:', error);
    return c.json({ error: 'Failed to fetch chat messages' }, 500);
  }
});

// QR Code routes
app.post('/make-server-47a8cd60/qr-codes', async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { beraterId, type = 'profile' } = await c.req.json();
    const qrId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const qrCode = {
      id: qrId,
      beraterId,
      type, // 'profile' or 'whatsapp'
      url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/make-server-47a8cd60/qr/${qrId}`,
      scans: 0,
      createdAt: new Date().toISOString()
    };

    await kv.set(`qr:${qrId}`, qrCode);
    
    return c.json(qrCode);
  } catch (error) {
    console.log('Create QR code error:', error);
    return c.json({ error: 'Failed to create QR code' }, 500);
  }
});

app.get('/make-server-47a8cd60/qr/:id', async (c) => {
  try {
    const qrId = c.req.param('id');
    const qrCode = await kv.get(`qr:${qrId}`);
    
    if (!qrCode) {
      return c.json({ error: 'QR code not found' }, 404);
    }

    // Increment scan count
    qrCode.scans += 1;
    qrCode.lastScanned = new Date().toISOString();
    await kv.set(`qr:${qrId}`, qrCode);

    // Get berater info
    const berater = await kv.get(`berater:${qrCode.beraterId}`);
    
    if (qrCode.type === 'whatsapp' && berater?.whatsapp) {
      return c.redirect(`https://wa.me/${berater.whatsapp.replace('+', '').replace(' ', '')}`);
    } else {
      return c.redirect(`${Deno.env.get('SUPABASE_URL')}/berater/${qrCode.beraterId}`);
    }
  } catch (error) {
    console.log('QR redirect error:', error);
    return c.json({ error: 'Failed to process QR code' }, 500);
  }
});

// Analytics routes
app.get('/make-server-47a8cd60/analytics/overview', async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get basic stats
    const beraterData = await kv.getByPrefix('berater:');
    const reviewData = await kv.getByPrefix('review:');
    const qrData = await kv.getByPrefix('qr:');
    
    const stats = {
      totalBerater: beraterData.length,
      totalReviews: reviewData.length,
      totalQRCodes: qrData.length,
      totalQRScans: qrData.reduce((sum, qr) => sum + (qr.value.scans || 0), 0)
    };

    return c.json(stats);
  } catch (error) {
    console.log('Analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Offers routes
app.get('/make-server-47a8cd60/offers/:category', async (c) => {
  try {
    const category = c.req.param('category');
    const offers = await kv.getByPrefix(`offer:${category}:`);
    
    return c.json(offers.map(o => o.value));
  } catch (error) {
    console.log('Get offers error:', error);
    return c.json({ error: 'Failed to fetch offers' }, 500);
  }
});

app.post('/make-server-47a8cd60/offers', async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const offerData = await c.req.json();
    const offerId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const offer = {
      id: offerId,
      ...offerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`offer:${offerData.category}:${offerId}`, offer);
    
    return c.json(offer);
  } catch (error) {
    console.log('Create offer error:', error);
    return c.json({ error: 'Failed to create offer' }, 500);
  }
});

// Initialize default data
app.post('/make-server-47a8cd60/init', async (c) => {
  try {
    // Check if already initialized
    const init = await kv.get('system:initialized');
    if (init) {
      return c.json({ message: 'Already initialized' });
    }

    // Create sample berater
    const sampleBerater = [
      {
        id: 'berater-1',
        name: 'Michael Schmidt',
        location: 'Hamburg',
        email: 'michael@ohnequatschdeals.de',
        whatsapp: '+49151234567890',
        specialties: ['Internet & TV', 'Mobilfunk'],
        aboutMe: 'Seit 5 Jahren helfe ich Kunden bei der Suche nach den besten Tarifen.',
        rating: 4.8,
        reviewCount: 156,
        stats: {
          customers: '500+',
          experience: '5 Jahre',
          responseTime: '< 2h'
        },
        createdAt: new Date().toISOString()
      },
      {
        id: 'berater-2',
        name: 'Sarah Weber',
        location: 'München',
        email: 'sarah@ohnequatschdeals.de',
        whatsapp: '+49151234567891',
        specialties: ['Strom & Gas', 'Kredite'],
        aboutMe: 'Energieexpertin mit Leidenschaft für nachhaltige Lösungen.',
        rating: 4.9,
        reviewCount: 203,
        stats: {
          customers: '750+',
          experience: '7 Jahre',
          responseTime: '< 1h'
        },
        createdAt: new Date().toISOString()
      }
    ];

    for (const berater of sampleBerater) {
      await kv.set(`berater:${berater.id}`, berater);
    }

    // Mark as initialized
    await kv.set('system:initialized', { timestamp: new Date().toISOString() });

    return c.json({ message: 'System initialized successfully' });
  } catch (error) {
    console.log('Initialization error:', error);
    return c.json({ error: 'Failed to initialize system' }, 500);
  }
});

// Health check
app.get('/make-server-47a8cd60/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch)