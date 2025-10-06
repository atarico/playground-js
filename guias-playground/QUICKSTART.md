# ⚡ Inicio Rápido

## 🚀 Puesta en Marcha en 5 Minutos

### 1️⃣ Crear archivo .env

```bash
# En la raíz del proyecto, crea un archivo .env con:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/js-playground
JWT_SECRET=tu_clave_secreta_muy_segura_12345
```

### 2️⃣ Asegúrate de que MongoDB esté corriendo

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### 3️⃣ Instalar dependencias

```bash
npm run install-all
```

### 4️⃣ Poblar la base de datos con retos de ejemplo

```bash
npm run seed
```

Este comando creará:

- ✅ Usuario administrador
- ✅ 8 retos de ejemplo (desde fácil hasta difícil)

### 5️⃣ Iniciar la aplicación

```bash
npm run dev
```

Esto iniciará:

- 🖥️ Backend en http://localhost:5000
- 🌐 Frontend en http://localhost:3000

## 🎯 Primeros Pasos

### Como Alumno:

1. Abre http://localhost:3000
2. Haz clic en **"Registrarse"**
3. Completa el formulario
4. Explora los retos y empieza a programar

### Como Administrador:

1. Abre http://localhost:3000
2. Haz clic en **"Admin"**
3. Inicia sesión:
   - Usuario: `atag`
   - Contraseña: `atag553`
4. Gestiona los retos desde el panel de administración

## 📝 Retos Incluidos

1. **Suma de Dos Números** (Fácil - 100 pts)
2. **Invertir una Cadena** (Fácil - 100 pts)
3. **Número Par o Impar** (Fácil - 100 pts)
4. **Encontrar el Mayor** (Medio - 150 pts)
5. **Contar Vocales** (Medio - 150 pts)
6. **Palíndromo** (Medio - 200 pts)
7. **FizzBuzz** (Medio - 200 pts)
8. **Factorial** (Difícil - 250 pts)

## 🔧 Comandos Útiles

```bash
# Instalar todas las dependencias
npm run install-all

# Iniciar en modo desarrollo (backend + frontend)
npm run dev

# Solo backend
npm run server

# Solo frontend
npm run client

# Poblar base de datos con ejemplos
npm run seed

# Construir para producción
npm run build
```

## ❓ Problemas Comunes

### "MongoDB no está corriendo"

```bash
# Verifica el estado de MongoDB
# Windows: net start MongoDB
# macOS: brew services list
# Linux: sudo systemctl status mongodb
```

### "Puerto ya en uso"

Cambia el puerto en el archivo `.env` o detén el proceso que lo está usando.

### "Cannot find module"

```bash
rm -rf node_modules client/node_modules
npm run install-all
```

## 📚 Documentación Completa

Para más detalles, consulta:

- **README.md** - Información general del proyecto
- **SETUP.md** - Guía de instalación detallada

## 🎓 Ejemplo de Uso

### Resolver un Reto:

1. **Selecciona un reto** desde el dashboard
2. **Lee la descripción** del problema
3. **Escribe tu código** en el editor Monaco
4. **Envía tu solución** haciendo clic en "Enviar Solución"
5. **Revisa los resultados** de los tests automáticos
6. **Obtén tu puntaje** basado en los tests pasados

### Crear un Reto (Admin):

1. **Accede al panel de admin**
2. **Haz clic en "Crear Nuevo Reto"**
3. **Completa la información:**
   - Título y descripción
   - Dificultad y puntos
   - Código inicial
4. **Define los test cases:**
   - Input (expresión JavaScript)
   - Output esperado (JSON)
   - Descripción del test
5. **Guarda el reto**

## 🎉 ¡Listo!

Tu playground de JavaScript está listo para usar. Los alumnos pueden empezar a practicar inmediatamente.

---

**¿Necesitas ayuda?** Revisa SETUP.md para más detalles.
