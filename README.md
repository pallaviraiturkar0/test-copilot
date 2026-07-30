# test-copilot 🚀

A simple Python project repository containing utility scripts for learning and testing purposes.

## About This Project

This repository contains Python scripts demonstrating basic functionality:
- **hello.py**: A simple "Hello World" script
- **sort_descending.py**: A utility to sort numbers in descending order

## Prerequisites

- Python 3.x (tested with Python 3.12+)
- No external dependencies required - uses only Python standard library

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/pallaviraiturkar0/test-copilot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd test-copilot
   ```

3. No additional installation required! The scripts use only Python's standard library.

## Usage Examples

### Running hello.py

This script simply prints "Hello" to the console:

```bash
python3 hello.py
```

**Output:**
```
Hello
```

### Running sort_descending.py

This script prompts you to enter numbers and then displays them sorted in descending order:

```bash
python3 sort_descending.py
```

**Example interaction:**
```
Enter numbers separated by spaces: 5 2 8 1 9 3
Numbers in descending order: [9, 8, 5, 3, 2, 1]
```

You can also use it programmatically by importing the function:

```python
from sort_descending import sort_numbers_descending

numbers = [42, 17, 8, 99, 3]
sorted_nums = sort_numbers_descending(numbers)
print(sorted_nums)  # Output: [99, 42, 17, 8, 3]
```

## Contribution Guidelines

We welcome contributions! Please follow these steps:

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

## License

This project is available for educational and testing purposes.