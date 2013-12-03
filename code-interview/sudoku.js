// Soduku Validator

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
