# azure-edge-locations
Approximation of Azure edge locations, usable via a lookup mechanism.

## Installation
To install, you can do the following:

```bash
$ npm i azure-edge-locations
```

This package includes TypeScript definitions and is written in TypeScript for better type safety and developer experience.

## Usage

### Node (JavaScript)

```javascript
const AzureEdgeLocations = require('azure-edge-locations');
const el = new AzureEdgeLocations();
const location = el.lookup('ATL');

/* returns
{
  "city": "Atlanta",
  "country": "United States",
  "countryCode": "US",
  "latitude": 33.6367,
  "longitude": -84.428101,
  "count": 3
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns 104

// Get all edge locations
const locations = el.getLocations();

// Get PoP count
const popCount = el.getPoPCount() // returns 182
```

### Node (TypeScript)

```typescript
import { AzureEdgeLocations } from 'azure-edge-locations';

const el = new AzureEdgeLocations();
const location = el.lookup('ATL');

/* returns
{
  "city": "Atlanta",
  "country": "United States",
  "countryCode": "US",
  "latitude": 33.6367,
  "longitude": -84.428101,
  "count": 3
}
*/

const invalid = el.lookup('FOO'); // returns false

// Get edge location count
const locationCount = el.getLocationCount(); // returns 104

// Get all edge locations
const locations = el.getLocations();

// Get PoP count
const popCount = el.getPoPCount() // returns 182
```

### Browser

This package is published as an UMD module, and can be used in the browser directly from [unpkg](https://unpkg.com/).

```html
<html>
    <head>
        <script src="https://unpkg.com/azure-edge-locations"></script> 
    </head>
    <body>
        <script>
            // Using the global variable
            document.write('There are ' + azureEdgeLocations.getLocationCount() + ' edge locations');
        </script>
    </body>
</html>
```

## Data generation

### TLDR

Run `npm run build`

## Data

This project is considered as in the `alpha` stage, so there's **no guarantee that the data is accurate**. Please feel free to test and give feedback either via creating an [issue](https://github.com/tobilg/azure-edge-locations/issues) or a [pr](https://github.com/tobilg/azure-edge-locations/pulls)

The data files can be found at
* [data/azure-edge-locations.csv](data/azure-edge-locations.csv)
* [data/azure-edge-locations.json](data/azure-edge-locations.json)
