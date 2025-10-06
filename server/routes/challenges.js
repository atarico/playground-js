const express = require('express');
const { body, validationResult } = require('express-validator');
const Challenge = require('../models/Challenge');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Obtener todos los retos (para alumnos)
router.get('/', auth, async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .select('-testCases') // No enviar los test cases a los alumnos
      .sort({ createdAt: -1 });

    res.json(challenges);
  } catch (error) {
    console.error('Error al obtener retos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener un reto específico (para alumnos)
router.get('/:id', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .select('-testCases'); // No enviar los test cases

    if (!challenge) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }

    res.json(challenge);
  } catch (error) {
    console.error('Error al obtener reto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener todos los retos con test cases (para admin)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .sort({ createdAt: -1 });

    res.json(challenges);
  } catch (error) {
    console.error('Error al obtener retos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener un reto específico con test cases (para admin)
router.get('/admin/:id', adminAuth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }

    res.json(challenge);
  } catch (error) {
    console.error('Error al obtener reto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Crear un nuevo reto (solo admin)
router.post('/',
  adminAuth,
  [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
    body('description').trim().notEmpty().withMessage('La descripción es requerida'),
    body('testCases').isArray({ min: 1 }).withMessage('Debe haber al menos un test case')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, difficulty, starterCode, testCases, points } = req.body;

      const challenge = new Challenge({
        title,
        description,
        difficulty: difficulty || 'medio',
        starterCode: starterCode || '// Escribe tu código aquí\nfunction solution() {\n  \n}',
        testCases,
        points: points || 100,
        createdBy: req.userId
      });

      await challenge.save();

      res.status(201).json(challenge);
    } catch (error) {
      console.error('Error al crear reto:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
);

// Actualizar un reto (solo admin)
router.put('/:id',
  adminAuth,
  [
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
    body('description').optional().trim().notEmpty().withMessage('La descripción no puede estar vacía')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, difficulty, starterCode, testCases, points } = req.body;

      const challenge = await Challenge.findById(req.params.id);
      if (!challenge) {
        return res.status(404).json({ message: 'Reto no encontrado' });
      }

      if (title) challenge.title = title;
      if (description) challenge.description = description;
      if (difficulty) challenge.difficulty = difficulty;
      if (starterCode) challenge.starterCode = starterCode;
      if (testCases) challenge.testCases = testCases;
      if (points !== undefined) challenge.points = points;

      await challenge.save();

      res.json(challenge);
    } catch (error) {
      console.error('Error al actualizar reto:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
);

// Eliminar un reto (solo admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Reto no encontrado' });
    }

    res.json({ message: 'Reto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar reto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
