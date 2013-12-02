var lib = require('../lib');

var list1 = (new lib.Node(7)).appendToTail(1).appendToTail(6)
var list2 = (new lib.Node(5)).appendToTail(9).appendToTail(2).appendToTail(1)

function addLinkedLists(list1, list2)
{
	var result = new lib.Node();
	function iterate(node1, node2, sumNode, remainder)
	{
		var sum = (node1 != null ? node1.data : 0) + (node2 != null ? node2.data : 0) + remainder; 
		if (sumNode.data == null)
		{
			sumNode.data = sum % 10;
		}
		else
		{
			sumNode.appendToTail(sum % 10)
			sumNode = sumNode.next;
		}
		console.log(sumNode)
		if ((node1 && node1.next) || (node2 && node2.next))
		{
			iterate(node1.next, node2.next, sumNode, Math.floor(sum/10))
		}
	}
	iterate(list1, list2, result, 0)
	return result;
}

lib.printNode(list1)
lib.printNode(list2)
lib.printNode(addLinkedLists(list1, list2))