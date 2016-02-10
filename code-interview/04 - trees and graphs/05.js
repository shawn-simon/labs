'use strict';
let treelib = require('./tree.js');
let node = treelib.node;
let balancedNonBST =
                node(10,
            node(2,
      node(1), node(11)), node(14))

let balancedBST =
                node(10,
            node(2,
      node(1), node(8)), node(14))


let result = isBST(balancedNonBST);

function isBST(tree) {
  function step(tree, min, max)
  {
    if (tree == null) return true;
    if (min !== null && tree.value <= min) return false;
    if (max !== null && tree.value > max) return false;
    return step(tree.left, min, tree.value) && step(tree.right, tree.value, max);
  }
  return step(tree);
}

console.log(result)

result = isBST(balancedBST);

console.log(result);
