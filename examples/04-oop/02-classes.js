"use strict";

// Basic class
class Developer {
constructor(name, role) {
this.name = name;
this.role = role;
}

introduce() {
return `My name is ${this.name} and I am a ${this.role}.`;
}
}

const developer = new Developer(
"Osama Abu Motlaq",
"Frontend Developer"
);

console.log(developer.introduce());

// Class with multiple properties
class User {
constructor(name, age, role) {
this.name = name;
this.age = age;
this.role = role;
}

getProfile() {
return {
name: this.name,
age: this.age,
role: this.role,
};
}
}

const user = new User(
"Osama Abu Motlaq",
25,
"Computer Science Student"
);

console.log("User profile:", user.getProfile());

// Multiple class instances
const userA = new User(
"Osama Abu Motlaq",
25,
"Frontend Developer"
);

const userB = new User(
"Osama Abu Motlaq",
26,
"Full Stack JavaScript Developer"
);

console.log("User A:", userA.getProfile());
console.log("User B:", userB.getProfile());

// Class with mutable state
class Counter {
constructor(initialValue = 0) {
this.value = initialValue;
}

increment() {
this.value++;
}

decrement() {
this.value--;
}

getValue() {
return this.value;
}
}

const counter = new Counter(10);

counter.increment();
counter.increment();
counter.decrement();

console.log("Counter value:", counter.getValue());

// Class method with parameters
class Calculator {
add(a, b) {
return a + b;
}

subtract(a, b) {
return a - b;
}

multiply(a, b) {
return a * b;
}

divide(a, b) {
if (b === 0) {
throw new Error("Cannot divide by zero.");
}

```
return a / b;
```

}
}

const calculator = new Calculator();

console.log("Add:", calculator.add(10, 5));
console.log("Subtract:", calculator.subtract(10, 5));
console.log("Multiply:", calculator.multiply(10, 5));
console.log("Divide:", calculator.divide(10, 5));

// Class with a default property
class Profile {
constructor(name) {
this.name = name;
this.role = "Computer Science Student";
}

introduce() {
return `${this.name} is a ${this.role}.`;
}
}

const profile = new Profile("Osama Abu Motlaq");

console.log(profile.introduce());

// Updating instance properties
profile.role = "Frontend Developer";

console.log(profile.introduce());

// Class containing an array
class Portfolio {
constructor(owner) {
this.owner = owner;
this.projects = [];
}

addProject(project) {
this.projects.push(project);
}

getProjects() {
return this.projects;
}
}

const portfolio = new Portfolio("Osama Abu Motlaq");

portfolio.addProject("JavaScript Reference");
portfolio.addProject("Portfolio Website");

console.log("Projects:", portfolio.getProjects());

// Class method returning an object
class Project {
constructor(title, language) {
this.title = title;
this.language = language;
}

getDetails() {
return {
title: this.title,
language: this.language,
};
}
}

const project = new Project(
"JavaScript Reference",
"JavaScript"
);

console.log("Project:", project.getDetails());

// Checking instance type
console.log(
"Is developer an instance of Developer:",
developer instanceof Developer
);

console.log(
"Is user an instance of User:",
user instanceof User
);

console.log(
"Is user an instance of Developer:",
user instanceof Developer
);

// Class with validation
class Account {
constructor(name, age) {
if (!name) {
throw new Error("Name is required.");
}

```
if (age < 18) {
  throw new Error("Age must be 18 or older.");
}

this.name = name;
this.age = age;
```

}

getInfo() {
return `${this.name} is ${this.age} years old.`;
}
}

try {
const account = new Account(
"Osama Abu Motlaq",
25
);

console.log(account.getInfo());
} catch (error) {
console.error("Account error:", error.message);
}
