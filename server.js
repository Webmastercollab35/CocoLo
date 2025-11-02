const express = require('express');
const cors = require('cors');
const path = require('path');
const { nanoid } = require('nanoid');
const { initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

let dbPromise = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = initDb();
  }
  return dbPromise;
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/signup', async (req, res) => {
  try {
    const { name, age, level, avatar, theme = 'foret' } = req.body;
    if (!name || !age || !level || !avatar) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const db = await getDb();
    const existing = await db.get('SELECT * FROM users WHERE name = ?', name.trim());
    if (existing) {
      return res.status(409).json({ error: 'Ce prénom est déjà inscrit. Utilise la connexion.' });
    }

    const id = nanoid();
    await db.run(
      'INSERT INTO users (id, name, age, level, avatar, theme) VALUES (?, ?, ?, ?, ?, ?)',
      id,
      name.trim(),
      age,
      level,
      avatar,
      theme
    );

    const sessionId = nanoid();
    await db.run('INSERT INTO sessions (id, user_id) VALUES (?, ?)', sessionId, id);

    res.status(201).json({
      id,
      name: name.trim(),
      age,
      level,
      avatar,
      theme,
      sessionId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de créer le compte." });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      return res.status(400).json({ error: 'Merci de renseigner ton prénom et ton avatar.' });
    }

    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE name = ? AND avatar = ?', name.trim(), avatar);
    if (!user) {
      return res.status(404).json({ error: 'Profil introuvable. Vérifie le prénom et l\'avatar.' });
    }

    const sessionId = nanoid();
    await db.run('INSERT INTO sessions (id, user_id) VALUES (?, ?)', sessionId, user.id);

    res.json({
      id: user.id,
      name: user.name,
      age: user.age,
      level: user.level,
      avatar: user.avatar,
      theme: user.theme,
      sessionId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Connexion impossible pour le moment.' });
  }
});

app.post('/api/users/:id/theme', async (req, res) => {
  try {
    const { theme } = req.body;
    const { id } = req.params;
    const db = await getDb();
    await db.run('UPDATE users SET theme = ? WHERE id = ?', theme, id);
    const user = await db.get('SELECT * FROM users WHERE id = ?', id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de mettre à jour le thème.' });
  }
});

app.get('/api/users/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();

    const summary = await db.all(
      `SELECT module, level_key, COUNT(*) as attempts, MAX(score) as best_score,
              MAX(correct_count) as best_correct, MAX(streak) as best_streak
       FROM activity_results
       WHERE user_id = ?
       GROUP BY module, level_key`
      , id
    );

    const totals = await db.get(
      `SELECT COUNT(*) as totalSessions,
              SUM(score) as cumulativeScore,
              AVG(time_spent_seconds) as avgTime,
              SUM(correct_count) as totalCorrect,
              SUM(total_questions) as totalQuestions
       FROM activity_results
       WHERE user_id = ?`,
      id
    );

    const badges = await db.all('SELECT badge_key, unlocked_at FROM badges WHERE user_id = ?', id);

    res.json({ summary, totals, badges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de récupérer la progression.' });
  }
});

app.get('/api/users/:id/scores', async (req, res) => {
  try {
    const { id } = req.params;
    const { module, level } = req.query;
    const db = await getDb();

    let query = 'SELECT * FROM activity_results WHERE user_id = ?';
    const params = [id];

    if (module) {
      query += ' AND module = ?';
      params.push(module);
    }

    if (level) {
      query += ' AND level_key = ?';
      params.push(level);
    }

    query += ' ORDER BY datetime(completed_at) DESC';

    const rows = await db.all(query, ...params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de récupérer les scores.' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const { module, level } = req.query;
    const db = await getDb();

    let query = `SELECT u.id as user_id, u.name, u.level as school_level, u.avatar,
                        ar.module, ar.level_key,
                        MAX(ar.score) as best_score,
                        MAX(ar.completed_at) as last_played
                 FROM users u
                 LEFT JOIN activity_results ar ON ar.user_id = u.id`;
    const params = [];
    const filters = [];

    if (module) {
      filters.push('ar.module = ?');
      params.push(module);
    }

    if (level) {
      filters.push('ar.level_key = ?');
      params.push(level);
    }

    if (filters.length) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    query +=
      ' GROUP BY u.id, ar.module, ar.level_key ORDER BY (best_score IS NULL), best_score DESC, last_played DESC';

    const rows = await db.all(query, ...params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de générer le tableau des scores.' });
  }
});

app.post('/api/activities/submit', async (req, res) => {
  try {
    const {
      userId,
      module,
      levelKey,
      activityKey,
      score,
      maxScore,
      correctCount,
      totalQuestions,
      timeSpentSeconds,
      timedOut,
      streak,
      details,
      unlockedBadges = []
    } = req.body;

    if (!userId || !module || !levelKey || !activityKey) {
      return res.status(400).json({ error: 'Certaines informations sont manquantes.' });
    }

    const db = await getDb();
    const resultId = nanoid();

    await db.run(
      `INSERT INTO activity_results
        (id, user_id, module, level_key, activity_key, score, max_score, correct_count, total_questions, time_spent_seconds, timed_out, streak, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      resultId,
      userId,
      module,
      levelKey,
      activityKey,
      score,
      maxScore,
      correctCount,
      totalQuestions,
      timeSpentSeconds,
      timedOut ? 1 : 0,
      streak,
      details ? JSON.stringify(details) : null
    );

    const insertedBadges = [];
    for (const badgeKey of unlockedBadges) {
      try {
        const badgeId = nanoid();
        await db.run(
          'INSERT OR IGNORE INTO badges (id, user_id, badge_key) VALUES (?, ?, ?)',
          badgeId,
          userId,
          badgeKey
        );
        insertedBadges.push(badgeKey);
      } catch (err) {
        console.error('Badge non inséré', err);
      }
    }

    res.status(201).json({ resultId, insertedBadges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible d'enregistrer la partie." });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

getDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CocoLo est prêt sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de démarrage de la base de données', err);
    process.exit(1);
  });
