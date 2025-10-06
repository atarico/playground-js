import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Award, BookOpen } from 'lucide-react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">
            <Code size={32} /> JS Playground
          </h1>
          <div className="nav-links">
            <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
            <Link to="/register" className="btn btn-primary">Registrarse</Link>
            <Link to="/admin/login" className="btn btn-secondary">Admin</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Aprende JavaScript Practicando</h1>
          <p className="hero-subtitle">
            Resuelve retos de programación, ejecuta código en tiempo real y mejora tus habilidades
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Comenzar Ahora
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">¿Por qué JS Playground?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Code size={48} />
              </div>
              <h3>Editor Integrado</h3>
              <p>Escribe y ejecuta código JavaScript directamente en el navegador con nuestro editor Monaco</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={48} />
              </div>
              <h3>Retos Educativos</h3>
              <p>Accede a una variedad de retos diseñados para mejorar tus habilidades de programación</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Award size={48} />
              </div>
              <h3>Evaluación Automática</h3>
              <p>Recibe feedback instantáneo con nuestro sistema de tests automáticos</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={48} />
              </div>
              <h3>Aprende a tu Ritmo</h3>
              <p>Practica cuando quieras y lleva un registro de tu progreso</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 JS Playground. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
