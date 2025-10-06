import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import './ChallengeForm.css';

function EditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medio',
    starterCode: '',
    points: 100,
    testCases: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    try {
      const response = await axios.get(`/api/challenges/admin/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error al cargar el reto:', error);
      setError('Error al cargar el reto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index][field] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', expectedOutput: '', description: '' }]
    });
  };

  const removeTestCase = (index) => {
    if (formData.testCases.length === 1) {
      alert('Debe haber al menos un test case');
      return;
    }
    const newTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.title.trim()) {
      setError('El título es requerido');
      return;
    }

    if (!formData.description.trim()) {
      setError('La descripción es requerida');
      return;
    }

    if (formData.testCases.length === 0) {
      setError('Debe haber al menos un test case');
      return;
    }

    for (let i = 0; i < formData.testCases.length; i++) {
      const tc = formData.testCases[i];
      if (!tc.input.trim() || !tc.expectedOutput.trim()) {
        setError(`El test case ${i + 1} debe tener input y output esperado`);
        return;
      }
    }

    setSaving(true);

    try {
      await axios.put(`/api/challenges/${id}`, formData);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el reto');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando reto...</div>;
  }

  return (
    <div className="challenge-form-page">
      <div className="form-header">
        <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
          <ArrowLeft size={20} /> Volver
        </button>
        <h1>Editar Reto</h1>
      </div>

      <form onSubmit={handleSubmit} className="challenge-form">
        <div className="form-section">
          <h2>Información Básica</h2>
          
          <div className="form-group">
            <label>Título del Reto *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Suma de dos números"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el problema que los alumnos deben resolver..."
              rows="6"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Dificultad</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="fácil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>

            <div className="form-group">
              <label>Puntos</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Código Inicial</label>
            <textarea
              name="starterCode"
              value={formData.starterCode}
              onChange={handleChange}
              rows="8"
              style={{ fontFamily: 'monospace' }}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Test Cases *</h2>
            <button type="button" onClick={addTestCase} className="btn btn-success btn-sm">
              <Plus size={16} /> Agregar Test
            </button>
          </div>

          <div className="test-cases-list">
            {formData.testCases.map((testCase, index) => (
              <div key={index} className="test-case-item">
                <div className="test-case-header">
                  <h3>Test Case {index + 1}</h3>
                  {formData.testCases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Descripción (opcional)</label>
                  <input
                    type="text"
                    value={testCase.description}
                    onChange={(e) => handleTestCaseChange(index, 'description', e.target.value)}
                    placeholder="Ej: Caso básico con números positivos"
                  />
                </div>

                <div className="form-group">
                  <label>Input (JavaScript) *</label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    placeholder='Ej: [2, 3] o "hello" o 42'
                    rows="2"
                    style={{ fontFamily: 'monospace' }}
                    required
                  />
                  <small>Debe ser una expresión JavaScript válida</small>
                </div>

                <div className="form-group">
                  <label>Output Esperado (JSON) *</label>
                  <textarea
                    value={testCase.expectedOutput}
                    onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                    placeholder='Ej: 5 o "HELLO" o [1,2,3]'
                    rows="2"
                    style={{ fontFamily: 'monospace' }}
                    required
                  />
                  <small>Debe ser JSON válido o un valor primitivo</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn btn-success" disabled={saving}>
            <Save size={20} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditChallenge;
