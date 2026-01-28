"""
Module to provide information about George Washington's birthday.
"""

def get_george_washington_birthday():
    """
    Returns George Washington's birthday.
    
    Returns:
        dict: A dictionary containing birthday information including:
            - date: The birthday date (February 22, 1732)
            - note: Additional context about the Old Style date
    """
    return {
        "date": "February 22, 1732",
        "old_style_date": "February 11, 1731/32",
        "note": "The birthday is celebrated on February 22 (New Style/Gregorian calendar). "
                "Under the Old Style (Julian calendar) in use at the time, the date was February 11, 1731/32."
    }


if __name__ == "__main__":
    birthday_info = get_george_washington_birthday()
    print("George Washington's Birthday")
    print("=" * 40)
    print(f"Date: {birthday_info['date']}")
    print(f"Old Style Date: {birthday_info['old_style_date']}")
    print(f"\nNote: {birthday_info['note']}")
