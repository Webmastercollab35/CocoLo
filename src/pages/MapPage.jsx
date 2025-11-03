import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { moduleMeta } from '../data/modules'
import { useSupabase, normalizeLevel } from '../context/SupabaseContext'

const moduleOrder = ['lecture', 'ecriture', 'mathematiques', 'memory', 'hangman', 'puzzle']

function MapPage({ onThemeChange }) {
  const { currentUser, scores } = useSupabase()
  const level = normalizeLevel(currentUser?.level ?? 'cp')

  const unlockedModules = useMemo(() => {
    const base = new Set(['lecture'])
    if (level === 'ce2') {
      base.add('ecriture')
      base.add('mathematiques')
    }
    scores.forEach((score) => {
      if ((score.score ?? 0) > 60) {
        base.add('ecriture')
        base.add('mathematiques')
      }
      if ((score.score ?? 0) > 80) {
        base.add('memory')
        base.add('hangman')
        base.add('puzzle')
      }
    })
    return base
  }, [scores, level])

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-14">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="badge-chip">Menu mobile</span>
        <h1 className="font-display text-3xl text-midnight md:text-4xl">
          Bonjour {currentUser?.name}, choisis ta mission
        </h1>
        <p className="text-sm text-slate-600 md:text-base">
          Appuie sur le bouton « Menu » en bas ou fais glisser les cartes ci-dessous pour lancer une activité adaptée au niveau {level.toUpperCase()}.
        </p>
      </div>
      <div className="card-surface flex flex-col gap-3 p-5">
        <p className="text-sm font-semibold uppercase text-slate-400">Cartes d’activités</p>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {moduleOrder.map((moduleId) => {
            const meta = moduleMeta[moduleId]
            const isUnlocked = unlockedModules.has(moduleId)
            return (
              <motion.article
                key={moduleId}
                className={`menu-card min-w-[220px] ${isUnlocked ? 'opacity-100' : 'opacity-50'} `}
                whileHover={{ y: -6 }}
              >
                <div className="text-3xl">{meta.icon}</div>
                <h2 className="font-display text-xl text-midnight">{meta.title}</h2>
                <p className="text-xs text-slate-500">{meta.description}</p>
                <Link
                  to={isUnlocked ? `/module/${moduleId}` : '#'}
                  className="button-primary mt-3 w-full"
                  aria-disabled={!isUnlocked}
                  onClick={(event) => {
                    if (!isUnlocked) {
                      event.preventDefault()
                      return
                    }
                    onThemeChange?.(meta.background)
                  }}
                >
                  {isUnlocked ? 'Commencer' : 'À débloquer'}
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
      <div className="card-surface flex flex-col gap-4 p-5">
        <h2 className="font-display text-2xl text-midnight">Suivi rapide</h2>
        <p className="text-sm text-slate-600">
          Les modules débloqués deviennent colorés. Continue d’écrire avec les pièces-lettres pour gagner des points et des badges.
        </p>
        <div className="flex flex-wrap gap-3">
          {moduleOrder.map((moduleId) => {
            const meta = moduleMeta[moduleId]
            const isUnlocked = unlockedModules.has(moduleId)
            return (
              <span
                key={`${moduleId}-chip`}
                className={`rounded-full px-4 py-2 text-xs font-semibold shadow-inner ${
                  isUnlocked ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {meta.icon} {meta.title}
              </span>
            )
          })}
        </div>
        <Link to="/tableau-de-bord" className="button-secondary self-start">
          Voir tous mes scores
        </Link>
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
