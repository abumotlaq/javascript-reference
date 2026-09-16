"use strict";

// Base class
class Developer {
constructor(name, role) {
this.name = name;
this.role = role;
}

introduce() {
return `My name is ${this.name} and I am a ${this.role}.`;
}

writeCode() {
return `${this.name} is writing JavaScript code.`;
}
}

// Derived class
class FrontendDeveloper extends Developer {
constructor(name) {
super(name, "Frontend Developer");
}

buildUI() {
return `${this.name} is building a user interface.`;
}
}

const frontendDeveloper = new FrontendDeveloper(
"Osama Abu Motlaq"
);

console.log(frontendDeveloper.introduce());
console.log(frontendDeveloper.writeCode());
console.log(frontendDeveloper.buildUI());

// Another derived class
class BackendDeveloper extends Developer {
constructor(name) {
super(name, "Backend Developer");
}

buildAPI() {
return `${this.name} is building an API.`;
}
}

const backendDeveloper = new BackendDeveloper(
"Osama Abu Motlaq"
);

console.log(backendDeveloper.introduce());
console.log(backendDeveloper.writeCode());
console.log(backendDeveloper.buildAPI());

// Multi-level inheritance
class FullStackDeveloper extends FrontendDeveloper {
constructor(name) {
super(name);
this.role = "Full Stack JavaScript Developer";
}

buildBackend() {
return `${this.name} is building backend features.`;
}
}

const fullStackDeveloper = new FullStackDeveloper(
"Osama Abu Motlaq"
);

console.log(fullStackDeveloper.introduce());
console.log(fullStackDeveloper.writeCode());
console.log(fullStackDeveloper.buildUI());
console.log(fullStackDeveloper.buildBackend());

// Method overriding
class SeniorFrontendDeveloper extends FrontendDeveloper {
writeCode() {
return `${this.name} is writing production-ready frontend code.`;
}
}

const seniorDeveloper = new SeniorFrontendDeveloper(
"Osama Abu Motlaq"
);

console.log(seniorDeveloper.introduce());
console.log(seniorDeveloper.writeCode());
console.log(seniorDeveloper.buildUI());

// Calling the parent method with super
class ReactDeveloper extends FrontendDeveloper {
introduce() {
const baseIntroduction = super.introduce();

```
return `${baseIntroduction} Osama works with React.`;
```

}
}

const reactDeveloper = new ReactDeveloper(
"Osama Abu Motlaq"
);

console.log(reactDeveloper.introduce());
console.log(reactDeveloper.buildUI());

// instanceof
console.log(
"Is frontendDeveloper an instance of FrontendDeveloper:",
frontendDeveloper instanceof FrontendDeveloper
);

console.log(
"Is frontendDeveloper an instance of Developer:",
frontendDeveloper instanceof Developer
);

console.log(
"Is fullStackDeveloper an instance of FrontendDeveloper:",
fullStackDeveloper instanceof FrontendDeveloper
);

console.log(
"Is fullStackDeveloper an instance of Developer:",
fullStackDeveloper instanceof Developer
);

// Inherited properties
console.log("Frontend role:", frontendDeveloper.role);
console.log("Backend role:", backendDeveloper.role);
console.log("Full Stack role:", fullStackDeveloper.role);

// Shared base behavior
const developers = [
frontendDeveloper,
backendDeveloper,
fullStackDeveloper,
];

developers.forEach((developer) => {
console.log(developer.introduce());
});
