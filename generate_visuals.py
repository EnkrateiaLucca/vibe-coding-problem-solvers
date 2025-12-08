# /// script
# requires-python = ">=3.11"
# dependencies = ["google-genai"]
# ///
"""
Generate presentation visuals from visual-prompts.md using Gemini 3 Pro Image API.

Usage:
    uv run generate_visuals.py

Requires GOOGLE_API_KEY environment variable to be set.
"""

import os
import re
import time
from pathlib import Path

from google import genai
from google.genai import types


def parse_visual_prompts(md_path: Path) -> list[dict]:
    """Parse the visual-prompts.md file and extract image generation prompts."""
    content = md_path.read_text()

    prompts = []
    current_slide = None

    # Split by slide headers (## Slide X: or ### Slide X:)
    slide_pattern = r'^##+ (?:Slide \d+[^:]*:|Appendix [A-Z]:[^\n]*|Slides \d+-\d+[^:]*:)'

    lines = content.split('\n')
    current_section = []
    slide_title = None

    for line in lines:
        if re.match(slide_pattern, line):
            # Process previous section
            if slide_title and current_section:
                section_text = '\n'.join(current_section)
                prompt_data = extract_prompt_from_section(slide_title, section_text)
                if prompt_data:
                    prompts.append(prompt_data)

            slide_title = line.strip('# ').strip()
            current_section = []
        else:
            current_section.append(line)

    # Don't forget last section
    if slide_title and current_section:
        section_text = '\n'.join(current_section)
        prompt_data = extract_prompt_from_section(slide_title, section_text)
        if prompt_data:
            prompts.append(prompt_data)

    return prompts


def extract_prompt_from_section(title: str, section: str) -> dict | None:
    """Extract image prompt from a section if it's an image generation type."""

    # Skip if it's a "Keep as-is" or "Screenshot" type
    if '**Type:** Keep as-is' in section:
        return None
    if '**Type:** Screenshot' in section:
        return None

    # Look for image prompts in code blocks
    prompt_match = re.search(r'```\n(.*?)\n```', section, re.DOTALL)
    if not prompt_match:
        return None

    prompt_text = prompt_match.group(1).strip()

    # Skip if it's code (Python, etc.)
    if prompt_text.startswith('from ') or prompt_text.startswith('import ') or prompt_text.startswith('#'):
        return None

    # Generate filename from title
    filename = sanitize_filename(title)

    return {
        'title': title,
        'prompt': prompt_text,
        'filename': filename
    }


def sanitize_filename(title: str) -> str:
    """Convert slide title to valid filename."""
    # Extract slide number and clean title
    match = re.match(r'Slide (\d+)[:\s-]*(.*)', title)
    if match:
        num = match.group(1).zfill(2)
        name = match.group(2).strip()
    else:
        num = "00"
        name = title

    # Clean the name
    name = re.sub(r'[^\w\s-]', '', name)
    name = re.sub(r'\s+', '-', name)
    name = name.lower().strip('-')[:50]

    return f"slide-{num}-{name}.png"


# Brand-aligned style modifiers (Automata Learning Lab guidelines)
BRAND_STYLE = """
Style: monochromatic illustration using only black (#000), white (#FFF),
and grays (#333, #666, #999, #F5F5F5, #E8E8E8). Clean educational diagram
aesthetic, technical illustration style. Black 2px borders on all elements.
White or near-white (#F9F9F9) background. No gradients, no 3D effects,
no decorative elements, no photorealistic imagery. High contrast, print-ready.
Sans-serif typography (Helvetica/Arial style). Flat design with minimal
shadows. Professional, clear, focused mood. 16:9 aspect ratio.

DO NOT include: colorful gradients, rainbow palettes, decorative swooshes,
generic business imagery, lens flares, organic flowing lines, cartoon
characters, emoji-style icons, or soft rounded aesthetics.
"""


def generate_image(client: genai.Client, prompt: str, output_path: Path) -> bool:
    """Generate an image using Gemini 3 Pro and save it."""

    # Add brand-aligned style modifiers
    full_prompt = f"{prompt}\n\n{BRAND_STYLE}"

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                image_config=types.ImageConfig(
                    aspect_ratio="16:9",
                )
            )
        )

        # Extract image from response
        image_parts = [part for part in response.candidates[0].content.parts if part.inline_data]

        if image_parts:
            image = image_parts[0].as_image()
            image.save(str(output_path))
            return True
        else:
            print(f"  No image generated for: {output_path.name}")
            return False

    except Exception as e:
        print(f"  Error generating {output_path.name}: {e}")
        return False


def main():
    # Check for API key
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY environment variable not set")
        print("Set it with: export GOOGLE_API_KEY='your-api-key'")
        return

    # Initialize client
    client = genai.Client(api_key=api_key)

    # Paths
    script_dir = Path(__file__).parent
    prompts_file = script_dir / "presentation" / "visual-prompts.md"
    output_dir = script_dir / "assets" / "screenshots"

    # Ensure output directory exists
    output_dir.mkdir(parents=True, exist_ok=True)

    # Parse prompts
    print(f"Reading prompts from: {prompts_file}")
    prompts = parse_visual_prompts(prompts_file)

    print(f"Found {len(prompts)} image prompts to generate\n")

    # Generate each image
    successful = 0
    failed = 0

    for i, prompt_data in enumerate(prompts, 1):
        output_path = output_dir / prompt_data['filename']

        # Skip if already exists
        if output_path.exists():
            print(f"[{i}/{len(prompts)}] Skipping (exists): {prompt_data['filename']}")
            successful += 1
            continue

        print(f"[{i}/{len(prompts)}] Generating: {prompt_data['filename']}")
        print(f"  Title: {prompt_data['title']}")

        if generate_image(client, prompt_data['prompt'], output_path):
            print(f"  Saved to: {output_path}")
            successful += 1
        else:
            failed += 1

        # Rate limiting - be gentle with the API
        if i < len(prompts):
            time.sleep(2)

    print(f"\n{'='*50}")
    print(f"Complete! Generated {successful} images, {failed} failed")
    print(f"Images saved to: {output_dir}")


if __name__ == "__main__":
    main()
