"use strict";

// Basic optional chaining
const user = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

console.log("Name:", user?.name);
console.log("Role:", user?.role);
console.log("Email:", user?.email);

// Optional chaining with nested objects
const profile = {
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:oabumotlaq@gmail.com)",
},
};

console.log(
"Email:",
profile?.contact?.email
);

console.log(
"Phone:",
profile?.contact?.phone
);

// Optional chaining with missing nested objects
const account = {
name: "Osama Abu Motlaq",
};

console.log(
"Country:",
account?.profile?.location?.country
);

// Optional chaining with null
const userData = null;

console.log(
"User name:",
userData?.name
);

// Optional chaining with undefined
let developer;

console.log(
"Developer role:",
developer?.role
);

// Optional chaining with arrays
const projects = [
{
title: "JavaScript Reference",
},
{
title: "Portfolio",
},
];

console.log(
"First project:",
projects?.[0]?.title
);

console.log(
"Third project:",
projects?.[2]?.title
);

// Optional chaining with array methods
const skills = {
list: [
"JavaScript",
"React",
"Next.js",
],
};

console.log(
"First skill:",
skills?.list?.[0]
);

console.log(
"Fifth skill:",
skills?.list?.[4]
);

// Optional chaining with functions
const developerProfile = {
name: "Osama Abu Motlaq",

greet() {
return `Hello, ${this.name}!`;
},
};

console.log(
"Greeting:",
developerProfile?.greet?.()
);

// Calling a missing function safely
const profileWithoutMethod = {
name: "Osama Abu Motlaq",
};

console.log(
"Missing method:",
profileWithoutMethod?.greet?.()
);

// Optional chaining with methods
const text = "JavaScript";

console.log(
"Uppercase:",
text?.toUpperCase?.()
);

const value = null;

console.log(
"Missing method:",
value?.toUpperCase?.()
);

// Optional chaining with computed properties
const property = "role";

const userProfile = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

console.log(
"Dynamic property:",
userProfile?.[property]
);

// Optional chaining with function arguments
function displayUser(user) {
console.log("Name:", user?.name);
console.log("Role:", user?.role);
console.log(
"Email:",
user?.contact?.email
);
}

displayUser({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
contact: {
email: "[osama@example.com](mailto:oabumotlaq@gmail.com)",
},
});

displayUser(null);

// Optional chaining with Map
const users = new Map();

users.set("osama", {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
});

console.log(
"Map user:",
users.get("osama")?.name
);

console.log(
"Missing Map user:",
users.get("unknown")?.name
);

// Optional chaining with DOM-like data
const data = {
response: {
user: {
name: "Osama Abu Motlaq",
},
},
};

console.log(
"Response user:",
data?.response?.user?.name
);

console.log(
"Missing response:",
data?.response?.profile?.name
);

// Optional chaining with nullish coalescing
const username = null;

const displayName =
username?.trim?.() ?? "Osama Abu Motlaq";

console.log(
"Display name:",
displayName
);
