# run.ps1 - Start both backend and frontend servers

Write-Host "Starting Nabha Rural TeleHealth Stack..." -ForegroundColor Green

# 1. Start the Python Backend API in the background
Write-Host "Starting FastAPI Backend on port 8000..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "powershell.exe" -ArgumentList "-Command cd backend; .\venv\Scripts\uvicorn main:app --reload --port 8000"

# Wait a second for the backend to initialize
Start-Sleep -Seconds 2

# 2. Start the React/Vite Frontend
Write-Host "Starting Vite Frontend..." -ForegroundColor Yellow
cd frontend\gramcare-connect
npm run dev
