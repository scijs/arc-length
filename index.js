'use strict'

module.exports = arcLength

var integratorCache = []

function createIntegrator (d) {
  var i, line, params
  var text = []

  // text.push('console.log("depth = ",depth)')
  text.push('var s2, err, m, V1, V2')
  text.push('m = (a + b) * 0.5')

  for (i = 0; i < d; i++) {
    text.push('var f' + i + 'm = f' + i + '(m)')
    text.push('var d' + i + 'ma = f' + i + 'm - f' + i + 'a')
    text.push('var d' + i + 'bm = f' + i + 'b - f' + i + 'm')
  }

  for (i = 0, line = []; i < d; i++) {
    line.push('d' + i + 'ma * d' + i + 'ma')
  }
  text.push('var fma = Math.sqrt(' + line.join(' + ') + ')')

  for (i = 0, line = []; i < d; i++) {
    line.push('d' + i + 'bm * d' + i + 'bm')
  }
  text.push('var fbm = Math.sqrt(' + line.join(' + ') + ')')

  text.push('s2 = fma + fbm')
  text.push('err = (s2 - s1) / 3')
  text.push('if (depth >= mindepth && Math.abs(err) < tol * s2) {')
  text.push('  return s2 + err')
  text.push('} if (depth > maxdepth) {')
  text.push('  console.log("integrate-adaptive-simpson: Warning: maximum recursion depth (" + maxdepth + ") exceeded at t = " + m + ")")')
  text.push('  return s2 + err')
  text.push('} else {')

  for (i = 0, line = []; i < d; i++) {
    line.push('f' + i + ', f' + i + 'a, f' + i + 'm')
  }
  text.push('  V1 = recurse(a, m, fma, tol, mindepth, maxdepth, depth + 1, ' + line.join(', ') + ', recurse)')

  for (i = 0, line = []; i < d; i++) {
    line.push('f' + i + ', f' + i + 'm, f' + i + 'b')
  }
  text.push('  V2 = recurse(m, b, fbm, tol, mindepth, maxdepth, depth + 1, ' + line.join(', ') + ', recurse)')
  text.push('  return V1 + V2')
  text.push('}')

  params = ['a', 'b', 's1', 'tol', 'mindepth', 'maxdepth', 'depth']
  for (i = 0, line = []; i < d; i++) {
    params.push('f' + i)
    params.push('f' + i + 'a')
    params.push('f' + i + 'b')
  }
  params.push('recurse')

  // console.log('source:\n',text.join('\n'))

  return new Function(params, text.join('\n')) // eslint-disable-line
}

function arcLength (y, a, b, tol, mindepth, maxdepth) {
  var i, f, fa, fb, df2, df

  if (!Array.isArray(y)) {
    throw new Error('Curve must be a list of functions of a single argument. Got argument of type "' + (typeof y) + '"')
  }

  var n = y.length
  if (!(Number(n) === n && n % 1 === 0) || n < 1) {
    throw new Error('Dimensionality of curve must be greater than zero')
  }

  if (tol === undefined) {
    tol = 1e-8
  }
  if (mindepth === undefined) {
    mindepth = 2
  }
  if (maxdepth === undefined) {
    maxdepth = 10
  }

  var args = [a, b, s1, tol, mindepth, maxdepth, 1]

  for (i = 0, df2 = 0; i < n; i++) {
    f = y[i]
    fa = f(a)
    fb = f(b)
    df = fb - fa
    args.push(f)
    args.push(fa)
    args.push(fb)
    df2 += df * df
  }

  var s1 = Math.sqrt(df2)

  var integrator = integratorCache[n]
  if (!integrator) {
    integrator = createIntegrator(n)
    integratorCache[n] = integrator
  }

  args.push(integrator)

  return integrator.apply(null, args)
}
