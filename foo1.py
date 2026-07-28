"""Utility functions for common mathematical operations."""


def is_prime(n: int) -> bool:
    """Return True if n is a prime number, False otherwise."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True


def primes_up_to(limit: int) -> list[int]:
    """Return a list of all prime numbers up to and including limit."""
    return [n for n in range(2, limit + 1) if is_prime(n)]


def factorial(n: int) -> int:
    """Return the factorial of a non-negative integer n."""
    if n < 0:
        raise ValueError("factorial is not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


if __name__ == "__main__":
    print("Primes up to 50:", primes_up_to(50))
    print("Factorial of 10:", factorial(10))
    print("Is 97 prime?", is_prime(97))
    print("Is 100 prime?", is_prime(100))
