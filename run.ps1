# run.ps1 - Start both backend and frontend servers

Write-Host "Starting Nabha Rural TeleHealth Stack..." -ForegroundColor Green

# 1. Start the Python Backend API in the background
Write-Host "Starting FastAPI Backend on port 8000..." -ForegroundColor Cyan
$backendDir = Join-Path $PSScriptRoot "backend"
Start-Process -NoNewWindow -FilePath "powershell.exe" -WorkingDirectory $backendDir -ArgumentList "-Command .\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000"

# Wait a second for the backend to initialize
Start-Sleep -Seconds 2

# 2. Start the React/Vite Frontend
Write-Host "Starting Vite Frontend..." -ForegroundColor Yellow
$frontendDir = Join-Path $PSScriptRoot "frontend\gramcare-connect"
Set-Location $frontendDir
npm run dev
