"""
Data Processor - For "Clear & Direct" Demo
===========================================

Sample code for practicing the specificity checklist from the prompting demo.

This script demonstrates the "Live Demo" exercise:
- Start with vague prompt: "Write a function to process data"
- End with specific prompt that produces exactly this

Try asking an AI to improve this with increasingly specific prompts.
"""


def process_data(data):
    """
    Take a list of dictionaries containing 'name' and 'age' keys,
    filter out entries where age is under 18, and return a new list
    sorted by name alphabetically.

    Args:
        data: List of dicts with 'name' (str) and 'age' (int) keys

    Returns:
        List of dicts filtered to age >= 18, sorted by name
    """
    # Filter adults only
    adults = [person for person in data if person.get('age', 0) >= 18]

    # Sort alphabetically by name
    sorted_adults = sorted(adults, key=lambda x: x.get('name', '').lower())

    return sorted_adults


# Sample data for testing
SAMPLE_DATA = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 17},
    {"name": "Charlie", "age": 30},
    {"name": "Diana", "age": 15},
    {"name": "Eve", "age": 22},
    {"name": "Frank", "age": 19},
    {"name": "Grace", "age": 16},
    {"name": "Henry", "age": 45},
]


if __name__ == "__main__":
    print("Original data:")
    for person in SAMPLE_DATA:
        print(f"  {person['name']}: {person['age']} years old")

    result = process_data(SAMPLE_DATA)

    print("\nFiltered and sorted (age >= 18, alphabetical):")
    for person in result:
        print(f"  {person['name']}: {person['age']} years old")

    print(f"\nOriginal count: {len(SAMPLE_DATA)}")
    print(f"Filtered count: {len(result)}")
