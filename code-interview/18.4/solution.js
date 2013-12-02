
function getNumberOfTwos(maxNumber) 
{
	var result = 0;

	// brute force
	for (var i = 1; i <= maxNumber; i++)
	{
		var charArray = i.toString().split('');
		charArray.forEach(function(c) {
			if (c == "2") result++;
		})
	}

	// Modulus tricks...

	//1, 2, 3, 4, 5 ,6 ,7 ,8 9, 10...
	// occurs once for each 10

	return result;
}

var maxNumber = 25;

var result = getNumberOfTwos(maxNumber);

console.log(result);