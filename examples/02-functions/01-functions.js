"use strict";

// Function declaration
function greet() {
console.log("Hello, Osama Abu Motlaq!");
}

greet();

// Function with parameters
function greetUser(name) {
console.log(`Hello, ${name}!`);
}

greetUser("Osama Abu Motlaq");

// Function with multiple parameters
function add(a, b) {
return a + b;
}

const sum = add(10, 5);

console.log("Sum:", sum);

// Function with a return value
function getFullName(firstName, lastName) {
return `${firstName} ${lastName}`;
}

const fullName = getFullName("Osama Abu", "Motlaq");

console.log("Full name:", fullName);

// Default parameter
function introduce(name = "Osama Abu Motlaq") {
return `My name is ${name}.`;
}

console.log(introduce());
console.log(introduce("Osama Abu Motlaq"));

// Function expression
const multiply = function (a, b) {
return a * b;
};

console.log("Multiplication:", multiply(4, 5));

// Function with conditional logic
function checkAge(age) {
if (age >= 18) {
return "Adult";
}

return "Minor";
}

console.log("Age status:", checkAge(25));

// Function returning another value
function calculateRectangleArea(width, height) {
return width * height;
}

console.log(
"Rectangle area:",
calculateRectangleArea(10, 6)
);

// Function with rest parameters
function calculateTotal(...numbers) {
let total = 0;

for (const number of numbers) {
total += number;
}

return total;
}

console.log(
"Total:",
calculateTotal(10, 20, 30, 40)
);

// Function as a value
function sayHello() {
return "Hello from Osama Abu Motlaq!";
}

const message = sayHello;

console.log(message());

// Passing a function as an argument
function executeFunction(callback) {
callback();
}

function showMessage() {
console.log("JavaScript function executed.");
}

executeFunction(showMessage);

// Nested function
function createMessage(name) {
function formatName() {
return name.toUpperCase();
}

return `Hello, ${formatName()}!`;
}

console.log(createMessage("Osama Abu Motlaq"));
