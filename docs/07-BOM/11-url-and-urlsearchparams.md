# URL and URLSearchParams

The browser provides the `URL` and `URLSearchParams` APIs for creating, inspecting, modifying, and working with URLs.

These APIs are especially important when working with:

* Query parameters
* API requests
* Search and filter state
* Pagination
* Routing
* Redirects
* Forms
* Browser history
* React applications
* Next.js applications

Instead of manually manipulating URL strings, modern JavaScript code should usually use the structured `URL` APIs.

---

# 1. What Is a URL?

A URL (Uniform Resource Locator) identifies a resource and describes how it can be accessed.

Example:

```text
https://example.com/products?page=2&search=react#details
```

A URL can contain several components.

```text
https://example.com:443/products?page=2&search=react#details
└─┬──┘ └──────┬──────┘ └───────┬───────┘ └──────┬──────┘
protocol        host              query            fragment
```

A more detailed breakdown is:

```text
https://example.com:443/products?page=2&search=react#details
│      │           │       │                         │
│      │           │       │                         └── hash
│      │           │       └── search/query
│      │           └── pathname
│      └── host
└── protocol
```

---

# 2. The `URL` Constructor

The `URL` class creates a structured URL object.

## Syntax

```js
new URL(url);
```

Example:

```js
const url = new URL(
  "https://example.com/products?page=2"
);

console.log(url);
```

Instead of treating the URL as one large string, JavaScript gives you access to separate properties.

---

# 3. Basic `URL` Example

```js
const url = new URL(
  "https://example.com/profile/Osama-Abu-Motlaq?theme=dark#about"
);

console.log(url.protocol);
console.log(url.hostname);
console.log(url.pathname);
console.log(url.search);
console.log(url.hash);
```

The result is conceptually:

```text
https:
example.com
/profile/Osama-Abu-Motlaq
?theme=dark
#about
```

---

# 4. Main `URL` Properties

A URL object exposes many useful properties.

```js
const url = new URL(
  "https://example.com:8080/products/list?page=2#details"
);
```

Common properties:

| Property   | Value                      |
| ---------- | -------------------------- |
| `href`     | Full URL                   |
| `origin`   | `https://example.com:8080` |
| `protocol` | `https:`                   |
| `host`     | `example.com:8080`         |
| `hostname` | `example.com`              |
| `port`     | `8080`                     |
| `pathname` | `/products/list`           |
| `search`   | `?page=2`                  |
| `hash`     | `#details`                 |

---

# 5. `url.href`

`href` represents the complete serialized URL.

```js
const url = new URL(
  "https://example.com/products?page=2"
);

console.log(url.href);
```

Output:

```text
https://example.com/products?page=2
```

You can also assign to `href`:

```js
url.href = "https://example.com/about";

console.log(url.href);
```

The URL object is updated accordingly.

---

# 6. `url.origin`

`origin` contains:

```text
scheme + host + port
```

Example:

```js
const url = new URL(
  "https://example.com:8080/products"
);

console.log(url.origin);
```

Output:

```text
https://example.com:8080
```

For the default HTTPS port, the port is normally not serialized:

```text
https://example.com
```

---

# 7. `url.protocol`

`protocol` represents the URL scheme.

Example:

```js
const url = new URL(
  "https://example.com/products"
);

console.log(url.protocol);
```

Output:

```text
https:
```

Examples of protocols include:

```text
http:
https:
file:
ftp:
```

The value includes the trailing colon.

---

# 8. `url.host`

`host` contains:

```text
hostname + port
```

Example:

```js
const url = new URL(
  "https://example.com:8080/products"
);

console.log(url.host);
```

Output:

```text
example.com:8080
```

---

# 9. `url.hostname`

`hostname` contains the domain name without the port.

```js
const url = new URL(
  "https://example.com:8080/products"
);

console.log(url.hostname);
```

Output:

```text
example.com
```

Compare:

```js
console.log(url.host);
console.log(url.hostname);
```

Output:

```text
example.com:8080
example.com
```

---

# 10. `url.port`

`port` contains the explicit port number.

```js
const url = new URL(
  "https://example.com:8080/products"
);

console.log(url.port);
```

Output:

```text
8080
```

For a URL using the default port:

```js
const url = new URL("https://example.com");

console.log(url.port);
```

The result is usually:

```text
""
```

because the default HTTPS port does not need to be explicitly represented.

---

# 11. `url.pathname`

`pathname` represents the path portion of the URL.

Example:

```js
const url = new URL(
  "https://example.com/products/react"
);

console.log(url.pathname);
```

Output:

```text
/products/react
```

It does not include:

* protocol
* domain
* query string
* hash

---

# 12. `url.search`

`search` contains the query string, including `?`.

Example:

```js
const url = new URL(
  "https://example.com/products?page=2&search=react"
);

console.log(url.search);
```

Output:

```text
?page=2&search=react
```

---

# 13. `url.hash`

`hash` contains the fragment identifier, including `#`.

Example:

```js
const url = new URL(
  "https://example.com/docs#installation"
);

console.log(url.hash);
```

Output:

```text
#installation
```

The fragment is generally handled client-side rather than sent as part of the HTTP request.

---

# 14. URL Component Overview

Consider:

```text
https://example.com:8080/products?page=2&search=react#details
```

The components are:

```js
const url = new URL(
  "https://example.com:8080/products?page=2&search=react#details"
);

console.log(url.protocol); // "https:"
console.log(url.host);     // "example.com:8080"
console.log(url.hostname); // "example.com"
console.log(url.port);     // "8080"
console.log(url.pathname); // "/products"
console.log(url.search);   // "?page=2&search=react"
console.log(url.hash);     // "#details"
```

---

# 15. `URL` Is Structured Data

A major advantage of `URL` is that it understands URL syntax.

Instead of:

```js
const url = "https://example.com/products?page=2";
```

you can use:

```js
const url = new URL(
  "https://example.com/products?page=2"
);
```

Now the URL has structured properties.

This reduces the need for manual string operations.

---

# 16. Modifying a URL

You can modify URL properties.

Example:

```js
const url = new URL(
  "https://example.com/products"
);

url.pathname = "/about";

console.log(url.href);
```

Output:

```text
https://example.com/about
```

---

# 17. Changing the Host

```js
const url = new URL(
  "https://example.com/products"
);

url.hostname = "api.example.com";

console.log(url.href);
```

Output:

```text
https://api.example.com/products
```

The URL object serializes itself automatically.

---

# 18. Changing the Protocol

```js
const url = new URL(
  "http://example.com/products"
);

url.protocol = "https:";

console.log(url.href);
```

Output:

```text
https://example.com/products
```

---

# 19. Setting the Search String

You can change the full query string:

```js
const url = new URL(
  "https://example.com/products"
);

url.search = "?page=2&search=react";

console.log(url.href);
```

Output:

```text
https://example.com/products?page=2&search=react
```

However, `URLSearchParams` is usually better when you need to manipulate individual parameters.

---

# 20. `URLSearchParams`

`URLSearchParams` provides a structured API for working with query parameters.

Example URL:

```text
https://example.com/products?page=2&search=react
```

The query parameters are:

```text
page=2
search=react
```

You can access them with:

```js
const params = new URLSearchParams(
  "?page=2&search=react"
);
```

---

# 21. Creating `URLSearchParams`

You can construct `URLSearchParams` from a query string:

```js
const params = new URLSearchParams(
  "?page=2&search=react"
);
```

The leading `?` is optional.

This also works:

```js
const params = new URLSearchParams(
  "page=2&search=react"
);
```

---

# 22. `get()`

Use `get()` to retrieve the first value associated with a parameter name.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

console.log(params.get("page"));
console.log(params.get("search"));
```

Output:

```text
2
react
```

The returned values are strings.

---

# 23. `get()` Returns `null`

If the parameter does not exist:

```js
const params = new URLSearchParams(
  "page=2"
);

console.log(params.get("search"));
```

Output:

```js
null
```

This is different from:

```js
""
```

---

# 24. `has()`

Use `has()` to check whether a parameter exists.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

console.log(params.has("page"));
console.log(params.has("sort"));
```

Output:

```text
true
false
```

This is useful when the presence of a parameter itself matters.

---

# 25. `set()`

`set()` creates or replaces a parameter.

```js
const params = new URLSearchParams();

params.set("page", "2");
params.set("search", "react");

console.log(params.toString());
```

Output:

```text
page=2&search=react
```

---

# 26. `set()` Replaces Existing Values

Suppose:

```js
const params = new URLSearchParams(
  "page=1&search=react"
);
```

Then:

```js
params.set("page", "2");
```

The result becomes:

```text
page=2&search=react
```

`set()` replaces all existing values for that parameter name.

---

# 27. `append()`

`append()` adds another value without replacing existing values.

```js
const params = new URLSearchParams();

params.append("tag", "react");
params.append("tag", "javascript");

console.log(params.toString());
```

Output:

```text
tag=react&tag=javascript
```

This is important when a parameter can legitimately appear multiple times.

---

# 28. `set()` vs `append()`

```text
set()
│
└── Create or replace values

append()
│
└── Add another value
```

Example:

```js
const params = new URLSearchParams();

params.set("tag", "react");
params.set("tag", "javascript");

console.log(params.toString());
```

Result:

```text
tag=javascript
```

But:

```js
const params = new URLSearchParams();

params.append("tag", "react");
params.append("tag", "javascript");

console.log(params.toString());
```

Result:

```text
tag=react&tag=javascript
```

---

# 29. `delete()`

Remove a parameter:

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

params.delete("search");

console.log(params.toString());
```

Output:

```text
page=2
```

---

# 30. `getAll()`

When the same parameter occurs multiple times, use `getAll()`.

Example:

```js
const params = new URLSearchParams(
  "tag=react&tag=javascript&tag=nextjs"
);

console.log(params.get("tag"));
```

`get()` returns only the first value.

Use:

```js
console.log(params.getAll("tag"));
```

Output:

```js
["react", "javascript", "nextjs"]
```

---

# 31. `toString()`

`toString()` serializes the parameters into a query string.

```js
const params = new URLSearchParams();

params.set("page", "2");
params.set("search", "react");

console.log(params.toString());
```

Output:

```text
page=2&search=react
```

Notice that `toString()` does not include `?`.

If you need the full search string:

```js
const search = `?${params.toString()}`;
```

---

# 32. `URLSearchParams` Automatically Encodes Values

Suppose:

```js
const params = new URLSearchParams();

params.set("name", "Osama Abu Motlaq");
```

Then:

```js
console.log(params.toString());
```

The space is encoded appropriately.

You do not need to manually build:

```text
name=Osama%20Abu%20Motlaq
```

The API handles URL encoding.

---

# 33. Why Encoding Matters

Certain characters have special meaning in URLs:

```text
?
&
=
#
%
```

If user data contains special characters, manually concatenating strings can produce incorrect URLs.

Bad:

```js
const search = "react & next";

const url =
  "/search?query=" + search;
```

The `&` can be interpreted as the beginning of another query parameter.

Using `URLSearchParams` avoids this problem:

```js
const params = new URLSearchParams();

params.set("query", "react & next");

console.log(params.toString());
```

---

# 34. Encoding User Input

Suppose the user enters:

```text
Osama Abu Motlaq
```

Do not manually create:

```js
const url = `/profile?name=${name}`;
```

Instead:

```js
const params = new URLSearchParams();

params.set("name", "Osama Abu Motlaq");

const url = `/profile?${params.toString()}`;
```

The parameter is serialized safely as URL data.

---

# 35. Constructing a URL with `URL`

A common pattern is:

```js
const url = new URL(
  "https://example.com/search"
);

url.searchParams.set("q", "react");
url.searchParams.set("page", "2");

console.log(url.href);
```

Result:

```text
https://example.com/search?q=react&page=2
```

This is one of the most useful patterns in modern JavaScript.

---

# 36. `url.searchParams`

A `URL` object provides a `searchParams` property.

Example:

```js
const url = new URL(
  "https://example.com/products?page=2&sort=price"
);

console.log(url.searchParams.get("page"));
console.log(url.searchParams.get("sort"));
```

Output:

```text
2
price
```

This means you often do not need to create a separate `URLSearchParams` object.

---

# 37. Modifying `url.searchParams`

You can directly modify the URL:

```js
const url = new URL(
  "https://example.com/products"
);

url.searchParams.set("page", "2");
url.searchParams.set("sort", "price");

console.log(url.href);
```

Output:

```text
https://example.com/products?page=2&sort=price
```

---

# 38. Removing Parameters from a URL

```js
const url = new URL(
  "https://example.com/products?page=2&sort=price"
);

url.searchParams.delete("sort");

console.log(url.href);
```

Output:

```text
https://example.com/products?page=2
```

---

# 39. Repeated Query Parameters

URLs can contain duplicate parameter names:

```text
?tag=react&tag=javascript&tag=nextjs
```

JavaScript supports this naturally:

```js
const url = new URL(
  "https://example.com/search?tag=react&tag=javascript&tag=nextjs"
);

console.log(url.searchParams.getAll("tag"));
```

Output:

```js
["react", "javascript", "nextjs"]
```

---

# 40. Sorting Parameters

`URLSearchParams` provides `sort()`.

Example:

```js
const params = new URLSearchParams(
  "search=react&page=2&sort=price"
);

params.sort();

console.log(params.toString());
```

The parameters are sorted by name.

Sorting can be useful when you want a predictable serialized representation.

---

# 41. Iterating Over Parameters

You can use `for...of`.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

for (const [key, value] of params) {
  console.log(key, value);
}
```

Output:

```text
page 2
search react
```

This is useful when you need to inspect every query parameter.

---

# 42. `keys()`

Use `keys()` to iterate over parameter names.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

for (const key of params.keys()) {
  console.log(key);
}
```

Output:

```text
page
search
```

---

# 43. `values()`

Use `values()` to iterate over parameter values.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

for (const value of params.values()) {
  console.log(value);
}
```

Output:

```text
2
react
```

---

# 44. `entries()`

`entries()` returns key/value pairs.

```js
const params = new URLSearchParams(
  "page=2&search=react"
);

for (const [key, value] of params.entries()) {
  console.log(key, value);
}
```

Output:

```text
page 2
search react
```

Because `URLSearchParams` is iterable, this is also possible:

```js
for (const [key, value] of params) {
  console.log(key, value);
}
```

---

# 45. Creating from an Object

You can construct `URLSearchParams` from an object.

```js
const params = new URLSearchParams({
  page: "2",
  search: "react",
});

console.log(params.toString());
```

Output:

```text
page=2&search=react
```

This is convenient for simple parameter sets.

---

# 46. Important Limitation with Object Input

An object is not a general replacement for repeated query parameters.

For example:

```js
const params = new URLSearchParams({
  tag: ["react", "javascript"],
});
```

does not represent repeated `tag` parameters in the same way as:

```text
tag=react&tag=javascript
```

When duplicate parameter names matter, use `append()`.

```js
const params = new URLSearchParams();

params.append("tag", "react");
params.append("tag", "javascript");
```

---

# 47. Creating from an Array of Pairs

You can create parameters from pairs:

```js
const params = new URLSearchParams([
  ["tag", "react"],
  ["tag", "javascript"],
]);

console.log(params.toString());
```

Output:

```text
tag=react&tag=javascript
```

This is another way to represent repeated parameters.

---

# 48. Relative URLs

`new URL()` can work with relative URLs when you provide a base.

Example:

```js
const url = new URL(
  "/products?page=2",
  "https://example.com"
);

console.log(url.href);
```

Output:

```text
https://example.com/products?page=2
```

The second argument acts as the base URL.

---

# 49. Base URLs and Relative Paths

Example:

```js
const url = new URL(
  "../images/osama.png",
  "https://example.com/projects/react/"
);

console.log(url.href);
```

The browser URL parser resolves the relative path according to URL resolution rules.

This is much safer than manually joining strings.

---

# 50. Current Page URL

The browser exposes the current page URL through:

```js
window.location.href
```

You can convert it to a `URL` object:

```js
const url = new URL(window.location.href);
```

Now you can inspect:

```js
console.log(url.pathname);
console.log(url.searchParams);
console.log(url.hash);
```

---

# 51. Reading Query Parameters from the Current Page

Suppose the browser is currently at:

```text
https://example.com/search?q=react&page=2
```

Use:

```js
const params = new URLSearchParams(
  window.location.search
);

console.log(params.get("q"));
console.log(params.get("page"));
```

Output:

```text
react
2
```

This is a common browser-side pattern.

---

# 52. Current URL with `URL`

An equivalent approach is:

```js
const url = new URL(window.location.href);

console.log(url.searchParams.get("q"));
console.log(url.searchParams.get("page"));
```

This often provides a cleaner mental model because everything is represented by one `URL` object.

---

# 53. Query Strings Are Strings

Even numbers in query parameters are strings.

Example:

```js
const url = new URL(
  "https://example.com/products?page=2"
);

const page = url.searchParams.get("page");

console.log(page);
console.log(typeof page);
```

Output:

```text
2
string
```

If the application needs a number:

```js
const page = Number(
  url.searchParams.get("page")
);
```

---

# 54. Validating Numeric Parameters

Do not blindly trust query parameters.

Example:

```js
const url = new URL(
  "https://example.com/products?page=abc"
);

const page = Number(
  url.searchParams.get("page")
);

if (!Number.isInteger(page) || page < 1) {
  console.log("Invalid page.");
}
```

Query parameters are external input.

They must be validated.

---

# 55. Query Parameters Are User-Controlled Input

A URL such as:

```text
/search?q=react
```

can be manually changed by the user.

The same is true for:

```text
/products?page=999999
```

Therefore, never assume query parameters are trustworthy.

Validate:

* type
* range
* allowed values
* expected format

Both client and server validation may be necessary.

---

# 56. Building API URLs

A common use case is creating API query strings.

Instead of:

```js
const url =
  `/api/products?page=${page}&search=${search}`;
```

you can use:

```js
const url = new URL(
  "/api/products",
  window.location.origin
);

url.searchParams.set("page", page);
url.searchParams.set("search", search);

console.log(url.href);
```

This scales better as the number of parameters increases.

---

# 57. Practical API Example

```js
const url = new URL(
  "https://api.example.com/products"
);

url.searchParams.set("page", "2");
url.searchParams.set("limit", "20");
url.searchParams.set("search", "react");

const response = await fetch(url);
```

The `URL` object can be passed to `fetch()`.

This is useful because the URL construction and the network request remain separate concerns.

---

# 58. `URL` with `fetch()`

Example:

```js
const url = new URL(
  "https://api.example.com/products"
);

url.searchParams.set("page", "2");
url.searchParams.set("search", "react");

const response = await fetch(url);
```

This is cleaner than building a long string manually.

You can also explicitly convert it:

```js
const response = await fetch(url.toString());
```

---

# 59. Search, Filter, and Sort State

Query parameters are especially useful for application state such as:

```text
/products?search=react&sort=price&page=2
```

The URL can represent:

* search term
* page
* category
* sort order
* filters

This has an important advantage:

The state can be shared through a URL.

For example:

```text
https://example.com/products?search=react
```

can be copied and opened by another user.

---

# 60. Query Parameters vs Hash

Compare:

```text
/products?search=react
```

with:

```text
/products#search
```

The query string:

```text
?search=react
```

is generally used for structured URL parameters.

The fragment:

```text
#search
```

is commonly used for a location within the document or client-side state depending on the application.

The fragment is not included in the HTTP request to the server.

---

# 61. Query Parameters vs Path Parameters

Consider:

```text
/users/42
```

and:

```text
/users?id=42
```

These are different URL designs.

The first uses a path segment:

```text
/users/42
```

The second uses a query parameter:

```text
/users?id=42
```

A common convention is:

```text
Path
→ identifies a resource

Query string
→ modifies, filters, searches, sorts, or paginates a resource
```

The exact design depends on the API or routing architecture.

---

# 62. React Relevance

`URL` and `URLSearchParams` are highly relevant to React.

They commonly appear in:

* search pages
* filtering
* pagination
* sorting
* URL-driven state
* API requests
* browser navigation
* deep linking

For example:

```js
const params = new URLSearchParams(
  window.location.search
);

const search = params.get("search");
```

This lets the application read state from the URL.

---

# 63. React Example: Reading Search Parameters

A plain browser example:

```jsx
import { useEffect, useState } from "react";

function SearchPage() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setSearch(params.get("search") ?? "");
  }, []);

  return <p>Search: {search}</p>;
}
```

For larger React applications, use the routing library's URL state APIs when available.

The underlying concept remains the same:

```text
URL
↓
query parameters
↓
application state
```

---

# 64. React Example: Updating a Query Parameter

```js
const url = new URL(window.location.href);

url.searchParams.set("search", "react");

window.history.pushState({}, "", url);
```

This changes the URL without a traditional page navigation.

However, application state and routing should be kept synchronized carefully.

---

# 65. Next.js Relevance

`URLSearchParams` is especially relevant in Next.js applications.

A URL such as:

```text
/products?search=react&page=2
```

can represent the current search state.

In the App Router, Next.js provides routing-specific APIs for reading and updating search parameters.

The browser-level foundation is still:

```js
URL
URLSearchParams
```

Understanding the standard Web API makes Next.js routing behavior much easier to understand.

---

# 66. Server-Side Query Parameters in Next.js

In Next.js, search parameters can also be available to server-side page logic.

Conceptually:

```text
URL
↓
search parameters
↓
Next.js routing
↓
page data/rendering
```

This is useful for:

* server-side filtering
* pagination
* search results
* shareable URLs
* SEO-oriented pages

The exact API depends on the Next.js routing model being used.

---

# 67. `URLSearchParams` and Forms

`URLSearchParams` works naturally with form-style data.

For example:

```js
const params = new URLSearchParams();

params.set("name", "Osama Abu Motlaq");
params.set("role", "Frontend Developer");

console.log(params.toString());
```

Output:

```text
name=Osama+Abu+Motlaq&role=Frontend+Developer
```

The serialization follows URL query/form encoding rules.

---

# 68. Constructing Search URLs

Example:

```js
function buildSearchUrl(search, page) {
  const url = new URL(
    "https://example.com/search"
  );

  url.searchParams.set("q", search);
  url.searchParams.set("page", page);

  return url.href;
}

console.log(
  buildSearchUrl("react", 2)
);
```

Result:

```text
https://example.com/search?q=react&page=2
```

This pattern keeps URL construction centralized.

---

# 69. Reusing a `URL` Object

One useful feature of `URL` is that you can modify one object repeatedly.

```js
const url = new URL(
  "https://example.com/products"
);

url.searchParams.set("page", "1");

console.log(url.href);

url.searchParams.set("page", "2");

console.log(url.href);

url.searchParams.set("page", "3");

console.log(url.href);
```

The object reflects the current URL state.

---

# 70. Cloning URLs

When you need an independent URL object, construct another `URL`.

```js
const original = new URL(
  "https://example.com/products?page=1"
);

const copy = new URL(original);

copy.searchParams.set("page", "2");

console.log(original.href);
console.log(copy.href);
```

Output:

```text
https://example.com/products?page=1
https://example.com/products?page=2
```

The original remains unchanged.

---

# 71. `URL` Objects and String Conversion

A `URL` object can be serialized to a string.

```js
const url = new URL(
  "https://example.com/products?page=2"
);

console.log(url.toString());
```

Output:

```text
https://example.com/products?page=2
```

Using:

```js
String(url)
```

also produces its serialized URL representation.

---

# 72. `URLSearchParams` and String Conversion

Similarly:

```js
const params = new URLSearchParams();

params.set("search", "react");

console.log(params.toString());
```

Output:

```text
search=react
```

Remember:

```text
URL.toString()
→ complete URL

URLSearchParams.toString()
→ query string without ?
```

---

# 73. `URL` Parsing Errors

An invalid absolute URL can cause a `TypeError`.

Example:

```js
try {
  const url = new URL("not a valid absolute URL");

  console.log(url);
} catch (error) {
  console.error("Invalid URL:", error);
}
```

This is important when URLs originate from external or user-controlled data.

---

# 74. `URL` Validation

Instead of trying to manually validate a URL with a large regular expression, you can use the parser:

```js
function isValidUrl(value) {
  try {
    new URL(value);

    return true;
  } catch {
    return false;
  }
}
```

Example:

```js
console.log(
  isValidUrl("https://example.com")
);
```

Output:

```text
true
```

And:

```js
console.log(
  isValidUrl("not a url")
);
```

Output:

```text
false
```

The definition of "valid" for an application may still require additional checks.

---

# 75. URL Validation Is Not Security Validation

A URL can be syntactically valid and still be unacceptable for your application.

For example:

```text
javascript:
data:
http:
https:
```

may have very different security implications.

A production application may need to restrict:

* allowed protocols
* allowed hosts
* allowed ports
* redirect destinations

URL parsing answers:

> Is this syntactically parseable as a URL?

It does not answer:

> Is this URL safe or allowed by my application?

---

# 76. Open Redirect Consideration

Suppose an application accepts:

```text
?redirect=https://example.com
```

Do not automatically redirect to arbitrary user-controlled URLs.

For example, dangerous patterns can emerge when applications trust a redirect parameter without validation.

A safer design may:

* allow only known relative paths
* allowlist trusted origins
* reject unsupported protocols
* validate the final destination server-side

---

# 77. Avoid Manual Query String Concatenation

Fragile:

```js
const url =
  "/search?q=" + query + "&page=" + page;
```

Better:

```js
const url = new URL(
  "https://example.com/search"
);

url.searchParams.set("q", query);
url.searchParams.set("page", page);
```

The structured API handles encoding and serialization.

---

# 78. Query Parameter Removal

You can conditionally remove parameters.

```js
const url = new URL(
  "https://example.com/products"
);

url.searchParams.set("search", "react");
url.searchParams.set("page", "2");

if (!url.searchParams.get("search")) {
  url.searchParams.delete("search");
}

console.log(url.href);
```

This is useful when constructing clean URLs from optional filters.

---

# 79. Optional Search Parameters

A practical pattern:

```js
function createProductsUrl(search, page, sort) {
  const url = new URL(
    "https://example.com/products"
  );

  if (search) {
    url.searchParams.set("search", search);
  }

  if (page) {
    url.searchParams.set("page", String(page));
  }

  if (sort) {
    url.searchParams.set("sort", sort);
  }

  return url;
}
```

This avoids adding unnecessary empty parameters.

---

# 80. Normalizing Query Parameters

Suppose the user visits:

```text
/products?page=2
```

and another URL contains:

```text
/products?page=2&search=
```

The application may want to remove empty parameters.

Example:

```js
const url = new URL(window.location.href);

for (const [key, value] of url.searchParams) {
  if (value === "") {
    url.searchParams.delete(key);
  }
}
```

This can produce cleaner URLs.

---

# 81. URL State Is Shareable State

One of the strongest reasons to use query parameters is shareability.

Suppose the current application state is:

```text
Search: React
Page: 2
Sort: Newest
```

Representing it as:

```text
/products?search=React&page=2&sort=newest
```

means someone can copy the URL and reproduce the same state.

This is useful for:

* search pages
* dashboards
* product catalogs
* documentation
* admin interfaces
* public filters

---

# 82. URL State vs Local State

Not all application state belongs in the URL.

Good candidates include state that should be:

* shareable
* bookmarkable
* restorable after refresh
* meaningful as navigation state

Examples:

```text
search
page
sort
filter
tab
```

Temporary UI state such as:

```text
isDropdownOpen
isModalVisible
hoveredItem
```

usually does not need to live in the URL.

---

# 83. Query Parameters and API Design

A common API endpoint might look like:

```text
/api/products?page=2&limit=20&sort=price
```

The server can read:

```text
page
limit
sort
```

and use them to construct the query.

This is a common pattern for:

* pagination
* filtering
* sorting
* search

---

# 84. Query Parameters Should Have Clear Semantics

Avoid vague parameters such as:

```text
?x=2
```

Prefer:

```text
?page=2
```

Clear parameter names make URLs easier to understand and maintain.

For example:

```text
/products?category=frontend&sort=price&page=2
```

is much more understandable than:

```text
/products?a=frontend&b=price&c=2
```

---

# 85. Parsing Multiple Values

Example:

```js
const url = new URL(
  "https://example.com/search?tag=react&tag=javascript"
);

const tags = url.searchParams.getAll("tag");

for (const tag of tags) {
  console.log(tag);
}
```

Output:

```text
react
javascript
```

This is useful for filters such as:

```text
?skill=react&skill=nextjs&skill=javascript
```

---

# 86. Boolean Query Parameters

A URL may contain:

```text
?featured=true
```

But remember that the value is a string.

```js
const params = new URLSearchParams(
  "featured=true"
);

const featured = params.get("featured");

console.log(featured);
console.log(typeof featured);
```

Output:

```text
true
string
```

Convert explicitly:

```js
const featured =
  params.get("featured") === "true";
```

---

# 87. Enum-Like Query Parameters

Suppose the URL contains:

```text
?sort=price
```

Do not assume any arbitrary value is valid.

Instead:

```js
const allowedSorts = new Set([
  "price",
  "name",
  "rating",
]);

const sort = params.get("sort");

if (!allowedSorts.has(sort)) {
  console.log("Invalid sort option.");
}
```

This prevents unsupported application state from entering the system.

---

# 88. Pagination Parameters

A typical pagination URL:

```text
/products?page=3&limit=20
```

Parsing:

```js
const params = new URLSearchParams(
  "page=3&limit=20"
);

const page = Number(params.get("page"));
const limit = Number(params.get("limit"));

console.log(page);
console.log(limit);
```

Always validate the resulting numbers.

For example:

```js
if (
  !Number.isInteger(page) ||
  page < 1
) {
  console.log("Invalid page");
}
```

---

# 89. URLSearchParams and Spaces

When serialized, spaces may appear using URL/form encoding conventions.

For example:

```js
const params = new URLSearchParams();

params.set(
  "name",
  "Osama Abu Motlaq"
);

console.log(params.toString());
```

You may see:

```text
name=Osama+Abu+Motlaq
```

This is normal query-string serialization.

When parsing:

```js
console.log(params.get("name"));
```

you get:

```text
Osama Abu Motlaq
```

---

# 90. URL Parsing Is Better Than Regular Expressions

Do not attempt to parse every URL with a custom regular expression.

For many application tasks:

```js
const url = new URL(value);
```

is more reliable because the browser already implements URL parsing rules.

Regular expressions may still be useful for validating specific application-level formats, but they should not replace the platform's URL parser without a reason.

---

# 91. Practical Utility: Get a Query Parameter

```js
function getQueryParameter(name) {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get(name);
}

console.log(
  getQueryParameter("search")
);
```

This creates a small reusable abstraction.

---

# 92. Practical Utility: Set a Query Parameter

```js
function setQueryParameter(name, value) {
  const url = new URL(window.location.href);

  url.searchParams.set(name, value);

  return url.toString();
}
```

Example:

```js
console.log(
  setQueryParameter("page", "2")
);
```

---

# 93. Practical Utility: Remove a Query Parameter

```js
function removeQueryParameter(name) {
  const url = new URL(window.location.href);

  url.searchParams.delete(name);

  return url.toString();
}
```

Example:

```js
console.log(
  removeQueryParameter("search")
);
```

---

# 94. Practical Utility: Build an API URL

```js
function buildProductsUrl({
  page = 1,
  limit = 20,
  search = "",
}) {
  const url = new URL(
    "https://api.example.com/products"
  );

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  if (search) {
    url.searchParams.set("search", search);
  }

  return url.toString();
}
```

Usage:

```js
const url = buildProductsUrl({
  page: 2,
  limit: 20,
  search: "react",
});

console.log(url);
```

Result:

```text
https://api.example.com/products?page=2&limit=20&search=react
```

---

# 95. Practical Utility: Parse Query Parameters into an Object

A simple utility:

```js
function searchParamsToObject(search) {
  const params = new URLSearchParams(search);

  return Object.fromEntries(params.entries());
}
```

Example:

```js
const result = searchParamsToObject(
  "?page=2&search=react"
);

console.log(result);
```

Result:

```js
{
  page: "2",
  search: "react"
}
```

Remember that this converts values to strings and does not automatically handle duplicate keys as arrays.

---

# 96. Preserving Repeated Parameters

If duplicate keys matter, use `getAll()` rather than blindly converting to an object.

Example:

```js
const params = new URLSearchParams(
  "tag=react&tag=javascript"
);

console.log(params.getAll("tag"));
```

Result:

```js
["react", "javascript"]
```

The correct data representation depends on the URL design.

---

# 97. Security Considerations

URLs frequently contain user-controlled data.

Therefore:

* validate query parameters
* do not trust URL input
* do not inject URL values directly into HTML
* validate redirect destinations
* restrict allowed protocols where necessary
* restrict trusted origins when necessary
* avoid putting secrets in URLs

The URL API makes parsing easier, but it does not automatically make input safe.

---

# 98. Do Not Put Secrets in Query Parameters

Avoid URLs such as:

```text
https://example.com/reset?token=SECRET_TOKEN
```

when a credential or secret can be exposed through:

* browser history
* logs
* analytics
* referrer information
* copied URLs
* screenshots

The correct security design depends on the application, but secrets should not casually be placed in query strings.

---

# 99. URL Fragments and Sensitive Data

Fragments are not sent to the server as part of the HTTP request, but they are still visible to the browser and can be exposed to client-side code.

Therefore:

```text
#secret
```

should not automatically be considered a secure storage mechanism.

Security requirements should be evaluated according to the full application architecture.

---

# 100. `URL` and React Router / Next.js

The standard browser API:

```js
URL
URLSearchParams
```

is the foundation.

Frameworks and routing libraries add abstractions around it.

Conceptually:

```text
Browser URL
    ↓
URL / URLSearchParams
    ↓
Router abstraction
    ↓
React / Next.js application state
```

Understanding the native APIs makes framework-level routing easier to understand.

---

# 101. Common Mistake: Forgetting String Conversion

This:

```js
const page = params.get("page");
```

produces a string.

If you need arithmetic:

```js
const nextPage = Number(page) + 1;
```

not:

```js
const nextPage = page + 1;
```

because:

```text
"2" + 1
```

produces:

```text
"21"
```

---

# 102. Common Mistake: Assuming a Parameter Exists

This is unsafe:

```js
const page = Number(
  params.get("page")
);
```

when the parameter may not exist.

Validate the source first:

```js
const pageValue = params.get("page");

if (pageValue === null) {
  console.log("Page was not provided.");
} else {
  const page = Number(pageValue);
}
```

---

# 103. Common Mistake: Confusing `set()` and `append()`

```js
params.set("tag", "react");
params.set("tag", "javascript");
```

produces one parameter:

```text
tag=javascript
```

While:

```js
params.append("tag", "react");
params.append("tag", "javascript");
```

produces:

```text
tag=react&tag=javascript
```

Choose based on the intended URL model.

---

# 104. Common Mistake: Manually Encoding Values

Avoid:

```js
encodeURIComponent(
  value
);
```

combined with complicated manual query-string construction unless you have a specific reason.

Prefer:

```js
params.set("query", value);
```

and let `URLSearchParams` handle serialization.

This reduces encoding mistakes.

---

# 105. Common Mistake: Treating `search` as the Same as `searchParams`

These are different:

```js
url.search
```

returns:

```text
?page=2&search=react
```

while:

```js
url.searchParams
```

returns a `URLSearchParams` object.

Therefore:

```js
console.log(url.search);
console.log(url.searchParams);
```

represent different forms of the same query information.

---

# 106. Common Mistake: Changing `url.search` Manually When You Need One Parameter

This:

```js
url.search = "?page=2&search=react";
```

replaces the entire query string.

If you only need to change one parameter, prefer:

```js
url.searchParams.set("page", "2");
```

This is safer and easier to maintain.

---

# 107. URL and Performance

`URL` and `URLSearchParams` are lightweight standard APIs.

The main performance concern is usually not the APIs themselves, but unnecessary repeated parsing or rebuilding in high-frequency code.

For example, avoid parsing the same URL hundreds of times inside an unnecessarily hot loop.

Good application architecture matters more than micro-optimizing ordinary URL operations.

---

# 108. Browser vs Node.js

`URL` and `URLSearchParams` are not limited to browser code.

Modern JavaScript runtimes such as Node.js also provide them.

This makes code based on:

```js
new URL(...)
```

portable across many JavaScript environments.

However, browser-specific objects such as:

```js
window.location
```

are not available in the same way in Node.js.

This distinction matters in full-stack JavaScript applications.

---

# 109. Next.js and Server/Client Environments

In Next.js, these are different concepts:

```js
new URL(...)
```

can be used in both server and browser-compatible JavaScript contexts.

But:

```js
window.location
```

requires the browser.

Therefore, prefer structured APIs that do not unnecessarily depend on `window` when the same task can be performed from data already available to your server-side code.

---

# 110. `URL` as a Better Abstraction

Instead of:

```js
let url = "https://example.com";

url += "/products";
url += "?page=2";
url += "&search=react";
```

prefer:

```js
const url = new URL(
  "https://example.com/products"
);

url.searchParams.set("page", "2");
url.searchParams.set("search", "react");
```

The second version expresses the intent much more clearly.

---

# 111. Practical Search Example

```js
function createSearchUrl(query, page) {
  const url = new URL(
    "https://example.com/search"
  );

  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));

  return url.href;
}

console.log(
  createSearchUrl("react", 2)
);
```

Result:

```text
https://example.com/search?q=react&page=2
```

---

# 112. Practical Filtering Example

```js
const url = new URL(
  "https://example.com/projects"
);

url.searchParams.set("category", "frontend");
url.searchParams.set("skill", "react");
url.searchParams.set("page", "2");

console.log(url.href);
```

Result:

```text
https://example.com/projects?category=frontend&skill=react&page=2
```

This is a common structure for filterable pages.

---

# 113. Practical Pagination Example

```js
function createPaginationUrl(page) {
  const url = new URL(
    "https://example.com/projects"
  );

  url.searchParams.set(
    "page",
    String(page)
  );

  return url.href;
}

console.log(
  createPaginationUrl(3)
);
```

Result:

```text
https://example.com/projects?page=3
```

---

# 114. Practical URL Inspection Example

```js
const url = new URL(
  "https://example.com:8080/projects?search=react#details"
);

console.log({
  href: url.href,
  origin: url.origin,
  protocol: url.protocol,
  host: url.host,
  hostname: url.hostname,
  port: url.port,
  pathname: url.pathname,
  search: url.search,
  hash: url.hash,
});
```

This is a good exercise for learning URL structure.

---

# 115. Practical Query Inspection Example

```js
const params = new URLSearchParams(
  "search=react&page=2&sort=newest"
);

console.log({
  search: params.get("search"),
  page: params.get("page"),
  sort: params.get("sort"),
});
```

Result:

```js
{
  search: "react",
  page: "2",
  sort: "newest"
}
```

Again, note that all values are strings.

---

# 116. Decision Guide

Use:

```js
new URL(...)
```

when you need to:

* parse a complete URL
* inspect URL components
* modify a URL
* resolve relative URLs
* construct API URLs

Use:

```js
new URLSearchParams(...)
```

when you need to:

* read query parameters
* create query parameters
* update filters
* handle pagination
* serialize search parameters

Use:

```js
url.searchParams
```

when you already have a `URL` object and need to work with its query string.

---

# 117. Quick Reference

## Create a URL

```js
const url = new URL(
  "https://example.com/products?page=2"
);
```

## Read pathname

```js
url.pathname;
```

## Read query string

```js
url.search;
```

## Read hash

```js
url.hash;
```

## Read a query parameter

```js
url.searchParams.get("page");
```

## Check a parameter

```js
url.searchParams.has("page");
```

## Set a parameter

```js
url.searchParams.set("page", "2");
```

## Add another value

```js
url.searchParams.append("tag", "react");
```

## Remove a parameter

```js
url.searchParams.delete("page");
```

## Get repeated values

```js
url.searchParams.getAll("tag");
```

## Convert to a string

```js
url.toString();
```

## Convert query parameters to a string

```js
url.searchParams.toString();
```

---

# 118. Best Practices

### Prefer structured URL APIs

Use:

```js
URL
URLSearchParams
```

instead of large amounts of manual string manipulation.

### Treat query parameters as untrusted input

Validate:

* types
* ranges
* allowed values
* formats

### Remember that query values are strings

Convert them explicitly when necessary.

### Use `set()` for one value

```js
params.set("page", "2");
```

### Use `append()` for repeated values

```js
params.append("tag", "react");
params.append("tag", "javascript");
```

### Use `getAll()` for duplicate parameters

```js
params.getAll("tag");
```

### Avoid secrets in URLs

URLs can appear in many places beyond the immediate application.

### Keep URL state intentional

Only place state in the URL when it provides meaningful navigation, sharing, bookmarking, or restoration value.

### Use framework routing APIs appropriately

React Router and Next.js provide higher-level abstractions, but understanding the underlying Web APIs remains valuable.

---

# 119. React Relevance

`URL` and `URLSearchParams` are highly relevant to React development.

You will encounter them when implementing:

* search pages
* filters
* pagination
* sorting
* deep links
* shareable UI state
* API requests
* route synchronization

The important React mental model is:

```text
URL
↓
query parameters
↓
React state
↓
UI
```

or in the opposite direction:

```text
User interaction
↓
React state
↓
URLSearchParams
↓
URL
```

Understanding this flow is important for building applications whose state survives refreshes and can be shared through URLs.

---

# 120. Next.js Relevance

In Next.js, query parameters are especially important for:

* App Router pages
* search interfaces
* server-side filtering
* pagination
* route state
* SEO-friendly URLs
* shareable application state

The native platform APIs you should understand first are:

```js
URL
URLSearchParams
```

Then learn how Next.js exposes these concepts through its routing APIs.

That order prevents framework APIs from feeling like magic.

---

# 121. Final Mental Model

Think about URLs as structured objects instead of strings.

```text
URL
│
├── protocol
├── host
├── hostname
├── port
├── pathname
├── search
│    └── URLSearchParams
│         ├── get()
│         ├── getAll()
│         ├── has()
│         ├── set()
│         ├── append()
│         └── delete()
│
└── hash
```

The most important concepts are:

> `URL` represents the complete structured URL.

> `URLSearchParams` represents the query parameters inside the URL.

> Query parameter values are strings and should be validated and converted when necessary.

> Structured URL APIs are safer and clearer than manually concatenating URL strings.

> In React and Next.js, URLs are often used as a source of shareable, navigable application state.

Once you understand `URL` and `URLSearchParams`, concepts such as API query strings, search pages, pagination, filters, React routing, and Next.js search parameters become much easier to understand.
