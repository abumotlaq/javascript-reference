"use strict";

// Spread with arrays
const firstSkills = [
"JavaScript",
"React",
];

const secondSkills = [
"Next.js",
"TypeScript",
];

const allSkills = [
...firstSkills,
...secondSkills,
];

console.log("All skills:", allSkills);

// Copying an array
const skills = [
"JavaScript",
"React",
"Next.js",
];

const skillsCopy = [...skills];

console.log("Original:", skills);
console.log("Copy:", skillsCopy);

// Adding items while copying an array
const updatedSkills = [
...skills,
"Node.js",
];

console.log("Updated skills:", updatedSkills);

// Spread with strings
const name = "Osama Abu Motlaq";

const characters = [...name];

console.log("Characters:", characters);

// Spread in function arguments
const numbers = [10, 20, 30, 40];

function calculateTotal(a, b, c, d) {
return a + b + c + d;
}

console.log(
"Total:",
calculateTotal(...numbers)
);

// Math.max with spread
console.log(
"Maximum:",
Math.max(...numbers)
);

// Math.min with spread
console.log(
"Minimum:",
Math.min(...numbers)
);

// Combining objects
const personalInfo = {
name: "Osama Abu Motlaq",
age: 25,
};

const developerInfo = {
role: "Frontend Developer",
country: "Palestine",
};

const user = {
...personalInfo,
...developerInfo,
};

console.log("User:", user);

// Copying an object
const originalUser = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

const copiedUser = {
...originalUser,
};

console.log("Original user:", originalUser);
console.log("Copied user:", copiedUser);

// Adding or overriding properties
const updatedUser = {
...originalUser,
role: "Full Stack JavaScript Developer",
skills: ["JavaScript", "React", "Next.js"],
};

console.log("Updated user:", updatedUser);

// Spread order
const firstObject = {
name: "Osama Abu Motlaq",
role: "Developer",
};

const secondObject = {
role: "Frontend Developer",
};

const result = {
...firstObject,
...secondObject,
};

console.log("Result:", result);

// Nested object reference
const profile = {
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
},
};

const profileCopy = {
...profile,
};

profileCopy.contact.email = "[updated@example.com](mailto:updated@example.com)";

console.log(
"Original contact:",
profile.contact.email
);

console.log(
"Copied contact:",
profileCopy.contact.email
);

// Combining multiple arrays
const frontendSkills = [
"HTML",
"CSS",
"JavaScript",
];

const backendSkills = [
"Node.js",
"Express.js",
];

const fullStackSkills = [
...frontendSkills,
...backendSkills,
];

console.log(
"Full Stack skills:",
fullStackSkills
);

// Spread with Set
const uniqueSkills = [
...new Set([
"JavaScript",
"React",
"JavaScript",
"Next.js",
]),
];

console.log("Unique skills:", uniqueSkills);

// Spread with Map
const entries = new Map([
["name", "Osama Abu Motlaq"],
["role", "Frontend Developer"],
]);

const entriesArray = [...entries];

console.log("Map entries:", entriesArray);

// Creating an object from Map entries
const userFromMap = Object.fromEntries(entries);

console.log("User from Map:", userFromMap);

// Spread with function parameters
function introduce(name, role) {
console.log(
`${name} is a ${role}.`
);
}

const userData = [
"Osama Abu Motlaq",
"Frontend Developer",
];

introduce(...userData);

// Spread with conditional values
const isDeveloper = true;

const roles = [
"Computer Science Student",
...(isDeveloper
? ["Frontend Developer"]
: []),
];

console.log("Roles:", roles);
