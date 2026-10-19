"use strict";

const adventures = [
  "Walk to a nearby park and find a tree you've never noticed before.",
  "Pack your favorite snack and enjoy a picnic with a friend.",
  "Take a short walk at sunset and watch the colors change.",
  "Visit a local garden and look for three different kinds of flowers.",
  "Bring a book to a shady spot and read a chapter outside.",
];

const adventureButton = document.getElementById("suggest-adventure");
const adventureText = document.getElementById("adventure");
let previousIndex = -1;

adventureButton.hidden = false;
adventureButton.addEventListener("click", () => {
  const choices = adventures
    .map((_, index) => index)
    .filter((index) => index !== previousIndex);
  const nextIndex = choices[Math.floor(Math.random() * choices.length)];
  adventureText.textContent = adventures[nextIndex];
  previousIndex = nextIndex;
  adventureButton.textContent = "Try another idea";
});
