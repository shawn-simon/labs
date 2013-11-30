def isPermutation(input1, input2):
	if len(input1) != len(input2):
		return False
	input1 = sorted(input1)
	input2 = sorted(input2)
	return input1 == input2 

tests = (('high', 'hihg'), ('one', 'two'))
for test in tests:
	print(test, isPermutation(*test))