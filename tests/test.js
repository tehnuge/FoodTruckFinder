var expect = require('chai').expect;
var appFile = require('../src/js/app.js')

var assert = require('assert');
describe('SimpleTest', function() {

})
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});