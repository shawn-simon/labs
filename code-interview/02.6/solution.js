var lib = require('../lib');

var list = (new lib.Node(1)).appendToTail(2).appendToTail(3).appendToTail(4).appendToTail(5)
	.appendToTail(6).appendToTail(7).appendToTail(8).appendToTail(9).appendToTail(9).appendToTail(9).appendToTail(9).appendToTail(9)
	.appendToTail(9).appendToTail(9).appendToTail(9).appendToTail(9).appendToTail(9)


n = list;
while (n.next != null)
{
	n = n.next;
}
n.next = list.next.next.next.next;


function findBeginning(head)
{
	var fastRunner = head;
	var slowRunner = head;
	while (fastRunner != null && fastRunner.next != null)
	{
		slowRunner = slowRunner.next;
		fastRunner = fastRunner.next.next;
		if (slowRunner == fastRunner)
		{
			break;
		}
	}
	
	if (fastRunner == null || fastRunner.next == null)
	{
		return null;
	}

	slowRunner = head;
	while (slowRunner != fastRunner)
	{
		slowRunner = slowRunner.next;
		fastRunner = fastRunner.next;
	}

	return fastRunner;
}

console.log(findBeginning(list));