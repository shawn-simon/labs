function isRotation(string1, string2)
{
	if (string1.length == string2.length)
	{
		if ((string1 + string1).indexOf(string2) > 0)
		{
			return true;
		}
	}
	return false;
}

var strings = [
['waterbottle', 'ttlewaterbo'],['shawn','nshwa'], ['one', 'on']
]


strings.forEach(function(stringArray){
	console.log(stringArray);
	console.log(isRotation(stringArray[0], stringArray[1]))
})
