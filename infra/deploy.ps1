# Provision OrthoConnect infrastructure into the personal Azure subscription.
# Run this from the repo root after `az login --tenant 808770ab-848d-4380-bcf2-e394096bc18f`.

$ErrorActionPreference = 'Stop'

$SubscriptionId = 'e645cfef-1c75-42e7-95b6-fe74fd188d24'
$Location       = 'eastus'
$DeploymentName = "orthoconnect-$(Get-Date -Format 'yyyyMMdd-HHmm')"
$ParametersFile = 'infra/main.parameters.json'

if (-not (Test-Path $ParametersFile)) {
    Write-Error "Missing $ParametersFile. Copy infra/main.parameters.example.json and fill in values."
}

az account set --subscription $SubscriptionId

Write-Host 'Validating Bicep template (what-if preview)...' -ForegroundColor Cyan
az deployment sub what-if `
    --location $Location `
    --template-file 'infra/main.bicep' `
    --parameters $ParametersFile

Write-Host ''
$confirm = Read-Host 'Proceed with deployment? (y/N)'
if ($confirm -ne 'y') {
    Write-Host 'Aborted.' -ForegroundColor Yellow
    exit 0
}

Write-Host 'Deploying...' -ForegroundColor Cyan
az deployment sub create `
    --name $DeploymentName `
    --location $Location `
    --template-file 'infra/main.bicep' `
    --parameters $ParametersFile

Write-Host 'Deployment complete.' -ForegroundColor Green
