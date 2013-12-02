// Towers of Hanoii.

function Hanoi() {
	this.left = [];
	this.mid = [];
	this.right = [];
	var that = this;
	this.populate = function() {
		this.left = [10,9,8,7,6,5,4,3,2,1]; 
		this.mid = [];
		this.right = [];
	}
	this.move = function(stack1, stack2) {
		if (typeof stack1 == 'string')
		{
			stack1 = that[stack1];
			stack2 = that[stack2];
		}
		if (stack1.length == 0)
		{
			throw 'stack is empty'
		}

		var top1 = stack1.pop();
		var top2 = stack2.pop();
		if (top2 != null && top1 > top2) {
			throw 'invalid move'
		}
		if (top2 != null)
		{
			stack2.push(top2);
		}
		stack2.push(top1);
	}
	this.solve = function()
	{
		var iterate = function(n, origin, destination, buffer)
		{
			if (n == 0) return;
			iterate(n - 1, origin, buffer, destination);
			that.move(origin, destination);
			that.print();
			iterate(n - 1, buffer, destination, origin);
		}
		var n = that.left.length;
		iterate(n, that.left, that.right, that.mid)
	}
	this.print = function()
	{
		console.log(this.left, this.mid, this.right)
	}
}

var game = new Hanoi();
game.populate();
game.print();
game.solve();
game.print();


