"use strict";

// Basic callback
function greet(name, callback) {
const message = `Hello, ${name}!`;
callback(message);
}

greet("Osama Abu Motlaq", (message) => {
console.log(message);
});

// Callback with calculation
function calculate(a, b, callback) {
const result = callback(a, b);
console.log("Result:", result);
}

calculate(10, 5, (a, b) => a + b);

calculate(10, 5, (a, b) => a * b);

// Callback with an array
const numbers = [1, 2, 3, 4, 5];

function processNumbers(array, callback) {
for (const number of array) {
callback(number);
}
}

processNumbers(numbers, (number) => {
console.log("Number:", number);
});

// Callback with condition
function checkAge(age, onAdult, onMinor) {
if (age >= 18) {
onAdult();
} else {
onMinor();
}
}

checkAge(
25,
() => console.log("Osama Abu Motlaq is an adult."),
() => console.log("Osama Abu Motlaq is a minor.")
);

// Synchronous callback
function processUser(name, callback) {
const user = {
name,
role: "Frontend Developer",
};

callback(user);
}

processUser("Osama Abu Motlaq", (user) => {
console.log("User:", user);
});

// Asynchronous callback
function fetchData(callback) {
setTimeout(() => {
callback("Data loaded successfully.");
}, 1000);
}

fetchData((data) => {
console.log(data);
});

// Multiple callbacks
function loadUser(onSuccess, onError) {
const success = true;

setTimeout(() => {
if (success) {
onSuccess({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
});
} else {
onError(new Error("Failed to load user."));
}
}, 1000);
}

loadUser(
(user) => {
console.log("Loaded user:", user);
},
(error) => {
console.error("Error:", error.message);
}
);

// Callback with array transformation
function transformArray(array, callback) {
const result = [];

for (const item of array) {
result.push(callback(item));
}

return result;
}

const doubled = transformArray(
numbers,
(number) => number * 2
);

console.log("Doubled:", doubled);

// Nested callbacks
function getUser(callback) {
setTimeout(() => {
callback({
name: "Osama Abu Motlaq",
});
}, 500);
}

function getRole(user, callback) {
setTimeout(() => {
callback({
...user,
role: "Frontend Developer",
});
}, 500);
}

getUser((user) => {
getRole(user, (updatedUser) => {
console.log("Nested callbacks:", updatedUser);
});
});

// Error-first callback pattern
function divide(a, b, callback) {
if (b === 0) {
callback(new Error("Cannot divide by zero."), null);
return;
}

callback(null, a / b);
}

divide(10, 2, (error, result) => {
if (error) {
console.error(error.message);
return;
}

console.log("Division result:", result);
});

divide(10, 0, (error, result) => {
if (error) {
console.error(error.message);
return;
}

console.log("Division result:", result);
});
