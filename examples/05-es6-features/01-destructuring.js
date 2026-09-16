"use strict";

// Object destructuring
const user = {
name: "Osama Abu Motlaq",
age: 25,
role: "Frontend Developer",
};

const { name, age, role } = user;

console.log("Name:", name);
console.log("Age:", age);
console.log("Role:", role);

// Renaming destructured properties
const {
name: userName,
role: userRole,
} = user;

console.log("User name:", userName);
console.log("User role:", userRole);

// Default values
const profile = {
name: "Osama Abu Motlaq",
};

const {
name: profileName,
role: profileRole = "Computer Science Student",
} = profile;

console.log("Profile name:", profileName);
console.log("Profile role:", profileRole);

// Nested object destructuring
const developer = {
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
country: "Palestine",
},
};

const {
contact: {
email,
country,
},
} = developer;

console.log("Email:", email);
console.log("Country:", country);

// Array destructuring
const skills = [
"JavaScript",
"React",
"Next.js",
];

const [firstSkill, secondSkill, thirdSkill] = skills;

console.log("First skill:", firstSkill);
console.log("Second skill:", secondSkill);
console.log("Third skill:", thirdSkill);

// Skipping array elements
const numbers = [10, 20, 30, 40];

const [, secondNumber, , fourthNumber] = numbers;

console.log("Second number:", secondNumber);
console.log("Fourth number:", fourthNumber);

// Default values in arrays
const technologies = ["JavaScript"];

const [
primaryTechnology,
secondaryTechnology = "React",
] = technologies;

console.log("Primary technology:", primaryTechnology);
console.log(
"Secondary technology:",
secondaryTechnology
);

// Swapping variables
let first = "JavaScript";
let second = "React";

[first, second] = [second, first];

console.log("First:", first);
console.log("Second:", second);

// Rest pattern in object destructuring
const project = {
title: "JavaScript Reference",
language: "JavaScript",
status: "Active",
year: 2026,
};

const {
title,
...projectDetails
} = project;

console.log("Title:", title);
console.log("Project details:", projectDetails);

// Rest pattern in array destructuring
const [mainSkill, ...otherSkills] = skills;

console.log("Main skill:", mainSkill);
console.log("Other skills:", otherSkills);

// Function parameter destructuring
function displayUser({ name, role }) {
console.log(
`${name} is a ${role}.`
);
}

displayUser({
name: "Osama Abu Motlaq",
role: "Frontend Developer",
});

// Function parameter destructuring with defaults
function createProfile({
name,
role = "Computer Science Student",
country = "Palestine",
}) {
return {
name,
role,
country,
};
}

const userProfile = createProfile({
name: "Osama Abu Motlaq",
});

console.log("User profile:", userProfile);

// Array parameter destructuring
function calculateTotal([firstValue, secondValue]) {
return firstValue + secondValue;
}

console.log(
"Total:",
calculateTotal([10, 20])
);

// Nested destructuring in function parameters
function displayContact({
name,
contact: { email },
}) {
console.log("Name:", name);
console.log("Email:", email);
}

displayContact({
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
},
});

// Destructuring from function return value
function getUser() {
return {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};
}

const {
name: returnedName,
role: returnedRole,
} = getUser();

console.log("Returned name:", returnedName);
console.log("Returned role:", returnedRole);

// Destructuring from array-returning function
function getCoordinates() {
return [40, 30];
}

const [x, y] = getCoordinates();

console.log("X:", x);
console.log("Y:", y);

// Combined object and array destructuring
const portfolio = {
owner: {
name: "Osama Abu Motlaq",
},
projects: [
"JavaScript Reference",
"Portfolio",
],
};

const {
owner: { name: ownerName },
projects: [firstProject, secondProject],
} = portfolio;

console.log("Owner:", ownerName);
console.log("First project:", firstProject);
console.log("Second project:", secondProject);

// Destructuring with optional values
const account = {
name: "Osama Abu Motlaq",
profile: {
role: "Frontend Developer",
},
};

const {
profile: {
role: accountRole,
} = {},
} = account;

console.log("Account role:", accountRole);
