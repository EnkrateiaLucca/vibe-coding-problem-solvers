# Verification Techniques

Quick methods to validate AI output without reading every line.

## Technique 1: The Spot Check

Check random samples, not everything.

```python
# For a list of 1000 processed items:

# Check first item
print(output[0])

# Check last item
print(output[-1])

# Check random middle item
print(output[500])

# Check one edge case you know
print(output[find_index_of("edge_case")])
```

**When to use:** Data transformations, batch processing

---

## Technique 2: The Count Validation

Verify quantities match.

```python
# Input → Output quantity check
print(f"Input: {len(raw_data)}")
print(f"Output: {len(processed_data)}")

# If they should match, they should match
assert len(raw_data) == len(processed_data), "Dropped items!"

# If filtered, check the filter logic
filtered = [x for x in raw_data if x['active']]
print(f"Expected filtered: {len(filtered)}")
print(f"Actual filtered: {len(processed_data)}")
```

**When to use:** Parsing, filtering, transformations

---

## Technique 3: The Boundary Test

Test edges and extremes.

```python
# For a function that processes numbers:

# Zero
result = process(0)
print(f"Zero: {result}")

# Negative
result = process(-1)
print(f"Negative: {result}")

# Large number
result = process(999999)
print(f"Large: {result}")

# Empty input
result = process([])
print(f"Empty: {result}")

# None/null
result = process(None)
print(f"None: {result}")
```

**When to use:** Functions, validators, calculators

---

## Technique 4: The Smoke Test

Does it run at all?

```bash
# For scripts
python script.py && echo "SUCCESS" || echo "FAILED"

# For web servers
curl http://localhost:3000/health

# For CLI tools
./tool --help
./tool test-input.txt
```

**When to use:** Any generated code, first check

---

## Technique 5: The Format Validation

Check structure, not content.

```python
import json

# JSON validation
try:
    data = json.loads(output)
    print("Valid JSON")
except:
    print("Invalid JSON!")

# Schema validation (for important structures)
from jsonschema import validate

schema = {
    "type": "array",
    "items": {
        "type": "object",
        "required": ["id", "name"],
        "properties": {
            "id": {"type": "integer"},
            "name": {"type": "string"}
        }
    }
}

validate(data, schema)  # Raises if invalid
```

**When to use:** Data transformations, API responses

---

## Technique 6: The Diff Check

Compare before/after for refactors.

```bash
# For code refactoring
git diff --stat  # See what changed

# For data migration
diff original.json migrated.json

# For functionality preservation
# Run original
python original.py > original_output.txt

# Run refactored
python refactored.py > refactored_output.txt

# Compare
diff original_output.txt refactored_output.txt
```

**When to use:** Refactoring, migrations, updates

---

## Technique 7: The Console Log Test

Add strategic prints to trace execution.

```python
def process_user(user):
    print(f"Processing: {user['id']}")  # Entry point

    validated = validate(user)
    print(f"Validated: {validated}")  # After validation

    result = save(validated)
    print(f"Saved: {result}")  # After save

    return result

# Run and watch the flow
process_user(test_user)
```

**When to use:** Debugging, understanding flow

---

## Technique 8: The Type Check

Verify types are what you expect.

```python
# Check types of output
print(type(result))        # Should be dict, list, etc.
print(type(result['id']))  # Should be int, not str

# For Python, use type hints and mypy
def process(data: list[dict]) -> dict:
    ...

# Run: mypy script.py
```

**When to use:** Data processing, type-sensitive operations

---

## Quick Verification Decision Tree

```
What are you checking?
│
├── Data transformation → Count + Spot Check
├── New function → Boundary Test + Smoke Test
├── Refactored code → Diff Check
├── API response → Format Validation
├── Complex logic → Console Log
├── Type-sensitive → Type Check
└── Anything else → Smoke Test first
```

---

## The 60-Second Verification Routine

1. **Run it** (5 sec) - Does it execute?
2. **Check counts** (10 sec) - Right amount of output?
3. **Spot check** (15 sec) - First, last, random look right?
4. **Boundary test** (30 sec) - Edge cases work?

If all pass, you're good for vibe coding purposes.
