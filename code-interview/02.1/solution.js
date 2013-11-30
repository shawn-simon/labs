var lib = require('../lib');
var Node = lib.Node;

function removeDuplicates() {
	var n = lib.data.node, head = lib.data.node;
	lib.printNode(head)
	var previous = null, duplicates = {};
	while (n !=null)
	{
		if (duplicates[n.data] != null)
		{
			previous.next = n.next;
			console.log('deleting', n.data)
		}
		else
		{
			duplicates[n.data] = 1;
			previous = n;
		}
		n = n.next;
	}

	lib.printNode(head)
}

//removeDuplicates()

function removeDuplicatesAlt(node)
{
	lib.printNode(node)
	var n = node;
	while (n != null)
	{
		var runner = n;
		while (runner.next != null)
		{
			if (runner.next.data == n.data)
			{
				// duplicate.
				console.log(n.data)
				runner.next = runner.next.next;
			}
			else
			{
				runner = runner.next;
			}
		}
		n = n.next;
	}
	lib.printNode(node);
}

removeDuplicatesAlt(lib.data.node)