from datetime import date


def greeting(today=None):
    today = today or date.today()
    return f"Hello! 👋 Today's date is 📅 {today.isoformat()} 🎉"


if __name__ == "__main__":
    print(greeting())
