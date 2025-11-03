import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <motion.img
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        src="/assets/landing-hero.svg"
        alt="Max&Co"
        className="w-full max-w-md"
      />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <span className="badge-chip">Bienvenue sur Max&Co</span>
        <h1 className="mt-4 font-display text-4xl text-ocean drop-shadow-sm">
          Une aventure pirate pensée pour tablettes et mobiles
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Choisis ton niveau (CP ou CE2), clique sur les lettres pour écrire les mots et suis tes progrès avec un menu mobile ultra simple.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-surface flex w-full flex-col gap-3 px-5 py-6 text-left"
      >
        <p className="text-sm font-semibold uppercase text-slate-400">Comment jouer ?</p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>1. Crée ton profil pirate et choisis ton avatar.</li>
          <li>2. Ouvre le gros bouton « Menu » en bas de l’écran pour découvrir les cartes.</li>
          <li>3. Glisse les cartes Lecture, Écriture ou Maths et lance un défi.</li>
        </ul>
      </motion.div>
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/profil" className="button-primary w-full sm:w-auto">
          🚀 Je crée mon profil
        </Link>
        <Link to="/tableau-de-bord" className="button-secondary w-full sm:w-auto">
          ⭐ Voir mes scores
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
