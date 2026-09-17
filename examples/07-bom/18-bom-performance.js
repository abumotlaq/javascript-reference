"use strict";

// Performance object
console.log(
"Performance:",
window.performance
);

// Performance time origin
console.log(
"Time origin:",
performance.timeOrigin
);

// Performance now
const startTime = performance.now();

for (let index = 0; index < 100000; index++) {
Math.sqrt(index);
}

const endTime = performance.now();

console.log(
"Elapsed time:",
endTime - startTime,
"ms"
);

// Measure a simple operation
function calculateSum(limit) {
let total = 0;

for (let index = 1; index <= limit; index++) {
total += index;
}

return total;
}

const calculationStart = performance.now();

const sum = calculateSum(1000000);

const calculationEnd = performance.now();

console.log("Sum:", sum);

console.log(
"Calculation duration:",
calculationEnd - calculationStart,
"ms"
);

// Performance mark
performance.mark("calculation-start");

calculateSum(500000);

performance.mark("calculation-end");

console.log(
"Marks:",
performance.getEntriesByType("mark")
);

// Performance measure
performance.measure(
"calculation-duration",
"calculation-start",
"calculation-end"
);

const calculationMeasure =
performance.getEntriesByName(
"calculation-duration"
);

console.log(
"Calculation measure:",
calculationMeasure
);

// Read measure duration
if (calculationMeasure.length > 0) {
console.log(
"Measured duration:",
calculationMeasure[0].duration,
"ms"
);
}

// Performance entries
console.log(
"All performance entries:",
performance.getEntries()
);

// Performance entries by type
console.log(
"Mark entries:",
performance.getEntriesByType("mark")
);

console.log(
"Measure entries:",
performance.getEntriesByType("measure")
);

// Resource timing entries
const resourceEntries =
performance.getEntriesByType("resource");

console.log(
"Resource entries:",
resourceEntries
);

// Resource timing details
resourceEntries.forEach((resource) => {
console.log(
"Resource name:",
resource.name
);

console.log(
"Resource duration:",
resource.duration
);

console.log(
"Resource size:",
resource.transferSize
);
});

// Navigation timing
const navigationEntries =
performance.getEntriesByType(
"navigation"
);

if (navigationEntries.length > 0) {
const navigation =
navigationEntries[0];

console.log(
"Navigation entry:",
navigation
);

console.log(
"DNS lookup:",
navigation.domainLookupEnd -
navigation.domainLookupStart
);

console.log(
"TCP connection:",
navigation.connectEnd -
navigation.connectStart
);

console.log(
"Request duration:",
navigation.responseEnd -
navigation.requestStart
);

console.log(
"DOM interactive:",
navigation.domInteractive
);

console.log(
"DOM content loaded:",
navigation.domContentLoadedEventEnd
);

console.log(
"Load event:",
navigation.loadEventEnd
);
}

// Legacy performance navigation timing
if (performance.timing) {
console.log(
"Legacy timing:",
performance.timing
);
}

// Paint timing
const paintEntries =
performance.getEntriesByType(
"paint"
);

console.log(
"Paint entries:",
paintEntries
);

paintEntries.forEach((paint) => {
console.log(
`${paint.name}:`,
paint.startTime
);
});

// First paint
const firstPaint =
performance.getEntriesByName(
"first-paint"
);

if (firstPaint.length > 0) {
console.log(
"First paint:",
firstPaint[0].startTime
);
}

// First contentful paint
const firstContentfulPaint =
performance.getEntriesByName(
"first-contentful-paint"
);

if (firstContentfulPaint.length > 0) {
console.log(
"First contentful paint:",
firstContentfulPaint[0].startTime
);
}

// Performance resource loading
async function loadResource(url) {
const start = performance.now();

const response = await fetch(url);

const end = performance.now();

console.log(
"Request duration:",
end - start,
"ms"
);

if (!response.ok) {
throw new Error(
`HTTP error: ${response.status}`
);
}

return response;
}

// Fetch a resource for performance inspection
loadResource(
"https://jsonplaceholder.typicode.com/todos/1"
)
.then(async (response) => {
const data = await response.json();

```
console.log(
  "Fetched data:",
  data
);
```

})
.catch((error) => {
console.error(
"Resource loading error:",
error.message
);
});

// Measure multiple operations
function performTask() {
let total = 0;

for (let index = 0; index < 500000; index++) {
total += index % 10;
}

return total;
}

performance.mark("task-start");

const taskResult = performTask();

performance.mark("task-end");

performance.measure(
"task-duration",
"task-start",
"task-end"
);

console.log(
"Task result:",
taskResult
);

console.log(
"Task performance:",
performance.getEntriesByName(
"task-duration"
)
);

// PerformanceObserver
if ("PerformanceObserver" in window) {
const observer =
new PerformanceObserver(
(list) => {
const entries =
list.getEntries();

```
    entries.forEach((entry) => {
      console.log(
        "Observed performance entry:",
        entry
      );
    });
  }
);
```

observer.observe({
entryTypes: [
"mark",
"measure",
],
});

performance.mark(
"observed-mark"
);

performance.measure(
"observed-measure",
"calculation-start",
"calculation-end"
);
}

// Resource PerformanceObserver
if ("PerformanceObserver" in window) {
const resourceObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
console.log(
"Observed resource:",
entry.name
);

```
        console.log(
          "Resource duration:",
          entry.duration
        );
      }
    );
  }
);
```

resourceObserver.observe({
type: "resource",
buffered: true,
});
}

// Navigation PerformanceObserver
if ("PerformanceObserver" in window) {
const navigationObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
console.log(
"Observed navigation:",
entry
);
}
);
}
);

navigationObserver.observe({
type: "navigation",
buffered: true,
});
}

// Paint PerformanceObserver
if ("PerformanceObserver" in window) {
const paintObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
console.log(
"Observed paint:",
entry.name,
entry.startTime
);
}
);
}
);

paintObserver.observe({
type: "paint",
buffered: true,
});
}

// Largest Contentful Paint
if ("PerformanceObserver" in window) {
try {
const lcpObserver =
new PerformanceObserver(
(list) => {
const entries =
list.getEntries();

```
      const lastEntry =
        entries[entries.length - 1];

      if (lastEntry) {
        console.log(
          "Largest Contentful Paint:",
          lastEntry.startTime
        );
      }
    }
  );

lcpObserver.observe({
  type: "largest-contentful-paint",
  buffered: true,
});
```

} catch (error) {
console.log(
"LCP observer unavailable:",
error.message
);
}
}

// Layout Shift
if ("PerformanceObserver" in window) {
try {
const clsObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
if (!entry.hadRecentInput) {
console.log(
"Layout shift:",
entry.value
);
}
}
);
}
);

```
clsObserver.observe({
  type: "layout-shift",
  buffered: true,
});
```

} catch (error) {
console.log(
"Layout shift observer unavailable:",
error.message
);
}
}

// First Input / Event Timing
if ("PerformanceObserver" in window) {
try {
const eventObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
console.log(
"Event timing:",
entry.name,
entry.duration
);
}
);
}
);

```
eventObserver.observe({
  type: "event",
  buffered: true,
});
```

} catch (error) {
console.log(
"Event timing observer unavailable:",
error.message
);
}
}

// Long task observation
if ("PerformanceObserver" in window) {
try {
const longTaskObserver =
new PerformanceObserver(
(list) => {
list.getEntries().forEach(
(entry) => {
console.log(
"Long task:",
entry.duration,
"ms"
);
}
);
}
);

```
longTaskObserver.observe({
  type: "longtask",
  buffered: true,
});
```

} catch (error) {
console.log(
"Long task observer unavailable:",
error.message
);
}
}

// Measure a timer
const timerStart = performance.now();

setTimeout(() => {
const timerEnd = performance.now();

console.log(
"Timer elapsed time:",
timerEnd - timerStart,
"ms"
);
}, 1000);

// Animation frame timing
const frameStart = performance.now();

requestAnimationFrame(
(timestamp) => {
const frameEnd = performance.now();

```
console.log(
  "Animation frame timestamp:",
  timestamp
);

console.log(
  "Frame scheduling delay:",
  frameEnd - frameStart,
  "ms"
);
```

}
);

// Performance during a loop
function benchmark(
callback,
iterations = 100000
) {
const start = performance.now();

for (
let index = 0;
index < iterations;
index++
) {
callback(index);
}

const end = performance.now();

return {
duration: end - start,
iterations,
};
}

const benchmarkResult =
benchmark((index) => {
Math.sqrt(index);
});

console.log(
"Benchmark:",
benchmarkResult
);

// Compare two operations
function slowOperation() {
let total = 0;

for (
let index = 0;
index < 1000000;
index++
) {
total += index * 2;
}

return total;
}

function fastOperation() {
const n = 1000000;

return (n * (n - 1));
}

const slowStart = performance.now();

slowOperation();

const slowEnd = performance.now();

const fastStart = performance.now();

fastOperation();

const fastEnd = performance.now();

console.log(
"Slow operation:",
slowEnd - slowStart,
"ms"
);

console.log(
"Fast operation:",
fastEnd - fastStart,
"ms"
);

// Measure DOM query performance
function measureQuerySelector() {
const start = performance.now();

document.querySelectorAll("*");

const end = performance.now();

return end - start;
}

console.log(
"querySelectorAll duration:",
measureQuerySelector(),
"ms"
);

// Visual viewport performance information
if (window.visualViewport) {
console.log(
"Visual viewport width:",
window.visualViewport.width
);

console.log(
"Visual viewport height:",
window.visualViewport.height
);

console.log(
"Visual viewport scale:",
window.visualViewport.scale
);
}

// Device performance information
console.log(
"Hardware concurrency:",
navigator.hardwareConcurrency
);

if ("deviceMemory" in navigator) {
console.log(
"Device memory:",
navigator.deviceMemory
);
}

// Performance resource summary
const resources =
performance.getEntriesByType(
"resource"
);

const resourceSummary = resources.map(
(resource) => ({
name: resource.name,
duration: resource.duration,
transferSize:
resource.transferSize,
decodedBodySize:
resource.decodedBodySize,
encodedBodySize:
resource.encodedBodySize,
})
);

console.log(
"Resource summary:",
resourceSummary
);

// Clear specific performance entries
performance.clearMarks(
"calculation-start"
);

performance.clearMarks(
"calculation-end"
);

console.log(
"Marks after cleanup:",
performance.getEntriesByType(
"mark"
)
);

// Clear specific measure
performance.clearMeasures(
"calculation-duration"
);

console.log(
"Measures after cleanup:",
performance.getEntriesByType(
"measure"
)
);

// Clear all marks and measures example
performance.mark("temporary-mark");

performance.measure(
"temporary-measure",
"temporary-mark"
);

console.log(
"Before clearing:",
performance.getEntriesByType(
"measure"
)
);

performance.clearMeasures();

performance.clearMarks();

console.log(
"After clearing marks:",
performance.getEntriesByType(
"mark"
)
);

console.log(
"After clearing measures:",
performance.getEntriesByType(
"measure"
)
);

// Performance summary
const performanceSummary = {
timeOrigin: performance.timeOrigin,
now: performance.now(),
resources:
performance.getEntriesByType(
"resource"
).length,
navigation:
performance.getEntriesByType(
"navigation"
).length,
marks:
performance.getEntriesByType(
"mark"
).length,
measures:
performance.getEntriesByType(
"measure"
).length,
};

console.log(
"Performance summary:",
performanceSummary
);
