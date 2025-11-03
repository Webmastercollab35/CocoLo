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

const cpLetterIslands = [
  {
    id: 'cp-tiles-mer',
    prompt: 'Compose « mer » avec les pièces-lettres.',
    answer: 'mer',
    feedback: 'M-E-R, la mer qui entoure le bateau.',
    type: 'tiles',
    tiles: createTileWord('mer', ['a', 'u', 'i']),
    audio: `${baseAudioPath}/pirate-mer.mp3`,
  },
  {
    id: 'cp-tiles-voile',
    prompt: 'Clique les lettres pour écrire « voile »',
    answer: 'voile',
    feedback: 'V-O-I-L-E, la grande voile blanche.',
    type: 'tiles',
    tiles: createTileWord('voile', ['a', 'u', 'n']),
    audio: `${baseAudioPath}/pirate-voile.mp3`,
  },
  {
    id: 'cp-tiles-ile',
    prompt: 'Reconstitue « île » pour trouver la cachette.',
    answer: 'île',
    feedback: 'Île prend un accent sur le i.',
    type: 'tiles',
    tiles: createTileWord('île', ['a', 'o', 'u']),
    audio: `${baseAudioPath}/pirate-ile.mp3`,
  },
  {
    id: 'cp-tiles-bateau',
    prompt: 'Assemble le mot « bateau »',
    answer: 'bateau',
    feedback: 'B-A-T-E-A-U, le bateau des aventuriers.',
    type: 'tiles',
    tiles: createTileWord('bateau', ['i', 'n', 'r']),
    audio: `${baseAudioPath}/pirate-bateau.mp3`,
  },
  {
    id: 'cp-tiles-coffre',
    prompt: 'Forme « coffre » lettre par lettre.',
    answer: 'coffre',
    feedback: 'C-O-F-F-R-E garde le trésor.',
    type: 'tiles',
    tiles: createTileWord('coffre', ['a', 'u', 'n']),
    audio: `${baseAudioPath}/pirate-coffre.mp3`,
  },
  {
    id: 'cp-tiles-trace',
    prompt: 'Écris « trace » en cliquant sur les pièces.',
    answer: 'trace',
    feedback: 'T-R-A-C-E comme la trace au sol.',
    type: 'tiles',
    tiles: createTileWord('trace', ['o', 'u', 'n']),
    audio: `${baseAudioPath}/pirate-trace.mp3`,
  },
  {
    id: 'cp-tiles-mousse',
    prompt: 'Compose « mousse » avec la souris.',
    answer: 'mousse',
    feedback: 'M-O-U-S-S-E, le mousse du navire.',
    type: 'tiles',
    tiles: createTileWord('mousse', ['a', 'i', 'é']),
    audio: `${baseAudioPath}/pirate-mousse.mp3`,
  },
  {
    id: 'cp-tiles-perroquet',
    prompt: 'Clique les lettres pour écrire « perroquet »',
    answer: 'perroquet',
    feedback: 'P-E-R-R-O-Q-U-E-T, le perroquet du capitaine.',
    type: 'tiles',
    tiles: createTileWord('perroquet', ['a', 'n', 'i']),
    audio: `${baseAudioPath}/pirate-perroquet.mp3`,
  },
  {
    id: 'cp-tiles-pirate',
    prompt: 'Forme « pirate » pour lever l’ancre.',
    answer: 'pirate',
    feedback: 'P-I-R-A-T-E comme un vrai corsaire.',
    type: 'tiles',
    tiles: createTileWord('pirate', ['o', 'n', 'l']),
    audio: `${baseAudioPath}/pirate-pirate.mp3`,
  },
  {
    id: 'cp-tiles-tresor',
    prompt: 'Compose « trésor » pour ouvrir le coffre.',
    answer: 'trésor',
    feedback: 'T-R-É-S-O-R pour gagner des pièces.',
    type: 'tiles',
    tiles: createTileWord('trésor', ['a', 'u', 'n']),
    audio: `${baseAudioPath}/pirate-tresor.mp3`,
  },
]

const cpKeyboardVoyages = [
  {
    id: 'cp-input-mer',
    prompt: 'Tape le mot entendu : « mer »',
    answer: 'mer',
    feedback: 'M-E-R, bravo moussaillon !',
    type: 'input',
    audio: `${baseAudioPath}/pirate-mer.mp3`,
  },
  {
    id: 'cp-input-or',
    prompt: 'Écris le mot chuchoté par le coffre : « or »',
    answer: 'or',
    feedback: 'Deux lettres pour beaucoup de pièces.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-or.mp3`,
  },
  {
    id: 'cp-input-lune',
    prompt: 'Tape « lune » comme la sirène.',
    answer: 'lune',
    feedback: 'L-U-N-E illumine la nuit.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-lune.mp3`,
  },
  {
    id: 'cp-input-mat',
    prompt: 'Écris « mat » pour dresser la voile.',
    answer: 'mat',
    feedback: 'M-A-T tient la voile.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-mat.mp3`,
  },
]

const cpSoundRoutes = [
  {
    id: 'cp-choice-bateau',
    prompt: 'Quelle lettre commence le mot « bateau » ?',
    answer: 'b',
    choices: ['b', 'm', 't', 'p'],
    feedback: 'B comme bateau bleu.',
  },
  {
    id: 'cp-choice-pirate',
    prompt: 'Quelle lettre entend-on au début de « pirate » ?',
    answer: 'p',
    choices: ['p', 's', 'c', 'r'],
    feedback: 'P comme perroquet.',
  },
  {
    id: 'cp-choice-coffre',
    prompt: 'Choisis la syllabe qui termine « co__ » pour dire coffre.',
    answer: 'ffre',
    choices: ['ffre', 'lion', 'ment', 'ron'],
    feedback: 'Coffre se finit par f-f-r-e.',
  },
  {
    id: 'cp-choice-mer',
    prompt: 'Quelle syllabe complète « ma__on » pour dire maison ?',
    answer: 'ison',
    choices: ['ison', 'rin', 'ton', 'pon'],
    feedback: 'Maison se termine par i-s-o-n.',
  },
  {
    id: 'cp-choice-tr',
    prompt: 'Choisis la lettre qui manque : « t_esor »',
    answer: 'r',
    choices: ['r', 'l', 'm', 'n'],
    feedback: 'Trésor prend un R après le T.',
  },
]

const ce2ListeningStories = [
  {
    id: 'ce2-son-boussole',
    prompt: 'Recopie le mot dicté : « boussole »',
    answer: 'boussole',
    feedback: 'Boussole aide à trouver le nord.',
    type: 'input',
    audio: `${baseAudioPath}/ce2-boussole.mp3`,
  },
  {
    id: 'ce2-son-explorateur',
    prompt: 'Écris le mot entendu : « explorateur »',
    answer: 'explorateur',
    feedback: 'Explorateur part à l’aventure.',
    type: 'input',
    audio: `${baseAudioPath}/ce2-explorateur.mp3`,
  },
  {
    id: 'ce2-son-etoile',
    prompt: 'Tape le mot : « étoile »',
    answer: 'étoile',
    feedback: 'Étoile guide le navire de nuit.',
    type: 'input',
    audio: `${baseAudioPath}/pirate-etoile.mp3`,
  },
  {
    id: 'ce2-son-cartographe',
    prompt: 'Écris « cartographe »',
    answer: 'cartographe',
    feedback: 'Cartographe dessine les cartes.',
    type: 'input',
    audio: `${baseAudioPath}/ce2-cartographe.mp3`,
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
    id: 'pirate-tiles-sable',
    prompt: 'Clique sur les lettres pour écrire « sable »',
    answer: 'sable',
    feedback: 'Le sable doré cache parfois des trésors.',
    type: 'tiles',
    tiles: createTileWord('sable', ['u', 'i', 'o']),
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
    id: 'pirate-tiles-ancres',
    prompt: 'Assemble « ancre » pour jeter le grappin.',
    answer: 'ancre',
    feedback: 'A-N-C-R-E retient le navire.',
    type: 'tiles',
    tiles: createTileWord('ancre', ['o', 'u', 'l']),
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
    ...cpLetterIslands,
    ...cpSoundRoutes,
    ...cpKeyboardVoyages,
    ...pirateTileAdventures,
    ...comprehensionTexts.slice(0, 5),
  ].map((item, index) => ({
    ...item,
    id: item.id ?? `lecture-cp-${index}`,
    type: item.type ?? (item.choices ? 'choice' : 'input'),
    audio: item.audio ?? `${baseAudioPath}/lecture-${(index % 5) + 1}.mp3`,
  })),
  ce2: [
    ...comprehensionTexts,
    ...syllablePairs,
    ...ce2ListeningStories,
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
  { prompt: 'Complète : ba_eau', answer: 't', choices: ['t', 'm', 'p', 's'], feedback: 'Bateau prend la lettre T au milieu.' },
  { prompt: 'Complète : coff_e', answer: 'r', choices: ['r', 't', 'd', 'p'], feedback: 'Coffre se termine par R-E.' },
  { prompt: 'Complète : pi_rate', answer: 'r', choices: ['r', 'l', 'm', 'n'], feedback: 'Pirate garde la lettre R après PI.' },
  { prompt: 'Complète : an_re', answer: 'c', choices: ['c', 's', 't', 'p'], feedback: 'Ancre prend la lettre C.' },
  { prompt: 'Complète : sir_ne', answer: 'è', choices: ['è', 'é', 'e', 'a'], feedback: 'Sirène s’écrit avec È.' },
  { prompt: 'Complète : mous_e', answer: 's', choices: ['s', 'z', 'c', 't'], feedback: 'Mousse contient deux S.' },
  { prompt: 'Complète : vo_le', answer: 'i', choices: ['i', 'u', 'o', 'a'], feedback: 'Voile prend la voyelle I.' },
  { prompt: 'Complète : tr_sor', answer: 'é', choices: ['é', 'a', 'o', 'u'], feedback: 'Trésor possède un É.' },
]

const dictationWords = [
  { prompt: 'Écris le mot entendu : « mer »', answer: 'mer', feedback: 'M-E-R.', audio: `${baseAudioPath}/pirate-mer.mp3` },
  { prompt: 'Écris le mot entendu : « voile »', answer: 'voile', feedback: 'V-O-I-L-E.', audio: `${baseAudioPath}/pirate-voile.mp3` },
  { prompt: 'Écris le mot entendu : « pirate »', answer: 'pirate', feedback: 'P-I-R-A-T-E.', audio: `${baseAudioPath}/pirate-pirate.mp3` },
  { prompt: 'Écris le mot entendu : « trésor »', answer: 'trésor', feedback: 'T-R-É-S-O-R.', audio: `${baseAudioPath}/pirate-tresor.mp3` },
  { prompt: 'Écris le mot entendu : « bateau »', answer: 'bateau', feedback: 'B-A-T-E-A-U.' },
  { prompt: 'Écris le mot entendu : « perle »', answer: 'perle', feedback: 'P-E-R-L-E.' },
  { prompt: 'Écris le mot entendu : « lune »', answer: 'lune', feedback: 'L-U-N-E.' },
  { prompt: 'Écris le mot entendu : « mat »', answer: 'mat', feedback: 'M-A-T.' },
]

const pirateLetterMaps = [
  {
    prompt: 'Clique les lettres pour former « perle »',
    answer: 'perle',
    feedback: 'Les perles brillent dans le trésor.',
    type: 'tiles',
    tiles: createTileWord('perle', ['a', 'u', 'i']),
  },
  {
    prompt: 'Assemble « sabre » pour t’entraîner.',
    answer: 'sabre',
    feedback: 'S-A-B-R-E comme le sabre du capitaine.',
    type: 'tiles',
    tiles: createTileWord('sabre', ['o', 'u', 'n']),
  },
  {
    prompt: 'Forme « navire » avec ta souris.',
    answer: 'navire',
    feedback: 'Le navire emmène toute l’équipe.',
    type: 'tiles',
    tiles: createTileWord('navire', ['e', 'o', 'u']),
  },
  {
    prompt: 'Reconstitue « capitaine » lettre par lettre.',
    answer: 'capitaine',
    feedback: 'C-A-P-I-T-A-I-N-E guide l’équipage.',
    type: 'tiles',
    tiles: createTileWord('capitaine', ['o', 'u', 's']),
  },
  {
    prompt: 'Compose « mousse » pour aider le bateau.',
    answer: 'mousse',
    feedback: 'Le mousse aide le capitaine sur le pont.',
    type: 'tiles',
    tiles: createTileWord('mousse', ['a', 'i', 'u']),
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
    id: 'decouverte',
    title: 'Explorateur Tranquille',
    description: 'Découvre les îles à ton rythme sans te presser.',
    reward: 'Badge explorateur',
    steps: [
      'Étape 1 : terminer un module Lecture ou Écriture.',
      'Étape 2 : ouvrir le menu mobile et lancer une nouvelle activité.',
      'Étape 3 : gagner 3 trésors différents (Lecture, Écriture, Maths).',
    ],
  },
  {
    id: 'precision',
    title: 'Œil du Perroquet',
    description: 'Reste attentif pour écrire les bons mots.',
    reward: 'Badge précision',
    steps: [
      'Étape 1 : réussir 4 réponses d’affilée.',
      'Étape 2 : obtenir 80% de bonnes réponses sur un module.',
      'Étape 3 : compléter un défi lettres sans erreur.',
    ],
  },
  {
    id: 'partage',
    title: 'Équipage soudé',
    description: 'Reviens souvent pour montrer tes progrès.',
    reward: 'Badge camarade',
    steps: [
      'Étape 1 : rejouer un module un autre jour.',
      'Étape 2 : consulter le tableau de bord pour voir tes scores.',
      'Étape 3 : débloquer un badge supplémentaire.',
    ],
  },
]
