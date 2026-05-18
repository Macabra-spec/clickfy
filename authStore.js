import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,

  checkSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()
      set({ user: session.user, profile, loading: false })
    } else {
      set({ user: null, profile: null, loading: false })
    }
  },

  signUp: async (email, password, name, role, phone) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        role,
        phone,
      })
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()
      set({ user: data.user, profile })
    }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()
      set({ user: data.user, profile })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },

  updateProfile: async (updates) => {
    const { user } = useAuthStore.getState()
    if (!user) return
    const { data: profile } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .maybeSingle()
    set({ profile })
  },
}))
