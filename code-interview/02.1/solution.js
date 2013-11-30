var lib = require('../lib');
var Node = lib.Node;

var node = new Node(4);
node.appendToTail(9);
node.appendToTail(12);
console.log(node);
console.log(node.next);
console.log(node.next.next);