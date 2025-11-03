import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="badge-chip">Nouvelle aventure éducative</span>
        <h1 className="mt-6 font-display text-4xl text-ocean md:text-6xl">
          Max&Co, la galaxie d’apprentissage de Maxence & Corentin
        </h1>
        <p className="mt-4 text-lg text-slate-600 md:text-xl">
          Explore une carte magique, débloque des zones et gagne des trophées en lisant, écrivant et calculant !
        </p>
      </motion.div>
      <motion.img
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
        src="/assets/landing-hero.svg"
        alt="Illustration Max&Co"
        className="w-full max-w-3xl"
      />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/profil" className="button-primary text-lg">
          🚀 Lancer l’aventure
        </Link>
        <Link to="/tableau-de-bord" className="button-secondary text-lg">
          📊 Voir la progression
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
