'use strict'

var arcLength = require('../')

var l = arcLength([Math.cos, Math.sin], 0, Math.PI * 2)

console.log('length =', l)
