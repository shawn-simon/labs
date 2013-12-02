function SetOfStacks(opt)
{
	opt = opt || {stackSize: 4};
	var _storage = [];
	var _items = 0;
	var that = this;
	this.push = function(item) {
		var newItemCount = _items + 1;
		var stackLocation = Math.floor(_items/opt.stackSize);
		if (_storage[stackLocation] == null) {
			_storage[stackLocation] = [];
		}
		_storage[stackLocation].push(item);
		_items = newItemCount;
		return that;
	}
	this.pop = function()
	{
		var stackLocation = Math.floor((_items - 1)/opt.stackSize);
		_items--;
		var result = _storage[stackLocation].pop();
		if (_storage[stackLocation].length == 0) 
		{
			delete _storage[stackLocation];
		}
		return result;
	}
	this.getStorage = function()
	{
		return _storage;
	}

	this.popAt = function(index)
	{
		// Remove an item, and shift other arrays. Pretty simple with splice.
	}
}

var set = new SetOfStacks();


for (var i = 0; i < 15; i++)
{
	set.push(i);
}


console.log(set.getStorage());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());
console.log(set.pop());


console.log(set.getStorage());
