import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { moduleMeta } from '../data/modules'
import { useSupabase, normalizeLevel, getLevelLabel } from '../context/SupabaseContext'

const primaryModules = ['lecture', 'ecriture', 'mathematiques']
const bonusModulesList = ['memory', 'hangman', 'puzzle']

function ModuleCard({ moduleId, onNavigate }) {
  const meta = moduleMeta[moduleId]
  if (!meta) return null

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="menu-card"
    >
      <div className="text-3xl">{meta.icon}</div>
      <h3 className="font-display text-lg text-midnight">{meta.title}</h3>
      <p className="text-xs text-slate-500">{meta.description}</p>
      <Link to={`/module/${moduleId}`} className="button-primary mt-3 w-full" onClick={onNavigate}>
        Commencer
      </Link>
    </motion.div>
  )
}

function BonusCard({ moduleId, onNavigate }) {
  const meta = moduleMeta[moduleId]
  if (!meta) return null

  return (
    <motion.div
      layout
      className="bonus-card"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{meta.icon}</span>
        <div>
          <p className="text-sm font-semibold text-midnight">{meta.title}</p>
          <p className="text-xs text-slate-500">{meta.description}</p>
        </div>
      </div>
      <Link to={`/module/${moduleId}`} className="button-secondary mt-3 w-full" onClick={onNavigate}>
        Jouer
      </Link>
    </motion.div>
  )
}

function MobileDock() {
  const { currentUser } = useSupabase()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const level = normalizeLevel(currentUser?.level ?? 'cp')

  const levelLabel = useMemo(() => getLevelLabel(level), [level])

  if (!currentUser) {
    return null
  }

  const closeSheet = () => setOpen(false)

  return (
    <div className="mobile-dock-container">
      <div className="mobile-dock card-surface">
        <Link to="/carte" className="dock-side-button" aria-label="Carte" onClick={closeSheet}>
          🧭
        </Link>
        <button
          type="button"
          className="dock-main-button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="menu-bottom-sheet"
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
        <Link to="/tableau-de-bord" className="dock-side-button" aria-label="Scores" onClick={closeSheet}>
          ⭐
        </Link>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="dock-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={closeSheet}
            />
            <motion.div
              id="menu-bottom-sheet"
              className="dock-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 160, damping: 20 }}
            >
              <div className="sheet-header">
                <div>
                  <p className="text-xs uppercase text-slate-400">Profil</p>
                  <p className="font-display text-xl text-midnight">{currentUser.name}</p>
                  <p className="text-sm text-slate-500">{levelLabel} · {location.pathname}</p>
                </div>
                <button type="button" className="button-secondary" onClick={closeSheet}>
                  Fermer
                </button>
              </div>
              <div className="sheet-content">
                <p className="text-sm text-slate-500">
                  Choisis une carte d’activité ou consulte tes scores. Les cartes glissent horizontalement comme un carrousel.
                </p>
                <div className="sheet-carousel" role="list">
                  {primaryModules.map((moduleId) => (
                    <ModuleCard key={moduleId} moduleId={moduleId} onNavigate={closeSheet} />
                  ))}
                </div>
                <p className="text-xs uppercase text-slate-400">Bonus</p>
                <div className="sheet-bonus" role="list">
                  {bonusModulesList.map((moduleId) => (
                    <BonusCard key={moduleId} moduleId={moduleId} onNavigate={closeSheet} />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileDock
