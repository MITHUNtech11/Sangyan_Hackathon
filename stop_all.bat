@echo off
title Stop Nambikkai Servers
echo ===================================================
echo   Stopping all Nambikkai Development Servers
echo ===================================================

echo Stopping any backend processes on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Stopping PID %%a...
    taskkill /f /pid %%a >nul 2>&1
)

echo Stopping any frontend processes on port 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Stopping PID %%a...
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo All Nambikkai servers have been cleanly stopped.
echo Ports 8000 and 5173 are now free.
ping 127.0.0.1 -n 3 >nul
