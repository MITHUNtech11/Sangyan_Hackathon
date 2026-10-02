@echo off
title Launch Nambikkai
echo ===================================================
echo   Launching Nambikkai Full Application
echo ===================================================

echo 1. Starting Backend server...
start "Nambikkai Backend (Port 8000)" cmd /c "%~dp0start_backend.bat"

echo Waiting for backend to initialize...
ping 127.0.0.1 -n 4 >nul

echo 2. Starting Frontend server...
start "Nambikkai Frontend (Port 5173)" cmd /c "%~dp0start_frontend.bat"

echo Waiting for frontend to initialize...
ping 127.0.0.1 -n 4 >nul

echo 3. Opening application in browser...
start http://localhost:5173

echo.
echo Application is running!
echo Backend:  http://127.0.0.1:8000/docs
echo Frontend: http://localhost:5173
echo.
echo Run stop_all.bat whenever you wish to shut down all servers.
ping 127.0.0.1 -n 5 >nul
