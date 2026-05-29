# Architecture

## Overview

`test-copilot` is a small sandbox repository used to experiment with GitHub
Copilot CLI, custom Copilot agents, and agentic GitHub Actions workflows. It is
not a deployable application: it contains a couple of standalone Python
scripts, project documentation, and configuration for automation that runs
inside GitHub itself.

The repo is organized around three loosely-coupled concerns:

1. **Sample code** — small Python scripts used as scratch material.
2. **Documentation** — top-level `README.md` and a `docs/` folder with setup
   notes for a hypothetical social app the repo is used to plan.
3. **Automation** — a custom Copilot CLI agent and an agentic GitHub Actions
   workflow that posts daily repo-status issues.

## High-level architecture / components

```
┌──────────────────────────────────────────────────────────────┐
│                       test-copilot repo                      │
│                                                              │
│  ┌──────────────┐   ┌─────────────────┐   ┌───────────────┐  │
│  │ Sample code  │   │  Documentation  │   │  Automation   │  │
│  │              │   │                 │   │               │  │
│  │ hello.py     │   │ README.md       │   │ .github/      │  │
│  │ sort_        │   │ docs/SETUP.md   │   │   agents/     │  │
│  │  descending  │   │                 │   │   workflows/  │  │
│  │  .py         │   │                 │   │               │  │
│  └──────────────┘   └─────────────────┘   └───────┬───────┘  │
│                                                   │          │
└───────────────────────────────────────────────────┼──────────┘
                                                    │
                          ┌─────────────────────────┴────────────────────┐
                          │                                              │
                          ▼                                              ▼
                ┌──────────────────────┐                  ┌─────────────────────────┐
                │  Copilot CLI         │                  │  GitHub Actions runner  │
                │  (local dev tool)    │                  │  (daily-repo-status)    │
                │                      │                  │                         │
                │  loads custom agent  │                  │  executes agentic       │
                │  from .github/agents │                  │  workflow, opens issue  │
                └──────────────────────┘                  └─────────────────────────┘
```

### Components

- **`hello.py`** — minimal script that prints `Hello`. Smoke-test material.
- **`sort_descending.py`** — small utility with a `sort_numbers_descending`
  function plus an interactive `__main__` block that reads space-separated
  numbers from stdin and prints them sorted descending.
- **`README.md`** — top-level project description and setup/contribution
  instructions.
- **`docs/SETUP.md`** — setup notes for the "social app" idea the repo is used
  to scaffold (Node.js + MongoDB + JWT + Socket.IO). No code for that app
  exists in the repo yet.
- **`.github/agents/planning-agent.md`** — a custom Copilot CLI agent
  ("Planning Agent") that helps turn feature ideas into PRDs and task
  breakdowns. Consumed by Copilot CLI; not executed by GitHub Actions.
- **`.github/workflows/daily-repo-status.md`** — agentic workflow definition
  (frontmatter + natural-language instructions) that runs on a daily schedule
  and on `workflow_dispatch`, gathers recent repo activity, and creates a
  GitHub issue summarising it. Sourced from
  `githubnext/agentics/workflows/daily-repo-status.md`.
- **`.github/workflows/daily-repo-status.lock.yml`** — generated lockfile for
  the agentic workflow (marked `linguist-generated` and `merge=ours` in
  `.gitattributes`). This is the file the GitHub Actions runner actually
  executes.

## Data flow

There is no runtime backend, so "data flow" here describes how the artifacts
in the repo are produced and consumed.

1. **Sample scripts** are run locally:
   `stdin → sort_descending.py → stdout`. No persistence, no network.
2. **Copilot CLI ↔ Planning Agent**: when a developer invokes Copilot CLI in
   this repo, the CLI discovers `.github/agents/planning-agent.md` and exposes
   it as a selectable agent. User prompts flow into the agent, and PRD/task
   output flows back to the terminal.
3. **Agentic daily-status workflow**:
   - GitHub Actions triggers the workflow on schedule or via manual dispatch.
   - The runner executes `daily-repo-status.lock.yml` (compiled from the `.md`
     spec).
   - The workflow uses the `github` tool with read-only `contents`, `issues`,
     and `pull-requests` permissions to gather recent activity.
   - It writes a single GitHub issue via the `safe-outputs.create-issue`
     channel, prefixed with `[repo-status]` and labelled `report` /
     `daily-status`.

```
schedule / workflow_dispatch
        │
        ▼
┌─────────────────────────┐    read    ┌────────────────────────┐
│ daily-repo-status       │──────────▶ │ GitHub repo            │
│ (.lock.yml on runner)   │            │ (issues, PRs, commits) │
└──────────┬──────────────┘            └────────────────────────┘
           │ safe-outputs.create-issue
           ▼
┌─────────────────────────┐
│ New GitHub issue        │
│ "[repo-status] ..."     │
└─────────────────────────┘
```

## Technology stack

- **Language**: Python 3 (standard library only — no `requirements.txt`,
  no third-party dependencies).
- **Automation runtime**: GitHub Actions, using the agentic-workflows format
  from [`githubnext/agentics`](https://github.com/githubnext/agentics).
- **Developer tooling**: GitHub Copilot CLI, which loads the custom agent
  defined in `.github/agents/`.
- **Documentation**: Markdown.
- **VCS / hosting**: Git and GitHub. `.gitattributes` marks
  `.github/workflows/*.lock.yml` as linguist-generated with an `ours` merge
  strategy.

The setup notes in `docs/SETUP.md` describe an intended Node.js + MongoDB +
JWT + Socket.IO stack for a social app, but none of that code lives in the
repo today.

## Directory structure

```
.
├── .gitattributes                # marks generated workflow lockfiles
├── README.md                     # project overview + setup/contrib guide
├── architecture.md               # this document
├── hello.py                      # minimal "Hello" script
├── sort_descending.py            # descending-sort utility + CLI entry point
├── docs/
│   └── SETUP.md                  # setup notes for the planned social app
└── .github/
    ├── agents/
    │   └── planning-agent.md     # custom Copilot CLI Planning Agent
    └── workflows/
        ├── daily-repo-status.md       # agentic workflow definition (source)
        └── daily-repo-status.lock.yml # generated workflow executed by Actions
```
