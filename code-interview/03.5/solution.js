var lib = require('../lib');

function MyQueue()
{
	this.stack1 = [];
	this.stack2 = [];
	var that = this;
	this.enqueue = function(item)
	{
		that.stack1.push(item);
		console.log(that.stack1, that.stack2)
		return that;
	};
	this.dequeue = function(item)
	{
		rearrange();
		if (that.stack2.length == 0)
		{
			return null;
		}
		var result = that.stack2.pop();
		console.log('popping', result)
		console.log(that.stack1, that.stack2)
		return that;
	}
	var rearrange = function() {
		if (that.stack2.length == 0)
		{
			while(that.stack1.length != 0)
			{
				that.stack2.push(that.stack1.pop())
			}
		}
	}
}

var queue = new MyQueue();
queue.enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5).enqueue(6).dequeue().enqueue(7).dequeue().dequeue().enqueue(8).dequeue().dequeue().dequeue().dequeue();