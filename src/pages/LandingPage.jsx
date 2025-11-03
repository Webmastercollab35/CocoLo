import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="badge-chip">Expédition pirate pédagogique</span>
        <h1 className="mt-6 font-display text-4xl text-ocean drop-shadow-sm md:text-6xl">
          Max&Co : la grande chasse au trésor des savoirs
        </h1>
        <p className="mt-4 text-lg text-slate-600 md:text-xl">
          Embarque avec Maxence (CP) et Corentin (CE2) pour une aventure ludique : sons, écriture, maths et mini-jeux sur une carte de pirate animée !
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-surface w-full max-w-4xl px-6 py-8 text-left"
      >
        <h2 className="font-display text-2xl text-midnight">Les étapes de ton expédition</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[{
            title: 'Choisis ton équipage',
            description: 'Crée un profil pirate avec avatar, niveau et mascotte.',
            icon: '🧑‍✈️',
          }, {
            title: 'Explore la carte',
            description: 'Débloque les îles Lecture, Écriture, Maths et Jeux bonus.',
            icon: '🗺️',
          }, {
            title: 'Gagne les trophées',
            description: 'Collectionne badges, étoiles et trésors animés.',
            icon: '🏆',
          }].map((step) => (
            <div key={step.title} className="rounded-3xl bg-white/80 p-4 shadow-inner">
              <div className="text-3xl">{step.icon}</div>
              <h3 className="mt-2 font-display text-xl text-midnight">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/profil" className="button-primary text-lg">
          🏴‍☠️ Lancer l’aventure
        </Link>
        <Link to="/tableau-de-bord" className="button-secondary text-lg">
          📜 Voir la progression
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
