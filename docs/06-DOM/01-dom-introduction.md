# DOM Introduction

The **Document Object Model (DOM)** is the browser's programming interface for HTML and XML documents.

It represents a document as a structured collection of objects called **nodes**.

JavaScript can use these objects to:

* Read the document
* Change content
* Change attributes
* Change styles
* Create elements
* Remove elements
* Respond to user events
* Observe changes in the document

The DOM is one of the main ways JavaScript interacts with a web page.

---

# 1. What Is the DOM?

Consider this HTML:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Osama Abu Motlaq</title>
    </head>

    <body>
        <h1>Osama Abu Motlaq</h1>
        <p>Frontend Developer</p>
    </body>
</html>
```

The browser does not simply keep this document as a string.

It parses the HTML and creates an in-memory representation of the document.

Conceptually:

```text
HTML Source
     ↓
Browser Parser
     ↓
DOM Tree
     ↓
JavaScript can interact with it
```

The resulting structure can be visualized as:

```text
Document
   │
   └── html
       │
       ├── head
       │   └── title
       │       └── "Osama Abu Motlaq"
       │
       └── body
           ├── h1
           │   └── "Osama Abu Motlaq"
           │
           └── p
               └── "Frontend Developer"
```

This structure is called the **DOM tree**.

---

# 2. DOM Stands for Document Object Model

Each word describes an important idea.

## Document

The DOM represents a document.

In a web page, JavaScript commonly accesses the document through:

```javascript
document
```

For example:

```javascript
console.log(document);
```

The `document` object represents the current HTML document loaded in the browser.

---

## Object

The DOM represents parts of the document as JavaScript-accessible objects.

For example:

```javascript
const heading = document.querySelector("h1");

console.log(heading);
```

`heading` refers to a DOM object representing the `<h1>` element.

You can then interact with it using JavaScript:

```javascript
heading.textContent = "Osama Abu Motlaq";
```

---

## Model

The DOM is a model or representation of the document.

It is not simply the original HTML text.

For example, the source might contain:

```html
<h1>Osama Abu Motlaq</h1>
```

The browser creates an object representation that JavaScript can work with.

---

# 3. HTML vs DOM

HTML and the DOM are related, but they are not the same thing.

### HTML

HTML is the markup used to describe the initial document.

```html
<h1>Osama Abu Motlaq</h1>
```

### DOM

The browser parses that HTML and creates a live object structure.

```text
Document
   │
   └── html
       │
       └── body
           │
           └── h1
               │
               └── "Osama Abu Motlaq"
```

JavaScript modifies the DOM:

```javascript
const heading = document.querySelector("h1");

heading.textContent = "Frontend Developer";
```

The browser then reflects that change visually.

---

# 4. The DOM Is a Tree

The DOM is commonly described as a **tree structure** because nodes have relationships such as:

* Parent
* Child
* Sibling
* Descendant
* Ancestor

Example:

```html
<body>
    <main>
        <h1>Osama Abu Motlaq</h1>
        <p>Frontend Developer</p>
    </main>
</body>
```

Conceptually:

```text
body
 │
 └── main
      │
      ├── h1
      │    └── "Osama Abu Motlaq"
      │
      └── p
           └── "Frontend Developer"
```

Here:

```text
main is the parent of h1
main is the parent of p

h1 and p are siblings

body is an ancestor of h1

h1 is a descendant of body
```

Understanding these relationships is essential for DOM traversal.

---

# 5. Nodes

The DOM is made of **nodes**.

A node is a general object in the DOM tree.

Common node types include:

```text
Document
Element
Text
Comment
DocumentType
```

For example:

```html
<p>Hello</p>
```

Conceptually contains:

```text
Element Node
    │
    └── Text Node
          └── "Hello"
```

This distinction becomes important when using properties such as:

```javascript
childNodes
```

because `childNodes` can include text nodes, not only elements.

---

# 6. Element Nodes

An element node represents an HTML element.

For example:

```html
<h1>Osama Abu Motlaq</h1>
```

The `<h1>` itself is an element node.

JavaScript can access it:

```javascript
const heading = document.querySelector("h1");

console.log(heading);
```

The returned object provides many properties and methods.

For example:

```javascript
heading.textContent;
heading.id;
heading.className;
heading.classList;
heading.getAttribute("id");
```

---

# 7. Text Nodes

Text inside an element is represented by a text node.

Consider:

```html
<h1>Osama Abu Motlaq</h1>
```

Conceptually:

```text
h1
 │
 └── Text Node
       │
       └── "Osama Abu Motlaq"
```

This matters because the DOM does not consist only of HTML elements.

Whitespace can also create text nodes.

For example:

```html
<div>
    <p>Osama Abu Motlaq</p>
</div>
```

The whitespace and line breaks can become text nodes in the DOM.

This is one reason why these properties are different:

```javascript
childNodes
```

and:

```javascript
children
```

`childNodes` can contain text nodes.

`children` contains element children.

---

# 8. The Document Object

The global `document` object represents the current document.

Example:

```javascript
console.log(document);
```

It provides access to important parts of the page.

Examples:

```javascript
document.documentElement;
document.head;
document.body;
```

For a normal HTML document:

```text
document
   │
   └── html
       ├── head
       └── body
```

Therefore:

```javascript
document.documentElement
```

refers to the `<html>` element.

```javascript
document.head
```

refers to `<head>`.

```javascript
document.body
```

refers to `<body>`.

---

# 9. `window` vs `document`

A common beginner mistake is treating `window` and `document` as the same thing.

They are different.

## `window`

`window` represents the browser window and provides access to many browser-level APIs.

Examples:

```javascript
window.location;
window.history;
window.navigator;
window.innerWidth;
```

It also provides browser functions such as:

```javascript
window.setTimeout();
window.setInterval();
```

---

## `document`

`document` represents the loaded document.

Examples:

```javascript
document.body;
document.head;
document.querySelector();
document.createElement();
```

A useful mental model:

```text
window
   │
   ├── browser-level APIs
   │
   └── document
        │
        └── HTML DOM tree
```

The DOM is primarily concerned with the document.

The BOM section of this reference will cover browser-level APIs in more detail.

---

# 10. Selecting a DOM Element

JavaScript can search the DOM for elements.

For example:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

JavaScript:

```javascript
const title = document.querySelector("#title");

console.log(title);
```

The variable:

```javascript
title
```

now references the actual DOM element.

This allows JavaScript to interact with it.

For example:

```javascript
title.textContent = "Frontend Developer";
```

---

# 11. DOM References

A DOM element is an object.

When you assign it to a variable:

```javascript
const title = document.querySelector("h1");
```

the variable holds a reference to that DOM object.

You are not creating another copy of the element.

Conceptually:

```text
DOM
 │
 └── <h1>
       ↑
       │
     title
```

Therefore:

```javascript
title.textContent = "Osama Abu Motlaq";
```

modifies the actual element represented by that reference.

---

# 12. Reading from the DOM

JavaScript can read information from DOM elements.

Example:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

```javascript
const title = document.querySelector("#title");

console.log(title.textContent);
```

Output:

```text
Osama Abu Motlaq
```

You can also read properties:

```javascript
console.log(title.id);
console.log(title.tagName);
console.log(title.className);
```

DOM manipulation is therefore not only about changing the page.

It also allows JavaScript to inspect the current document.

---

# 13. Changing the DOM

JavaScript can modify DOM objects.

Example:

```javascript
const title = document.querySelector("#title");

title.textContent = "Osama Abu Motlaq";
```

The DOM changes from:

```html
<h1 id="title">Old Title</h1>
```

to a DOM state equivalent to:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

The original `.html` file on your computer has not been rewritten.

This distinction is important.

---

# 14. DOM Changes Do Not Rewrite the HTML File

Suppose your HTML file contains:

```html
<h1>Original Title</h1>
```

JavaScript executes:

```javascript
document.querySelector("h1").textContent = "Osama Abu Motlaq";
```

The browser now displays:

```text
Osama Abu Motlaq
```

But JavaScript did not modify the `.html` file stored on your computer.

The change happened in the browser's in-memory document.

Conceptually:

```text
HTML File
   │
   │ parsed by browser
   ↓
DOM in memory
   │
   │ JavaScript modifies
   ↓
Updated DOM
   │
   ↓
Browser renders updated page
```

---

# 15. The DOM Is Live

The DOM represents the current state of the document.

Suppose:

```javascript
const title = document.querySelector("h1");

console.log(title.textContent);
```

returns:

```text
Osama Abu Motlaq
```

Then:

```javascript
title.textContent = "Frontend Developer";
```

The DOM now contains the new text.

Other JavaScript code that accesses that element can observe the updated state.

This is why it is useful to think of the DOM as a **live object model of the document**, rather than a static copy of the HTML source.

---

# 16. Parent and Child Relationships

Consider:

```html
<main>
    <h1>Osama Abu Motlaq</h1>
</main>
```

The DOM relationship is:

```text
main
 │
 └── h1
```

JavaScript can navigate this relationship.

```javascript
const heading = document.querySelector("h1");

console.log(heading.parentElement);
```

This returns the `<main>` element.

Likewise:

```javascript
const main = document.querySelector("main");

console.log(main.children);
```

This gives access to its element children.

DOM traversal will be covered in detail in:

```text
03-dom-traversing-elements.md
```

---

# 17. Sibling Relationships

Consider:

```html
<div>
    <h1>Osama Abu Motlaq</h1>
    <p>Frontend Developer</p>
</div>
```

The `<h1>` and `<p>` elements are siblings.

Conceptually:

```text
div
 │
 ├── h1
 │
 └── p
```

JavaScript can navigate from one element to another:

```javascript
const heading = document.querySelector("h1");

console.log(heading.nextElementSibling);
```

This returns the `<p>` element.

---

# 18. Descendants and Ancestors

Suppose:

```html
<body>
    <main>
        <section>
            <h1>Osama Abu Motlaq</h1>
        </section>
    </main>
</body>
```

The relationships include:

```text
body
 └── main
      └── section
           └── h1
```

For the `<h1>`:

```text
Ancestors:
body
main
section

Descendant:
None in this example
```

For `<main>`:

```text
Descendant:
section
h1
```

These relationships become important when selecting and traversing DOM elements.

---

# 19. DOM APIs

The browser exposes many APIs for interacting with the DOM.

Examples:

### Finding elements

```javascript
document.querySelector();
document.querySelectorAll();
document.getElementById();
```

### Reading and changing content

```javascript
element.textContent;
element.innerHTML;
```

### Attributes

```javascript
element.getAttribute();
element.setAttribute();
element.removeAttribute();
```

### Classes

```javascript
element.classList.add();
element.classList.remove();
element.classList.toggle();
```

### Creating elements

```javascript
document.createElement();
```

### Inserting elements

```javascript
element.append();
element.prepend();
```

### Removing elements

```javascript
element.remove();
```

### Events

```javascript
element.addEventListener();
```

These APIs will be covered individually in the following files.

---

# 20. DOM and Browser Rendering

The DOM is one part of the browser's rendering process.

A simplified model is:

```text
HTML
 │
 ↓
DOM
 │
 ├───────────────┐
 ↓               ↓
CSS              Styles
 │               │
 └───────┬───────┘
         ↓
    Render Tree
         ↓
       Layout
         ↓
        Paint
         ↓
      Display
```

This is a simplified conceptual model rather than a complete description of every browser engine's internal pipeline.

The important idea is:

> JavaScript can modify the DOM, and those changes can cause the browser to perform additional rendering work.

This becomes important when studying DOM performance.

---

# 21. DOM and CSS

The DOM represents the document structure.

CSS describes presentation.

For example:

```html
<h1 class="title">Osama Abu Motlaq</h1>
```

JavaScript can modify the element:

```javascript
const title = document.querySelector(".title");

title.classList.add("active");
```

CSS can then determine what the `.active` class looks like.

This separation is usually preferable to putting large amounts of styling logic directly into JavaScript.

---

# 22. DOM Events

The DOM also provides an event system.

For example:

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq clicked the button");
});
```

When the user clicks the button:

```text
User action
    ↓
Browser detects click
    ↓
DOM event system
    ↓
Event listener
    ↓
Callback executes
```

Events are a major part of DOM programming and will be covered in detail later.

---

# 23. Static HTML vs Dynamic DOM

HTML can define the initial document:

```html
<ul>
    <li>Project One</li>
</ul>
```

JavaScript can dynamically add another item:

```javascript
const item = document.createElement("li");

item.textContent = "Project Two";

document.querySelector("ul").append(item);
```

The browser now has:

```text
ul
├── li → Project One
└── li → Project Two
```

This is dynamic DOM manipulation.

---

# 24. DOM Is Not the Same as the Visual Page

The DOM represents the document structure, but it is not simply a screenshot of what the user sees.

An element can exist in the DOM while being hidden through CSS.

For example:

```css
.hidden {
    display: none;
}
```

The element may still exist in the DOM even though it is not currently visible.

Therefore:

```text
DOM existence
    ≠
Visual visibility
```

This distinction becomes important when working with CSS, layout, accessibility, and rendering.

---

# 25. DOM vs Virtual DOM

You will often hear the term **Virtual DOM** when learning React.

The browser has an actual DOM:

```text
Browser
└── DOM
```

React uses its own rendering representation and reconciliation process to determine updates to the browser DOM.

A simplified mental model is:

```text
React state
    ↓
React rendering
    ↓
React determines changes
    ↓
Browser DOM updates
```

Do not think of React as replacing the browser DOM.

React ultimately works with the browser platform and DOM when rendering a web application.

---

# 26. Why Learn the DOM Before React?

React abstracts many direct DOM operations, but understanding the DOM helps explain what React is doing.

For example, vanilla JavaScript:

```javascript
const title = document.querySelector("h1");

title.textContent = "Osama Abu Motlaq";
```

You directly select and modify an element.

React instead encourages describing UI from state:

```jsx
function Profile() {
    const name = "Osama Abu Motlaq";

    return <h1>{name}</h1>;
}
```

The conceptual difference is:

```text
Vanilla JavaScript

Find DOM
   ↓
Modify DOM
   ↓
Browser updates page
```

versus:

```text
React

State / Props
   ↓
Render UI description
   ↓
React calculates necessary changes
   ↓
Browser DOM
```

Understanding the first model makes the second model easier to reason about.

---

# 27. DOM Is a Browser API

An important distinction:

JavaScript itself is a language.

The DOM is a browser-provided API.

For example:

```javascript
const result = Math.max(10, 20);
```

`Math.max()` is part of the JavaScript language's standard library.

But:

```javascript
document.querySelector("h1");
```

depends on the browser's DOM API.

This distinction becomes important when working with Node.js.

Node.js provides JavaScript execution outside the browser, but it does not provide the browser DOM by default.

---

# 28. JavaScript vs DOM vs Web APIs

A useful distinction is:

```text
JavaScript
│
├── Language features
│   ├── Variables
│   ├── Functions
│   ├── Objects
│   ├── Classes
│   ├── Promises
│   └── Modules
│
└── Host environment APIs
    └── Browser
        ├── DOM
        ├── Fetch
        ├── Storage
        ├── Timers
        └── Other Web APIs
```

The exact standards and implementation boundaries are more nuanced, but this model is useful for learning.

---

# 29. DOM in the Browser vs Node.js

Browser JavaScript:

```javascript
document.querySelector("h1");
```

requires a DOM environment.

Node.js does not normally provide:

```javascript
document
```

as a browser would.

For example, server-side JavaScript does not automatically have:

```javascript
document.querySelector();
```

This is one reason code written specifically for the browser may not run unchanged in Node.js.

---

# 30. DOM and Next.js

Next.js can execute JavaScript in different environments.

Some code runs on the server.

Some code runs in the browser.

Direct DOM access requires a browser environment.

For example, this requires the browser:

```javascript
document.querySelector("h1");
```

A server-side environment does not have the browser's `document` object.

This distinction becomes important when using browser APIs inside React components in Next.js.

---

# 31. DOM Access in React

In React, direct DOM access is usually not the first choice.

Instead of:

```javascript
document.querySelector("#input");
```

React commonly uses a `ref` when direct access to a DOM node is actually necessary.

Example:

```jsx
import { useRef } from "react";

function Input() {
    const inputRef = useRef(null);

    return <input ref={inputRef} />;
}
```

Then:

```javascript
inputRef.current
```

can reference the DOM element.

The important principle is:

> React generally manages rendering declaratively; direct DOM manipulation should be reserved for cases where it is actually necessary.

---

# 32. Common Beginner Mistakes

## Mistake 1: Thinking HTML and DOM are identical

HTML is markup.

The DOM is the browser's object representation of the document.

---

## Mistake 2: Thinking DOM changes modify the HTML file

They usually modify the in-memory document.

They do not rewrite your source file.

---

## Mistake 3: Thinking every DOM node is an element

The DOM contains multiple node types.

```text
Node
├── Element
├── Text
├── Comment
└── Other node types
```

---

## Mistake 4: Confusing `window` and `document`

```text
window
  → browser window/environment

document
  → current document/DOM
```

---

## Mistake 5: Assuming the DOM is only visible elements

An element can exist in the DOM without being visually displayed.

---

## Mistake 6: Using the DOM from server-side code

Browser-only objects such as:

```javascript
window
document
```

are not automatically available in server environments.

---

## Mistake 7: Manipulating the DOM before it exists

Consider:

```javascript
const title = document.querySelector("h1");
```

If the `<h1>` does not exist yet, the result may be:

```javascript
null
```

The timing of JavaScript execution matters.

Modern modules and browser script loading strategies can help control execution timing, but the underlying issue is always the same:

> The element must exist in the document before code can select it.

---

# 33. A Complete Small Example

HTML:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>DOM Example</title>
    </head>

    <body>
        <h1 id="title">Original Title</h1>

        <button id="changeButton">
            Change Title
        </button>

        <script src="script.js"></script>
    </body>
</html>
```

JavaScript:

```javascript
const title = document.querySelector("#title");
const button = document.querySelector("#changeButton");

button.addEventListener("click", () => {
    title.textContent = "Osama Abu Motlaq";
});
```

What happens?

### Step 1

The browser parses the HTML.

```text
HTML
 ↓
DOM
```

### Step 2

JavaScript selects the elements.

```javascript
document.querySelector("#title");
document.querySelector("#changeButton");
```

### Step 3

An event listener is registered.

```javascript
button.addEventListener("click", ...);
```

### Step 4

The user clicks the button.

### Step 5

The callback executes.

```javascript
title.textContent = "Osama Abu Motlaq";
```

### Step 6

The DOM is updated.

### Step 7

The browser updates the rendered page as needed.

Mental model:

```text
HTML
 ↓
DOM
 ↓
JavaScript finds elements
 ↓
User interacts
 ↓
Event fires
 ↓
JavaScript changes DOM
 ↓
Browser updates rendering
```

---

# 34. A Better Mental Model

Do not think:

```text
HTML = page
```

Think:

```text
HTML
  ↓
Initial document structure
```

Then:

```text
Browser
  ↓
Parses HTML
  ↓
Creates DOM
  ↓
JavaScript interacts with DOM
  ↓
DOM can change
  ↓
Browser renders the current state
```

The DOM is therefore the **runtime object representation of the document**.

---

# 35. Quick Reference

| Concept                    | Meaning                                  |
| -------------------------- | ---------------------------------------- |
| DOM                        | Object representation of a document      |
| `document`                 | Object representing the current document |
| Node                       | General type of object in the DOM tree   |
| Element                    | Node representing an HTML/XML element    |
| Text node                  | Node containing text                     |
| Parent                     | Node directly containing another node    |
| Child                      | Node directly contained by another node  |
| Sibling                    | Nodes sharing the same parent            |
| Ancestor                   | A parent at any level above a node       |
| Descendant                 | A child at any level below a node        |
| `window`                   | Browser window/global environment        |
| `document.body`            | The document's `<body>` element          |
| `document.head`            | The document's `<head>` element          |
| `document.documentElement` | The document's `<html>` element          |
| `querySelector()`          | Finds the first matching element         |
| `querySelectorAll()`       | Finds all matching elements              |
| `textContent`              | Reads/changes text content               |
| `addEventListener()`       | Registers an event listener              |

---

# 36. Key Takeaways

* The DOM stands for **Document Object Model**.
* Browsers parse HTML and create a DOM representation.
* The DOM is structured as a tree.
* The DOM contains different types of nodes.
* An HTML element is one type of DOM node.
* Text inside elements can exist as text nodes.
* `document` represents the current document.
* `window` represents the browser window/environment.
* JavaScript can read and modify the DOM.
* DOM modifications normally affect the current in-memory document, not the original HTML file.
* DOM relationships include parents, children, siblings, ancestors, and descendants.
* Events allow JavaScript to respond to user interactions.
* The DOM is a browser API, not the JavaScript language itself.
* Node.js does not provide the browser DOM by default.
* Direct DOM access in Next.js requires consideration of the execution environment.
* React abstracts much of the direct DOM manipulation, but understanding the DOM remains important.

---

# Final Mental Model

```text
                    Browser
                       │
                       ▼
                    HTML
                       │
                  HTML Parser
                       │
                       ▼
                   DOM Tree
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Select        Read         Events
          │            │            │
          └────────────┼────────────┘
                       ▼
                  Modify DOM
                       │
                       ▼
                Browser Rendering
                       │
                       ▼
                 Updated Page
```

The essential idea is simple:

> **HTML defines the initial document, the browser turns it into the DOM, and JavaScript can interact with that DOM at runtime.**
