import edgeLocations from "./data/azure-edge-locations.json" with { type: "json" };

// Main interfaces for the library
export interface EdgeLocation {
  code?:         string;
  city:          string;
  country:       string;
  countryCode:   string;
  latitude:      number;
  longitude:     number;
  count:         number;
}

export interface EdgeLocations {
  [key: string]: EdgeLocation;
}

// Supporting interfaces (used by generate.ts and other files)
export interface AirportData {
  iata_code?: string;
  ident: string;
  iso_country: string;
  coordinates: string;
  municipality?: string;
  name: string;
}

export interface CountryData {
  Code: string;
  Name: string;
}

export interface AirportOverride {
  code: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface AirportOverrides {
  [city: string]: AirportOverride;
}

export interface CityData {
  city: string;
  country?: string;
  state?: string;
  count: number;
}

const azureEdgeLocations = edgeLocations as EdgeLocations;

export default class AzureEdgeLocations {
  constructor() {}

  getLocationCount (): number {
    return Object.getOwnPropertyNames(azureEdgeLocations).length;
  }

  getLocations (): EdgeLocations {
    return azureEdgeLocations;
  }

  lookup (code: string): EdgeLocation | false {
    if (azureEdgeLocations.hasOwnProperty(code.toUpperCase())) {
      return azureEdgeLocations[code.toUpperCase()];
    } else {
      return false;
    }
  }
}
