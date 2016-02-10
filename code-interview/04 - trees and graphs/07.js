'use strict';
let treelib = require('./tree.js');
let node = treelib.node;
let a, b;
let tree =
                node(10,
            node(2,
      a = node(1), node(11, b = node(11))), node(14))

let result = commonAncestor(tree, a, b);

function commonAncestor(tree, a, b) {
  let result = null;
  function step(tree, a, b) {
    if (tree == null) return null;
    if (tree == a && tree == b) {
      result = tree;
      return tree;
    }
    let leftResult = step(tree.left, a, b);
    if (leftResult && leftResult == result) {
      return leftResult
    }
    let rightResult = step(tree.right, a, b);
    if (rightResult && rightResult == result) {
      return rightResult;
    }
    if (rightResult && leftResult) {
      result = tree;
      return tree;
    }
    else if (tree == a || tree == b) {
      if (rightResult != null || leftResult != null) result = tree;
      return tree;
    }
    else {
      return rightResult ? rightResult : leftResult;
    }
  }
  step(tree, a, b);
  return result;
}

console.log(result)
