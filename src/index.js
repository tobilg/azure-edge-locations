const locations = require('../dist/azure-edge-locations.json');

class AzureEdgeLocations {
  constructor() {}

  getLocationCount () {
    return Object.getOwnPropertyNames(locations).length;
  }

  getPoPCount () {
    let count = 0;
    Object.getOwnPropertyNames(locations).forEach(location => {
      count += locations[location].count;
    });
    return count;
  }

  getLocations () {
    return locations;
  }

  lookup (code) {
    if (locations.hasOwnProperty(code.toUpperCase())) {
      return locations[code.toUpperCase()];
    } else {
      return false;
    }
  }
}

module.exports = AzureEdgeLocations;
