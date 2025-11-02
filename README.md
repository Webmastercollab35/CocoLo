# CocoLo – Application éducative gamifiée

CocoLo est une application web ludique pensée pour Maxence (CP) et Corentin (CE2). Elle propose des activités de lecture, d'écriture et de mathématiques avec suivi de progression, badges et tableau de scores. L'interface s'inspire de l'univers coloré de Lalilo et reste pleinement utilisable sur tablette.

## Fonctionnalités clés

- **Inscription & connexion** avec choix d'avatar, niveau scolaire, âge et thème graphique.
- **Modules pédagogiques** (lecture, écriture, mathématiques) adaptés automatiquement au niveau CP ou CE2.
- **Activités chronométrées** (30 secondes par défaut) avec possibilité de répondre après l'échéance pour un score réduit.
- **Accessibilité audio** : bouton "Écouter la question", synthèse vocale et effets sonores de réussite/erreur.
- **Progression persistante** grâce à une base SQLite : scores, tentatives, temps de réponse et badges sont enregistrés.
- **Tableau des scores** filtrable et **mode parent** pour suivre l'évolution des enfants.
- **Thèmes visuels** (forêt, espace, océan), musique de fond activable et animations douces.

## Installation

> ℹ️ L'environnement de génération ne permet pas d'exécuter `npm install` (erreur 403). Les commandes ci-dessous fonctionnent sur un poste de développement standard avec un accès classique au registre npm.

```bash
npm install
npm run dev
```

Le serveur Express s'exécute par défaut sur [http://localhost:3000](http://localhost:3000).

## Scripts utiles

- `npm start` : lance le serveur en production.
- `npm run dev` : lance le serveur avec les variables de développement.
- `node scripts/generate-audio.js` : génère des fichiers mp3 (encouragement, succès, erreur) dans `public/assets/audio/` grâce à `lamejs`. Les activités utilisent ces sons s'ils sont présents, avec repli sur le Web Audio en cas d'absence.

## Structure principale

```
├── public/
│   ├── index.html        # Structure de l'application côté client
│   ├── styles.css        # Thèmes, animations et responsive
│   ├── app.js            # Logique des activités, timer, audio et appels API
│   └── assets/
│       ├── avatars/      # Avatars rigolos (svg)
│       └── audio/        # Sons mp3 générés (optionnels)
├── server.js             # API Express + endpoints REST
├── db.js                 # Initialisation de la base SQLite
├── scripts/generate-audio.js
├── package.json
└── README.md
```

## Base de données

- **users** : profil des enfants (prénom unique, âge, avatar, niveau, thème).
- **sessions** : historique des connexions.
- **activity_results** : scores par activité (module, niveau, temps, streak, détail des réponses).
- **badges** : badges débloqués par enfant.

Le fichier SQLite `cocolo.db` est créé automatiquement au lancement du serveur.

## Développement

1. Lancer `npm run dev`.
2. Ouvrir le navigateur sur `http://localhost:3000`.
3. Utiliser l'inscription pour créer un enfant puis explorer les modules.
4. Consulter le mode parent pour visualiser la progression comparée.

Les activités reposent sur des données en mémoire côté client. L'ajout de nouveaux jeux se fait en étendant l'objet `MODULES` dans `public/app.js`.
