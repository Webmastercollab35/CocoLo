# Max&Co (Max Unkoe)

Max&Co est une aventure éducative React pensée pour Maxence (CP) et Corentin (CE2). L’application réunit onboarding ludique, carte de mondes à explorer, modules pédagogiques chronométrés et suivi de progression connecté à Supabase. L’interface s’inspire de l’univers Lalilo (couleurs douces, mascottes animées, boutons XXL) et reste 100 % responsive tablette/desktop.

## Fonctionnalités clés

- **Auth ludique** : inscription par prénom, âge, niveau (CP/CE2) et avatar; connexion rapide via prénom + avatar.
- **Intégration Supabase** : profils, scores, temps, badges et défi « frère vs frère » stockés dans les tables `users` et `scores`.
- **Carte gamifiée** : univers (forêt magique, espace, ferme, jungle…) avec déblocage progressif de zones et mascotte interactive.
- **Modules pédagogiques** (lecture, écriture, mathématiques + bonus memory/pendu/puzzle) : 20 à 50 questions par niveau, chronomètre visuel (30 s), feedback audio et récompenses selon la rapidité.
- **Sons & accessibilité** : Web Audio API + fichiers mp3 optionnels, boutons 🔊, musique de fond activable/désactivable.
- **Suivi complet** : tableau de bord avec historique, badges, défis quotidiens, challenge Maxence vs Corentin et statistiques détaillées.

## Prérequis

- Node.js ≥ 18
- Un projet [Supabase](https://supabase.com/)

## Mise en route

```bash
npm install
npm run dev
```

L’application démarre sur [http://localhost:5173](http://localhost:5173).

## Configuration Supabase

1. Créer un projet Supabase et récupérer la clé de service (`Project Settings > API > anon public`).
2. Créer les tables suivantes (SQL simplifié) :

   ```sql
   create table users (
     id uuid primary key default uuid_generate_v4(),
     name text not null,
     age int,
     level text check (level in ('cp','ce2')),
     avatar text,
     created_at timestamptz default now()
   );

   create table scores (
     id uuid primary key default uuid_generate_v4(),
     user_id uuid references users(id) on delete cascade,
     module text,
     score int,
     date timestamptz,
     time_spent int,
     streak int,
     accuracy int,
     speed int,
     rewards jsonb,
     created_at timestamptz default now()
   );
   ```

3. Ajouter un fichier `.env.local` à la racine (non versionné) :

   ```
   VITE_SUPABASE_KEY=ta_clé_secrète
   ```

4. Le SDK Supabase est initialisé côté client dans `src/context/SupabaseContext.jsx` via :

   ```js
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = 'https://iwgayloevgnizzqmybcb.supabase.co'
   const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

Les appels `signUp`, `login`, `saveScore`, `fetchSiblingRivalry` et `fetchUserScores` utilisent directement ce client.

## Organisation du code

```
├── index.html                 # Point d’entrée Vite + polices Google Fonts
├── package.json               # Scripts (dev/build/preview) et dépendances
├── postcss.config.cjs / tailwind.config.js
├── src/
│   ├── App.jsx                # Routes, thèmes dynamiques, mascotte
│   ├── main.jsx               # Bootstrap React + providers
│   ├── index.css              # Tailwind + utilitaires maison
│   ├── context/
│   │   ├── AudioContext.jsx   # Web Audio API, musique de fond, feedbacks
│   │   └── SupabaseContext.jsx# Auth, scores, rivalité Maxence/Corentin
│   ├── data/modules.js        # Banques de questions (20–50 items/module)
│   ├── pages/                 # Landing, Profil, Carte, Modules, Dashboard, Résultats
│   ├── components/            # Timer, carte, avatars, scoreboard, mascotte…
│   ├── utils/sampleSize.js    # Générateur d’options pour questions mathématiques
│   └── assets/                # SVG avatars (réutilisés depuis `public`)
├── public/
│   ├── assets/avatars/*.svg   # Avatars rigolos (licorne, dragon…)
│   ├── assets/problems/*.svg  # Illustrations des problèmes mathématiques
│   └── sounds/                # Placeholders – à remplacer par vos mp3
└── vite.config.js
```

## Sons & animations

- Les chemins audio pointent vers `public/sounds/*.mp3`. Ajoutez vos propres fichiers (`click.mp3`, `success.mp3`, `error.mp3`, `cheer.mp3`, `background.mp3`).
- Le Web Audio API gère le fallback si un fichier manque.
- Les animations (Framer Motion) dynamisent la landing, la mascotte et les transitions de pages.

## Tests & scripts

- `npm run dev` : démarre le serveur de dev Vite.
- `npm run build` : build de production (`dist/`).
- `npm run preview` : prévisualise le build.

## Étendre Max&Co

- Ajouter un nouveau module ? Créez vos questions dans `src/data/modules.js`, ajoutez une entrée `moduleMeta` et la carte se mettra à jour automatiquement.
- Ajouter des défis parents ? Exploitez les hooks Supabase pour insérer des statistiques personnalisées.
- Activer un mode hors-ligne ? Mettez en place `service workers` + cache des questions (structure prête pour y intégrer Workbox).

## Licences & crédits

- Illustrations SVG maison.
- Polices [Fredoka](https://fonts.google.com/specimen/Fredoka) & [Nunito](https://fonts.google.com/specimen/Nunito).
- Icônes : [Heroicons](https://heroicons.com/).

Bon voyage dans la galaxie Max&Co ! 🚀
