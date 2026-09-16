# DOM

The **Document Object Model (DOM)** is the browser's programming interface for HTML documents.

It represents an HTML document as a **tree of objects (nodes)** that JavaScript can read, modify, create, and remove.

Understanding the DOM is essential for understanding how JavaScript interacts with web pages and provides an important foundation for understanding what React later abstracts.

---

## What You Will Learn

This section covers the DOM from its fundamentals to practical browser patterns.

```text
DOM
│
├── Introduction
├── Selecting Elements
├── Traversing Elements
├── Manipulating Content
├── Manipulating Attributes
├── Manipulating Styles
├── Creating & Removing Elements
│
├── Events
│   ├── Event Object
│   ├── Bubbling & Capturing
│   └── Event Delegation
│
├── Forms & Inputs
├── classList
├── dataset
├── NodeList & HTMLCollection
├── DocumentFragment
│
├── Observers
│   ├── MutationObserver
│   ├── IntersectionObserver
│   └── ResizeObserver
│
├── Performance
├── Security
├── Practical Patterns
└── Best Practices
```

---

# Learning Path

Study the files in this order.

| #  | File                                       | Topic                                         |
| -- | ------------------------------------------ | --------------------------------------------- |
| 01 | `01-dom-introduction.md`                   | DOM fundamentals and the DOM tree             |
| 02 | `02-dom-selecting-elements.md`             | Selecting elements                            |
| 03 | `03-dom-traversing-elements.md`            | Navigating the DOM tree                       |
| 04 | `04-dom-manipulating-content.md`           | Changing text and HTML                        |
| 05 | `05-dom-manipulating-attributes.md`        | Working with HTML attributes                  |
| 06 | `06-dom-manipulating-styles.md`            | Changing styles from JavaScript               |
| 07 | `07-dom-creating-and-removing-elements.md` | Creating, inserting, and removing elements    |
| 08 | `08-dom-events.md`                         | Browser events and event listeners            |
| 09 | `09-dom-event-object.md`                   | Understanding the event object                |
| 10 | `10-dom-event-bubbling-and-capturing.md`   | Event propagation                             |
| 11 | `11-dom-event-delegation.md`               | Event delegation                              |
| 12 | `12-dom-forms-and-inputs.md`               | Forms and user input                          |
| 13 | `13-dom-classlist.md`                      | Managing CSS classes                          |
| 14 | `14-dom-dataset.md`                        | Working with `data-*` attributes              |
| 15 | `15-dom-collections-and-nodelist.md`       | `NodeList`, `HTMLCollection`, and collections |
| 16 | `16-dom-fragments.md`                      | `DocumentFragment`                            |
| 17 | `17-dom-observers.md`                      | Mutation, intersection, and resize observers  |
| 18 | `18-dom-performance.md`                    | Efficient DOM manipulation                    |
| 19 | `19-dom-security.md`                       | DOM security and XSS                          |
| 20 | `20-dom-practical-patterns.md`             | Common real-world DOM patterns                |
| 21 | `21-dom-best-practices.md`                 | Professional DOM practices                    |

---

# 1. DOM Introduction

**File:** `01-dom-introduction.md`

You will learn:

* What the DOM is
* Why the browser creates a DOM
* HTML vs DOM
* The DOM tree
* Nodes and elements
* `document`
* `window` vs `document`
* Parent, child, and sibling relationships
* How JavaScript accesses the DOM
* DOM vs HTML source
* DOM changes vs changing the original HTML file

Basic mental model:

```text
HTML
  ↓
Browser parses HTML
  ↓
DOM Tree
  ↓
JavaScript interacts with the DOM
  ↓
Browser updates the rendered page
```

---

# 2. Selecting Elements

**File:** `02-dom-selecting-elements.md`

You will learn how to find elements in the DOM.

Important APIs:

```javascript
document.getElementById();
document.getElementsByClassName();
document.getElementsByTagName();

document.querySelector();
document.querySelectorAll();
```

You will also learn:

* CSS selectors
* ID selectors
* Class selectors
* Element selectors
* Attribute selectors
* Descendant selectors
* Multiple matches
* `NodeList`
* Live vs static collections
* Common selection mistakes

Example:

```javascript
const title = document.querySelector("h1");

console.log(title);
```

---

# 3. Traversing Elements

**File:** `03-dom-traversing-elements.md`

Selecting one element is only part of DOM manipulation.

You also need to understand how to move through the DOM tree.

Important properties:

```javascript
parentElement
children
firstElementChild
lastElementChild
nextElementSibling
previousElementSibling
```

You will also learn the difference between:

```javascript
parentNode
parentElement
childNodes
children
```

This becomes particularly important when dealing with text nodes and whitespace.

---

# 4. Manipulating Content

**File:** `04-dom-manipulating-content.md`

You will learn how to change what an element contains.

Important properties:

```javascript
textContent
innerHTML
innerText
```

Example:

```javascript
const title = document.querySelector("h1");

title.textContent = "Osama Abu Motlaq";
```

You will understand:

* Text vs HTML
* `textContent` vs `innerText`
* `innerHTML`
* Why blindly using `innerHTML` can be dangerous
* Replacing content
* Reading content
* Security implications

---

# 5. Manipulating Attributes

**File:** `05-dom-manipulating-attributes.md`

HTML attributes provide information and configuration for elements.

Important APIs:

```javascript
getAttribute()
setAttribute()
hasAttribute()
removeAttribute()
```

Example:

```javascript
const link = document.querySelector("a");

link.setAttribute("href", "/projects");
```

You will also learn about:

* `id`
* `class`
* `href`
* `src`
* Boolean attributes
* Attribute selectors
* Properties vs attributes

---

# 6. Manipulating Styles

**File:** `06-dom-manipulating-styles.md`

JavaScript can modify an element's styles.

Example:

```javascript
const title = document.querySelector("h1");

title.style.fontSize = "32px";
title.style.marginTop = "20px";
```

You will learn:

* `element.style`
* CSS property names in JavaScript
* Inline styles
* `style.cssText`
* `getComputedStyle()`
* CSS classes vs inline styles
* Why excessive inline-style manipulation can become difficult to maintain

---

# 7. Creating and Removing Elements

**File:** `07-dom-creating-and-removing-elements.md`

JavaScript can dynamically create DOM elements.

Important APIs:

```javascript
document.createElement()
append()
prepend()
appendChild()
before()
after()
remove()
replaceWith()
```

Example:

```javascript
const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

document.body.append(heading);
```

You will learn how elements move through the DOM and how to build dynamic interfaces with JavaScript.

---

# 8. DOM Events

**File:** `08-dom-events.md`

Events allow JavaScript to respond to user and browser actions.

Examples:

```text
click
input
change
submit
keydown
keyup
mouseover
focus
blur
```

Main API:

```javascript
element.addEventListener();
```

Example:

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("Button clicked");
});
```

You will learn:

* Event listeners
* Event types
* Callback functions
* Multiple listeners
* Removing listeners
* Event listener options
* Synchronous event handling

---

# 9. Event Object

**File:** `09-dom-event-object.md`

Event handlers receive an event object.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

Important properties and methods include:

```javascript
event.target
event.currentTarget
event.type
event.preventDefault()
event.stopPropagation()
```

You will learn exactly what information the browser provides when an event occurs.

---

# 10. Event Bubbling and Capturing

**File:** `10-dom-event-bubbling-and-capturing.md`

Events do not always belong only to the element where they occur.

They travel through the DOM's event propagation system.

Conceptually:

```text
Capturing Phase
      ↓
Target Phase
      ↓
Bubbling Phase
```

You will learn:

* Capturing
* Target phase
* Bubbling
* `stopPropagation()`
* `capture`
* `event.target`
* `event.currentTarget`

This is one of the most important DOM event concepts.

---

# 11. Event Delegation

**File:** `11-dom-event-delegation.md`

Event delegation uses event propagation to handle events from multiple elements with fewer listeners.

Instead of:

```javascript
item1.addEventListener(...);
item2.addEventListener(...);
item3.addEventListener(...);
```

You can attach one listener to a parent.

```javascript
list.addEventListener("click", (event) => {
    // Determine which child was clicked
});
```

You will learn:

* Event bubbling
* Delegation
* `target`
* `closest()`
* Dynamic elements
* Performance considerations
* When delegation is useful

---

# 12. Forms and Inputs

**File:** `12-dom-forms-and-inputs.md`

Forms are one of the most important practical uses of the DOM.

You will learn:

* Form submission
* `submit` events
* Input values
* `value`
* `checked`
* `selected`
* `FormData`
* Preventing default submission
* Basic client-side validation
* Reading multiple inputs
* Handling checkboxes and radio buttons

Example:

```javascript
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    console.log(data);
});
```

---

# 13. classList

**File:** `13-dom-classlist.md`

`classList` provides an API for manipulating CSS classes.

Important methods:

```javascript
classList.add()
classList.remove()
classList.toggle()
classList.contains()
classList.replace()
```

Example:

```javascript
const button = document.querySelector("button");

button.classList.toggle("active");
```

This is commonly used for:

* Showing and hiding elements
* Active states
* Menus
* Modals
* Tabs
* Theme switching

---

# 14. dataset

**File:** `14-dom-dataset.md`

HTML supports custom `data-*` attributes.

Example:

```html
<button data-project-id="42">
    View Project
</button>
```

JavaScript can access the value through:

```javascript
button.dataset.projectId;
```

You will learn:

* `data-*`
* `dataset`
* Naming conversion
* Reading values
* Writing values
* Event delegation with `dataset`
* Appropriate use cases

---

# 15. NodeList and HTMLCollection

**File:** `15-dom-collections-and-nodelist.md`

DOM APIs return different collection types.

For example:

```javascript
document.querySelectorAll("li");
```

returns a `NodeList`.

While:

```javascript
document.getElementsByClassName("item");
```

returns an `HTMLCollection`.

You will learn:

* `NodeList`
* `HTMLCollection`
* Static collections
* Live collections
* Iteration
* Converting collections to arrays
* `for...of`
* `forEach`
* Array methods

---

# 16. DocumentFragment

**File:** `16-dom-fragments.md`

`DocumentFragment` provides a temporary DOM container that can be useful when constructing multiple elements before inserting them into the document.

Example:

```javascript
const fragment = document.createDocumentFragment();

for (let i = 1; i <= 3; i++) {
    const item = document.createElement("li");

    item.textContent = `Project ${i}`;

    fragment.append(item);
}

document.querySelector("ul").append(fragment);
```

You will learn:

* What a fragment is
* Why it exists
* Building DOM off-document
* Inserting fragments
* Performance considerations
* When a fragment is useful
* When it is unnecessary

---

# 17. DOM Observers

**File:** `17-dom-observers.md`

Modern browsers provide observer APIs for reacting to specific changes.

Main observers:

```text
MutationObserver
IntersectionObserver
ResizeObserver
```

### MutationObserver

Detects DOM mutations.

### IntersectionObserver

Detects when elements enter or leave an observed area, such as the viewport.

### ResizeObserver

Detects changes to an element's size.

These APIs are important for modern browser applications.

---

# 18. DOM Performance

**File:** `18-dom-performance.md`

DOM manipulation can become expensive when performed excessively.

You will learn:

* DOM reads and writes
* Layout
* Paint
* Reflow
* Repaint
* Layout thrashing
* Batching updates
* Event delegation
* `DocumentFragment`
* Avoiding unnecessary DOM work
* Efficient rendering strategies

Important principle:

```text
Do less unnecessary DOM work.
```

---

# 19. DOM Security

**File:** `19-dom-security.md`

DOM manipulation can introduce security vulnerabilities when untrusted data is treated as HTML or executable content.

You will learn:

* XSS
* DOM-based XSS
* `innerHTML`
* `textContent`
* Untrusted input
* Safe rendering
* URL-related risks
* Dangerous DOM APIs
* Why escaping and sanitization matter

Example of safer text insertion:

```javascript
element.textContent = userInput;
```

instead of blindly treating `userInput` as HTML.

---

# 20. Practical DOM Patterns

**File:** `20-dom-practical-patterns.md`

This file connects the concepts together through realistic patterns.

Examples may include:

* Dynamic lists
* Tabs
* Modal dialogs
* Dropdown menus
* Accordions
* Search filtering
* Character counters
* Form handling
* Add/remove items
* Event delegation
* Theme switching
* Loading states
* Empty states

The goal is not to memorize snippets.

The goal is to understand how DOM APIs combine to solve real problems.

---

# 21. DOM Best Practices

**File:** `21-dom-best-practices.md`

The final file focuses on writing maintainable DOM code.

Topics include:

* Prefer clear selectors
* Cache elements when appropriate
* Use `addEventListener()`
* Avoid unnecessary DOM manipulation
* Prefer `textContent` for plain text
* Be careful with `innerHTML`
* Use event delegation when appropriate
* Separate data, logic, and presentation
* Avoid excessive inline styles
* Keep event handlers focused
* Validate user input
* Consider accessibility
* Clean up event listeners when necessary
* Avoid premature optimization
* Prefer browser APIs designed for the problem

---

# DOM and React

If you are learning React, understanding the DOM is **important**, but React changes how you normally work with it.

Traditional JavaScript:

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
    button.textContent = "Clicked";
});
```

React:

```jsx
function Button() {
    const [clicked, setClicked] = useState(false);

    return (
        <button onClick={() => setClicked(true)}>
            {clicked ? "Clicked" : "Click me"}
        </button>
    );
}
```

The important difference is the programming model.

### Traditional DOM

You directly tell the browser:

```text
Find this element
      ↓
Change this element
      ↓
Attach this event
      ↓
Update the DOM
```

### React

You describe what the UI should look like based on state:

```text
State
  ↓
Render
  ↓
React determines necessary DOM updates
  ↓
Browser DOM
```

This is why learning the DOM is still valuable even when working with React.

You need to understand the underlying platform that React is built around.

---

# What Matters Most for React/Next.js

Not every DOM topic deserves equal time for a React developer.

| Topic                      | React/Next.js Relevance |
| -------------------------- | ----------------------- |
| DOM fundamentals           | Very High               |
| Selecting elements         | High                    |
| Traversing                 | Medium                  |
| Content manipulation       | Medium                  |
| Attributes                 | High                    |
| Styles                     | Medium                  |
| Creating/removing elements | Medium                  |
| Events                     | Very High               |
| Event object               | Very High               |
| Bubbling/capturing         | High                    |
| Event delegation           | Medium                  |
| Forms                      | Very High               |
| `classList`                | High                    |
| `dataset`                  | Medium                  |
| NodeList/HTMLCollection    | Medium                  |
| DocumentFragment           | Low–Medium              |
| Observers                  | High                    |
| Performance                | High                    |
| Security                   | Very High               |
| Practical patterns         | High                    |
| Best practices             | Very High               |

---

# DOM vs React

A useful mental model is:

```text
JavaScript
│
├── Browser APIs
│   └── DOM
│
└── React
    └── Uses the browser platform
        and manages UI rendering for you
```

React does not replace JavaScript or the browser.

It provides a different way of organizing UI updates.

---

# DOM vs BOM

The DOM is not the entire browser environment.

### DOM

Deals primarily with the document:

```javascript
document
```

Examples:

```javascript
document.querySelector()
document.createElement()
document.body
```

### BOM

The **Browser Object Model** exposes browser-level functionality.

Examples include:

```javascript
window
location
history
navigator
screen
```

The DOM and BOM will be treated separately in this JavaScript Reference.

---

# Important DOM Objects

You will repeatedly encounter objects such as:

```javascript
window
document
Element
HTMLElement
Node
Event
NodeList
HTMLCollection
FormData
DocumentFragment
```

Understanding their relationships will make the DOM much easier to learn.

---

# Learning Strategy

Do not try to memorize every DOM API.

Instead, understand these four layers:

```text
1. Find
   ↓
2. Read
   ↓
3. Change
   ↓
4. React to events
```

For example:

```javascript
const button = document.querySelector("button");

button.textContent = "Osama Abu Motlaq";

button.addEventListener("click", () => {
    console.log("Clicked");
});
```

The example combines three fundamental operations:

```text
querySelector()
      ↓
Find the element

textContent
      ↓
Change the element

addEventListener()
      ↓
React to user interaction
```

Once these concepts are clear, more advanced DOM APIs become much easier.

---

# Recommended Practice

After completing the section, build small vanilla JavaScript projects such as:

```text
1. Counter
2. Todo List
3. Modal
4. Tabs
5. Accordion
6. Search Filter
7. Form Validator
8. Shopping Cart
9. Theme Switcher
10. Dynamic Project List
```

The purpose is to practice manipulating the DOM without React.

This creates a useful contrast:

```text
Vanilla JavaScript
        ↓
Direct DOM manipulation

React
        ↓
State-driven UI rendering
```

---

# Key Takeaways

* The DOM is an object representation of an HTML document.
* The DOM is structured as a tree of nodes.
* JavaScript can read and modify the DOM.
* Elements can be selected, traversed, created, changed, and removed.
* Events allow JavaScript to respond to user interaction.
* Event propagation includes capturing and bubbling.
* Event delegation uses propagation to handle events efficiently.
* Forms are an important DOM use case.
* Observers provide modern ways to react to DOM and viewport changes.
* Excessive DOM manipulation can hurt performance.
* Unsafe DOM manipulation can introduce XSS vulnerabilities.
* React does not eliminate the importance of understanding the DOM.
* React provides a higher-level, state-driven approach to UI rendering.
* Good DOM code focuses on clarity, correctness, performance, accessibility, and security.

---

# Final Mental Model

Think about the DOM as a tree that JavaScript can control:

```text
document
   │
   └── html
       │
       ├── head
       │
       └── body
           │
           ├── header
           │
           ├── main
           │   │
           │   ├── h1
           │   ├── p
           │   └── button
           │
           └── footer
```

JavaScript can:

```text
SELECT
   ↓
READ
   ↓
MODIFY
   ↓
CREATE
   ↓
REMOVE
   ↓
LISTEN
   ↓
RESPOND
```

That is the foundation of the DOM.
