import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../client'

const LEVEL_LABELS = {
  cp: 'CP',
  ce1: 'CE1',
  ce2: 'CE2',
  cm1: 'CM1',
  cm2: 'CM2',
}

const DEFAULT_LEVEL = 'cp'

const UPPERCASE_TO_CODE = Object.entries(LEVEL_LABELS).reduce((acc, [code, label]) => {
  acc[label.toUpperCase()] = code
  return acc
}, {})

export function normalizeLevel(value) {
  if (value === undefined || value === null) {
    return DEFAULT_LEVEL
  }
  const raw = value.toString().trim()
  if (!raw) return DEFAULT_LEVEL
  const lower = raw.toLowerCase()
  if (LEVEL_LABELS[lower]) {
    return lower
  }
  const upper = raw.toUpperCase()
  if (UPPERCASE_TO_CODE[upper]) {
    return UPPERCASE_TO_CODE[upper]
  }
  return DEFAULT_LEVEL
}

export function formatLevelForSupabase(value) {
  const normalized = normalizeLevel(value)
  return LEVEL_LABELS[normalized] ?? LEVEL_LABELS[DEFAULT_LEVEL]
}

export function getLevelLabel(value) {
  const normalized = normalizeLevel(value)
  return LEVEL_LABELS[normalized] ?? LEVEL_LABELS[DEFAULT_LEVEL]
}

const normalizeUserRecord = (record) => {
  if (!record) return null
  return {
    ...record,
    level: normalizeLevel(record.level),
  }
}

const SupabaseContext = createContext(null)

export function SupabaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [scores, setScores] = useState([])
  const [rivalry, setRivalry] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const ensureConfigured = useCallback(() => {
    if (isSupabaseConfigured) return null
    const configurationError = new Error(
      "Supabase n'est pas configuré. Ajoute SUPABASE_KEY (ou VITE_SUPABASE_KEY) pour activer la sauvegarde."
    )
    setError(configurationError)
    return configurationError
  }, [])

  const signUp = useCallback(async (payload) => {
    const configurationError = ensureConfigured()
    if (configurationError) {
      throw configurationError
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: upsertError } = await supabase
        .from('users')
        .insert({
          name: payload.name,
          age: payload.age,
          level: formatLevelForSupabase(payload.level),
          avatar: payload.avatar,
        })
        .select()
        .single()

      if (upsertError) throw upsertError
      const normalizedUser = normalizeUserRecord(data)
      setCurrentUser(normalizedUser)
      return normalizedUser
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [ensureConfigured])

  const login = useCallback(async ({ name, avatar }) => {
    const configurationError = ensureConfigured()
    if (configurationError) {
      throw configurationError
    }
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
      const normalizedUser = normalizeUserRecord(data)
      setCurrentUser(normalizedUser)
      return normalizedUser
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [ensureConfigured])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setScores([])
  }, [])

  const fetchUserScores = useCallback(async (userId) => {
    if (!userId) return
    if (!isSupabaseConfigured) {
      return
    }
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
    if (!isSupabaseConfigured) {
      setRivalry([])
      return
    }
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, avatar, level')
      .in('name', ['Maxence', 'Corentin'])

    if (usersError) {
      setError(usersError)
      return
    }

    const normalizedUsers = (users ?? []).map(normalizeUserRecord)
    const userIds = normalizedUsers.map((user) => user.id)
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

    const grouped = normalizedUsers.map((user) => {
      const userScores = (results ?? []).filter((score) => score.user_id === user.id)
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
    const configurationError = ensureConfigured()
    if (configurationError) {
      throw configurationError
    }
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
  }, [currentUser, ensureConfigured])

  const value = useMemo(
    () => ({
      supabase,
      currentUser,
      scores,
      rivalry,
      loading,
      error,
      supabaseReady: isSupabaseConfigured,
      signUp,
      login,
      logout,
      fetchUserScores,
      saveScore,
      fetchSiblingRivalry,
    }),
    [
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
    ]
  )

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext)
  if (!ctx) {
    throw new Error('useSupabase doit être utilisé dans un SupabaseProvider')
  }
  return ctx
}
