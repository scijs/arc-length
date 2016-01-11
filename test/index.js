/* global it, describe */

'use strict'

var arcLength = require('../')
var assert = require('chai').assert
var ae = require('almost-equal')

assert.almostEqual = function almostEqual (a, b, epsilon) {
  var eps = epsilon === undefined ? ae.DBL_EPSILON : epsilon
  assert(ae(a, b, eps, eps), 'expected ' + a + ' to equal ' + b)
}

describe('arc-length', function () {
  it('integrates a curve in one dimension', function () {
    var length = arcLength([Math.sin], 0, 0.5 * Math.PI, 1e-4)
    assert.almostEqual(length, 1, 1e-6)
  })

  it('throws an error for zero dimensions', function () {
    assert.throws(function () {
      arcLength([], 0, Math.PI, 1e-6)
    }, Error, /must be greater than zero/)
  })

  it('throws an error for bad input', function () {
    assert.throws(function () {
      arcLength(function (x) { return x }, 0, Math.PI, 1e-6)
    }, Error, /Curve must be a list of functions of a single argument/)
  })

  it('integrates a curve in two dimensions', function () {
    var length = arcLength([Math.cos, Math.sin], 0, Math.PI, 1e-6)
    assert.almostEqual(length, Math.PI, 1e-10)
  })

  it('integrates a curve in three dimensions', function () {
    var length = arcLength([
      function (x) { return Math.abs(x) },
      function (x) { return x },
      function (x) { return x }
    ], 0, 2, 1e-6)
    assert.almostEqual(length, 2 * Math.sqrt(3), 1e-6)
  })

  it('integrates a curve in five dimensions', function () {
    var length = arcLength([
      function (x) { return Math.abs(x) },
      function (x) { return x },
      function (x) { return x },
      Math.sin,
      Math.cos
    ], 0, 2, 1e-6)
    assert.almostEqual(length, 4, 1e-6)
  })

  it('integrates a curve in two dimensions', function () {
    var length = arcLength([Math.cos, Math.sin], 0, Math.PI * 8, 1e-4, 4, 10)
    assert.almostEqual(length, Math.PI * 8, 1e-8)
  })

  it('result is unchanged by reversing the limits', function () {
    var dir1 = arcLength([Math.cos, Math.sin], Math.PI, 0, 1e-6)
    var dir2 = arcLength([Math.cos, Math.sin], 0, Math.PI, 1e-6)
    assert.almostEqual(dir1, dir2)
  })
})
