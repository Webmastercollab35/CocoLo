import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

const mascots = [
  {
    id: 'dragon',
    name: 'Drago',
    description: 'Gardien de la forêt magique',
    theme: 'theme-forest',
    avatar: '/assets/avatars/dragon.svg',
  },
  {
    id: 'robot',
    name: 'Robo',
    description: 'Explorateur de l’espace infini',
    theme: 'theme-space',
    avatar: '/assets/avatars/astronaute.svg',
  },
  {
    id: 'hibou',
    name: 'Houbi',
    description: 'Guide de la clairière secrète',
    theme: 'theme-jungle',
    avatar: '/assets/avatars/pingouin.svg',
  },
]

function MascotGuide({ onThemeChange }) {
  const [index, setIndex] = useState(0)
  const { mascotteMessage, nextMessage, playSound } = useAudio()

  useEffect(() => {
    onThemeChange?.(mascots[index].theme)
  }, [index, onThemeChange])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mascots.length)
      nextMessage()
    }, 15000)
    return () => clearInterval(interval)
  }, [nextMessage])

  const mascot = mascots[index]

  return (
    <motion.div
      key={mascot.id}
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -120, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      className="pointer-events-none fixed bottom-6 left-6 z-40"
    >
      <div className="pointer-events-auto card-surface flex max-w-xs flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-white to-sky-100 shadow-inner">
            <img src={mascot.avatar} alt={mascot.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-lg text-ocean">{mascot.name}</p>
            <p className="text-sm text-slate-600">{mascot.description}</p>
          </div>
        </div>
        <p className="rounded-2xl bg-sky-50/80 p-3 text-sm text-midnight shadow-inner shadow-sky-100">
          {mascotteMessage}
        </p>
        <button
          type="button"
          className="button-secondary text-sm"
          onClick={() => {
            playSound('cheer')
            setIndex((prev) => (prev + 1) % mascots.length)
            nextMessage()
          }}
        >
          Change la mascotte
        </button>
      </div>
    </motion.div>
  )
}

export default MascotGuide
