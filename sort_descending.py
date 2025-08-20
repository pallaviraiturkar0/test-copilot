def sort_numbers_descending(numbers):
    """
    Returns a new list of numbers sorted in descending order.

    Args:
        numbers (list): A list of numbers.

    Returns:
        list: The sorted list in descending order.
    """
    return sorted(numbers, reverse=True)

if __name__ == "__main__":
    # Example: User enters numbers separated by spaces
    user_input = input("Enter numbers separated by spaces: ")
    numbers = [int(num) for num in user_input.split()]
    sorted_numbers = sort_numbers_descending(numbers)
    print("Numbers in descending order:", sorted_numbers)