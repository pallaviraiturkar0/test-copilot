# Repository Overview

A high-level tour of the `test-copilot` repository: what lives here, how the pieces
fit together, and where to look first.

## Purpose

`test-copilot` is a small sandbox repository used to test and explore GitHub Copilot
features. It holds a handful of standalone Python scripts, some documentation, and a
few GitHub-specific configuration files. It is intentionally simple — there is no
build system, package manifest, or test suite.

## Layout

```
test-copilot/
├── hello.py                  # Prints "Hello"
├── intro.py                  # Prints "Hello, World!"
├── sort_descending.py        # Sorts user-supplied numbers in descending order
├── foo.py                    # Assorted helper functions (random strings, Fibonacci, palindromes)
├── README.md                 # Project title, setup and contribution guidelines
├── architecture.md           # Architecture notes and module descriptions
├── repo-overview.md          # This file
├── a.md, b.md, c.md          # Placeholder documents created for testing
├── .gitattributes            # Marks generated workflow lock files
├── .github/
│   ├── agents/
│   │   └── planning-agent.md # Custom Copilot agent for planning and PRDs
│   └── workflows/
│       ├── daily-repo-status.md      # Agentic daily status-report workflow
│       └── daily-repo-status.lock.yml# Generated lock file for the workflow
└── docs/
    └── SETUP.md              # Setup notes for a Node.js/MongoDB "Social App"
```

## Python scripts

All scripts are standalone, use only the standard library, and can be run directly
with `python <file>`.

| File | What it does |
| --- | --- |
| `hello.py` | Prints `Hello`. A one-line sanity check. |
| `intro.py` | Prints `Hello, World!`. |
| `sort_descending.py` | Defines `sort_numbers_descending(numbers)`, returning a new list sorted with `sorted(..., reverse=True)`. Run directly, it reads space-separated numbers from stdin and prints the sorted result. |
| `foo.py` | Defines `generate_random_string(length=10)`, `fibonacci(n)` and `is_palindrome(s)`. Run directly, it demonstrates each function. |

## Documentation

- **`README.md`** — project title, clone/setup steps, and contribution workflow.
- **`architecture.md`** — repository structure, module notes, and design principles
  (simplicity, no external dependencies, single responsibility per script).
- **`docs/SETUP.md`** — setup instructions for a Node.js + MongoDB "Social App".
  Note that this describes a separate application and does not match the Python code
  in this repository.
- **`a.md`, `b.md`, `c.md`** — placeholder files containing filler text; safe to ignore.

## GitHub configuration

- **`.github/agents/planning-agent.md`** — a custom Copilot agent that turns
  high-level feature ideas into structured, actionable plans and PRDs.
- **`.github/workflows/daily-repo-status.md`** — an agentic workflow that runs daily
  (and on demand) to gather recent repository activity and open a GitHub issue
  summarizing status, highlights, and recommended next steps. Issues are prefixed
  with `[repo-status] ` and labeled `report` / `daily-status`.
- **`.github/workflows/daily-repo-status.lock.yml`** — the generated lock file for the
  workflow above. `.gitattributes` marks `*.lock.yml` as `linguist-generated` and uses
  the `ours` merge strategy, so it should not be edited by hand.

## Getting started

```bash
git clone https://github.com/pallaviraiturkar0/test-copilot.git
cd test-copilot
python hello.py
python foo.py
python sort_descending.py
```

There are no dependencies to install for the Python scripts. The `npm install` step
mentioned in `README.md` and `docs/SETUP.md` applies to the Node.js application those
documents describe, not to the code checked in here.

## Conventions

- Python 3, standard library only.
- One clearly defined responsibility per script.
- Scripts guard their demo code with `if __name__ == "__main__":`.
- Contributions go through a branch and pull request, as described in `README.md`.
