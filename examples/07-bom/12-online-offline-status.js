"use strict";

// Current online status
console.log(
"Online:",
navigator.onLine
);

// Basic online check
if (navigator.onLine) {
console.log("Osama Abu Motlaq is currently online.");
} else {
console.log("Osama Abu Motlaq is currently offline.");
}

// online event
window.addEventListener("online", () => {
console.log("Browser is online.");
});

// offline event
window.addEventListener("offline", () => {
console.log("Browser is offline.");
});

// Connection status helper
function getConnectionStatus() {
return navigator.onLine
? "online"
: "offline";
}

console.log(
"Connection status:",
getConnectionStatus()
);

// Connection status object
function getNetworkState() {
return {
online: navigator.onLine,
status: navigator.onLine
? "online"
: "offline",
};
}

console.log(
"Network state:",
getNetworkState()
);

// Update a status element
const statusElement =
document.querySelector("#network-status");

function updateNetworkStatus() {
if (!statusElement) {
return;
}

statusElement.textContent =
navigator.onLine
? "Online"
: "Offline";

statusElement.dataset.status =
navigator.onLine
? "online"
: "offline";
}

updateNetworkStatus();

window.addEventListener(
"online",
updateNetworkStatus
);

window.addEventListener(
"offline",
updateNetworkStatus
);

// Toggle CSS classes
const statusIndicator =
document.querySelector(
"#status-indicator"
);

function updateStatusIndicator() {
if (!statusIndicator) {
return;
}

statusIndicator.classList.toggle(
"online",
navigator.onLine
);

statusIndicator.classList.toggle(
"offline",
!navigator.onLine
);
}

updateStatusIndicator();

window.addEventListener(
"online",
updateStatusIndicator
);

window.addEventListener(
"offline",
updateStatusIndicator
);

// Connection state history
const connectionHistory = [];

function recordConnectionState() {
connectionHistory.push({
status: navigator.onLine
? "online"
: "offline",
timestamp: new Date().toISOString(),
});

console.log(
"Connection history:",
connectionHistory
);
}

recordConnectionState();

window.addEventListener(
"online",
recordConnectionState
);

window.addEventListener(
"offline",
recordConnectionState
);

// Track number of online/offline changes
let onlineEvents = 0;
let offlineEvents = 0;

window.addEventListener(
"online",
() => {
onlineEvents++;

```
console.log(
  "Online events:",
  onlineEvents
);
```

}
);

window.addEventListener(
"offline",
() => {
offlineEvents++;

```
console.log(
  "Offline events:",
  offlineEvents
);
```

}
);

// Network-aware message
function showNetworkMessage() {
if (navigator.onLine) {
console.log(
"Network available. Requests can be attempted."
);
} else {
console.log(
"Network unavailable. Wait before sending requests."
);
}
}

showNetworkMessage();

window.addEventListener(
"online",
showNetworkMessage
);

window.addEventListener(
"offline",
showNetworkMessage
);

// Network-aware button
const requestButton =
document.querySelector(
"#request-button"
);

function updateRequestButton() {
if (!requestButton) {
return;
}

requestButton.disabled =
!navigator.onLine;
}

updateRequestButton();

window.addEventListener(
"online",
updateRequestButton
);

window.addEventListener(
"offline",
updateRequestButton
);

// Check connectivity before a request
async function fetchData(url) {
if (!navigator.onLine) {
throw new Error(
"Browser reports an offline state."
);
}

const response = await fetch(url);

if (!response.ok) {
throw new Error(
`HTTP error: ${response.status}`
);
}

return response.json();
}

fetchData(
"https://jsonplaceholder.typicode.com/todos/1"
)
.then((data) => {
console.log(
"Fetched data:",
data
);
})
.catch((error) => {
console.error(
"Request failed:",
error.message
);
});

// Handle actual network failures
async function checkServer() {
try {
const response = await fetch(
"https://jsonplaceholder.typicode.com/todos/1"
);

```
if (!response.ok) {
  throw new Error(
    `HTTP error: ${response.status}`
  );
}

console.log(
  "Server request succeeded."
);
```

} catch (error) {
console.error(
"Server request failed:",
error.message
);
}
}

checkServer();

// Health check helper
async function checkConnectivity(url) {
try {
const response = await fetch(url, {
method: "HEAD",
cache: "no-store",
});

```
return response.ok;
```

} catch {
return false;
}
}

checkConnectivity(
"https://example.com"
).then((isReachable) => {
console.log(
"Server reachable:",
isReachable
);
});

// Online event with health check
window.addEventListener(
"online",
async () => {
const isReachable =
await checkConnectivity(
"https://example.com"
);

```
console.log(
  "Server reachable after online event:",
  isReachable
);
```

}
);

// Retry when connectivity returns
let shouldRetry = false;

function markForRetry() {
shouldRetry = true;

console.log(
"Operation marked for retry."
);
}

window.addEventListener(
"offline",
() => {
markForRetry();
}
);

window.addEventListener(
"online",
() => {
if (!shouldRetry) {
return;
}

```
console.log(
  "Connection restored. Retry can begin."
);

shouldRetry = false;
```

}
);

// Simple connectivity manager
const networkManager = {
online: navigator.onLine,

update() {
this.online = navigator.onLine;

```
console.log(
  "Network manager:",
  this.online
    ? "online"
    : "offline"
);
```

},

start() {
window.addEventListener(
"online",
this.update.bind(this)
);

```
window.addEventListener(
  "offline",
  this.update.bind(this)
);
```

},
};

console.log(
"Network manager state:",
networkManager.online
);

// navigator.connection
if ("connection" in navigator) {
const connection =
navigator.connection;

console.log(
"Effective connection type:",
connection.effectiveType
);

console.log(
"Downlink:",
connection.downlink
);

console.log(
"RTT:",
connection.rtt
);

console.log(
"Save data:",
connection.saveData
);
}

// Network information changes
if ("connection" in navigator) {
navigator.connection.addEventListener(
"change",
() => {
const connection =
navigator.connection;

```
  console.log(
    "Connection changed:"
  );

  console.log(
    "Effective type:",
    connection.effectiveType
  );

  console.log(
    "Downlink:",
    connection.downlink
  );

  console.log(
    "RTT:",
    connection.rtt
  );

  console.log(
    "Save data:",
    connection.saveData
  );
}
```

);
}

// Manual status check button
const checkButton =
document.querySelector(
"#check-network"
);

if (checkButton) {
checkButton.addEventListener(
"click",
() => {
console.log(
"Current network status:",
navigator.onLine
? "online"
: "offline"
);
}
);
}

// Status text with timestamp
const detailedStatus =
document.querySelector(
"#detailed-network-status"
);

function renderDetailedStatus() {
if (!detailedStatus) {
return;
}

const status =
navigator.onLine
? "Online"
: "Offline";

detailedStatus.textContent =
`${status} — ${new Date().toLocaleTimeString()}`;
}

renderDetailedStatus();

window.addEventListener(
"online",
renderDetailedStatus
);

window.addEventListener(
"offline",
renderDetailedStatus
);

// Cleanup example
function handleConnectionChange() {
console.log(
"Connection changed."
);
}

window.addEventListener(
"online",
handleConnectionChange
);

window.addEventListener(
"offline",
handleConnectionChange
);

// Example cleanup function
function removeConnectionListeners() {
window.removeEventListener(
"online",
handleConnectionChange
);

window.removeEventListener(
"offline",
handleConnectionChange
);
}

const cleanupButton =
document.querySelector(
"#cleanup-network-listeners"
);

if (cleanupButton) {
cleanupButton.addEventListener(
"click",
() => {
removeConnectionListeners();

```
  console.log(
    "Network listeners removed."
  );
}
```

);
}

// Final network snapshot
const networkSnapshot = {
online: navigator.onLine,
status: navigator.onLine
? "online"
: "offline",
timestamp: new Date().toISOString(),
};

console.log(
"Network snapshot:",
networkSnapshot
);
