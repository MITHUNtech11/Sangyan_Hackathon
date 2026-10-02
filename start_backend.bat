@echo off
title Nambikkai Backend
echo ===================================================
echo   Starting Nambikkai Backend (FastAPI Engine)
echo   Listening on http://127.0.0.1:8000 ...
echo ===================================================
cd /d "%~dp0backend"

echo Checking if port 8000 is occupied...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Freeing port 8000 (Process ID %%a)...
    taskkill /f /pid %%a >nul 2>&1
)

echo Launching FastAPI server...
.venv\Scripts\uvicorn app.main:app --port 8000 --reload
pause
