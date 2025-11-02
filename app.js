const avatars = [
  { id: 'lion', label: 'Léo le lion', emoji: '🦁', color: '#ffdd8b' },
  { id: 'panda', label: 'Pia le panda', emoji: '🐼', color: '#d1f1ff' },
  { id: 'koala', label: 'Kiko le koala', emoji: '🐨', color: '#c5f6d6' },
  { id: 'fox', label: 'Fanny le renard', emoji: '🦊', color: '#ffd1ba' },
  { id: 'dino', label: 'Dodo le dino', emoji: '🦕', color: '#c9e7ff' },
  { id: 'owl', label: 'Oona la chouette', emoji: '🦉', color: '#fbe2ff' }
];

const moduleData = {
  cp: {
    lecture: {
      title: 'Lecture magique',
      description: 'Découvre les sons, les syllabes et de petites histoires.',
      summary: 'Jeux phonétiques et syllabes',
      activities: [
        {
          prompt: "Quel son entends-tu dans 'maman'?",
          choices: ['son \"ma\"', 'son \"mi\"', 'son \"mo\"'],
          answer: 0,
          success: 'Bravo, tu as reconnu le son MA !'
        },
        {
          prompt: 'Complète la syllabe : BA + ? = BAL',
          choices: ['L', 'N', 'S'],
          answer: 0,
          success: 'Oui ! BA + L = BAL.'
        },
        {
          prompt: 'Lis et trouve la bonne image : Le chat dort.',
          choices: ['🐱 + 😴', '🐶 + 🐾', '🐱 + 🐟'],
          answer: 0,
          success: 'Super, le chat dort bien !'
        }
      ]
    },
    ecriture: {
      title: 'Écriture créative',
      description: 'Reconnais les lettres et écris des mots simples.',
      summary: 'Lettres et dictées rigolotes',
      activities: [
        {
          prompt: 'Quelle est la lettre qui fait le son \"sss\" ?',
          choices: ['S', 'B', 'M'],
          answer: 0,
          success: 'Sssplendide ! C’est bien la lettre S.'
        },
        {
          prompt: 'Écris le mot \"lune\" : LU + ?',
          choices: ['NE', 'NI', 'NA'],
          answer: 0,
          success: 'Lumineux ! LUNE est correct.'
        },
        {
          prompt: 'Quel mot complète : la ____ rouge',
          choices: ['pomme', 'chien', 'ciel'],
          answer: 0,
          success: 'Miam ! La pomme rouge est parfaite.'
        }
      ]
    },
    mathematiques: {
      title: 'Défis des chiffres',
      description: 'Additions et soustractions pour devenir champion.',
      summary: 'Additions et soustractions',
      activities: [
        {
          prompt: '3 + 2 = ?',
          choices: ['4', '5', '6'],
          answer: 1,
          success: '5 étoiles pour toi !'
        },
        {
          prompt: '7 - 4 = ?',
          choices: ['3', '5', '2'],
          answer: 0,
          success: 'Oui, 7 - 4 = 3.'
        },
        {
          prompt: '8 + 1 = ?',
          choices: ['7', '9', '10'],
          answer: 1,
          success: 'Formidable ! Tu comptes très bien.'
        }
      ]
    }
  },
  ce2: {
    lecture: {
      title: 'Explorateur de récits',
      description: 'Comprends des textes et découvre les sens cachés.',
      summary: 'Compréhension de texte et vocabulaire',
      activities: [
        {
          prompt: 'Lis : "Le renard malin traverse la forêt rapidement." Qui traverse la forêt ?',
          choices: ['Le renard', 'Le loup', 'Le hibou'],
          answer: 0,
          success: 'Tu as tout compris, bravo explorateur !'
        },
        {
          prompt: 'Quel mot est synonyme de "rapide" ?',
          choices: ['Vite', 'Lent', 'Court'],
          answer: 0,
          success: 'Tu files comme le vent !'
        },
        {
          prompt: 'Quel est le titre le plus adapté à une histoire qui parle de la mer ?',
          choices: ['Le mystère des vagues', 'La montagne enchantée', 'La cabane dans les arbres'],
          answer: 0,
          success: 'Tu es un vrai capitaine des mots !'
        }
      ]
    },
    ecriture: {
      title: 'Atelier des mots',
      description: 'Dictées, accords et expressions à compléter.',
      summary: 'Dictée et orthographe amusante',
      activities: [
        {
          prompt: 'Complète : Il ____ (manger) une pomme.',
          choices: ['mange', 'manges', 'mangent'],
          answer: 0,
          success: 'Exact ! Il mange une pomme.'
        },
        {
          prompt: 'Trouve le mot qui complète : un ____ de neige',
          choices: ['bonhomme', 'bouquet', 'bracelet'],
          answer: 0,
          success: 'Bonhomme de neige, bien joué !'
        },
        {
          prompt: 'Quel mot contient le son [ã] ?',
          choices: ['enfant', 'soleil', 'balai'],
          answer: 0,
          success: 'Oui, enfant contient le son [ã].'
        }
      ]
    },
    mathematiques: {
      title: 'Mission Maths',
      description: 'Entraîne-toi aux multiplications et divisions.',
      summary: 'Multiplications et divisions',
      activities: [
        {
          prompt: '3 × 4 = ?',
          choices: ['12', '9', '7'],
          answer: 0,
          success: '12 sur 10 ! Mission accomplie.'
        },
        {
          prompt: '16 ÷ 4 = ?',
          choices: ['4', '6', '3'],
          answer: 0,
          success: 'Quatre parts parfaites !'
        },
        {
          prompt: '5 × 6 = ?',
          choices: ['30', '20', '35'],
          answer: 0,
          success: 'Tu multiplies les succès !'
        }
      ]
    }
  }
};

const state = {
  player: null,
  activeModule: null,
  moduleProgress: {},
  moduleRewards: {}
};

const selectors = {
  avatarChoices: document.querySelector('#avatar-choices'),
  welcomeScreen: document.querySelector('#welcome-screen'),
  menuScreen: document.querySelector('#menu-screen'),
  moduleScreen: document.querySelector('#module-screen'),
  playerForm: document.querySelector('#player-form'),
  playerName: document.querySelector('#player-name'),
  selectedAvatar: document.querySelector('#selected-avatar'),
  playerGreeting: document.querySelector('#player-greeting'),
  playerLevel: document.querySelector('#player-level'),
  moduleList: document.querySelector('#module-list'),
  moduleTemplate: document.querySelector('#module-card-template'),
  choiceTemplate: document.querySelector('#choice-button-template'),
  moduleTitle: document.querySelector('#module-title'),
  moduleDescription: document.querySelector('#module-description'),
  moduleRewards: document.querySelector('#module-rewards'),
  activityArea: document.querySelector('#activity-area'),
  backToMenu: document.querySelector('#back-to-menu')
};

function createAvatarOptions() {
  avatars.forEach((avatar, index) => {
    const button = document.createElement('button');
    button.className = 'avatar-option';
    button.type = 'button';
    button.dataset.avatarId = avatar.id;
    button.dataset.selected = index === 0;

    button.innerHTML = `
      <span style="background:${avatar.color}" class="avatar-swatch">${avatar.emoji}</span>
      <span class="avatar-label">${avatar.label}</span>
    `;

    button.addEventListener('click', () => {
      document
        .querySelectorAll('.avatar-option')
        .forEach((option) => (option.dataset.selected = 'false'));
      button.dataset.selected = 'true';
    });

    selectors.avatarChoices.appendChild(button);
  });
}

function getSelectedAvatar() {
  const selected = selectors.avatarChoices.querySelector('[data-selected="true"]');
  const fallback = avatars[0];
  return avatars.find((a) => a.id === selected?.dataset.avatarId) ?? fallback;
}

function initializeState(player) {
  state.player = player;
  state.moduleProgress = {
    lecture: 0,
    ecriture: 0,
    mathematiques: 0
  };
  state.moduleRewards = {
    lecture: 0,
    ecriture: 0,
    mathematiques: 0
  };
}

function renderMenu() {
  selectors.moduleList.innerHTML = '';
  const levelData = moduleData[state.player.level];

  Object.entries(levelData).forEach(([key, module]) => {
    const clone = selectors.moduleTemplate.content.cloneNode(true);
    const card = clone.querySelector('.module-card');
    card.dataset.moduleKey = key;

    clone.querySelector('.module-name').textContent = module.title;
    clone.querySelector('.module-summary').textContent = module.summary;

    const progressFill = clone.querySelector('.progress-fill');
    const progressLabel = clone.querySelector('.progress-label');
    const progressValue = Math.round(
      (state.moduleProgress[key] / module.activities.length) * 100
    );
    progressFill.style.width = `${progressValue}%`;
    progressLabel.textContent = `${progressValue}% complété`;

    const rewardPreview = clone.querySelector('.module-reward-preview');
    rewardPreview.innerHTML = Array.from({ length: 3 })
      .map((_, index) => (index < state.moduleRewards[key] ? '⭐' : '☆'))
      .join('');

    const startButton = clone.querySelector('.module-start-btn');
    startButton.addEventListener('click', () => startModule(key));

    selectors.moduleList.appendChild(clone);
  });
}

function updatePlayerBadge() {
  selectors.selectedAvatar.textContent = state.player.avatar.emoji;
  selectors.selectedAvatar.style.background = state.player.avatar.color;
  selectors.playerGreeting.textContent = `Bonjour ${state.player.name} !`;
  selectors.playerLevel.textContent =
    state.player.level === 'cp'
      ? 'Niveau CP - Grandes découvertes à venir !'
      : 'Niveau CE2 - Prêt pour des défis malins !';
}

function startModule(moduleKey) {
  state.activeModule = {
    key: moduleKey,
    index: 0,
    score: 0
  };

  selectors.menuScreen.classList.add('hidden');
  selectors.moduleScreen.classList.remove('hidden');

  const module = moduleData[state.player.level][moduleKey];
  selectors.moduleTitle.textContent = module.title;
  selectors.moduleDescription.textContent = module.description;

  renderRewardCounter(moduleKey);
  renderActivity();
}

function renderRewardCounter(moduleKey) {
  const stars = state.moduleRewards[moduleKey];
  selectors.moduleRewards.innerHTML = '';

  Array.from({ length: 3 }).forEach((_, index) => {
    const star = document.createElement('span');
    star.textContent = index < stars ? '⭐' : '☆';
    selectors.moduleRewards.appendChild(star);
  });
}

function renderActivity() {
  const { key, index } = state.activeModule;
  const module = moduleData[state.player.level][key];
  const activity = module.activities[index];

  selectors.activityArea.innerHTML = '';

  if (!activity) {
    renderSummary();
    return;
  }

  const prompt = document.createElement('h3');
  prompt.className = 'activity-prompt';
  prompt.textContent = activity.prompt;

  const choiceList = document.createElement('div');
  choiceList.className = 'choice-list';

  activity.choices.forEach((choice, choiceIndex) => {
    const clone = selectors.choiceTemplate.content.cloneNode(true);
    const button = clone.querySelector('.choice-btn');
    button.textContent = choice;
    button.addEventListener('click', () => handleChoice(choiceIndex));
    choiceList.appendChild(clone);
  });

  const feedback = document.createElement('p');
  feedback.className = 'feedback-message';
  feedback.setAttribute('aria-live', 'polite');

  selectors.activityArea.append(prompt, choiceList, feedback);
}

function handleChoice(choiceIndex) {
  const { key, index } = state.activeModule;
  const module = moduleData[state.player.level][key];
  const activity = module.activities[index];
  const feedback = selectors.activityArea.querySelector('.feedback-message');

  if (choiceIndex === activity.answer) {
    feedback.textContent = activity.success;
    feedback.classList.add('success');
    feedback.classList.remove('error');
    state.activeModule.score += 1;
    awardReward(key);
  } else {
    feedback.textContent = 'Essaie encore, tu vas y arriver !';
    feedback.classList.add('error');
    feedback.classList.remove('success');
  }

  lockChoices();
  renderNextButton();
}

function lockChoices() {
  selectors.activityArea
    .querySelectorAll('.choice-btn')
    .forEach((btn) => (btn.disabled = true));
}

function renderNextButton() {
  const controls = document.createElement('div');
  controls.className = 'activity-controls';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = 'Continuer';
  nextBtn.addEventListener('click', () => {
    state.activeModule.index += 1;
    const moduleLength =
      moduleData[state.player.level][state.activeModule.key].activities.length;
    state.moduleProgress[state.activeModule.key] = Math.min(
      moduleLength,
      state.moduleProgress[state.activeModule.key] + 1
    );
    renderRewardCounter(state.activeModule.key);
    renderActivity();
    renderMenu();
  });

  controls.appendChild(nextBtn);
  selectors.activityArea.appendChild(controls);
}

function awardReward(moduleKey) {
  const currentScore = state.activeModule.score;
  const earnedStars = Math.min(
    3,
    Math.max(state.moduleRewards[moduleKey], currentScore)
  );
  state.moduleRewards[moduleKey] = earnedStars;
}

function renderSummary() {
  const { key, score } = state.activeModule;
  const total = moduleData[state.player.level][key].activities.length;
  const summary = document.createElement('div');
  summary.className = 'summary';
  summary.innerHTML = `
    <div class="trophy">🏆</div>
    <h3>Mission terminée !</h3>
    <p>Tu as réussi ${score} activité(s) sur ${total}. Continue pour gagner toutes les étoiles !</p>
    <button class="next-btn" id="back-menu-btn">Retour au menu</button>
  `;

  selectors.activityArea.appendChild(summary);

  const backMenuBtn = summary.querySelector('#back-menu-btn');
  backMenuBtn.addEventListener('click', () => {
    selectors.moduleScreen.classList.add('hidden');
    selectors.menuScreen.classList.remove('hidden');
    renderMenu();
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = selectors.playerName.value.trim();
  if (!name) {
    selectors.playerName.focus();
    return;
  }

  const level = document.querySelector('input[name="level"]:checked').value;
  const avatar = getSelectedAvatar();

  initializeState({ name, level, avatar });

  selectors.welcomeScreen.classList.add('hidden');
  selectors.menuScreen.classList.remove('hidden');

  updatePlayerBadge();
  renderMenu();
}

function setupNavigation() {
  selectors.backToMenu.addEventListener('click', () => {
    selectors.moduleScreen.classList.add('hidden');
    selectors.menuScreen.classList.remove('hidden');
    renderMenu();
  });
}

function init() {
  createAvatarOptions();
  selectors.playerForm.addEventListener('submit', handleFormSubmit);
  setupNavigation();
}

init();
