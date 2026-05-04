targetScope = 'subscription'

@description('Short prefix used for resource names. Keep <=8 chars.')
param prefix string = 'oc'

@description('Environment slug — appended to resource names.')
@allowed(['prod', 'staging', 'dev'])
param env string = 'prod'

@description('Azure region.')
param location string = 'eastus'

@description('Custom domain to host the app on (no scheme).')
param customDomain string = 'orthoconnect.care'

@description('Postgres admin login.')
param pgAdminLogin string = 'orthoconnect_admin'

@secure()
@description('Postgres admin password. Generate with: openssl rand -base64 24')
param pgAdminPassword string

@description('Object ID of the principal that will administer the Key Vault (your user).')
param adminPrincipalObjectId string

var rgName = '${prefix}-rg-${env}-${location}'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: rgName
  location: location
  tags: {
    project: 'orthoconnect'
    env: env
  }
}

module appInsights 'modules/app-insights.bicep' = {
  scope: rg
  name: 'app-insights'
  params: {
    name: '${prefix}-ai-${env}-${location}'
    location: location
  }
}

module keyVault 'modules/key-vault.bicep' = {
  scope: rg
  name: 'key-vault'
  params: {
    name: '${prefix}-kv-${env}-${location}'
    location: location
    adminPrincipalObjectId: adminPrincipalObjectId
  }
}

module postgres 'modules/postgres.bicep' = {
  scope: rg
  name: 'postgres'
  params: {
    serverName: '${prefix}-pg-${env}-${location}'
    location: location
    adminLogin: pgAdminLogin
    adminPassword: pgAdminPassword
    databaseName: 'orthoconnect'
  }
}

module dns 'modules/dns-zone.bicep' = {
  scope: rg
  name: 'dns-zone'
  params: {
    zoneName: customDomain
  }
}

module swa 'modules/static-web-app.bicep' = {
  scope: rg
  name: 'static-web-app'
  params: {
    name: '${prefix}-swa-${env}-${location}'
    location: location
    appInsightsKey: appInsights.outputs.instrumentationKey
  }
}

output resourceGroup string = rg.name
output staticWebAppName string = swa.outputs.name
output staticWebAppUrl string = swa.outputs.defaultHostname
output postgresHost string = postgres.outputs.fqdn
output keyVaultName string = keyVault.outputs.name
output dnsZoneNameservers array = dns.outputs.nameservers
