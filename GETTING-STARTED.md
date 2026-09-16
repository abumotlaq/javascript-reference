# Getting Started

This guide explains how to set up the JavaScript Reference repository, navigate its documentation, run examples, and use the project effectively as a learning and reference resource.

---

# 1. Prerequisites

Before working with this repository, you should have a basic development environment.

Recommended:

```text
Node.js
npm
Git
A code editor
A modern web browser
```

You can verify your installation with:

```bash
node --version
npm --version
git --version
```

If the commands return version numbers, the required tools are available.

---

# 2. Get the Repository

Clone the repository with Git:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd javascript-reference
```

Replace `<repository-url>` with the actual repository URL.

---

# 3. Install Dependencies

If the project has dependencies listed in `package.json`, install them with:

```bash
npm install
```

This creates the local `node_modules` directory and installs the packages defined by the project.

If the repository currently contains no runtime dependencies, this step may complete without installing additional packages.

---

# 4. Open the Project

Open the project in your editor.

For Visual Studio Code:

```bash
code .
```

The project root should look similar to:

```text
javascript-reference/
├── .gitignore
├── GETTING-STARTED.md
├── package.json
├── README.md
├── docs/
├── examples/
└── projects/
```

---

# 5. Understand the Repository Before Studying

The repository is organized into several layers.

```text
docs/
→ Main learning and reference material

examples/
→ Small focused demonstrations

projects/
→ Larger practical implementations
```

At the root:

```text
README.md
→ Project overview

GETTING-STARTED.md
→ Setup and usage guide

package.json
→ Project metadata and scripts
```

---

# 6. Start With the Fundamentals

The recommended starting point is:

```text
docs/01-fundamentals/
```

Start with:

```text
01-introduction-to-js.md
```

Then continue with:

```text
02-variables.md
03-data-types.md
04-operators.md
05-control-flow.md
```

These topics provide the foundation for the rest of the repository.

---

# 7. Continue With Functions

After fundamentals, move to:

```text
docs/02-functions/
```

Recommended order:

```text
01-functions.md
02-arrow-functions.md
03-higher-order-functions.md
04-scope-closures.md
```

Functions are a central part of modern JavaScript, so this section should be understood before moving deeply into asynchronous programming.

---

# 8. Study Asynchronous JavaScript

Next:

```text
docs/03-async/
```

Recommended order:

```text
01-callbacks.md
02-promises.md
03-async-await.md
04-error-handling.md
```

This section becomes especially important when working with APIs, network requests, React applications, Next.js, and backend services.

---

# 9. Study Object-Oriented Programming

Continue with:

```text
docs/04-oop/
```

The section progresses from JavaScript objects to more advanced OOP concepts.

Recommended progression:

```text
Objects
    ↓
Properties and Methods
    ↓
this
    ↓
Constructor Functions
    ↓
Prototypes
    ↓
Classes
    ↓
Constructors
    ↓
Methods
    ↓
Inheritance
    ↓
Private Fields
    ↓
Getters and Setters
    ↓
Polymorphism
    ↓
Encapsulation
    ↓
Abstraction
    ↓
Composition
    ↓
Best Practices
```

Do not focus only on memorizing class syntax.

Understand JavaScript's underlying object and prototype model as well.

---

# 10. Learn Modern JavaScript Features

Next:

```text
docs/05-es6-features/
```

This section contains many features that appear frequently in modern codebases.

Important topics include:

```text
let / const
Template literals
Destructuring
Spread
Rest
Default parameters
for...of
Map
Set
Modules
Optional chaining
Nullish coalescing
Logical assignment
BigInt
Private class features
```

These features are important for modern JavaScript development.

---

# 11. Study the DOM

After understanding the JavaScript language itself, continue with:

```text
docs/06-DOM/
```

A recommended order is:

```text
DOM Introduction
        ↓
Selecting Elements
        ↓
Traversing Elements
        ↓
Manipulating Content
        ↓
Manipulating Attributes
        ↓
Manipulating Styles
        ↓
Creating and Removing Elements
        ↓
Events
        ↓
Event Object
        ↓
Bubbling and Capturing
        ↓
Event Delegation
        ↓
Forms and Inputs
        ↓
classList
        ↓
dataset
        ↓
Collections and NodeLists
        ↓
Fragments
        ↓
Observers
        ↓
Performance
        ↓
Security
        ↓
Practical Patterns
        ↓
Best Practices
```

This section connects JavaScript with the actual web page.

---

# 12. Study Browser APIs and the BOM

After the DOM, continue with:

```text
docs/07-BOM/
```

The section covers browser-level capabilities such as:

```text
window
location
history
navigator
screen
storage
timers
URL
browser events
clipboard
geolocation
notifications
security
performance
```

The recommended progression is:

```text
window
    ↓
window properties
    ↓
window methods
    ↓
location
    ↓
history
    ↓
navigator
    ↓
screen
    ↓
storage
    ↓
timers
    ↓
dialogs
    ↓
URL / URLSearchParams
    ↓
online / offline
    ↓
browser events
    ↓
clipboard
    ↓
geolocation
    ↓
notifications
    ↓
security
    ↓
performance
    ↓
practical patterns
    ↓
best practices
```

---

# 13. Understand the Difference Between DOM and BOM

A useful mental model is:

```text
JavaScript
    │
    ├── DOM
    │   └── Web page/document
    │
    └── Browser APIs / BOM
        └── Browser environment
```

Examples of DOM-related work:

```js
document.querySelector(".button");
element.textContent = "Hello";
```

Examples of browser-level work:

```js
window.location.href;
localStorage.getItem("theme");
navigator.onLine;
window.innerWidth;
history.back();
```

The two areas are related, but they solve different problems.

---

# 14. Use the Section README Files

Each major directory contains a:

```text
00-README.md
```

For example:

```text
docs/01-fundamentals/00-README.md
docs/02-functions/00-README.md
docs/03-async/00-README.md
docs/04-oop/00-README.md
docs/05-es6-features/00-README.md
docs/06-DOM/00-README.md
docs/07-BOM/00-README.md
```

These files provide an overview of the section and help explain how the individual topics relate to each other.

Read the section README before starting a new major area.

---

# 15. How to Study Each Topic

Do not simply read a file from beginning to end and move on.

A stronger process is:

```text
Read
  ↓
Understand
  ↓
Run the examples
  ↓
Change the examples
  ↓
Create your own variation
  ↓
Explain the concept in your own words
  ↓
Solve a small problem
  ↓
Review common mistakes
```

For example, after learning destructuring, do not stop after reading:

```js
const { name, role } = user;
```

Change the example.

Try:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Developer",
  country: "Palestine",
};

const {
  name,
  role,
  country,
} = user;

console.log(name);
console.log(role);
console.log(country);
```

Then experiment with:

* default values
* nested objects
* renamed variables
* function parameters
* arrays

The goal is active understanding.

---

# 16. Run JavaScript Examples

For simple JavaScript files, you can run them with Node.js.

Example:

```bash
node example.js
```

For example:

```js
const name = "Osama Abu Motlaq";

console.log(`Hello, ${name}!`);
```

Running:

```bash
node example.js
```

produces:

```text
Hello, Osama Abu Motlaq!
```

---

# 17. Browser Examples

DOM and browser API examples usually require a browser because Node.js does not provide the complete browser environment.

For example:

```js
document.querySelector("button");
```

requires a document.

Likewise:

```js
window.innerWidth;
navigator.clipboard;
localStorage;
```

are browser-related APIs.

For these examples, use:

* an HTML file
* browser DevTools
* the browser console
* a small local page
* a suitable development server

---

# 18. Use Browser DevTools

Modern browser DevTools are an important part of learning JavaScript.

Useful areas include:

```text
Console
Elements
Network
Application
Sources
Performance
Security
```

For DOM topics, use:

```text
Elements
Console
```

For browser storage:

```text
Application
```

For network requests:

```text
Network
```

For performance:

```text
Performance
```

Do not rely exclusively on theoretical explanations.

Inspect what the browser actually does.

---

# 19. Use the Browser Console for Small Experiments

The browser console is useful for quickly testing browser APIs.

Examples:

```js
window.innerWidth
```

```js
navigator.onLine
```

```js
location.href
```

```js
localStorage.setItem("theme", "dark")
```

```js
localStorage.getItem("theme")
```

This is useful when learning browser behavior without creating a complete project.

---

# 20. Experiment With Code

A good learning habit is to intentionally modify examples.

Suppose the documentation contains:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});
```

Do not only copy it.

Change it:

```js
const numbers = [10, 20, 30];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled);
```

Then test your own variations.

Programming knowledge becomes stronger through experimentation.

---

# 21. Do Not Memorize Everything

You do not need to memorize every method or browser API.

Focus on understanding:

```text
What problem does it solve?
Why does it exist?
What does it return?
What inputs does it accept?
What can fail?
When should I use it?
When should I not use it?
```

Once the concept is understood, syntax can be looked up when necessary.

---

# 22. Use This Repository as a Reference

After learning a topic, the repository becomes a lookup tool.

For example:

```text
Forgot how closures work?
→ docs/02-functions/04-scope-closures.md

Forgot Promise chaining?
→ docs/03-async/02-promises.md

Forgot private class fields?
→ docs/04-oop/11-private-fields.md

Forgot optional chaining?
→ docs/05-es6-features/19-optional-chaining.md

Forgot event delegation?
→ docs/06-DOM/11-dom-event-delegation.md

Forgot localStorage behavior?
→ docs/07-BOM/08-browser-storage.md
```

The repository should become something you return to rather than something you read once.

---

# 23. Working With Examples

Examples should answer a specific question.

A useful example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const { name } = user;

console.log(name);
```

An unnecessary example would combine:

* destructuring
* classes
* promises
* DOM manipulation
* storage
* routing

all at once when the goal is only to explain destructuring.

Keep examples focused when studying individual concepts.

---

# 24. Working With Projects

Projects are where concepts should start coming together.

For example, a project may combine:

```text
Functions
+
Objects
+
Arrays
+
DOM
+
Events
+
Async JavaScript
+
Browser APIs
```

Projects should not merely repeat documentation examples.

They should require you to make decisions and solve problems.

---

# 25. Recommended Learning Loop

A practical JavaScript learning loop is:

```text
Learn a concept
      ↓
Write it manually
      ↓
Change the code
      ↓
Break the code intentionally
      ↓
Understand the error
      ↓
Build a small example
      ↓
Use the concept in a project
      ↓
Review the documentation later
```

The most important step is writing and changing the code yourself.

---

# 26. Using AI While Learning

AI can be useful as a learning assistant, but it should not replace understanding.

A productive workflow is:

```text
Try the problem yourself
        ↓
Get stuck
        ↓
Ask for an explanation or hint
        ↓
Understand the reasoning
        ↓
Write the solution yourself
        ↓
Compare approaches
        ↓
Refactor if necessary
```

Avoid copying code without understanding:

```text
"Generate everything"
        ↓
"Paste everything"
        ↓
"Hope it works"
```

That may produce a working application without producing strong programming knowledge.

Use AI to:

* explain unfamiliar concepts
* review your code
* identify bugs
* compare approaches
* generate exercises
* ask follow-up questions
* explain browser behavior

The final goal is understanding, not simply obtaining code.

---

# 27. Recommended Study Strategy for React Developers

This repository is especially useful before and alongside React learning.

A strong foundation includes:

```text
Variables
Functions
Arrow functions
Objects
Arrays
Destructuring
Spread
Modules
Higher-order functions
Closures
Promises
async / await
Error handling
DOM events
Browser APIs
```

These concepts appear frequently in React development.

For example:

```text
JavaScript functions
        ↓
React components

Closures
        ↓
Hooks and callbacks

Array methods
        ↓
Rendering lists

Objects
        ↓
Props and state

Destructuring
        ↓
Props and hooks

Promises / async
        ↓
API requests

Modules
        ↓
Component organization

Browser APIs
        ↓
Client-side functionality
```

---

# 28. When to Move to React

You do not need to master every advanced JavaScript feature before learning React.

A practical foundation is:

```text
Fundamentals
+
Functions
+
Objects / Arrays
+
Modern syntax
+
Modules
+
Promises / async / await
+
Basic DOM and events
```

Once these are comfortable, React becomes much easier to understand.

Advanced JavaScript concepts can continue to be studied alongside React.

---

# 29. When to Move to Next.js

Next.js builds on top of React and JavaScript.

Before going deeply into Next.js, be comfortable with:

```text
JavaScript fundamentals
React fundamentals
Components
Props
State
Events
Lists
Conditional rendering
Hooks
Forms
Routing concepts
Async JavaScript
API communication
```

Then Next.js concepts such as:

```text
Server Components
Client Components
Routing
Layouts
Server-side rendering
Data fetching
Route handlers
Server actions
```

become easier to understand because the underlying JavaScript concepts are already familiar.

---

# 30. Git Workflow

When making changes to the repository:

Check the current state:

```bash
git status
```

Review your changes:

```bash
git diff
```

Stage the changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "docs: update JavaScript reference"
```

Push the changes:

```bash
git push
```

Keep commits focused when possible.

For example:

```text
docs: add browser storage reference
docs: improve async JavaScript examples
docs: add BOM best practices
```

is easier to understand than a large commit containing unrelated changes.

---

# 31. Before Committing Documentation

Before committing a new or modified file, check:

```text
Correct filename
Correct folder
Consistent heading structure
Valid Markdown
Working code examples
No accidental non-technical text
No broken links
No duplicated sections
No unrelated changes
```

For code examples, make sure syntax is correct before committing.

---

# 32. Adding a New Documentation Topic

Suppose you want to add a new topic to:

```text
docs/07-BOM/
```

Follow the existing numbering convention.

For example:

```text
21-new-topic.md
```

Then document:

```text
What it is
Why it exists
Syntax
How it works
Practical examples
Common mistakes
Security considerations
Performance considerations
React / Next.js relevance when appropriate
Best practices
Quick reference
Key takeaways
```

The exact structure can vary depending on the topic, but explanations should remain practical and detailed.

---

# 33. Adding a New Section

If an entirely new category is required, follow the existing structure:

```text
08-new-section/
├── 00-README.md
├── 01-topic.md
├── 02-topic.md
└── ...
```

The section README should explain:

* the purpose of the section
* the recommended learning order
* the topics covered
* how the section connects to JavaScript development

---

# 34. Recommended File Naming Convention

Use lowercase descriptive names.

Examples:

```text
01-introduction-to-js.md
03-higher-order-functions.md
04-scope-closures.md
11-url-and-urlsearchparams.md
20-bom-best-practices.md
```

Use hyphens between words.

Avoid unnecessary spaces or inconsistent naming.

---

# 35. Markdown Conventions

Use:

```markdown
# Main Title

## Section

### Subsection
```

Use fenced code blocks:

````markdown
```js
const name = "Osama Abu Motlaq";
console.log(name);
```
````

Use inline code for JavaScript identifiers:

```markdown
`localStorage`
`Promise`
`async`
`await`
```

Keep code readable and focused.

---

# 36. Recommended Repository Workflow

A practical workflow is:

```text
Choose a topic
      ↓
Read the section README
      ↓
Read the topic
      ↓
Run the examples
      ↓
Modify the examples
      ↓
Create your own experiment
      ↓
Build a small exercise
      ↓
Review the topic
      ↓
Move to the next topic
```

After completing several topics:

```text
Build a project
      ↓
Encounter a problem
      ↓
Return to the reference
      ↓
Review the relevant concept
      ↓
Apply it to the project
```

This creates a continuous connection between theory and practice.

---

# 37. Troubleshooting

## `node` Is Not Recognized

Verify that Node.js is installed:

```bash
node --version
```

If the command is unavailable, install Node.js and restart the terminal.

---

## `npm` Is Not Recognized

Check:

```bash
npm --version
```

If unavailable, verify the Node.js installation and your system PATH.

---

## `git` Is Not Recognized

Check:

```bash
git --version
```

If unavailable, install Git and restart the terminal.

---

## Browser API Does Not Work in Node.js

This is expected for many browser APIs.

For example:

```js
window
document
navigator.geolocation
localStorage
```

are browser-related APIs and may not exist in Node.js.

Run browser examples inside a browser environment.

---

## `window` Is Not Defined

This usually means code intended for a browser is executing in an environment where `window` does not exist.

Check whether the code is running:

```text
Browser
```

or:

```text
Node.js / server
```

In React or Next.js, make sure browser-dependent logic runs on the client when required.

---

## `localStorage` Is Not Defined

`localStorage` is a browser API.

Browser-specific access should happen in a browser environment.

In frameworks supporting server rendering, avoid accessing it during server execution.

---

## Clipboard API Fails

Check:

```text
Secure context
Browser support
Permission state
User interaction
```

and always handle failure.

---

## Geolocation Fails

Check:

```text
HTTPS
Browser support
Permission
Location services
User settings
```

Do not assume the API will always return a position.

---

# 38. Keeping the Repository Healthy

As the repository grows:

* Keep topics focused.
* Avoid duplicated explanations.
* Update outdated examples.
* Remove obsolete APIs when necessary.
* Improve examples based on practical experience.
* Keep section READMEs synchronized with their contents.
* Add projects that reinforce documented concepts.
* Periodically review browser APIs and JavaScript features.

A reference repository should evolve rather than accumulate outdated information.

---

# 39. Recommended Order at a Glance

```text
01 Fundamentals
        ↓
02 Functions
        ↓
03 Async JavaScript
        ↓
04 OOP
        ↓
05 ES6+ Features
        ↓
06 DOM
        ↓
07 BOM
        ↓
Advanced
        ↓
Best Practices
        ↓
Examples
        ↓
Projects
```

This is a recommended path, not a strict requirement.

Once the fundamentals are comfortable, individual topics can be studied independently as needed.

---

# 40. Quick Start

For the simplest workflow:

```bash
git clone <repository-url>
cd javascript-reference
npm install
```

Then open:

```text
README.md
```

and start with:

```text
docs/01-fundamentals/00-README.md
```

Follow the documentation progressively and run the examples yourself.

---

# Final Advice

Do not measure progress only by the number of files you have read.

A stronger sign of progress is being able to:

```text
Explain a concept
        ↓
Write it without copying
        ↓
Modify it
        ↓
Debug it
        ↓
Recognize when to use it
        ↓
Recognize when not to use it
        ↓
Apply it inside a project
```

The purpose of this repository is to build that level of understanding.

Use the documentation as a reference, but let experimentation and projects turn that knowledge into actual programming ability.
