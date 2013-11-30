from __future__ import print_function

def rotateImage(image, direction):
	image = transposeImage(image)
	return image

def transposeImage(image):
	newImage = ()
	for i, row in enumerate(image):
		for j, col in enumerate(row):
			if (newImage == None):
					'''newImage[j] = ()'''
	return image

def printImage(image):
	for row in image:
		for col in row:
			print(col, end="")
		print("\n")

tests = (((1,2),(3,4)),
	((1,2,3), (4,5,6),(7,8,9)))

for test in tests:
	print('-image-')
	printImage(test)
	test = rotateImage(test, 'right')
	print('-rotated-')
	printImage(test)