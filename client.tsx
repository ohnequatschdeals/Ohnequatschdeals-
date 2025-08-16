import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

export const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-47a8cd60`

// API helpers
export const api = {
  // Auth
  signup: async (email: string, password: string, name: string, role: string = 'customer') => {
    const response = await fetch(`${serverUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ email, password, name, role })
    })
    return response.json()
  },

  // Berater
  getBerater: async () => {
    const response = await fetch(`${serverUrl}/berater`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    return response.json()
  },

  getBeraterById: async (id: string) => {
    const response = await fetch(`${serverUrl}/berater/${id}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    return response.json()
  },

  createBerater: async (beraterData: any, accessToken: string) => {
    const response = await fetch(`${serverUrl}/berater`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(beraterData)
    })
    return response.json()
  },

  // Reviews
  createReview: async (beraterId: string, rating: number, text: string, accessToken: string) => {
    const response = await fetch(`${serverUrl}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ beraterId, rating, text })
    })
    return response.json()
  },

  // Chat
  saveChatMessage: async (sessionId: string, message: string, sender: string) => {
    const response = await fetch(`${serverUrl}/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ sessionId, message, sender })
    })
    return response.json()
  },

  getChatHistory: async (sessionId: string) => {
    const response = await fetch(`${serverUrl}/chat/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    return response.json()
  },

  // QR Codes
  createQRCode: async (beraterId: string, type: string, accessToken: string) => {
    const response = await fetch(`${serverUrl}/qr-codes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ beraterId, type })
    })
    return response.json()
  },

  // Analytics
  getAnalytics: async (accessToken: string) => {
    const response = await fetch(`${serverUrl}/analytics/overview`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return response.json()
  },

  // Offers
  getOffers: async (category: string) => {
    const response = await fetch(`${serverUrl}/offers/${category}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    return response.json()
  },

  // Initialize system
  initializeSystem: async () => {
    const response = await fetch(`${serverUrl}/init`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    return response.json()
  }
}