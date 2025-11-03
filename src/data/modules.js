import sampleSize from '../utils/sampleSize'

const baseAudioPath = '/sounds'

function shuffle(array) {
  const copy = [...array]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const temp = copy[index]
    copy[index] = copy[randomIndex]
    copy[randomIndex] = temp
  }
  return copy
}

function createTileWord(word, extras = []) {
  const letters = [...word.replace(/\s/g, '')]
  const pool = shuffle([...letters, ...extras])
  return pool.map((letter, index) => ({
    id: `${word}-tile-${index}`,
    label: letter,
  }))
}

const pirateSoundStories = [
  {
    id: 'pirate-son-mer',
    prompt: 'Tape le mot secret du perroquet : « mer »',
    answer: 'mer',
    feedback: 'Écris M-E-R comme la mer des pirates.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-mer.mp3`,
  },
  {
    id: 'pirate-son-tresor',
    prompt: 'Écris le mot que chuchote le coffre magique : « or »',
    answer: 'or',
    feedback: 'Or brille comme les pièces dans un coffre au trésor.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-or.mp3`,
  },
  {
    id: 'pirate-son-marin',
    prompt: 'Le moussaillon épelle « mât ». Écris-le avec ton clavier.',
    answer: 'mât',
    feedback: 'Le mât porte la grande voile du navire.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-mat.mp3`,
  },
  {
    id: 'pirate-son-sirene',
    prompt: 'La sirène chante « lune ». Tape le mot comme elle.',
    answer: 'lune',
    feedback: 'L-U-N-E éclaire la route des explorateurs.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-lune.mp3`,
  },
  {
    id: 'pirate-son-perroquet',
    prompt: 'Clique sur les lettres pour écrire « perroquet »',
    answer: 'perroquet',
    feedback: 'Le perroquet répète P-E-R-R-O-Q-U-E-T.',
    type: 'tiles',
    tiles: createTileWord('perroquet', ['a', 'n', 'i']),
    audio: `${baseAudioPath}/pirate-perroquet.mp3`,
  },
]

const syllablePairs = [
  { prompt: 'Quelle syllabe complète le mot « ma__on » ?', answer: 'ison', choices: ['r', 'ison', 'to', 'pa'], feedback: 'maison se termine par ison.' },
  { prompt: 'Choisis la syllabe qui complète « ca__ot »', answer: 'rot', choices: ['rou', 'rot', 'ra', 'ri'], feedback: 'car + rot = carotte.' },
  { prompt: 'Complète « pi__re »', answer: 'er', choices: ['on', 'er', 'ar', 'or'], feedback: 'pierre s’écrit pi-er-re.' },
  { prompt: 'Complète « so__ir »', answer: 'le', choices: ['le', 'li', 'lu', 'la'], feedback: 'sourire commence par sou et finit par rire.' },
  { prompt: 'Complète « lun__ »', answer: 'ette', choices: ['ette', 'ine', 'oir', 'age'], feedback: 'lunette prend ette.' },
  { prompt: 'Complète « po__on »', answer: 'iss', choices: ['iss', 'oss', 'uss', 'ass'], feedback: 'poisson prend iss.' },
  { prompt: 'Complète « ba__on »', answer: 'ston', choices: ['ston', 'tron', 'crin', 'guit'], feedback: 'baston se termine par ston.' },
  { prompt: 'Complète « cha__eu »', answer: 'p', choices: ['b', 'p', 'd', 't'], feedback: 'chapeau prend p.' },
  { prompt: 'Complète « fa__eur »', answer: 'ct', choices: ['ct', 'rt', 'lt', 'st'], feedback: 'facteur prend ct.' },
  { prompt: 'Complète « li__re »', answer: 'vr', choices: ['vr', 'gr', 'tr', 'dr'], feedback: 'livre se lit li-vre.' },
]

const pirateTileAdventures = [
  {
    id: 'pirate-tiles-bateau',
    prompt: 'Assemble le mot « bateau » avec ta souris.',
    answer: 'bateau',
    feedback: 'Le bateau emmène Maxence et Corentin sur les vagues.',
    type: 'tiles',
    tiles: createTileWord('bateau', ['i', 'n', 'r']),
  },
  {
    id: 'pirate-tiles-sable',
    prompt: 'Clique sur les lettres pour écrire « sable »',
    answer: 'sable',
    feedback: 'Le sable doré cache parfois des trésors.',
    type: 'tiles',
    tiles: createTileWord('sable', ['u', 'i', 'o']),
  },
  {
    id: 'pirate-tiles-coffre',
    prompt: 'Écris « coffre » en cliquant sur les pièces-lettres.',
    answer: 'coffre',
    feedback: 'C-O-F-F-R-E, un coffre bien solide !',
    type: 'tiles',
    tiles: createTileWord('coffre', ['a', 'u', 'n']),
  },
  {
    id: 'pirate-tiles-canon',
    prompt: 'Compose le mot « canon »',
    answer: 'canon',
    feedback: 'Canon se compose de C-A-N-O-N.',
    type: 'tiles',
    tiles: createTileWord('canon', ['e', 'i', 'r']),
  },
  {
    id: 'pirate-tiles-ile',
    prompt: 'Reconstitue « île » pour trouver la cachette.',
    answer: 'île',
    feedback: 'Île prend un accent sur le i.',
    type: 'tiles',
    tiles: createTileWord('île', ['a', 'o', 'u']),
  },
]

const comprehensionTexts = [
  {
    prompt: 'Lis : "Max part à la mer avec son frère. Ils jouent avec un ballon rouge." Que font Max et son frère ?',
    answer: 'Ils jouent avec un ballon rouge',
    choices: [
      'Ils mangent une glace',
      'Ils jouent avec un ballon rouge',
      'Ils dorment sous un arbre',
      'Ils regardent un film',
    ],
    feedback: 'Le texte dit qu’ils jouent avec un ballon rouge.',
  },
  {
    prompt: 'Lis : "Corentin aime lire des histoires de dragons et de pirates." Que préfère lire Corentin ?',
    answer: 'Des histoires de dragons et de pirates',
    choices: [
      'Des histoires d’astronautes',
      'Des histoires de dragons et de pirates',
      'Des recettes de cuisine',
      'Des contes de fées',
    ],
    feedback: 'Le texte parle bien de dragons et de pirates.',
  },
  {
    prompt: '"La maîtresse offre trois étoiles dorées aux élèves les plus attentifs." Que reçoit-on quand on est attentif ?',
    answer: 'Trois étoiles dorées',
    choices: ['Un cahier bleu', 'Trois étoiles dorées', 'Un ballon', 'Un bonbon'],
    feedback: 'Les étoiles dorées récompensent l’attention.',
  },
  {
    prompt: '"Le petit robot danse quand on lui met de la musique." Que fait le robot ?',
    answer: 'Il danse',
    choices: ['Il chante', 'Il danse', 'Il cuisine', 'Il lit'],
    feedback: 'La phrase dit qu’il danse.',
  },
  {
    prompt: '"La licorne magique adore se promener dans la forêt lumineuse." Où se promène la licorne ?',
    answer: 'Dans la forêt lumineuse',
    choices: ['Dans la mer', 'Dans la forêt lumineuse', 'Dans le désert', 'Dans la montagne'],
    feedback: 'La forêt lumineuse est mentionnée dans le texte.',
  },
  {
    prompt: '"Maxence a trois pommes, il en mange une. Combien lui en reste-t-il ?"',
    answer: 'Deux',
    choices: ['Une', 'Deux', 'Trois', 'Quatre'],
    feedback: '3 - 1 = 2.',
  },
  {
    prompt: '"Corentin prépare un spectacle. Il répète la chanson deux fois par jour." Que fait Corentin ?',
    answer: 'Il prépare un spectacle',
    choices: ['Il fait du sport', 'Il prépare un spectacle', 'Il construit un robot', 'Il jardine'],
    feedback: 'Il répète pour un spectacle.',
  },
  {
    prompt: '"Les deux frères observent les étoiles filantes allongés sur la pelouse." Où sont-ils ?',
    answer: 'Sur la pelouse',
    choices: ['Dans la maison', 'Sur la pelouse', 'Dans la voiture', 'Sur le bateau'],
    feedback: 'Ils regardent le ciel depuis la pelouse.',
  },
  {
    prompt: '"La maîtresse raconte une histoire drôle à la classe." Que fait la maîtresse ?',
    answer: 'Elle raconte une histoire drôle',
    choices: ['Elle dessine', 'Elle chante', 'Elle raconte une histoire drôle', 'Elle fait du sport'],
    feedback: 'Elle raconte une histoire.',
  },
  {
    prompt: '"Le pirate trouve un coffre rempli de pièces d’or." Que trouve le pirate ?',
    answer: 'Un coffre rempli de pièces d’or',
    choices: ['Un trésor de bonbons', 'Un coffre rempli de pièces d’or', 'Un livre de contes', 'Un bateau'],
    feedback: 'Le coffre contient des pièces d’or.',
  },
]

const readingQuestions = {
  cp: [
    ...pirateSoundStories,
    ...syllablePairs,
    ...comprehensionTexts,
    ...pirateTileAdventures,
  ].map((item, index) => ({
    ...item,
    id: item.id ?? `lecture-cp-${index}`,
    type: item.type ?? (item.choices ? 'choice' : 'input'),
    audio: item.audio ?? `${baseAudioPath}/lecture-${(index % 5) + 1}.mp3`,
  })),
  ce2: [
    ...comprehensionTexts,
    ...syllablePairs,
    ...pirateSoundStories,
  ]
    .concat(
      Array.from({ length: 15 }).map((_, idx) => ({
        prompt: `Lis ce passage : "${['Le dragon bleu vole dans le ciel étoilé', 'La fusée fonce vers une nouvelle planète', 'La chouette observe la forêt endormie'][idx % 3]}". Que peut-on retenir ?`,
        answer: ['Le dragon vole', 'La fusée fonce', 'La chouette observe'][idx % 3],
        choices: ['Le dragon vole', 'La fusée fonce', 'La chouette observe', 'Le robot dort'],
        feedback: 'Identifie la bonne information dans le texte.',
        audio: `${baseAudioPath}/lecture-${(idx % 5) + 1}.mp3`,
      }))
    )
    .map((item, index) => ({
      ...item,
      id: `lecture-ce2-${index}`,
      type: 'choice',
    })),
}

const writingWords = [
  { prompt: 'Complète le mot : s_urire', answer: 'o', choices: ['o', 'e', 'a', 'i'], feedback: 'Sourire s’écrit avec un o.' },
  { prompt: 'Complète : cha_peau', answer: 'p', choices: ['p', 'b', 'd', 't'], feedback: 'Chapeau prend p.' },
  { prompt: 'Complète : lic_rne', answer: 'o', choices: ['o', 'u', 'i', 'a'], feedback: 'Licorne prend o.' },
  { prompt: 'Complète : dra_on', answer: 'g', choices: ['g', 'j', 'q', 'z'], feedback: 'Dragon s’écrit avec g.' },
  { prompt: 'Complète : pi_ure', answer: 'q', choices: ['g', 'q', 'k', 'c'], feedback: 'PiQure s’écrit avec q.' },
  { prompt: 'Complète : mu_ique', answer: 's', choices: ['z', 's', 'c', 't'], feedback: 'Musique prend s.' },
  { prompt: 'Complète : a_iver', answer: 'r', choices: ['r', 'l', 't', 'd'], feedback: 'Arriver avec deux r.' },
  { prompt: 'Complète : car_osse', answer: 'r', choices: ['r', 'l', 't', 'd'], feedback: 'Carrosse avec rr.' },
  { prompt: 'Complète : ma_on', answer: 'is', choices: ['is', 'ai', 'oi', 'eu'], feedback: 'Maison avec ai-son.' },
  { prompt: 'Complète : or_age', answer: 'ang', choices: ['ang', 'ong', 'ing', 'eng'], feedback: 'Orange avec ange.' },
]

const dictationWords = [
  { prompt: 'Écris le mot entendu : "magie"', answer: 'magie', feedback: 'Magie s’écrit m-a-g-i-e.' },
  { prompt: 'Écris le mot entendu : "dragon"', answer: 'dragon', feedback: 'Dragon s’écrit d-r-a-g-o-n.' },
  { prompt: 'Écris le mot entendu : "robot"', answer: 'robot', feedback: 'Robot se termine par -bot.' },
  { prompt: 'Écris le mot entendu : "fusée"', answer: 'fusée', feedback: 'Fusée prend un accent aigu.', audio: `${baseAudioPath}/fusee.mp3` },
  { prompt: 'Écris le mot entendu : "mystère"', answer: 'mystère', feedback: 'Mystère prend un y et un accent.', audio: `${baseAudioPath}/mystere.mp3` },
  { prompt: 'Écris le mot entendu : "explorer"', answer: 'explorer', feedback: 'Explorer avec ex-plor-er.' },
  { prompt: 'Écris le mot entendu : "forêt"', answer: 'forêt', feedback: 'Forêt prend un accent circonflexe.', audio: `${baseAudioPath}/foret.mp3` },
  { prompt: 'Écris le mot entendu : "aventure"', answer: 'aventure', feedback: 'Aventure se termine en -ture.' },
  { prompt: 'Écris le mot entendu : "planète"', answer: 'planète', feedback: 'Planète prend un accent.', audio: `${baseAudioPath}/planete.mp3` },
  { prompt: 'Écris le mot entendu : "galaxie"', answer: 'galaxie', feedback: 'Galaxie s’écrit g-a-l-a-x-i-e.' },
]

const pirateLetterMaps = [
  {
    prompt: 'Clique les lettres pour former « forêt »',
    answer: 'forêt',
    feedback: 'La forêt cache un trésor mystérieux.',
    type: 'tiles',
    tiles: createTileWord('forêt', ['a', 'u', 'm']),
  },
  {
    prompt: 'Assemble « étoile » pour guider le navire.',
    answer: 'étoile',
    feedback: 'Étoile se compose de É-T-O-I-L-E.',
    type: 'tiles',
    tiles: createTileWord('étoile', ['a', 'u', 'n']),
  },
  {
    prompt: 'Forme « sirène » avec ta souris.',
    answer: 'sirène',
    feedback: 'La sirène chante S-I-R-È-N-E.',
    type: 'tiles',
    tiles: createTileWord('sirène', ['a', 'o', 'u']),
  },
  {
    prompt: 'Reconstitue « pirate » lettre par lettre.',
    answer: 'pirate',
    feedback: 'P-I-R-A-T-E comme un vrai corsaire.',
    type: 'tiles',
    tiles: createTileWord('pirate', ['o', 'n', 'l']),
  },
  {
    prompt: 'Compose « trésor » pour ouvrir le coffre.',
    answer: 'trésor',
    feedback: 'Trésor s’écrit T-R-É-S-O-R.',
    type: 'tiles',
    tiles: createTileWord('trésor', ['a', 'u', 'n']),
  },
]

const writingQuestions = {
  cp: [
    ...writingWords,
    ...dictationWords,
    ...pirateLetterMaps,
  ].map((item, index) => ({
    ...item,
    id: item.id ?? `ecriture-cp-${index}`,
    type: item.type ?? (item.choices ? 'choice' : 'input'),
    audio: item.audio ?? `${baseAudioPath}/dictee-${(index % 5) + 1}.mp3`,
  })),
  ce2: Array.from({ length: 30 }).map((_, index) => {
    const base = writingWords[index % writingWords.length]
    return {
      ...base,
      id: `ecriture-ce2-${index}`,
      prompt: `${base.prompt} (niveau expert)`,
      type: base.choices ? 'choice' : 'input',
      audio: `${baseAudioPath}/ce2-dictee-${(index % 5) + 1}.mp3`,
    }
  }),
}

function generateAdditions(count) {
  return Array.from({ length: count }).map((_, idx) => {
    const a = 1 + ((idx * 3) % 9)
    const b = 1 + ((idx * 5) % 9)
    return {
      id: `add-${idx}`,
      prompt: `${a} + ${b} = ?`,
      answer: `${a + b}`,
      choices: sampleSize([a + b, a + b + 1, a + b - 1, a + b + 2], 4).map(String),
      feedback: `${a} + ${b} = ${a + b}`,
    }
  })
}

function generateSubtractions(count) {
  return Array.from({ length: count }).map((_, idx) => {
    const a = 10 + idx
    const b = 1 + (idx % 9)
    return {
      id: `sub-${idx}`,
      prompt: `${a} - ${b} = ?`,
      answer: `${a - b}`,
      choices: sampleSize([a - b, a - b + 1, a - b - 1, a - b + 2], 4).map(String),
      feedback: `${a} - ${b} = ${a - b}`,
    }
  })
}

function generateMultiplications(count) {
  return Array.from({ length: count }).map((_, idx) => {
    const a = 2 + (idx % 9)
    const b = 2 + ((idx * 3) % 9)
    return {
      id: `mul-${idx}`,
      prompt: `${a} × ${b} = ?`,
      answer: `${a * b}`,
      choices: sampleSize([a * b, a * b + a, a * b - b, a * b + b], 4).map(String),
      feedback: `${a} × ${b} = ${a * b}`,
    }
  })
}

function generateDivisions(count) {
  return Array.from({ length: count }).map((_, idx) => {
    const b = 2 + (idx % 8)
    const a = b * (2 + ((idx * 3) % 8))
    return {
      id: `div-${idx}`,
      prompt: `${a} ÷ ${b} = ?`,
      answer: `${a / b}`,
      choices: sampleSize([a / b, a / b + 1, a / b - 1, a / b + 2], 4)
        .map(Math.round)
        .map(String),
      feedback: `${a} ÷ ${b} = ${a / b}`,
    }
  })
}

const wordProblems = Array.from({ length: 25 }).map((_, idx) => {
  const apples = 12 + idx
  const eaten = 3 + (idx % 5)
  const remaining = apples - eaten
  return {
    id: `problem-${idx}`,
    prompt: `Max a ${apples} pommes et il en mange ${eaten}. Combien lui en reste-t-il ?`,
    answer: `${remaining}`,
    choices: sampleSize([remaining, remaining + 1, remaining + 2, remaining - 1], 4).map(String),
    feedback: `Il reste ${remaining} pommes.`,
    image: `/assets/problems/pomme-${(idx % 3) + 1}.svg`,
  }
})

const mathQuestions = {
  cp: [...generateAdditions(25), ...generateSubtractions(25)].map((item, index) => ({
    ...item,
    id: `math-cp-${index}`,
    type: 'choice',
    audio: `${baseAudioPath}/math-${(index % 5) + 1}.mp3`,
  })),
  ce2: [...generateMultiplications(25), ...generateDivisions(20), ...wordProblems].map((item, index) => ({
    ...item,
    id: `math-ce2-${index}`,
    type: 'choice',
    audio: `${baseAudioPath}/math-ce2-${(index % 5) + 1}.mp3`,
  })),
}

const memoryCards = Array.from({ length: 24 }).map((_, index) => ({
  id: `memory-${index}`,
  prompt: `Retrouve la paire n°${index + 1}`,
  answer: `pair-${Math.floor(index / 2)}`,
  feedback: 'Observe bien les cartes pour mémoriser les paires.',
}))

const hangmanWords = Array.from({ length: 30 }).map((_, index) => {
  const words = ['dragon', 'licorne', 'puzzle', 'galaxie', 'robotique', 'explorateur', 'mystère', 'aventure']
  const word = words[index % words.length]
  return {
    id: `pendu-${index}`,
    prompt: `Devine le mot mystère n°${index + 1}`,
    answer: word,
    feedback: `Le mot mystère était ${word}.`,
  }
})

const puzzleLetters = Array.from({ length: 25 }).map((_, idx) => ({
  id: `puzzle-${idx}`,
  prompt: `Replace les lettres pour former le mot ${['étoile', 'cosmos', 'dragon', 'pluie', 'soleil'][idx % 5]}`,
  answer: ['étoile', 'cosmos', 'dragon', 'pluie', 'soleil'][idx % 5],
  feedback: 'Observe bien les lettres proposées.',
}))

export const bonusModules = {
  memory: memoryCards,
  hangman: hangmanWords,
  puzzle: puzzleLetters,
}

export const learningModules = {
  lecture: readingQuestions,
  ecriture: writingQuestions,
  mathematiques: mathQuestions,
}

export function getModuleQuestions(moduleId, level) {
  if (learningModules[moduleId]) {
    return learningModules[moduleId][level] ?? []
  }
  return bonusModules[moduleId] ?? []
}

export const moduleMeta = {
  lecture: {
    title: 'Lecture des Moussaillons',
    description: 'Déchiffre les messages pirates et les histoires chantées.',
    icon: '🏴‍☠️',
    background: 'theme-pirate-bay',
  },
  ecriture: {
    title: 'Atelier des Corsaires',
    description: 'Compose les mots au clavier ou avec les pièces-lettres magiques.',
    icon: '🪶',
    background: 'theme-coral-lagoon',
  },
  mathematiques: {
    title: 'Compas des Maths',
    description: 'Résous les calculs pour garder le navire dans la bonne direction.',
    icon: '🧭',
    background: 'theme-treasure-cove',
  },
  memory: {
    title: 'Mémory Pirate',
    description: 'Retrouve les paires de cartes au trésor.',
    icon: '🪙',
    background: 'theme-coral-lagoon',
  },
  hangman: {
    title: 'Pendu du Capitaine',
    description: 'Devine les mots mystère avant de lever l’ancre.',
    icon: '⚓️',
    background: 'theme-pirate-bay',
  },
  puzzle: {
    title: 'Puzzle de la Carte',
    description: 'Replace les lettres pour reconstituer la carte au trésor.',
    icon: '🗺️',
    background: 'theme-treasure-cove',
  },
}

export const challenges = [
  {
    id: 'vitesse',
    title: 'Course du Vent',
    description: 'Réponds vite pour rattraper le navire fantôme.',
    reward: 'Badge vitesse',
    steps: [
      'Étape 1 : réussir 3 réponses sous 15 secondes.',
      'Étape 2 : réussir 5 réponses sous 12 secondes.',
      'Étape 3 : terminer un module en moins de 5 minutes.',
    ],
  },
  {
    id: 'precision',
    title: 'Œil du Perroquet',
    description: 'Reste précis pour viser le trésor sans erreur.',
    reward: 'Badge précision',
    steps: [
      'Étape 1 : 5 bonnes réponses d’affilée.',
      'Étape 2 : 10 bonnes réponses d’affilée.',
      'Étape 3 : obtenir 90% de réussite sur un module.',
    ],
  },
  {
    id: 'repetition',
    title: 'Gardien du Cap',
    description: 'La persévérance mène aux îles secrètes.',
    reward: 'Badge persévérance',
    steps: [
      'Étape 1 : rejouer un module une seconde fois.',
      'Étape 2 : compléter trois sessions dans la même semaine.',
      'Étape 3 : améliorer ton score de 20 points ou plus.',
    ],
  },
]
