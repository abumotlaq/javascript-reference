"use strict";

// Object literal
const user = {
name: "Osama Abu Motlaq",
age: 25,
role: "Frontend Developer",
};

console.log("User:", user);

// Accessing properties
console.log("Name:", user.name);
console.log("Age:", user.age);
console.log("Role:", user.role);

// Bracket notation
console.log("Name:", user["name"]);
console.log("Role:", user["role"]);

// Adding properties
user.country = "Palestine";
user.skills = ["JavaScript", "React", "Next.js"];

console.log("Updated user:", user);

// Updating properties
user.age = 26;
user.role = "Full Stack JavaScript Developer";

console.log("Updated age:", user.age);
console.log("Updated role:", user.role);

// Deleting properties
delete user.country;

console.log("After deleting country:", user);

// Object with a method
const developer = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",

introduce() {
return `My name is ${this.name} and I am a ${this.role}.`;
},
};

console.log(developer.introduce());

// Nested objects
const profile = {
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
phone: "+970000000000",
},
location: {
country: "Palestine",
city: "Gaza",
},
};

console.log("Email:", profile.contact.email);
console.log("Country:", profile.location.country);

// Object containing arrays
const portfolio = {
owner: "Osama Abu Motlaq",
technologies: [
"JavaScript",
"React",
"Next.js",
],
projects: [
"JavaScript Reference",
"Portfolio",
],
};

console.log(
"Technologies:",
portfolio.technologies
);

console.log(
"Projects:",
portfolio.projects
);

// Computed property
const propertyName = "role";

const person = {
name: "Osama Abu Motlaq",
[propertyName]: "Frontend Developer",
};

console.log("Computed property:", person.role);

// Shorthand properties
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";
const age = 25;

const developerProfile = {
name,
role,
age,
};

console.log("Shorthand object:", developerProfile);

// Object reference
const originalUser = {
name: "Osama Abu Motlaq",
};

const userReference = originalUser;

userReference.name = "Osama Abu Motlaq - Developer";

console.log("Original object:", originalUser);
console.log("Reference:", userReference);

// Copying an object with spread syntax
const firstUser = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

const copiedUser = {
...firstUser,
};

copiedUser.role = "Full Stack JavaScript Developer";

console.log("Original user:", firstUser);
console.log("Copied user:", copiedUser);

// Checking properties
console.log(
"Has name:",
"name" in firstUser
);

console.log(
"Has email:",
"email" in firstUser
);

// Object.keys()
console.log(
"Keys:",
Object.keys(firstUser)
);

// Object.values()
console.log(
"Values:",
Object.values(firstUser)
);

// Object.entries()
console.log(
"Entries:",
Object.entries(firstUser)
);

// Object.assign()
const baseProfile = {
name: "Osama Abu Motlaq",
};

const additionalProfile = {
role: "Frontend Developer",
country: "Palestine",
};

const completeProfile = Object.assign(
{},
baseProfile,
additionalProfile
);

console.log("Complete profile:", completeProfile);

// Object.freeze()
const settings = {
theme: "dark",
};

Object.freeze(settings);

console.log("Frozen object:", settings);

// Object.seal()
const account = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

Object.seal(account);

account.role = "Full Stack JavaScript Developer";

console.log("Sealed object:", account);

// Destructuring an object
const project = {
title: "JavaScript Reference",
language: "JavaScript",
};

const {
title,
language,
} = project;

console.log("Project title:", title);
console.log("Project language:", language);

// Optional chaining with objects
const accountProfile = {
name: "Osama Abu Motlaq",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
},
};

console.log(
"Email:",
accountProfile.contact?.email
);

console.log(
"Phone:",
accountProfile.contact?.phone
);

// Nullish coalescing with objects
const username = accountProfile.username ?? "Osama Abu Motlaq";

console.log("Username:", username);
