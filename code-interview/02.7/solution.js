var lib = require('../lib');

var lists = [(new lib.Node(7)).appendToTail(8).appendToTail(6).appendToTail(8).appendToTail(7),
   (new lib.Node(7)).appendToTail(8).appendToTail(6).appendToTail(6).appendToTail(8).appendToTail(7),
   (new lib.Node(7)).appendToTail(8).appendToTail(6).appendToTail(5).appendToTail(8).appendToTail(7)]


function isPalindrome(head)
{
	var forward = head;
	var result = true;
	var iterate = function(backward)
	{
		if (backward.next) {
			iterate(backward.next);
		}
		if (forward.data != backward.data)
		{
			result = false;
		}
		forward = forward.next;
	}

	iterate(head)
	return result;
}

lists.forEach(function(list) {
	lib.printNode(list);
	console.log(isPalindrome(list));
})