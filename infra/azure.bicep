@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string

@description('The SKU for the Static Web App')
@allowed(['Free', 'Standard'])
param staticWebAppSku string = 'Free'

@description('The location for the Static Web App')
param location string = resourceGroup().location

// Azure Static Web App that hosts your website (without GitHub integration)
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: resourceBaseName
  location: location
  sku: {
    name: staticWebAppSku
    tier: staticWebAppSku
  }
  properties: {
    // Leave empty to allow manual deployments without GitHub integration
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'dist/client'
    }
  }
}

// The output will be persisted in .env.{envName}. Visit https://aka.ms/teamsfx-actions/arm-deploy for more details.
output TAB_AZURE_STATIC_WEB_APP_RESOURCE_ID string = staticWebApp.id // used in deploy stage
output TAB_DOMAIN string = staticWebApp.properties.defaultHostname
output TAB_ENDPOINT string = 'https://${staticWebApp.properties.defaultHostname}'
