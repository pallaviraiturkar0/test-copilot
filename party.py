#!/usr/bin/env python3
"""
Party command - A lightweight confetti animation for the terminal.

This script displays a short, colorful confetti animation using ANSI escape codes.
It includes options for customizing duration, fps, width, and rows.
"""

import argparse
import random
import sys
import time
import os


def enable_ansi_on_windows():
    """
    Best-effort attempt to enable ANSI support on Windows using Win32 API.
    Returns True if successful, False otherwise.
    """
    if os.name != 'nt':
        return True  # Not Windows, assume ANSI works
    
    try:
        import ctypes
        from ctypes import wintypes
        
        # Get handle to stdout
        kernel32 = ctypes.windll.kernel32
        handle = kernel32.GetStdHandle(-11)  # STD_OUTPUT_HANDLE
        
        # Get current console mode
        mode = wintypes.DWORD()
        if not kernel32.GetConsoleMode(handle, ctypes.byref(mode)):
            return False
        
        # Enable virtual terminal processing (ANSI support)
        ENABLE_VIRTUAL_TERMINAL_PROCESSING = 0x0004
        if not kernel32.SetConsoleMode(handle, mode.value | ENABLE_VIRTUAL_TERMINAL_PROCESSING):
            return False
        
        return True
    except (ImportError, AttributeError, OSError):
        return False


def generate_confetti_line(width=80):
    """
    Generate a single line of confetti with random colors and characters.
    
    Args:
        width (int): Width of the confetti line
        
    Returns:
        str: A string containing colored confetti characters and ANSI reset
    """
    # ANSI color codes for bright, festive colors
    colors = [
        '\033[91m',  # Bright red
        '\033[92m',  # Bright green  
        '\033[93m',  # Bright yellow
        '\033[94m',  # Bright blue
        '\033[95m',  # Bright magenta
        '\033[96m',  # Bright cyan
    ]
    
    # Fun confetti characters
    confetti_chars = ['*', '•', '◆', '◇', '○', '●', '▲', '▼', '♦', '♠', '♥', '♣']
    
    line = []
    for _ in range(width):
        if random.random() < 0.15:  # 15% chance of confetti at each position
            color = random.choice(colors)
            char = random.choice(confetti_chars)
            line.append(f"{color}{char}")
        else:
            line.append(' ')
    
    # Add ANSI reset at the end
    return ''.join(line) + '\033[0m'


def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


def animate_confetti(duration=3.0, fps=10, width=80, rows=20):
    """
    Display an animated confetti effect.
    
    Args:
        duration (float): Duration of animation in seconds
        fps (int): Frames per second
        width (int): Width of the animation
        rows (int): Number of rows to display
    """
    frame_delay = 1.0 / fps
    total_frames = int(duration * fps)
    
    # Enable ANSI colors
    ansi_enabled = enable_ansi_on_windows()
    if not ansi_enabled:
        print("Warning: ANSI colors may not be supported on this terminal.")
    
    try:
        clear_screen()
        print("\n🎉 PARTY TIME! 🎉\n")
        
        for frame in range(total_frames):
            # Move cursor to top
            print('\033[H', end='')  # Move cursor to home position
            
            # Generate confetti lines
            for _ in range(rows):
                print(generate_confetti_line(width))
            
            # Show progress
            progress = (frame + 1) / total_frames
            bar_width = min(width, 50)
            filled = int(progress * bar_width)
            bar = '█' * filled + '░' * (bar_width - filled)
            print(f"\n{bar} {progress*100:.0f}%")
            
            time.sleep(frame_delay)
        
        # Final message
        print(f"\n{'🎊' * (width // 4)}")
        print("Party's over! Thanks for celebrating! 🎈")
        print('\033[0m')  # Reset colors
        
    except KeyboardInterrupt:
        print('\033[0m\nParty interrupted! 🎭')
        sys.exit(0)


def main():
    """Main entry point for the party command."""
    parser = argparse.ArgumentParser(
        description="Display a festive confetti animation in your terminal!",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    parser.add_argument(
        '--duration', '-d',
        type=float,
        default=3.0,
        help='Duration of the animation in seconds'
    )
    
    parser.add_argument(
        '--fps', '-f',
        type=int,
        default=10,
        help='Frames per second for the animation'
    )
    
    parser.add_argument(
        '--width', '-w',
        type=int,
        default=80,
        help='Width of the confetti area'
    )
    
    parser.add_argument(
        '--rows', '-r',
        type=int,
        default=20,
        help='Number of rows for the confetti'
    )
    
    args = parser.parse_args()
    
    # Validate arguments
    if args.duration <= 0:
        print("Error: Duration must be positive", file=sys.stderr)
        sys.exit(1)
    
    if args.fps <= 0:
        print("Error: FPS must be positive", file=sys.stderr)
        sys.exit(1)
    
    if args.width <= 0 or args.rows <= 0:
        print("Error: Width and rows must be positive", file=sys.stderr)
        sys.exit(1)
    
    # Run the animation
    animate_confetti(args.duration, args.fps, args.width, args.rows)


if __name__ == '__main__':
    main()