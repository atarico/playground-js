import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Code, LogOut, BookOpen, Award, TrendingUp } from 'lucide-react';
import './Dashboard.css';

function StudentDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [challengesRes, submissionsRes] = await Promise.all([
        axios.get('/api/challenges'),
        axios.get('/api/submissions/user')
      ]);
      setChallenges(challengesRes.data);
      setSubmissions(submissionsRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'fácil': return '#38ef7d';
      case 'medio': return '#f59e0b';
      case 'difícil': return '#f45c43';
      default: return '#667eea';
    }
  };

  // Calcular estadísticas correctamente
  // 1. Agrupar submissions por reto y obtener el mejor puntaje de cada uno
  const bestScoresByChallenge = {};
  const completedChallengesSet = new Set();

  submissions.forEach(sub => {
    const challengeId = sub.challenge._id;
    
    // Guardar el mejor puntaje por reto
    if (!bestScoresByChallenge[challengeId] || sub.score > bestScoresByChallenge[challengeId]) {
      bestScoresByChallenge[challengeId] = sub.score;
    }
    
    // Marcar reto como completado si alguna vez pasó todos los tests
    if (sub.status === 'passed') {
      completedChallengesSet.add(challengeId);
    }
  });

  // 2. Sumar solo los mejores puntajes (uno por reto)
  const totalScore = Object.values(bestScoresByChallenge).reduce((sum, score) => sum + score, 0);
  
  // 3. Contar retos únicos completados
  const completedChallenges = completedChallengesSet.size;

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <h1 className="logo">
            <Code size={32} /> JS Playground
          </h1>
          <div className="nav-right">
            <span className="user-name">👋 {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={20} /> Salir
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#667eea' }}>
              <BookOpen size={32} />
            </div>
            <div className="stat-info">
              <h3>{challenges.length}</h3>
              <p>Retos Disponibles</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#38ef7d' }}>
              <Award size={32} />
            </div>
            <div className="stat-info">
              <h3>{completedChallenges}</h3>
              <p>Retos Completados</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f59e0b' }}>
              <TrendingUp size={32} />
            </div>
            <div className="stat-info">
              <h3>{totalScore}</h3>
              <p>Puntos Totales</p>
            </div>
          </div>
        </div>

        <section className="challenges-section">
          <h2>Retos de Programación</h2>
          <div className="challenges-grid">
            {challenges.map(challenge => {
              const userSubmission = submissions.find(
                sub => sub.challenge._id === challenge._id && sub.status === 'passed'
              );

              return (
                <Link
                  key={challenge._id}
                  to={`/challenge/${challenge._id}`}
                  className="challenge-card"
                >
                  <div className="challenge-header">
                    <h3>{challenge.title}</h3>
                    <span
                      className="difficulty-badge"
                      style={{ background: getDifficultyColor(challenge.difficulty) }}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="challenge-description">{challenge.description}</p>
                  <div className="challenge-footer">
                    <span className="points">
                      <Award size={16} /> {challenge.points} puntos
                    </span>
                    {userSubmission && (
                      <span className="completed-badge">✓ Completado</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {challenges.length === 0 && (
            <div className="empty-state">
              <BookOpen size={64} />
              <p>No hay retos disponibles todavía</p>
            </div>
          )}
        </section>

        {submissions.length > 0 && (
          <section className="recent-submissions">
            <h2>Últimas Entregas</h2>
            <div className="submissions-list">
              {submissions.slice(0, 5).map(submission => (
                <div key={submission._id} className="submission-item">
                  <div className="submission-info">
                    <h4>{submission.challenge.title}</h4>
                    <p>
                      {submission.passedTests}/{submission.totalTests} tests pasados
                    </p>
                  </div>
                  <div className="submission-score">
                    <span className={`status-badge ${submission.status}`}>
                      {submission.status === 'passed' ? '✓ Aprobado' : '✗ Fallido'}
                    </span>
                    <span className="score">{submission.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
