import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Shield, LogOut, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/challenges/admin/all');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error al cargar retos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`¿Estás seguro de eliminar el reto "${title}"?`)) {
      return;
    }

    try {
      await axios.delete(`/api/challenges/${id}`);
      setChallenges(challenges.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error al eliminar reto:', error);
      alert('Error al eliminar el reto');
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

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-container">
          <h1 className="logo admin-logo">
            <Shield size={32} /> Panel de Administración
          </h1>
          <div className="nav-right">
            <span className="user-name">👤 {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={20} /> Salir
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h2>Gestión de Retos</h2>
          <Link to="/admin/challenge/create" className="btn btn-success">
            <Plus size={20} /> Crear Nuevo Reto
          </Link>
        </div>

        {challenges.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={64} />
            <p>No hay retos creados todavía</p>
            <Link to="/admin/challenge/create" className="btn btn-primary">
              <Plus size={20} /> Crear Primer Reto
            </Link>
          </div>
        ) : (
          <div className="admin-challenges-list">
            {challenges.map(challenge => (
              <div key={challenge._id} className="admin-challenge-card">
                <div className="challenge-main-info">
                  <div className="challenge-title-row">
                    <h3>{challenge.title}</h3>
                    <span
                      className="difficulty-badge"
                      style={{ background: getDifficultyColor(challenge.difficulty) }}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="challenge-description">{challenge.description}</p>
                  <div className="challenge-meta">
                    <span className="meta-item">
                      📝 {challenge.testCases?.length || 0} tests
                    </span>
                    <span className="meta-item">
                      🏆 {challenge.points} puntos
                    </span>
                    <span className="meta-item">
                      📅 {new Date(challenge.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="challenge-actions">
                  <Link
                    to={`/admin/challenge/edit/${challenge._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Edit size={16} /> Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(challenge._id, challenge.title)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
