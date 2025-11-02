import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { moduleMeta } from '../data/modules'

function ResultsPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { moduleId } = useParams()
  const meta = moduleMeta[moduleId]

  if (!state) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 py-16">
        <p className="text-lg font-semibold text-slate-600">Lance un module pour découvrir tes résultats.</p>
        <button type="button" className="button-primary" onClick={() => navigate(`/module/${moduleId}`)}>
          Rejouer le module
        </button>
      </div>
    )
  }

  const { score, accuracy, averageSpeed, rewardBadges, totalQuestions } = state

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16">
      <div className="card-surface flex flex-col gap-4 p-8 text-center">
        <span className="badge-chip mx-auto">{meta?.icon} {meta?.title}</span>
        <h1 className="font-display text-4xl text-ocean">Résultats brillants !</h1>
        <p className="text-slate-600">Tu as répondu à {totalQuestions} questions.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/80 p-6 shadow-inner">
            <p className="text-sm font-semibold uppercase text-slate-500">Score total</p>
            <p className="font-display text-3xl text-emerald-500">{score} pts</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-6 shadow-inner">
            <p className="text-sm font-semibold uppercase text-slate-500">Précision</p>
            <p className="font-display text-3xl text-ocean">{accuracy}%</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-6 shadow-inner">
            <p className="text-sm font-semibold uppercase text-slate-500">Vitesse moyenne</p>
            <p className="font-display text-3xl text-candy">{averageSpeed}s</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {rewardBadges?.length ? (
            rewardBadges.map((badge) => (
              <span key={badge} className="badge-chip">
                🏆 {badge}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">Encore un petit effort pour débloquer des badges supplémentaires.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button type="button" className="button-secondary" onClick={() => navigate('/carte')}>
            🌍 Retour à la carte
          </button>
          <button type="button" className="button-primary" onClick={() => navigate(`/module/${moduleId}`)}>
            🔁 Rejouer ce module
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
