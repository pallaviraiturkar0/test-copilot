# Architecture

## Overview

This repository is a Python-based project used for testing and exploring GitHub Copilot features. It is intentionally simple, serving as a sandbox environment.

## Repository Structure

```
test-copilot/
├── hello.py              # Simple Hello World script
├── sort_descending.py    # Utility for sorting numbers in descending order
├── README.md             # Project overview and documentation
├── architecture.md       # This file — describes the project architecture
├── .gitattributes        # Git configuration for line endings and file handling
├── .github/              # GitHub-specific configuration (workflows, templates, etc.)
└── docs/                 # Additional documentation
```

## Modules

### `hello.py`
A minimal script that prints `Hello` to standard output. Used as a basic sanity-check or introductory example.

### `sort_descending.py`
Contains the `sort_numbers_descending(numbers)` function, which takes a list of numbers and returns them sorted in descending order using Python's built-in `sorted()` with `reverse=True`.

When run directly, it accepts user input (space-separated numbers) from the terminal and prints the sorted result.

**Key function:**
```python
def sort_numbers_descending(numbers: list) -> list
```

## Language & Dependencies

- **Language:** Python 3
- **Dependencies:** None (standard library only)

## Design Principles

- **Simplicity:** Scripts are kept minimal to focus on Copilot feature exploration.
- **No external dependencies:** All code relies solely on Python's standard library.
- **Single responsibility:** Each script focuses on one clearly defined task.
