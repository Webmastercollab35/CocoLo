import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import classNames from 'classnames'
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
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <span className="badge-chip mx-auto">Carte au trésor animée</span>
        <h1 className="font-display text-4xl text-midnight">Cap sur la prochaine île, {currentUser?.name} !</h1>
        <p className="text-slate-600">
          Suis la trace lumineuse, débloque des défis pirates et gagne de nouvelles décorations de cabine.
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-6">
        {mapZones.map((zone, index) => {
          const meta = moduleMeta[zone.id]
          const isUnlocked = unlockedModules.has(zone.id)
          return (
            <motion.div
              key={zone.id}
              className={`card-surface comic-panel ${zone.position} relative flex flex-col items-center justify-center gap-4 p-6 text-center transition ${
                isUnlocked ? 'opacity-100' : 'opacity-60 grayscale'
              }`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={isUnlocked ? { y: -8, rotate: -1 } : {}}
            >
              <div className="text-6xl drop-shadow">{zone.mascot}</div>
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
                {isUnlocked ? 'Embarquer' : 'À débloquer'}
              </Link>
            </motion.div>
          )
        })}
      </div>
      <div className="card-surface flex flex-col gap-3 p-6 text-left">
        <h2 className="font-display text-2xl text-midnight">Chemin de progression</h2>
        <p className="text-sm text-slate-600">
          Chaque île s’illumine quand tu gagnes des étoiles : commence par la Lecture des moussaillons, puis cap sur l’écriture et les maths avant les mini-jeux bonus.
        </p>
        <div className="flex flex-wrap gap-3">
          {mapZones.map((zone) => {
            const meta = moduleMeta[zone.id]
            const isUnlocked = unlockedModules.has(zone.id)
            return (
              <span
                key={`${zone.id}-trail`}
                className={classNames('rounded-full px-4 py-2 text-sm font-semibold shadow-inner', {
                  'bg-emerald-200 text-emerald-900': isUnlocked,
                  'bg-slate-200 text-slate-500': !isUnlocked,
                })}
              >
                {meta.icon} {meta.title}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MapPage
