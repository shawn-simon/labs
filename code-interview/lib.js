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
	}
}

module.exports.Node = Node;