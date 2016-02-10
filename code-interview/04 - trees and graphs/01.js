'use strict';
let treelib = require('./tree.js');
let node = treelib.node;
let balancedNonBST =
                node(10,
            node(2,
      node(1), node(11)), node(14))

let result = checkIfBalanced(balancedNonBST);

function checkIfBalanced(tree) {
  function step(tree)
  {
    if (tree == null) return 0;

    let left = step(tree.left);
    if (left == -1) return -1;

    let right = step(tree.right);
    if (left == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
  return step(tree) != -1;
}

console.log(result)
