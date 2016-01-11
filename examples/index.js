'use strict'

var arcLength = require('../')

var l = arcLength([Math.cos, Math.sin], 0, Math.PI)

console.log('length =', l)
