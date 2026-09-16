"use strict";

// Rest parameters in functions
function sum(...numbers) {
return numbers.reduce(
(total, number) => total + number,
0
);
}

console.log("Sum:", sum(10, 20, 30));
console.log("Sum:", sum(5, 15, 25, 35, 45));

// Rest parameters with regular parameters
function introduce(role, ...skills) {
console.log("Name: Osama Abu Motlaq");
console.log("Role:", role);
console.log("Skills:", skills);
}

introduce(
"Frontend Developer",
"JavaScript",
"React",
"Next.js"
);

// Rest parameters with different argument counts
function listArguments(first, second, ...remaining) {
console.log("First:", first);
console.log("Second:", second);
console.log("Remaining:", remaining);
}

listArguments(
"JavaScript",
"React",
"Next.js",
"Node.js",
"Express.js"
);

// Rest parameter with array methods
function multiplyAll(multiplier, ...numbers) {
return numbers.map(
(number) => number * multiplier
);
}

console.log(
"Multiplied:",
multiplyAll(2, 1, 2, 3, 4, 5)
);

// Rest parameters with filtering
function getEvenNumbers(...numbers) {
return numbers.filter(
(number) => number % 2 === 0
);
}

console.log(
"Even numbers:",
getEvenNumbers(1, 2, 3, 4, 5, 6)
);

// Rest parameters with strings
function joinWords(separator, ...words) {
return words.join(separator);
}

console.log(
"Joined words:",
joinWords(
" - ",
"JavaScript",
"React",
"Next.js"
)
);

// Rest parameter with object values
function displayUser(name, ...details) {
console.log("Name:", name);

details.forEach((detail) => {
console.log("Detail:", detail);
});
}

displayUser(
"Osama Abu Motlaq",
"Frontend Developer",
"Palestine",
"JavaScript"
);

// Rest pattern with array destructuring
const skills = [
"JavaScript",
"React",
"Next.js",
"Node.js",
];

const [
firstSkill,
...otherSkills
] = skills;

console.log("First skill:", firstSkill);
console.log("Other skills:", otherSkills);

// Rest pattern with object destructuring
const user = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
country: "Palestine",
language: "JavaScript",
};

const {
name,
...userDetails
} = user;

console.log("Name:", name);
console.log("User details:", userDetails);

// Rest with nested destructuring
const profile = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
contact: {
email: "[osama@example.com](mailto:osama@example.com)",
phone: "+970000000000",
},
};

const {
contact,
...profileDetails
} = profile;

console.log("Contact:", contact);
console.log("Profile details:", profileDetails);

// Rest with function parameters and default values
function createProfile(
name,
role = "Computer Science Student",
...skills
) {
return {
name,
role,
skills,
};
}

console.log(
"Profile:",
createProfile(
"Osama Abu Motlaq",
"Frontend Developer",
"JavaScript",
"React",
"Next.js"
)
);

// Rest parameter in recursive processing
function countDown(...numbers) {
if (numbers.length === 0) {
return;
}

const [current, ...remaining] = numbers;

console.log(current);

countDown(...remaining);
}

countDown(5, 4, 3, 2, 1);

// Rest parameter combined with spread syntax
function addNumbers(...numbers) {
return numbers.reduce(
(total, number) => total + number,
0
);
}

const values = [10, 20, 30];

console.log(
"Spread into rest:",
addNumbers(...values)
);
