import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { moduleMeta } from '../data/modules'
import { useSupabase } from '../context/SupabaseContext'

const mapZones = [
  { id: 'lecture', position: 'row-start-2 col-start-1', mascot: '🦉' },
  { id: 'ecriture', position: 'row-start-1 col-start-2', mascot: '🦄' },
  { id: 'mathematiques', position: 'row-start-3 col-start-2', mascot: '🤖' },
  { id: 'memory', position: 'row-start-1 col-start-3', mascot: '🐧' },
  { id: 'hangman', position: 'row-start-2 col-start-3', mascot: '🐲' },
  { id: 'puzzle', position: 'row-start-3 col-start-1', mascot: '🪐' },
]

function MapPage({ onThemeChange }) {
  const { currentUser, scores } = useSupabase()
  const unlockedModules = useMemo(() => {
    const base = new Set(['lecture'])
    scores.forEach((score) => {
      if ((score.score ?? 0) > 80) {
        base.add('ecriture')
        base.add('mathematiques')
      }
      if ((score.score ?? 0) > 100) {
        base.add('memory')
        base.add('hangman')
        base.add('puzzle')
      }
    })
    return base
  }, [scores])

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <span className="badge-chip mx-auto">Carte du monde</span>
        <h1 className="font-display text-4xl text-ocean">Choisis ta prochaine destination, {currentUser?.name} !</h1>
        <p className="text-slate-600">
          Chaque zone débloque des niveaux, des mini-jeux et des badges scintillants.
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-6">
        {mapZones.map((zone) => {
          const meta = moduleMeta[zone.id]
          const isUnlocked = unlockedModules.has(zone.id)
          return (
            <div
              key={zone.id}
              className={`card-surface ${zone.position} relative flex flex-col items-center justify-center gap-4 p-6 text-center transition ${
                isUnlocked ? 'opacity-100' : 'opacity-60 grayscale'
              }`}
            >
              <div className="text-6xl">{zone.mascot}</div>
              <h2 className="font-display text-2xl text-midnight">{meta.title}</h2>
              <p className="text-sm text-slate-600">{meta.description}</p>
              <Link
                to={isUnlocked ? `/module/${zone.id}` : '#'}
                className="button-primary"
                aria-disabled={!isUnlocked}
                onClick={(event) => {
                  if (!isUnlocked) {
                    event.preventDefault()
                    return
                  }
                  onThemeChange?.(meta.background)
                }}
              >
                {isUnlocked ? 'Explorer' : 'À débloquer'}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MapPage
