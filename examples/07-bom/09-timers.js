"use strict";

// setTimeout()
const timeoutId = setTimeout(() => {
console.log("Timeout executed.");
}, 1000);

console.log("Timeout ID:", timeoutId);

// setTimeout() with arguments
function greet(name, role) {
console.log(
`Hello, ${name}. Role: ${role}.`
);
}

setTimeout(
greet,
1500,
"Osama Abu Motlaq",
"Frontend Developer"
);

// clearTimeout()
const cancelableTimeout = setTimeout(() => {
console.log(
"This timeout should not execute."
);
}, 3000);

clearTimeout(cancelableTimeout);

// setTimeout() returning a value
const delayedValue = setTimeout(() => {
const value = 42;

console.log(
"Delayed value:",
value
);
}, 1200);

console.log(
"Delayed value timeout ID:",
delayedValue
);

// Multiple timeouts
setTimeout(() => {
console.log("First timeout.");
}, 500);

setTimeout(() => {
console.log("Second timeout.");
}, 1000);

setTimeout(() => {
console.log("Third timeout.");
}, 1500);

// setInterval()
let counter = 0;

const intervalId = setInterval(() => {
counter++;

console.log(
"Interval count:",
counter
);

if (counter === 3) {
clearInterval(intervalId);

```
console.log(
  "Interval cleared."
);
```

}
}, 1000);

// clearInterval()
let temporaryCounter = 0;

const temporaryInterval =
setInterval(() => {
temporaryCounter++;

```
console.log(
  "Temporary interval:",
  temporaryCounter
);
```

}, 500);

setTimeout(() => {
clearInterval(temporaryInterval);

console.log(
"Temporary interval stopped."
);
}, 2500);

// Nested setTimeout()
function runRepeatedTask(count) {
if (count === 0) {
return;
}

console.log(
"Remaining executions:",
count
);

setTimeout(() => {
runRepeatedTask(count - 1);
}, 1000);
}

runRepeatedTask(3);

// Sequential timeouts
setTimeout(() => {
console.log("Step 1");

setTimeout(() => {
console.log("Step 2");

```
setTimeout(() => {
  console.log("Step 3");
}, 500);
```

}, 500);
}, 500);

// Timer with dynamic delay
function runAfterDelay(message, delay) {
setTimeout(() => {
console.log(message);
}, delay);
}

runAfterDelay(
"Executed after 700ms.",
700
);

runAfterDelay(
"Executed after 1800ms.",
1800
);

// Store timer ID for later cancellation
let delayedAction;

function scheduleAction() {
delayedAction = setTimeout(() => {
console.log(
"Scheduled action executed."
);
}, 2000);
}

function cancelAction() {
clearTimeout(delayedAction);

console.log(
"Scheduled action canceled."
);
}

scheduleAction();

setTimeout(() => {
cancelAction();
}, 1000);

// Interval with manual start and stop
let seconds = 0;
let clockInterval = null;

function startClock() {
if (clockInterval !== null) {
return;
}

clockInterval = setInterval(() => {
seconds++;

```
console.log(
  "Elapsed seconds:",
  seconds
);
```

}, 1000);
}

function stopClock() {
if (clockInterval === null) {
return;
}

clearInterval(clockInterval);
clockInterval = null;

console.log(
"Clock stopped at:",
seconds
);
}

startClock();

setTimeout(() => {
stopClock();
}, 3500);

// Reset interval state
function resetClock() {
stopClock();

seconds = 0;

console.log(
"Clock reset."
);
}

setTimeout(() => {
resetClock();
}, 4500);

// Countdown with setInterval()
let countdown = 5;

const countdownId = setInterval(() => {
console.log(
"Countdown:",
countdown
);

countdown--;

if (countdown < 0) {
clearInterval(countdownId);

```
console.log(
  "Countdown finished."
);
```

}
}, 1000);

// Timeout-based countdown
function countdownWithTimeout(value) {
console.log(
"Timeout countdown:",
value
);

if (value <= 1) {
console.log(
"Timeout countdown finished."
);

```
return;
```

}

setTimeout(() => {
countdownWithTimeout(value - 1);
}, 1000);
}

countdownWithTimeout(3);

// Debounce with setTimeout()
let debounceTimer;

function debounce(callback, delay) {
return (...args) => {
clearTimeout(debounceTimer);

```
debounceTimer = setTimeout(() => {
  callback(...args);
}, delay);
```

};
}

const debouncedSearch = debounce(
(query) => {
console.log(
"Search executed:",
query
);
},
500
);

debouncedSearch("J");
debouncedSearch("Ja");
debouncedSearch("Java");
debouncedSearch("JavaScript");

// Debounce with independent timer
function createDebounce(callback, delay) {
let timerId;

return (...args) => {
clearTimeout(timerId);

```
timerId = setTimeout(() => {
  callback(...args);
}, delay);
```

};
}

const saveChanges = createDebounce(
(value) => {
console.log(
"Saving changes:",
value
);
},
1000
);

saveChanges("J");
saveChanges("Ja");
saveChanges("Java");
saveChanges("JavaScript");

// Simple timeout wrapper
function wait(delay) {
return new Promise((resolve) => {
setTimeout(resolve, delay);
});
}

async function runTask() {
console.log(
"Task started."
);

await wait(1000);

console.log(
"Task completed."
);
}

runTask();

// Timer with cleanup
function createTimer(callback, delay) {
const id = setTimeout(
callback,
delay
);

return () => {
clearTimeout(id);
console.log(
"Timer cleaned up."
);
};
}

const cleanupTimer = createTimer(() => {
console.log(
"Cleanup timer callback."
);
}, 3000);

setTimeout(() => {
cleanupTimer();
}, 1000);

// Interval cleanup helper
function createInterval(
callback,
delay
) {
const id = setInterval(
callback,
delay
);

return () => {
clearInterval(id);

```
console.log(
  "Interval cleaned up."
);
```

};
}

let intervalValue = 0;

const cleanupInterval =
createInterval(() => {
intervalValue++;

```
console.log(
  "Managed interval:",
  intervalValue
);
```

}, 500);

setTimeout(() => {
cleanupInterval();
}, 2200);

// Timer with a timestamp
const startTime = Date.now();

setTimeout(() => {
const elapsed =
Date.now() - startTime;

console.log(
"Elapsed milliseconds:",
elapsed
);
}, 1000);

// setTimeout() with zero delay
console.log(
"Before zero-delay timeout."
);

setTimeout(() => {
console.log(
"Zero-delay timeout executed."
);
}, 0);

console.log(
"After zero-delay timeout."
);

// Multiple timers with the same delay
setTimeout(() => {
console.log("Timer A");
}, 1000);

setTimeout(() => {
console.log("Timer B");
}, 1000);

setTimeout(() => {
console.log("Timer C");
}, 1000);

// Timer handles
const timerOne = setTimeout(() => {
console.log("Timer one.");
}, 1000);

const timerTwo = setTimeout(() => {
console.log("Timer two.");
}, 2000);

console.log(
"Timer one handle:",
timerOne
);

console.log(
"Timer two handle:",
timerTwo
);
