# 🚀 Guía de Instalación y Configuración

## Requisitos Previos

- **Node.js** (v14 o superior)
- **MongoDB** (v4.4 o superior)
- **npm** o **yarn**

## Pasos de Instalación

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/js-playground
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
```

**Importante:** Cambia `JWT_SECRET` por una clave segura en producción.

### 2. Instalar MongoDB

#### Windows:
1. Descarga MongoDB desde https://www.mongodb.com/try/download/community
2. Instala MongoDB siguiendo el asistente
3. Inicia el servicio de MongoDB:
   ```powershell
   net start MongoDB
   ```

#### macOS (con Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 3. Instalar Dependencias

```bash
# Instalar dependencias del backend y frontend
npm run install-all
```

O manualmente:

```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

### 4. Iniciar la Aplicación

#### Modo Desarrollo (Backend + Frontend simultáneamente):
```bash
npm run dev
```

#### O iniciar por separado:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### 5. Acceder a la Aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔑 Credenciales de Administrador

- **Usuario:** atag
- **Contraseña:** atag553

## 📝 Uso de la Aplicación

### Como Alumno:

1. Ve a http://localhost:3000
2. Haz clic en "Registrarse"
3. Completa el formulario con tu nombre y email
4. Inicia sesión
5. Explora los retos disponibles
6. Selecciona un reto y escribe tu código
7. Haz clic en "Enviar Solución" para ejecutar los tests

### Como Administrador:

1. Ve a http://localhost:3000
2. Haz clic en "Admin"
3. Inicia sesión con las credenciales de administrador
4. Crea, edita o elimina retos
5. Define tests de validación para cada reto

## 🧪 Ejemplo de Reto

### Título: Suma de Dos Números

**Descripción:**
```
Escribe una función que reciba un array de dos números y retorne su suma.

Ejemplo:
Input: [2, 3]
Output: 5
```

**Código Inicial:**
```javascript
function solution(input) {
  // Tu código aquí
  return result;
}
```

**Test Cases:**

| Input | Expected Output | Description |
|-------|----------------|-------------|
| `[2, 3]` | `5` | Números positivos |
| `[-1, 1]` | `0` | Números negativos y positivos |
| `[0, 0]` | `0` | Ceros |

## 🔧 Solución de Problemas

### Error: MongoDB no está corriendo

**Solución:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Error: Puerto 3000 o 5000 ya en uso

**Solución:**
Cambia el puerto en los archivos de configuración o detén el proceso que está usando el puerto.

### Error: Cannot find module

**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules client/node_modules
npm run install-all
```

## 📦 Estructura del Proyecto

```
js-playground/
├── server/
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middleware de autenticación
│   ├── utils/           # Utilidades (sandbox)
│   └── index.js         # Servidor principal
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/       # Páginas de la aplicación
│       ├── context/     # Context API
│       └── App.js
├── .env                 # Variables de entorno (crear)
├── package.json
└── README.md
```

## 🚀 Despliegue en Producción

### Backend (Heroku, Railway, etc.):
1. Configura las variables de entorno
2. Usa MongoDB Atlas para la base de datos
3. Cambia `JWT_SECRET` por una clave segura

### Frontend (Vercel, Netlify, etc.):
1. Construye el proyecto: `cd client && npm run build`
2. Configura la URL del backend en el proxy
3. Despliega la carpeta `client/build`

## 📚 Tecnologías Utilizadas

- **Frontend:** React.js, Monaco Editor, Axios, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Autenticación:** JWT, bcryptjs
- **Sandbox:** VM2 (ejecución segura de código)

## 🤝 Soporte

Si encuentras algún problema, verifica:
1. MongoDB está corriendo
2. Las dependencias están instaladas
3. El archivo `.env` está configurado correctamente
4. Los puertos 3000 y 5000 están disponibles
