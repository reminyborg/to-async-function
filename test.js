/* jshint node:true */
'use strict';

var Readable = require('stream').Readable;
var util = require('util');
var Promise = require('promise');
var test = require('tape');
var toaf = require('./index.js');

test('async function',function(t){
  t.plan(1);

  var afunc = function(cb){
    cb(null,[1,2,3,4]);
  };
  toaf(afunc)(function(err,data){
    t.deepEqual(data,[1,2,3,4]);
  });
});

test('stream',function(t){
  t.plan(1);
  var Readable = require('stream').Readable;

  var rs = new Readable({objectMode:true});
  rs.push(1);
  rs.push(2);
  rs.push(3);
  rs.push(4);
  rs.push(null);
  toaf(rs)(function(err,data){
    t.deepEqual(data,[1,2,3,4]);
  });
});

test('promise',function(t){
  t.plan(1);
  var promise = new Promise.resolve([1,2,3,4]);
  toaf(promise)(function(err,data){
    t.deepEqual(data,[1,2,3,4]);
  });
});

test('object',function(t){
  t.plan(1);

  var array = [1,2,3,4];
  toaf(array)(function(err,data){
    t.deepEqual(data,[1,2,3,4]);
  });
});
