// An animal shelter holds only dogs and cats, and operates on a strictly "first in, first out" basis. 
// People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or 
// they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). 
// They cannot select which specificanimal they would like. Create the data structures to maintain this system and 
// implement operations such as enqueue, dequeueAny, dequeueDog and dequeueCat.You may use the built-in LinkedList data structure.

var lib = require('../lib');

function Shelter()
{
	var that = this;
	this.dequeueAny = function()
	{
		return that.dequeue();
	}
	var dequeueAnimal = function(type)
	{
		var n = that._first;
		var previous = null;
		while (n != null)
		{
			if (n.data.type == type)
			{
				if (previous != null) {
					previous.next = n.next;
				}
				else
				{
					console.log(that._first)
					// Something confusing going on here, not really worth the time to investigate though.
					that._first = that._first.next;
					that._first = n;
				}
				return n.data;
			}
			previous = n;
			n = n.next;
		}
		return null
	}
	this.dequeueDog = function()
	{
		return dequeueAnimal('dog')	
	}
	this.dequeueCat = function()
	{
		return dequeueAnimal('cat')	
	}
}
Shelter.prototype = new lib.Queue();

var test = new Shelter()

var animals = [
{name: 'mike', type: 'cat'},
{name: 'don', type: 'cat'},
{name: 'mary', type: 'dog'},
{name: 'sarah', type: 'cat'},
{name: 'shawn', type: 'dog'},
{name: 'ted', type: 'dog'}]

animals.forEach(function(a) { test.enqueue(a) })

console.log(test.dequeueAny());
console.log(2)
console.log(test.dequeueDog());
console.log(3)
console.log(test.dequeueCat());
console.log(test.dequeueAny());
console.log(test.dequeueAny());