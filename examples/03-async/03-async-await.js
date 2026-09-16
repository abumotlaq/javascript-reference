د"use strict";

// Basic async function
async function greet() {
return "Hello, Osama Abu Motlaq!";
}

greet().then((message) => {
console.log(message);
});

// await with a resolved Promise
function getMessage() {
return Promise.resolve("Promise resolved successfully.");
}

async function showMessage() {
const message = await getMessage();

console.log(message);
}

showMessage();

// await with a delayed operation
function delay(message, time) {
return new Promise((resolve) => {
setTimeout(() => {
resolve(message);
}, time);
});
}

async function loadData() {
const message = await delay(
"Data loaded successfully.",
1000
);

console.log(message);
}

loadData();

// Returning a value from an async function
async function calculateTotal() {
const price = 100;
const shipping = 20;

return price + shipping;
}

calculateTotal().then((total) => {
console.log("Total:", total);
});

// Sequential execution
async function runSteps() {
const firstStep = await delay(
"First step completed.",
500
);

console.log(firstStep);

const secondStep = await delay(
"Second step completed.",
500
);

console.log(secondStep);

const thirdStep = await delay(
"Third step completed.",
500
);

console.log(thirdStep);
}

runSteps();

// try...catch with async/await
function getUser() {
return new Promise((resolve, reject) => {
setTimeout(() => {
const success = true;

```
  if (success) {
    resolve({
      name: "Osama Abu Motlaq",
      role: "Frontend Developer",
    });
  } else {
    reject(new Error("Failed to load user."));
  }
}, 500);
```

});
}

async function loadUser() {
try {
const user = await getUser();

```
console.log("User:", user);
```

} catch (error) {
console.error("Error:", error.message);
}
}

loadUser();

// Handling a rejected Promise
async function handleFailure() {
try {
const result = await Promise.reject(
new Error("Something went wrong.")
);

```
console.log(result);
```

} catch (error) {
console.error("Caught:", error.message);
}
}

handleFailure();

// finally with async/await
async function processData() {
try {
const result = await delay(
"Processing completed.",
500
);

```
console.log(result);
```

} catch (error) {
console.error("Error:", error.message);
} finally {
console.log("Cleanup completed.");
}
}

processData();

// Multiple independent operations with Promise.all()
function getSkills() {
return Promise.resolve([
"JavaScript",
"React",
"Next.js",
]);
}

function getProjects() {
return Promise.resolve([
"Portfolio",
"Task Manager",
]);
}

async function loadProfileData() {
try {
const [user, skills, projects] = await Promise.all([
getUser(),
getSkills(),
getProjects(),
]);

```
console.log("User:", user);
console.log("Skills:", skills);
console.log("Projects:", projects);
```

} catch (error) {
console.error("Error:", error.message);
}
}

loadProfileData();

// Parallel operations
async function loadInParallel() {
const userPromise = getUser();
const skillsPromise = getSkills();
const projectsPromise = getProjects();

const [user, skills, projects] = await Promise.all([
userPromise,
skillsPromise,
projectsPromise,
]);

console.log("Parallel user:", user);
console.log("Parallel skills:", skills);
console.log("Parallel projects:", projects);
}

loadInParallel();

// Async function processing an array
const numbers = [1, 2, 3, 4, 5];

async function doubleNumber(number) {
return number * 2;
}

async function processNumbers() {
const results = await Promise.all(
numbers.map((number) => doubleNumber(number))
);

console.log("Processed numbers:", results);
}

processNumbers();

// Async function as a callback
async function processUser(name) {
return {
name,
role: "Frontend Developer",
};
}

async function runUserProcess() {
const user = await processUser("Osama Abu Motlaq");

console.log("Processed user:", user);
}

runUserProcess();

// Async function returning another async result
async function getProfile() {
const name = await delay(
"Osama Abu Motlaq",
300
);

const role = await delay(
"Frontend Developer",
300
);

return {
name,
role,
};
}

async function showProfile() {
const profile = await getProfile();

console.log("Profile:", profile);
}

showProfile();

// Async IIFE
(async () => {
const message = await delay(
"Async IIFE completed.",
500
);

console.log(message);
})();
