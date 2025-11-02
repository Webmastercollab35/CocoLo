import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

function ScoreBoard({ scores }) {
  if (!scores?.length) {
    return (
      <div className="card-surface p-6 text-center text-slate-600">
        Pas encore de parties jouées. Lance un module pour commencer l'aventure !
      </div>
    )
  }

  return (
    <div className="card-surface overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Module</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Temps</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Badges</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white/60">
          {scores.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 text-sm font-semibold text-midnight">
                {dayjs(row.date).format('DD MMM YYYY HH:mm')}
              </td>
              <td className="px-4 py-3 text-sm capitalize text-slate-600">{row.module}</td>
              <td className="px-4 py-3 text-sm font-bold text-emerald-600">{row.score} ⭐</td>
              <td className="px-4 py-3 text-sm text-slate-500">{row.time_spent}s</td>
              <td className="px-4 py-3 text-sm text-slate-500">{row.rewards?.join(', ') ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
