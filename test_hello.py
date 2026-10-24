import unittest
from datetime import date

from hello import greeting


class TestHello(unittest.TestCase):
    def test_greeting_with_date(self):
        self.assertEqual(greeting(date(2026, 1, 2)), "Hello! 👋 Today's date is 📅 2026-01-02 🎉")

    def test_greeting_defaults_to_today(self):
        self.assertIn(date.today().isoformat(), greeting())


if __name__ == "__main__":
    unittest.main()
