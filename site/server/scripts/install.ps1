# Check if the script is running with administrator privileges
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "Please run this script as an administrator."
    Exit
}

# Set ExecutionPolicy to RemoteSigned if not already set
$executionPolicy = Get-ExecutionPolicy
if ($executionPolicy -ne "RemoteSigned") {
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    Write-Host "ExecutionPolicy set to RemoteSigned."
}

# Check if Chocolatey is installed, if not, install it
if (-not (Test-Path "$env:ProgramData\chocolatey")) {
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    Write-Host "Chocolatey installed successfully."
}

# Check if Git is installed, if not, install it using Chocolatey
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    choco install git -y
    Write-Host "Git installed successfully."
}

# Check if Make is installed, if not, install it using Chocolatey
if (-not (Get-Command make -ErrorAction SilentlyContinue)) {
    choco install make -y
    Write-Host "Make installed successfully."
}

