param zoneName string

resource zone 'Microsoft.Network/dnsZones@2023-07-01-preview' = {
  name: zoneName
  location: 'global'
  properties: {
    zoneType: 'Public'
  }
}

output nameservers array = zone.properties.nameServers
