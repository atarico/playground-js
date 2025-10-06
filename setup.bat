@echo off
echo ========================================
echo   JS Playground - Configuracion Inicial
echo ========================================
echo.

REM Verificar si existe el archivo .env
if exist .env (
    echo [OK] Archivo .env encontrado
) else (
    echo [INFO] Creando archivo .env...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/js-playground
        echo JWT_SECRET=tu_clave_secreta_muy_segura_12345
    ) > .env
    echo [OK] Archivo .env creado
)
echo.

REM Verificar MongoDB
echo Verificando MongoDB...
sc query MongoDB | find "RUNNING" >nul
if errorlevel 1 (
    echo [ADVERTENCIA] MongoDB no esta corriendo
    echo Intentando iniciar MongoDB...
    net start MongoDB
    if errorlevel 1 (
        echo [ERROR] MongoDB no esta instalado o no se pudo iniciar
        echo Por favor, instala MongoDB desde: https://www.mongodb.com/try/download/community
        pause
        exit /b 1
    )
)
echo [OK] MongoDB esta corriendo
echo.

REM Instalar dependencias
echo Instalando dependencias...
echo.
echo [1/2] Instalando dependencias del backend...
call npm install
if errorlevel 1 (
    echo [ERROR] Fallo la instalacion del backend
    pause
    exit /b 1
)

echo.
echo [2/2] Instalando dependencias del frontend...
cd client
call npm install
if errorlevel 1 (
    echo [ERROR] Fallo la instalacion del frontend
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Poblando base de datos...
echo ========================================
echo.
call npm run seed
if errorlevel 1 (
    echo [ADVERTENCIA] Hubo un problema al poblar la base de datos
    echo Puedes intentarlo manualmente con: npm run seed
)

echo.
echo ========================================
echo   Configuracion Completada!
echo ========================================
echo.
echo Para iniciar la aplicacion, ejecuta:
echo   start.bat
echo.
echo O manualmente:
echo   npm run dev
echo.
echo Credenciales de administrador:
echo   Usuario: atag
echo   Contrasena: atag553
echo.
pause
