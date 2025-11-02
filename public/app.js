const API_BASE = '';
const TIMER_DURATION = 30;
const MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2021/02/18/audio_b52ca3d23b.mp3?filename=happy-children-113985.mp3';

const AVATARS = [
  { id: 'astronaute', label: 'Astronaute rigolo', src: 'assets/avatars/astronaute.svg' },
  { id: 'dragon', label: 'Dragon joueur', src: 'assets/avatars/dragon.svg' },
  { id: 'pingouin', label: 'Pingouin chic', src: 'assets/avatars/pingouin.svg' },
  { id: 'licorne', label: 'Licorne magique', src: 'assets/avatars/licorne.svg' }
];

const BADGE_LIBRARY = {
  focus_master: { label: 'Badge concentration', condition: '3 bonnes réponses d\'affilée' },
  speedster: { label: 'Badge rapide', condition: 'Répondre en moins de 10s' },
  storyteller: { label: 'Conteuse/Conteur', condition: 'Finir 3 textes de compréhension' },
  math_wizard: { label: 'Sorcier des maths', condition: 'Obtenir 90% en maths' }
};

const MODULES = [
  {
    id: 'lecture',
    title: 'Lecture enchantée',
    description: 'Sons, syllabes et histoires captivantes',
    color: '#ffb347',
    levels: [
      {
        key: 'cp-sons',
        grade: 'cp',
        title: 'Les sons rigolos',
        description: 'Associe chaque son à la bonne image ou syllabe.',
        reward: 3,
        activities: [
          {
            id: 'cp-sons-1',
            type: 'multiple',
            question: 'Quel mot commence par le son [ma] ?',
            options: ['moto', 'maman', 'tasse'],
            answer: 'maman',
            promptAudio: 'Quel mot commence par le son ma ?',
            points: 10
          },
          {
            id: 'cp-sons-2',
            type: 'multiple',
            question: 'Clique sur la syllabe qui complète le mot « li__ » pour dire un animal.',
            options: ['vre', 'on', 'eu'],
            answer: 'on',
            promptAudio: 'Choisis la syllabe qui complète le mot li pour dire lion',
            points: 10
          },
          {
            id: 'cp-sons-3',
            type: 'multiple',
            question: 'Quel dessin représente le son [ch] ?',
            options: ['chat', 'coco', 'roue'],
            answer: 'chat',
            promptAudio: 'Quel dessin représente le son ch',
            points: 10
          }
        ]
      },
      {
        key: 'cp-syllabes',
        grade: 'cp',
        title: 'Assemblages de syllabes',
        description: 'Lis les syllabes et trouve le bon mot.',
        reward: 3,
        activities: [
          {
            id: 'cp-syllabes-1',
            type: 'fill',
            question: 'Complète le mot : ba __ on',
            answer: 'll',
            promptAudio: 'Complète le mot ballon en ajoutant les bonnes lettres',
            points: 10
          },
          {
            id: 'cp-syllabes-2',
            type: 'multiple',
            question: 'Quelle syllabe termine « cha__ » ?',
            options: ['peau', 'ton', 'veu'],
            answer: 'ton',
            promptAudio: 'Choisis la syllabe qui termine chaton',
            points: 10
          },
          {
            id: 'cp-syllabes-3',
            type: 'fill',
            question: 'Complète le mot : ra __ e pour parler d\'un animal de la ferme.',
            answer: 'tie',
            promptAudio: 'Complète le mot rat ? pour parler d un animal de la ferme',
            normalize: true,
            points: 10
          }
        ]
      },
      {
        key: 'cp-comprehension',
        grade: 'cp',
        title: 'Mini histoire',
        description: 'Lis un petit texte et réponds à la question.',
        reward: 3,
        activities: [
          {
            id: 'cp-histoire-1',
            type: 'story',
            question: 'Léa trouve un trésor dans la forêt. Que trouve-t-elle ?',
            text: 'Léa marche dans la forêt magique. Elle voit un coffre brillant sous un arbre. Quand elle l\'ouvre, elle découvre un collier d\'étoiles qui brille très fort.',
            options: ['Un collier d\'étoiles', 'Un robot', 'Un gâteau'],
            answer: 'Un collier d\'étoiles',
            promptAudio: 'Après avoir lu l histoire, que trouve Léa dans le coffre ?',
            points: 15
          }
        ]
      },
      {
        key: 'ce2-sons',
        grade: 'ce2',
        title: 'Sons complexes',
        description: 'Repère les sons difficiles dans des mots.',
        reward: 3,
        activities: [
          {
            id: 'ce2-sons-1',
            type: 'multiple',
            question: 'Quel mot contient le son [gn] ?',
            options: ['campagne', 'camion', 'caméra'],
            answer: 'campagne',
            promptAudio: 'Quel mot contient le son gn',
            points: 10
          },
          {
            id: 'ce2-sons-2',
            type: 'multiple',
            question: 'Quel mot contient le son [ill] comme dans « fille » ?',
            options: ['famille', 'fête', 'photo'],
            answer: 'famille',
            promptAudio: 'Quel mot contient le son ille comme dans fille',
            points: 10
          },
          {
            id: 'ce2-sons-3',
            type: 'multiple',
            question: 'Quel mot contient le son [oin] ?',
            options: ['lapin', 'coin', 'maman'],
            answer: 'coin',
            promptAudio: 'Quel mot contient le son oin',
            points: 10
          }
        ]
      },
      {
        key: 'ce2-comprehension',
        grade: 'ce2',
        title: 'Compréhension CE2',
        description: 'Lis un texte et réponds à plusieurs questions.',
        reward: 3,
        activities: [
          {
            id: 'ce2-histoire-1',
            type: 'story',
            question: 'Après la lecture, réponds aux questions.',
            text: 'Corentin reçoit une lettre mystérieuse. Elle lui demande de résoudre trois énigmes pour ouvrir un coffre. Il réfléchit, note ses idées et finit par trouver : il devait additionner les nombres cachés dans chaque phrase.',
            multi:
              [
                {
                  question: 'Combien d\'énigmes Corentin doit-il résoudre ?',
                  options: ['Deux', 'Trois', 'Quatre'],
                  answer: 'Trois'
                },
                {
                  question: 'Que devait faire Corentin pour ouvrir le coffre ?',
                  options: ['Additionner des nombres', 'Trouver une clé', 'Chanter une chanson'],
                  answer: 'Additionner des nombres'
                }
              ],
            promptAudio: 'Lis le texte puis réponds aux questions sur Corentin et les énigmes',
            points: 20
          }
        ]
      }
    ]
  },
  {
    id: 'ecriture',
    title: 'Atelier d\'écriture',
    description: 'Dictées, mots à compléter et lettres à classer',
    color: '#ff8fab',
    levels: [
      {
        key: 'cp-lettres',
        grade: 'cp',
        title: 'Complète les mots',
        description: 'Trouve les lettres manquantes.',
        reward: 3,
        activities: [
          {
            id: 'cp-lettres-1',
            type: 'fill',
            question: 'Complète : so__ur',
            answer: 'eu',
            promptAudio: 'Complète le mot soeur en ajoutant les bonnes lettres',
            points: 10
          },
          {
            id: 'cp-lettres-2',
            type: 'fill',
            question: 'Complète : ca__t',
            answer: 'rot',
            promptAudio: 'Complète le mot carotte',
            points: 10
          },
          {
            id: 'cp-lettres-3',
            type: 'multiple',
            question: 'Quelle lettre complète « li_e » pour parler d\'un livre ?',
            options: ['v', 'b', 'm'],
            answer: 'v',
            promptAudio: 'Quelle lettre complète le mot livre',
            points: 10
          }
        ]
      },
      {
        key: 'cp-classe',
        grade: 'cp',
        title: 'Classe les lettres',
        description: 'Range les lettres dans la bonne famille.',
        reward: 3,
        activities: [
          {
            id: 'cp-classe-1',
            type: 'sort',
            question: 'Classe les lettres entre voyelles et consonnes.',
            categories: [
              { key: 'voyelle', label: 'Voyelles' },
              { key: 'consonne', label: 'Consonnes' }
            ],
            items: [
              { label: 'a', answer: 'voyelle' },
              { label: 'm', answer: 'consonne' },
              { label: 'o', answer: 'voyelle' },
              { label: 'l', answer: 'consonne' }
            ],
            promptAudio: 'Classe chaque lettre entre voyelle ou consonne',
            points: 15
          }
        ]
      },
      {
        key: 'cp-dictee',
        grade: 'cp',
        title: 'Dictée magique',
        description: 'Écoute et écris le mot.',
        reward: 3,
        activities: [
          {
            id: 'cp-dictee-1',
            type: 'dictation',
            question: 'Écris le mot entendu : « lune »',
            answer: 'lune',
            promptAudio: 'Écris le mot lune',
            points: 10
          },
          {
            id: 'cp-dictee-2',
            type: 'dictation',
            question: 'Écris le mot entendu : « tapis »',
            answer: 'tapis',
            promptAudio: 'Écris le mot tapis',
            points: 10
          }
        ]
      },
      {
        key: 'ce2-dictee',
        grade: 'ce2',
        title: 'Dictées CE2',
        description: 'Des mots un peu plus longs.',
        reward: 3,
        activities: [
          {
            id: 'ce2-dictee-1',
            type: 'dictation',
            question: 'Écris le mot entendu : « aventure »',
            answer: 'aventure',
            promptAudio: 'Écris le mot aventure',
            points: 10
          },
          {
            id: 'ce2-dictee-2',
            type: 'fill',
            question: 'Complète : imagina__on',
            answer: 'ti',
            promptAudio: 'Complète le mot imagination',
            points: 10
          }
        ]
      },
      {
        key: 'ce2-classe',
        grade: 'ce2',
        title: 'Classe les homophones',
        description: 'Choisis le bon mot dans la phrase.',
        reward: 3,
        activities: [
          {
            id: 'ce2-homophones-1',
            type: 'multiple',
            question: 'Choisis le mot correct : « Ils __ partis jouer. »',
            options: ['sont', 'son'],
            answer: 'sont',
            promptAudio: 'Choisis entre sont et son pour compléter la phrase',
            points: 10
          },
          {
            id: 'ce2-homophones-2',
            type: 'multiple',
            question: 'Complète : « Tu as pris __ cahier ? »',
            options: ['mon', 'm\'on'],
            answer: 'mon',
            promptAudio: 'Choisis la bonne orthographe pour mon',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'maths',
    title: 'Maths malins',
    description: 'Additions, soustractions, problèmes et plus encore',
    color: '#4bc070',
    levels: [
      {
        key: 'cp-additions',
        grade: 'cp',
        title: 'Additions et soustractions',
        description: 'Additionne et soustrais jusqu\'à 20.',
        reward: 3,
        activities: [
          {
            id: 'cp-add-1',
            type: 'multiple',
            question: '5 + 4 = ?',
            options: ['8', '9', '7'],
            answer: '9',
            promptAudio: 'Combien font cinq plus quatre',
            points: 10
          },
          {
            id: 'cp-add-2',
            type: 'multiple',
            question: '9 - 3 = ?',
            options: ['6', '4', '5'],
            answer: '6',
            promptAudio: 'Combien font neuf moins trois',
            points: 10
          },
          {
            id: 'cp-add-3',
            type: 'problem',
            question:
              'Maxence a 6 billes. Il en gagne 2 de plus. Combien de billes a-t-il maintenant ?',
            options: ['8', '7', '9'],
            answer: '8',
            promptAudio: 'Maxence a six billes et en gagne deux, combien en a-t-il maintenant',
            illustration: 'assets/avatars/dragon.svg',
            points: 15
          }
        ]
      },
      {
        key: 'cp-problems',
        grade: 'cp',
        title: 'Petits problèmes illustrés',
        description: 'Lis le problème et choisis la bonne réponse.',
        reward: 3,
        activities: [
          {
            id: 'cp-problem-1',
            type: 'problem',
            question:
              'Corentin a 10 pommes. Il en mange 3. Combien lui en reste-t-il ?',
            options: ['7', '6', '5'],
            answer: '7',
            promptAudio: 'Corentin a dix pommes et en mange trois, combien en reste-t-il',
            illustration: 'assets/avatars/pingouin.svg',
            points: 15
          }
        ]
      },
      {
        key: 'ce2-multiplication',
        grade: 'ce2',
        title: 'Multiplications et divisions',
        description: 'Révise les tables et partage équitablement.',
        reward: 3,
        activities: [
          {
            id: 'ce2-mult-1',
            type: 'multiple',
            question: '6 × 4 = ?',
            options: ['24', '18', '20'],
            answer: '24',
            promptAudio: 'Combien font six fois quatre',
            points: 10
          },
          {
            id: 'ce2-mult-2',
            type: 'multiple',
            question: '18 ÷ 3 = ?',
            options: ['6', '4', '5'],
            answer: '6',
            promptAudio: 'Combien font dix-huit divisé par trois',
            points: 10
          },
          {
            id: 'ce2-mult-3',
            type: 'problem',
            question:
              'Une fusée transporte 24 robots répartis dans 6 navettes identiques. Combien de robots par navette ?',
            options: ['4', '5', '6'],
            answer: '4',
            promptAudio: 'Vingt-quatre robots dans six navettes, combien par navette',
            illustration: 'assets/avatars/astronaute.svg',
            points: 15
          }
        ]
      },
      {
        key: 'ce2-problems',
        grade: 'ce2',
        title: 'Problèmes illustrés',
        description: 'Résous des situations de la vie.',
        reward: 3,
        activities: [
          {
            id: 'ce2-problem-1',
            type: 'problem',
            question:
              'Pour une fête, Corentin prépare 4 gâteaux coupés en 8 parts chacun. Il distribue 26 parts. Combien reste-t-il de parts ?',
            options: ['6', '8', '4'],
            answer: '6',
            promptAudio: 'Corentin prépare quatre gâteaux de huit parts et en distribue vingt-six, combien reste-t-il de parts',
            illustration: 'assets/avatars/licorne.svg',
            points: 20
          }
        ]
      }
    ]
  }
];

const MODULE_LABELS = new Map(MODULES.map((module) => [module.id, module.title]));
const LEVEL_LABELS = new Map(
  MODULES.flatMap((module) => module.levels.map((level) => [level.key, level.title]))
);

class CountdownTimer {
  constructor(duration, onTick, onComplete) {
    this.initialDuration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.interval = null;
    this.expired = false;
  }

  start() {
    this.stop();
    this.expired = false;
    const start = Date.now();
    this.interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      this.remaining = Math.max(this.initialDuration - elapsed, 0);
      this.onTick?.(this.remaining, this.initialDuration);
      if (this.remaining <= 0) {
        this.expired = true;
        this.stop();
        this.onComplete?.();
      }
    }, 200);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset(duration = this.initialDuration) {
    this.stop();
    this.initialDuration = duration;
    this.remaining = duration;
    this.expired = false;
    this.onTick?.(this.remaining, this.initialDuration);
  }
}

class AudioManager {
  constructor() {
    this.ctx = null;
    this.effects = new Map();
    this.music = null;
    this.musicEnabled = false;
    this.effectsEnabled = true;
    this.assetsLoaded = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  async ensureAssets() {
    if (this.assetsLoaded) return;
    const files = [
      { key: 'success', url: 'assets/audio/success.mp3' },
      { key: 'error', url: 'assets/audio/error.mp3' },
      { key: 'encouragement', url: 'assets/audio/encouragement.mp3' }
    ];
    await Promise.all(
      files.map(async (file) => {
        try {
          const response = await fetch(file.url, { method: 'HEAD' });
          if (response.ok) {
            this.effects.set(file.key, file.url);
          }
        } catch (error) {
          // ignore missing optional file
        }
      })
    );
    this.assetsLoaded = true;
  }

  toggleMusic(enabled) {
    this.musicEnabled = enabled;
    if (!enabled && this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      return;
    }

    if (enabled) {
      if (!this.music) {
        this.music = new Audio(MUSIC_URL);
        this.music.loop = true;
        this.music.volume = 0.2;
      }
      this.music.play().catch(() => {
        /* ignore */
      });
    }
  }

  playEffect(type) {
    if (!this.effectsEnabled) return;
    this.ensureAssets().then(() => {
      const url = this.effects.get(type);
      if (url) {
        const audio = new Audio(url);
        audio.volume = type === 'error' ? 0.4 : 0.6;
        audio.play().catch(() => {
          this.playTone(type);
        });
      } else {
        this.playTone(type);
      }
    });
  }

  playTone(type) {
    this.init();
    const duration = 0.25;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    oscillator.type = type === 'error' ? 'sawtooth' : 'sine';
    oscillator.frequency.value = type === 'error' ? 220 : 880;
    gain.gain.value = 0.12;
    oscillator.connect(gain);
    gain.connect(this.ctx.destination);
    oscillator.start();
    oscillator.stop(this.ctx.currentTime + duration);
  }

  speak(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }
}

const audioManager = new AudioManager();

const state = {
  currentUser: null,
  currentModule: null,
  currentLevel: null,
  currentActivityIndex: 0,
  timer: null,
  stars: 0,
  streak: 0,
  timedOut: false,
  lastResult: null
};

const ui = {
  body: document.body,
  auth: document.querySelector('#auth-section'),
  signupForm: document.querySelector('#signup-form'),
  loginForm: document.querySelector('#login-form'),
  signupFeedback: document.querySelector('#signup-feedback'),
  loginFeedback: document.querySelector('#login-feedback'),
  signupAvatars: document.querySelector('#signup-avatars'),
  loginAvatars: document.querySelector('#login-avatars'),
  dashboard: document.querySelector('#dashboard'),
  parentDashboard: document.querySelector('#parent-dashboard'),
  playerName: document.querySelector('#player-name'),
  playerLevel: document.querySelector('#player-level'),
  playerAvatar: document.querySelector('#player-avatar'),
  playerScore: document.querySelector('#player-score'),
  moduleGrid: document.querySelector('#module-grid'),
  moduleProgress: document.querySelector('#module-progress'),
  badgeList: document.querySelector('#badge-list'),
  progressSummary: document.querySelector('#progress-summary'),
  themeSwitcher: document.querySelector('#theme-switcher'),
  musicToggle: document.querySelector('#music-toggle'),
  logout: document.querySelector('#logout'),
  parentMode: document.querySelector('#parent-mode'),
  closeParent: document.querySelector('#close-parent'),
  activitySection: document.querySelector('#activity-section'),
  activityContainer: document.querySelector('#activity-container'),
  activityTitle: document.querySelector('#activity-title'),
  activityDescription: document.querySelector('#activity-description'),
  timerProgress: document.querySelector('#timer-progress'),
  timerLabel: document.querySelector('#timer-label'),
  closeActivity: document.querySelector('#close-activity'),
  retryActivity: document.querySelector('#retry-activity'),
  activityStars: document.querySelector('#activity-stars'),
  scoreBody: document.querySelector('#score-body'),
  scoreModuleFilter: document.querySelector('#score-module-filter'),
  scoreLevelFilter: document.querySelector('#score-level-filter'),
  parentScoreBody: document.querySelector('#parent-score-body'),
  parentModuleFilter: document.querySelector('#parent-module-filter'),
  parentLevelFilter: document.querySelector('#parent-level-filter')
};

function renderAvatarOptions(container, name) {
  container.innerHTML = '';
  AVATARS.forEach((avatar) => {
    const label = document.createElement('label');
    label.className = 'avatar-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = avatar.id;
    input.required = true;
    const img = document.createElement('img');
    img.src = avatar.src;
    img.alt = avatar.label;
    label.append(input, img);
    container.appendChild(label);
  });
  const firstInput = container.querySelector('input');
  if (firstInput) {
    firstInput.checked = true;
  }
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

function normalizeAnswer(value) {
  return value.toString().trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function showDashboard() {
  ui.auth.classList.add('hidden');
  ui.dashboard.classList.remove('hidden');
}

function showAuth() {
  ui.dashboard.classList.add('hidden');
  ui.parentDashboard.classList.add('hidden');
  ui.auth.classList.remove('hidden');
}

async function postJson(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Erreur réseau');
  }
  return response.json();
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur réseau');
  }
  return response.json();
}

function updatePlayerCard() {
  const { currentUser } = state;
  if (!currentUser) return;
  ui.playerName.textContent = `Bienvenue ${currentUser.name} !`;
  ui.playerLevel.textContent = currentUser.level === 'cp' ? 'Niveau CP' : 'Niveau CE2';
  ui.playerAvatar.src = AVATARS.find((a) => a.id === currentUser.avatar)?.src || AVATARS[0].src;
  ui.playerScore.textContent = state.lastResult
    ? `Dernier score : ${state.lastResult.score}/${state.lastResult.max}`
    : 'Prêt pour une nouvelle mission !';
  ui.themeSwitcher.value = currentUser.theme;
  setTheme(currentUser.theme);
}

function renderModuleProgress(summary) {
  ui.moduleProgress.innerHTML = '';
  const summaryData = Array.isArray(summary) ? summary : [];
  MODULES.forEach((module) => {
    const progress = summaryData.filter((item) => item.module === module.id);
    const totalLevels = module.levels.filter((level) => level.grade === state.currentUser.level).length;
    const completed = progress.length;
    const percent = totalLevels ? Math.min(100, Math.round((completed / totalLevels) * 100)) : 0;
    const bar = document.createElement('div');
    bar.className = 'module-progress-bar';
    bar.innerHTML = `
      <div class="progress-card">
        <h4>${module.title}</h4>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
        <span class="module-progress-label">${completed}/${totalLevels} niveaux</span>
      </div>
    `;
    ui.moduleProgress.appendChild(bar);
  });
}

function renderBadges(badges) {
  ui.badgeList.innerHTML = '';
  if (!badges.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun badge débloqué pour le moment. Continue !';
    ui.badgeList.appendChild(empty);
    return;
  }
  const template = document.querySelector('#badge-template');
  badges.forEach((badge) => {
    const data = BADGE_LIBRARY[badge.badge_key] || { label: badge.badge_key, condition: '' };
    const fragment = template.content.cloneNode(true);
    fragment.querySelector('.badge-title').textContent = data.label;
    fragment.querySelector('.badge-date').textContent = formatDate(badge.unlocked_at);
    ui.badgeList.appendChild(fragment);
  });
}

function renderSummary(totals) {
  ui.progressSummary.innerHTML = '';
  if (!totals || !totals.totalSessions) {
    ui.progressSummary.innerHTML = '<li>Commence une activité pour voir ta progression ✨</li>';
    return;
  }
  const items = [
    `Sessions jouées : ${totals.totalSessions}`,
    `Score cumulé : ${totals.cumulativeScore || 0}`,
    `Réponses correctes : ${totals.totalCorrect || 0} / ${totals.totalQuestions || 0}`,
    totals.avgTime ? `Temps moyen de réponse : ${Math.round(totals.avgTime)} sec` : null
  ].filter(Boolean);
  items.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ui.progressSummary.appendChild(li);
  });
}

function renderModules() {
  ui.moduleGrid.innerHTML = '';
  MODULES.forEach((module) => {
    const card = document.createElement('article');
    card.className = 'module-card';
    card.style.setProperty('--module-color', module.color);
    const description = document.createElement('p');
    description.textContent = module.description;
    const btn = document.createElement('button');
    btn.className = 'cta';
    btn.textContent = 'Jouer';
    btn.addEventListener('click', () => openModule(module));
    card.innerHTML = `<h4>${module.title}</h4>`;
    card.append(description);
    const levelList = document.createElement('ul');
    levelList.className = 'summary-list';
    module.levels
      .filter((level) => level.grade === state.currentUser.level)
      .forEach((level) => {
        const li = document.createElement('li');
        li.textContent = level.title;
        levelList.appendChild(li);
      });
    card.append(levelList, btn);
    ui.moduleGrid.appendChild(card);
  });
}

function resetActivityStars() {
  ui.activityStars.innerHTML = '';
  for (let i = 0; i < 3; i += 1) {
    const star = document.createElement('span');
    star.textContent = '⭐';
    ui.activityStars.appendChild(star);
  }
}

function updateTimerUI(remaining, total) {
  const percent = (remaining / total) * 100;
  ui.timerProgress.style.strokeDashoffset = `${100 - percent}`;
  ui.timerLabel.textContent = `${remaining}s`;
  ui.timerProgress.style.stroke = remaining <= 10 ? '#f05482' : 'var(--accent)';
}

function createOptionButtons(options, multiSelect = false) {
  const container = document.createElement('div');
  container.className = 'choice-grid';
  options.forEach((option) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => {
      if (!multiSelect) {
        container.querySelectorAll('.choice-btn').forEach((el) => el.classList.remove('selected'));
      }
      btn.classList.toggle('selected');
    });
    container.appendChild(btn);
  });
  return container;
}

function createSortActivity(activity) {
  const wrapper = document.createElement('div');
  wrapper.className = 'sort-grid';
  activity.items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'input-group';
    const label = document.createElement('span');
    label.textContent = item.label;
    const select = document.createElement('select');
    select.className = 'fill-input';
    select.dataset.answer = item.answer;
    select.required = true;
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Choisir';
    select.appendChild(emptyOption);
    activity.categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.key;
      option.textContent = category.label;
      select.appendChild(option);
    });
    row.append(label, select);
    wrapper.appendChild(row);
  });
  return wrapper;
}

function renderStory(activity, container) {
  const text = document.createElement('p');
  text.textContent = activity.text;
  text.className = 'story-text';
  container.appendChild(text);
  if (activity.multi) {
    activity.multi.forEach((sub) => {
      const block = document.createElement('div');
      block.className = 'story-question';
      const question = document.createElement('p');
      question.textContent = sub.question;
      const options = createOptionButtons(sub.options);
      block.append(question, options);
      container.appendChild(block);
    });
  } else {
    const options = createOptionButtons(activity.options);
    container.appendChild(options);
  }
}

function openModule(module) {
  state.currentModule = module;
  const firstLevel = module.levels.find((level) => level.grade === state.currentUser.level);
  if (!firstLevel) return;
  openLevel(firstLevel);
}

function openLevel(level) {
  state.currentLevel = level;
  state.currentActivityIndex = 0;
  state.stars = 0;
  state.streak = 0;
  state.timedOut = false;
  ui.activitySection.classList.remove('hidden');
  ui.activityTitle.textContent = level.title;
  ui.activityDescription.textContent = level.description;
  resetActivityStars();
  renderActivity();
}

function renderActivity() {
  const level = state.currentLevel;
  if (!level) return;
  const activity = level.activities[state.currentActivityIndex];
  if (!activity) {
    finalizeLevel();
    return;
  }
  ui.activityContainer.innerHTML = '';
  const template = document.querySelector('#activity-template');
  const fragment = template.content.cloneNode(true);
  fragment.querySelector('.activity-question').textContent = activity.question;
  const audioBtn = fragment.querySelector('.audio-btn');
  audioBtn.addEventListener('click', () => audioManager.speak(activity.promptAudio || activity.question));
  const body = fragment.querySelector('.activity-body');

  let inputElement = null;
  switch (activity.type) {
    case 'multiple':
    case 'problem': {
      if (activity.illustration) {
        const img = document.createElement('img');
        img.src = activity.illustration;
        img.alt = 'Illustration du problème';
        img.style.maxWidth = '140px';
        body.appendChild(img);
      }
      const choices = createOptionButtons(activity.options);
      body.appendChild(choices);
      inputElement = choices;
      break;
    }
    case 'fill':
    case 'dictation': {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'fill-input';
      input.placeholder = 'Écris ta réponse';
      body.appendChild(input);
      inputElement = input;
      if (activity.type === 'dictation') {
        audioManager.speak(activity.promptAudio || activity.question);
      }
      break;
    }
    case 'sort': {
      const grid = createSortActivity(activity);
      body.appendChild(grid);
      inputElement = grid;
      break;
    }
    case 'story': {
      renderStory(activity, body);
      inputElement = body;
      break;
    }
    default:
      break;
  }

  const skipBtn = fragment.querySelector('.activity-skip');
  skipBtn.addEventListener('click', () => {
    state.currentActivityIndex += 1;
    renderActivity();
  });

  const submitBtn = fragment.querySelector('.activity-submit');
  submitBtn.addEventListener('click', () => {
    evaluateActivity(activity, inputElement);
  });

  ui.activityContainer.appendChild(fragment);

  if (state.timer) {
    state.timer.stop();
  }
  state.timer = new CountdownTimer(
    activity.timeLimit || TIMER_DURATION,
    updateTimerUI,
    () => {
      state.timedOut = true;
      audioManager.playEffect('error');
    }
  );
  state.timer.reset(activity.timeLimit || TIMER_DURATION);
  state.timer.start();
  updateTimerUI(activity.timeLimit || TIMER_DURATION, activity.timeLimit || TIMER_DURATION);
}

function collectSelectedOptions(container) {
  return Array.from(container.querySelectorAll('.choice-btn.selected')).map((btn) => btn.textContent.trim());
}

function evaluateActivity(activity, inputElement) {
  let isCorrect = false;
  let earned = activity.points || 10;
  let totalQuestions = 1;
  let correctCount = 0;

  switch (activity.type) {
    case 'multiple':
    case 'problem': {
      const selected = collectSelectedOptions(inputElement);
      isCorrect = selected.includes(activity.answer);
      correctCount = isCorrect ? 1 : 0;
      break;
    }
    case 'fill':
    case 'dictation': {
      const value = inputElement.value;
      if (!value) {
        audioManager.playEffect('error');
        return;
      }
      const expected = activity.normalize ? normalizeAnswer(activity.answer) : activity.answer.toLowerCase();
      const userValue = activity.normalize ? normalizeAnswer(value) : value.toLowerCase();
      isCorrect = userValue === expected;
      correctCount = isCorrect ? 1 : 0;
      break;
    }
    case 'sort': {
      const selects = inputElement.querySelectorAll('select');
      totalQuestions = selects.length;
      selects.forEach((select) => {
        if (select.value === select.dataset.answer) {
          correctCount += 1;
        }
      });
      isCorrect = correctCount === selects.length;
      earned = Math.round((correctCount / selects.length) * (activity.points || 10));
      break;
    }
    case 'story': {
      const questions = inputElement.querySelectorAll('.story-question');
      if (questions.length) {
        totalQuestions = questions.length;
        questions.forEach((questionEl, index) => {
          const sub = activity.multi[index];
          const selected = collectSelectedOptions(questionEl);
          if (selected.includes(sub.answer)) {
            correctCount += 1;
          }
        });
        isCorrect = correctCount === totalQuestions;
        earned = Math.round((correctCount / totalQuestions) * (activity.points || 10));
      } else {
        const selected = collectSelectedOptions(inputElement);
        isCorrect = selected.includes(activity.answer);
        correctCount = isCorrect ? 1 : 0;
      }
      break;
    }
    default:
      break;
  }

  if (state.timer) {
    state.timer.stop();
  }

  if (state.timedOut) {
    earned = Math.max(1, Math.round(earned * 0.5));
  }

  if (isCorrect) {
    state.streak += 1;
    state.stars = Math.min(3, state.stars + 1);
    audioManager.playEffect('success');
  } else {
    state.streak = 0;
    audioManager.playEffect('error');
  }

  Array.from(ui.activityStars.children).forEach((star, index) => {
    star.style.opacity = index < state.stars ? '1' : '0.3';
  });

  saveActivityResult(activity, {
    isCorrect,
    earned,
    correctCount,
    totalQuestions
  });
}

async function saveActivityResult(activity, stats) {
  if (!state.currentUser || !state.currentLevel) return;
  const timeLimit = activity.timeLimit || TIMER_DURATION;
  const timeSpent = state.timer ? Math.min(timeLimit, Math.max(0, timeLimit - state.timer.remaining)) : timeLimit;
  const payload = {
    userId: state.currentUser.id,
    module: state.currentModule.id,
    levelKey: state.currentLevel.key,
    activityKey: activity.id,
    score: stats.earned,
    maxScore: activity.points || 10,
    correctCount: stats.correctCount,
    totalQuestions: stats.totalQuestions,
    timeSpentSeconds: Math.round(timeSpent),
    timedOut: state.timedOut,
    streak: state.streak,
    details: stats,
    unlockedBadges: computeBadges(stats)
  };

  try {
    await postJson('/api/activities/submit', payload);
    state.lastResult = { score: payload.score, max: payload.maxScore };
    state.currentActivityIndex += 1;
    state.timedOut = false;
    updatePlayerCard();
    renderActivity();
    refreshProgress();
  } catch (error) {
    console.error(error);
  }
}

function computeBadges(stats) {
  const unlocked = [];
  if (state.streak >= 3) {
    unlocked.push('focus_master');
  }
  if (!state.timedOut && (state.timer?.remaining ?? TIMER_DURATION) >= 20 && stats.isCorrect) {
    unlocked.push('speedster');
  }
  if (state.currentModule?.id === 'lecture' && state.currentLevel?.key.includes('comprehension') && stats.correctCount >= stats.totalQuestions) {
    unlocked.push('storyteller');
  }
  if (state.currentModule?.id === 'maths' && stats.earned >= 9) {
    unlocked.push('math_wizard');
  }
  return unlocked;
}

function finalizeLevel() {
  audioManager.playEffect('success');
  ui.activityContainer.innerHTML = '<p>Bravo ! Niveau terminé 🎉 Tu peux rejouer pour améliorer ton score.</p>';
}

async function refreshProgress() {
  if (!state.currentUser) return;
  try {
    const progress = await getJson(`/api/users/${state.currentUser.id}/progress`);
    renderBadges(progress.badges || []);
    renderSummary(progress.totals);
    renderModuleProgress(progress.summary || []);
    loadScores();
    loadParentScores();
  } catch (error) {
    console.error(error);
  }
}

async function loadScores() {
  if (!state.currentUser) return;
  const moduleFilter = ui.scoreModuleFilter.value;
  const levelFilter = ui.scoreLevelFilter.value;
  const params = new URLSearchParams();
  if (moduleFilter) params.set('module', moduleFilter);
  if (levelFilter) params.set('level', levelFilter);
  const url = `/api/users/${state.currentUser.id}/scores${params.toString() ? `?${params}` : ''}`;
  try {
    const scores = await getJson(url);
    ui.scoreBody.innerHTML = '';
    if (!scores.length) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="6">Aucun score enregistré pour l\'instant.</td>';
      ui.scoreBody.appendChild(row);
      return;
    }
    scores.forEach((score) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${formatDate(score.completed_at)}</td>
        <td>${MODULE_LABELS.get(score.module) || score.module}</td>
        <td>${LEVEL_LABELS.get(score.level_key) || score.level_key}</td>
        <td>${score.score}/${score.max_score}</td>
        <td>${score.time_spent_seconds ?? 0}s</td>
        <td>${score.streak}</td>
      `;
      ui.scoreBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadParentScores() {
  const params = new URLSearchParams();
  if (ui.parentModuleFilter.value) params.set('module', ui.parentModuleFilter.value);
  if (ui.parentLevelFilter.value) params.set('level', ui.parentLevelFilter.value);
  const url = `/api/leaderboard${params.toString() ? `?${params}` : ''}`;
  try {
    const rows = await getJson(url);
    ui.parentScoreBody.innerHTML = '';
    if (!rows.length) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="5">Encore aucun résultat. Encourage tes aventuriers !</td>';
      ui.parentScoreBody.appendChild(row);
      return;
    }
    rows.forEach((entry) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.name} (${entry.school_level.toUpperCase()})</td>
        <td>${MODULE_LABELS.get(entry.module) || entry.module || '—'}</td>
        <td>${LEVEL_LABELS.get(entry.level_key) || entry.level_key || '—'}</td>
        <td>${entry.best_score ?? '—'}</td>
        <td>${entry.last_played ? formatDate(entry.last_played) : '—'}</td>
      `;
      ui.parentScoreBody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

function populateFilters() {
  const moduleOptions = MODULES.map((module) => `<option value="${module.id}">${module.title}</option>`).join('');
  ui.scoreModuleFilter.insertAdjacentHTML('beforeend', moduleOptions);
  ui.parentModuleFilter.insertAdjacentHTML('beforeend', moduleOptions);

  const levelOptions = MODULES.flatMap((module) =>
    module.levels.map((level) => `<option value="${level.key}">${level.title}</option>`)
  ).join('');
  ui.scoreLevelFilter.insertAdjacentHTML('beforeend', levelOptions);
  ui.parentLevelFilter.insertAdjacentHTML('beforeend', levelOptions);
}

function bindEvents() {
  ui.signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(ui.signupForm);
    const data = Object.fromEntries(form.entries());
    try {
      const user = await postJson('/api/signup', {
        name: data.name,
        age: Number(data.age),
        level: data.level,
        avatar: data.avatar,
        theme: data.theme
      });
      state.currentUser = user;
      updatePlayerCard();
      renderModules();
      showDashboard();
      ui.signupFeedback.textContent = 'Compte créé ! Tu peux commencer à jouer.';
      refreshProgress();
    } catch (error) {
      ui.signupFeedback.textContent = error.message;
    }
  });

  ui.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(ui.loginForm);
    const data = Object.fromEntries(form.entries());
    try {
      const user = await postJson('/api/login', {
        name: data.name,
        avatar: data.avatar
      });
      state.currentUser = user;
      updatePlayerCard();
      renderModules();
      showDashboard();
      ui.loginFeedback.textContent = 'Bienvenue de retour !';
      refreshProgress();
    } catch (error) {
      ui.loginFeedback.textContent = error.message;
    }
  });

  ui.themeSwitcher.addEventListener('change', async (event) => {
    if (!state.currentUser) return;
    const theme = event.target.value;
    try {
      const updated = await postJson(`/api/users/${state.currentUser.id}/theme`, { theme });
      state.currentUser.theme = updated.theme;
      setTheme(updated.theme);
    } catch (error) {
      console.error(error);
    }
  });

  ui.logout.addEventListener('click', () => {
    state.currentUser = null;
    state.currentModule = null;
    showAuth();
  });

  ui.closeActivity.addEventListener('click', () => {
    ui.activitySection.classList.add('hidden');
  });

  ui.retryActivity.addEventListener('click', () => {
    state.currentActivityIndex = 0;
    state.stars = 0;
    state.timedOut = false;
    resetActivityStars();
    renderActivity();
  });

  ui.musicToggle.addEventListener('click', () => {
    const enabled = ui.musicToggle.getAttribute('aria-pressed') === 'true';
    ui.musicToggle.setAttribute('aria-pressed', String(!enabled));
    audioManager.toggleMusic(!enabled);
  });

  ui.parentMode.addEventListener('click', () => {
    ui.parentDashboard.classList.remove('hidden');
    loadParentScores();
  });

  ui.closeParent.addEventListener('click', () => {
    ui.parentDashboard.classList.add('hidden');
  });

  ui.scoreModuleFilter.addEventListener('change', loadScores);
  ui.scoreLevelFilter.addEventListener('change', loadScores);
  ui.parentModuleFilter.addEventListener('change', loadParentScores);
  ui.parentLevelFilter.addEventListener('change', loadParentScores);
}

function init() {
  populateFilters();
  renderAvatarOptions(ui.signupAvatars, 'avatar');
  renderAvatarOptions(ui.loginAvatars, 'avatar');
  bindEvents();
  setTheme('foret');
}

init();
