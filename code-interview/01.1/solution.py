def allUniqueChars(input):
	charDict = {}
	for char in input:
		if char in charDict: 
			return False
		else:
			charDict[char] = True
	return True

def allUniqueCharsAlt(input):
	input = sorted(input)
	for i, char in enumerate(input):
		if (i + 1 == len(input)):
			continue
		if (input[i + 1] == char):
			return False
	return True

testStrings = ['test', 'what', 'hell', 'heel']
for testString in testStrings:
	print(testString, allUniqueChars(testString), allUniqueCharsAlt(testString))