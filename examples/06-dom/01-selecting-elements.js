"use strict";

// getElementById()
const title = document.getElementById("title");

console.log("getElementById:", title);

// getElementsByClassName()
const cards = document.getElementsByClassName("card");

console.log(
"getElementsByClassName:",
cards
);

// getElementsByTagName()
const paragraphs = document.getElementsByTagName("p");

console.log(
"getElementsByTagName:",
paragraphs
);

// querySelector() with an element selector
const heading = document.querySelector("h1");

console.log(
"querySelector (element):",
heading
);

// querySelector() with a class selector
const firstCard = document.querySelector(".card");

console.log(
"querySelector (class):",
firstCard
);

// querySelector() with an ID selector
const main = document.querySelector("#main");

console.log(
"querySelector (id):",
main
);

// querySelectorAll()
const allCards = document.querySelectorAll(".card");

console.log(
"querySelectorAll:",
allCards
);

// querySelectorAll() with multiple selectors
const elements = document.querySelectorAll(
"h1, p, .card"
);

console.log(
"Multiple selectors:",
elements
);

// Selecting by attribute
const emailInput = document.querySelector(
'input[type="email"]'
);

console.log(
"Attribute selector:",
emailInput
);

// Selecting a data attribute
const project = document.querySelector(
'[data-project="javascript-reference"]'
);

console.log(
"Data attribute selector:",
project
);

// Selecting a specific element with :first-child
const firstItem = document.querySelector(
"ul li:first-child"
);

console.log(
"First child:",
firstItem
);

// Selecting all matching elements
const listItems = document.querySelectorAll(
"ul li"
);

console.log(
"List items:",
listItems
);

// Converting NodeList to an array
const cardArray = Array.from(
document.querySelectorAll(".card")
);

console.log(
"Card array:",
cardArray
);

// Iterating over selected elements
document
.querySelectorAll(".card")
.forEach((card, index) => {
console.log(`Card ${index + 1}:`, card);
});

// Checking whether an element exists
const footer = document.querySelector("footer");

if (footer) {
console.log("Footer found:", footer);
}

// Selecting a parent element
const button = document.querySelector(".button");

if (button) {
const parent = button.parentElement;

console.log(
"Button parent:",
parent
);
}

// Selecting the document body
const body = document.body;

console.log("Body:", body);

// Selecting the document
const documentElement = document.documentElement;

console.log(
"Document element:",
documentElement
);

// Selecting by name
const inputs = document.getElementsByName(
"username"
);

console.log(
"Elements by name:",
inputs
);
