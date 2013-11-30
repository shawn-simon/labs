module.exports.matricies = 
[
[[1,2],[3,4]],
[[1,2,0],[3,4,6]],
[[1,2,3], [4,5,6],[7,8,9]],
[[1,2,3], [4,5,0],[7,8,9]],
];

module.exports.printMatrix = function(matrix) {
	matrix.forEach(function(row) {
		console.log(row)
	})
}


function Node(data) {
	var that = this;
	this.next = null;
	this.data = data;
	this.appendToTail = function(data) {
		var end = new Node(data);
		var n = that;
		while (n.next != null) {
			n = n.next;
		}
		n.next = end;
		return that;
	}
}

module.exports.removeNode = function(head, data)
{
	if (head.data == data)
	{
		return head.next;
	}
	var n = head;
	while (n.next != null)
	{
		if (n.next.data == data)
		{
			n.next = n.next.next;
			return head;
		}
	}
	return head;
}

module.exports.printNode = function(head)
{
	var n = head;
	var data = [n.data];
	while (n.next != null)
	{
		data.push(n.next.data);
	    n = n.next;
	}
	console.log(data.join('-'))
}

module.exports.data = {};
module.exports.data.node = new Node(9)
module.exports.data.node.appendToTail(8).appendToTail(2).appendToTail(7).appendToTail(8).appendToTail(5).appendToTail(3).appendToTail(3).appendToTail(3).appendToTail(4).appendToTail(4)
module.exports.Node = Node;