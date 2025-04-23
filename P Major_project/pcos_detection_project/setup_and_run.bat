@echo off
echo PCOS Detection System Setup and Run Script
echo ===========================================
echo.

REM Set PowerShell execution policy
echo Setting PowerShell execution policy to allow npm scripts...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
echo Installing Python dependencies...
python -m pip install --upgrade pip wheel setuptools
python -m pip install -r requirements.txt --no-cache-dir
echo.

REM Make sure the models folder exists
if not exist ml_models mkdir ml_models

REM Check if the MLP model exists, create dummy model if not
echo Checking model files...
if not exist ml_models\MLP_model2.pth (
    echo WARNING: MLP_model2.pth not found. Application will use a dummy model.
)

REM Start Backend in a new window
echo Starting backend server...
start cmd /k "cd backend && python app.py"
echo.

REM Wait a bit for backend to start
timeout /t 5

REM Setup Frontend
echo Setting up Frontend...
cd ..\frontend
echo Installing Node.js dependencies...
call npm install --legacy-peer-deps
echo.

REM Start Frontend in a new window
echo Starting frontend server...
start cmd /k "cd frontend && npm start"
echo.

echo Setup complete! The application should open in your browser shortly.
echo If not, go to http://localhost:3000 in your browser.
echo.
echo Please ensure you select a model type before submitting data.
echo The application will work even if model files are missing,
echo but it will return placeholder predictions.
echo.
echo Press any key to exit this setup script...
pause > nul
exit 