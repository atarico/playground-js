# 🎯 Sistema de Evaluación Avanzado

El sistema ahora incluye criterios de evaluación profesionales similares a plataformas como Codeforces, LeetCode y HackerRank.

---

## 📊 Criterios de Evaluación

### 1️⃣ **TLE: Time Limit Exceeded** ⏱️

**¿Qué es?**
- Cada test tiene un límite de tiempo (por defecto 1 segundo).
- Si el código tarda más, el test falla aunque la lógica sea correcta.

**Ejemplo:**
```javascript
// ❌ Código lento (O(n²))
function solution(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      result.push(arr[i] + arr[j]);
    }
  }
  return result;
}
// Con arr de 10,000 elementos → TLE

// ✅ Código optimizado (O(n))
function solution(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
```

**Mensaje de error:**
```
TLE: Time Limit Exceeded (1523ms > 1000ms)
```

---

### 2️⃣ **MLE: Memory Limit Exceeded** 💾

**¿Qué es?**
- Cada test tiene un límite de memoria (por defecto 256MB).
- Si el código usa más memoria, falla aunque la lógica sea correcta.

**Ejemplo:**
```javascript
// ❌ Usa demasiada memoria
function solution(n) {
  let arr = [];
  for (let i = 0; i < n * 1000000; i++) {
    arr.push(i);
  }
  return arr.length;
}
// Con n grande → MLE

// ✅ Usa memoria eficiente
function solution(n) {
  return n * 1000000;
}
```

**Mensaje de error:**
```
MLE: Memory Limit Exceeded (512.45MB > 256.00MB)
```

---

### 3️⃣ **Errores Lógicos Ocultos** 🐛

**¿Qué son?**
- Errores que solo aparecen con inputs grandes o edge cases.
- Tests pequeños pasan, pero tests grandes fallan.

**Ejemplos comunes:**

#### Overflow Numérico
```javascript
// ❌ Overflow con números grandes
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i; // Overflow después de n=20
  }
  return result;
}

// ✅ Usa BigInt para números grandes
function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
```

#### No considera edge cases
```javascript
// ❌ No maneja arrays vacíos
function solution(arr) {
  return arr[0] + arr[arr.length - 1]; // Error si arr está vacío
}

// ✅ Maneja edge cases
function solution(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  return arr[0] + arr[arr.length - 1];
}
```

**Mensajes de error:**
```
Overflow Error: RangeError (Posible overflow numérico - considera usar BigInt para números grandes)
Null/Undefined Error: Cannot read property '0' of undefined (Verifica edge cases: valores nulos, arrays vacíos, etc.)
```

---

### 4️⃣ **Output Incorrecto por Formato** 📝

**¿Qué es?**
- El output debe coincidir EXACTAMENTE con el esperado.
- Incluye mayúsculas, espacios, formato, etc.

**Ejemplos:**

#### Mayúsculas/Minúsculas
```javascript
// Esperado: "Yes"
return "YES";  // ❌ Wrong Answer
return "yes";  // ❌ Wrong Answer
return "Yes";  // ✅ Correcto
```

#### Espacios
```javascript
// Esperado: "hello world"
return "hello  world";   // ❌ (dos espacios)
return " hello world";   // ❌ (espacio al inicio)
return "hello world ";   // ❌ (espacio al final)
return "hello world";    // ✅ Correcto
```

#### Tipo de dato
```javascript
// Esperado: 42 (número)
return "42";  // ❌ (string)
return 42.0;  // ✅ Correcto
return 42;    // ✅ Correcto
```

**Mensajes de error:**
```
Output incorrecto: Diferencia en mayúsculas/minúsculas
Output incorrecto: Diferencia en espacios en blanco
Output incorrecto: Diferencia en precisión decimal
Output incorrecto: El formato o valor no coincide exactamente
```

---

### 5️⃣ **Tests con Pesos Diferentes** ⚖️

**¿Qué son?**
- Algunos tests pueden valer más que otros.
- Tests más importantes o complejos tienen mayor peso.

**Ejemplo:**
```
Test 1: Caso básico (peso: 1)
Test 2: Caso medio (peso: 2)
Test 3: Caso complejo (peso: 3)
Test 4: Edge case (peso: 2)

Si pasas tests 1, 2 y 4:
Puntaje = (1 + 2 + 2) / (1 + 2 + 3 + 2) * 100 = 62.5%
```

---

## 🎯 Configuración de Retos

### Campos Nuevos al Crear/Editar Retos

#### **Time Limit** (Límite de Tiempo)
- Por defecto: 1000ms (1 segundo)
- Ajustar según complejidad del problema
- Ejemplos:
  - Problemas simples: 500ms
  - Problemas medios: 1000ms
  - Problemas complejos: 2000ms

#### **Memory Limit** (Límite de Memoria)
- Por defecto: 256MB
- Ajustar según necesidades
- Ejemplos:
  - Problemas simples: 128MB
  - Problemas medios: 256MB
  - Problemas con estructuras grandes: 512MB

#### **Strict Output** (Output Estricto)
- Por defecto: true (activado)
- Si está activado: el output debe coincidir EXACTAMENTE
- Si está desactivado: comparación más flexible

#### **Test Weight** (Peso del Test)
- Por defecto: 1 (todos los tests valen igual)
- Ajustar para dar más importancia a ciertos tests
- Ejemplos:
  - Tests básicos: peso 1
  - Tests intermedios: peso 2
  - Tests avanzados: peso 3
  - Edge cases críticos: peso 4

#### **Hidden Tests** (Tests Ocultos)
- Por defecto: false (visible)
- Si está activado: el alumno no ve el test hasta después de enviar
- Útil para evitar que optimicen solo para casos conocidos

---

## 📊 Información de Rendimiento

Después de enviar una solución, el alumno verá:

### Por cada test:
- ✅ o ❌ (pasado o fallido)
- ⏱️ Tiempo de ejecución (ej: 45ms)
- 💾 Memoria usada (ej: 2.3MB)
- 🏷️ Tipo de error (si aplica): TLE, MLE, Wrong Answer, etc.
- 📝 Descripción del test
- 📥 Input usado
- 📤 Output esperado vs obtenido

### Resumen general:
- ⏱️ Tiempo total de ejecución
- ⏱️ Tiempo promedio por test
- 💾 Memoria máxima usada
- 🎯 Puntaje final

---

## 🎓 Ejemplos de Configuración

### Problema Fácil: Suma de Números
```
Time Limit: 500ms
Memory Limit: 128MB
Strict Output: true

Test 1 (peso 1): [1, 2, 3] → 6
Test 2 (peso 1): [10, 20] → 30
Test 3 (peso 1): [-5, 5] → 0
Test 4 (peso 1): [0] → 0
```

### Problema Medio: Palíndromo
```
Time Limit: 1000ms
Memory Limit: 256MB
Strict Output: true

Test 1 (peso 1): "radar" → true
Test 2 (peso 1): "hello" → false
Test 3 (peso 2): "A man a plan a canal Panama" → true (con espacios)
Test 4 (peso 2, hidden): "racecar123" → false (edge case)
```

### Problema Difícil: Factorial Grande
```
Time Limit: 2000ms
Memory Limit: 512MB
Strict Output: true

Test 1 (peso 1): 5 → 120
Test 2 (peso 2): 20 → 2432902008176640000
Test 3 (peso 3): 100 → (número muy grande, requiere BigInt)
Test 4 (peso 4, hidden): 1000 → (requiere optimización)
```

---

## 🚀 Ventajas del Sistema

1. **Feedback Detallado**: Los alumnos saben exactamente qué falló
2. **Aprendizaje Real**: Aprenden a optimizar código
3. **Edge Cases**: Fuerza a considerar casos límite
4. **Profesional**: Similar a entrevistas técnicas reales
5. **Justo**: El puntaje refleja la calidad del código

---

## 💡 Consejos para Alumnos

### Para Evitar TLE:
- ✅ Usa algoritmos eficientes (O(n) mejor que O(n²))
- ✅ Evita bucles anidados innecesarios
- ✅ Usa métodos nativos optimizados (`.reduce()`, `.map()`, etc.)

### Para Evitar MLE:
- ✅ No crees arrays innecesariamente grandes
- ✅ Reutiliza variables cuando sea posible
- ✅ Usa generadores para secuencias grandes

### Para Evitar Errores Lógicos:
- ✅ Prueba con arrays vacíos
- ✅ Prueba con un solo elemento
- ✅ Prueba con números negativos
- ✅ Prueba con números muy grandes
- ✅ Prueba con valores nulos/undefined

### Para Output Correcto:
- ✅ Lee cuidadosamente el formato esperado
- ✅ Respeta mayúsculas/minúsculas
- ✅ No agregues espacios extra
- ✅ Retorna el tipo de dato correcto

---

## 🔧 Cómo Usar en el Panel de Admin

1. **Crear/Editar Reto**
2. **Configurar Límites:**
   - Time Limit: 1000 (milisegundos)
   - Memory Limit: 256 (MB)
   - Strict Output: ✅ (activado)

3. **Agregar Tests:**
   - Input: `[1, 2, 3]`
   - Expected Output: `6`
   - Description: `Suma de tres números`
   - Weight: `1` (o mayor para tests importantes)
   - Hidden: ☐ (desactivado) o ✅ (activado para tests ocultos)

4. **Guardar Reto**

---

## 📈 Interpretación de Resultados

### Alumno A:
```
✅ Test 1: 45ms, 1.2MB - Passed
✅ Test 2: 52ms, 1.5MB - Passed
❌ Test 3: 1200ms, 3.4MB - TLE
❌ Test 4: 890ms, 2.1MB - Wrong Answer

Puntaje: 50/100
Problema: Código lento para inputs grandes
```

### Alumno B:
```
✅ Test 1: 12ms, 0.8MB - Passed
✅ Test 2: 15ms, 0.9MB - Passed
✅ Test 3: 234ms, 1.2MB - Passed
✅ Test 4: 187ms, 1.1MB - Passed

Puntaje: 100/100
Excelente: Código eficiente y correcto
```

---

**Este sistema prepara a los alumnos para desafíos de programación competitiva y entrevistas técnicas reales.** 🎓🚀
