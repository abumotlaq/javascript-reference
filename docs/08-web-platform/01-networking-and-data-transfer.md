### `01-networking-and-data-transfer.md`

# Networking and Data Transfer

The Fetch API provides the modern interface for making network requests from browser JavaScript.

It works with `Request`, `Response`, `Headers`, and request bodies such as JSON, `FormData`, `Blob`, and other supported body types.

## Fetch

The simplest request:

```js
const response = await fetch("/api/users");

console.log(response);
```

`fetch()` returns a Promise that resolves to a `Response` object.

A fulfilled `Response` does not automatically mean that the HTTP request succeeded.

Always inspect the response status when application correctness depends on HTTP success:

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

Then consume the response body:

```js
const data = await response.json();

console.log(data);
```

## Request Configuration

A request can include a method, headers, body, and other options:

```js
const response = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
  })
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

## Request and Response

A `Request` represents the request configuration and body.

A `Response` represents the result returned by the server.

```js
const request = new Request("/api/users", {
  method: "GET"
});

const response = await fetch(request);

console.log(request.method);
console.log(response.status);
```

The response can expose metadata:

```js
console.log(response.status);
console.log(response.statusText);
console.log(response.headers);
console.log(response.url);
```

## Headers

Headers communicate metadata about a request or response.

```js
const headers = new Headers();

headers.set("Accept", "application/json");
headers.set("X-Client", "JavaScript");

const response = await fetch("/api/users", {
  headers
});
```

Headers can also be supplied as an object:

```js
const response = await fetch("/api/users", {
  headers: {
    Accept: "application/json"
  }
});
```

## Query Parameters

`URLSearchParams` is useful for constructing query strings:

```js
const params = new URLSearchParams({
  search: "javascript",
  page: "1",
  limit: "10"
});

const response = await fetch(
  `/api/projects?${params}`
);
```

## JSON Request Bodies

JSON is common when sending structured application data:

```js
const payload = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};

const response = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});
```

## FormData

`FormData` represents form-style key/value data and can also contain files.

```js
const form = document.querySelector("#profileForm");

const formData = new FormData(form);

await fetch("/api/profile", {
  method: "POST",
  body: formData
});
```

When sending `FormData`, do not manually set the `Content-Type` header to `multipart/form-data`.

The browser needs to generate the multipart boundary itself.

## Working with Files

`File` represents a file selected by the user or otherwise exposed by the platform.

```js
const input = document.querySelector("#fileInput");

const file = input.files[0];

console.log(file.name);
console.log(file.size);
console.log(file.type);
```

`Blob` represents immutable raw binary data:

```js
const blob = new Blob(
  ["JavaScript Reference"],
  {
    type: "text/plain"
  }
);

console.log(blob.size);
console.log(blob.type);
```

A `File` is a specialized form of `Blob` with additional metadata such as a name.

## Reading Binary Data

A Blob can be consumed in different ways:

```js
const blob = new Blob(
  ["Osama Abu Motlaq"],
  {
    type: "text/plain"
  }
);

const text = await blob.text();

console.log(text);
```

## Response Body Methods

Common response body methods include:

```js
const response = await fetch("/api/data");

const json = await response.clone().json();
const text = await response.clone().text();
const blob = await response.clone().blob();
const buffer = await response.clone().arrayBuffer();

console.log(json);
console.log(text);
console.log(blob);
console.log(buffer);
```

A response body is normally consumed once. Clone the response when the application genuinely needs multiple independent reads.

## Error Handling

A robust request pipeline should distinguish between:

* Network failures
* Aborted requests
* HTTP errors
* Invalid response data
* Application-level errors

Example:

```js
async function getUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to load user:", error);
    throw error;
  }
}
```

## Common Mistakes

### Assuming `fetch()` rejects for HTTP errors

This is incorrect:

```js
try {
  const response = await fetch("/missing-resource");
} catch (error) {
  console.log("HTTP error");
}
```

HTTP errors such as `404` normally produce a fulfilled Promise containing a `Response`.

Check `response.ok` or `response.status`.

### Sending JSON without the correct content type

```js
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify({
    name: "Osama Abu Motlaq"
  })
});
```

Prefer:

```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Osama Abu Motlaq"
  })
});
```

### Manually setting the multipart boundary

Avoid:

```js
headers: {
  "Content-Type": "multipart/form-data"
}
```

when using `FormData`.

Let the browser generate the appropriate content type and boundary.

## References

* Fetch API
* FormData API
* Blob API
* File API
