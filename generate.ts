import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import airportOverridesData from './lib/airportOverrides';
import { AirportData, CountryData, CityData } from './src/index';

// Load large airport data
const largeAirportData: AirportData[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp', 'large-airports.json'), 'utf8'));
// Load all airport data
const allAirportData: AirportData[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp', 'airport-codes.json'), 'utf8'));
// Load countries data
const countriesData: CountryData[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp', 'country-codes.json'), 'utf8'));

interface LocationData extends CityData {
  code?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
}

const writeCSV = (locations: LocationData[]): void => {
  const csvPath = path.join(__dirname, 'data', 'azure-edge-locations.csv');
  const csvDir = path.dirname(csvPath);
  if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
  }
  const data = locations.map(e => {
    return `${e.code},${e.city},${e.country},${e.countryCode},${e.latitude},${e.longitude},${e.count}`;
  });
  // Add header
  data.unshift('code,city,country,country_code,latitude,longitude,count');
  fs.writeFileSync(csvPath, data.join(os.EOL), 'utf8');
}

const writeJSON = (locations: LocationData[]): void => {
  const jsonPath = path.join(__dirname, 'data', 'azure-edge-locations.json');
  const jsonDir = path.dirname(jsonPath);
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }
  const data: { [code: string]: any } = {};
  locations.forEach(location => {
    if (location.code) {
      data[location.code] = {
        city: location.city,
        country: location.country,
        countryCode: location.countryCode,
        latitude: location.latitude,
        longitude: location.longitude,
        count: location.count,
      }
    }
  });
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

const lookupCountry = (countryCode: string): string => {
  const foundCountry = countriesData.filter(country => country.Code === countryCode);
  if (foundCountry.length === 1) {
    return foundCountry[0].Name;
  } else {
    return '';
  }
}

const lookupAirport = (city: string, dataSource: AirportData[] = largeAirportData): AirportData | null => {
  const matches: AirportData[] = [];
  let match: AirportData | null = null;
  // Search for matches
  dataSource.forEach(entry => {
    if (entry.municipality && entry.municipality.toLowerCase() === city.toLowerCase()) {
      matches.push(entry);
    }
  });
  if (matches.length > 1) { // Handle multiple matches
    const tempMatches: AirportData[] = [];
    matches.forEach(m => {
      if (m.name.toLowerCase().indexOf('international') !== -1) {
        tempMatches.push(m);
      }
    });
    if (tempMatches.length > 0) { // Multiple matches, take first one, kind of random selection
      match = tempMatches[0];
    } else { // no "international" tempMatches, fallback to first el of unfiltered matches
      match = matches[0];
    }
  } else { // Single match
    match = matches[0];
  }
  return match;
}

const run = async (): Promise<void> => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--lang=en-US', 
      '--accept-lang=en-US,en;q=0.9',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();

  // Set timeout
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(30000);

  page.on('console', consoleObj => console.log(consoleObj.text()));

  // Set custom user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');

  try {
    const response = await page.goto('https://learn.microsoft.com/en-us/azure/cdn/cdn-pop-locations', { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for network idle
    await page.waitForNetworkIdle({ timeout: 10000 });

    if (response && response.status() > 399) {
      throw new Error(`Failed with response code ${response.status()}`)
    }
  } catch (error) {
    console.error('Error loading page:', error);
    await browser.close();
    throw error;
  }

  let data: CityData[] = [];
  try {
    data = await page.evaluate(`
      (function() {
        let cities = [];
        
        // Find the table containing Azure CDN data by looking for the table with North America and Europe regions
        const tables = document.querySelectorAll('table');
        let targetTable = null;
        
        for (let i = 0; i < tables.length; i++) {
          const table = tables[i];
          const text = table.textContent || '';
          if (text.includes('North America') && text.includes('Europe') && text.includes('Etobicoke')) {
            targetTable = table;
            break;
          }
        }
        
        if (targetTable) {
          const regions = targetTable.querySelectorAll('tbody tr td:nth-child(2)');
          regions.forEach((region) => {
            // Names
            const names = region.innerHTML.split("<br>");
            cities = cities.concat(names).filter(city => city.length > 0);
          });
        }

        // US Countries
        const usStates = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming","AS":"American Samoa","DC":"District of Columbia","FM":"Federated States of Micronesia","GU":"Guam","MH":"Marshall Islands","MP":"Northern Mariana Islands","PW":"Palau","PR":"Puerto Rico","VI":"Virgin Islands"};
        const cityReplacements = {"Singapore": "Singapore, Singapore", "Zürich": "Zurich", "Duesseldorf": "Düsseldorf", "Frankfurt": "Frankfurt am Main", "Bogotá": "Bogota", "Saint Petersburg": "St. Petersburg", "Chai Wan, Hong Kong SAR": "Chai Wan, Hong Kong", "Des Moines,IA, USA (3)": "Des Moines, IA, USA (3)", "Hong Kong (2)": "Hong Kong, Hong Kong (2)", "Osaka, Japan(2)": "Osaka, Japan (2)", "Querétaro": "Queretaro", "Dallas": "Dallas-Fort Worth", "Hong Kong": "Islands"}
        
        function extractPopCount(inputString) {
          const found = inputString.split(" (");
          if (found.length === 2) {
            return {
              country: found[0],
              count: parseInt(found[1].replace(")", ""))
            };
          } else {
            return {
              country: inputString,
              count: 1
            };
          }
        }

        const cleanedCities = cities.map((cityString) => {
          Object.getOwnPropertyNames(cityReplacements).forEach(replacement => {
            cityString = cityString.replace(replacement, cityReplacements[replacement]);
          })
            
          const temp = cityString.split(', ');

          let c = {
            city: temp[0].trim(),
            count: 1
          };

          if (temp.length === 2) {
            const popData = extractPopCount(temp[1].trim());
            c = {
              city: c.city,
              country: popData.country,
              count: popData.count
            }
          } else if (temp.length === 3) {
            c.state = usStates[temp[1]];
            c.country = "United States";
            c.count = extractPopCount(temp[2]).count;
          } else {
            console.log("error " + cityString);
          }
          return c;
        });

        return cleanedCities;
      })()
    `) as CityData[];
  } catch (error) {
    console.error('Error evaluating page:', error);
    await browser.close();
    throw error;
  }

  await page.close();
  await browser.close();

  const withAirports: LocationData[] = data.map((city): LocationData => {
    const location: LocationData = {
      ...city
    };

    const airport = location?.city?.length > 0 ? lookupAirport(location.city) : null;

    if (airportOverridesData.hasOwnProperty(location.city.toLowerCase())) {
      const overrideData = airportOverridesData[location.city.toLowerCase()];
      location.code = overrideData.code;
      location.countryCode = overrideData.countryCode;
      location.country = lookupCountry(overrideData.countryCode);
      location.latitude = overrideData.latitude;
      location.longitude = overrideData.longitude;
    } else if (airport) {
      location.code = airport.iata_code || airport.ident;
      location.countryCode = airport.iso_country;
      location.country = lookupCountry(airport.iso_country);
      const coordinate = airport.coordinates.split(', ');
      location.latitude = parseFloat(coordinate[0]);
      location.longitude = parseFloat(coordinate[1]);
    } else {
      // Run a second pass with all airports if not found before. Increases data quality
      const smallAirport = lookupAirport(location.city, allAirportData);
      if (smallAirport) {
        location.code = smallAirport.iata_code || smallAirport.ident;
        location.countryCode = smallAirport.iso_country;
        location.country = lookupCountry(smallAirport.iso_country);
        const coordinate = smallAirport.coordinates.split(', ');
        location.latitude = parseFloat(coordinate[0]);
        location.longitude = parseFloat(coordinate[1]);
      }
    }
    return location;
  });

  writeJSON(withAirports);
  writeCSV(withAirports);
}

run();
