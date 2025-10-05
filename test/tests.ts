import * as chai from 'chai';
const expect = chai.expect;

import AzureEdgeLocations from '../dist/index.js';

chai.config.includeStack = false;

describe("# Testing the azure-edge-locations functionality", function() {
  describe("## Basic functionality testing", function () {
    it("should return the data for IAD", function (done) {
      const el = new AzureEdgeLocations();

      const result = el.lookup('ATL');
      expect(result).to.not.be.false;
      expect(result).to.be.an('object');
      expect(result).to.eql({
        "city": "Atlanta",
        "country": "United States",
        "countryCode": "US",
        "latitude": 33.6367,
        "longitude": -84.428101,
        "count": 3
      });
      done();
    });

    it("should return 'false' if code isn't found", function (done) {
      const el = new AzureEdgeLocations();

      const result = el.lookup('FOO');
      expect(result).to.eql(false);
      done();
    });

    it("should return the correct count of locations", function (done) {
      const el = new AzureEdgeLocations();

      const count = el.getLocationCount();
      expect(count).to.be.greaterThan(100);
      done();
    });

    it("should return the correct count of Edge Locations", function (done) {
      const el = new AzureEdgeLocations();

      const locations = el.getPoPCount();
      expect(locations).to.be.greaterThan(100);
      done();
    });
  });
});
