function rotateImage(image) {
	for (var layer = 0; layer = image.length  / 2; layer++)
	{
		var first = layer;
		var last = image.length - layer - 1;
		for (var i = first; i < last; i ++)
		{
			var offset = i - first;
			var top = image[first][i];

			image[first][i] = image[last - offset][first];
			image[last-offset][first] = matrix[last][last - offset];
			image[last][last - offset] = matrix[i][last];
			matrix[i][last] = top;
		}
	}
	return image;
}

function printImage(image) {
	image.forEach(function(row, i) {
		console.log(row);
	})
}

tests = [[[1,2],[3,4]],
	[[1,2,3], [4,5,6],[7,8,9]]];

tests.forEach(function(test){
	console.log('-image-');
	printImage(test);
	test = rotateImage(test);
	console.log('-rotated-');
	printImage(test);

});