# /// script
# requires-python = ">=3.11"
# dependencies = ["pandas"]
# ///
"""
CSV Processor
=============

Filters CSV rows by status and outputs selected columns.
This is the complete script from Pattern 4: Automate Repeatable Steps.

Usage:
    uv run csv-processor.py input.csv
    uv run csv-processor.py input.csv --status active
    uv run csv-processor.py input.csv --status active --columns name,email

Output:
    filtered_output.csv with specified columns
"""

import sys
from pathlib import Path
import pandas as pd


def process_csv(
    input_file: str,
    status_filter: str = "active",
    columns: list[str] | None = None,
    output_file: str | None = None
):
    """Filter CSV by status and select specific columns."""
    input_path = Path(input_file)
    if not input_path.exists():
        print(f"Error: File not found: {input_file}")
        sys.exit(1)

    # Read the CSV
    print(f"Reading: {input_file}")
    df = pd.read_csv(input_file)
    print(f"Total rows: {len(df)}")

    # Show available columns
    print(f"Available columns: {', '.join(df.columns)}")

    # Filter by status if the column exists
    if "status" in df.columns:
        df_filtered = df[df["status"] == status_filter]
        print(f"After filtering (status='{status_filter}'): {len(df_filtered)} rows")
    else:
        print("Warning: No 'status' column found, skipping filter")
        df_filtered = df

    # Select specific columns if provided
    if columns:
        valid_columns = [c for c in columns if c in df_filtered.columns]
        invalid_columns = [c for c in columns if c not in df_filtered.columns]

        if invalid_columns:
            print(f"Warning: Columns not found: {', '.join(invalid_columns)}")

        if valid_columns:
            df_filtered = df_filtered[valid_columns]
            print(f"Selected columns: {', '.join(valid_columns)}")
        else:
            print("Error: None of the specified columns exist")
            sys.exit(1)

    # Determine output filename
    if output_file is None:
        output_file = input_path.stem + "_filtered.csv"

    # Save result
    df_filtered.to_csv(output_file, index=False)
    print(f"\nOutput written to: {output_file}")
    print(f"Final row count: {len(df_filtered)}")

    # Show preview
    print("\nPreview (first 5 rows):")
    print(df_filtered.head().to_string())


def show_usage():
    print("Usage: uv run csv-processor.py <input.csv> [options]")
    print("")
    print("Options:")
    print("  --status VALUE     Filter rows where status column = VALUE (default: 'active')")
    print("  --columns COL1,COL2  Comma-separated list of columns to include")
    print("  --output FILE      Output filename (default: input_filtered.csv)")
    print("")
    print("Examples:")
    print("  uv run csv-processor.py users.csv")
    print("  uv run csv-processor.py users.csv --status inactive")
    print("  uv run csv-processor.py users.csv --status active --columns name,email")
    print("  uv run csv-processor.py users.csv --columns id,name,department --output team.csv")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] in ["-h", "--help"]:
        show_usage()
        sys.exit(0)

    input_file = sys.argv[1]
    status_filter = "active"
    columns = None
    output_file = None

    # Parse arguments
    args = sys.argv[2:]
    i = 0
    while i < len(args):
        if args[i] == "--status" and i + 1 < len(args):
            status_filter = args[i + 1]
            i += 2
        elif args[i] == "--columns" and i + 1 < len(args):
            columns = [c.strip() for c in args[i + 1].split(",")]
            i += 2
        elif args[i] == "--output" and i + 1 < len(args):
            output_file = args[i + 1]
            i += 2
        else:
            i += 1

    process_csv(input_file, status_filter, columns, output_file)
