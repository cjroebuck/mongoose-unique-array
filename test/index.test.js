'use strict';

var arrayUnique = require('../');
var assert = require('assert');
var mongoose = require('mongoose');

describe('arrayUnique', function() {
  before(function() {
    mongoose.connect('mongodb://localhost:27017/mongoose_test');
  });

  beforeEach(function(done) {
    mongoose.connection.dropDatabase(done);
  });

  it('works', function(done) {
    var schema = new mongoose.Schema({
      arr: [{ type: String, unique: true }],
      docArr: [{ name: { type: String, unique: true } }]
    });
    schema.plugin(arrayUnique);
    var M = mongoose.model('T1', schema);

    M.create({}, function(error, doc) {
      assert.ifError(error);
      doc.arr.push('test');
      doc.docArr.push({ name: 'test' });
      doc.save(function(error) {
        assert.ifError(error);
        done();
      });
    });
  });
});
