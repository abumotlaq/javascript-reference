"use strict";

// Geolocation API availability
console.log(
"Geolocation available:",
"geolocation" in navigator
);

console.log(
"Secure context:",
window.isSecureContext
);

// Geolocation object
if ("geolocation" in navigator) {
console.log(
"Geolocation:",
navigator.geolocation
);
}

// Get current position
function getCurrentLocation() {
if (!("geolocation" in navigator)) {
console.error(
"Geolocation is not supported."
);

```
return;
```

}

navigator.geolocation.getCurrentPosition(
(position) => {
console.log(
"Position:",
position
);
},
(error) => {
console.error(
"Geolocation error:",
error.message
);
}
);
}

const locationButton =
document.querySelector(
"#location-button"
);

if (locationButton) {
locationButton.addEventListener(
"click",
getCurrentLocation
);
}

// Read coordinates
function showCoordinates(position) {
const {
latitude,
longitude,
} = position.coords;

console.log(
"Latitude:",
latitude
);

console.log(
"Longitude:",
longitude
);
}

// Get coordinates
const coordinatesButton =
document.querySelector(
"#coordinates-button"
);

if (coordinatesButton) {
coordinatesButton.addEventListener(
"click",
() => {
if (!("geolocation" in navigator)) {
return;
}

```
  navigator.geolocation.getCurrentPosition(
    showCoordinates,
    (error) => {
      console.error(
        "Location error:",
        error.message
      );
    }
  );
}
```

);
}

// Position accuracy
function showAccuracy(position) {
console.log(
"Accuracy in meters:",
position.coords.accuracy
);
}

const accuracyButton =
document.querySelector(
"#accuracy-button"
);

if (accuracyButton) {
accuracyButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
showAccuracy,
(error) => {
console.error(
"Accuracy error:",
error.message
);
}
);
}
);
}

// Full coordinate data
function showCoordinateDetails(
position
) {
const {
latitude,
longitude,
accuracy,
altitude,
altitudeAccuracy,
heading,
speed,
} = position.coords;

console.log(
"Latitude:",
latitude
);

console.log(
"Longitude:",
longitude
);

console.log(
"Accuracy:",
accuracy
);

console.log(
"Altitude:",
altitude
);

console.log(
"Altitude accuracy:",
altitudeAccuracy
);

console.log(
"Heading:",
heading
);

console.log(
"Speed:",
speed
);

console.log(
"Timestamp:",
position.timestamp
);
}

// Position options
const locationOptions = {
enableHighAccuracy: true,
timeout: 10000,
maximumAge: 30000,
};

const optionsButton =
document.querySelector(
"#options-button"
);

if (optionsButton) {
optionsButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
showCoordinateDetails,
(error) => {
console.error(
"Location options error:",
error.message
);
},
locationOptions
);
}
);
}

// Low-accuracy location request
const lowAccuracyButton =
document.querySelector(
"#low-accuracy-button"
);

if (lowAccuracyButton) {
lowAccuracyButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
showCoordinateDetails,
(error) => {
console.error(
"Low accuracy error:",
error.message
);
},
{
enableHighAccuracy: false,
timeout: 5000,
maximumAge: 60000,
}
);
}
);
}

// Handle geolocation error codes
function handleGeolocationError(
error
) {
switch (error.code) {
case error.PERMISSION_DENIED:
console.error(
"Location permission was denied."
);
break;

```
case error.POSITION_UNAVAILABLE:
  console.error(
    "Location information is unavailable."
  );
  break;

case error.TIMEOUT:
  console.error(
    "Location request timed out."
  );
  break;

default:
  console.error(
    "Unknown geolocation error."
  );
```

}
}

const errorHandlingButton =
document.querySelector(
"#error-handling-button"
);

if (errorHandlingButton) {
errorHandlingButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
showCoordinateDetails,
handleGeolocationError
);
}
);
}

// Watch position
let watchId = null;

function startWatchingLocation() {
if (!("geolocation" in navigator)) {
console.error(
"Geolocation is not supported."
);

```
return;
```

}

if (watchId !== null) {
return;
}

watchId =
navigator.geolocation.watchPosition(
(position) => {
console.log(
"Updated latitude:",
position.coords.latitude
);

```
    console.log(
      "Updated longitude:",
      position.coords.longitude
    );

    console.log(
      "Updated accuracy:",
      position.coords.accuracy
    );
  },
  (error) => {
    console.error(
      "Watch error:",
      error.message
    );
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 5000,
  }
);
```

console.log(
"Watch ID:",
watchId
);
}

const startWatchButton =
document.querySelector(
"#start-watch"
);

if (startWatchButton) {
startWatchButton.addEventListener(
"click",
startWatchingLocation
);
}

// Stop watching position
function stopWatchingLocation() {
if (watchId === null) {
return;
}

navigator.geolocation.clearWatch(
watchId
);

watchId = null;

console.log(
"Location watch stopped."
);
}

const stopWatchButton =
document.querySelector(
"#stop-watch"
);

if (stopWatchButton) {
stopWatchButton.addEventListener(
"click",
stopWatchingLocation
);
}

// Location state
let currentLocation = null;

function updateCurrentLocation(
position
) {
currentLocation = {
latitude: position.coords.latitude,
longitude: position.coords.longitude,
accuracy: position.coords.accuracy,
timestamp: position.timestamp,
};

console.log(
"Current location:",
currentLocation
);
}

const stateButton =
document.querySelector(
"#location-state"
);

if (stateButton) {
stateButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
updateCurrentLocation,
handleGeolocationError
);
}
);
}

// Render location information
const locationOutput =
document.querySelector(
"#location-output"
);

function renderLocation(
position
) {
if (!locationOutput) {
return;
}

const {
latitude,
longitude,
accuracy,
} = position.coords;

locationOutput.textContent =
`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}m`;
}

const renderButton =
document.querySelector(
"#render-location"
);

if (renderButton) {
renderButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
renderLocation,
handleGeolocationError
);
}
);
}

// Check permission state
if ("permissions" in navigator) {
navigator.permissions
.query({
name: "geolocation",
})
.then((permission) => {
console.log(
"Geolocation permission:",
permission.state
);

```
  permission.addEventListener(
    "change",
    () => {
      console.log(
        "Geolocation permission changed:",
        permission.state
      );
    }
  );
})
.catch((error) => {
  console.error(
    "Permission query error:",
    error.message
  );
});
```

}

// Location request helper
function requestLocation(options = {}) {
return new Promise(
(resolve, reject) => {
if (!("geolocation" in navigator)) {
reject(
new Error(
"Geolocation is not supported."
)
);

```
    return;
  }

  navigator.geolocation.getCurrentPosition(
    resolve,
    reject,
    options
  );
}
```

);
}

// Promise-based location request
const promiseButton =
document.querySelector(
"#promise-location"
);

if (promiseButton) {
promiseButton.addEventListener(
"click",
async () => {
try {
const position =
await requestLocation({
enableHighAccuracy: true,
timeout: 10000,
maximumAge: 30000,
});

```
    console.log(
      "Promise position:",
      position
    );
  } catch (error) {
    console.error(
      "Promise location error:",
      error.message
    );
  }
}
```

);
}

// Async location helper
async function getLocation() {
const position =
await requestLocation();

return {
latitude:
position.coords.latitude,
longitude:
position.coords.longitude,
accuracy:
position.coords.accuracy,
};
}

const asyncLocationButton =
document.querySelector(
"#async-location"
);

if (asyncLocationButton) {
asyncLocationButton.addEventListener(
"click",
async () => {
try {
const location =
await getLocation();

```
    console.log(
      "Async location:",
      location
    );
  } catch (error) {
    console.error(
      "Async location error:",
      error.message
    );
  }
}
```

);
}

// Calculate distance using Haversine formula
function toRadians(degrees) {
return (
degrees * (Math.PI / 180)
);
}

function calculateDistance(
latitude1,
longitude1,
latitude2,
longitude2
) {
const earthRadius = 6371000;

const lat1 = toRadians(latitude1);
const lat2 = toRadians(latitude2);

const deltaLat = toRadians(
latitude2 - latitude1
);

const deltaLongitude = toRadians(
longitude2 - longitude1
);

const a =
Math.sin(deltaLat / 2) ** 2 +
Math.cos(lat1) *
Math.cos(lat2) *
Math.sin(
deltaLongitude / 2
) **
2;

const c =
2 *
Math.atan2(
Math.sqrt(a),
Math.sqrt(1 - a)
);

return (
earthRadius * c
);
}

const distance = calculateDistance(
31.5,
34.5,
31.6,
34.6
);

console.log(
"Distance in meters:",
distance
);

// Compare current location with a reference point
const compareButton =
document.querySelector(
"#compare-location"
);

if (compareButton) {
compareButton.addEventListener(
"click",
async () => {
try {
const position =
await requestLocation();

```
    const distanceFromReference =
      calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        31.5,
        34.5
      );

    console.log(
      "Distance from reference:",
      distanceFromReference
    );
  } catch (error) {
    console.error(
      "Comparison error:",
      error.message
    );
  }
}
```

);
}

// Check whether a location is reasonably accurate
function isAccurateEnough(
position,
maximumAccuracy
) {
return (
position.coords.accuracy <=
maximumAccuracy
);
}

const accuracyCheckButton =
document.querySelector(
"#accuracy-check"
);

if (accuracyCheckButton) {
accuracyCheckButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
(position) => {
const accurate =
isAccurateEnough(
position,
100
);

```
      console.log(
        "Accurate enough:",
        accurate
      );
    },
    handleGeolocationError
  );
}
```

);
}

// Save location temporarily
let lastKnownLocation = null;

function saveLastKnownLocation(
position
) {
lastKnownLocation = {
latitude:
position.coords.latitude,
longitude:
position.coords.longitude,
accuracy:
position.coords.accuracy,
timestamp:
position.timestamp,
};

console.log(
"Last known location:",
lastKnownLocation
);
}

const saveLocationButton =
document.querySelector(
"#save-location"
);

if (saveLocationButton) {
saveLocationButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
saveLastKnownLocation,
handleGeolocationError,
{
maximumAge: 30000,
}
);
}
);
}

// Read last known location
const readLocationButton =
document.querySelector(
"#read-location"
);

if (readLocationButton) {
readLocationButton.addEventListener(
"click",
() => {
console.log(
"Last known location:",
lastKnownLocation
);
}
);
}

// Position timestamp
function showPositionTime(
position
) {
const date = new Date(
position.timestamp
);

console.log(
"Position timestamp:",
position.timestamp
);

console.log(
"Position date:",
date.toISOString()
);
}

const timestampButton =
document.querySelector(
"#position-time"
);

if (timestampButton) {
timestampButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
showPositionTime,
handleGeolocationError
);
}
);
}

// Final geolocation capability snapshot
const geolocationSnapshot = {
supported:
"geolocation" in navigator,
secureContext:
window.isSecureContext,
permissionApi:
"permissions" in navigator,
};

console.log(
"Geolocation snapshot:",
geolocationSnapshot
);
