'use strict';

exports.node = function(value, left, right) {
  return {
    value: value || null,
    right: right || null,
    left: left || null
  }
}

function inorder(tree, map) {
  if (tree.left) inorder(tree.left, map);
  map(tree.value)
  if (tree.right) inorder(tree.right, map);
}
exports.inorder = inorder;


function print(tree)
{
  let depth = maxDepth(tree);
  function step(tree) {
    // TODO: print... tedious, not impossible, not easy in console.
    console.log(tree.value)
  }
}
exports.print = print;

function maxDepth(tree) {
  function step(tree, level) {
    return Math.max(
      (tree.left ? step(tree.left, level + 1) : level),
      (tree.right ? step(tree.right, level + 1) : level)
    )
  }
  return step(tree, 0)
}
exports.maxDepth = maxDepth;

//treelib.inorder(balancedNonBST, (value) => { console.log(value) })
