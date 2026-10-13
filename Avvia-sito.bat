@echo off
rem Avvia l'anteprima del sito e apre il browser.
rem Lascia aperta questa finestra: chiudendola il sito si spegne.
cd /d "%~dp0"
title Sito autoscuola - anteprima
if not exist node_modules (
  echo Prima installazione in corso, attendi...
  call npm install
)
start "" cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:4321"
call npm run dev
pause
