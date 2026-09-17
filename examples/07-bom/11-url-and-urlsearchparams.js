"use strict";

// Create a URL
const url = new URL(
"https://example.com/projects?search=javascript&page=2#details"
);

console.log("URL:", url);

// URL properties
console.log("Href:", url.href);
console.log("Origin:", url.origin);
console.log("Protocol:", url.protocol);
console.log("Username:", url.username);
console.log("Password:", url.password);
console.log("Host:", url.host);
console.log("Hostname:", url.hostname);
console.log("Port:", url.port);
console.log("Pathname:", url.pathname);
console.log("Search:", url.search);
console.log("Hash:", url.hash);

// URLSearchParams from URL
const params = url.searchParams;

console.log(
"URLSearchParams:",
params
);

// get()
console.log(
"Search:",
params.get("search")
);

console.log(
"Page:",
params.get("page")
);

// has()
console.log(
"Has search:",
params.has("search")
);

console.log(
"Has category:",
params.has("category")
);

// get() for missing parameter
console.log(
"Missing parameter:",
params.get("category")
);

// set()
params.set("page", "3");

console.log(
"Updated page:",
params.get("page")
);

console.log(
"Updated URL:",
url.href
);

// append()
params.append("tag", "javascript");
params.append("tag", "web");

console.log(
"All tags:",
params.getAll("tag")
);

console.log(
"URL with tags:",
url.href
);

// getAll()
console.log(
"getAll tag:",
params.getAll("tag")
);

// delete()
params.delete("tag");

console.log(
"After deleting tag:",
url.href
);

// sort()
params.set("z", "last");
params.set("a", "first");
params.set("m", "middle");

params.sort();

console.log(
"Sorted params:",
params.toString()
);

// toString()
console.log(
"Query string:",
params.toString()
);

// Iterate over keys
for (const key of params.keys()) {
console.log("Key:", key);
}

// Iterate over values
for (const value of params.values()) {
console.log("Value:", value);
}

// Iterate over entries
for (const [key, value] of params.entries()) {
console.log(`${key}:`, value);
}

// forEach()
params.forEach((value, key) => {
console.log(
`Parameter ${key}:`,
value
);
});

// Create URLSearchParams directly
const searchParams = new URLSearchParams();

searchParams.set(
"name",
"Osama Abu Motlaq"
);

searchParams.set(
"role",
"Frontend Developer"
);

searchParams.set(
"language",
"JavaScript"
);

console.log(
"Direct params:",
searchParams.toString()
);

// Create URLSearchParams from an object
const objectParams = new URLSearchParams({
search: "JavaScript",
page: "1",
role: "Frontend Developer",
});

console.log(
"Object params:",
objectParams.toString()
);

// Create URLSearchParams from an array of pairs
const pairParams = new URLSearchParams([
["name", "Osama Abu Motlaq"],
["role", "Frontend Developer"],
["language", "JavaScript"],
]);

console.log(
"Pair params:",
pairParams.toString()
);

// Create URLSearchParams from a query string
const queryParams = new URLSearchParams(
"?search=JavaScript&page=2"
);

console.log(
"Query search:",
queryParams.get("search")
);

console.log(
"Query page:",
queryParams.get("page")
);

// Encoding special characters
const encodedParams = new URLSearchParams();

encodedParams.set(
"name",
"Osama Abu Motlaq"
);

encodedParams.set(
"query",
"JavaScript & Web APIs"
);

console.log(
"Encoded query:",
encodedParams.toString()
);

// Build a URL with URLSearchParams
const searchUrl = new URL(
"https://example.com/search"
);

searchUrl.searchParams.set(
"q",
"JavaScript"
);

searchUrl.searchParams.set(
"page",
"2"
);

console.log(
"Search URL:",
searchUrl.href
);

// Add multiple filters
searchUrl.searchParams.append(
"category",
"frontend"
);

searchUrl.searchParams.append(
"category",
"web"
);

console.log(
"Categories:",
searchUrl.searchParams.getAll(
"category"
)
);

console.log(
"Filtered URL:",
searchUrl.href
);

// Read the current page URL
const currentUrl = new URL(
window.location.href
);

console.log(
"Current URL:",
currentUrl.href
);

console.log(
"Current query:",
currentUrl.search
);

console.log(
"Current hash:",
currentUrl.hash
);

// Read a query parameter from the current URL
const currentSearch =
currentUrl.searchParams.get("search");

console.log(
"Current search parameter:",
currentSearch
);

// Update current URL parameters
const updatedCurrentUrl = new URL(
window.location.href
);

updatedCurrentUrl.searchParams.set(
"source",
"javascript-reference"
);

console.log(
"Updated URL:",
updatedCurrentUrl.href
);

// Remove a query parameter
updatedCurrentUrl.searchParams.delete(
"source"
);

console.log(
"URL after deletion:",
updatedCurrentUrl.href
);

// URL pathname manipulation
const projectUrl = new URL(
"https://example.com/projects"
);

projectUrl.pathname = "/projects/javascript";

console.log(
"Project pathname:",
projectUrl.pathname
);

console.log(
"Project URL:",
projectUrl.href
);

// URL hash manipulation
projectUrl.hash = "examples";

console.log(
"Project hash:",
projectUrl.hash
);

console.log(
"Project URL with hash:",
projectUrl.href
);

// URL protocol manipulation
const secureUrl = new URL(
"http://example.com"
);

secureUrl.protocol = "https:";

console.log(
"Secure URL:",
secureUrl.href
);

// URL origin comparison
const firstUrl = new URL(
"https://example.com/projects"
);

const secondUrl = new URL(
"https://example.com/about"
);

console.log(
"Same origin:",
firstUrl.origin === secondUrl.origin
);

// Different origin
const thirdUrl = new URL(
"https://api.example.com/data"
);

console.log(
"Different origin:",
firstUrl.origin === thirdUrl.origin
);

// Relative URL resolution
const baseUrl = new URL(
"https://example.com/docs/"
);

const relativeUrl = new URL(
"javascript.html",
baseUrl
);

console.log(
"Resolved relative URL:",
relativeUrl.href
);

// Absolute path resolution
const absolutePathUrl = new URL(
"/projects",
baseUrl
);

console.log(
"Absolute path URL:",
absolutePathUrl.href
);

// Parent path resolution
const parentPathUrl = new URL(
"../about",
baseUrl
);

console.log(
"Parent path URL:",
parentPathUrl.href
);

// URL equality through href
const urlA = new URL(
"https://example.com/projects"
);

const urlB = new URL(
"https://example.com/projects"
);

console.log(
"Same URL:",
urlA.href === urlB.href
);

// URLSearchParams size
const sizeParams = new URLSearchParams({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
language: "JavaScript",
});

console.log(
"Parameter count:",
[...sizeParams].length
);

// Convert URLSearchParams to object
const paramsObject = Object.fromEntries(
sizeParams
);

console.log(
"Params object:",
paramsObject
);

// Convert object to URLSearchParams
const profileData = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

const profileParams = new URLSearchParams(
profileData
);

console.log(
"Profile query:",
profileParams.toString()
);

// Pagination URL
function createPaginationUrl(
page,
limit
) {
const paginationUrl = new URL(
"https://example.com/projects"
);

paginationUrl.searchParams.set(
"page",
String(page)
);

paginationUrl.searchParams.set(
"limit",
String(limit)
);

return paginationUrl;
}

console.log(
"Pagination URL:",
createPaginationUrl(2, 10).href
);

// Search URL helper
function createSearchUrl(query) {
const search = new URL(
"https://example.com/search"
);

search.searchParams.set(
"q",
query
);

return search.href;
}

console.log(
"Generated search URL:",
createSearchUrl(
"JavaScript Web APIs"
)
);

// URL with username and password
const authenticatedUrl = new URL(
"https://osama:password@example.com"
);

console.log(
"Authenticated URL username:",
authenticatedUrl.username
);

console.log(
"Authenticated URL password:",
authenticatedUrl.password
);

// URL to string
console.log(
"URL to string:",
url.toString()
);

// URL JSON serialization
console.log(
"URL JSON:",
url.toJSON()
);
