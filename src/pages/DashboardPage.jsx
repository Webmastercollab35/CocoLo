import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScoreBoard from '../components/ScoreBoard'
import ProgressBar from '../components/ProgressBar'
import { useSupabase } from '../context/SupabaseContext'
import { moduleMeta, challenges } from '../data/modules'

function StatCard({ title, value, description }) {
  return (
    <div className="card-surface flex flex-col gap-2 p-6 text-center">
      <p className="text-sm font-semibold uppercase text-slate-500">{title}</p>
      <p className="font-display text-4xl text-ocean">{value}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  )
}

function RivalryPanel({ rivalry }) {
  if (!rivalry?.length) {
    return (
      <div className="card-surface p-6 text-sm text-slate-600">
        Ajoute Maxence et Corentin pour activer le mode défi fraternel.
      </div>
    )
  }

  return (
    <div className="card-surface p-6">
      <h3 className="font-display text-xl text-midnight">Mode Frère vs Frère</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rivalry.map((entry) => (
          <div key={entry.user.id} className="rounded-3xl bg-white/80 p-4 shadow-inner">
            <div className="flex items-center gap-3">
              <img src={`/assets/avatars/${entry.user.avatar}.svg`} alt={entry.user.name} className="h-14 w-14" />
              <div>
                <p className="text-lg font-semibold text-midnight">{entry.user.name}</p>
                <p className="text-xs uppercase text-slate-400">{entry.user.level?.toUpperCase()}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 text-center text-sm font-semibold text-slate-600">
              <div>
                <p className="text-xs uppercase text-slate-400">Étoiles</p>
                <p>{entry.total}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Meilleur score</p>
                <p>{entry.best}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Parties</p>
                <p>{entry.attempts}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardPage() {
  const { currentUser, scores, rivalry, fetchSiblingRivalry } = useSupabase()

  useEffect(() => {
    fetchSiblingRivalry()
  }, [fetchSiblingRivalry])

  const totalStars = scores.reduce((acc, score) => acc + (score.score ?? 0), 0)
  const bestScore = scores.reduce((max, score) => Math.max(max, score.score ?? 0), 0)
  const avgTime = scores.length
    ? Math.round(scores.reduce((acc, score) => acc + (score.time_spent ?? 0), 0) / scores.length)
    : 0

  const modulesProgress = Object.keys(moduleMeta).map((moduleId) => {
    const attempts = scores.filter((score) => score.module === moduleId)
    const total = attempts.reduce((acc, score) => acc + (score.score ?? 0), 0)
    return {
      id: moduleId,
      ...moduleMeta[moduleId],
      attempts: attempts.length,
      totalStars: total,
    }
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-3 text-center">
        <span className="badge-chip mx-auto">Tableau de bord</span>
        <h1 className="font-display text-4xl text-ocean">Bienvenue {currentUser?.name ?? 'explorateur'} !</h1>
        <p className="text-slate-600">
          Récupère tes statistiques, consulte tes badges et relève de nouveaux défis.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Étoiles gagnées" value={`${totalStars} ⭐`} description="Total cumulé sur tous les modules." />
        <StatCard title="Meilleur score" value={`${bestScore} pts`} description="Ta plus belle performance." />
        <StatCard title="Temps moyen" value={`${avgTime}s`} description="Temps de réponse moyen." />
      </div>
      <RivalryPanel rivalry={rivalry} />
      <div className="card-surface flex flex-col gap-6 p-6">
        <h2 className="font-display text-2xl text-midnight">Progression par module</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {modulesProgress.map((module) => (
            <div key={module.id} className="rounded-3xl bg-white/80 p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase text-slate-400">{module.icon} {module.title}</p>
                  <h3 className="text-lg font-semibold text-midnight">{module.attempts} parties jouées</h3>
                </div>
                <Link to={`/module/${module.id}`} className="button-secondary">
                  Rejouer
                </Link>
              </div>
              <div className="mt-4">
                <ProgressBar value={module.totalStars} max={500} label="Étoiles cumulées" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl text-midnight">Mes défis</h2>
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="card-surface flex flex-col gap-2 p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">{challenge.title}</p>
                <p className="text-sm text-slate-600">{challenge.description}</p>
                <span className="badge-chip w-max">{challenge.reward}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl text-midnight">Historique des scores</h2>
          <ScoreBoard scores={scores} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
