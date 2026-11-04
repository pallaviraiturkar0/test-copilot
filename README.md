# test-copilot

A sandbox for trying GitHub Copilot features with small Python and JavaScript
examples, sample documents, a custom agent, and a repository status workflow.
This is not a complete application or service.

## What's in the repository

| Path | Purpose |
| --- | --- |
| `hello.py`, `intro.py` | Print greeting messages. |
| `sort_descending.py` | Sort space-separated integers entered in the terminal. |
| `foo.py` | Demonstrate random strings, Fibonacci sequences, and palindrome checks. |
| `sum.cjs`, `sum.test.cjs` | A JavaScript addition function and a test using Node's built-in test runner. |
| `package.json`, `.node-version` | Configure the test command and Node.js 22 requirement. |
| `.github/agents/planning-agent.md` | A custom Copilot agent for project plans and PRDs. |
| `.github/workflows/daily-repo-status.md` | Define a daily repository report that creates a GitHub issue. |
| `.github/workflows/daily-repo-status.lock.yml` | The generated GitHub Actions workflow for the report. |
| `a.md`, `b.md`, `c.md` | Dummy documents for experiments. |
| `architecture.md`, `docs/SETUP.md` | Earlier documentation; see the caveat below. |

## Getting started

Clone the repository:

```bash
git clone https://github.com/pallaviraiturkar0/test-copilot.git
cd test-copilot
```

The examples use standard libraries only. No third-party packages, database,
environment variables, or application server are required.

### Python examples

Use Python 3.9 or later to run all examples, including the type annotations in
`foo.py`. Run each script independently:

```bash
python3 hello.py
python3 intro.py
python3 foo.py
python3 sort_descending.py
```

For the sorting example, enter integers separated by spaces, such as `3 1 4 2`.
It prints them in descending order.

### JavaScript test

Use Node.js 22, as specified in `.node-version` and `package.json`, with npm:

```bash
npm test
```

This runs `node --test` to check the addition function. No `npm install` step is
needed because the project declares no dependencies.

## Documentation caveat

`architecture.md` describes only part of the current repository.
`docs/SETUP.md` describes a social app that is not implemented here. Its MongoDB,
JWT, Socket.IO, and `npm start` instructions do not apply to this sandbox.
Use the commands in this README for the current examples.

## Contributing

Create a branch (or fork the repository), make a focused change, and open a pull
request. Run the affected Python example or `npm test` when changing code, and
update the documentation when behavior changes.