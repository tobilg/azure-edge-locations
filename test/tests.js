const chai = require('chai');
const should = chai.should();

const AzureEdgeLocations = require('../src/index');

chai.config.includeStack = false;

describe("# Testing the azure-edge-locations functionality", function() {
  describe("## Basic functionality testing", function () {
    it("should return the data for IAD", function (done) {
      const el = new AzureEdgeLocations();

      el.lookup('ATL').should.be.a('object');
      el.lookup('ATL').should.eql({
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

      el.lookup('FOO').should.eql(false);
      done();
    });

    it("should return the correct count of locations", function (done) {
      const el = new AzureEdgeLocations();

      el.getLocationCount().should.eql(104);
      done();
    });

    it("should return the correct count of Edge Locations", function (done) {
      const el = new AzureEdgeLocations();

      el.getPoPCount().should.eql(182);
      done();
    });
  });
});
