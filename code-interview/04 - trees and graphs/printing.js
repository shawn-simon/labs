'use strict';
let treelib = require('./tree.js');
let node = treelib.node;
let balancedNonBST =
                node(10,
            node(2,
      node(1), node(11)), node(14))

treelib.print(balancedNonBST);
