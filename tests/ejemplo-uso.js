/**
 * Ejemplo de cómo usar los tests para verificar tu solución
 * 
 * Ejecuta este archivo con: node tests/ejemplo-uso.js
 */

const { testUserSolution } = require('./isogram.test.js');

// ============================================================
// EJEMPLO 1: Solución correcta usando Set
// ============================================================
console.log('\n📝 EJEMPLO 1: Solución usando Set\n');

function solucionConSet(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
}

testUserSolution(solucionConSet);

// ============================================================
// EJEMPLO 2: Solución correcta usando objeto
// ============================================================
console.log('\n\n📝 EJEMPLO 2: Solución usando objeto como contador\n');

function solucionConObjeto(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const seen = {};
  
  for (let letter of letters) {
    if (seen[letter]) return false;
    seen[letter] = true;
  }
  
  return true;
}

testUserSolution(solucionConObjeto);

// ============================================================
// EJEMPLO 3: Solución correcta usando indexOf
// ============================================================
console.log('\n\n📝 EJEMPLO 3: Solución usando indexOf\n');

function solucionConIndexOf(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  
  for (let i = 0; i < letters.length; i++) {
    if (letters.indexOf(letters[i]) !== letters.lastIndexOf(letters[i])) {
      return false;
    }
  }
  
  return true;
}

testUserSolution(solucionConIndexOf);

// ============================================================
// EJEMPLO 4: Solución INCORRECTA (no ignora mayúsculas)
// ============================================================
console.log('\n\n📝 EJEMPLO 4: Solución INCORRECTA - No ignora mayúsculas\n');

function solucionIncorrecta1(input) {
  // ERROR: No convierte a minúsculas
  const letters = input.replace(/[^a-zA-Z]/g, '');
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
}

testUserSolution(solucionIncorrecta1);

// ============================================================
// EJEMPLO 5: Solución INCORRECTA (no filtra caracteres)
// ============================================================
console.log('\n\n📝 EJEMPLO 5: Solución INCORRECTA - No filtra caracteres no alfabéticos\n');

function solucionIncorrecta2(input) {
  // ERROR: No elimina espacios y símbolos
  const letters = input.toLowerCase();
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
}

testUserSolution(solucionIncorrecta2);

// ============================================================
// RESUMEN
// ============================================================
console.log('\n\n' + '='.repeat(60));
console.log('📚 RESUMEN DE EJEMPLOS');
console.log('='.repeat(60));
console.log('\n✅ Ejemplos 1, 2 y 3: Soluciones correctas con diferentes enfoques');
console.log('❌ Ejemplos 4 y 5: Soluciones incorrectas que no cumplen todos los requisitos');
console.log('\n💡 Puntos clave:');
console.log('   1. Convertir a minúsculas para ignorar mayúsculas');
console.log('   2. Filtrar solo letras (eliminar espacios, números, símbolos)');
console.log('   3. Verificar que no haya letras repetidas');
console.log('\n');
