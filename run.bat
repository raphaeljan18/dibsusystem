if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

cd "D:\dibsusystem-main\dibsusystem-main"

set url="http://localhost:5000"

start /min cmd /C "nodemon app.js"
start microsoft-edge:%url%
goto :EOF
:minimized