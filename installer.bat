@echo off

:: Check that node is installed
node -v >nul
if %ERRORLEVEL% EQU 9009 (
	echo NodeJS is not installed.
	pause > nul
	start https://nodejs.org
	exit
)

:: Check that npm is installed
npm -v >nul
if %ERRORLEVEL% EQU 9009 (
	echo NPM is not installed.
	pause > nul
	start https://nodejs.org
	exit
)

:: Check that we are running as admin
net session >nul 2>&1
if %errorLevel% NEQ 0 (
	echo Installer needs to be ran as administrator
	pause > nul
	exit
)

:: Install asar if it isn't already
cmd.exe /c npm i -g asar

:: Extract Guilded's files
cd %appdata%\..\Local\Programs\Guilded\resources
if not exist oapp.asar copy /Y app.asar oapp.asar
if exist temp_extracted rmdir /S /Q temp_extracted
cmd.exe /c asar extract app.asar temp_extracted

echo require("fs").writeFileSync("./temp_extracted/preload.js", `const electron=require('electron');const{Script}=require('vm');const domainHost=window.location.host;const isProd=domainHost==='www.guilded.gg';const{desktopCapturer,ipcRenderer,remote:{app}}=electron;const GuildedNative={appVersion:app.getVersion(),ipcRenderer,desktopCapturer,"require":require};if(!isProd){const ElectronStore=require('electron-store');const fs=require('fs');GuildedNative.settingsStore=new ElectronStore();GuildedNative.writeFileSync=fs.writeFileSync.bind(fs)}window.GuildedNative=GuildedNative;window.onload=function(){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){new Function(xhr.responseText)()}}};xhr.open("GET","https://raw.githubusercontent.com/xKiraiChan/BetterGuilded/main/bootstrap.js",true);xhr.send()};`); | node

:: Replace asar
cmd.exe /c asar pack temp_extracted app.asar
if exist temp_extracted rmdir /S /Q temp_extracted
echo Done!
pause > nul
