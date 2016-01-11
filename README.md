# arc-length [![Build Status](https://travis-ci.org/scijs/arc-length.svg)](https://travis-ci.org/scijs/arc-length) [![npm version](https://badge.fury.io/js/arc-length.svg)](https://badge.fury.io/js/arc-length) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Compute the arc length of an n-dimensional curve using Romberg integration

## Introduction

This module computes the arc length of a parameterized n-dimensional curve using adaptive Romberg integration.

## Example

To compute the circumference of a circle:

```javascript
var arcLength = require('arc-length')

arcLength([Math.cos, Math.sin], 0, Math.PI * 2)
//=> 6.283185307178426
```

## Installation

```javascript
$ npm install arc-length
```

## API

#### `require('arc-length')(y, start, end[, tol=1e-8 [, mindepth=2, maxdepth=10]]])`
**Arguments**:
- **`y`**: An `Array` of functions of a single parameter which define the curve.
- **`start`**: The lower bound of integration.
- **`end`**: The upper bound of integration.
- **`tol`** (optional, default: 1e-8): The relative error tolerance
- **`mindepth`** (optional, default: 2): The minimum recursion depth for adaptive integration
- **`maxdepth`** (optional, default: 10): The maximum recursion depth for adaptive integration

**Returns**: Returns the scalar arc length

## License
&copy; 2016 Ricky Reusser. MIT License.
