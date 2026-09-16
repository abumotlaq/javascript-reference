"use strict";

// Arithmetic operators
const a = 10;
const b = 3;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);
console.log("Exponentiation:", a ** b);

// Assignment operators
let score = 10;

score += 5;
console.log("score += 5:", score);

score -= 3;
console.log("score -= 3:", score);

score *= 2;
console.log("score *= 2:", score);

score /= 4;
console.log("score /= 4:", score);

score %= 3;
console.log("score %= 3:", score);

// Increment and decrement
let count = 5;

count++;
console.log("After increment:", count);

count--;
console.log("After decrement:", count);

// Comparison operators
const age = 25;

console.log("age === 25:", age === 25);
console.log("age !== 30:", age !== 30);
console.log("age > 18:", age > 18);
console.log("age < 30:", age < 30);
console.log("age >= 25:", age >= 25);
console.log("age <= 25:", age <= 25);

// Loose equality
console.log('5 == "5":', 5 == "5");

// Strict equality
console.log('5 === "5":', 5 === "5");

// Logical operators
const hasSkills = true;
const hasExperience = false;

console.log("AND:", hasSkills && hasExperience);
console.log("OR:", hasSkills || hasExperience);
console.log("NOT:", !hasSkills);

// Nullish coalescing
const username = null;
const displayName = username ?? "Osama Abu Motlaq";

console.log("Nullish coalescing:", displayName);

// Optional chaining
const user = {
name: "Osama Abu Motlaq",
profile: {
role: "Frontend Developer",
},
};

console.log("Optional chaining:", user.profile?.role);
console.log("Optional chaining:", user.contact?.email);

// Ternary operator
const isStudent = true;

const status = isStudent
? "Computer Science Student"
: "Not a student";

console.log("Ternary:", status);

// Type operators
console.log("typeof age:", typeof age);
console.log("age instanceof Number:", age instanceof Number);

// Unary operators
let number = 7;

console.log("Unary plus:", +number);
console.log("Unary minus:", -number);

// Bitwise operators
const x = 5;
const y = 3;

console.log("Bitwise AND:", x & y);
console.log("Bitwise OR:", x | y);
console.log("Bitwise XOR:", x ^ y);
console.log("Bitwise NOT:", ~x);

// String concatenation
const firstName = "Osama Abu";
const lastName = "Motlaq";

console.log("Concatenation:", firstName + " " + lastName);

