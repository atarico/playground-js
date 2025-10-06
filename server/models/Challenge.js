const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  isHidden: {
    type: Boolean,
    default: false // Tests ocultos no se muestran al alumno hasta después de enviar
  },
  weight: {
    type: Number,
    default: 1 // Peso del test para el puntaje (tests más importantes pueden valer más)
  }
});

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'medio', 'difícil'],
    default: 'medio'
  },
  starterCode: {
    type: String,
    default: '// Escribe tu código aquí\nfunction solution() {\n  \n}'
  },
  testCases: [testCaseSchema],
  points: {
    type: Number,
    default: 100
  },
  // Límites de ejecución
  timeLimit: {
    type: Number,
    default: 1000 // 1 segundo en milisegundos
  },
  memoryLimit: {
    type: Number,
    default: 256 // 256 MB
  },
  strictOutput: {
    type: Boolean,
    default: true // Si es true, el output debe coincidir exactamente (mayúsculas, espacios, etc.)
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

challengeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Challenge', challengeSchema);
