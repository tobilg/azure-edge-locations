const chai = require('chai');
const should = chai.should();

const AzureEdgeLocations = require('../src/index');

chai.config.includeStack = false;

describe("# Testing the cloudflare-edge-locations functionality", function() {
  describe("## Basic functionality testing", function () {
    it("should return the data for IAD", function (done) {
      const el = new AzureEdgeLocations();

      el.lookup('IAD').should.be.a('object');
      el.lookup('IAD').should.eql({
        "city": "Ashburn",
        "country": "United States",
        "countryCode": "US",
        "latitude": 38.94449997,
        "longitude": -77.45580292,
        "count": 1
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

      el.getLocationCount().should.eql(99);
      done();
    });

    it("should return the correct count of Edge Locations", function (done) {
      const el = new AzureEdgeLocations();

      el.getPoPCount().should.eql(99);
      done();
    });
  });
});
