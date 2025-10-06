import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { ArrowLeft, Play, Send, CheckCircle, XCircle, Award } from 'lucide-react';
import './ChallengePage.css';

function ChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    try {
      const response = await axios.get(`/api/challenges/${id}`);
      setChallenge(response.data);
      setCode(response.data.starterCode);
    } catch (error) {
      console.error('Error al cargar el reto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setOutput({ error: 'Por favor escribe algo de código' });
      return;
    }

    setSubmitting(true);
    setTestResults(null);
    setOutput(null);

    try {
      const response = await axios.post('/api/submissions', {
        challengeId: id,
        code
      });

      setTestResults(response.data);
      setOutput({
        success: true,
        message: response.data.status === 'passed' 
          ? '¡Felicitaciones! Has completado el reto.' 
          : 'Algunos tests no pasaron. Revisa los resultados.'
      });
    } catch (error) {
      setOutput({
        error: error.response?.data?.message || 'Error al ejecutar el código'
      });
    } finally {
      setSubmitting(false);
    }
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
    return <div className="loading">Cargando reto...</div>;
  }

  if (!challenge) {
    return <div className="loading">Reto no encontrado</div>;
  }

  return (
    <div className="challenge-page">
      <div className="challenge-header">
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          <ArrowLeft size={20} /> Volver
        </button>
        <div className="challenge-title-section">
          <h1>{challenge.title}</h1>
          <span
            className="difficulty-badge"
            style={{ background: getDifficultyColor(challenge.difficulty) }}
          >
            {challenge.difficulty}
          </span>
          <span className="points-badge">
            <Award size={16} /> {challenge.points} puntos
          </span>
        </div>
      </div>

      <div className="challenge-container">
        <div className="challenge-description-panel">
          <div className="panel-header">
            <h2>Descripción del Reto</h2>
          </div>
          <div className="panel-content">
            <p className="description-text">{challenge.description}</p>
          </div>

          {testResults && (
            <div className="results-panel">
              <div className="results-header">
                <h3>Resultados de los Tests</h3>
                <div className="score-display">
                  <span className="score-label">Puntaje:</span>
                  <span className="score-value">
                    {testResults.score} / {testResults.maxScore}
                  </span>
                </div>
              </div>

              <div className="test-summary">
                <span className={testResults.status === 'passed' ? 'success' : 'error'}>
                  {testResults.passedTests} / {testResults.totalTests} tests pasados
                </span>
              </div>

              <div className="test-results-list">
                {testResults.testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`test-result-item ${result.passed ? 'passed' : 'failed'}`}
                  >
                    <div className="test-result-header">
                      {result.passed ? (
                        <CheckCircle size={20} color="#38ef7d" />
                      ) : (
                        <XCircle size={20} color="#f45c43" />
                      )}
                      <span className="test-number">Test {result.testNumber}</span>
                    </div>
                    {result.description && (
                      <p className="test-description">{result.description}</p>
                    )}
                    <div className="test-details">
                      <div className="test-detail">
                        <strong>Input:</strong>
                        <code>{result.input}</code>
                      </div>
                      <div className="test-detail">
                        <strong>Esperado:</strong>
                        <code>{result.expectedOutput}</code>
                      </div>
                      {result.actualOutput && (
                        <div className="test-detail">
                          <strong>Obtenido:</strong>
                          <code>{result.actualOutput}</code>
                        </div>
                      )}
                      {result.error && (
                        <div className="test-detail error">
                          <strong>Error:</strong>
                          <code>{result.error}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="challenge-editor-panel">
          <div className="panel-header">
            <h2>Editor de Código</h2>
            <button
              onClick={handleSubmit}
              className="btn btn-success"
              disabled={submitting}
            >
              {submitting ? (
                'Ejecutando...'
              ) : (
                <>
                  <Send size={20} /> Enviar Solución
                </>
              )}
            </button>
          </div>

          <div className="editor-container">
            <Editor
              height="500px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {output && (
            <div className={`output-panel ${output.error ? 'error' : 'success'}`}>
              <h3>{output.error ? 'Error' : 'Resultado'}</h3>
              <p>{output.error || output.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;
