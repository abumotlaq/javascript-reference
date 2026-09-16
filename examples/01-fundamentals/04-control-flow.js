"use strict";

// if
const age = 25;

if (age >= 18) {
console.log("Osama Abu Motlaq is an adult.");
}

// if...else
const isStudent = true;

if (isStudent) {
console.log("Osama Abu Motlaq is a student.");
} else {
console.log("Osama Abu Motlaq is not a student.");
}

// if...else if...else
const score = 82;

if (score >= 90) {
console.log("Grade: A");
} else if (score >= 80) {
console.log("Grade: B");
} else if (score >= 70) {
console.log("Grade: C");
} else {
console.log("Grade: F");
}

// Nested if
const hasAccount = true;
const isVerified = true;

if (hasAccount) {
if (isVerified) {
console.log("Account verified.");
}
}

// Ternary operator
const role = isStudent
? "Computer Science Student"
: "Not a student";

console.log("Role:", role);

// switch
const language = "JavaScript";

switch (language) {
case "JavaScript":
console.log("Osama Abu Motlaq is studying JavaScript.");
break;

case "TypeScript":
console.log("Osama Abu Motlaq is studying TypeScript.");
break;

default:
console.log("Unknown language.");
}

// for loop
for (let i = 1; i <= 5; i++) {
console.log("for loop:", i);
}

// while loop
let count = 1;

while (count <= 5) {
console.log("while loop:", count);
count++;
}

// do...while loop
let number = 1;

do {
console.log("do...while loop:", number);
number++;
} while (number <= 5);

// for...of
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
console.log("for...of:", skill);
}

// for...in
const user = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

for (const key in user) {
console.log("for...in:", key, user[key]);
}

// break
for (let i = 1; i <= 10; i++) {
if (i === 6) {
break;
}

console.log("break:", i);
}

// continue
for (let i = 1; i <= 5; i++) {
if (i === 3) {
continue;
}

console.log("continue:", i);
}

// Logical short-circuiting
const hasSkills = true;
const hasExperience = false;

hasSkills && console.log("Osama Abu Motlaq has JavaScript skills.");

hasExperience || console.log(
"Osama Abu Motlaq is still building professional experience."
);

// Early return
function checkAge(age) {
if (age < 18) {
return "Access denied.";
}

return "Access granted.";
}

console.log(checkAge(25));
console.log(checkAge(16));
