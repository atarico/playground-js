# 🚀 Extendiendo JS Playground

Guía para agregar nuevas funcionalidades a la aplicación.

---

## 📊 Agregar Sistema de Rankings

### Backend

Crear nueva ruta en `server/routes/rankings.js`:

```javascript
const express = require('express');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/leaderboard', auth, async (req, res) => {
  try {
    const rankings = await Submission.aggregate([
      { $match: { status: 'passed' } },
      { $group: {
        _id: '$user',
        totalScore: { $sum: '$score' },
        challengesCompleted: { $sum: 1 }
      }},
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    const users = await User.find({ _id: { $in: rankings.map(r => r._id) } });
    
    const leaderboard = rankings.map(rank => {
      const user = users.find(u => u._id.toString() === rank._id.toString());
      return {
        name: user.name,
        totalScore: rank.totalScore,
        challengesCompleted: rank.challengesCompleted
      };
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rankings' });
  }
});

module.exports = router;
```

Agregar en `server/index.js`:
```javascript
const rankingRoutes = require('./routes/rankings');
app.use('/api/rankings', rankingRoutes);
```

### Frontend

Crear `client/src/pages/Leaderboard.js`:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy } from 'lucide-react';

function Leaderboard() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    const response = await axios.get('/api/rankings/leaderboard');
    setRankings(response.data);
  };

  return (
    <div className="leaderboard">
      <h1><Trophy /> Tabla de Posiciones</h1>
      <div className="rankings-list">
        {rankings.map((rank, index) => (
          <div key={index} className="rank-item">
            <span className="position">#{index + 1}</span>
            <span className="name">{rank.name}</span>
            <span className="score">{rank.totalScore} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
```

---

## 💬 Agregar Sistema de Comentarios

### Modelo

Crear `server/models/Comment.js`:

```javascript
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
```

### Rutas

```javascript
// GET /api/comments/:challengeId
router.get('/:challengeId', auth, async (req, res) => {
  const comments = await Comment.find({ challenge: req.params.challengeId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json(comments);
});

// POST /api/comments
router.post('/', auth, async (req, res) => {
  const comment = new Comment({
    challenge: req.body.challengeId,
    user: req.userId,
    content: req.body.content
  });
  await comment.save();
  res.status(201).json(comment);
});
```

---

## 🏆 Agregar Sistema de Badges/Logros

### Modelo

```javascript
const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  condition: String // 'complete_5_challenges', 'perfect_score', etc.
});

const userBadgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
  earnedAt: { type: Date, default: Date.now }
});
```

### Lógica de Otorgamiento

```javascript
async function checkAndAwardBadges(userId) {
  const submissions = await Submission.find({ user: userId, status: 'passed' });
  
  // Badge: Completar 5 retos
  if (submissions.length >= 5) {
    await awardBadge(userId, 'first_five');
  }
  
  // Badge: Puntaje perfecto
  const perfectScores = submissions.filter(s => s.score === s.challenge.points);
  if (perfectScores.length >= 1) {
    await awardBadge(userId, 'perfectionist');
  }
}
```

---

## 📈 Agregar Estadísticas Detalladas

### Endpoint de Estadísticas

```javascript
router.get('/stats', auth, async (req, res) => {
  const submissions = await Submission.find({ user: req.userId });
  
  const stats = {
    totalSubmissions: submissions.length,
    successRate: (submissions.filter(s => s.status === 'passed').length / submissions.length * 100).toFixed(2),
    averageScore: submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length,
    byDifficulty: {
      easy: submissions.filter(s => s.challenge.difficulty === 'fácil').length,
      medium: submissions.filter(s => s.challenge.difficulty === 'medio').length,
      hard: submissions.filter(s => s.challenge.difficulty === 'difícil').length
    }
  };
  
  res.json(stats);
});
```

---

## 🎨 Agregar Temas Personalizables

### Context para Temas

```javascript
// client/src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

---

## 📝 Agregar Editor de Markdown para Descripciones

### Instalar Dependencia

```bash
cd client
npm install react-markdown
```

### Uso

```javascript
import ReactMarkdown from 'react-markdown';

function ChallengeDescription({ description }) {
  return (
    <ReactMarkdown>
      {description}
    </ReactMarkdown>
  );
}
```

---

## 🔔 Agregar Notificaciones

### Frontend

```javascript
// client/src/context/NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      <NotificationList notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};
```

---

## 📊 Agregar Gráficos de Progreso

### Instalar Chart.js

```bash
cd client
npm install chart.js react-chartjs-2
```

### Componente de Gráfico

```javascript
import { Line } from 'react-chartjs-2';

function ProgressChart({ submissions }) {
  const data = {
    labels: submissions.map(s => new Date(s.submittedAt).toLocaleDateString()),
    datasets: [{
      label: 'Puntaje',
      data: submissions.map(s => s.score),
      borderColor: 'rgb(102, 126, 234)',
      tension: 0.1
    }]
  };

  return <Line data={data} />;
}
```

---

## 🔍 Agregar Búsqueda y Filtros

### Frontend

```javascript
function ChallengeList({ challenges }) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const filtered = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || c.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar retos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="all">Todas las dificultades</option>
        <option value="fácil">Fácil</option>
        <option value="medio">Medio</option>
        <option value="difícil">Difícil</option>
      </select>
      {/* Renderizar filtered */}
    </div>
  );
}
```

---

## 💾 Agregar Guardado Automático

### Frontend

```javascript
import { useEffect } from 'react';

function CodeEditor({ challengeId, code, setCode }) {
  useEffect(() => {
    // Cargar código guardado
    const saved = localStorage.getItem(`challenge_${challengeId}`);
    if (saved) setCode(saved);
  }, [challengeId]);

  useEffect(() => {
    // Guardar automáticamente cada 5 segundos
    const timer = setTimeout(() => {
      localStorage.setItem(`challenge_${challengeId}`, code);
    }, 5000);

    return () => clearTimeout(timer);
  }, [code, challengeId]);

  // ...
}
```

---

## 🌐 Agregar Internacionalización (i18n)

### Instalar

```bash
cd client
npm install react-i18next i18next
```

### Configuración

```javascript
// client/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        "welcome": "Bienvenido",
        "login": "Iniciar Sesión"
      }
    },
    en: {
      translation: {
        "welcome": "Welcome",
        "login": "Log In"
      }
    }
  },
  lng: "es",
  fallbackLng: "es"
});

export default i18n;
```

---

## 🔐 Agregar Autenticación con Google/GitHub

### Backend

```bash
npm install passport passport-google-oauth20
```

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // Buscar o crear usuario
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    });
  }
  done(null, user);
}));
```

---

## 📱 Hacer la App Responsive

### CSS Media Queries

```css
/* Mobile First */
.container {
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
}
```

---

## 🎯 Ideas Adicionales

- **Modo Colaborativo**: Permitir que varios alumnos trabajen juntos
- **Temporizador**: Agregar límite de tiempo para retos
- **Hints**: Sistema de pistas progresivas
- **Code Review**: Permitir que profesores revisen código
- **Exportar Progreso**: Generar reportes en PDF
- **Integración con LMS**: Conectar con Moodle, Canvas, etc.
- **API Pública**: Exponer API para integraciones externas
- **Modo Offline**: PWA con service workers
- **Tests Unitarios**: Agregar Jest para testing
- **CI/CD**: Configurar GitHub Actions

---

**¿Necesitas ayuda implementando alguna funcionalidad?** Consulta la documentación oficial de las tecnologías utilizadas o crea un issue en el repositorio.
