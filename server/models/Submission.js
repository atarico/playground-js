const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  testNumber: Number,
  passed: Boolean,
  input: String,
  expectedOutput: String,
  actualOutput: String,
  error: String,
  errorType: String, // TLE, MLE, Runtime Error, Wrong Answer, etc.
  executionTime: Number, // Tiempo en milisegundos
  memoryUsed: Number, // Memoria en bytes
  description: String
});

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  testResults: [testResultSchema],
  score: {
    type: Number,
    default: 0
  },
  totalTests: {
    type: Number,
    default: 0
  },
  passedTests: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['passed', 'failed', 'error'],
    default: 'failed'
  },
  performance: {
    totalExecutionTime: Number,
    averageExecutionTime: Number,
    maxMemoryUsed: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
