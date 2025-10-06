# 🎯 Ejercicio: Verificar Isograma

## 📝 Descripción

Se ha agregado un nuevo ejercicio al sistema JS Playground para verificar si una palabra o frase es un **isograma**.

### ¿Qué es un isograma?

Un **isograma** es una palabra o frase en la que ninguna letra del alfabeto se repite.

### Ejemplos

| Input | Output | Explicación |
|-------|--------|-------------|
| `"murcielago"` | `true` | Ninguna letra se repite |
| `"javascript"` | `false` | La letra 'a' aparece dos veces |
| `"Dermatoglyphics"` | `true` | Palabra larga sin repeticiones |
| `"Programming"` | `false` | Las letras 'g', 'r', 'm' se repiten |
| `"the big dwarf"` | `true` | Los espacios se ignoran |
| `""` | `true` | Cadena vacía es isograma |

## 📋 Reglas

1. **Ignorar mayúsculas y minúsculas**: `'A'` y `'a'` se consideran la misma letra
2. **Ignorar espacios**: Los espacios no cuentan como caracteres
3. **Ignorar caracteres no alfabéticos**: Números y símbolos se ignoran
4. **Cadena vacía**: Se considera un isograma por definición

## 🎮 Ubicación en el Sistema

El ejercicio ha sido agregado a:

- **Archivo**: `server/seed.js`
- **Título**: "Verificar Isograma"
- **Dificultad**: Medio
- **Puntos**: 200
- **Tests**: 10 casos de prueba

## 🧪 Tests Incluidos

Se han creado **15 tests exhaustivos** en el archivo `tests/isogram.test.js`:

### Tests básicos
1. ✅ Isograma simple en español (`"murcielago"`)
2. ❌ No es isograma - letra repetida (`"javascript"`)
3. ✅ Isograma simple (`"isogram"`)
4. ❌ No es isograma - letra e repetida (`"eleven"`)

### Tests con mayúsculas
5. ❌ No es isograma - mayúsculas y minúsculas (`"Programming"`)
6. ✅ Isograma con mayúsculas (`"Dermatoglyphics"`)
7. ❌ No es isograma - letra a repetida (`"Alphabet"`)
8. ❌ Mezcla de mayúsculas y minúsculas repetidas (`"AaBbCc"`)

### Tests con espacios
9. ✅ Isograma con espacios (`"the big dwarf"`)
10. ❌ No es isograma con espacios (`"hello world"`)

### Tests con caracteres especiales
11. ✅ Isograma con números y símbolos (`"abc123!@#"`)
12. ✅ Solo números y símbolos (`"12345!@#$%"`)

### Tests de casos límite
13. ✅ Cadena vacía es isograma (`""`)
14. ✅ Una sola letra es isograma (`"a"`)
15. ✅ Isograma largo (`"subdermatoglyphic"`)

## 🚀 Cómo Usar

### 1. Actualizar la base de datos

Ejecuta el seed para agregar el ejercicio:

```bash
npm run seed
```

### 2. Ejecutar los tests

```bash
# Tests del ejercicio
npm run test:isogram

# Ejemplos con diferentes soluciones
npm run test:ejemplo
```

### 3. Probar tu solución

Crea un archivo `mi-solucion.js`:

```javascript
const { testUserSolution } = require('./tests/isogram.test.js');

function solution(input) {
  // Tu código aquí
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
}

testUserSolution(solution);
```

Ejecuta:

```bash
node mi-solucion.js
```

## 💡 Soluciones de Referencia

### Solución 1: Usando Set (Recomendada)

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

**Complejidad**: O(n) tiempo, O(n) espacio

### Solución 2: Usando objeto como contador

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

**Complejidad**: O(n) tiempo, O(n) espacio (pero más eficiente en memoria)

### Solución 3: Usando indexOf

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

**Complejidad**: O(n²) tiempo, O(n) espacio (menos eficiente)

### Solución 4: Usando every

```javascript
function solution(input) {
  const letters = input.toLowerCase().replace(/[^a-z]/g, '');
  
  return letters.split('').every((char, index) => 
    letters.indexOf(char) === index
  );
}
```

**Complejidad**: O(n²) tiempo, O(n) espacio

## 📊 Sistema de Puntuación

- **Total de tests**: 10 (en el seed) / 15 (en tests unitarios)
- **Puntaje máximo**: 200 puntos
- **Cálculo**: `(tests_pasados / total_tests) * 200`

### Distribución de puntos por test

Cada test vale aproximadamente **20 puntos** (200 / 10).

## 🎓 Conceptos que se Evalúan

1. **Manipulación de strings**
   - `toLowerCase()`: Convertir a minúsculas
   - `replace()`: Filtrar caracteres con regex
   
2. **Estructuras de datos**
   - `Set`: Almacenar valores únicos
   - Objetos: Como diccionarios/mapas
   
3. **Expresiones regulares**
   - `/[^a-z]/g`: Filtrar solo letras minúsculas
   
4. **Lógica de programación**
   - Comparación de tamaños
   - Detección de duplicados
   - Manejo de casos límite

## 📁 Archivos Creados/Modificados

### Archivos modificados
- ✅ `server/seed.js` - Agregado ejercicio de isograma
- ✅ `package.json` - Agregados scripts de test

### Archivos nuevos
- ✅ `tests/isogram.test.js` - Tests unitarios completos
- ✅ `tests/README.md` - Documentación de tests
- ✅ `tests/ejemplo-uso.js` - Ejemplos de uso
- ✅ `EJERCICIO-ISOGRAMA.md` - Este documento

## 🔍 Verificación

Para verificar que todo funciona correctamente:

```bash
# 1. Actualizar la base de datos
npm run seed

# 2. Ejecutar los tests
npm run test:isogram

# 3. Ver ejemplos
npm run test:ejemplo
```

Deberías ver:
- ✅ 15/15 tests pasados
- 🏆 200/200 puntos
- 🎉 ¡Todos los tests pasaron exitosamente!

## 📚 Recursos Adicionales

### Documentación de JavaScript
- [Set - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [String.prototype.replace() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Expresiones regulares - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

### Palabras isogramas interesantes
- **Español**: murciélago, centrifugado
- **Inglés**: uncopyrightable, dermatoglyphics, subdermatoglyphic
- **Frases**: "the big dwarf", "six-year-old"

## 🎯 Próximos Pasos

1. ✅ Ejercicio agregado al seed
2. ✅ Tests unitarios creados
3. ✅ Documentación completa
4. 🔄 Ejecutar `npm run seed` para actualizar la BD
5. 🎮 El ejercicio estará disponible en el dashboard de estudiantes

---

**Fecha de creación**: 2025-10-03  
**Dificultad**: Medio  
**Puntos**: 200  
**Tests**: 15 casos de prueba
