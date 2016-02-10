'use strict';
let treelib = require('./tree.js');
let node = treelib.node;
let balancedNonBST =
                node(10,
            node(2,
      node(1), node(11)), node(14))




function invert(tree) {
  let temp = tree.left;
  tree.left = tree.right;
  tree.right = temp;
  if (tree.left) invert(tree.left);
  if (tree.right) invert(tree.right);
}

treelib.inorder(balancedNonBST, (value) => { console.log(value) })
let result = invert(balancedNonBST);
treelib.inorder(balancedNonBST, (value) => { console.log(value) })
