#!/usr/bin/env pwsh

# Set Node 20 path
$env:PATH = "C:\Users\computer place\AppData\Roaming\nvm\v20.19.5;$env:PATH"

# Change to frontend directory
Set-Location "C:\Users\computer place\Documents\augment-projects\CiperStudio\frontend"

# Verify Node version
Write-Host "Using Node version: $(node --version)"
Write-Host "Using npm version: $(npm --version)"

# Start the dev server
npm run dev

