import random
import string


def generate_random_string(length: int = 10) -> str:
    """Generate a random string of letters and digits."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def fibonacci(n: int) -> list[int]:
    """Return the first n numbers in the Fibonacci sequence."""
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]


def is_palindrome(s: str) -> bool:
    """Check if a string is a palindrome."""
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]


if __name__ == "__main__":
    print("Random string:", generate_random_string(12))
    print("Fibonacci sequence:", fibonacci(10))
    print("Is 'racecar' a palindrome?", is_palindrome("racecar"))
    print("Is 'hello' a palindrome?", is_palindrome("hello"))
