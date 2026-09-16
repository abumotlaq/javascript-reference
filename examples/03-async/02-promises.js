"use strict";

// Basic Promise
const basicPromise = new Promise((resolve) => {
resolve("Promise resolved successfully.");
});

basicPromise.then((message) => {
console.log(message);
});

// Promise with a delay
const delayedPromise = new Promise((resolve) => {
setTimeout(() => {
resolve("Data loaded successfully.");
}, 1000);
});

delayedPromise.then((data) => {
console.log(data);
});

// Promise rejection
const failedPromise = new Promise((resolve, reject) => {
const success = false;

if (success) {
resolve("Operation succeeded.");
} else {
reject(new Error("Operation failed."));
}
});

failedPromise
.then((message) => {
console.log(message);
})
.catch((error) => {
console.error("Error:", error.message);
});

// Promise with resolve and reject
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

getUser()
.then((user) => {
console.log("User:", user);
})
.catch((error) => {
console.error("Error:", error.message);
});

// Promise chaining
function getName() {
return Promise.resolve("Osama Abu Motlaq");
}

function getRole(name) {
return Promise.resolve({
name,
role: "Frontend Developer",
});
}

getName()
.then((name) => {
return getRole(name);
})
.then((user) => {
console.log("Chained result:", user);
})
.catch((error) => {
console.error("Chain error:", error.message);
});

// Returning values from then()
Promise.resolve(10)
.then((value) => {
return value * 2;
})
.then((value) => {
return value + 5;
})
.then((value) => {
console.log("Final value:", value);
});

// Multiple then() handlers
const sharedPromise = Promise.resolve(
"Shared Promise result."
);

sharedPromise.then((value) => {
console.log("Handler 1:", value);
});

sharedPromise.then((value) => {
console.log("Handler 2:", value);
});

// Promise.finally()
Promise.resolve("Operation completed.")
.then((message) => {
console.log(message);
})
.catch((error) => {
console.error(error.message);
})
.finally(() => {
console.log("Cleanup completed.");
});

// Promise.all()
const promiseA = Promise.resolve("A");
const promiseB = Promise.resolve("B");
const promiseC = Promise.resolve("C");

Promise.all([promiseA, promiseB, promiseC])
.then((results) => {
console.log("Promise.all:", results);
})
.catch((error) => {
console.error("Promise.all error:", error.message);
});

// Promise.all() with rejection
const successPromise = Promise.resolve("Success");
const errorPromise = Promise.reject(
new Error("One Promise failed.")
);

Promise.all([successPromise, errorPromise])
.then((results) => {
console.log(results);
})
.catch((error) => {
console.error(
"Promise.all rejected:",
error.message
);
});

// Promise.allSettled()
const first = Promise.resolve("First");
const second = Promise.reject(
new Error("Second failed.")
);
const third = Promise.resolve("Third");

Promise.allSettled([first, second, third]).then(
(results) => {
console.log("Promise.allSettled:", results);
}
);

// Promise.race()
const fastPromise = new Promise((resolve) => {
setTimeout(() => {
resolve("Fast Promise");
}, 300);
});

const slowPromise = new Promise((resolve) => {
setTimeout(() => {
resolve("Slow Promise");
}, 1000);
});

Promise.race([fastPromise, slowPromise]).then(
(result) => {
console.log("Promise.race:", result);
}
);

// Promise.any()
const rejectedOne = Promise.reject(
new Error("First failed.")
);

const resolvedOne = new Promise((resolve) => {
setTimeout(() => {
resolve("Second succeeded.");
}, 500);
});

const rejectedTwo = Promise.reject(
new Error("Third failed.")
);

Promise.any([
rejectedOne,
resolvedOne,
rejectedTwo,
]).then((result) => {
console.log("Promise.any:", result);
});

// Returning a Promise from a function
function delay(message, time) {
return new Promise((resolve) => {
setTimeout(() => {
resolve(message);
}, time);
});
}

delay("First step completed.", 500)
.then((message) => {
console.log(message);
return delay("Second step completed.", 500);
})
.then((message) => {
console.log(message);
return delay("Third step completed.", 500);
})
.then((message) => {
console.log(message);
})
.catch((error) => {
console.error("Error:", error.message);
});

// Promise resolved with a non-Promise value
Promise.resolve("Resolved value").then((value) => {
console.log(value);
});

// Promise rejection handled with catch()
Promise.reject(new Error("Something went wrong.")).catch(
(error) => {
console.error("Caught error:", error.message);
}
);
