"use strict";

// Basic arrow function
const greet = () => {
console.log("Hello, Osama Abu Motlaq!");
};

greet();

// Arrow function with one parameter
const greetUser = (name) => {
return `Hello, ${name}!`;
};

console.log(greetUser("Osama Abu Motlaq"));

// Parentheses can be omitted with one parameter
const square = number => {
return number * number;
};

console.log("Square:", square(5));

// Arrow function with multiple parameters
const add = (a, b) => {
return a + b;
};

console.log("Sum:", add(10, 15));

// Explicit return
const multiply = (a, b) => {
return a * b;
};

console.log("Multiplication:", multiply(4, 5));

// Implicit return
const subtract = (a, b) => a - b;

console.log("Subtraction:", subtract(10, 4));

// Returning an object
const createUser = (name, role) => ({
name,
role,
});

const user = createUser(
"Osama Abu Motlaq",
"Frontend Developer"
);

console.log("User:", user);

// Default parameter
const introduce = (
name = "Osama Abu Motlaq"
) => {
return `My name is ${name}.`;
};

console.log(introduce());
console.log(introduce("Osama Abu Motlaq"));

// Rest parameters
const calculateTotal = (...numbers) => {
return numbers.reduce(
(total, number) => total + number,
0
);
};

console.log(
"Total:",
calculateTotal(10, 20, 30)
);

// Arrow function as a callback
const skills = [
"JavaScript",
"React",
"Next.js",
];

skills.forEach((skill) => {
console.log("Skill:", skill);
});

// Arrow function with map
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log("Doubled:", doubled);

// Arrow function with filter
const evenNumbers = numbers.filter(
(number) => number % 2 === 0
);

console.log("Even numbers:", evenNumbers);

// Lexical this
const person = {
name: "Osama Abu Motlaq",

greet() {
const showName = () => {
console.log(`Hello, ${this.name}!`);
};

```
showName();
```

},
};

person.greet();

// Arrow functions do not have their own arguments object
const displayArguments = (...args) => {
console.log("Arguments:", args);
};

displayArguments("JavaScript", "React", "Next.js");
