# /// script
# requires-python = ">=3.11"
# dependencies = ["faker"]
# ///
"""
Generate sample employee data for vibe checking practice.

This script generates the employees.csv file used in Practice Scenario 1,
where AI returns only 312 records instead of 500.

Usage:
    uv run generate_employees.py

Output:
    employees.csv with 500 records
"""

import csv
import random
from faker import Faker

fake = Faker()
Faker.seed(42)  # Reproducible results
random.seed(42)

DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Support", "Legal", "Operations"]
TITLES = {
    "Engineering": ["Software Engineer", "Senior Developer", "Tech Lead", "DevOps Engineer", "QA Engineer"],
    "Marketing": ["Marketing Manager", "Content Specialist", "SEO Analyst", "Brand Manager", "Social Media Lead"],
    "Sales": ["Sales Rep", "Account Executive", "Sales Manager", "Business Development", "Sales Engineer"],
    "HR": ["HR Specialist", "Recruiter", "HR Manager", "Benefits Coordinator", "Training Specialist"],
    "Finance": ["Accountant", "Financial Analyst", "Controller", "Payroll Specialist", "Auditor"],
    "Support": ["Support Engineer", "Customer Success", "Help Desk", "Support Manager", "Technical Writer"],
    "Legal": ["Legal Counsel", "Paralegal", "Compliance Officer", "Contract Manager", "IP Specialist"],
    "Operations": ["Operations Manager", "Project Manager", "Facilities", "Procurement", "Admin Assistant"],
}

def generate_employees(count=500):
    employees = []
    for i in range(1, count + 1):
        dept = random.choice(DEPARTMENTS)
        employee = {
            "id": i,
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.company_email(),
            "department": dept,
            "title": random.choice(TITLES[dept]),
            "salary": random.randint(45000, 150000),
            "hire_date": fake.date_between(start_date="-5y", end_date="today").isoformat(),
            "phone": fake.phone_number(),
            "address": fake.address().replace("\n", ", "),
        }
        employees.append(employee)
    return employees


if __name__ == "__main__":
    employees = generate_employees(500)

    with open("employees.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=employees[0].keys())
        writer.writeheader()
        writer.writerows(employees)

    print(f"Generated employees.csv with {len(employees)} records")
    print("\nSample record:")
    for key, value in employees[0].items():
        print(f"  {key}: {value}")
