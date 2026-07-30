# Test Copilot Project 🚀

A simple Python project containing utility scripts for basic operations. This repository includes a Hello World script and a number sorting utility.

## Description

This project contains two Python scripts:
- **hello.py**: A simple script that prints "Hello" to the console
- **sort_descending.py**: A utility script that sorts a list of numbers in descending order

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/pallaviraiturkar0/test-copilot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd test-copilot
   ```

3. Ensure you have Python 3 installed:
   ```bash
   python3 --version
   ```

## Usage

### Running the Hello World script

```bash
python3 hello.py
```

**Output:**
```
Hello
```

### Running the Sort Numbers script

```bash
python3 sort_descending.py
```

When prompted, enter numbers separated by spaces:
```
Enter numbers separated by spaces: 5 2 8 1 9
Numbers in descending order: [9, 8, 5, 2, 1]
```

**Example usage in your own code:**

```python
from sort_descending import sort_numbers_descending

numbers = [5, 2, 8, 1, 9]
sorted_numbers = sort_numbers_descending(numbers)
print(sorted_numbers)  # Output: [9, 8, 5, 2, 1]
```

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Create a pull request.