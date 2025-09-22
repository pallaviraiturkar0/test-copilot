# Party Command 🎉

A lightweight, fun confetti animation command for your terminal!

## Overview

The `party.py` script displays a colorful confetti animation using ANSI escape codes. It's perfect for celebrating successful builds, deployments, or just adding some fun to your terminal experience.

## Usage

### Basic Usage

```bash
python3 party.py
```

This runs a 3-second confetti animation with default settings.

### Custom Options

```bash
python3 party.py --duration 5 --fps 15 --width 100 --rows 25
```

### Command Line Options

- `--duration, -d`: Duration of animation in seconds (default: 3.0)
- `--fps, -f`: Frames per second (default: 10)
- `--width, -w`: Width of the confetti area (default: 80)
- `--rows, -r`: Number of rows for confetti (default: 20)

### Examples

```bash
# Quick party (1 second)
python3 party.py -d 1

# Big party (full screen)
python3 party.py -w 120 -r 30 -d 5

# Smooth animation
python3 party.py -f 20
```

## Platform Support

### Linux/macOS
Full ANSI color support is available on most modern terminals.

### Windows
The script attempts to enable ANSI color support using the Win32 API. This works on:
- Windows 10 Anniversary Update (1607) and later
- Windows Terminal
- PowerShell 7+
- Command Prompt with ANSI support enabled

If ANSI colors are not supported, the animation will still run but without colors.

### Terminal Compatibility
Works best with terminals that support:
- ANSI escape sequences
- Unicode characters
- Cursor positioning

## Dependencies

None! Uses only Python standard library modules:
- `argparse` - Command line argument parsing
- `random` - Random confetti generation
- `sys` - System interface
- `time` - Animation timing
- `os` - Operating system interface
- `ctypes` - Windows ANSI support (Windows only)

## Technical Notes

- The animation clears the screen and redraws each frame
- Confetti is randomly generated for each frame
- Uses ANSI escape codes for colors and cursor control
- Gracefully handles Ctrl+C interruption
- Lightweight and fast - suitable for CI environments

## Exit Codes

- `0`: Normal completion
- `1`: Invalid arguments provided

## Interruption

Press `Ctrl+C` to stop the animation early. The terminal will be properly reset.