# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///
"""
Generate Test Images
====================

Creates sample images for testing the resize-images.py script.

Usage:
    uv run generate_test_images.py

Output:
    5 test images with random sizes and colors
"""

from PIL import Image, ImageDraw, ImageFont
import random

# Seed for reproducibility
random.seed(42)

# Generate 5 test images
for i in range(5):
    # Random dimensions (larger than typical resize target)
    width = random.randint(1200, 2400)
    height = random.randint(900, 1800)

    # Random background color
    bg_color = (
        random.randint(50, 200),
        random.randint(50, 200),
        random.randint(50, 200)
    )

    # Create image
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    # Add some shapes for visual interest
    for _ in range(10):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = x1 + random.randint(50, 300)
        y2 = y1 + random.randint(50, 300)
        shape_color = (
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        )
        draw.ellipse([x1, y1, x2, y2], fill=shape_color)

    # Add text showing dimensions
    text = f"Test Image {i+1}\n{width}x{height}"
    text_color = (255, 255, 255)

    # Draw text with shadow for visibility
    draw.text((width//2 - 60 + 2, height//2 - 20 + 2), text, fill=(0, 0, 0))
    draw.text((width//2 - 60, height//2 - 20), text, fill=text_color)

    # Save image
    filename = f'test_image_{i+1}.jpg'
    img.save(filename, quality=95)
    print(f'Created {filename} ({width}x{height})')

print(f'\nDone! Created 5 test images.')
print('Now run: uv run ../scripts/resize-images.py .')
