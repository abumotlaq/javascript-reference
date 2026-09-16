"use strict";

// Basic try...catch
try {
const result = JSON.parse('{"name":"Osama Abu Motlaq"}');

console.log("Parsed data:", result);
} catch (error) {
console.error("Error:", error.message);
}

// Handling a JSON parsing error
try {
const result = JSON.parse("{invalid-json}");

console.log(result);
} catch (error) {
console.error("JSON parsing error:", error.message);
}

// throw
function validateAge(age) {
if (age < 18) {
throw new Error("Age must be 18 or older.");
}

return true;
}

try {
validateAge(25);
console.log("Age is valid.");
} catch (error) {
console.error("Validation error:", error.message);
}

try {
validateAge(16);
} catch (error) {
console.error("Validation error:", error.message);
}

// Custom error message
function divide(a, b) {
if (b === 0) {
throw new Error("Cannot divide by zero.");
}

return a / b;
}

try {
console.log("Division:", divide(10, 2));
console.log("Division:", divide(10, 0));
} catch (error) {
console.error("Division error:", error.message);
}

// finally
try {
console.log("Starting operation...");
} catch (error) {
console.error("Operation error:", error.message);
} finally {
console.log("Operation finished.");
}

// Error properties
try {
throw new Error("Something went wrong.");
} catch (error) {
console.log("Error name:", error.name);
console.log("Error message:", error.message);
console.log("Error stack:", error.stack);
}

// Different built-in errors
try {
throw new TypeError("Invalid data type.");
} catch (error) {
console.error("TypeError:", error.message);
}

try {
throw new ReferenceError("Variable does not exist.");
} catch (error) {
console.error("ReferenceError:", error.message);
}

try {
throw new RangeError("Value is out of range.");
} catch (error) {
console.error("RangeError:", error.message);
}

// Error type checking
try {
throw new TypeError("Expected a string.");
} catch (error) {
if (error instanceof TypeError) {
console.error("Type error:", error.message);
} else {
console.error("Unknown error:", error.message);
}
}

// Error handling with a callback
function processData(data, callback) {
if (!data) {
callback(new Error("No data provided."), null);
return;
}

callback(null, {
name: "Osama Abu Motlaq",
data,
});
}

processData("JavaScript", (error, result) => {
if (error) {
console.error("Callback error:", error.message);
return;
}

console.log("Callback result:", result);
});

processData(null, (error, result) => {
if (error) {
console.error("Callback error:", error.message);
return;
}

console.log(result);
});

// Promise rejection
function loadUser(success) {
return new Promise((resolve, reject) => {
setTimeout(() => {
if (success) {
resolve({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
});
} else {
reject(new Error("Failed to load user."));
}
}, 500);
});
}

loadUser(true)
.then((user) => {
console.log("Loaded user:", user);
})
.catch((error) => {
console.error("Promise error:", error.message);
});

// Promise rejection with catch
loadUser(false)
.then((user) => {
console.log(user);
})
.catch((error) => {
console.error("Promise error:", error.message);
});

// try...catch with async/await
async function getUser() {
try {
const user = await loadUser(true);

```
console.log("Async user:", user);
```

} catch (error) {
console.error("Async error:", error.message);
}
}

getUser();

// async/await with rejected Promise
async function getInvalidUser() {
try {
const user = await loadUser(false);

```
console.log(user);
```

} catch (error) {
console.error("Async rejected error:", error.message);
}
}

getInvalidUser();

// finally with async/await
async function saveData() {
try {
await Promise.resolve("Data saved.");

```
console.log("Save completed.");
```

} catch (error) {
console.error("Save error:", error.message);
} finally {
console.log("Save process finished.");
}
}

saveData();

// Handling fetch errors
async function fetchData() {
try {
const response = await fetch(
"https://example.invalid/data"
);

```
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`);
}

const data = await response.json();

console.log("Fetched data:", data);
```

} catch (error) {
console.error("Fetch error:", error.message);
}
}

fetchData();

// Re-throwing an error
function processUser(user) {
try {
if (!user.name) {
throw new Error("User name is required.");
}

```
return user;
```

} catch (error) {
console.error("Processing error:", error.message);

```
throw error;
```

}
}

try {
processUser({
role: "Frontend Developer",
});
} catch (error) {
console.error("Outer error handler:", error.message);
}

// Creating a custom error
class ValidationError extends Error {
constructor(message) {
super(message);
this.name = "ValidationError";
}
}

function validateUsername(username) {
if (username.length < 3) {
throw new ValidationError(
"Username must contain at least 3 characters."
);
}

return true;
}

try {
validateUsername("Osama Abu Motlaq");
console.log("Username is valid.");
} catch (error) {
if (error instanceof ValidationError) {
console.error("Validation error:", error.message);
} else {
console.error("Unexpected error:", error.message);
}
}

// Handling multiple operations independently
async function loadIndependentData() {
const results = await Promise.allSettled([
loadUser(true),
loadUser(false),
]);

results.forEach((result, index) => {
if (result.status === "fulfilled") {
console.log(`Operation ${index + 1}:`, result.value);
} else {
console.error(
`Operation ${index + 1} failed:`,
result.reason.message
);
}
});
}

loadIndependentData();

// Guard clause with an error
function getRole(user) {
if (!user) {
throw new Error("User is required.");
}

if (!user.role) {
throw new Error("User role is required.");
}

return user.role;
}

try {
console.log(
getRole({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
})
);
} catch (error) {
console.error("Role error:", error.message);
}
