function allUniqueChars(input)
{
	var foundChars = {};
	var allUnique = true;
	input.split('').forEach(function(c) {
		if (foundChars[c])
		{
			allUnique = false
			return false;
		}
		else
		{
			foundChars[c] = true;
		}

	})		
	return allUnique;
}

function allUniqueChars2(input)
{
	var characterArray = input.split(''); // Consider using char at.
	var allUnique = true;
	characterArray.forEach(function(c) {
		var count = 0;
		characterArray.forEach(function(compareChar) {
			if (compareChar == c)
			{
				count++;
			}
		})
		if (count > 1)
		{
			allUnique = false;
			return false;
		}
	})
	return allUnique;
}

console.log(allUniqueChars('test'));
console.log(allUniqueChars('hi'));
console.log(allUniqueChars(''));

console.log(allUniqueChars2('test'));
console.log(allUniqueChars2('hi'));
console.log(allUniqueChars2(''));