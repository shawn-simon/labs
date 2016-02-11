// magic int
'use strict';

let list = [
  -20, -15, -10, -5, 0, 11, 11, 11, 11, 11, 11, 11, 11, 24, 25, 30
]


// find magic int

function magicInt(list) {
  function step(start, end) {
    if (end < start) return null;
    let mid = Math.floor((start + end) / 2);
    let value = list[mid];
    if (value < mid) {
      return step(mid, end);
    }
    else if (value > mid) {
      return step(start, mid);
    }
    else if (value == mid)
    {
      return mid;
    }
  }
  return step(0, list.length - 1)
}
//TODO handle dupes...
console.log(magicInt(list));
