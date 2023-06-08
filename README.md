# azure-edge-locations
Approximation of Azure edge locations, usable via a lookup mechanism.

## Contents

If you're here for the plain data, have a look at

* [List of Azure Edge Locations (as CSV)](#csv-list) 
* [List of Azure Edge Locations (as JSON)](#json-lookup)

## Installation
To install, you can do the following:

```bash
$ npm i azure-edge-locations
```

## Usage

### Node

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

After installation of `jq` library, run `npm run generate`

### Explanation

To prepare the data regeneration, please run `npm run airports:download && npm run airports:filter && npm run countries:download`. This step requires an installation of [jq](https://github.com/stedolan/jq/wiki/Installation) on the machine where the commands are run.

The `generate.js` script will regenerate the `csv` and `json` versions of the Azure Edge Location list in the `dist` folder.

It does this by extracting the information from the [Azure CDN PoP locations page](https://docs.microsoft.com/en-us/azure/cdn/cdn-pop-locations), cleaning and unifiying it, and merging it with [airport data](https://datahub.io/core/airport-codes/r/airport-codes.json) (the first three characters of the `location` field are IATA airport codes) to also get the latitude/longitude information.

Also, there are some manual overrides when it wasn't possible to automatically determine the correct IATA code from the city names.

## Data

This project is considered as in the `alpha` stage, so there's **no guarantee that the data is accurate**. Please feel free to test and give feedback either via creating an [issue](https://github.com/tobilg/azure-edge-locations/issues) or a [pr](https://github.com/tobilg/azure-edge-locations/pulls)

### CSV list

The CSV version of the data can be found at [dist/azure-edge-locations.csv](dist/azure-edge-locations.csv). The file is using `,` as field separator.

### CSV list

The CSV version of the data can be found at [dist/azure-edge-locations.csv](dist/azure-edge-locations.csv). The file is using `,` as field separator.

```csv
code,city,country,country_code,latitude,longitude,count
YYZ,Etobicoke,Canada,CA,43.676667,-79.630556,2
YUL,Montreal,Canada,CA,45.470556,-73.740833,1
YVR,Vancouver,Canada,CA,49.193901062,-123.183998108,2
QRO,Querétaro,Mexico,MX,20.6173,-100.185997,2
ATL,Atlanta,United States,US,33.6367,-84.428101,3
23VG,Boydton,United States,US,36.70970153808594,-78.4281005859375,2
MSP,Chaska,United States,US,44.881944,-93.221667,2
FEW,Cheyenne,United States,US,41.133302,-104.866997,2
MDW,Chicago,United States,US,41.785999,-87.752403,4
DAL,Dallas,United States,US,32.847099,-96.851799,4
DSM,Des Moines,United States,US,41.534000396728516,-93.66310119628906,3
DTW,Detroit,United States,US,42.212398529052734,-83.35340118408203,1
15CO,Englewood,United States,US,39.654701232910156,-104.97100067138672,2
HNL,Honolulu,United States,US,21.32062,-157.924228,1
HOU,Houston,United States,US,29.64539909,-95.27890015,3
JAX,Jacksonville,United States,US,30.49410057067871,-81.68789672851562,2
LAS,Las Vegas,United States,US,36.08010101,-115.1520004,3
LAX,Los Angeles,United States,US,33.942501,-118.407997,2
27VA,Manassas,United States,US,38.76580047607422,-77.48780059814453,3
MEM,Memphis,United States,US,35.04240036010742,-89.97669982910156,1
MIA,Miami,United States,US,25.79319953918457,-80.29060363769531,4
MSP,Minneapolis,United States,US,44.882,-93.221802,2
BOS,Needham Heights,United States,US,42.363056,-71.006389,2
BNA,Nashville,United States,US,36.1245002746582,-86.6781997680664,1
EWR,Newark,United States,US,40.692501068115234,-74.168701171875,1
JFK,New York,United States,US,40.639801,-73.7789,2
PHL,Philadelphia,United States,US,39.87189865112305,-75.24109649658203,1
PHX,Phoenix,United States,US,33.43429946899414,-112.01200103759766,1
1TS4,Plano,United States,US,33.06850051879883,-96.80139923095703,1
PDX,Portland,United States,US,45.58869934,-122.5979996,1
0IS8,Quincy,United States,US,39.9364013672,-91.3990020752,3
SAT,San Antonio,United States,US,29.533701,-98.469803,4
SJC,San Jose,United States,US,37.362598,-121.929001,4
SLC,Salt Lake City,United States,US,40.78839874267578,-111.97799682617188,3
BFI,Seattle,United States,US,47.529998779296875,-122.302001953125,2
41NJ,Secaucus,United States,US,40.79180145263672,-74.07240295410156,2
3MI8,Southfield,United States,US,42.48059844970703,-83.2477035522461,1
3AZ7,Tempe,United States,US,33.404643,-111.970194,1
EZE,Buenos Aires,Argentina,AR,-34.8222,-58.5358,1
VCP,Campinas,Brazil,BR,-23.0074005127,-47.1344985962,2
GIG,Rio de Janeiro,Brazil,BR,-22.8099994659,-43.2505569458,3
GRU,Sao Paulo,Brazil,BR,-23.435556,-46.473056,2
BOG,Bogota,Colombia,CO,4.70159,-74.1469,1
BRU,Zaventem,Belgium,BE,50.901389,4.484444,2
SOF,Sofia,Bulgaria,BG,42.696693420410156,23.411436080932617,2
PRG,Prague,Czech Republic,CZ,50.1008,14.26,1
CPH,Ballerup,Denmark,DK,55.618056,12.656111,1
HEL,Vantaa,Finland,FI,60.317222,24.963333,1
ORY,Les Ulis,France,FR,48.723333,2.379444,3
CDG,Paris,France,FR,49.012798,2.55,1
ORY,Saint Denis,France,FR,48.7233333,2.3794444,2
SXF,Berlin,Germany,DE,52.380001,13.5225,1
DUS,Düsseldorf,Germany,DE,51.289501,6.76678,1
FRA,Frankfurt am Main,Germany,DE,50.033333,8.570556,2
MUC,Munich,Germany,DE,48.353802,11.7861,1
FRA,Russelsheim,Germany,DE,50.033333,8.570556,2
ATH,Athens,Greece,GR,37.9364013672,23.9444999695,1
BUD,Budapest,Hungary,HU,47.42976,19.261093,1
DUB,Dublin,Ireland,IE,53.421299,-6.27007,2
MXP,Milan,Italy,IT,45.6306,8.72811,1
CIA,Rome,Italy,IT,41.7994,12.5949,2
OSL,Oslo,Norway,NO,60.193901062012,11.100399971008,1
SVG,Stavanger,Norway,NO,58.876701354,5.6377801895,1
WMI,Warsaw,Poland,PL,52.451099,20.6518,1
LIS,Lisbon,Portugal,PT,38.7813,-9.13592,1
OTP,Bucharest,Romania,RO,44.5711111,26.085,1
BCN,Barcelona,Spain,ES,41.2971,2.07846,1
MAD,Madrid,Spain,ES,40.471926,-3.56264,1
BMA,Bromma,Sweden,SE,59.354444,17.939722,2
ZRH,Zurich,Switzerland,CH,47.464699,8.54917,2
LTN,London,United Kingdom,GB,51.874698638916016,-0.36833301186561584,5
MAN,Manchester,United Kingdom,GB,53.35369873046875,-2.2749500274658203,1
CAI,Cairo,Egypt,EG,30.12190055847168,31.40559959411621,2
NBO,Nairobi,Kenya,KE,-1.31923997402,36.9277992249,1
RBA,Rabat,Morocco,MA,34.051498,-6.75152,1
LOS,Lagos,Nigeria,NG,6.5773701667785645,3.321160078048706,1
CPT,Cape Town,South Africa,ZA,-33.9648017883,18.6016998291,1
JNB,Isando,Saudi Arabia,SA,-26.133333,28.25,3
TLV,Tel Aviv,Israel,IL,32.01139831542969,34.88669967651367,1
DOH,Doha,Qatar,QA,25.273056,51.608056,2
ISL,Istanbul,Turkey,TR,40.976898,28.8146,1
DXB,Dubai,United Arab Emirates,AE,25.2527999878,55.3643989563,1
MAA,Chennai,India,IN,12.990005493164062,80.16929626464844,4
HYD,Hyderabad,India,IN,17.231318,78.429855,1
BOM,Mumbai,India,IN,19.0886993408,72.8678970337,2
DEL,New Delhi,India,IN,28.5665,77.103104,1
SZX,Chai Wan,China,CN,22.639444,113.810833,1
HKG,Hong Kong,Hong Kong,HK,22.308901,113.915001,2
CGK,Jakarta,Indonesia,ID,-6.1255698204,106.65599823,1
NRT,Inzai,Japan,JP,35.765278,140.385556,1
KIX,Osaka,Japan,JP,34.42729949951172,135.24400329589844,2
ITM,Osaka-shi,Japan,JP,34.784444,135.439167,2
NRT,Tokyo,Japan,JP,35.764702,140.386002,3
ICN,Seoul,Korea, Republic of,KR,37.46910095214844,126.45099639892578,1
KUL,Kuala Lumpur,Malaysia,MY,2.745579957962,101.70999908447,1
MNL,Manila,Philippines,PH,14.5086,121.019997,1
SIN,Singapore,Singapore,SG,1.35019,103.994003,6
TPE,Taipei,Taiwan, Province of China,TW,25.0777,121.233002,1
TSA,Taipei City,Taiwan, Province of China,TW,25.069400787353516,121.552001953125,1
DMK,Bangkok,Thailand,TH,13.9125995636,100.607002258,1
SGN,Ho Chi Minh City,Viet Nam,VN,10.8187999725,106.652000427,1
BNE,Brisbane,Australia,AU,-27.384199142456055,153.11700439453125,1
MEB,Derrimut,Australia,AU,-37.72806,144.90194,1
BWU,Macquarie Park,Australia,AU,-33.925,150.988333333,1
MEL,Melbourne,Australia,AU,-37.673302,144.843002,1
PER,Perth,Australia,AU,-31.94029998779297,115.96700286865234,3
SYD,Sydney,Australia,AU,-33.94609832763672,151.177001953125,1
AKL,Auckland,New Zealand,NZ,-37.008098602299995,174.792007446,1
```

### JSON lookup

The JSON version of the data can be found at [dist/azure-edge-locations.json](dist/azure-edge-locations.json).

```javascript
{
  "YYZ": {
    "city": "Etobicoke",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 43.676667,
    "longitude": -79.630556,
    "count": 2
  },
  "YUL": {
    "city": "Montreal",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 45.470556,
    "longitude": -73.740833,
    "count": 1
  },
  "YVR": {
    "city": "Vancouver",
    "country": "Canada",
    "countryCode": "CA",
    "latitude": 49.193901062,
    "longitude": -123.183998108,
    "count": 2
  },
  "QRO": {
    "city": "Querétaro",
    "country": "Mexico",
    "countryCode": "MX",
    "latitude": 20.6173,
    "longitude": -100.185997,
    "count": 2
  },
  "ATL": {
    "city": "Atlanta",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.6367,
    "longitude": -84.428101,
    "count": 3
  },
  "23VG": {
    "city": "Boydton",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.70970153808594,
    "longitude": -78.4281005859375,
    "count": 2
  },
  "MSP": {
    "city": "Minneapolis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 44.882,
    "longitude": -93.221802,
    "count": 2
  },
  "FEW": {
    "city": "Cheyenne",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.133302,
    "longitude": -104.866997,
    "count": 2
  },
  "MDW": {
    "city": "Chicago",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.785999,
    "longitude": -87.752403,
    "count": 4
  },
  "DAL": {
    "city": "Dallas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 32.847099,
    "longitude": -96.851799,
    "count": 4
  },
  "DSM": {
    "city": "Des Moines",
    "country": "United States",
    "countryCode": "US",
    "latitude": 41.534000396728516,
    "longitude": -93.66310119628906,
    "count": 3
  },
  "DTW": {
    "city": "Detroit",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.212398529052734,
    "longitude": -83.35340118408203,
    "count": 1
  },
  "15CO": {
    "city": "Englewood",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.654701232910156,
    "longitude": -104.97100067138672,
    "count": 2
  },
  "HNL": {
    "city": "Honolulu",
    "country": "United States",
    "countryCode": "US",
    "latitude": 21.32062,
    "longitude": -157.924228,
    "count": 1
  },
  "HOU": {
    "city": "Houston",
    "country": "United States",
    "countryCode": "US",
    "latitude": 29.64539909,
    "longitude": -95.27890015,
    "count": 3
  },
  "JAX": {
    "city": "Jacksonville",
    "country": "United States",
    "countryCode": "US",
    "latitude": 30.49410057067871,
    "longitude": -81.68789672851562,
    "count": 2
  },
  "LAS": {
    "city": "Las Vegas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.08010101,
    "longitude": -115.1520004,
    "count": 3
  },
  "LAX": {
    "city": "Los Angeles",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.942501,
    "longitude": -118.407997,
    "count": 2
  },
  "27VA": {
    "city": "Manassas",
    "country": "United States",
    "countryCode": "US",
    "latitude": 38.76580047607422,
    "longitude": -77.48780059814453,
    "count": 3
  },
  "MEM": {
    "city": "Memphis",
    "country": "United States",
    "countryCode": "US",
    "latitude": 35.04240036010742,
    "longitude": -89.97669982910156,
    "count": 1
  },
  "MIA": {
    "city": "Miami",
    "country": "United States",
    "countryCode": "US",
    "latitude": 25.79319953918457,
    "longitude": -80.29060363769531,
    "count": 4
  },
  "BOS": {
    "city": "Needham Heights",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.363056,
    "longitude": -71.006389,
    "count": 2
  },
  "BNA": {
    "city": "Nashville",
    "country": "United States",
    "countryCode": "US",
    "latitude": 36.1245002746582,
    "longitude": -86.6781997680664,
    "count": 1
  },
  "EWR": {
    "city": "Newark",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.692501068115234,
    "longitude": -74.168701171875,
    "count": 1
  },
  "JFK": {
    "city": "New York",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.639801,
    "longitude": -73.7789,
    "count": 2
  },
  "PHL": {
    "city": "Philadelphia",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.87189865112305,
    "longitude": -75.24109649658203,
    "count": 1
  },
  "PHX": {
    "city": "Phoenix",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.43429946899414,
    "longitude": -112.01200103759766,
    "count": 1
  },
  "1TS4": {
    "city": "Plano",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.06850051879883,
    "longitude": -96.80139923095703,
    "count": 1
  },
  "PDX": {
    "city": "Portland",
    "country": "United States",
    "countryCode": "US",
    "latitude": 45.58869934,
    "longitude": -122.5979996,
    "count": 1
  },
  "0IS8": {
    "city": "Quincy",
    "country": "United States",
    "countryCode": "US",
    "latitude": 39.9364013672,
    "longitude": -91.3990020752,
    "count": 3
  },
  "SAT": {
    "city": "San Antonio",
    "country": "United States",
    "countryCode": "US",
    "latitude": 29.533701,
    "longitude": -98.469803,
    "count": 4
  },
  "SJC": {
    "city": "San Jose",
    "country": "United States",
    "countryCode": "US",
    "latitude": 37.362598,
    "longitude": -121.929001,
    "count": 4
  },
  "SLC": {
    "city": "Salt Lake City",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.78839874267578,
    "longitude": -111.97799682617188,
    "count": 3
  },
  "BFI": {
    "city": "Seattle",
    "country": "United States",
    "countryCode": "US",
    "latitude": 47.529998779296875,
    "longitude": -122.302001953125,
    "count": 2
  },
  "41NJ": {
    "city": "Secaucus",
    "country": "United States",
    "countryCode": "US",
    "latitude": 40.79180145263672,
    "longitude": -74.07240295410156,
    "count": 2
  },
  "3MI8": {
    "city": "Southfield",
    "country": "United States",
    "countryCode": "US",
    "latitude": 42.48059844970703,
    "longitude": -83.2477035522461,
    "count": 1
  },
  "3AZ7": {
    "city": "Tempe",
    "country": "United States",
    "countryCode": "US",
    "latitude": 33.404643,
    "longitude": -111.970194,
    "count": 1
  },
  "EZE": {
    "city": "Buenos Aires",
    "country": "Argentina",
    "countryCode": "AR",
    "latitude": -34.8222,
    "longitude": -58.5358,
    "count": 1
  },
  "VCP": {
    "city": "Campinas",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.0074005127,
    "longitude": -47.1344985962,
    "count": 2
  },
  "GIG": {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -22.8099994659,
    "longitude": -43.2505569458,
    "count": 3
  },
  "GRU": {
    "city": "Sao Paulo",
    "country": "Brazil",
    "countryCode": "BR",
    "latitude": -23.435556,
    "longitude": -46.473056,
    "count": 2
  },
  "BOG": {
    "city": "Bogota",
    "country": "Colombia",
    "countryCode": "CO",
    "latitude": 4.70159,
    "longitude": -74.1469,
    "count": 1
  },
  "BRU": {
    "city": "Zaventem",
    "country": "Belgium",
    "countryCode": "BE",
    "latitude": 50.901389,
    "longitude": 4.484444,
    "count": 2
  },
  "SOF": {
    "city": "Sofia",
    "country": "Bulgaria",
    "countryCode": "BG",
    "latitude": 42.696693420410156,
    "longitude": 23.411436080932617,
    "count": 2
  },
  "PRG": {
    "city": "Prague",
    "country": "Czech Republic",
    "countryCode": "CZ",
    "latitude": 50.1008,
    "longitude": 14.26,
    "count": 1
  },
  "CPH": {
    "city": "Ballerup",
    "country": "Denmark",
    "countryCode": "DK",
    "latitude": 55.618056,
    "longitude": 12.656111,
    "count": 1
  },
  "HEL": {
    "city": "Vantaa",
    "country": "Finland",
    "countryCode": "FI",
    "latitude": 60.317222,
    "longitude": 24.963333,
    "count": 1
  },
  "ORY": {
    "city": "Saint Denis",
    "country": "France",
    "countryCode": "FR",
    "latitude": 48.7233333,
    "longitude": 2.3794444,
    "count": 2
  },
  "CDG": {
    "city": "Paris",
    "country": "France",
    "countryCode": "FR",
    "latitude": 49.012798,
    "longitude": 2.55,
    "count": 1
  },
  "SXF": {
    "city": "Berlin",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 52.380001,
    "longitude": 13.5225,
    "count": 1
  },
  "DUS": {
    "city": "Düsseldorf",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 51.289501,
    "longitude": 6.76678,
    "count": 1
  },
  "FRA": {
    "city": "Russelsheim",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 50.033333,
    "longitude": 8.570556,
    "count": 2
  },
  "MUC": {
    "city": "Munich",
    "country": "Germany",
    "countryCode": "DE",
    "latitude": 48.353802,
    "longitude": 11.7861,
    "count": 1
  },
  "ATH": {
    "city": "Athens",
    "country": "Greece",
    "countryCode": "GR",
    "latitude": 37.9364013672,
    "longitude": 23.9444999695,
    "count": 1
  },
  "BUD": {
    "city": "Budapest",
    "country": "Hungary",
    "countryCode": "HU",
    "latitude": 47.42976,
    "longitude": 19.261093,
    "count": 1
  },
  "DUB": {
    "city": "Dublin",
    "country": "Ireland",
    "countryCode": "IE",
    "latitude": 53.421299,
    "longitude": -6.27007,
    "count": 2
  },
  "MXP": {
    "city": "Milan",
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 45.6306,
    "longitude": 8.72811,
    "count": 1
  },
  "CIA": {
    "city": "Rome",
    "country": "Italy",
    "countryCode": "IT",
    "latitude": 41.7994,
    "longitude": 12.5949,
    "count": 2
  },
  "OSL": {
    "city": "Oslo",
    "country": "Norway",
    "countryCode": "NO",
    "latitude": 60.193901062012,
    "longitude": 11.100399971008,
    "count": 1
  },
  "SVG": {
    "city": "Stavanger",
    "country": "Norway",
    "countryCode": "NO",
    "latitude": 58.876701354,
    "longitude": 5.6377801895,
    "count": 1
  },
  "WMI": {
    "city": "Warsaw",
    "country": "Poland",
    "countryCode": "PL",
    "latitude": 52.451099,
    "longitude": 20.6518,
    "count": 1
  },
  "LIS": {
    "city": "Lisbon",
    "country": "Portugal",
    "countryCode": "PT",
    "latitude": 38.7813,
    "longitude": -9.13592,
    "count": 1
  },
  "OTP": {
    "city": "Bucharest",
    "country": "Romania",
    "countryCode": "RO",
    "latitude": 44.5711111,
    "longitude": 26.085,
    "count": 1
  },
  "BCN": {
    "city": "Barcelona",
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 41.2971,
    "longitude": 2.07846,
    "count": 1
  },
  "MAD": {
    "city": "Madrid",
    "country": "Spain",
    "countryCode": "ES",
    "latitude": 40.471926,
    "longitude": -3.56264,
    "count": 1
  },
  "BMA": {
    "city": "Bromma",
    "country": "Sweden",
    "countryCode": "SE",
    "latitude": 59.354444,
    "longitude": 17.939722,
    "count": 2
  },
  "ZRH": {
    "city": "Zurich",
    "country": "Switzerland",
    "countryCode": "CH",
    "latitude": 47.464699,
    "longitude": 8.54917,
    "count": 2
  },
  "LTN": {
    "city": "London",
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 51.874698638916016,
    "longitude": -0.36833301186561584,
    "count": 5
  },
  "MAN": {
    "city": "Manchester",
    "country": "United Kingdom",
    "countryCode": "GB",
    "latitude": 53.35369873046875,
    "longitude": -2.2749500274658203,
    "count": 1
  },
  "CAI": {
    "city": "Cairo",
    "country": "Egypt",
    "countryCode": "EG",
    "latitude": 30.12190055847168,
    "longitude": 31.40559959411621,
    "count": 2
  },
  "NBO": {
    "city": "Nairobi",
    "country": "Kenya",
    "countryCode": "KE",
    "latitude": -1.31923997402,
    "longitude": 36.9277992249,
    "count": 1
  },
  "RBA": {
    "city": "Rabat",
    "country": "Morocco",
    "countryCode": "MA",
    "latitude": 34.051498,
    "longitude": -6.75152,
    "count": 1
  },
  "LOS": {
    "city": "Lagos",
    "country": "Nigeria",
    "countryCode": "NG",
    "latitude": 6.5773701667785645,
    "longitude": 3.321160078048706,
    "count": 1
  },
  "CPT": {
    "city": "Cape Town",
    "country": "South Africa",
    "countryCode": "ZA",
    "latitude": -33.9648017883,
    "longitude": 18.6016998291,
    "count": 1
  },
  "JNB": {
    "city": "Isando",
    "country": "Saudi Arabia",
    "countryCode": "SA",
    "latitude": -26.133333,
    "longitude": 28.25,
    "count": 3
  },
  "TLV": {
    "city": "Tel Aviv",
    "country": "Israel",
    "countryCode": "IL",
    "latitude": 32.01139831542969,
    "longitude": 34.88669967651367,
    "count": 1
  },
  "DOH": {
    "city": "Doha",
    "country": "Qatar",
    "countryCode": "QA",
    "latitude": 25.273056,
    "longitude": 51.608056,
    "count": 2
  },
  "ISL": {
    "city": "Istanbul",
    "country": "Turkey",
    "countryCode": "TR",
    "latitude": 40.976898,
    "longitude": 28.8146,
    "count": 1
  },
  "DXB": {
    "city": "Dubai",
    "country": "United Arab Emirates",
    "countryCode": "AE",
    "latitude": 25.2527999878,
    "longitude": 55.3643989563,
    "count": 1
  },
  "MAA": {
    "city": "Chennai",
    "country": "India",
    "countryCode": "IN",
    "latitude": 12.990005493164062,
    "longitude": 80.16929626464844,
    "count": 4
  },
  "HYD": {
    "city": "Hyderabad",
    "country": "India",
    "countryCode": "IN",
    "latitude": 17.231318,
    "longitude": 78.429855,
    "count": 1
  },
  "BOM": {
    "city": "Mumbai",
    "country": "India",
    "countryCode": "IN",
    "latitude": 19.0886993408,
    "longitude": 72.8678970337,
    "count": 2
  },
  "DEL": {
    "city": "New Delhi",
    "country": "India",
    "countryCode": "IN",
    "latitude": 28.5665,
    "longitude": 77.103104,
    "count": 1
  },
  "SZX": {
    "city": "Chai Wan",
    "country": "China",
    "countryCode": "CN",
    "latitude": 22.639444,
    "longitude": 113.810833,
    "count": 1
  },
  "HKG": {
    "city": "Hong Kong",
    "country": "Hong Kong",
    "countryCode": "HK",
    "latitude": 22.308901,
    "longitude": 113.915001,
    "count": 2
  },
  "CGK": {
    "city": "Jakarta",
    "country": "Indonesia",
    "countryCode": "ID",
    "latitude": -6.1255698204,
    "longitude": 106.65599823,
    "count": 1
  },
  "NRT": {
    "city": "Tokyo",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 35.764702,
    "longitude": 140.386002,
    "count": 3
  },
  "KIX": {
    "city": "Osaka",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 34.42729949951172,
    "longitude": 135.24400329589844,
    "count": 2
  },
  "ITM": {
    "city": "Osaka-shi",
    "country": "Japan",
    "countryCode": "JP",
    "latitude": 34.784444,
    "longitude": 135.439167,
    "count": 2
  },
  "ICN": {
    "city": "Seoul",
    "country": "Korea, Republic of",
    "countryCode": "KR",
    "latitude": 37.46910095214844,
    "longitude": 126.45099639892578,
    "count": 1
  },
  "KUL": {
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "countryCode": "MY",
    "latitude": 2.745579957962,
    "longitude": 101.70999908447,
    "count": 1
  },
  "MNL": {
    "city": "Manila",
    "country": "Philippines",
    "countryCode": "PH",
    "latitude": 14.5086,
    "longitude": 121.019997,
    "count": 1
  },
  "SIN": {
    "city": "Singapore",
    "country": "Singapore",
    "countryCode": "SG",
    "latitude": 1.35019,
    "longitude": 103.994003,
    "count": 6
  },
  "TPE": {
    "city": "Taipei",
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 25.0777,
    "longitude": 121.233002,
    "count": 1
  },
  "TSA": {
    "city": "Taipei City",
    "country": "Taiwan, Province of China",
    "countryCode": "TW",
    "latitude": 25.069400787353516,
    "longitude": 121.552001953125,
    "count": 1
  },
  "DMK": {
    "city": "Bangkok",
    "country": "Thailand",
    "countryCode": "TH",
    "latitude": 13.9125995636,
    "longitude": 100.607002258,
    "count": 1
  },
  "SGN": {
    "city": "Ho Chi Minh City",
    "country": "Viet Nam",
    "countryCode": "VN",
    "latitude": 10.8187999725,
    "longitude": 106.652000427,
    "count": 1
  },
  "BNE": {
    "city": "Brisbane",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -27.384199142456055,
    "longitude": 153.11700439453125,
    "count": 1
  },
  "MEB": {
    "city": "Derrimut",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -37.72806,
    "longitude": 144.90194,
    "count": 1
  },
  "BWU": {
    "city": "Macquarie Park",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -33.925,
    "longitude": 150.988333333,
    "count": 1
  },
  "MEL": {
    "city": "Melbourne",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -37.673302,
    "longitude": 144.843002,
    "count": 1
  },
  "PER": {
    "city": "Perth",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -31.94029998779297,
    "longitude": 115.96700286865234,
    "count": 3
  },
  "SYD": {
    "city": "Sydney",
    "country": "Australia",
    "countryCode": "AU",
    "latitude": -33.94609832763672,
    "longitude": 151.177001953125,
    "count": 1
  },
  "AKL": {
    "city": "Auckland",
    "country": "New Zealand",
    "countryCode": "NZ",
    "latitude": -37.008098602299995,
    "longitude": 174.792007446,
    "count": 1
  }
}
```

