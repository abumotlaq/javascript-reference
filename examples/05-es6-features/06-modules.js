"use strict";

// Named exports
export const name = "Osama Abu Motlaq";

export const role = "Frontend Developer";

export const skills = [
"JavaScript",
"React",
"Next.js",
];

// Named export function
export function greet() {
return `Hello, ${name}!`;
}

export function add(a, b) {
return a + b;
}

// Named export object
export const profile = {
name,
role,
skills,
};

console.log("Name:", name);
console.log("Role:", role);
console.log("Skills:", skills);
console.log("Greeting:", greet());
console.log("Sum:", add(10, 20));
console.log("Profile:", profile);

// Default export
const developer = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

export default developer;

// import.meta.url
console.log("Module URL:", import.meta.url);

// import.meta.filename
if ("filename" in import.meta) {
console.log("Module filename:", import.meta.filename);
}

// import.meta.dirname
if ("dirname" in import.meta) {
console.log("Module directory:", import.meta.dirname);
}
