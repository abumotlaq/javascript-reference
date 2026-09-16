"use strict";

// Creating a Set
const skills = new Set();

skills.add("JavaScript");
skills.add("React");
skills.add("Next.js");

console.log("Skills:", skills);

// Adding duplicate values
skills.add("JavaScript");
skills.add("React");

console.log("After duplicates:", skills);

// Checking values
console.log(
"Has JavaScript:",
skills.has("JavaScript")
);

console.log(
"Has TypeScript:",
skills.has("TypeScript")
);

// Set size
console.log("Set size:", skills.size);

// Deleting a value
skills.delete("React");

console.log("After deleting React:", skills);

// Re-adding a value
skills.add("React");

console.log("After adding React:", skills);

// Iterating with for...of
for (const skill of skills) {
console.log("Skill:", skill);
}

// forEach
skills.forEach((skill) => {
console.log("forEach skill:", skill);
});

// Creating a Set from an array
const technologies = [
"JavaScript",
"React",
"JavaScript",
"Next.js",
"React",
];

const uniqueTechnologies = new Set(
technologies
);

console.log(
"Unique technologies:",
uniqueTechnologies
);

// Convert Set to an array
const technologyArray = [
...uniqueTechnologies,
];

console.log(
"Technology array:",
technologyArray
);

// Remove duplicates from an array
const numbers = [
1,
2,
3,
2,
4,
1,
5,
];

const uniqueNumbers = [...new Set(numbers)];

console.log(
"Unique numbers:",
uniqueNumbers
);

// Set with different data types
const mixedSet = new Set();

mixedSet.add("JavaScript");
mixedSet.add(25);
mixedSet.add(true);
mixedSet.add(null);

console.log("Mixed Set:", mixedSet);

// Objects in a Set
const user = {
name: "Osama Abu Motlaq",
};

const users = new Set();

users.add(user);

console.log("Users:", users);
console.log(
"Has user:",
users.has(user)
);

// Different object references
const firstUser = {
name: "Osama Abu Motlaq",
};

const secondUser = {
name: "Osama Abu Motlaq",
};

const userSet = new Set();

userSet.add(firstUser);
userSet.add(secondUser);

console.log(
"Users with different references:",
userSet
);

// Set union
const frontendSkills = new Set([
"HTML",
"CSS",
"JavaScript",
"React",
]);

const backendSkills = new Set([
"JavaScript",
"Node.js",
"Express.js",
]);

const allSkills = new Set([
...frontendSkills,
...backendSkills,
]);

console.log(
"All skills:",
allSkills
);

// Set intersection
const commonSkills = new Set(
[...frontendSkills].filter((skill) =>
backendSkills.has(skill)
)
);

console.log(
"Common skills:",
commonSkills
);

// Set difference
const frontendOnlySkills = new Set(
[...frontendSkills].filter(
(skill) => !backendSkills.has(skill)
)
);

console.log(
"Frontend-only skills:",
frontendOnlySkills
);

// Clear a Set
const temporarySet = new Set([
"JavaScript",
"React",
]);

console.log(
"Before clear:",
temporarySet
);

temporarySet.clear();

console.log(
"After clear:",
temporarySet
);
