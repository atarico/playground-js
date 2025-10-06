/**
 * Tests para el ejercicio de Verificar Isograma
 * 
 * Un isograma es una palabra o frase en la que ninguna letra se repite.
 * Ignora mayúsculas, minúsculas, espacios y caracteres no alfabéticos.
 */

const assert = require('assert');

// Solución de referencia para verificar los tests
function isIsogram(str) {
  // Convertir a minúsculas y filtrar solo letras
  const letters = str.toLowerCase().replace(/[^a-z]/g, '');
  
  // Crear un Set para almacenar letras únicas
  const uniqueLetters = new Set(letters);
  
  // Si el tamaño del Set es igual al número de letras, es un isograma
  return uniqueLetters.size === letters.length;
}

// Función para ejecutar un test
function runTest(testName, input, expectedOutput, solution) {
  try {
    const result = solution(input);
    assert.strictEqual(result, expectedOutput, 
      `Test "${testName}" falló: esperado ${expectedOutput}, recibido ${result}`);
    console.log(`✅ ${testName}: PASÓ`);
    return true;
  } catch (error) {
    console.error(`❌ ${testName}: FALLÓ`);
    console.error(`   Input: "${input}"`);
    console.error(`   Esperado: ${expectedOutput}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

// Tests del ejercicio
const tests = [
  {
    name: 'Isograma simple en español',
    input: 'murcielago',
    expectedOutput: true,
    description: 'La palabra "murciélago" contiene todas las letras sin repetir'
  },
  {
    name: 'No es isograma - letra repetida',
    input: 'javascript',
    expectedOutput: false,
    description: 'La letra "a" se repite en javascript'
  },
  {
    name: 'No es isograma - mayúsculas y minúsculas',
    input: 'Programming',
    expectedOutput: false,
    description: 'Las letras "g", "r", "m" se repiten'
  },
  {
    name: 'Isograma con mayúsculas',
    input: 'Dermatoglyphics',
    expectedOutput: true,
    description: 'Palabra larga sin letras repetidas'
  },
  {
    name: 'Isograma simple',
    input: 'isogram',
    expectedOutput: true,
    description: 'La palabra "isogram" es un isograma'
  },
  {
    name: 'No es isograma - letra e repetida',
    input: 'eleven',
    expectedOutput: false,
    description: 'La letra "e" aparece tres veces'
  },
  {
    name: 'Isograma largo',
    input: 'subdermatoglyphic',
    expectedOutput: true,
    description: 'Una de las palabras más largas en inglés que es isograma'
  },
  {
    name: 'Cadena vacía es isograma',
    input: '',
    expectedOutput: true,
    description: 'Una cadena vacía no tiene letras repetidas'
  },
  {
    name: 'Una sola letra es isograma',
    input: 'a',
    expectedOutput: true,
    description: 'Una sola letra no puede repetirse'
  },
  {
    name: 'No es isograma - letra a repetida',
    input: 'Alphabet',
    expectedOutput: false,
    description: 'La letra "a" se repite en Alphabet'
  },
  {
    name: 'Isograma con espacios',
    input: 'the big dwarf',
    expectedOutput: true,
    description: 'Los espacios se ignoran, ninguna letra se repite'
  },
  {
    name: 'No es isograma con espacios',
    input: 'hello world',
    expectedOutput: false,
    description: 'Las letras "l" y "o" se repiten'
  },
  {
    name: 'Isograma con números y símbolos',
    input: 'abc123!@#',
    expectedOutput: true,
    description: 'Solo se consideran las letras, números y símbolos se ignoran'
  },
  {
    name: 'Solo números y símbolos',
    input: '12345!@#$%',
    expectedOutput: true,
    description: 'Sin letras, se considera isograma'
  },
  {
    name: 'Mezcla de mayúsculas y minúsculas repetidas',
    input: 'AaBbCc',
    expectedOutput: false,
    description: 'A y a son la misma letra (ignorar mayúsculas)'
  }
];

// Ejecutar todos los tests
function runAllTests() {
  console.log('\n🧪 Ejecutando tests para Verificar Isograma\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach((test, index) => {
    console.log(`\nTest ${index + 1}/${tests.length}: ${test.name}`);
    console.log(`Descripción: ${test.description}`);
    
    const result = runTest(
      test.name,
      test.input,
      test.expectedOutput,
      isIsogram
    );
    
    if (result) {
      passed++;
    } else {
      failed++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resultados:`);
  console.log(`   ✅ Tests pasados: ${passed}/${tests.length}`);
  console.log(`   ❌ Tests fallidos: ${failed}/${tests.length}`);
  console.log(`   📈 Porcentaje de éxito: ${((passed / tests.length) * 100).toFixed(2)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ¡Todos los tests pasaron exitosamente!');
  } else {
    console.log('\n⚠️  Algunos tests fallaron. Revisa los errores arriba.');
  }
  
  return failed === 0;
}

// Función para probar una solución del usuario
function testUserSolution(userSolution) {
  console.log('\n🧪 Probando solución del usuario\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach((test, index) => {
    console.log(`\nTest ${index + 1}/${tests.length}: ${test.name}`);
    
    const result = runTest(
      test.name,
      test.input,
      test.expectedOutput,
      userSolution
    );
    
    if (result) {
      passed++;
    } else {
      failed++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resultados:`);
  console.log(`   ✅ Tests pasados: ${passed}/${tests.length}`);
  console.log(`   ❌ Tests fallidos: ${failed}/${tests.length}`);
  console.log(`   📈 Porcentaje de éxito: ${((passed / tests.length) * 100).toFixed(2)}%`);
  
  const score = Math.round((passed / tests.length) * 200); // 200 puntos máximo
  console.log(`   🏆 Puntaje: ${score}/200 puntos`);
  
  return {
    passed,
    failed,
    total: tests.length,
    score,
    percentage: (passed / tests.length) * 100
  };
}

// Si se ejecuta directamente, correr los tests con la solución de referencia
if (require.main === module) {
  runAllTests();
}

// Exportar para uso en otros módulos
module.exports = {
  tests,
  runTest,
  runAllTests,
  testUserSolution,
  referenceSolution: isIsogram
};
