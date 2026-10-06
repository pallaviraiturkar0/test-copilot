import matplotlib.pyplot as plt


def create_bar_chart() -> None:
    categories = list("ABCDEFG")
    values = [12, 2, 72, 13, 48, 52, 87]

    plt.bar(categories, values)
    plt.title("Random Data Bar Chart")
    plt.ylabel("Value")
    plt.show()


if __name__ == "__main__":
    create_bar_chart()
