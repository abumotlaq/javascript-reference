"use strict";

// Basic closure
function createGreeting() {
const name = "Osama Abu Motlaq";

return function () {
console.log(`Hello, ${name}!`);
};
}

const greet = createGreeting();

greet();

// Closure with a parameter
function createUserGreeting(name) {
return function () {
return `Hello, ${name}!`;
};
}

const greetOsama = createUserGreeting("Osama Abu Motlaq");

console.log(greetOsama());

// Private variable
function createCounter() {
let count = 0;

return function () {
count++;
return count;
};
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());

// Multiple independent closures
const counterA = createCounter();
const counterB = createCounter();

console.log("Counter A:", counterA());
console.log("Counter A:", counterA());

console.log("Counter B:", counterB());
console.log("Counter B:", counterB());

// Closure with multiple functions
function createCounterManager() {
let count = 0;

return {
increment() {
count++;
},


decrement() {
  count--;
},

getValue() {
  return count;
},


};
}

const manager = createCounterManager();

manager.increment();
manager.increment();

console.log("Value:", manager.getValue());

manager.decrement();

console.log("Value:", manager.getValue());

// Closure inside a loop
function createFunctions() {
const functions = [];

for (let i = 0; i < 3; i++) {
functions.push(() => {
console.log("Value:", i);
});
}

return functions;
}

const functions = createFunctions();

functions[0]();
functions[1]();
functions[2]();

// Function factory
function createMultiplier(multiplier) {
return function (number) {
return number * multiplier;
};
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double:", double(10));
console.log("Triple:", triple(10));

// Closure for configuration
function createLogger(prefix) {
return function (message) {
console.log(`[${prefix}] ${message}`);
};
}

const infoLogger = createLogger("INFO");
const errorLogger = createLogger("ERROR");

infoLogger("JavaScript example started.");
errorLogger("Example completed.");

// Closure with state
function createScoreManager(initialScore = 0) {
let score = initialScore;

return {
add(points) {
score += points;
},


subtract(points) {
  score -= points;
},

getScore() {
  return score;
},


};
}
const scoreManager = createScoreManager(10);

scoreManager.add(5);
scoreManager.add(10);
scoreManager.subtract(3);

console.log("Score:", scoreManager.getScore());

// Closure with delayed execution
function delayedGreeting(name, delay) {
setTimeout(() => {
console.log(`Hello, ${name}!`);
}, delay);
}

delayedGreeting("Osama Abu Motlaq", 1000);

// Closure retaining access to outer variables
function createProfile(role) {
const name = "Osama Abu Motlaq";

return () => ({
name,
role,
});
}

const getProfile = createProfile("Frontend Developer");

console.log(getProfile());
