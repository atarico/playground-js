# ⚡ Guía Rápida - Sistema de Evaluación Avanzado

## 🎯 Resumen en 5 Minutos

El sistema ahora evalúa **5 criterios** al calificar el código de los alumnos:

1. ⏱️ **Tiempo de ejecución** (TLE)
2. 💾 **Uso de memoria** (MLE)
3. 🐛 **Errores lógicos** (Overflow, null, etc.)
4. 📝 **Formato de output** (Mayúsculas, espacios)
5. ⚖️ **Pesos de tests** (Tests importantes valen más)

---

## 📋 Cómo Crear un Reto con el Nuevo Sistema

### Campos Básicos (igual que antes):
- Título
- Descripción
- Dificultad
- Código inicial
- Puntos

### Campos Nuevos (opcionales):

#### **Time Limit** (Límite de Tiempo)
```
Valor por defecto: 1000 (milisegundos)
Ejemplos:
- Problema fácil: 500ms
- Problema medio: 1000ms
- Problema difícil: 2000ms
```

#### **Memory Limit** (Límite de Memoria)
```
Valor por defecto: 256 (MB)
Ejemplos:
- Problema simple: 128MB
- Problema medio: 256MB
- Problema complejo: 512MB
```

#### **Strict Output** (Output Estricto)
```
Valor por defecto: true (activado)
- true: El output debe coincidir EXACTAMENTE
- false: Comparación más flexible
```

### Para Cada Test Case:

#### **Weight** (Peso del Test)
```
Valor por defecto: 1
Ejemplos:
- Test básico: peso 1
- Test importante: peso 2-3
- Test crítico: peso 4-5
```

#### **Hidden** (Test Oculto)
```
Valor por defecto: false
- false: El alumno ve el test antes de enviar
- true: El alumno solo lo ve después de enviar
```

---

## 💡 Ejemplo Práctico

### Reto: "Suma de Números"

```javascript
// Configuración del Reto
Title: "Suma de Números"
Description: "Suma todos los números de un array"
Difficulty: "fácil"
Time Limit: 1000
Memory Limit: 256
Strict Output: true
Points: 100

// Test Cases
Test 1:
  Input: [1, 2, 3]
  Expected Output: 6
  Description: "Caso básico"
  Weight: 1
  Hidden: false

Test 2:
  Input: [10, 20, 30, 40, 50]
  Expected Output: 150
  Description: "Array más grande"
  Weight: 1
  Hidden: false

Test 3:
  Input: [-5, 5, -10, 10]
  Expected Output: 0
  Description: "Números negativos"
  Weight: 2
  Hidden: false

Test 4:
  Input: [Array con 10,000 elementos]
  Expected Output: (suma grande)
  Description: "Test de rendimiento"
  Weight: 3
  Hidden: true
```

---

## 📊 Cómo se Calcula el Puntaje

### Sistema Anterior:
```
Puntaje = (tests pasados / total tests) * puntos del reto
Ejemplo: (2/4) * 100 = 50 puntos
```

### Sistema Nuevo (con pesos):
```
Puntaje = (suma de pesos pasados / suma de pesos totales) * puntos del reto

Ejemplo:
Test 1 (peso 1): ✅ Pasado
Test 2 (peso 1): ✅ Pasado  
Test 3 (peso 2): ❌ Fallido
Test 4 (peso 3): ❌ Fallido

Puntaje = (1 + 1) / (1 + 1 + 2 + 3) * 100 = 28.57 puntos
```

---

## 🚨 Tipos de Errores que Verán los Alumnos

### 1. TLE (Time Limit Exceeded)
```
❌ Test 3: TLE
Error: TLE: Time Limit Exceeded (1523ms > 1000ms)
Causa: Código muy lento
Solución: Optimizar algoritmo
```

### 2. MLE (Memory Limit Exceeded)
```
❌ Test 4: MLE
Error: MLE: Memory Limit Exceeded (512.45MB > 256.00MB)
Causa: Usa demasiada memoria
Solución: Reducir uso de memoria
```

### 3. Overflow Error
```
❌ Test 5: Overflow Error
Error: Posible overflow numérico - considera usar BigInt
Causa: Números muy grandes
Solución: Usar BigInt
```

### 4. Wrong Answer (Output Incorrecto)
```
❌ Test 2: Wrong Answer
Error: Output incorrecto: Diferencia en mayúsculas/minúsculas
Esperado: "Yes"
Obtenido: "YES"
Solución: Respetar formato exacto
```

---

## ✅ Ventajas para los Alumnos

1. **Feedback Específico**: Saben exactamente qué está mal
2. **Aprenden Optimización**: No solo corrección, sino eficiencia
3. **Edge Cases**: Consideran casos límite
4. **Preparación Real**: Similar a entrevistas técnicas
5. **Métricas Claras**: Ven tiempo y memoria usados

---

## 🎓 Consejos para Configurar Retos

### Problema Fácil:
```
Time Limit: 500-1000ms
Memory Limit: 128-256MB
Tests: 3-4 tests simples
Pesos: Todos peso 1
Hidden: Ninguno oculto
```

### Problema Medio:
```
Time Limit: 1000-1500ms
Memory Limit: 256MB
Tests: 4-5 tests variados
Pesos: Básicos peso 1, avanzados peso 2
Hidden: 1 test oculto
```

### Problema Difícil:
```
Time Limit: 1500-2000ms
Memory Limit: 256-512MB
Tests: 5-7 tests complejos
Pesos: Básicos peso 1, medios peso 2, difíciles peso 3-4
Hidden: 2-3 tests ocultos
```

---

## 🔧 Cambios Necesarios en la Base de Datos

**Importante:** Si ya tienes retos creados, NO necesitas hacer nada. El sistema usa valores por defecto:
- Time Limit: 1000ms
- Memory Limit: 256MB
- Strict Output: true
- Test Weight: 1
- Test Hidden: false

---

## 📱 Próximos Pasos

1. **Reiniciar el servidor** para aplicar cambios
2. **Crear un reto de prueba** con los nuevos campos
3. **Probar como alumno** para ver el feedback
4. **Ajustar límites** según necesidades

---

## ❓ Preguntas Frecuentes

**P: ¿Los retos antiguos seguirán funcionando?**
R: Sí, usarán valores por defecto automáticamente.

**P: ¿Puedo dejar los campos nuevos vacíos?**
R: Sí, se usarán los valores por defecto.

**P: ¿Cómo sé qué límites poner?**
R: Empieza con los defaults (1000ms, 256MB) y ajusta según necesidad.

**P: ¿Los alumnos ven los tests ocultos?**
R: Solo después de enviar su solución.

**P: ¿Puedo tener todos los tests con el mismo peso?**
R: Sí, déjalos en 1 (comportamiento anterior).

---

## 🚀 Ejemplo de Resultado para el Alumno

```
📊 Resultados de tu Solución

✅ Test 1: Caso básico (12ms, 0.8MB) - Pasado
✅ Test 2: Array grande (45ms, 1.2MB) - Pasado
❌ Test 3: Números negativos (8ms, 0.9MB) - Wrong Answer
   Esperado: 0
   Obtenido: -0
   Error: Output incorrecto: Diferencia en formato
❌ Test 4: Test de rendimiento (1523ms, 3.4MB) - TLE
   Error: TLE: Time Limit Exceeded (1523ms > 1000ms)

📈 Rendimiento:
   Tiempo total: 1588ms
   Tiempo promedio: 397ms
   Memoria máxima: 3.40MB

🎯 Puntaje: 28/100
   Tests pasados: 2/4
   Sugerencia: Optimiza tu código para inputs grandes
```

---

**¡El sistema está listo para usar!** 🎉

Para más detalles, consulta:
- **SISTEMA-EVALUACION-AVANZADO.md** - Guía completa
- **CAMBIOS-SISTEMA-EVALUACION.md** - Detalles técnicos
