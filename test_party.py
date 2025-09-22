#!/usr/bin/env python3
"""
Unit tests for party.py confetti animation.

Tests the generate_confetti_line function with seeded randomization
to ensure deterministic behavior and proper ANSI formatting.
"""

import random
import sys
import os

# Add the parent directory to Python path to import party module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from party import generate_confetti_line


def test_generate_confetti_line_basic():
    """Test that generate_confetti_line returns a non-empty string."""
    # Seed the random number generator for deterministic tests
    random.seed(42)
    
    result = generate_confetti_line(width=5)
    
    # Should return a string
    assert isinstance(result, str), "generate_confetti_line should return a string"
    
    # Should not be empty (at minimum contains ANSI reset)
    assert len(result) > 0, "generate_confetti_line should return a non-empty string"


def test_generate_confetti_line_ansi_reset():
    """Test that generate_confetti_line contains ANSI reset sequences."""
    # Seed the random number generator for deterministic tests  
    random.seed(123)
    
    result = generate_confetti_line(width=10)
    
    # Should contain ANSI reset sequence at the end
    assert result.endswith('\033[0m'), "generate_confetti_line should end with ANSI reset sequence"


def test_generate_confetti_line_width():
    """Test that generate_confetti_line respects the width parameter."""
    # Seed the random number generator for deterministic tests
    random.seed(456)
    
    width = 15
    result = generate_confetti_line(width=width)
    
    # Remove ANSI codes to count actual characters
    # The result should have width characters plus ANSI codes
    # At minimum: width spaces + ANSI reset (4 chars)
    assert len(result) >= width, f"Result should be at least {width} characters"
    
    # Should contain the ANSI reset
    assert '\033[0m' in result, "Result should contain ANSI reset sequence"


def test_generate_confetti_line_contains_colors():
    """Test that with enough iterations, confetti line contains color codes."""
    # Seed for reproducibility
    random.seed(789)
    
    # Generate multiple lines to increase chance of getting confetti
    color_found = False
    
    for _ in range(50):  # Try 50 times to get some confetti
        result = generate_confetti_line(width=20)
        
        # Check for any ANSI color codes (format: \033[9Xm where X is 1-6)
        if any(f'\033[9{i}m' in result for i in range(1, 7)):
            color_found = True
            break
    
    # With a wide width and many attempts, we should get some colored confetti
    assert color_found, "Should generate colored confetti with sufficient attempts"


def test_generate_confetti_line_deterministic():
    """Test that seeded random generates consistent results."""
    # Use same seed for both calls
    random.seed(999)
    result1 = generate_confetti_line(width=8)
    
    random.seed(999)  # Reset to same seed
    result2 = generate_confetti_line(width=8)
    
    assert result1 == result2, "Same seed should produce identical results"


def test_generate_confetti_line_different_seeds():
    """Test that different seeds produce different results."""
    random.seed(111)
    result1 = generate_confetti_line(width=20)
    
    random.seed(222)
    result2 = generate_confetti_line(width=20)
    
    # With different seeds and reasonable width, results should likely differ
    # (There's a small chance they could be the same, but very unlikely)
    assert result1 != result2, "Different seeds should likely produce different results"


def run_tests():
    """Run all tests and report results."""
    test_functions = [
        test_generate_confetti_line_basic,
        test_generate_confetti_line_ansi_reset,
        test_generate_confetti_line_width,
        test_generate_confetti_line_contains_colors,
        test_generate_confetti_line_deterministic,
        test_generate_confetti_line_different_seeds,
    ]
    
    passed = 0
    failed = 0
    
    print("Running party.py tests...")
    print("=" * 50)
    
    for test_func in test_functions:
        try:
            test_func()
            print(f"✓ {test_func.__name__}")
            passed += 1
        except AssertionError as e:
            print(f"✗ {test_func.__name__}: {e}")
            failed += 1
        except Exception as e:
            print(f"✗ {test_func.__name__}: Unexpected error: {e}")
            failed += 1
    
    print("=" * 50)
    print(f"Tests passed: {passed}")
    print(f"Tests failed: {failed}")
    print(f"Total tests: {passed + failed}")
    
    if failed == 0:
        print("🎉 All tests passed!")
        return True
    else:
        print(f"❌ {failed} test(s) failed")
        return False


if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)