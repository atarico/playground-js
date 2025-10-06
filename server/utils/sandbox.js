const { VM } = require('vm2');

/**
 * Ejecuta código de usuario en un sandbox seguro con evaluación avanzada
 * @param {string} userCode - Código del usuario
 * @param {Array} testCases - Casos de prueba
 * @param {Object} options - Opciones de evaluación
 * @returns {Object} - Resultados de los tests
 */
function runCodeInSandbox(userCode, testCases, options = {}) {
  const results = [];
  let passedTests = 0;
  let totalExecutionTime = 0;
  let maxMemoryUsed = 0;

  // Configuración por defecto
  const config = {
    timeLimit: options.timeLimit || 1000, // 1 segundo por test
    memoryLimit: options.memoryLimit || 256 * 1024 * 1024, // 256MB
    strictOutput: options.strictOutput !== false, // Por defecto, output estricto
    ...options
  };

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const startTime = Date.now();
    let memoryBefore = 0;
    
    try {
      // Obtener memoria inicial (aproximado)
      if (global.gc) {
        global.gc();
        memoryBefore = process.memoryUsage().heapUsed;
      }

      // Crear una nueva VM para cada test (aislamiento)
      const vm = new VM({
        timeout: config.timeLimit,
        sandbox: {}
      });

      // Preparar el código para ejecutar con medición de rendimiento
      const codeToRun = `
        ${userCode}
        
        // Ejecutar el test con medición
        (function() {
          try {
            const startMem = typeof process !== 'undefined' && process.memoryUsage ? process.memoryUsage().heapUsed : 0;
            const input = ${testCase.input};
            const result = solution(input);
            const endMem = typeof process !== 'undefined' && process.memoryUsage ? process.memoryUsage().heapUsed : 0;
            
            return { 
              success: true, 
              result: result,
              memoryUsed: endMem - startMem
            };
          } catch (error) {
            return { 
              success: false, 
              error: error.message,
              errorType: error.name
            };
          }
        })();
      `;

      const result = vm.run(codeToRun);
      const executionTime = Date.now() - startTime;
      totalExecutionTime += executionTime;

      // Calcular memoria usada
      let memoryUsed = 0;
      if (global.gc && memoryBefore > 0) {
        const memoryAfter = process.memoryUsage().heapUsed;
        memoryUsed = memoryAfter - memoryBefore;
        maxMemoryUsed = Math.max(maxMemoryUsed, memoryUsed);
      }

      // 1. Verificar TLE (Time Limit Exceeded)
      if (executionTime > config.timeLimit) {
        results.push({
          testNumber: i + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: null,
          error: `TLE: Time Limit Exceeded (${executionTime}ms > ${config.timeLimit}ms)`,
          errorType: 'TLE',
          executionTime: executionTime,
          memoryUsed: memoryUsed,
          description: testCase.description
        });
        continue;
      }

      // 2. Verificar MLE (Memory Limit Exceeded)
      if (memoryUsed > config.memoryLimit) {
        results.push({
          testNumber: i + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: null,
          error: `MLE: Memory Limit Exceeded (${(memoryUsed / 1024 / 1024).toFixed(2)}MB > ${(config.memoryLimit / 1024 / 1024).toFixed(2)}MB)`,
          errorType: 'MLE',
          executionTime: executionTime,
          memoryUsed: memoryUsed,
          description: testCase.description
        });
        continue;
      }

      // 3. Verificar errores lógicos
      if (!result.success) {
        let errorMessage = result.error;
        let errorType = result.errorType || 'Runtime Error';

        // Detectar tipos específicos de errores
        if (result.error.includes('overflow') || result.error.includes('Infinity')) {
          errorType = 'Overflow Error';
          errorMessage = `${errorMessage} (Posible overflow numérico - considera usar BigInt para números grandes)`;
        } else if (result.error.includes('undefined') || result.error.includes('null')) {
          errorType = 'Null/Undefined Error';
          errorMessage = `${errorMessage} (Verifica edge cases: valores nulos, arrays vacíos, etc.)`;
        }

        results.push({
          testNumber: i + 1,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: null,
          error: errorMessage,
          errorType: errorType,
          executionTime: executionTime,
          memoryUsed: memoryUsed,
          description: testCase.description
        });
        continue;
      }

      // 4. Verificar output con formato estricto
      const actualOutput = JSON.stringify(result.result);
      const expectedOutput = testCase.expectedOutput.trim();
      
      let passed = false;
      let outputError = null;

      if (config.strictOutput) {
        // Comparación estricta (exacta)
        passed = actualOutput === expectedOutput;
        
        if (!passed) {
          // Analizar diferencias específicas
          if (actualOutput.toLowerCase() === expectedOutput.toLowerCase()) {
            outputError = 'Output incorrecto: Diferencia en mayúsculas/minúsculas';
          } else if (actualOutput.replace(/\s+/g, '') === expectedOutput.replace(/\s+/g, '')) {
            outputError = 'Output incorrecto: Diferencia en espacios en blanco';
          } else if (typeof result.result === 'number' && typeof JSON.parse(expectedOutput) === 'number') {
            const diff = Math.abs(result.result - JSON.parse(expectedOutput));
            if (diff < 0.0001) {
              outputError = 'Output incorrecto: Diferencia en precisión decimal';
            } else {
              outputError = 'Output incorrecto: Valor numérico diferente';
            }
          } else {
            outputError = 'Output incorrecto: El formato o valor no coincide exactamente';
          }
        }
      } else {
        // Comparación flexible
        passed = actualOutput === expectedOutput;
      }

      if (passed) passedTests++;

      results.push({
        testNumber: i + 1,
        passed: passed,
        input: testCase.input,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        error: outputError,
        errorType: outputError ? 'Wrong Answer' : null,
        executionTime: executionTime,
        memoryUsed: memoryUsed,
        description: testCase.description
      });

    } catch (error) {
      const executionTime = Date.now() - startTime;
      let errorType = 'Runtime Error';
      let errorMessage = error.message || 'Error de ejecución';

      // Detectar timeout
      if (error.message && error.message.includes('timeout')) {
        errorType = 'TLE';
        errorMessage = `TLE: Time Limit Exceeded (>${config.timeLimit}ms)`;
      }

      results.push({
        testNumber: i + 1,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: null,
        error: errorMessage,
        errorType: errorType,
        executionTime: executionTime,
        memoryUsed: 0,
        description: testCase.description
      });
    }
  }

  const totalTests = testCases.length;
  const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const status = passedTests === totalTests ? 'passed' : (passedTests > 0 ? 'partial' : 'failed');

  return {
    testResults: results,
    passedTests,
    totalTests,
    score,
    status,
    performance: {
      totalExecutionTime,
      averageExecutionTime: totalExecutionTime / totalTests,
      maxMemoryUsed: (maxMemoryUsed / 1024 / 1024).toFixed(2) + 'MB'
    }
  };
}

module.exports = { runCodeInSandbox };
