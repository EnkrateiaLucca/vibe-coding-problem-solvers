# Sample Images for Image Resize Demo

This folder is for testing the `resize-images.py` script.

## Quick Test

Add some images to this folder, then run:

```bash
cd demos/05-patterns/scripts
uv run resize-images.py ../sample-data/sample-images
```

Output will appear in `sample-images/resized/`

## Getting Sample Images

You can:

1. **Use your own photos** - Copy a few JPG/PNG files here

2. **Download sample images** - Get free stock photos from:
   - https://unsplash.com
   - https://picsum.photos (random images API)

3. **Generate test images** - Run this Python snippet:

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///
from PIL import Image
import random

for i in range(5):
    # Create random colored image
    width = random.randint(1000, 2000)
    height = random.randint(800, 1500)
    color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    img = Image.new('RGB', (width, height), color)
    img.save(f'test_image_{i+1}.jpg', quality=90)
    print(f'Created test_image_{i+1}.jpg ({width}x{height})')
```

Save as `generate_test_images.py` and run with `uv run generate_test_images.py`

## Expected Output

After running the resize script:

```
Found 5 images in ../sample-data/sample-images
Output: ../sample-data/sample-images/resized
Max width: 800px | Quality: 90%

Processing: test_image_1.jpg... 1500x1200 -> 800x640
Processing: test_image_2.jpg... 1800x1000 -> 800x444
...

Done!
  Resized: 5 images
  Skipped: 0 images (already within max width)
```
