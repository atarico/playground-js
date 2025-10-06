# 💡 Soluciones de Ejemplo

Este archivo contiene soluciones de ejemplo para los retos incluidos. **No compartas esto con los alumnos** - es solo para referencia del instructor.

---

## 1. Suma de Dos Números (Fácil)

**Descripción:** Sumar dos números de un array.

### Solución:
```javascript
function solution(input) {
  return input[0] + input[1];
}
```

### Alternativa:
```javascript
function solution(input) {
  const [a, b] = input;
  return a + b;
}
```

---

## 2. Invertir una Cadena (Fácil)

**Descripción:** Invertir una cadena de texto.

### Solución:
```javascript
function solution(input) {
  return input.split('').reverse().join('');
}
```

### Alternativa (sin métodos de array):
```javascript
function solution(input) {
  let result = '';
  for (let i = input.length - 1; i >= 0; i--) {
    result += input[i];
  }
  return result;
}
```

---

## 3. Número Par o Impar (Fácil)

**Descripción:** Determinar si un número es par o impar.

### Solución:
```javascript
function solution(input) {
  return input % 2 === 0 ? 'par' : 'impar';
}
```

### Alternativa:
```javascript
function solution(input) {
  if (input % 2 === 0) {
    return 'par';
  } else {
    return 'impar';
  }
}
```

---

## 4. Encontrar el Mayor (Medio)

**Descripción:** Encontrar el número mayor en un array.

### Solución:
```javascript
function solution(input) {
  return Math.max(...input);
}
```

### Alternativa (sin Math.max):
```javascript
function solution(input) {
  let max = input[0];
  for (let i = 1; i < input.length; i++) {
    if (input[i] > max) {
      max = input[i];
    }
  }
  return max;
}
```

### Alternativa (con reduce):
```javascript
function solution(input) {
  return input.reduce((max, num) => num > max ? num : max, input[0]);
}
```

---

## 5. Contar Vocales (Medio)

**Descripción:** Contar el número de vocales en una cadena.

### Solución:
```javascript
function solution(input) {
  const vocales = 'aeiouAEIOU';
  let count = 0;
  for (let char of input) {
    if (vocales.includes(char)) {
      count++;
    }
  }
  return count;
}
```

### Alternativa (con regex):
```javascript
function solution(input) {
  const matches = input.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
```

### Alternativa (con filter):
```javascript
function solution(input) {
  const vocales = 'aeiouAEIOU';
  return input.split('').filter(char => vocales.includes(char)).length;
}
```

---

## 6. Palíndromo (Medio)

**Descripción:** Determinar si una palabra es un palíndromo.

### Solución:
```javascript
function solution(input) {
  // Eliminar espacios y convertir a minúsculas
  const cleaned = input.toLowerCase().replace(/\s/g, '');
  // Comparar con su reverso
  return cleaned === cleaned.split('').reverse().join('');
}
```

### Alternativa (comparación manual):
```javascript
function solution(input) {
  const cleaned = input.toLowerCase().replace(/\s/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
```

---

## 7. FizzBuzz (Medio)

**Descripción:** Implementar el clásico FizzBuzz.

### Solución:
```javascript
function solution(input) {
  if (input % 15 === 0) return 'FizzBuzz';
  if (input % 3 === 0) return 'Fizz';
  if (input % 5 === 0) return 'Buzz';
  return String(input);
}
```

### Alternativa:
```javascript
function solution(input) {
  let result = '';
  if (input % 3 === 0) result += 'Fizz';
  if (input % 5 === 0) result += 'Buzz';
  return result || String(input);
}
```

---

## 8. Factorial (Difícil)

**Descripción:** Calcular el factorial de un número.

### Solución (iterativa):
```javascript
function solution(input) {
  if (input === 0 || input === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= input; i++) {
    result *= i;
  }
  return result;
}
```

### Alternativa (recursiva):
```javascript
function solution(input) {
  if (input === 0 || input === 1) return 1;
  return input * solution(input - 1);
}
```

### Alternativa (con reduce):
```javascript
function solution(input) {
  if (input === 0 || input === 1) return 1;
  return Array.from({ length: input }, (_, i) => i + 1)
    .reduce((acc, num) => acc * num, 1);
}
```

---

## 9. Verificar Isograma (Medio)

**Descripción:** Determinar si una palabra o frase es un isograma (ninguna letra se repite).

### Solución (con Set - Recomendada):
```javascript
function solution(input) {
  // Convertir a minúsculas y filtrar solo letras
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  
  // Crear un Set para almacenar letras únicas
  const uniqueLetters = new Set(letters);
  
  // Si el tamaño del Set es igual al número de letras, es un isograma
  return uniqueLetters.size === letters.length;
}
```

**Complejidad:** O(n) tiempo, O(n) espacio

### Alternativa (con objeto como contador):
```javascript
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const seen = {};
  
  for (let letter of letters) {
    if (seen[letter]) return false;
    seen[letter] = true;
  }
  
  return true;
}
```

**Complejidad:** O(n) tiempo, O(n) espacio  
**Ventaja:** Más eficiente en memoria, retorna false apenas encuentra una repetición

### Alternativa (con indexOf):
```javascript
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  
  for (let i = 0; i < letters.length; i++) {
    if (letters.indexOf(letters[i]) !== letters.lastIndexOf(letters[i])) {
      return false;
    }
  }
  
  return true;
}
```

**Complejidad:** O(n²) tiempo, O(n) espacio  
**Nota:** Menos eficiente, pero más fácil de entender

### Alternativa (con every):
```javascript
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  
  return letters.split('').every((char, index) => 
    letters.indexOf(char) === index
  );
}
```

**Complejidad:** O(n²) tiempo, O(n) espacio  
**Ventaja:** Código más funcional y declarativo

### Alternativa (con Map):
```javascript
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const letterMap = new Map();
  
  for (let letter of letters) {
    if (letterMap.has(letter)) return false;
    letterMap.set(letter, true);
  }
  
  return true;
}
```

**Complejidad:** O(n) tiempo, O(n) espacio  
**Ventaja:** Similar al objeto, pero con mejor rendimiento en algunos casos

### Puntos clave del ejercicio:
- 🔤 **Normalización**: Convertir a minúsculas con `toLowerCase()`
- 🧹 **Filtrado**: Usar regex `/[^a-z]/g` para eliminar no-letras
- 🎯 **Detección de duplicados**: Set, objeto, o búsqueda manual
- ⚡ **Optimización**: Retornar temprano cuando se encuentra duplicado

---

## 📚 Consejos para Crear Nuevos Retos

### 1. Estructura del Test Case

Los test cases deben tener:
- **Input**: Expresión JavaScript válida (ej: `[1, 2]`, `"hello"`, `42`)
- **Expected Output**: Resultado en formato JSON (ej: `3`, `"HELLO"`, `true`)
- **Description**: Descripción clara del caso de prueba

### 2. Ejemplos de Inputs Válidos

```javascript
// Arrays
'[1, 2, 3]'
'["a", "b", "c"]'

// Strings
'"hello world"'
'"JavaScript"'

// Numbers
'42'
'-15'
'3.14'

// Booleans
'true'
'false'

// Objects
'{ "name": "Juan", "age": 25 }'
```

### 3. Ejemplos de Expected Outputs

```javascript
// Números
'42'
'3.14'

// Strings (con comillas)
'"hello"'
'"resultado"'

// Booleans
'true'
'false'

// Arrays
'[1,2,3]'
'["a","b"]'

// Objects
'{"key":"value"}'
```

### 4. Buenas Prácticas

- ✅ Incluir al menos 4 test cases
- ✅ Cubrir casos edge (vacíos, negativos, etc.)
- ✅ Proporcionar descripciones claras
- ✅ Validar que el código de ejemplo funcione
- ✅ Ajustar los puntos según la dificultad

### 5. Niveles de Dificultad Sugeridos

- **Fácil (100-150 pts)**: Operaciones básicas, manipulación simple
- **Medio (150-250 pts)**: Algoritmos intermedios, múltiples pasos
- **Difícil (250-400 pts)**: Algoritmos complejos, recursión, optimización

---

## 🎓 Recursos Adicionales

Para crear retos más avanzados, considera temas como:
- Algoritmos de ordenamiento
- Búsqueda binaria
- Manipulación de estructuras de datos
- Problemas matemáticos
- Validación de patrones
- Optimización de código

---

**Nota:** Estas soluciones son solo ejemplos. Hay múltiples formas de resolver cada problema. Anima a los alumnos a encontrar sus propias soluciones.
