import os
import requests
from typing import List, Dict, Any, Optional
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO


NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"


def fetch_apod_metadata(api_key: str, count: int = 6) -> Optional[List[Dict[str, Any]]]:
    """
    Fetch random APOD image metadata.

    :param api_key: NASA API key (string).
    :param count: Number of images to request.
    :return: List of metadata dicts, or None on failure.
    """
    params = {"api_key": api_key, "count": count}

    try:
        resp = requests.get(NASA_APOD_URL, params=params, timeout=10)
        resp.raise_for_status()
        items = resp.json()

        # Filter only image entries
        return [item for item in items if item.get("media_type") == "image"]

    except requests.RequestException as e:
        print(f"[Error] Failed to fetch metadata: {e}")
        return None


def load_image_from_url(url: str) -> Optional[Image.Image]:
    """
    Retrieve an image from a URL and return a PIL Image object.
    """
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return Image.open(BytesIO(resp.content))
    except Exception as e:
        print(f"[Error] Could not load image from {url}: {e}")
        return None


def show_image_grid(metadata: List[Dict[str, Any]]) -> None:
    """
    Displays a grid of images using matplotlib.
    Each image is numbered for user selection.
    """
    n = len(metadata)
    cols = 3
    rows = (n + cols - 1) // cols

    plt.figure(figsize=(12, 8))

    for i, item in enumerate(metadata):
        img_url = item.get("url")
        img = load_image_from_url(img_url)

        plt.subplot(rows, cols, i + 1)
        if img is not None:
            plt.imshow(img)
            plt.axis("off")
            plt.title(f"{i}: {item.get('title', 'Untitled')}", fontsize=8)
        else:
            plt.text(0.5, 0.5, "Failed to load", ha="center", fontsize=10)

    plt.tight_layout()
    plt.show()


def download_image(url: str, save_path: str) -> bool:
    """
    Download an image to local disk.
    """
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()

        with open(save_path, "wb") as f:
            f.write(resp.content)

        return True

    except Exception as e:
        print(f"[Error] Failed to download image {url}: {e}")
        return False


def download_selected_images(metadata: List[Dict[str, Any]], indices: List[int], out_dir: str = "nasa_images") -> None:
    """
    Download only the selected images.
    """
    os.makedirs(out_dir, exist_ok=True)

    for idx in indices:
        if idx < 0 or idx >= len(metadata):
            print(f"[Warning] Index {idx} out of range. Skipping.")
            continue

        item = metadata[idx]
        img_url = item.get("hdurl") or item.get("url")
        title = item.get("title", f"image_{idx}").replace(" ", "_")
        filename = f"{title}.jpg"

        save_path = os.path.join(out_dir, filename)
        print(f"Downloading {img_url} → {save_path}")

        if download_image(img_url, save_path):
            print("✔ Download complete")
        else:
            print("✘ Download failed")


def main() -> None:
    API_KEY = "DEMO_KEY"  # Replace with your NASA API key if available
    COUNT = 9

    metadata = fetch_apod_metadata(API_KEY, COUNT)
    if not metadata:
        print("No images retrieved.")
        return

    show_image_grid(metadata)

    try:
        selected = input("Enter comma-separated indices of images to download: ")
        indices = [int(x.strip()) for x in selected.split(",") if x.strip().isdigit()]
    except Exception:
        print("[Error] Invalid input.")
        return

    download_selected_images(metadata, indices)


if __name__ == "__main__":
    main()
