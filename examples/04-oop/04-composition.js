"use strict";

// Small independent behaviors
const canCode = {
code(language) {
return `Osama Abu Motlaq is writing ${language} code.`;
},
};

const canDesign = {
design(tool) {
return `Osama Abu Motlaq is designing with ${tool}.`;
},
};

const canBuildUI = {
buildUI() {
return "Osama Abu Motlaq is building user interfaces.";
},
};

const canBuildAPI = {
buildAPI() {
return "Osama Abu Motlaq is building an API.";
},
};

// Composition with Object.assign()
const frontendDeveloper = Object.assign(
{
name: "Osama Abu Motlaq",
role: "Frontend Developer",
},
canCode,
canDesign,
canBuildUI
);

console.log(frontendDeveloper.name);
console.log(frontendDeveloper.role);
console.log(frontendDeveloper.code("JavaScript"));
console.log(frontendDeveloper.design("Figma"));
console.log(frontendDeveloper.buildUI());

// Composition with spread syntax
const fullStackDeveloper = {
name: "Osama Abu Motlaq",
role: "Full Stack JavaScript Developer",
...canCode,
...canDesign,
...canBuildUI,
...canBuildAPI,
};

console.log(fullStackDeveloper.name);
console.log(fullStackDeveloper.role);
console.log(fullStackDeveloper.code("JavaScript"));
console.log(fullStackDeveloper.design("Figma"));
console.log(fullStackDeveloper.buildUI());
console.log(fullStackDeveloper.buildAPI());

// Composing a reusable object
const createDeveloper = (name, role, ...abilities) => {
return {
name,
role,
...Object.assign({}, ...abilities),
};
};

const developer = createDeveloper(
"Osama Abu Motlaq",
"Frontend Developer",
canCode,
canBuildUI
);

console.log("Developer:", developer);
console.log(developer.code("JavaScript"));
console.log(developer.buildUI());

// Composing functions
const getName = () => "Osama Abu Motlaq";

const getRole = () => "Frontend Developer";

const getProfile = () => ({
name: getName(),
role: getRole(),
});

console.log("Profile:", getProfile());

// Function composition
const toUpperCase = (value) => value.toUpperCase();

const addRole = (value) =>
`${value} - Frontend Developer`;

const compose = (first, second) => {
return (value) => second(first(value));
};

const createLabel = compose(
toUpperCase,
addRole
);

console.log(createLabel("osama abu motlaq"));

// Composing application features
const canLogin = {
login() {
return `${this.name} logged in.`;
},
};

const canLogout = {
logout() {
return `${this.name} logged out.`;
},
};

const canManageProjects = {
addProject(project) {
this.projects.push(project);
},

getProjects() {
return this.projects;
},
};

const user = {
name: "Osama Abu Motlaq",
projects: [],
...canLogin,
...canLogout,
...canManageProjects,
};

console.log(user.login());

user.addProject("JavaScript Reference");
user.addProject("Portfolio");

console.log("Projects:", user.getProjects());

console.log(user.logout());

// Composition with factory function
const createUser = (name) => ({
name,
projects: [],

...canLogin,
...canLogout,
...canManageProjects,
});

const newUser = createUser("Osama Abu Motlaq");

newUser.login();

newUser.addProject("React Project");
newUser.addProject("Next.js Portfolio");

console.log("New user:", newUser);
console.log("New user projects:", newUser.getProjects());

// Combining different capabilities
const canFetch = {
fetchData() {
return "Data fetched successfully.";
},
};

const canStore = {
saveData(data) {
this.storage.push(data);
},

getStoredData() {
return this.storage;
},
};

const applicationService = {
name: "Osama Abu Motlaq",
storage: [],
...canFetch,
...canStore,
};

console.log(applicationService.fetchData());

applicationService.saveData("JavaScript");
applicationService.saveData("React");

console.log(
"Stored data:",
applicationService.getStoredData()
);
