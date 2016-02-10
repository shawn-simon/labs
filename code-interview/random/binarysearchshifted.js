'use strict';
let list = [];
for (let i = 0; i < 100; i++) {
  list.push(i*2)
}

function search(list, n) {
  console.log('searching ', list, 'for', n)
  function step(start, end) {
    console.log('checking between', start, 'and', end)
    if (end < start) return null;
    let mid = Math.floor((start + end) / 2);
    let val = list[mid];
    if (val == n) return mid;
    else if (n < val || list[start] <= n) return step(start, mid - 1);
    else return step(mid + 1, end);
  }
  return step(0, list.length - 1)
}

console.log(search([6, 7, 8, 9, 1, 2, 3, 4, 5], 9))
