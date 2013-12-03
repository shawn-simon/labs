
/*Katie's Cell 415-359-7013

Sudoku Solution Validator

A sudoku board contains 81 cells arranged in a 9x9 grid. The game has 3 basic "units": rows, columns and boxes. Boxes are the 3x3 "minigrids". A valid solution consists of a grid in which all units contain the digits 1-9. Here's a picture of one:

http://www.thedailyaztec.com/content/uploads/Sudoku_5-10.jpg

You could represent a grid as a string, where each character represents a cell, starting in the top-left corner and moving row-by-row down to the bottom-right. For example, the string representing the grid in the above picture would be:

grid = "357964281468123579912587463631795842724318695895246137176459328583672914249831758"

Please write the following function:

def is_valid_solution(grid):

It should take a string (either str or unicode) and return a boolean: True if the string represents a valid sudoku solution (i.e., all rows, columns and boxes each contain 1-9), False if not.

Two things before starting:

Do not throw an exception. Return True if the grid is valid and False under all other circumstances. Assume nothing about grid. Obviously, it needs to be a string that's 81 characters long, but it might not be. It could, for instance, be an integer or the string "hello". Again, if so, just return False.

Do not worry about performance. Optimize for code clarity.

Test Cases:

751843926893625174642179583425316798176982345938754612364297851289531467517468239

751843927893625174642179583425316798176982345938754612364297851289531467517468239

571843926893625174642179583425316798176982345938754612364297851289531467517468239

851743926693825174142679583425316798976182345738954612364297851289531467517468239
*/

function is_valid_solution(grid) 
{
	var sudoku = new Sudoku();
	return sudoku.loadFromString(grid) && sudoku.isSolved();
}

function Sudoku() 
{
	var _data = [];
	this.loadFromString = function(input)
	{
		// Loads a soduku from a string representation, and stores it in an array.		
		// Ensure input is a string, has length 81, and only contains the numbers 1-9.
		if (typeof input != 'string' || !input.match(/^[1-9]{81}$/)) return false;
		// Split into arrays of 9 characters.
		_data = input.match(/.{9}/g);
		return true;
	}
	this.isSolved = function()
	{
		// For each number, we will keep a record of whether or not it has appeared in a column, box, or row. If there are no repeats, the solution should be valid,
		// because the input has validated to be 81 digits between 1 and 9. For each column, box, or row, we will need an array holding 9 numbers.
		var createArrayOf9 = function()
		{
			var result = [];
			for (var i = 0; i < 9; i++)
			{
				result.push([]);
			}
			return result;
		}

		var boxes = createArrayOf9(), 
			columns = createArrayOf9(), 
			rows = createArrayOf9(),
			result = true;	

		// Iterate through sudoku.
		_data.forEach(function(row, i) {
			row.split('').forEach(function(value, j) {
				// Validate row.
				if (rows[i][value] != null) 
				{
					result = false;
					return false;
				}
				rows[i][value] = true;
				// Validate column.
				if (columns[j][value] != null) {
					result = false
					return false;
				}
				columns[j][value] = true;
				// Validate box.
				var boxIndex = getBoxIndex(i,j);
				if (boxes[boxIndex][value] != null)
				{
					result = false;
					return false;
				}
				boxes[boxIndex][value] = true;
			})
		})
		return result;
	}
	var getBoxIndex = function(x, y)
	{
		// Returns the box index number for a sudoku from a numbers x,y position.
		return Math.floor((y / 3) + (3 * Math.floor(x / 3)));
	}
}

var tests = ['751843926893625174642179583425316798176982345938754612364297851289531467517468239',
	'751843927893625174642179583425316798176982345938754612364297851289531467517468239',
	'571843926893625174642179583425316798176982345938754612364297851289531467517468239',
	'851743926693825174142679583425316798976182345738954612364297851289531467517468239',
	'48517439266938251741426795834253167989761823457389546123642978512895314675174682391',
	'485174392669382517414267958342531679897618234573895461236429785128953146751746823a',
	'4',
	4,
	null,
	''];

tests.forEach(function(test) {
	console.log(test, is_valid_solution(test));
});
