import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwgayloevgnizzqmybcb.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const SupabaseContext = createContext(null)

export function SupabaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [scores, setScores] = useState([])
  const [rivalry, setRivalry] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signUp = useCallback(async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: upsertError } = await supabase
        .from('users')
        .insert({
          name: payload.name,
          age: payload.age,
          level: payload.level,
          avatar: payload.avatar,
        })
        .select()
        .single()

      if (upsertError) throw upsertError
      setCurrentUser(data)
      return data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async ({ name, avatar }) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .eq('avatar', avatar)
        .order('created_at', { ascending: false })
        .maybeSingle()

      if (fetchError) throw fetchError
      if (!data) {
        throw new Error('Profil introuvable, vérifie ton avatar ou inscris-toi !')
      }
      setCurrentUser(data)
      return data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setScores([])
  }, [])

  const fetchUserScores = useCallback(async (userId) => {
    if (!userId) return
    const { data, error: fetchError } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (fetchError) {
      setError(fetchError)
      return
    }

    setScores(data ?? [])
  }, [])

  const fetchSiblingRivalry = useCallback(async () => {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, avatar, level')
      .in('name', ['Maxence', 'Corentin'])

    if (usersError) {
      setError(usersError)
      return
    }

    const userIds = users.map((user) => user.id)
    if (!userIds.length) {
      setRivalry([])
      return
    }

    const { data: results, error: scoresError } = await supabase
      .from('scores')
      .select('*')
      .in('user_id', userIds)

    if (scoresError) {
      setError(scoresError)
      return
    }

    const grouped = users.map((user) => {
      const userScores = results.filter((score) => score.user_id === user.id)
      const total = userScores.reduce((acc, score) => acc + (score.score ?? 0), 0)
      const best = userScores.reduce((max, score) => Math.max(max, score.score ?? 0), 0)
      return {
        user,
        total,
        best,
        attempts: userScores.length,
      }
    })

    setRivalry(grouped)
  }, [])

  const saveScore = useCallback(async (scorePayload) => {
    if (!currentUser) return
    const { data, error: insertError } = await supabase
      .from('scores')
      .insert({
        user_id: currentUser.id,
        module: scorePayload.module,
        score: scorePayload.score,
        date: scorePayload.date,
        time_spent: scorePayload.time_spent,
        streak: scorePayload.streak,
        accuracy: scorePayload.accuracy,
        speed: scorePayload.speed,
        rewards: scorePayload.rewards,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError)
      throw insertError
    }

    setScores((prev) => [data, ...prev])
    return data
  }, [currentUser])

  const value = useMemo(
    () => ({
      supabase,
      currentUser,
      scores,
      rivalry,
      loading,
      error,
      signUp,
      login,
      logout,
      fetchUserScores,
      saveScore,
      fetchSiblingRivalry,
    }),
    [currentUser, scores, rivalry, loading, error, signUp, login, logout, fetchUserScores, saveScore, fetchSiblingRivalry]
  )

  useEffect(() => {
    if (!supabaseKey) {
      console.warn('Supabase key manquante : ajoutez VITE_SUPABASE_KEY dans .env.local')
    }
  }, [])

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext)
  if (!ctx) {
    throw new Error('useSupabase doit être utilisé dans un SupabaseProvider')
  }
  return ctx
}
