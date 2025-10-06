# 🏗️ Arquitectura de JS Playground

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                      http://localhost:3000                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │    Home      │  │    Login     │  │   Register   │         │
│  │   Landing    │  │   Students   │  │   Students   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Admin Login  │  │   Student    │  │    Admin     │         │
│  │              │  │  Dashboard   │  │  Dashboard   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Challenge   │  │   Create     │  │     Edit     │         │
│  │     Page     │  │  Challenge   │  │  Challenge   │         │
│  │ (Monaco Ed.) │  │   (Admin)    │  │   (Admin)    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │           AuthContext (JWT Management)              │        │
│  └────────────────────────────────────────────────────┘        │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP/REST API
                         │ axios requests
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      BACKEND (Express)                           │
│                    http://localhost:5000                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                   API Routes                         │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  /api/auth                                           │       │
│  │    POST /register        - Registro de alumnos      │       │
│  │    POST /login           - Login de alumnos         │       │
│  │    POST /admin/login     - Login de admin           │       │
│  │                                                      │       │
│  │  /api/challenges                                     │       │
│  │    GET  /                - Listar retos (alumnos)   │       │
│  │    GET  /:id             - Ver reto (alumnos)       │       │
│  │    GET  /admin/all       - Listar retos (admin)     │       │
│  │    GET  /admin/:id       - Ver reto (admin)         │       │
│  │    POST /                - Crear reto (admin)       │       │
│  │    PUT  /:id             - Editar reto (admin)      │       │
│  │    DELETE /:id           - Eliminar reto (admin)    │       │
│  │                                                      │       │
│  │  /api/submissions                                    │       │
│  │    POST /                - Enviar solución          │       │
│  │    GET  /user            - Mis entregas             │       │
│  │    GET  /challenge/:id   - Entregas por reto        │       │
│  │    GET  /:id             - Ver entrega específica   │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                  Middleware                          │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  auth()       - Verificar JWT token                 │       │
│  │  adminAuth()  - Verificar permisos de admin         │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                Code Execution                        │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  runCodeInSandbox()                                 │       │
│  │    - Ejecuta código en VM2 sandbox                  │       │
│  │    - Timeout de 5 segundos                          │       │
│  │    - Aislamiento completo                           │       │
│  │    - Ejecuta tests automáticos                      │       │
│  │    - Calcula puntaje                                │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Mongoose ODM
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      DATABASE (MongoDB)                          │
│                mongodb://localhost:27017/js-playground           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  Collection: users                                   │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  - _id                                               │       │
│  │  - name                                              │       │
│  │  - email (unique)                                    │       │
│  │  - password (hashed with bcrypt)                     │       │
│  │  - isAdmin (boolean)                                 │       │
│  │  - createdAt                                         │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  Collection: challenges                              │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  - _id                                               │       │
│  │  - title                                             │       │
│  │  - description                                       │       │
│  │  - difficulty (fácil/medio/difícil)                 │       │
│  │  - starterCode                                       │       │
│  │  - testCases []                                      │       │
│  │    - input                                           │       │
│  │    - expectedOutput                                  │       │
│  │    - description                                     │       │
│  │  - points                                            │       │
│  │  - createdBy (ref: User)                             │       │
│  │  - createdAt                                         │       │
│  │  - updatedAt                                         │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  Collection: submissions                             │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  - _id                                               │       │
│  │  - user (ref: User)                                  │       │
│  │  - challenge (ref: Challenge)                        │       │
│  │  - code                                              │       │
│  │  - testResults []                                    │       │
│  │    - testNumber                                      │       │
│  │    - passed (boolean)                                │       │
│  │    - input                                           │       │
│  │    - expectedOutput                                  │       │
│  │    - actualOutput                                    │       │
│  │    - error                                           │       │
│  │  - score                                             │       │
│  │  - totalTests                                        │       │
│  │  - passedTests                                       │       │
│  │  - status (passed/failed/error)                      │       │
│  │  - submittedAt                                       │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### 1. Registro de Usuario

```
Usuario → Frontend (Register.js)
  ↓
  POST /api/auth/register { name, email, password }
  ↓
Backend (auth.js)
  ↓
  Validar datos
  ↓
  Hash password (bcrypt)
  ↓
  Guardar en MongoDB (users)
  ↓
  Generar JWT token
  ↓
  Retornar { token, user }
  ↓
Frontend guarda token en localStorage
  ↓
Redirigir a /dashboard
```

### 2. Login de Usuario

```
Usuario → Frontend (Login.js)
  ↓
  POST /api/auth/login { email, password }
  ↓
Backend (auth.js)
  ↓
  Buscar usuario por email
  ↓
  Comparar password (bcrypt)
  ↓
  Generar JWT token
  ↓
  Retornar { token, user }
  ↓
Frontend guarda token en localStorage
  ↓
Redirigir a /dashboard
```

### 3. Ver Retos (Alumno)

```
Usuario → Frontend (StudentDashboard.js)
  ↓
  GET /api/challenges
  Headers: { Authorization: "Bearer <token>" }
  ↓
Backend (challenges.js)
  ↓
  Middleware auth() verifica token
  ↓
  Buscar challenges en MongoDB
  ↓
  Excluir testCases (seguridad)
  ↓
  Retornar lista de retos
  ↓
Frontend muestra retos en cards
```

### 4. Resolver Reto

```
Usuario escribe código → Frontend (ChallengePage.js)
  ↓
  Monaco Editor captura código
  ↓
  Click en "Enviar Solución"
  ↓
  POST /api/submissions { challengeId, code }
  Headers: { Authorization: "Bearer <token>" }
  ↓
Backend (submissions.js)
  ↓
  Middleware auth() verifica token
  ↓
  Buscar challenge con testCases
  ↓
  runCodeInSandbox(code, testCases)
    ↓
    Para cada test:
      - Crear VM2 sandbox
      - Ejecutar código con input
      - Comparar output con expectedOutput
      - Timeout de 5 segundos
      - Capturar errores
    ↓
    Calcular puntaje
  ↓
  Guardar submission en MongoDB
  ↓
  Retornar { testResults, score, status }
  ↓
Frontend muestra resultados detallados
```

### 5. Crear Reto (Admin)

```
Admin → Frontend (CreateChallenge.js)
  ↓
  Completar formulario
  ↓
  POST /api/challenges { title, description, testCases, ... }
  Headers: { Authorization: "Bearer <token>" }
  ↓
Backend (challenges.js)
  ↓
  Middleware adminAuth() verifica token y permisos
  ↓
  Validar datos
  ↓
  Guardar challenge en MongoDB
  ↓
  Retornar challenge creado
  ↓
Frontend redirige a /admin/dashboard
```

---

## 🔐 Seguridad

### Autenticación JWT

```
1. Usuario hace login
   ↓
2. Backend genera JWT token
   jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
   ↓
3. Frontend guarda token en localStorage
   ↓
4. Cada request incluye token en headers
   Authorization: "Bearer <token>"
   ↓
5. Backend verifica token en middleware
   jwt.verify(token, JWT_SECRET)
   ↓
6. Si válido, permite acceso
   Si inválido, retorna 401 Unauthorized
```

### Sandbox de Código

```
Código del alumno
  ↓
VM2 Sandbox
  ├─ Timeout: 5 segundos
  ├─ Sin acceso a filesystem
  ├─ Sin acceso a network
  ├─ Sin acceso a process
  ├─ Memoria limitada
  └─ Contexto aislado
  ↓
Resultado seguro
```

---

## 📦 Dependencias Principales

### Backend
- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **jsonwebtoken**: Autenticación JWT
- **bcryptjs**: Hash de contraseñas
- **cors**: Cross-Origin Resource Sharing
- **vm2**: Sandbox seguro para código
- **express-validator**: Validación de entrada

### Frontend
- **react**: Librería UI
- **react-router-dom**: Routing
- **axios**: Cliente HTTP
- **@monaco-editor/react**: Editor de código
- **lucide-react**: Iconos

---

## 🎯 Patrones de Diseño

### Backend
- **MVC**: Separación de modelos, rutas y lógica
- **Middleware Pattern**: Autenticación y validación
- **Repository Pattern**: Acceso a datos con Mongoose

### Frontend
- **Component-Based**: Componentes reutilizables
- **Context API**: Estado global (AuthContext)
- **Protected Routes**: Rutas con autenticación
- **Container/Presentational**: Separación de lógica y UI

---

## 🚀 Escalabilidad

### Posibles Mejoras

1. **Caché**: Redis para resultados frecuentes
2. **Queue**: Bull/RabbitMQ para ejecución de código
3. **CDN**: CloudFront para assets estáticos
4. **Load Balancer**: Nginx para múltiples instancias
5. **Microservicios**: Separar ejecución de código
6. **WebSockets**: Actualizaciones en tiempo real
7. **Clustering**: PM2 para múltiples procesos

---

## 📊 Métricas y Monitoreo

### Endpoints para Monitoreo

```javascript
// Health check
GET /api/health
→ { status: 'ok', message: 'Server is running' }

// Estadísticas (agregar)
GET /api/stats
→ {
    totalUsers: 150,
    totalChallenges: 25,
    totalSubmissions: 1200,
    averageScore: 75
  }
```

---

## 🔄 Ciclo de Vida de una Request

```
1. Cliente hace request
   ↓
2. Express recibe request
   ↓
3. CORS middleware
   ↓
4. JSON body parser
   ↓
5. Router identifica ruta
   ↓
6. Middleware de autenticación (si aplica)
   ↓
7. Validación de entrada (express-validator)
   ↓
8. Controller ejecuta lógica
   ↓
9. Interacción con MongoDB (Mongoose)
   ↓
10. Respuesta JSON al cliente
    ↓
11. Cliente procesa respuesta
    ↓
12. UI se actualiza (React state)
```

---

Esta arquitectura es **modular**, **escalable** y **mantenible**, siguiendo las mejores prácticas de desarrollo web moderno.
