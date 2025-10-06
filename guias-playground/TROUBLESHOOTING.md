# 🔧 Solución de Problemas

Guía para resolver problemas comunes al configurar y usar JS Playground.

---

## 🗄️ Problemas con MongoDB

### MongoDB no está corriendo

**Síntomas:**
- Error: `MongoNetworkError: connect ECONNREFUSED`
- Error: `Error de conexión a MongoDB`

**Soluciones:**

#### Windows:
```powershell
# Verificar estado
sc query MongoDB

# Iniciar servicio
net start MongoDB

# Si no funciona, iniciar manualmente
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
```

#### macOS:
```bash
# Verificar estado
brew services list

# Iniciar MongoDB
brew services start mongodb-community

# O manualmente
mongod --config /usr/local/etc/mongod.conf
```

#### Linux:
```bash
# Verificar estado
sudo systemctl status mongodb

# Iniciar servicio
sudo systemctl start mongodb

# Habilitar en inicio
sudo systemctl enable mongodb
```

### MongoDB no está instalado

**Descargar e instalar:**
- Windows: https://www.mongodb.com/try/download/community
- macOS: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

---

## 📦 Problemas con Dependencias

### Error: "Cannot find module"

**Solución:**
```bash
# Limpiar y reinstalar
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm run install-all
```

### Error: "npm ERR! code ENOENT"

**Solución:**
```bash
# Verificar que Node.js y npm estén instalados
node --version
npm --version

# Si no están instalados, descargar de:
# https://nodejs.org/
```

### Error: "gyp ERR! stack Error: Python not found"

**Solución:**
```bash
# Instalar Python (requerido para algunas dependencias nativas)
# Windows: https://www.python.org/downloads/
# macOS: brew install python
# Linux: sudo apt-get install python3
```

---

## 🌐 Problemas con Puertos

### Error: "Port 3000 is already in use"

**Solución:**

#### Windows:
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID con el número encontrado)
taskkill /PID <PID> /F
```

#### macOS/Linux:
```bash
# Encontrar proceso
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

**Alternativa:** Cambiar el puerto en `client/package.json`:
```json
"start": "PORT=3001 react-scripts start"
```

### Error: "Port 5000 is already in use"

**Solución:** Cambiar el puerto en `.env`:
```env
PORT=5001
```

---

## 🔐 Problemas de Autenticación

### Error: "Token inválido" o "No hay token de autenticación"

**Solución:**
```javascript
// Limpiar localStorage en la consola del navegador
localStorage.clear();
// Luego recargar la página y volver a iniciar sesión
```

### No puedo iniciar sesión como administrador

**Verificar credenciales:**
- Usuario: `atag`
- Contraseña: `atag553`

**Si no funciona:**
```bash
# Ejecutar el seed nuevamente para recrear el admin
npm run seed
```

---

## 🎨 Problemas con el Frontend

### Pantalla en blanco

**Soluciones:**
1. Abrir la consola del navegador (F12) y buscar errores
2. Verificar que el backend esté corriendo
3. Limpiar caché del navegador
4. Verificar que el proxy esté configurado en `client/package.json`

### Monaco Editor no carga

**Solución:**
```bash
# Reinstalar dependencias del cliente
cd client
rm -rf node_modules
npm install
cd ..
```

### Estilos no se aplican

**Solución:**
```bash
# Limpiar caché de React
cd client
rm -rf node_modules/.cache
npm start
```

---

## 🖥️ Problemas con el Backend

### Error: "JWT_SECRET is not defined"

**Solución:** Verificar que el archivo `.env` existe y contiene:
```env
JWT_SECRET=tu_clave_secreta_muy_segura
```

### Error al ejecutar código: "VM2 timeout"

**Causa:** El código del alumno tiene un bucle infinito o tarda demasiado.

**Solución:** El sistema tiene un timeout de 5 segundos. Esto es normal y protege el servidor.

### Error: "Cannot read property 'testCases' of null"

**Causa:** El reto no existe o fue eliminado.

**Solución:**
```bash
# Repoblar la base de datos
npm run seed
```

---

## 🔄 Problemas de Sincronización

### Los cambios no se reflejan

**Frontend:**
```bash
# El servidor de desarrollo debería recargar automáticamente
# Si no funciona, reinicia el servidor
Ctrl+C
npm run client
```

**Backend:**
```bash
# Nodemon debería reiniciar automáticamente
# Si no funciona, verifica que nodemon esté instalado
npm install -g nodemon
```

---

## 📱 Problemas de Rendimiento

### La aplicación va lenta

**Soluciones:**
1. Cerrar otras aplicaciones que consuman recursos
2. Verificar que MongoDB no esté usando demasiada RAM
3. Reducir el número de retos mostrados simultáneamente
4. Limpiar la base de datos de submissions antiguas

### Monaco Editor es lento

**Solución:** Desactivar algunas características en `ChallengePage.js`:
```javascript
options={{
  minimap: { enabled: false },
  codeLens: false,
  quickSuggestions: false,
  // ... otras opciones
}}
```

---

## 🧪 Problemas con Tests

### Los tests siempre fallan

**Verificar:**
1. El formato del output esperado (debe ser JSON válido)
2. Que la función se llame `solution`
3. Que el input sea una expresión JavaScript válida

**Ejemplo correcto:**
```javascript
// Test Case
Input: [2, 3]
Expected Output: 5

// Código del alumno
function solution(input) {
  return input[0] + input[1];
}
```

### Error: "SyntaxError" en el código del alumno

**Causa:** El código tiene errores de sintaxis.

**Solución:** El sistema debería mostrar el error. Verificar que el mensaje de error sea claro para el alumno.

---

## 🌍 Problemas de Red

### Error: "Network Error" o "ERR_CONNECTION_REFUSED"

**Soluciones:**
1. Verificar que el backend esté corriendo en el puerto correcto
2. Verificar el proxy en `client/package.json`:
```json
"proxy": "http://localhost:5000"
```
3. Desactivar VPN o firewall temporalmente
4. Verificar que no haya conflictos de CORS

---

## 🔍 Debugging Avanzado

### Habilitar logs detallados

**Backend:**
```javascript
// En server/index.js, agregar:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
```javascript
// En cualquier componente:
console.log('Estado actual:', state);
```

### Verificar la base de datos

```bash
# Conectarse a MongoDB
mongo

# Usar la base de datos
use js-playground

# Ver colecciones
show collections

# Ver usuarios
db.users.find().pretty()

# Ver retos
db.challenges.find().pretty()

# Ver submissions
db.submissions.find().pretty()
```

---

## 📞 Obtener Ayuda

Si ninguna de estas soluciones funciona:

1. **Revisar los logs:** Busca mensajes de error específicos
2. **Verificar versiones:**
   ```bash
   node --version  # Debe ser v14+
   npm --version
   mongo --version # Debe ser v4.4+
   ```
3. **Crear un issue:** Incluye:
   - Sistema operativo
   - Versiones de Node.js, npm, MongoDB
   - Mensaje de error completo
   - Pasos para reproducir el problema

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] MongoDB está corriendo
- [ ] Archivo `.env` existe y está configurado
- [ ] Dependencias instaladas (`node_modules` existe)
- [ ] Puertos 3000 y 5000 están disponibles
- [ ] Node.js versión 14 o superior
- [ ] Base de datos poblada (`npm run seed`)
- [ ] Sin errores en la consola del navegador
- [ ] Sin errores en la terminal del servidor

---

**Última actualización:** 2025-10-02
