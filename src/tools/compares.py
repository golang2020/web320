# Compare 2 images for integeration test 
# Usage: python comapres.py base.jpg snapshot.jpg
from PIL import Image, ImageChops
import sys
if (len(sys.argv)<3):
    print('Must contain 2 image file names in argument')
else:
    imageBase = Image.open(sys.argv[1])
    imageInput = Image.open(sys.argv[2])

    diff = ImageChops.difference(imageBase, imageInput)

    if (diff.getbbox()):
        diff.show()
    else:
        print('Both Images are same')

