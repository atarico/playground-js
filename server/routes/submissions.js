const express = require('express');
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const { auth } = require('../middleware/auth');
const { runCodeInSandbox } = require('../utils/sandbox');

const router = express.Router();

// Enviar una solución
router.post('/',
  auth,
  [
    body('challengeId').notEmpty().withMessage('El ID del reto es requerido'),
    body('code').notEmpty().withMessage('El código es requerido')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { challengeId, code } = req.body;

      // Obtener el reto con los test cases
      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: 'Reto no encontrado' });
      }

      // Configurar opciones de evaluación desde el reto
      const evaluationOptions = {
        timeLimit: challenge.timeLimit || 1000,
        memoryLimit: (challenge.memoryLimit || 256) * 1024 * 1024, // Convertir MB a bytes
        strictOutput: challenge.strictOutput !== false
      };

      // Ejecutar el código en el sandbox con las opciones configuradas
      const executionResult = runCodeInSandbox(code, challenge.testCases, evaluationOptions);

      // Calcular el puntaje basado en los puntos del reto y pesos de los tests
      let totalWeight = 0;
      let weightedScore = 0;
      
      challenge.testCases.forEach((testCase, index) => {
        const weight = testCase.weight || 1;
        totalWeight += weight;
        if (executionResult.testResults[index] && executionResult.testResults[index].passed) {
          weightedScore += weight;
        }
      });
      
      const finalScore = totalWeight > 0 
        ? Math.round((weightedScore / totalWeight) * challenge.points)
        : 0;

      // Crear la submission
      const submission = new Submission({
        user: req.userId,
        challenge: challengeId,
        code,
        testResults: executionResult.testResults,
        score: finalScore,
        totalTests: executionResult.totalTests,
        passedTests: executionResult.passedTests,
        status: executionResult.status === 'passed' ? 'passed' : 'failed',
        performance: executionResult.performance
      });

      await submission.save();

      res.json({
        submissionId: submission._id,
        testResults: executionResult.testResults,
        passedTests: executionResult.passedTests,
        totalTests: executionResult.totalTests,
        score: finalScore,
        maxScore: challenge.points,
        status: executionResult.status,
        performance: executionResult.performance
      });
    } catch (error) {
      console.error('Error al enviar solución:', error);
      res.status(500).json({ 
        message: 'Error al ejecutar el código',
        error: error.message 
      });
    }
  }
);

// Obtener las submissions de un usuario
router.get('/user', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.userId })
      .populate('challenge', 'title difficulty points')
      .sort({ submittedAt: -1 })
      .limit(50);

    res.json(submissions);
  } catch (error) {
    console.error('Error al obtener submissions:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener las submissions de un reto específico del usuario
router.get('/challenge/:challengeId', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({
      user: req.userId,
      challenge: req.params.challengeId
    })
      .sort({ submittedAt: -1 })
      .limit(10);

    res.json(submissions);
  } catch (error) {
    console.error('Error al obtener submissions:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener una submission específica
router.get('/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('challenge', 'title description difficulty points');

    if (!submission) {
      return res.status(404).json({ message: 'Submission no encontrada' });
    }

    // Verificar que la submission pertenece al usuario
    if (submission.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error al obtener submission:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
