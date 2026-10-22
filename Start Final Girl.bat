@echo off
title Final Girl - Rules Assistant
cd /d "%~dp0"

echo.
echo   FINAL GIRL - Rules Assistant
echo   ----------------------------
echo   Starting the app... your browser will open automatically.
echo.
echo   Keep this window open while you use the app.
echo   Close this window when you are finished to shut it down.
echo.

REM Find npm: prefer the standard install path, fall back to PATH.
set "NPM=npm.cmd"
if exist "%ProgramFiles%\nodejs\npm.cmd" set "NPM=%ProgramFiles%\nodejs\npm.cmd"
if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" set "NPM=%ProgramFiles(x86)%\nodejs\npm.cmd"

REM vite.config.js has open:true, so Vite opens the browser itself once ready.
call "%NPM%" run dev

echo.
echo   The app did not start, or has stopped.
echo   If nothing happened, make sure Node.js is installed.
echo   Press any key to close this window.
pause >nul
