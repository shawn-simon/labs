
'use strict';
let parens = (n) => {
  let results = [], step = (l, r, str) => {
    if (l == 0 && r == 0) return results.push(str);
    if (l > 0) step(l - 1, r, str + '(')
    if (l < r) step(l, r - 1, str + ')')
  }
  step(n, n, '');
  return results;
}
console.log(parens(2));
