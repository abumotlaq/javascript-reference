# Geolocation API

The Geolocation API allows a web application to request the user's geographic location through the browser.

Typical information can include:

* Latitude
* Longitude
* Accuracy
* Altitude
* Altitude accuracy
* Heading
* Speed

The main browser API is:

```js id="e1xq7p"
navigator.geolocation
```

The most important methods are:

```js id="0n4k8x"
getCurrentPosition()
watchPosition()
clearWatch()
```

A simple example:

```js id="k8x3m2"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }
);
```

Geolocation is a privacy-sensitive API.

The browser normally asks the user for permission before exposing location information to a website.

---

# 1. Why the Geolocation API Exists

Applications sometimes need to know where the user is located to provide location-aware functionality.

Examples include:

* Maps
* Nearby businesses
* Delivery applications
* Navigation
* Weather
* Location-based search
* Distance calculations
* Geofencing-like experiences
* Fitness applications

The browser provides the API so that websites do not need to implement direct access to GPS hardware themselves.

Conceptually:

```text id="j7k3r1"
Web Application
      ↓
Browser Geolocation API
      ↓
Browser / Operating System
      ↓
Available location sources
      ↓
Location result
```

The actual location source can vary by device and environment.

---

# 2. Accessing `navigator.geolocation`

Check whether the API exists:

```js id="n9u2p6"
if ("geolocation" in navigator) {
  console.log("Geolocation is supported.");
}
```

Or:

```js id="m4v8c1"
if (navigator.geolocation) {
  console.log("Geolocation is available.");
}
```

Feature detection is preferable to assuming the API always exists.

---

# 3. Geolocation Is Browser-Only

The Geolocation API belongs to the browser environment.

For example:

```js id="q6b4p0"
navigator.geolocation
```

requires a browser context.

It is not a server-side API for discovering the user's physical location.

This distinction is especially important in Next.js.

---

# 4. `getCurrentPosition()`

Use `getCurrentPosition()` when you need the user's current location once.

## Basic syntax

```js id="f4h8r2"
navigator.geolocation.getCurrentPosition(
  successCallback
);
```

Example:

```js id="r8x2m7"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  }
);
```

The browser may ask the user for permission.

---

# 5. Success Callback

The success callback receives a `GeolocationPosition` object.

Example:

```js id="c3v7k1"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords);
  }
);
```

The important property is:

```js id="w9p2s4"
position.coords
```

which contains location information.

---

# 6. `position.coords`

Common coordinate properties include:

```text id="k5r8d3"
latitude
longitude
accuracy
altitude
altitudeAccuracy
heading
speed
```

Example:

```js id="j2m7q9"
navigator.geolocation.getCurrentPosition(
  (position) => {
    const {
      latitude,
      longitude,
      accuracy,
    } = position.coords;

    console.log(latitude);
    console.log(longitude);
    console.log(accuracy);
  }
);
```

---

# 7. Latitude

Latitude describes the position north or south of the Equator.

Its range is:

```text id="v6c4n1"
-90 to 90
```

Examples:

```text id="d8q2m5"
0
```

represents the Equator.

Positive values indicate locations north of the Equator.

Negative values indicate locations south of the Equator.

---

# 8. Longitude

Longitude describes the position east or west of the Prime Meridian.

Its range is:

```text id="a4y8p2"
-180 to 180
```

Positive values generally represent east.

Negative values generally represent west.

Together:

```text id="x9k3m7"
latitude + longitude
```

identify a geographic coordinate.

---

# 9. Accuracy

The `accuracy` property is especially important.

```js id="r4h8z2"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(
      position.coords.accuracy
    );
  }
);
```

The value represents an estimated accuracy radius in meters.

For example:

```text id="p2k7v9"
accuracy: 25
```

means the reported position is estimated to be within roughly 25 meters of the actual position, under the browser/device's location model.

It does not mean:

```text id="s6n1x4"
The coordinate is exactly 25 meters wrong.
```

It is an accuracy estimate.

---

# 10. Accuracy Is Not a Guarantee

Consider:

```js id="c7m5q2"
console.log(
  position.coords.accuracy
);
```

A lower number generally represents a more precise estimate.

For example:

```text id="h9p3v6"
10 meters
```

is more precise than:

```text id="w5k8c2"
500 meters
```

But neither should be interpreted as an absolute guarantee.

Location systems are estimates.

---

# 11. Altitude

The API may provide:

```js id="y7r2n5"
position.coords.altitude
```

This represents altitude information when available.

It can be:

```js id="d3k8p1"
null
```

when unavailable.

Applications should not assume altitude is always provided.

---

# 12. Altitude Accuracy

Similarly:

```js id="m8q4v2"
position.coords.altitudeAccuracy
```

provides an accuracy estimate for altitude.

It may be:

```js id="b6p1x9"
null
```

when the device cannot provide appropriate altitude information.

---

# 13. Heading

The API may provide:

```js id="z4n7c2"
position.coords.heading
```

The value represents the direction of travel in degrees when meaningful and available.

It may be:

```js id="r8m2q5"
null
```

when the device cannot determine a heading.

Do not interpret a missing heading as an error.

It can simply mean the information is unavailable or not applicable.

---

# 14. Speed

The API may provide:

```js id="t3k9x1"
position.coords.speed
```

which represents estimated speed in meters per second when available.

It may also be:

```js id="u6v4p8"
null
```

when speed cannot be determined.

Again, availability depends on the device and location source.

---

# 15. `position.timestamp`

The position object also includes a timestamp:

```js id="c2y7m4"
position.timestamp
```

Example:

```js id="m6p3r8"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(
      new Date(
        position.timestamp
      )
    );
  }
);
```

This helps the application understand when the reported location was associated with the measurement.

---

# 16. Basic Complete Example

```js id="q8m4v1"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    });
  }
);
```

This is a good starting point for understanding the API.

---

# 17. Error Callback

Location access may fail.

Use an error callback:

```js id="h4c7n2"
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  (error) => {
    console.error(error);
  }
);
```

The error object is a `GeolocationPositionError`.

---

# 18. `GeolocationPositionError`

The error object exposes:

```js id="v8m2q5"
error.code
error.message
```

The important code values are:

```text id="z6p4c9"
1 → PERMISSION_DENIED
2 → POSITION_UNAVAILABLE
3 → TIMEOUT
```

It is better to use the constants provided by the API when writing explicit comparisons.

---

# 19. `PERMISSION_DENIED`

The permission was denied.

Example:

```js id="x4n7m2"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  (error) => {
    if (
      error.code ===
      GeolocationPositionError.PERMISSION_DENIED
    ) {
      console.log(
        "Location permission was denied."
      );
    }
  }
);
```

This can happen because:

* the user denied the request
* the browser blocked access
* a permission policy prevents access

Your application should handle this gracefully.

---

# 20. `POSITION_UNAVAILABLE`

The browser could not determine a usable position.

Example:

```js id="q2k8v5"
(error) => {
  if (
    error.code ===
    GeolocationPositionError.POSITION_UNAVAILABLE
  ) {
    console.log(
      "Position is currently unavailable."
    );
  }
}
```

Possible causes can include environmental or device-level location problems.

The application should not assume that the user did anything wrong.

---

# 21. `TIMEOUT`

The location request exceeded the allowed time.

Example:

```js id="p7m3x9"
(error) => {
  if (
    error.code ===
    GeolocationPositionError.TIMEOUT
  ) {
    console.log(
      "Location request timed out."
    );
  }
}
```

A timeout does not necessarily mean location is permanently unavailable.

It may simply mean the requested operation did not complete within the specified period.

---

# 22. Error Handling Example

A practical handler:

```js id="w9k2c4"
function handleGeolocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log(
        "Location permission was denied."
      );
      break;

    case error.POSITION_UNAVAILABLE:
      console.log(
        "Location information is unavailable."
      );
      break;

    case error.TIMEOUT:
      console.log(
        "The location request timed out."
      );
      break;

    default:
      console.log(
        "An unknown location error occurred."
      );
  }
}
```

Then:

```js id="g5v8n1"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleGeolocationError
);
```

---

# 23. `GeolocationPositionError` Constants

You can use:

```js id="m4q7c2"
GeolocationPositionError.PERMISSION_DENIED
GeolocationPositionError.POSITION_UNAVAILABLE
GeolocationPositionError.TIMEOUT
```

This is clearer than using magic numbers such as:

```js id="r8n3p5"
if (error.code === 1) {
  // ...
}
```

Prefer named constants when available.

---

# 24. Browser Permission

Geolocation is permission-sensitive.

When a page requests location, the browser may display a permission prompt.

Conceptually:

```text id="u2m7v9"
Website requests location
        ↓
Browser checks permission
        ↓
Permission prompt
        ↓
User decides
        ↓
Location result or error
```

The user controls whether the site gets permission.

---

# 25. Permission Should Be Requested at the Right Time

Avoid requesting location immediately just because the page loaded.

For example:

```js id="f7p3k8"
window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(...);
});
```

may create unnecessary friction.

A better pattern is often:

```text id="m3x8q6"
User selects:
"Use my location"
        ↓
Request location
```

This gives the user context for why the application needs the permission.

---

# 26. Explain Why Location Is Needed

A good UI might say:

```text id="v5n2c7"
Use your location to find nearby projects.
[Use my location]
```

This is better than unexpectedly opening a browser permission prompt without explanation.

Permission decisions are more understandable when users know the purpose.

---

# 27. Secure Context Requirement

Geolocation is generally restricted to secure contexts.

Production applications should use:

```text id="k6p4z1"
HTTPS
```

Local development environments such as `localhost` can receive special treatment by browser security rules.

Do not assume arbitrary insecure HTTP pages can use Geolocation normally.

---

# 28. `window.isSecureContext`

You can inspect:

```js id="a8m3v6"
window.isSecureContext
```

Example:

```js id="x3q7c5"
if (!window.isSecureContext) {
  console.log(
    "Geolocation may be unavailable because the context is not secure."
  );
}
```

This can help diagnose development or deployment issues.

---

# 29. `getCurrentPosition()` Options

The third argument can be an options object:

```js id="h7p2m4"
navigator.geolocation.getCurrentPosition(
  success,
  error,
  options
);
```

Common options are:

```js id="c5v9k1"
{
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
}
```

These values influence how the browser handles the request.

---

# 30. `enableHighAccuracy`

Example:

```js id="y4m7q2"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleError,
  {
    enableHighAccuracy: true,
  }
);
```

This asks the browser to attempt to obtain a more accurate position.

However, higher accuracy can involve:

* more power consumption
* slower acquisition
* greater device resource usage

Do not enable it automatically for every application.

---

# 31. High Accuracy Is a Preference, Not a Guarantee

This:

```js id="g8p3x5"
enableHighAccuracy: true
```

does not mean:

```text id="s4q7m2"
The result will definitely be GPS-level accurate.
```

It communicates a preference for improved accuracy when possible.

The actual result depends on the device and available location sources.

---

# 32. `timeout`

You can limit how long the browser should wait.

Example:

```js id="r5v8c3"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleError,
  {
    timeout: 10000,
  }
);
```

This requests a timeout of:

```text id="q2m6p9"
10,000 milliseconds
```

If the operation does not complete in time, the error callback can receive a timeout error.

---

# 33. Why Timeouts Matter

Without a sensible timeout, your application may leave the user waiting longer than necessary.

For interactive UI, it is often better to have a defined strategy:

```text id="m8c4v1"
Request
  ↓
Wait reasonable amount of time
  ↓
Success or failure
```

The appropriate value depends on the feature.

---

# 34. `maximumAge`

The `maximumAge` option specifies how old a cached position can be for the browser to consider it acceptable.

Example:

```js id="k7p2m5"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleError,
  {
    maximumAge: 60000,
  }
);
```

This allows a cached location that is up to approximately one minute old to be considered.

---

# 35. `maximumAge: 0`

This is the common default-style meaning:

```js id="t3v9x6"
maximumAge: 0
```

The application is asking not to accept an older cached position as the intended result.

This does not guarantee a completely fresh physical measurement in every implementation scenario.

---

# 36. `maximumAge: Infinity`

Using:

```js id="h5c8q1"
maximumAge: Infinity
```

allows the browser to use a cached position regardless of its age, subject to the API's behavior.

This can reduce the need to obtain a new location.

It may be appropriate when approximate or previously known location is acceptable.

---

# 37. Combining Options

Example:

```js id="j2m8v5"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleError,
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000,
  }
);
```

This asks for:

* higher accuracy when possible
* up to 10 seconds of waiting
* a cached location no older than approximately 30 seconds

These are preferences and constraints, not guarantees about hardware behavior.

---

# 38. Choosing Geolocation Options

A useful guide:

| Requirement                  | Typical Preference                     |
| ---------------------------- | -------------------------------------- |
| Nearby city-level experience | Lower accuracy may be sufficient       |
| Map pin                      | Moderate accuracy                      |
| Walking navigation           | Higher accuracy may be useful          |
| Battery-sensitive app        | Avoid unnecessary high accuracy        |
| Real-time tracking           | Use watch mode carefully               |
| Fast startup                 | Reasonable timeout and cache tolerance |

The correct settings depend on the product.

---

# 39. `watchPosition()`

Use `watchPosition()` when your application needs ongoing location updates.

Example:

```js id="b5n2x8"
const watchId =
  navigator.geolocation.watchPosition(
    (position) => {
      console.log(
        position.coords.latitude
      );

      console.log(
        position.coords.longitude
      );
    }
  );
```

The browser can invoke the callback as location information changes.

---

# 40. Return Value of `watchPosition()`

`watchPosition()` returns an identifier.

```js id="m7q3c1"
const watchId =
  navigator.geolocation.watchPosition(
    handleSuccess,
    handleError
  );
```

That identifier is used to stop watching.

---

# 41. `clearWatch()`

Use:

```js id="x4p8v2"
navigator.geolocation.clearWatch(
  watchId
);
```

Example:

```js id="t6m2k9"
const watchId =
  navigator.geolocation.watchPosition(
    handleSuccess,
    handleError
  );

navigator.geolocation.clearWatch(
  watchId
);
```

Once cleared, the watch is cancelled.

---

# 42. Why `clearWatch()` Matters

Continuous location tracking can consume:

* battery
* CPU
* network resources
* device location resources

Therefore, do not keep a location watch active when the application no longer needs it.

This is particularly important on mobile devices.

---

# 43. `getCurrentPosition()` vs `watchPosition()`

| Feature        | `getCurrentPosition()` | `watchPosition()`   |
| -------------- | ---------------------- | ------------------- |
| Purpose        | One location result    | Repeated updates    |
| Return         | No watch ID            | Watch ID            |
| Cleanup        | Not needed for a watch | `clearWatch()`      |
| Typical use    | Nearby search          | Navigation/tracking |
| Resource usage | Lower                  | Potentially higher  |

Use the simplest API that matches the requirement.

---

# 44. Tracking Should Be User-Initiated

Location tracking can be sensitive.

A good UI makes it obvious when tracking is active:

```text id="a7m3q2"
Location tracking is ON
[Stop tracking]
```

Do not hide continuous tracking from the user.

---

# 45. React and `watchPosition()`

A React component may create a location watch in an effect.

Example:

```jsx id="g4q8m1"
import { useEffect } from "react";

function LocationTracker() {
  useEffect(() => {
    const watchId =
      navigator.geolocation.watchPosition(
        (position) => {
          console.log(position.coords);
        },
        (error) => {
          console.error(error);
        }
      );

    return () => {
      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, []);

  return null;
}
```

The cleanup is essential.

---

# 46. React State with Geolocation

A simple location state model:

```jsx id="v7m2c9"
const [location, setLocation] =
  useState(null);
```

Then:

```js id="n3x8p5"
navigator.geolocation.getCurrentPosition(
  (position) => {
    setLocation({
      latitude:
        position.coords.latitude,
      longitude:
        position.coords.longitude,
      accuracy:
        position.coords.accuracy,
    });
  }
);
```

Now React can render the location.

---

# 47. Complete React Example

```jsx id="c5k9m2"
"use client";

import { useState } from "react";

export default function LocationButton() {
  const [location, setLocation] =
    useState(null);

  const [error, setError] =
    useState(null);

  function handleGetLocation() {
    setError(null);

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude:
            position.coords.latitude,
          longitude:
            position.coords.longitude,
          accuracy:
            position.coords.accuracy,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  }

  return (
    <div>
      <button onClick={handleGetLocation}>
        Use my location
      </button>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {location && (
        <pre>
          {JSON.stringify(
            location,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}
```

This demonstrates a user-initiated location request.

---

# 48. Why User-Initiated Geolocation Works Well in React

The flow is simple:

```text id="v4c8m2"
User clicks button
        ↓
React event handler
        ↓
navigator.geolocation
        ↓
Permission check
        ↓
Success / error
        ↓
setState
        ↓
React re-render
```

This maps naturally onto React's event and state model.

---

# 49. Avoid Requesting Location During Every Render

Do not put:

```js id="a8m3v7"
navigator.geolocation.getCurrentPosition(...)
```

directly in the component body.

React components can render multiple times.

That could result in repeated permission-related operations or unnecessary requests.

Use an explicit event handler or a carefully managed effect when appropriate.

---

# 50. Geolocation in `useEffect`

An effect can request location on component mount:

```jsx id="p6m2x9"
useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    handleSuccess,
    handleError
  );
}, []);
```

However, this may immediately trigger a permission prompt when the component appears.

Whether this is good UX depends on the product.

For many applications, an explicit button is better.

---

# 51. React Strict Mode Consideration

In development, React may exercise effect setup and cleanup more than once.

If an effect starts a location watch:

```jsx id="s4m8q1"
useEffect(() => {
  const watchId =
    navigator.geolocation.watchPosition(...);

  return () => {
    navigator.geolocation.clearWatch(
      watchId
    );
  };
}, []);
```

proper cleanup is essential.

Without cleanup, multiple watches could be created during development and in other lifecycle scenarios.

---

# 52. Next.js and Geolocation

Geolocation is browser-only.

A Next.js component that uses:

```js id="e2m7p4"
navigator.geolocation
```

must run on the client.

Example:

```jsx id="k8v3c6"
"use client";

export default function LocationButton() {
  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
      }
    );
  }

  return (
    <button onClick={handleLocation}>
      Get location
    </button>
  );
}
```

---

# 53. Do Not Use Geolocation in Server Components

A server component cannot ask:

```js id="q3m8v1"
navigator.geolocation
```

for the user's device position.

The server does not have direct access to the browser's Geolocation API.

The correct architecture is:

```text id="r5c2m7"
Browser
   ↓
Client Component
   ↓
Geolocation API
   ↓
Coordinates
   ↓
API request
   ↓
Server
```

---

# 54. Sending Coordinates to a Backend

Once the browser obtains coordinates, the application can send them to its server.

Example:

```js id="j7m4c9"
const response = await fetch(
  "/api/location",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  }
);
```

The server can then use the coordinates according to the application's business logic.

---

# 55. Validate Coordinates on the Server

Never trust coordinates simply because the browser produced them.

A malicious client can send:

```json id="s72l4x"
{
  "latitude": 999,
  "longitude": 999
}
```

or any other arbitrary values.

The server should validate:

```text id="3v7m2q"
latitude ∈ [-90, 90]
longitude ∈ [-180, 180]
```

and apply application-specific rules.

---

# 56. Geolocation Is Client Data

The browser provides the coordinates, but the server must treat them as user-provided input.

This follows a general full-stack principle:

```text id="d6m8p2"
Client validation
      ↓
Good UX

Server validation
      ↓
Trust boundary
```

Client-side validation does not create security.

---

# 57. Calculating Distance

Geolocation coordinates are often used to calculate distance between two points.

Because latitude and longitude lie on the Earth's surface, simple Cartesian distance is not generally appropriate for large geographic distances.

A common technique is the Haversine formula.

---

# 58. Haversine Formula

Given:

```text id="y3m8c5"
lat1, lon1
lat2, lon2
```

convert degrees to radians and calculate:

```js id="q8v2n4"
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const earthRadiusKm = 6371;

  const dLat = toRadians(
    lat2 - lat1
  );

  const dLon = toRadians(
    lon2 - lon1
  );

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}
```

The result is approximately in kilometers.

---

# 59. Distance Example

```js id="z4m7p2"
const distance =
  calculateDistance(
    31.5,
    34.47,
    31.52,
    34.48
  );

console.log(
  `${distance.toFixed(2)} km`
);
```

The exact interpretation depends on the input coordinates and the model used.

The example demonstrates the general calculation pattern.

---

# 60. Geolocation and Maps

Geolocation itself does not display a map.

It only provides geographic data.

You can combine it with a mapping service:

```text id="j5v9c3"
Geolocation API
      ↓
latitude + longitude
      ↓
Map library/service
      ↓
Map marker
```

The mapping layer is separate from the browser Geolocation API.

---

# 61. Geolocation and Reverse Geocoding

Coordinates such as:

```text id="h2m7x4"
31.xxxx, 34.xxxx
```

are not an address.

A separate reverse-geocoding service can convert coordinates into information such as:

```text id="r6c3p8"
city
region
country
street
```

This normally requires another API or service.

The Geolocation API itself does not perform reverse geocoding.

---

# 62. Geolocation and Forward Geocoding

The reverse operation is:

```text id="q8m4v2"
Address
   ↓
latitude + longitude
```

This is called forward geocoding and also requires a geocoding service.

Geolocation and geocoding are related but different concepts.

---

# 63. Nearby Search

A common application flow:

```text id="v3n7c1"
User clicks "Nearby"
        ↓
Request location
        ↓
Get latitude + longitude
        ↓
Send coordinates to API
        ↓
Backend finds nearby records
        ↓
Display results
```

This is a common full-stack JavaScript use case.

---

# 64. Location-Based Filtering

Suppose an API supports:

```text id="m8c5v2"
/api/stores?lat=...&lng=...&radius=10
```

The browser can construct the URL:

```js id="b2q7n4"
const url = new URL(
  "/api/stores",
  window.location.origin
);

url.searchParams.set(
  "lat",
  String(latitude)
);

url.searchParams.set(
  "lng",
  String(longitude)
);

url.searchParams.set(
  "radius",
  "10"
);
```

This combines:

* Geolocation
* URLSearchParams
* Fetch/API requests

---

# 65. Geolocation and Permissions API

The Permissions API can sometimes be used to inspect geolocation permission state:

```js id="t4m8c2"
const permission =
  await navigator.permissions.query({
    name: "geolocation",
  });

console.log(permission.state);
```

Possible states include:

```text id="x7p3m5"
granted
denied
prompt
```

Browser behavior and supported permission details can vary.

---

# 66. Permission State Is Not the Same as Location

A permission state tells you something about access.

It does not give you the user's coordinates.

For example:

```text id="n5c8m2"
permission.state
```

may be:

```text id="v7p2q4"
granted
```

but you still need:

```js id="r3m8c5"
navigator.geolocation.getCurrentPosition(...)
```

to obtain a position.

---

# 67. Permission Changes

A permission object can sometimes report changes:

```js id="k2m6v9"
permission.addEventListener(
  "change",
  () => {
    console.log(
      "Geolocation permission changed."
    );
  }
);
```

This can help advanced interfaces respond when permissions change.

Do not assume every environment exposes identical behavior.

---

# 68. Do Not Repeatedly Ask for Permission

An application that repeatedly requests denied location access will usually create a poor experience.

A better approach:

```text id="b6m3x8"
Permission denied
      ↓
Explain why location is useful
      ↓
Provide alternative
```

For example:

```text id="u5p8c2"
Use a city manually instead.
```

This is more respectful and robust.

---

# 69. Provide a Manual Alternative

Location should not always be the only way to use a feature.

For example:

```text id="w3m7q1"
Find nearby projects

[Use my location]

or

[Enter a city manually]
```

This makes the application more resilient when:

* permission is denied
* geolocation is unavailable
* the device provides poor accuracy

---

# 70. Location Accuracy and User Expectations

A map marker can appear slightly away from the user's actual position.

Do not present an estimated location as if it were exact.

For example:

```text id="q8m4v1"
Your approximate location
```

can be more appropriate than:

```text id="c6p2x9"
Your exact location
```

when accuracy is uncertain.

---

# 71. Privacy Considerations

Location is highly sensitive information.

Applications should:

* request only when needed
* explain why it is needed
* minimize collection
* minimize retention
* avoid unnecessary sharing
* protect stored coordinates
* provide alternatives when practical

Do not collect precise location simply because the API makes it possible.

---

# 72. Data Minimization

Suppose the feature only needs to determine:

```text id="f9m3k7"
nearest city
```

It may not need continuous precise coordinates stored permanently.

A strong privacy design asks:

> What is the minimum location information required to provide the feature?

This principle is important in real production systems.

---

# 73. Do Not Log Coordinates Unnecessarily

Avoid:

```js id="q4m8v1"
console.log(position.coords);
```

in production diagnostic code if it exposes precise location unnecessarily.

Coordinates can reveal sensitive information about:

* home
* workplace
* routines
* travel patterns

Logging should be intentional and controlled.

---

# 74. Location and HTTPS

For production deployments:

```text id="u2c7m9"
HTTPS
```

should be treated as the standard environment for location features.

This is particularly important when moving from:

```text id="o5m3x8"
localhost
```

to:

```text id="t7q2v4"
production domain
```

A feature that works locally can fail after deployment if the production environment is not configured correctly.

---

# 75. Geolocation on Vercel

A deployed Next.js application on a properly configured HTTPS domain can use browser geolocation from a Client Component.

The server deployment platform does not itself provide the user's device coordinates.

The flow remains:

```text id="m5c8p2"
User browser
   ↓
navigator.geolocation
   ↓
Coordinates
   ↓
Next.js API route/server logic
```

The hosting platform does not replace the browser API.

---

# 76. Geolocation and Supabase

A common architecture could be:

```text id="x4m9q1"
Client Component
      ↓
Geolocation API
      ↓
Latitude / Longitude
      ↓
Server/API
      ↓
Supabase/PostgreSQL
```

If location data is stored in a database, consider:

* precision requirements
* retention period
* access control
* Row Level Security
* whether exact coordinates need to be stored at all

Location data deserves deliberate data modeling.

---

# 77. Example: Storing Location

A client might send:

```js id="c7m2v8"
{
  latitude: 31.5,
  longitude: 34.4
}
```

The server should:

1. validate the values
2. authenticate the user if required
3. authorize storage
4. apply any privacy rules
5. store only what is necessary

The client should never be trusted simply because the values came from `navigator.geolocation`.

---

# 78. Background Location Tracking

Web applications should not assume they can perform unrestricted background location tracking like a native mobile application.

Browser lifecycle, permission, platform, visibility, and resource restrictions all matter.

If an application requires advanced background geolocation behavior, the web platform's capabilities and limitations must be evaluated carefully.

Do not promise continuous background location from a normal browser page.

---

# 79. Real-Time Tracking

A location tracking feature might use:

```js id="n3m8v2"
watchPosition()
```

and send updates to a backend.

Conceptually:

```text id="x6p2c9"
Position update
      ↓
Validate
      ↓
Send to API
      ↓
Persist / broadcast
      ↓
Update map
```

This can generate many updates.

The application should control:

* update frequency
* distance thresholds
* accuracy requirements
* network usage
* battery consumption
* cleanup

---

# 80. Do Not Store Every Location Update Blindly

Suppose `watchPosition()` produces frequent updates.

Writing every update to a database can create:

* unnecessary storage
* high write volume
* increased costs
* privacy concerns

A better system may only persist when:

* the user moved a meaningful distance
* enough time passed
* the application actually needs the update

This is a product and architecture decision.

---

# 81. Location Sampling

A tracking application may decide:

```text id="p7m3x1"
Update at most every 10 seconds
```

or:

```text id="v2c8m5"
Update when user moves more than 50 meters
```

These policies can reduce:

* battery usage
* network traffic
* backend writes

The browser's position update frequency is not itself a complete product-level tracking strategy.

---

# 82. React Location Watch with Cleanup

```jsx id="m8q2v4"
"use client";

import { useEffect, useState } from "react";

export default function LocationTracker() {
  const [location, setLocation] =
    useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const watchId =
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude:
              position.coords.latitude,
            longitude:
              position.coords.longitude,
            accuracy:
              position.coords.accuracy,
          });
        },
        (error) => {
          console.error(error);
        }
      );

    return () => {
      navigator.geolocation.clearWatch(
        watchId
      );
    };
  }, []);

  return (
    <pre>
      {JSON.stringify(
        location,
        null,
        2
      )}
    </pre>
  );
}
```

The key architectural point is cleanup.

---

# 83. Avoid Infinite Updates

Suppose a location update does:

```js id="v7m2c4"
setLocation(position);
```

and some effect responds by starting another watch.

This can accidentally create repeated watches.

Keep subscription setup and state updates conceptually separate:

```text id="z5p8m2"
Effect
  ↓
Start watch once
  ↓
Watch callback
  ↓
Update state
  ↓
Render
```

The effect should not unnecessarily restart on every state update.

---

# 84. Stale Closures in Location Watchers

A location watcher callback can also capture React state.

For example:

```jsx id="a4m7v2"
useEffect(() => {
  const watchId =
    navigator.geolocation.watchPosition(
      () => {
        console.log(someState);
      }
    );

  return () => {
    navigator.geolocation.clearWatch(
      watchId
    );
  };
}, []);
```

If `someState` changes, the callback may continue to reference the value captured by the effect's closure.

This is the same general stale-closure problem found with:

* timers
* keyboard listeners
* subscriptions

Choose dependencies, refs, or functional updates according to the specific requirement.

---

# 85. Location and `useRef`

In more advanced tracking systems, a ref may hold mutable values that should not trigger a render.

Example:

```js id="f6q2m8"
const latestLocation =
  useRef(null);
```

Then:

```js id="y3m8c4"
latestLocation.current =
  position.coords;
```

This can be useful when the application needs the latest value inside an external callback without necessarily causing a React render on every update.

Use this only when it matches the data-flow requirements.

---

# 86. Geolocation and Maps in React

A common architecture:

```text id="c8m3v1"
Geolocation
     ↓
React state
     ↓
Map component
     ↓
Marker
```

For example:

```jsx id="p4n7x2"
{location && (
  <MapMarker
    latitude={location.latitude}
    longitude={location.longitude}
  />
)}
```

The mapping library is separate from the browser Geolocation API.

---

# 87. Location Permissions and User Interface

A good location component should represent states such as:

```text id="m6v3q8"
idle
requesting
success
permission-denied
unavailable
timeout
```

For example:

```js id="t9p2c5"
const [status, setStatus] =
  useState("idle");
```

Then:

```text id="e3m7v1"
idle
  ↓
requesting
  ↓
success

or

requesting
  ↓
permission-denied
```

This is often better than a single Boolean.

---

# 88. Location State Modeling

A more useful state shape might be:

```js id="n5c8m3"
const [locationState, setLocationState] =
  useState({
    status: "idle",
    data: null,
    error: null,
  });
```

Possible states:

```text id="x2m7v9"
idle
requesting
success
error
```

This makes the UI easier to reason about.

---

# 89. Practical React State Example

```jsx id="h8m3q6"
const [locationState, setLocationState] =
  useState({
    status: "idle",
    data: null,
    error: null,
  });

function requestLocation() {
  setLocationState({
    status: "requesting",
    data: null,
    error: null,
  });

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocationState({
        status: "success",
        data: position.coords,
        error: null,
      });
    },
    (error) => {
      setLocationState({
        status: "error",
        data: null,
        error,
      });
    }
  );
}
```

This is much clearer than juggling multiple unrelated flags.

---

# 90. Location Request UX

A button can communicate state:

```jsx id="b6m2q8"
<button
  onClick={requestLocation}
  disabled={
    locationState.status ===
    "requesting"
  }
>
  {locationState.status === "requesting"
    ? "Finding location..."
    : "Use my location"}
</button>
```

This prevents multiple simultaneous requests from the same UI interaction.

---

# 91. Error-Specific UX

Instead of one generic message:

```text id="q2m8v5"
Location failed.
```

use more helpful categories:

```text id="p7c3n9"
Permission denied:
"Please allow location access or enter your city manually."

Position unavailable:
"We couldn't determine your location."

Timeout:
"Location took too long to determine. Please try again."
```

The exact wording should match the product.

---

# 92. Do Not Blame the User

`POSITION_UNAVAILABLE` can be caused by technical conditions.

Avoid messages such as:

```text id="w4m7q2"
You provided an invalid location.
```

unless the user actually entered invalid data.

The browser, device, or environment may be the source of the problem.

---

# 93. Geolocation and Offline Status

Geolocation and network status are different.

A device can be:

```text id="p5m8c1"
offline
```

and still have a location source such as GPS.

Likewise:

```text id="n7q3v4"
online
```

does not guarantee that location services are available.

Do not combine the concepts incorrectly.

---

# 94. Geolocation and Device Location Services

A browser request may depend on operating-system location facilities.

For example:

```text id="e4m8c2"
Browser
   ↓
OS location services
   ↓
GPS / Wi-Fi / cellular / other signals
```

The browser abstracts these details.

The application receives the resulting location information rather than directly controlling the underlying sensors.

---

# 95. Location Sources

The actual method used to estimate position can vary depending on the device.

Possible signals can include:

* satellite-based positioning
* Wi-Fi information
* cellular network information
* device sensors
* other system-level location mechanisms

The Geolocation API abstracts the source selection.

Developers generally should focus on the resulting coordinates and accuracy rather than assuming a specific hardware source.

---

# 96. Geolocation Is an Estimate

The correct mental model is:

```text id="y2m8q4"
Browser
   ↓
Location systems
   ↓
Estimated position
   ↓
Coordinates + accuracy
```

not:

```text id="m7c4p9"
Browser
   ↓
Perfect physical coordinates
```

This matters when designing UI and business rules.

---

# 97. Location-Sensitive Decisions

Suppose a store is 20 meters from the user.

If the position accuracy is:

```text id="t8p2m5"
100 meters
```

then claiming:

```text id="x3c7v9"
You are exactly 20 meters away.
```

would be misleading.

Applications should consider the accuracy estimate when making precise location claims.

---

# 98. Location Permissions Are User-Controlled

Do not attempt to bypass the browser's permission mechanism.

A site cannot legitimately assume:

```text id="c5m8q1"
User denied location
↓
Find another hidden way to obtain precise coordinates
```

Respect permission decisions.

When location is unavailable, provide another workflow where practical.

---

# 99. Do Not Use IP Address as an Exact Location Substitute

An application may estimate a general region from an IP address using separate services, but that is not equivalent to browser geolocation.

IP-based location can be:

* coarse
* wrong
* affected by VPNs
* affected by proxies
* associated with an ISP rather than the physical user

If precise device location is required, use the appropriate user-consented location mechanism.

---

# 100. Geolocation and Reverse-Geocoding Costs

A common mistake is to assume:

```text id="b8m3v6"
getCurrentPosition()
```

returns:

```text id="p4c7m2"
Street address
City
Country
```

It does not.

You receive geographic coordinates.

Address conversion requires a separate geocoding service.

That service may have:

* rate limits
* costs
* authentication
* usage policies

Architecture should account for this separately.

---

# 101. Geolocation and API Rate Limits

Suppose a tracking feature calls reverse geocoding every time `watchPosition()` updates.

This can produce excessive API traffic.

A better design may:

```text id="v2m8c4"
Location update
      ↓
Has user moved meaningfully?
      ↓
Yes
      ↓
Reverse geocode
```

rather than reverse-geocoding every tiny coordinate change.

---

# 102. Location Caching

If an application repeatedly needs the same location, consider whether it needs:

```text id="j5c8m2"
Fresh location every time
```

or:

```text id="q7m3v9"
Recent cached location
```

Using cached information can improve:

* performance
* battery life
* responsiveness

The `maximumAge` option can help express this preference to the browser.

---

# 103. Location and Privacy by Design

A thoughtful design may:

```text id="m4v8c2"
Request location
      ↓
Use it
      ↓
Discard exact coordinates
```

when permanent storage is unnecessary.

Or it may reduce precision before storage.

For example, if only city-level analytics are needed, exact latitude/longitude may be more information than necessary.

Any such transformation should still be appropriate for the product's requirements.

---

# 104. Precision Reduction

A system may choose to reduce coordinate precision before storing or sharing it.

Conceptually:

```text id="c2m7v5"
Exact coordinate
      ↓
Reduced precision
      ↓
Approximate region
```

This can reduce privacy exposure.

However, reducing precision can also affect functionality.

It should be based on the actual use case rather than applied blindly.

---

# 105. Geolocation and Authentication

Having a location result does not authenticate the user.

For example:

```js id="g4m8c1"
if (position.coords.latitude === ...) {
  // Do not treat this as identity proof.
}
```

Location is an environmental signal, not a secure identity mechanism.

A malicious client can send arbitrary coordinates to an API.

---

# 106. Geolocation and Authorization

Similarly, do not use client-side coordinates as the sole security control for sensitive operations.

Bad architecture:

```text id="n3q7m2"
Client says:
"I'm in the allowed area."

Server trusts it.
```

The server should independently validate any security-sensitive geolocation requirement.

Even then, device-reported geolocation has inherent limitations and should not automatically be treated as proof of physical presence.

---

# 107. Location Spoofing

Browser-side geolocation can potentially be altered or simulated in development and testing environments.

Therefore:

```text id="v6m2c8"
Browser location
```

should not automatically be treated as an unforgeable security signal.

If a product has high-assurance physical-presence requirements, it needs stronger controls than a client-provided coordinate.

---

# 108. Testing Geolocation

Browser developer tools can often simulate geolocation coordinates.

This is useful for testing:

* permission flows
* map markers
* location-based filtering
* error states
* coordinate parsing

Do not assume a test coordinate represents a real physical device location.

It is a development simulation.

---

# 109. Testing Permission States

A good location feature should be tested under:

```text id="w5m3q8"
Permission granted
Permission denied
Permission prompt
Position unavailable
Timeout
```

Also test:

```text id="p7c2m9"
Location API unavailable
Insecure context
Mobile browser
Desktop browser
```

This produces much more reliable user experiences.

---

# 110. Testing `watchPosition()`

For continuous tracking, test:

```text id="x4m8q2"
Start watch
↓
Receive updates
↓
Update UI
↓
Stop watch
↓
Confirm updates stop
```

This verifies that `clearWatch()` works correctly.

---

# 111. Avoid Leaking Watches

If a component mounts multiple times:

```js id="f8m2c5"
navigator.geolocation.watchPosition(...)
```

without cleanup, you may accidentally create multiple location subscriptions.

This can lead to:

* duplicate updates
* battery usage
* network traffic
* confusing state changes

Always keep the watch ID and clear it.

---

# 112. Geolocation and Visibility

Continuous location tracking may need to consider whether the page is visible.

For some applications, it can make sense to pause nonessential location work when:

```js id="c4m8v2"
document.hidden
```

is true.

However, whether you should pause depends entirely on the product requirement.

A navigation experience may need ongoing updates while another application may not.

---

# 113. Geolocation and Background Behavior

A normal web page should not be treated as a guaranteed background tracking service.

Browsers can suspend or constrain work when pages are hidden or inactive.

Therefore, real-time tracking requirements should be evaluated against the browser and operating-system environment rather than assuming continuous execution.

---

# 114. Location Update Frequency

`watchPosition()` does not mean:

```text id="v7m2p5"
exactly one update every second
```

The browser decides when new information is available or useful based on the underlying positioning system and requested configuration.

Do not build logic that assumes a fixed update interval.

---

# 115. Timestamp-Based Processing

If tracking accuracy or timing matters, use:

```js id="b6m3q8"
position.timestamp
```

to reason about when a location measurement was produced.

This is better than assuming:

```text id="s8m2v4"
Every callback = same amount of time passed
```

---

# 116. Practical Example: Get Location Once

```js id="m3q8c2"
function getUserLocation() {
  if (!navigator.geolocation) {
    throw new Error(
      "Geolocation is not supported."
    );
  }

  return new Promise(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        }
      );
    }
  );
}
```

Usage:

```js id="y7m2p4"
try {
  const position =
    await getUserLocation();

  console.log(
    position.coords.latitude
  );

  console.log(
    position.coords.longitude
  );
} catch (error) {
  console.error(error);
}
```

Wrapping the callback API in a Promise can make integration with modern `async/await` code easier.

---

# 117. Promise Wrapper Mental Model

The native API uses:

```text id="k5m8c2"
success callback
+
error callback
```

A Promise wrapper gives:

```text id="r3v7p1"
await
 ↓
success
or
catch
```

For example:

```js id="m9c2x7"
try {
  const position =
    await getUserLocation();

  // Success
} catch (error) {
  // Failure
}
```

This pattern can be useful in application code.

---

# 118. React Hook with a Promise Wrapper

A custom hook could conceptually use:

```jsx id="v8m2c5"
const [
  locationState,
  setLocationState
] = useState({
  status: "idle",
  data: null,
  error: null,
});
```

Then:

```js id="c4q7m1"
async function requestLocation() {
  setLocationState({
    status: "requesting",
    data: null,
    error: null,
  });

  try {
    const position =
      await getUserLocation();

    setLocationState({
      status: "success",
      data: position.coords,
      error: null,
    });
  } catch (error) {
    setLocationState({
      status: "error",
      data: null,
      error,
    });
  }
}
```

This creates a predictable state machine for the UI.

---

# 119. Practical Example: Nearby Search

```js id="q6m3v8"
async function findNearbyProjects() {
  const position =
    await getUserLocation();

  const {
    latitude,
    longitude,
  } = position.coords;

  const url = new URL(
    "/api/projects/nearby",
    window.location.origin
  );

  url.searchParams.set(
    "lat",
    String(latitude)
  );

  url.searchParams.set(
    "lng",
    String(longitude)
  );

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to load nearby projects."
    );
  }

  return response.json();
}
```

This combines:

* Geolocation
* `URL`
* `URLSearchParams`
* `fetch`
* error handling

---

# 120. Practical Example: Location-Aware UI

```jsx id="m7c2x5"
function LocationMessage({
  location,
}) {
  if (!location) {
    return (
      <p>
        Location not available.
      </p>
    );
  }

  return (
    <p>
      Approximate accuracy:
      {" "}
      {Math.round(
        location.accuracy
      )}{" "}
      meters
    </p>
  );
}
```

The UI communicates the uncertainty instead of pretending the coordinates are exact.

---

# 121. Practical Example: Start and Stop Tracking

```js id="c8m3v6"
let watchId = null;

function startTracking() {
  if (!navigator.geolocation) {
    return;
  }

  watchId =
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          position.coords
        );
      }
    );
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(
      watchId
    );

    watchId = null;
  }
}
```

This creates explicit lifecycle control.

---

# 122. Practical Example: Tracking with Distance Filtering

Suppose the product only needs updates when the user has moved enough.

Conceptually:

```js id="r2m7c9"
let lastLocation = null;

function handlePosition(position) {
  if (!lastLocation) {
    lastLocation = position.coords;
    return;
  }

  const distance =
    calculateDistance(
      lastLocation.latitude,
      lastLocation.longitude,
      position.coords.latitude,
      position.coords.longitude
    );

  if (distance >= 0.05) {
    lastLocation = position.coords;

    console.log(
      "Meaningful movement detected."
    );
  }
}
```

Here:

```text id="j8m3v5"
0.05 km
=
50 meters
```

This is only an example policy.

Real products should choose thresholds based on their requirements.

---

# 123. Location and Battery

Higher accuracy and continuous tracking can increase resource usage.

For example:

```js id="k5m8q2"
enableHighAccuracy: true
```

combined with:

```js id="w3c7p4"
watchPosition()
```

may be unnecessarily expensive for a simple "find nearby" button.

A better approach is:

```text id="p8m2v6"
Need one location
   ↓
getCurrentPosition()

Need continuous movement
   ↓
watchPosition()
```

Use the least resource-intensive mechanism that meets the feature requirements.

---

# 124. Geolocation and Progressive Enhancement

A feature should ideally still provide value when geolocation is unavailable.

For example:

```text id="h2m7c4"
Nearby projects

[Use my location]

or

[Enter location manually]
```

This avoids turning browser capability differences into a complete feature failure.

---

# 125. Geolocation and Manual Location

Manual location can be represented by:

```text id="g5m8q1"
city
postal code
address
```

This does not have to replace geolocation.

It can be an alternative.

The application's location abstraction might therefore be:

```text id="s4c7m2"
Location source
├── Browser geolocation
└── User-entered location
```

---

# 126. Browser Location vs User Profile Location

These can represent different concepts.

```text id="q8m3v6"
Browser location
=
where the device appears to be now

Profile location
=
where the user says they are based
```

Do not automatically overwrite a profile location with live geolocation.

They serve different purposes.

---

# 127. Location and Time Zones

Geolocation does not automatically return the user's time zone as part of the `GeolocationCoordinates` object.

If an application needs a time zone, it usually uses a separate mechanism.

For example, browser APIs can expose local time-zone information through JavaScript internationalization features.

The point is:

```text id="m2c8v5"
Coordinates
≠
time zone
```

They are related but distinct concepts.

---

# 128. Location and Language

Similarly, geolocation does not tell you:

```text id="c4m7p9"
preferred language
```

That information comes from different browser signals such as:

```js id="q8m2v6"
navigator.language
```

Keep browser environment signals conceptually separate.

---

# 129. Geolocation and Search Radius

When building nearby search, a radius should be explicit.

For example:

```text id="v7m3c2"
10 km
```

means something very different from:

```text id="r5p8m4"
100 km
```

An API can receive:

```js id="k2m7x5"
url.searchParams.set(
  "radius",
  "10"
);
```

and the server can validate and apply that radius.

Do not trust client-supplied radius values blindly.

---

# 130. Server-Side Distance Filtering

A backend can calculate whether records are within a radius.

Conceptually:

```text id="p6m3v8"
User coordinates
       ↓
Database query
       ↓
Distance calculation
       ↓
Rows inside radius
```

PostgreSQL can support geographic calculations through appropriate extensions and data types, depending on the database architecture.

The Geolocation API only provides the client-side coordinate.

---

# 131. PostgreSQL and Location Data

A simple database schema might store:

```text id="d8m2c7"
latitude
longitude
```

But larger location-aware systems may choose specialized geographic data types and indexing strategies.

The important architecture distinction is:

```text id="q4m7p2"
Browser
→ obtains location

Database
→ stores / queries location
```

The browser API is not responsible for database-level geospatial logic.

---

# 132. Location Data and Access Control

If stored in a database, location records should have appropriate access controls.

For example:

```text id="x7m3c5"
User A
→ can read own location

User B
→ cannot read User A's private location
```

The exact implementation depends on the backend.

In a Supabase/PostgreSQL application, database authorization should not be replaced with client-side checks.

---

# 133. Location and Row Level Security

When location data is stored in Supabase, Row Level Security can help enforce database-level access policies.

The general principle is:

```text id="c5m8q2"
Client UI check
      +
API/backend validation
      +
Database authorization
```

Security should not depend on the React UI alone.

---

# 134. Privacy-Friendly Location Storage

Consider whether you need:

```text id="r7m2v4"
exact latitude
exact longitude
timestamp
```

or only:

```text id="p3c8m5"
city
region
coarse area
```

Data minimization can reduce privacy risk.

The product should define what is actually necessary.

---

# 135. Deleting Stored Location

If location is stored temporarily, define a retention strategy.

For example:

```text id="m8c3q7"
Store for feature duration
      ↓
Delete afterward
```

or:

```text id="v4m7p2"
Store latest known location
      ↓
Replace previous value
```

or:

```text id="x6c2m9"
Never persist exact coordinates
```

The right choice depends on the product.

---

# 136. Location and Legal/Privacy Requirements

Location data can be subject to significant privacy obligations depending on jurisdiction and application context.

A production application should understand:

* consent requirements
* transparency
* data minimization
* retention
* access controls
* deletion
* legal basis where applicable

Do not treat location as ordinary low-risk data.

---

# 137. Geolocation and Authentication UX

A location request should not normally appear as a surprise after login unless location is clearly necessary.

A better flow is often:

```text id="b2m7c4"
Feature requires location
       ↓
Explain why
       ↓
User chooses
       ↓
Request permission
```

This improves user trust.

---

# 138. Permission Denial Recovery

When the user denies location:

```text id="j8m3v5"
Permission denied
       ↓
Do not repeatedly prompt
       ↓
Offer alternative
```

Example:

```text id="w4c7m2"
We couldn't access your location.
Enter your city instead.
```

This makes the application resilient.

---

# 139. Position Unavailable Recovery

If:

```text id="p6m2v8"
POSITION_UNAVAILABLE
```

consider:

```text id="r3m7c5"
Try again
+
Manual location
```

instead of assuming a permanent failure.

---

# 140. Timeout Recovery

For:

```text id="c8m2v4"
TIMEOUT
```

a UI may offer:

```text id="v5m7p1"
Try again
```

Potentially with different options.

For example, a previous request might have used:

```js id="x2m8c7"
enableHighAccuracy: true
```

while a faster lower-accuracy retry might use:

```js id="m4q7v2"
enableHighAccuracy: false
```

This is an application strategy, not a universal requirement.

---

# 141. Geolocation and Accuracy Trade-Offs

There is often a trade-off:

```text id="f3m8c2"
Higher accuracy
      ↓
Potentially more resource use
```

versus:

```text id="n7p2v5"
Lower accuracy
      ↓
Potentially faster / cheaper
```

The best balance depends on the actual feature.

A city-level weather lookup probably does not need the same precision as walking navigation.

---

# 142. Geolocation and Weather Applications

A weather application may:

```text id="j4m8c2"
Get location
      ↓
Reverse geocode or use coordinates
      ↓
Call weather API
      ↓
Show local forecast
```

The browser Geolocation API provides only the location layer.

The weather service is a separate external API.

---

# 143. Geolocation and Delivery Applications

A delivery application may:

```text id="v6m3q8"
Get location
      ↓
Find nearby delivery options
      ↓
Show estimate
```

The application should carefully decide whether location is:

* current device location
* delivery destination
* saved address

These are different concepts.

---

# 144. Geolocation and Navigation

Navigation typically needs continuous updates:

```text id="p8m2c5"
watchPosition()
      ↓
new coordinates
      ↓
update route
      ↓
update map
```

This is a resource-intensive use case.

Battery, accuracy, and update frequency need careful management.

---

# 145. Geolocation and Fitness Applications

Fitness applications may use:

```text id="m3c7v8"
watchPosition()
```

to track movement.

However, browser execution constraints can make a normal web page unsuitable for some background tracking requirements.

Product requirements should be tested against the actual target devices and browsers.

---

# 146. Geolocation and Accessibility

Location-dependent features should not make the application unusable for people who deny location access or cannot provide it.

Provide alternatives where reasonable.

For example:

```text id="q5m8c2"
Use current location
or
Enter location manually
```

This improves both accessibility and resilience.

---

# 147. Geolocation and User Control

The user should understand:

* why the feature needs location
* when tracking starts
* when tracking stops
* what happens to the data
* whether the location is stored

A hidden continuous location tracker is a poor product pattern.

---

# 148. Geolocation Is a Permissioned Capability

Think of the API as:

```text id="x3m7c5"
Capability
      ↓
Request
      ↓
Browser permission
      ↓
Possible access
```

The application does not automatically own access to location.

This is similar to other browser privacy-sensitive capabilities.

---

# 149. Geolocation and Other Browser Permissions

The broader browser model includes APIs that may require user permission, such as:

```text id="v7m3q2"
Geolocation
Notifications
Clipboard access
Camera
Microphone
```

The common principle is:

```text id="g5c8m4"
Sensitive capability
      ↓
Browser security controls
      ↓
User consent / permission
```

The exact rules differ by API.

---

# 150. Geolocation Error Messages

The browser's:

```js id="k8m2p5"
error.message
```

is useful for diagnostics but should not necessarily be shown verbatim to users.

Instead, map technical conditions to user-friendly messages.

For example:

```js id="c4m7v2"
if (
  error.code ===
  GeolocationPositionError.PERMISSION_DENIED
) {
  setMessage(
    "Please allow location access or enter your city manually."
  );
}
```

---

# 151. Logging Errors Safely

For development:

```js id="m9p2c6"
console.error(
  "Geolocation error:",
  error
);
```

can be useful.

For production, avoid exposing unnecessary technical details or sensitive location information to centralized logs.

Log only what is needed for diagnostics.

---

# 152. Geolocation and User Consent

A browser permission prompt is not a substitute for good product communication.

Before requesting location, explain:

```text id="q6m3v8"
Why:
Find nearby projects

What:
Approximate current location

Alternative:
Enter a city manually
```

The browser then handles the actual permission mechanism.

---

# 153. Practical React Permission-Friendly Pattern

```jsx id="n4m8c2"
function LocationButton() {
  const [status, setStatus] =
    useState("idle");

  function handleClick() {
    setStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          position.coords
        );

        setStatus("success");
      },
      (error) => {
        console.error(error);

        setStatus("error");
      }
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "requesting"}
    >
      {status === "requesting"
        ? "Finding location..."
        : "Use my location"}
    </button>
  );
}
```

This ties permission requesting to a clear user action.

---

# 154. Practical Next.js Pattern

```jsx id="v7m3c9"
"use client";

import { useState } from "react";

export default function LocationFeature() {
  const [message, setMessage] =
    useState("");

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        setMessage(
          `Location found: ${latitude}, ${longitude}`
        );
      },
      (error) => {
        setMessage(
          "Unable to determine your location."
        );

        console.error(error);
      }
    );
  }

  return (
    <section>
      <button onClick={handleLocation}>
        Use my location
      </button>

      {message && <p>{message}</p>}
    </section>
  );
}
```

The example demonstrates the client boundary and event-driven location request.

---

# 155. Common Mistakes

## Mistake 1: Assuming coordinates are exact

```js id="x4m8c2"
latitude
longitude
```

are estimates with an associated accuracy value.

---

## Mistake 2: Requesting location immediately

A page-load permission prompt can be unnecessary and intrusive.

---

## Mistake 3: Ignoring errors

Always provide an error callback.

---

## Mistake 4: Forgetting `clearWatch()`

Continuous tracking must have a lifecycle.

---

## Mistake 5: Using geolocation in server-side code

The browser owns the location API.

---

## Mistake 6: Trusting client coordinates for security

The client can be manipulated.

---

## Mistake 7: Storing exact coordinates forever

Store only what the feature actually needs.

---

## Mistake 8: Treating permission as guaranteed access

Permission can change or the position can still be unavailable.

---

## Mistake 9: Assuming one callback means one-second intervals

Location updates are not fixed-time timers.

---

## Mistake 10: Using high accuracy everywhere

Higher accuracy can consume more resources.

---

# 156. Best Practices

### Request location when it makes sense

Tie the request to an intentional user action when possible.

### Explain the purpose

Users should understand why location is needed.

### Handle every major error state

At minimum distinguish:

```text id="h7m2c4"
permission denied
position unavailable
timeout
```

### Respect the accuracy estimate

Do not present approximate coordinates as exact.

### Use the least costly mode

Use `getCurrentPosition()` for one-time needs.

Use `watchPosition()` only when continuous tracking is necessary.

### Clean up watches

Always call:

```js id="b5m8q2"
clearWatch()
```

when tracking ends.

### Protect location data

Treat precise coordinates as sensitive information.

### Validate on the server

Never trust client-provided coordinates for security or authorization.

### Provide alternatives

Manual location input can make the application more resilient.

### Use HTTPS

Production geolocation should run in a secure context.

### Keep browser and backend responsibilities separate

The browser obtains location.

The backend validates and processes it.

---

# 157. Quick Reference

## Check support

```js id="m2c8v5"
if ("geolocation" in navigator) {
  // Supported
}
```

## Get current location

```js id="r7m3q1"
navigator.geolocation.getCurrentPosition(
  handleSuccess,
  handleError
);
```

## Read coordinates

```js id="c5m8v2"
position.coords.latitude
position.coords.longitude
```

## Read accuracy

```js id="j8p2m4"
position.coords.accuracy
```

## Watch location

```js id="v3m7c1"
const watchId =
  navigator.geolocation.watchPosition(
    handleSuccess,
    handleError
  );
```

## Stop watching

```js id="q6m2v8"
navigator.geolocation.clearWatch(
  watchId
);
```

## High accuracy

```js id="p4m8c2"
{
  enableHighAccuracy: true
}
```

## Timeout

```js id="x7c3m5"
{
  timeout: 10000
}
```

## Cached location age

```js id="n2m8v4"
{
  maximumAge: 30000
}
```

## Secure context

```js id="g5m3c8"
window.isSecureContext
```

---

# 158. React Relevance

Geolocation is highly relevant to React because it demonstrates how a browser capability becomes application state.

The typical flow is:

```text id="v8m2c5"
User action
      ↓
Browser Geolocation API
      ↓
Success / error callback
      ↓
setState()
      ↓
React render
      ↓
UI
```

For continuous tracking:

```text id="m4c7p2"
useEffect
   ↓
watchPosition()
   ↓
setState()
   ↓
cleanup
   ↓
clearWatch()
```

This reinforces several important React concepts:

* event handlers
* state
* effects
* cleanup
* asynchronous callbacks
* stale closures
* client-side browser APIs
* custom hooks

---

# 159. Next.js Relevance

Geolocation is especially useful for understanding Next.js's client/server boundary.

The browser can access:

```js id="r3m8v5"
navigator.geolocation
```

The server cannot.

The architecture is:

```text id="j7c2m4"
Next.js Server
       ↑
       │ API request
       │
Next.js Client Component
       ↓
navigator.geolocation
       ↓
User's browser/device
```

This distinction is fundamental in full-stack JavaScript development.

---

# 160. Final Mental Model

The Geolocation API should be understood as a permission-controlled browser capability that provides an **estimated position**, not a guaranteed exact physical location.

The basic one-time flow is:

```text id="m8c3v7"
User clicks
      ↓
getCurrentPosition()
      ↓
Permission
      ↓
Success
   or
Error
      ↓
Coordinates + accuracy
      ↓
Application logic
```

Continuous tracking:

```text id="q4m7c2"
watchPosition()
      ↓
Location updates
      ↓
Application state
      ↓
UI / API / Map
      ↓
clearWatch()
```

The most important concepts are:

> `navigator.geolocation` provides browser access to geographic position information.

> `getCurrentPosition()` is for one location request.

> `watchPosition()` is for ongoing location updates.

> `clearWatch()` stops an active location watch.

> `latitude` and `longitude` describe the position, while `accuracy` describes the estimated uncertainty in meters.

> Geolocation requires appropriate browser security and user permission.

> Permission granted does not guarantee that a position will always be available.

> Client-provided coordinates are untrusted input and should not be treated as a security boundary.

> Precise location is sensitive data and should be requested, stored, and shared only when necessary.

> In React, geolocation should be connected to state through event handlers or carefully managed effects.

> In Next.js, Geolocation API access belongs to client-side code because the server cannot access the user's device location.

The practical mental model is:

```text id="t6m2c8"
Browser
   ↓
Permission
   ↓
Geolocation API
   ↓
Estimated coordinates
   ↓
React state
   ↓
UI / Map / API
   ↓
Server validates and processes
```

This pattern is a strong example of how a browser API becomes part of a modern full-stack JavaScript application.
