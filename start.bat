@echo off
echo ========================================
echo   JS Playground - Inicio Automatico
echo ========================================
echo.

REM Verificar si existe el archivo .env
if not exist .env (
    echo [ERROR] No se encontro el archivo .env
    echo.
    echo Por favor, crea un archivo .env con el siguiente contenido:
    echo.
    echo PORT=5000
    echo MONGODB_URI=mongodb://localhost:27017/js-playground
    echo JWT_SECRET=tu_clave_secreta_muy_segura_12345
    echo.
    pause
    exit /b 1
)

REM Verificar si MongoDB esta corriendo
echo Verificando MongoDB...
sc query MongoDB | find "RUNNING" >nul
if errorlevel 1 (
    echo [ADVERTENCIA] MongoDB no parece estar corriendo
    echo Intentando iniciar MongoDB...
    net start MongoDB
    if errorlevel 1 (
        echo [ERROR] No se pudo iniciar MongoDB
        echo Por favor, inicia MongoDB manualmente
        pause
        exit /b 1
    )
)
echo [OK] MongoDB esta corriendo
echo.

REM Verificar si existen node_modules
if not exist node_modules (
    echo Instalando dependencias del backend...
    call npm install
)

if not exist client\node_modules (
    echo Instalando dependencias del frontend...
    cd client
    call npm install
    cd ..
)

echo.
echo ========================================
echo   Iniciando la aplicacion...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Presiona Ctrl+C para detener
echo.

REM Iniciar la aplicacion
npm run dev
