
'use strict';

let items = [];
let root = null;
let n;
for (let i = 0; i < 100000; i++) {
  n = Math.floor(Math.random()* 50000);
  track(n);
  items.push(n);
}

console.log(getRankOf(n));
items = items.sort((a, b) => {return a - b});
console.log(n)

function track(x) {
  if (root == null) {
    root = node(x)
  } else {
    root.insert(x);
  }
}

function getRankOf(x, node)
{
  node = node || root;
  if (node.value == x)
  {
    return node.leftsize;
  }
  else if (x < node.value)
  {
    if (node.left == null) return -1;
    return getRankOf(x, node.left)
  }
  else
  {
    if (node.right == null) return -1;
    return (node.leftsize + 1 + getRankOf(x, node.right));
  }
}

function node(x) {
  let self = {
    leftsize: 0,
    value: x,
    right: null,
    left: null,
    insert: insert
  }
  function insert(x) {
    if (x <= self.value) {
      self.leftsize++;
      if (self.left == null)
      {
        self.left = node(x);
      } else {
        self.left.insert(x);
      }
    } else {
      if (self.right == null)
      {
        self.right = node(x);
      } else {
        self.right.insert(x);
      }
    }
  }
  return self;
}
