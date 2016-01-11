
/* The original code used to integrate in two dimensions: */

/* function recurse(a, b, s1, tol, maxdepth, depth, f1, f1a, f1b, f2, f2a, f2b) {
  var m, V1, V2, err, s2
  var f1m, f2m

  m = (a + b) * 0.5
  f1m = f1(m)
  f2m = f2(m)

  var d1ma = f1m - f1a
  var d2ma = f2m - f2a

  var d1bm = f1b - f1m
  var d2bm = f2b - f2m

  var fma = Math.sqrt(d1ma * d1ma + d2ma * d2ma)
  var fbm = Math.sqrt(d1bm * d1bm + d2bm * d2bm)

  s2 = fma + fbm
  err = (s2 - s1) / 3

  if( Math.abs(err) < tol ) {
    return s2 + err
  } if( depth > maxdepth ) {
    console.log('integrate-adaptive-simpson: Warning: maximum recursion depth (' + maxdepth + ') exceeded')
    return s2 + err
  } else {
    V1 = recurse(a, m, fma, tol, maxdepth, depth + 1, f1, f1a, f1m, f2, f2a, f2m)
    V2 = recurse(m, b, fbm, tol, maxdepth, depth + 1, f1, f1m, f1b, f2, f2m, f2b)
    return V1 + V2
  }
} */

