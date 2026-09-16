"use strict";

// Function passed as an argument
function execute(callback) {
callback();
}

function greet() {
console.log("Hello, Osama Abu Motlaq!");
}

execute(greet);

// Function returning another function
function createGreeting(greeting) {
return function (name) {
return `${greeting}, ${name}!`;
};
}

const sayHello = createGreeting("Hello");
const sayWelcome = createGreeting("Welcome");

console.log(sayHello("Osama Abu Motlaq"));
console.log(sayWelcome("Osama Abu Motlaq"));

// Higher-order function with parameters
function calculate(a, b, operation) {
return operation(a, b);
}

function add(a, b) {
return a + b;
}

function multiply(a, b) {
return a * b;
}

console.log("Add:", calculate(10, 5, add));
console.log("Multiply:", calculate(10, 5, multiply));

// Arrow function as a callback
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log("Doubled:", doubled);

// map
const squared = numbers.map((number) => number ** 2);

console.log("Squared:", squared);

// filter
const evenNumbers = numbers.filter(
(number) => number % 2 === 0
);

console.log("Even numbers:", evenNumbers);

// filter with objects
const users = [
{
name: "Osama Abu Motlaq",
age: 25,
},
{
name: "Osama Abu Motlaq",
age: 17,
},
{
name: "Osama Abu Motlaq",
age: 30,
},
];

const adults = users.filter((user) => user.age >= 18);

console.log("Adults:", adults);

// reduce
const total = numbers.reduce(
(sum, number) => sum + number,
0
);

console.log("Total:", total);

// find
const firstEvenNumber = numbers.find(
(number) => number % 2 === 0
);

console.log("First even number:", firstEvenNumber);

// some
const hasLargeNumber = numbers.some(
(number) => number > 4
);

console.log("Has number greater than 4:", hasLargeNumber);

// every
const allPositive = numbers.every(
(number) => number > 0
);

console.log("All numbers are positive:", allPositive);

// forEach
numbers.forEach((number) => {
console.log("Number:", number);
});

// Function composition
const addFive = (number) => number + 5;
const multiplyByTwo = (number) => number * 2;

const compose = (firstFunction, secondFunction) => {
return (value) => secondFunction(firstFunction(value));
};

const addFiveThenMultiplyByTwo = compose(
addFive,
multiplyByTwo
);

console.log(
"Composed result:",
addFiveThenMultiplyByTwo(10)
);
