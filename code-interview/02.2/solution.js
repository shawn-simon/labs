var lib = require('../lib');

function getNthToLastNode(node, k){
	var result;

	var iterate = function(n) {
		if (n != null)
		{
			iterate(n.next);
			if (k == 0)
			{
				result = n;
			}
			k--;
		}
	}
	iterate(node);
	return node;
}

lib.printNode(lib.data.node);
console.log(getNthToLastNode(lib.data.node, 4));