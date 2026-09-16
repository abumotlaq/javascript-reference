"use strict";

// Creating a Map
const user = new Map();

user.set("name", "Osama Abu Motlaq");
user.set("role", "Frontend Developer");
user.set("age", 25);

console.log("User:", user);

// Getting values
console.log("Name:", user.get("name"));
console.log("Role:", user.get("role"));
console.log("Age:", user.get("age"));

// Checking keys
console.log("Has name:", user.has("name"));
console.log("Has email:", user.has("email"));

// Updating values
user.set("role", "Full Stack JavaScript Developer");

console.log("Updated role:", user.get("role"));

// Deleting a value
user.delete("age");

console.log("After deleting age:", user);

// Map size
console.log("Map size:", user.size);

// Iterating over keys
for (const key of user.keys()) {
console.log("Key:", key);
}

// Iterating over values
for (const value of user.values()) {
console.log("Value:", value);
}

// Iterating over entries
for (const [key, value] of user.entries()) {
console.log(`${key}:`, value);
}

// forEach
user.forEach((value, key) => {
console.log(`${key}:`, value);
});

// Creating a Map from an array
const skills = new Map([
["frontend", "React"],
["backend", "Node.js"],
["database", "PostgreSQL"],
]);

console.log("Skills map:", skills);

// Getting values from a Map
console.log("Frontend:", skills.get("frontend"));
console.log("Backend:", skills.get("backend"));
console.log("Database:", skills.get("database"));

// Object keys as Map keys
const profile = {
name: "Osama Abu Motlaq",
};

const profileMap = new Map();

profileMap.set(profile, {
role: "Frontend Developer",
country: "Palestine",
});

console.log("Profile data:", profileMap.get(profile));

// Function as a Map key
function greet() {
return "Hello, Osama Abu Motlaq!";
}

const functionMap = new Map();

functionMap.set(greet, "Greeting function");

console.log("Function key:", functionMap.get(greet));

// Different types of keys
const mixedMap = new Map();

mixedMap.set("string", "String key");
mixedMap.set(1, "Number key");
mixedMap.set(true, "Boolean key");
mixedMap.set(profile, "Object key");
mixedMap.set(greet, "Function key");

console.log("String key:", mixedMap.get("string"));
console.log("Number key:", mixedMap.get(1));
console.log("Boolean key:", mixedMap.get(true));
console.log("Object key:", mixedMap.get(profile));
console.log("Function key:", mixedMap.get(greet));

// Map from object entries
const userObject = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
country: "Palestine",
};

const userMap = new Map(
Object.entries(userObject)
);

console.log("User Map:", userMap);

// Convert Map to array
const userEntries = [...userMap];

console.log("Map entries:", userEntries);

// Convert Map to object
const convertedUser = Object.fromEntries(userMap);

console.log("Converted object:", convertedUser);

// Counting values with Map
const technologies = [
"JavaScript",
"React",
"JavaScript",
"Next.js",
"React",
"JavaScript",
];

const technologyCount = new Map();

for (const technology of technologies) {
const count = technologyCount.get(technology) ?? 0;

technologyCount.set(
technology,
count + 1
);
}

console.log(
"Technology counts:",
technologyCount
);

// Clearing a Map
const temporaryMap = new Map([
["name", "Osama Abu Motlaq"],
["role", "Developer"],
]);

console.log("Before clear:", temporaryMap);

temporaryMap.clear();

console.log("After clear:", temporaryMap);
