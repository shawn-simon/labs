'use strict';
let treelib = require('./tree.js');
let node = treelib.node;

let list = [1,2,3,4,5,6,7,8,9,10]

function createMinimalBst(list) {
  function step(start, end) {
    console.log(start, end)
    if (end < start) return null;
    let mid = Math.floor((start + end) / 2);
    let n = node(list[mid])
    n.left = step(start, mid - 1);
    n.right = step(mid + 1, end);
    return n;
  }
  return step(0, list.length - 1)
}

console.log(createMinimalBst(list))
