# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///
"""
Batch Image Resizer
===================

Resizes all images in a folder to a maximum width while maintaining aspect ratio.
This is the complete script from Pattern 4: Automate Repeatable Steps.

Usage:
    uv run resize-images.py ./photos
    uv run resize-images.py ./photos 1200
    uv run resize-images.py ./photos 800 --quality 85

Output:
    Creates 'resized/' subfolder with processed images
"""

import sys
from pathlib import Path
from PIL import Image


def resize_images(folder: str, max_width: int = 800, quality: int = 90):
    """Resize all images in folder to max_width, maintaining aspect ratio."""
    source = Path(folder)
    if not source.exists():
        print(f"Error: Folder not found: {folder}")
        sys.exit(1)

    output = source / "resized"
    output.mkdir(exist_ok=True)

    # Find all common image formats
    extensions = ["*.jpg", "*.jpeg", "*.png", "*.webp", "*.gif"]
    images = []
    for ext in extensions:
        images.extend(source.glob(ext))
        images.extend(source.glob(ext.upper()))

    if not images:
        print(f"No images found in {folder}")
        print(f"Supported formats: {', '.join(extensions)}")
        sys.exit(1)

    print(f"Found {len(images)} images in {folder}")
    print(f"Output: {output}")
    print(f"Max width: {max_width}px | Quality: {quality}%\n")

    resized_count = 0
    skipped_count = 0

    for img_path in images:
        try:
            print(f"Processing: {img_path.name}...", end=" ")
            img = Image.open(img_path)
            original_size = f"{img.width}x{img.height}"

            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
                resized_count += 1
                print(f"{original_size} -> {img.width}x{img.height}")
            else:
                skipped_count += 1
                print(f"{original_size} (skipped, already smaller)")

            # Handle different formats
            output_path = output / img_path.name
            if img_path.suffix.lower() in [".jpg", ".jpeg"]:
                img.save(output_path, quality=quality, optimize=True)
            elif img_path.suffix.lower() == ".png":
                img.save(output_path, optimize=True)
            else:
                img.save(output_path)

        except Exception as e:
            print(f"Error: {e}")
            continue

    print(f"\nDone!")
    print(f"  Resized: {resized_count} images")
    print(f"  Skipped: {skipped_count} images (already within max width)")
    print(f"  Output folder: {output}")


def show_usage():
    print("Usage: uv run resize-images.py <folder> [max_width] [--quality N]")
    print("")
    print("Arguments:")
    print("  folder      Path to folder containing images")
    print("  max_width   Maximum width in pixels (default: 800)")
    print("  --quality   JPEG quality 1-100 (default: 90)")
    print("")
    print("Examples:")
    print("  uv run resize-images.py ./photos")
    print("  uv run resize-images.py ./photos 1200")
    print("  uv run resize-images.py ./photos 800 --quality 85")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ["-h", "--help"]:
        show_usage()
        sys.exit(0)

    folder = sys.argv[1]
    max_width = 800
    quality = 90

    # Parse remaining arguments
    args = sys.argv[2:]
    i = 0
    while i < len(args):
        if args[i] == "--quality" and i + 1 < len(args):
            quality = int(args[i + 1])
            i += 2
        elif args[i].isdigit():
            max_width = int(args[i])
            i += 1
        else:
            i += 1

    resize_images(folder, max_width, quality)
