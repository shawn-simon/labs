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

  }
  step(tree, a, b);
  return result;
}

console.log(result)
