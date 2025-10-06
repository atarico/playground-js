# 🎓 JavaScript Playground Educativo

Una aplicación web educativa completa donde los alumnos pueden practicar retos de programación JavaScript con evaluación automática en tiempo real.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

## 🚀 Características

### Para Alumnos

- ✅ Registro y login con email
- 📝 Vista de retos de programación
- 💻 Editor de código integrado (Monaco Editor)
- ⚡ Ejecución de código en tiempo real
- 🧪 Evaluación automática con tests
- 📊 Sistema de puntuación

### Para Administradores

- 🔐 Login de administrador
- ➕ Crear, editar y eliminar retos
- 🧪 Definir tests de validación
- 📋 Gestión completa de desafíos

## 🛠️ Stack Tecnológico

- **Frontend**: React.js + Monaco Editor
- **Backend**: Node.js + Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Ejecución de Código**: VM2 (sandbox seguro)

## ⚡ Inicio Rápido

```bash
# 1. Crear archivo .env (ver .env.example)
# 2. Asegurarse de que MongoDB esté corriendo
# 3. Instalar dependencias
npm run install-all

# 4. Poblar base de datos con retos de ejemplo
npm run seed

# 5. Iniciar la aplicación
npm run dev
```

La aplicación estará disponible en:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

📖 **Ver [QUICKSTART.md](./guias-playground/QUICKSTART.md) para una guía paso a paso**

## 📁 Estructura del Proyecto

```
js-playground/
├── server/
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middleware de autenticación
│   ├── utils/           # Utilidades (sandbox, etc.)
│   └── index.js         # Servidor principal
├── client/
│   ├── public/
│   └── src/
│       ├── components/  # Componentes React
│       ├── pages/       # Páginas de la aplicación
│       ├── context/     # Context API para estado global
│       └── App.js       # Componente principal
└── package.json
```

## 🎯 Uso

### Como Alumno

1. Registrarse con nombre y email
2. Iniciar sesión
3. Seleccionar un reto
4. Escribir código en el editor
5. Ejecutar y ver resultados
6. Enviar solución para evaluación

### Como Administrador

1. Iniciar sesión con credenciales de admin
2. Acceder al panel de administración
3. Crear nuevos retos con:
   - Título y descripción
   - Código inicial
   - Tests de validación
4. Editar o eliminar retos existentes

## 🔒 Seguridad

- Autenticación JWT
- Contraseñas hasheadas con bcrypt
- Ejecución de código en sandbox aislado (VM2)
- Validación de entrada en todas las rutas

## 📝 Licencia

MIT

---

## 🎓 Características Implementadas

### ✅ Todas las funcionalidades solicitadas están implementadas:

**Para Alumnos:**

- ✅ Registro y login con nombre y email
- ✅ Área protegida con autenticación
- ✅ Vista de retos de programación
- ✅ Editor de código Monaco integrado
- ✅ Ejecución de código JavaScript
- ✅ Evaluación automática con tests
- ✅ Sistema de puntuación
- ✅ Detalle de tests pasados/fallidos

**Para Administrador:**

- ✅ Login con credenciales (atag / atag553)
- ✅ Crear, editar y eliminar retos
- ✅ Definir enunciados y tests
- ✅ Gestión completa de desafíos

**Tecnologías:**

- ✅ React.js + Monaco Editor
- ✅ Node.js + Express
- ✅ MongoDB
- ✅ JWT para autenticación
- ✅ VM2 para sandbox seguro
- ✅ Sistema de puntuación automática

## 📚 Documentación Disponible

- **[QUICKSTART.md](QUICKSTART.md)** - Inicio rápido en 5 minutos
- **[SETUP.md](SETUP.md)** - Guía de instalación detallada
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solución de problemas
- **[SOLUTIONS.md](SOLUTIONS.md)** - Soluciones de ejemplo (instructores)
- **[EXTENDING.md](EXTENDING.md)** - Cómo extender funcionalidades
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitectura del sistema
- **[CHECKLIST.md](CHECKLIST.md)** - Lista de verificación
- **[INSTRUCCIONES.txt](INSTRUCCIONES.txt)** - Resumen ejecutivo

## 🎯 Retos Incluidos

La aplicación viene con **8 retos de ejemplo** listos para usar:

1. **Suma de Dos Números** (Fácil - 100 pts)
2. **Invertir una Cadena** (Fácil - 100 pts)
3. **Número Par o Impar** (Fácil - 100 pts)
4. **Encontrar el Mayor** (Medio - 150 pts)
5. **Contar Vocales** (Medio - 150 pts)
6. **Palíndromo** (Medio - 200 pts)
7. **FizzBuzz** (Medio - 200 pts)
8. **Factorial** (Difícil - 250 pts)

## 🚀 Scripts Disponibles

```bash
npm run install-all    # Instalar todas las dependencias
npm run dev            # Iniciar backend + frontend
npm run server         # Solo backend
npm run client         # Solo frontend
npm run seed           # Poblar DB con retos de ejemplo
npm run build          # Construir para producción
```

### Scripts de Windows

- **setup.bat** - Configuración automática inicial
- **start.bat** - Inicio rápido de la aplicación

## 💡 Primeros Pasos

1. **Configuración inicial:**

   ```bash
   # Opción 1: Automático (Windows)
   setup.bat

   # Opción 2: Manual
   npm run install-all
   npm run seed
   ```

2. **Iniciar aplicación:**

   ```bash
   # Opción 1: Automático (Windows)
   start.bat

   # Opción 2: Manual
   npm run dev
   ```

3. **Acceder:**

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

4. **Login como admin:**
   - Usuario: `atag`
   - Contraseña: `atag553`

## 🎨 Capturas de Pantalla

La aplicación incluye:

- 🏠 Landing page moderna
- 📝 Formularios de registro/login
- 📊 Dashboard con estadísticas
- 💻 Editor Monaco con syntax highlighting
- ✅ Resultados detallados de tests
- 👨‍💻 Panel de administración completo

## 🔒 Seguridad Implementada

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación JWT
- ✅ Rutas protegidas
- ✅ Validación de entrada
- ✅ Sandbox aislado para código
- ✅ Timeout de ejecución
- ✅ CORS configurado

## 🌟 Extras Implementados

Además de las funcionalidades solicitadas:

- 📊 Sistema de estadísticas
- 📈 Historial de entregas
- 🎨 UI moderna y responsive
- 🎭 Animaciones suaves
- 📱 Compatible con móviles
- 🔔 Feedback visual
- 📝 Documentación completa
- 🛠️ Scripts de automatización

## 🤝 Contribuir

Para agregar nuevas funcionalidades, consulta [EXTENDING.md](EXTENDING.md).

## 📞 Soporte

Si encuentras problemas:

1. Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verifica [CHECKLIST.md](CHECKLIST.md)
3. Consulta la documentación relevante

---

**Desarrollado para UTN - Proyecto Educativo**

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025
