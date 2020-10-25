@echo off

:: Check that guilded isnt running
tasklist /FI "IMAGENAME eq Guilded.exe" 2>NUL | find /I /N "Guilded.exe">NUL
if "%ERRORLEVEL%"=="0" (
	echo Guilded is running
	echo Please close it and run the uninstaller again
	pause > nul
	exit
)

:: Check that we are running as admin
net session >nul 2>&1
if %errorLevel% NEQ 0 (
	echo Uninstaller needs to be ran as administrator
	pause > nul
	exit
)

:: Check for backup
cd %appdata%\..\Local\Programs\Guilded\resources
if not exist oapp.asar (
	echo Failed to find backup
	pause > nul
	exit
)

:: Replace app.asar
copy /Y oapp.asar app.asar
del oapp.asar
echo [Done]
pause > nul
