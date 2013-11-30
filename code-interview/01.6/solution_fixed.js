function rotateImage(image, direction) {
	var image = transposeImage(image);
	if (direction == 'right')
	{
		image.forEach(function(row, i) {
			row = row.reverse();
		});
	}
	return image;
}

function transposeImage(image) {
	var newImage = [];
	image.forEach(function(row, i) {
		newImage.push([]);
	});
	image.forEach(function(row, i) {
		row.forEach(function(cell, j) {
			newImage[j][i]= cell;
		});
	});
	return newImage;
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
	test = rotateImage(test, 'right');
	console.log('-rotated-');
	printImage(test);

});