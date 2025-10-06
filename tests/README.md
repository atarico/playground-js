# 🧪 Tests para JS Playground

Este directorio contiene tests unitarios para verificar las soluciones de los ejercicios.

## 📁 Estructura

```
tests/
├── README.md           # Este archivo
├── isogram.test.js     # Tests para el ejercicio de Isograma
└── ...                 # Más tests para otros ejercicios
```

## 🚀 Cómo ejecutar los tests

### Ejecutar un test específico

```bash
node tests/isogram.test.js
```

### Probar tu propia solución

Puedes crear un archivo para probar tu solución:

```javascript
// mi-solucion.js
const { testUserSolution } = require('./tests/isogram.test.js');

// Tu solución
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
}

// Probar tu solución
testUserSolution(solution);
```

Luego ejecuta:

```bash
node mi-solucion.js
```

## 📝 Ejercicio: Verificar Isograma

### Descripción

Un **isograma** es una palabra o frase en la que ninguna letra se repite.

### Ejemplos

- ✅ `"murcielago"` → `true` (ninguna letra se repite)
- ❌ `"javascript"` → `false` (la letra 'a' se repite)
- ✅ `"Dermatoglyphics"` → `true` (palabra larga sin repeticiones)
- ❌ `"Programming"` → `false` (varias letras se repiten)

### Reglas

1. **Ignora mayúsculas y minúsculas**: `'A'` y `'a'` son la misma letra
2. **Ignora espacios**: Los espacios no cuentan
3. **Ignora caracteres no alfabéticos**: Números y símbolos se ignoran
4. **Cadena vacía**: Se considera un isograma

### Casos de prueba

El archivo `isogram.test.js` incluye 15 casos de prueba que cubren:

- ✅ Isogramas simples
- ❌ Palabras con letras repetidas
- 🔤 Mayúsculas y minúsculas
- 📏 Palabras largas
- 🔢 Números y símbolos
- 📭 Cadenas vacías
- 🔤 Una sola letra

### Solución de referencia

```javascript
function isIsogram(str) {
  // Convertir a minúsculas y filtrar solo letras
  const letters = str.toLowerCase().replace(/[^a-z]/g, '');
  
  // Crear un Set para almacenar letras únicas
  const uniqueLetters = new Set(letters);
  
  // Si el tamaño del Set es igual al número de letras, es un isograma
  return uniqueLetters.size === letters.length;
}
```

### Estrategias alternativas

#### 1. Usando un objeto como contador

```javascript
function isIsogram(str) {
  const letters = str.toLowerCase().replace(/[^a-z]/g, '');
  const seen = {};
  
  for (let letter of letters) {
    if (seen[letter]) return false;
    seen[letter] = true;
  }
  
  return true;
}
```

#### 2. Usando indexOf

```javascript
function isIsogram(str) {
  const letters = str.toLowerCase().replace(/[^a-z]/g, '');
  
  for (let i = 0; i < letters.length; i++) {
    if (letters.indexOf(letters[i]) !== letters.lastIndexOf(letters[i])) {
      return false;
    }
  }
  
  return true;
}
```

#### 3. Usando every

```javascript
function isIsogram(str) {
  const letters = str.toLowerCase().replace(/[^a-z]/g, '');
  
  return letters.split('').every((char, index) => 
    letters.indexOf(char) === index
  );
}
```

## 🎯 Sistema de puntuación

- **Total de tests**: 15
- **Puntos por test**: ~13.33 puntos
- **Puntaje máximo**: 200 puntos

El puntaje se calcula como:
```
score = (tests_pasados / total_tests) * 200
```

## 📊 Salida de ejemplo

```
🧪 Ejecutando tests para Verificar Isograma

============================================================

Test 1/15: Isograma simple en español
Descripción: La palabra "murciélago" contiene todas las letras sin repetir
✅ Isograma simple en español: PASÓ

Test 2/15: No es isograma - letra repetida
Descripción: La letra "a" se repite en javascript
✅ No es isograma - letra repetida: PASÓ

...

============================================================

📊 Resultados:
   ✅ Tests pasados: 15/15
   ❌ Tests fallidos: 0/15
   📈 Porcentaje de éxito: 100.00%
   🏆 Puntaje: 200/200 puntos

🎉 ¡Todos los tests pasaron exitosamente!
```

## 🔧 Agregar más tests

Para agregar un nuevo test, edita el array `tests` en `isogram.test.js`:

```javascript
{
  name: 'Nombre del test',
  input: 'texto de entrada',
  expectedOutput: true, // o false
  description: 'Descripción de qué verifica este test'
}
```

## 📚 Recursos adicionales

- [Set en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [String.prototype.replace()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Expresiones regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Array.prototype.every()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
