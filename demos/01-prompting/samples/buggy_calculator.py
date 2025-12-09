"""
Buggy Calculator - For Debugging Demo
======================================

This script has intentional bugs for practicing the "Clear & Direct"
prompting technique from the debugging example.

Bug: TypeError when adding user input to running total.
The prompt example shows how to clearly describe this bug to an AI.

Run this and try entering a number to see the error:
    python buggy_calculator.py

Expected output: Should add numbers to a running total
Actual output: Crashes with TypeError
"""

def calculate_running_total():
    """Calculate a running total from user inputs."""
    count = 0
    total = 0

    print("Running Total Calculator")
    print("Enter numbers to add. Type 'done' when finished.\n")

    while True:
        user_input = input(f"Enter number {count + 1} (or 'done'): ")

        if user_input.lower() == 'done':
            break

        count += 1
        # BUG: This line causes TypeError because user_input is a string!
        # The fix would be: total = total + int(user_input)
        # or: total = total + float(user_input)
        total = count + user_input  # <- Bug on this line

        print(f"Running total: {total}")

    print(f"\nFinal total: {total}")
    print(f"Numbers entered: {count}")


if __name__ == "__main__":
    calculate_running_total()
