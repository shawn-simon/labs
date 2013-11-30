var lib = require('../lib');

function assignZeroes(matrix)
{
	var colsToZero = [];
	var rowsToZero = [];

	matrix.forEach(function(row, i){
		row.forEach(function(cell, j) {
			if (cell == 0)
			{
				colsToZero.push(j);
				rowsToZero.push(i);
			}
		})
	})

	colsToZero.forEach(function(val) {
		zeroCol(val, matrix);
	})

	rowsToZero.forEach(function(val) {
		zeroRow(val, matrix);
	})
}

function zeroCol(index, matrix) {
	var length = matrix.length;
	for (var j = 0; j < length; j++)
	{
		matrix[j][index] = 0;
	}
}

function zeroRow(index, matrix) {
	var width = matrix[0].length;
	for (var i = 0; i < width; i ++)
	{
		matrix[index][i] = 0;
	}
}
var matrix = lib.matricies[3];
lib.printMatrix(matrix);
assignZeroes(matrix);
lib.printMatrix(matrix);