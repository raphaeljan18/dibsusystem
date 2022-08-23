if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

start D:\xampp\xampp-control.exe

cd "D:\dibsusystem-main\dibsusystem-main"
set url="http://localhost:5000"

start /min cmd /C "nodemon app.js"
start /WAIT microsoft-edge:%url%
goto :EOF
:minimized