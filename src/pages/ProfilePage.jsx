import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarPicker from '../components/AvatarPicker'
import { useSupabase } from '../context/SupabaseContext'
import { useAudio } from '../context/AudioContext'

const levels = [
  { id: 'cp', label: 'CP' },
  { id: 'ce2', label: 'CE2' },
]

function ProfilePage({ onThemeChange }) {
  const { signUp, login, loading, supabaseReady, error: supabaseError } = useSupabase()
  const { playSound } = useAudio()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(true)
  const [form, setForm] = useState({ name: '', age: '', level: 'cp', avatar: 'astronaute' })
  const [message, setMessage] = useState(null)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!supabaseReady) {
      setMessage("Configuration Supabase manquante : demande à un parent d'ajouter la clé d'API avant de continuer.")
      return
    }
    try {
      if (isSignup) {
        await signUp({
          name: form.name,
          age: Number(form.age),
          level: form.level,
          avatar: form.avatar,
        })
        setMessage('Bienvenue dans la galaxie Max&Co !')
      } else {
        await login({ name: form.name, avatar: form.avatar })
        setMessage('Heureux de te revoir !')
      }
      playSound('success')
      navigate('/carte')
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <div className="card-surface flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-3 text-center">
          <span className="badge-chip mx-auto">Espace {isSignup ? 'inscription' : 'connexion'}</span>
          <h1 className="font-display text-4xl text-ocean">Ton profil Max&Co</h1>
          <p className="text-slate-600">
            Choisis ton avatar préféré, indique ton niveau et prépare-toi à gagner des badges !
          </p>
        </div>
        <div className="mx-auto flex gap-4">
          <button
            type="button"
            className={`button-secondary ${isSignup ? 'ring-4 ring-candy/40' : ''}`}
            onClick={() => setIsSignup(true)}
          >
            Je m’inscris
          </button>
          <button
            type="button"
            className={`button-secondary ${!isSignup ? 'ring-4 ring-ocean/40' : ''}`}
            onClick={() => setIsSignup(false)}
          >
            Je me connecte
          </button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-semibold text-slate-600">Prénom</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg font-semibold text-midnight shadow-inner focus:border-ocean focus:outline-none"
                placeholder="Maxence ou Corentin"
              />
            </label>
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-semibold text-slate-600">Âge</span>
              <input
                required
                type="number"
                min="5"
                max="12"
                value={form.age}
                onChange={(event) => handleChange('age', event.target.value)}
                className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg font-semibold text-midnight shadow-inner focus:border-ocean focus:outline-none"
                placeholder="7"
              />
            </label>
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-semibold text-slate-600">Niveau</span>
              <select
                value={form.level}
                onChange={(event) => {
                  const value = event.target.value
                  handleChange('level', value)
                  onThemeChange?.(value === 'cp' ? 'theme-farm' : 'theme-space')
                }}
                className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg font-semibold text-midnight shadow-inner focus:border-ocean focus:outline-none"
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-col gap-2 text-left">
              <span className="text-sm font-semibold text-slate-600">Avatar</span>
              <AvatarPicker selected={form.avatar} onChange={(value) => handleChange('avatar', value)} />
            </div>
          </div>
          <button type="submit" className="button-primary text-lg" disabled={loading || !supabaseReady}>
            {loading ? 'Chargement…' : 'En route !'}
          </button>
        </form>
        {(!supabaseReady || message) && (
          <p className="text-center text-sm font-semibold text-slate-600">
            {message || "Connexion à Supabase indisponible pour le moment."}
          </p>
        )}
        {supabaseError && supabaseReady && (
          <p className="text-center text-xs text-red-600">{supabaseError.message}</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
