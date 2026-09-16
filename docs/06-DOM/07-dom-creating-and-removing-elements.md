# DOM Creating and Removing Elements

JavaScript can create new DOM elements, configure them, insert them into the document, replace existing elements, and remove elements.

This gives JavaScript the ability to build and modify the DOM dynamically.

The general lifecycle is:

```text
Create
  ↓
Configure
  ↓
Insert
  ↓
Update
  ↓
Replace or Remove
```

For example:

```javascript
const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

document.body.append(heading);
```

This creates a new `<h2>` element, gives it text, and inserts it into the document.

---

# 1. Creating an Element with `createElement()`

The primary method for creating a DOM element is:

```javascript
document.createElement()
```

Syntax:

```javascript
const element = document.createElement("tagName");
```

Example:

```javascript
const paragraph = document.createElement("p");
```

This creates a new paragraph element in memory.

At this point, it has not been inserted into the page.

Think of it as:

```text
JavaScript
    ↓
createElement()
    ↓
New DOM element
    ↓
Not yet visible in the document
```

---

# 2. Creating Does Not Mean Inserting

Consider:

```javascript
const heading = document.createElement("h1");
```

The element exists as a JavaScript object.

But it is not automatically displayed.

You still need to insert it somewhere:

```javascript
document.body.append(heading);
```

The important distinction is:

```text
createElement()
    ↓
Creates the node

append()
    ↓
Places the node into the document
```

---

# 3. Creating and Adding Text

After creating an element:

```javascript
const heading = document.createElement("h1");
```

you can set its text:

```javascript
heading.textContent = "Osama Abu Motlaq";
```

Then insert it:

```javascript
document.body.append(heading);
```

Complete example:

```javascript
const heading = document.createElement("h1");

heading.textContent = "Osama Abu Motlaq";

document.body.append(heading);
```

The resulting DOM is conceptually:

```html
<body>
    <h1>Osama Abu Motlaq</h1>
</body>
```

---

# 4. Creating an Element with Attributes

You can configure the element before inserting it.

Example:

```javascript
const image = document.createElement("img");

image.src = "osama.png";
image.alt = "Osama Abu Motlaq";
```

Then:

```javascript
document.body.append(image);
```

The resulting HTML is conceptually:

```html
<img src="osama.png" alt="Osama Abu Motlaq">
```

You can also use the attribute API:

```javascript
image.setAttribute("src", "osama.png");
image.setAttribute("alt", "Osama Abu Motlaq");
```

---

# 5. Creating an Element with Classes

You can use `classList`:

```javascript
const card = document.createElement("div");

card.classList.add("profile-card");
```

Then:

```javascript
document.body.append(card);
```

The resulting element has:

```html
<div class="profile-card"></div>
```

You can add multiple classes:

```javascript
card.classList.add("profile-card", "active");
```

---

# 6. Creating an Element with an ID

You can set the `id` property:

```javascript
const section = document.createElement("section");

section.id = "about";
```

Or:

```javascript
section.setAttribute("id", "about");
```

Both can produce:

```html
<section id="about"></section>
```

---

# 7. The General Creation Pattern

A common DOM creation pattern is:

```javascript
const element = document.createElement("tag");

element.textContent = "Content";

element.classList.add("class-name");

element.setAttribute("attribute", "value");

parent.append(element);
```

The stages are:

```text
1. Create
2. Configure
3. Insert
```

This pattern appears frequently in vanilla JavaScript applications.

---

# 8. `append()`

The `append()` method adds content to the end of an element.

Example:

```javascript
const container = document.querySelector("#container");

const paragraph = document.createElement("p");

paragraph.textContent = "Osama Abu Motlaq";

container.append(paragraph);
```

Result:

```html
<div id="container">
    <p>Osama Abu Motlaq</p>
</div>
```

---

# 9. `append()` Can Add Multiple Items

Unlike `appendChild()`, `append()` can accept multiple arguments.

Example:

```javascript
const heading = document.createElement("h2");
heading.textContent = "Osama Abu Motlaq";

const paragraph = document.createElement("p");
paragraph.textContent = "Frontend Developer";

container.append(heading, paragraph);
```

Result:

```html
<div id="container">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

---

# 10. `append()` Can Add Strings

`append()` can also add strings.

Example:

```javascript
container.append("Hello");
```

This creates text content.

You can combine nodes and strings:

```javascript
container.append(
    "Profile: ",
    heading
);
```

Strings are inserted as text, not parsed as HTML.

---

# 11. `appendChild()`

Another method is:

```javascript
appendChild()
```

Example:

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = "Osama Abu Motlaq";

container.appendChild(paragraph);
```

Result:

```html
<div id="container">
    <p>Osama Abu Motlaq</p>
</div>
```

---

# 12. `append()` vs `appendChild()`

They are similar but not identical.

### `append()`

```javascript
container.append(element);
```

Can accept:

* Nodes
* Strings
* Multiple arguments

### `appendChild()`

```javascript
container.appendChild(element);
```

Accepts:

* A single `Node`

It returns the appended node.

For example:

```javascript
const addedElement = container.appendChild(paragraph);
```

Then:

```javascript
addedElement === paragraph;
```

is:

```text
true
```

---

# 13. Why `append()` Is Often Convenient

Modern DOM code often uses:

```javascript
parent.append(child);
```

because it supports multiple items and strings.

For example:

```javascript
container.append(
    heading,
    paragraph
);
```

This is concise and readable.

`appendChild()` is still important because it is widely used and has a specific Node-based API.

---

# 14. `prepend()`

`prepend()` inserts content at the beginning of an element.

Example:

```javascript
const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

container.prepend(heading);
```

If the container originally contains:

```html
<div id="container">
    <p>Frontend Developer</p>
</div>
```

the result becomes:

```html
<div id="container">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

---

# 15. `before()`

`before()` inserts content immediately before an element.

Suppose:

```html
<div id="profile"></div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

profile.before(heading);
```

Result:

```html
<h2>Osama Abu Motlaq</h2>
<div id="profile"></div>
```

Notice that the heading is not inserted **inside** the profile.

It is inserted immediately before it.

---

# 16. `after()`

`after()` inserts content immediately after an element.

Example:

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = "Frontend Developer";

profile.after(paragraph);
```

Result:

```html
<div id="profile"></div>
<p>Frontend Developer</p>
```

---

# 17. Understanding Insertion Positions

Suppose:

```html
<div id="container">
    <p>Existing Content</p>
</div>
```

### `append()`

```javascript
container.append(newElement);
```

Result:

```html
<div id="container">
    <p>Existing Content</p>
    <newElement></newElement>
</div>
```

### `prepend()`

```javascript
container.prepend(newElement);
```

Result:

```html
<div id="container">
    <newElement></newElement>
    <p>Existing Content</p>
</div>
```

### `before()`

```javascript
container.before(newElement);
```

Result:

```html
<newElement></newElement>
<div id="container">
    <p>Existing Content</p>
</div>
```

### `after()`

```javascript
container.after(newElement);
```

Result:

```html
<div id="container">
    <p>Existing Content</p>
</div>
<newElement></newElement>
```

Mental model:

```text
before → [element]
inside → element [children]
after  → [element]
```

---

# 18. Moving an Existing Element

Appending an element does not copy it.

It moves it if it already belongs to the DOM.

Suppose:

```html
<div id="first">
    <p id="message">Osama Abu Motlaq</p>
</div>

<div id="second"></div>
```

JavaScript:

```javascript
const message = document.querySelector("#message");
const second = document.querySelector("#second");

second.append(message);
```

The paragraph moves from:

```text
first
  └── message
```

to:

```text
second
  └── message
```

It is the same DOM node.

---

# 19. Moving vs Cloning

Appending an existing node:

```javascript
second.append(message);
```

moves it.

If you want a copy, use:

```javascript
cloneNode()
```

Example:

```javascript
const copy = message.cloneNode(true);

second.append(copy);
```

Now there are two separate DOM nodes.

---

# 20. `cloneNode()`

Syntax:

```javascript
element.cloneNode(deep);
```

Example:

```javascript
const copy = profile.cloneNode(true);
```

The argument controls whether descendants are copied.

```text
false
    ↓
Clone only the element

true
    ↓
Clone the element and its descendants
```

Example:

```html
<div id="profile">
    <p>Osama Abu Motlaq</p>
</div>
```

Using:

```javascript
const copy = profile.cloneNode(true);
```

creates a copy conceptually equivalent to:

```html
<div id="profile">
    <p>Osama Abu Motlaq</p>
</div>
```

---

# 21. Duplicate IDs Warning

Cloning an element with an `id` can create duplicate IDs.

Example:

```html
<div id="profile"></div>
```

Then:

```javascript
const copy = profile.cloneNode(true);

container.append(copy);
```

You may now have:

```html
<div id="profile"></div>
<div id="profile"></div>
```

This is invalid because IDs are intended to uniquely identify elements within the document.

If you clone an element containing an ID, update or remove the ID when necessary.

---

# 22. `remove()`

The simplest way to remove an element is:

```javascript
element.remove();
```

Example:

```javascript
const message = document.querySelector("#message");

message.remove();
```

The element is removed from its parent.

---

# 23. Example: Removing a Card

HTML:

```html
<div id="profile-card">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

JavaScript:

```javascript
const card = document.querySelector("#profile-card");

card.remove();
```

The entire element and its descendants are removed from the document.

---

# 24. `removeChild()`

The traditional parent-based API is:

```javascript
parent.removeChild(child);
```

Example:

```javascript
const container = document.querySelector("#container");
const paragraph = document.querySelector("#message");

container.removeChild(paragraph);
```

The paragraph is removed from the container.

---

# 25. `remove()` vs `removeChild()`

### Modern direct approach

```javascript
element.remove();
```

You tell the element:

> Remove yourself from the DOM.

### Parent-based approach

```javascript
parent.removeChild(child);
```

You tell the parent:

> Remove this child.

For normal modern code, `remove()` is often simpler.

`removeChild()` remains useful when you already have a parent/child relationship and is important to understand because it is part of the traditional DOM API.

---

# 26. Removing All Children

Suppose:

```html
<div id="container">
    <p>One</p>
    <p>Two</p>
    <p>Three</p>
</div>
```

You can clear the content with:

```javascript
container.replaceChildren();
```

This removes all child nodes.

Another common approach is:

```javascript
container.textContent = "";
```

However, `replaceChildren()` communicates the specific intention to replace/remove the child nodes.

---

# 27. `replaceChildren()`

You can also replace all children with new content.

Example:

```javascript
const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

container.replaceChildren(heading);
```

The previous children are removed and replaced by:

```html
<h2>Osama Abu Motlaq</h2>
```

You can provide multiple nodes:

```javascript
container.replaceChildren(heading, paragraph);
```

---

# 28. `replaceWith()`

An element can replace itself with another node.

Example:

```javascript
const oldElement = document.querySelector("#old");

const newElement = document.createElement("p");

newElement.textContent = "Osama Abu Motlaq";

oldElement.replaceWith(newElement);
```

The old element is removed and the new element takes its position.

---

# 29. `replaceWith()` with Multiple Items

`replaceWith()` can accept multiple nodes or strings.

Example:

```javascript
oldElement.replaceWith(
    heading,
    paragraph
);
```

The original element is replaced by the provided content.

---

# 30. `insertAdjacentElement()`

Another DOM insertion API is:

```javascript
insertAdjacentElement()
```

Syntax:

```javascript
element.insertAdjacentElement(position, newElement);
```

The positions are:

```text
beforebegin
afterbegin
beforeend
afterend
```

Example:

```javascript
container.insertAdjacentElement(
    "beforeend",
    paragraph
);
```

This inserts the paragraph at the end of the container.

---

# 31. Understanding `insertAdjacentElement()` Positions

Suppose:

```html
<div id="container">
    Existing Content
</div>
```

### `beforebegin`

```javascript
container.insertAdjacentElement(
    "beforebegin",
    newElement
);
```

Result:

```html
<newElement></newElement>
<div id="container">
    Existing Content
</div>
```

### `afterbegin`

```javascript
container.insertAdjacentElement(
    "afterbegin",
    newElement
);
```

Result:

```html
<div id="container">
    <newElement></newElement>
    Existing Content
</div>
```

### `beforeend`

```javascript
container.insertAdjacentElement(
    "beforeend",
    newElement
);
```

Result:

```html
<div id="container">
    Existing Content
    <newElement></newElement>
</div>
```

### `afterend`

```javascript
container.insertAdjacentElement(
    "afterend",
    newElement
);
```

Result:

```html
<div id="container">
    Existing Content
</div>
<newElement></newElement>
```

---

# 32. Creating Text Nodes

You can explicitly create a text node:

```javascript
const text = document.createTextNode(
    "Osama Abu Motlaq"
);
```

Then:

```javascript
container.append(text);
```

However, for normal text insertion, this is usually simpler:

```javascript
container.textContent = "Osama Abu Motlaq";
```

or:

```javascript
container.append("Osama Abu Motlaq");
```

Understanding `createTextNode()` is still useful because text is represented as a node in the DOM.

---

# 33. Creating Document Fragments

A `DocumentFragment` is a lightweight container for DOM nodes.

Create one:

```javascript
const fragment = document.createDocumentFragment();
```

Add elements:

```javascript
const first = document.createElement("li");
first.textContent = "Project One";

const second = document.createElement("li");
second.textContent = "Project Two";

fragment.append(first, second);
```

Then insert the fragment:

```javascript
list.append(fragment);
```

The fragment's children are inserted into the list.

The fragment itself does not become a permanent element in the DOM.

---

# 34. Why Use `DocumentFragment`?

A fragment is useful when constructing a group of nodes before inserting them.

Conceptually:

```text
Create Fragment
      ↓
Create Nodes
      ↓
Configure Nodes
      ↓
Add Nodes to Fragment
      ↓
Insert Fragment
      ↓
Nodes become children of the DOM
```

Example:

```javascript
const fragment = document.createDocumentFragment();

for (let index = 1; index <= 3; index++) {
    const item = document.createElement("li");

    item.textContent = `Project ${index}`;

    fragment.append(item);
}

list.append(fragment);
```

Result:

```html
<ul>
    <li>Project 1</li>
    <li>Project 2</li>
    <li>Project 3</li>
</ul>
```

---

# 35. Event Listeners on Created Elements

Created elements can have event listeners before they are inserted.

Example:

```javascript
const button = document.createElement("button");

button.textContent = "Profile";

button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});

document.body.append(button);
```

The button is created, configured, given behavior, and then inserted.

The listener remains attached to that DOM node.

---

# 36. Creating a Complete Component-Like Structure

You can build multiple related elements.

Example:

```javascript
const card = document.createElement("article");

const title = document.createElement("h2");
title.textContent = "Osama Abu Motlaq";

const description = document.createElement("p");
description.textContent = "Frontend Developer";

card.append(title, description);

document.body.append(card);
```

The resulting DOM is:

```html
<article>
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</article>
```

Notice the construction order:

```text
Create article
    ↓
Create h2
    ↓
Create p
    ↓
Configure children
    ↓
Append children to article
    ↓
Append article to document
```

---

# 37. Creating Elements from Data

Suppose you have:

```javascript
const projects = [
    "Portfolio",
    "E-Commerce",
    "Admin Dashboard"
];
```

You can create list items dynamically:

```javascript
const list = document.querySelector("#projects");

for (const project of projects) {
    const item = document.createElement("li");

    item.textContent = project;

    list.append(item);
}
```

Result:

```html
<ul id="projects">
    <li>Portfolio</li>
    <li>E-Commerce</li>
    <li>Admin Dashboard</li>
</ul>
```

This is a fundamental pattern for dynamic DOM rendering.

---

# 38. Creating Elements Safely

When data comes from external sources, use:

```javascript
element.textContent = value;
```

for plain text.

Example:

```javascript
const name = externalData.name;

const heading = document.createElement("h2");

heading.textContent = name;
```

This treats the value as text.

If instead you insert arbitrary external data through HTML strings, you can introduce security problems.

Creating nodes explicitly provides clearer control over what becomes an element and what becomes text.

---

# 39. `innerHTML` vs `createElement()`

Both can create DOM structures, but they work differently.

### `innerHTML`

```javascript
container.innerHTML = `
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
`;
```

You provide an HTML string.

The browser parses it.

### `createElement()`

```javascript
const heading = document.createElement("h2");

heading.textContent = "Osama Abu Motlaq";

container.append(heading);
```

You explicitly construct DOM nodes.

Mental model:

```text
innerHTML
    ↓
HTML string
    ↓
Browser parses HTML

createElement()
    ↓
DOM node
    ↓
Configure node
    ↓
Insert node
```

---

# 40. When `createElement()` Is Useful

`createElement()` is especially useful when:

* Building elements from data.
* You need precise control over each node.
* You need to attach event listeners.
* You want to avoid parsing HTML strings.
* You are constructing complex DOM structures.
* Data should be inserted as text.

Example:

```javascript
const button = document.createElement("button");

button.textContent = "Open Profile";

button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});

container.append(button);
```

---

# 41. Replacing an Element Without Losing Its Position

Suppose:

```html
<div id="old">
    Old Content
</div>
```

Create:

```javascript
const replacement = document.createElement("section");

replacement.textContent = "New Content";
```

Then:

```javascript
old.replaceWith(replacement);
```

The new element occupies the old element's position.

This is useful when the structure itself needs to change.

---

# 42. Removing an Element After an Event

Example:

```html
<button id="close-button">
    Close
</button>

<div id="message">
    Osama Abu Motlaq
</div>
```

JavaScript:

```javascript
const button = document.querySelector("#close-button");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
    message.remove();
});
```

The event triggers DOM removal.

The flow is:

```text
Click
  ↓
Event listener
  ↓
message.remove()
  ↓
Element removed
```

---

# 43. Removing Created Elements

Created elements behave like normal DOM nodes.

Example:

```javascript
const message = document.createElement("p");

message.textContent = "Osama Abu Motlaq";

document.body.append(message);

message.remove();
```

The element is created, inserted, and then removed.

---

# 44. DOM Node Identity

Every DOM node is a specific object.

Consider:

```javascript
const first = document.createElement("p");
const second = document.createElement("p");
```

Even though both are `<p>` elements:

```javascript
first === second;
```

returns:

```text
false
```

They are two different objects.

This matters when:

* Moving nodes.
* Cloning nodes.
* Attaching event listeners.
* Comparing DOM references.

---

# 45. Moving a Node Preserves Its Identity

Suppose:

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = "Osama Abu Motlaq";

firstContainer.append(paragraph);
```

Then:

```javascript
secondContainer.append(paragraph);
```

The paragraph moves.

It is not recreated.

Therefore:

```javascript
paragraph
```

still refers to the same DOM node.

Its event listeners and DOM properties remain associated with that node.

---

# 46. Cloning Does Not Preserve Node Identity

Consider:

```javascript
const copy = paragraph.cloneNode(true);
```

Now:

```javascript
copy === paragraph;
```

returns:

```text
false
```

The clone is a different DOM object.

Also, event listeners added through:

```javascript
addEventListener()
```

are not copied by `cloneNode()`.

This is an important difference between moving and cloning.

---

# 47. Common Mistakes

## Mistake 1: Assuming `createElement()` Adds the Element

This:

```javascript
const element = document.createElement("div");
```

does not insert the element.

You still need:

```javascript
parent.append(element);
```

---

## Mistake 2: Confusing Moving with Copying

This:

```javascript
container.append(existingElement);
```

moves the existing element.

To copy it:

```javascript
const copy = existingElement.cloneNode(true);
```

---

## Mistake 3: Accidentally Creating Duplicate IDs

Cloning:

```javascript
element.cloneNode(true);
```

can duplicate an `id`.

Make sure IDs remain unique.

---

## Mistake 4: Using `removeChild()` with the Wrong Parent

This:

```javascript
wrongParent.removeChild(child);
```

throws an error if `child` is not actually a child of that parent.

Using:

```javascript
child.remove();
```

can be simpler when you already have the child reference.

---

## Mistake 5: Using `innerHTML` for Everything

`innerHTML` can be convenient, but it is not always the best choice.

For precise DOM construction:

```javascript
document.createElement()
```

can provide clearer control.

---

## Mistake 6: Expecting `cloneNode()` to Copy Event Listeners

Event listeners registered with `addEventListener()` are not copied by `cloneNode()`.

You must attach listeners to the clone separately if needed.

---

## Mistake 7: Inserting Untrusted HTML

Avoid:

```javascript
container.innerHTML = externalData;
```

when the data is not trusted.

For plain text:

```javascript
element.textContent = externalData;
```

is safer.

---

# 48. Best Practices

### Follow the Create → Configure → Insert pattern

```javascript
const button = document.createElement("button");

button.textContent = "Profile";

button.classList.add("profile-button");

container.append(button);
```

### Prefer `textContent` for text

```javascript
element.textContent = userInput;
```

### Prefer `classList` for predefined styling states

```javascript
element.classList.add("active");
```

### Use `append()` for convenient insertion

```javascript
container.append(element);
```

### Use `remove()` when you already have the element

```javascript
element.remove();
```

### Use `cloneNode()` intentionally

Remember that cloning creates a new node and does not copy event listeners.

### Keep IDs unique

Do not accidentally create multiple elements with the same ID.

### Use `DocumentFragment` when constructing a group of nodes

It can make the construction process clearer and is useful for batching DOM insertion.

---

# 49. Quick Reference

## Create

```javascript
const element = document.createElement("div");
```

## Create text

```javascript
const text = document.createTextNode("Hello");
```

## Add text

```javascript
element.textContent = "Osama Abu Motlaq";
```

## Add class

```javascript
element.classList.add("active");
```

## Add attribute

```javascript
element.setAttribute("title", "Profile");
```

## Append

```javascript
parent.append(element);
```

## Append multiple items

```javascript
parent.append(element1, element2);
```

## Append child

```javascript
parent.appendChild(element);
```

## Insert at beginning

```javascript
parent.prepend(element);
```

## Insert before

```javascript
element.before(newElement);
```

## Insert after

```javascript
element.after(newElement);
```

## Replace

```javascript
element.replaceWith(newElement);
```

## Remove

```javascript
element.remove();
```

## Remove through parent

```javascript
parent.removeChild(child);
```

## Remove all children

```javascript
parent.replaceChildren();
```

## Replace all children

```javascript
parent.replaceChildren(newElement);
```

## Clone

```javascript
const copy = element.cloneNode(true);
```

## Create fragment

```javascript
const fragment = document.createDocumentFragment();
```

---

# 50. Insertion Method Comparison

| Method              | Where It Inserts  | Multiple Arguments | Accepts Strings |
| ------------------- | ----------------- | -----------------: | --------------: |
| `append()`          | End inside        |                Yes |             Yes |
| `appendChild()`     | End inside        |                 No |              No |
| `prepend()`         | Beginning inside  |                Yes |             Yes |
| `before()`          | Before element    |                Yes |             Yes |
| `after()`           | After element     |                Yes |             Yes |
| `replaceWith()`     | Replaces element  |                Yes |             Yes |
| `replaceChildren()` | Replaces children |                Yes |             Yes |

---

# 51. Removal Method Comparison

| Method                            | Purpose                                    |
| --------------------------------- | ------------------------------------------ |
| `element.remove()`                | Remove an element from its parent          |
| `parent.removeChild(child)`       | Remove a specific child through its parent |
| `parent.replaceChildren()`        | Remove all children                        |
| `element.replaceWith(newElement)` | Replace an element with new content        |

---

# 52. Complete Practical Example

HTML:

```html
<div id="projects"></div>
```

JavaScript:

```javascript
const projectsContainer = document.querySelector("#projects");

const projects = [
    "Portfolio",
    "E-Commerce",
    "Admin Dashboard"
];

for (const project of projects) {
    const card = document.createElement("article");

    const title = document.createElement("h2");

    title.textContent = project;

    card.classList.add("project-card");

    card.append(title);

    projectsContainer.append(card);
}
```

The resulting DOM is conceptually:

```html
<div id="projects">
    <article class="project-card">
        <h2>Portfolio</h2>
    </article>

    <article class="project-card">
        <h2>E-Commerce</h2>
    </article>

    <article class="project-card">
        <h2>Admin Dashboard</h2>
    </article>
</div>
```

The important pattern is:

```text
Data
 ↓
Loop
 ↓
createElement()
 ↓
Configure
 ↓
Append child
 ↓
Append to document
```

This pattern is fundamental to dynamic DOM manipulation.

---

# 53. React Relevance

This topic is **very important for understanding React**, but React normally handles DOM creation and removal for you.

In vanilla JavaScript:

```javascript
const heading = document.createElement("h1");

heading.textContent = "Osama Abu Motlaq";

document.body.append(heading);
```

You explicitly create and insert the DOM node.

In React:

```jsx
function Profile() {
    return <h1>Osama Abu Motlaq</h1>;
}
```

You describe the desired UI.

React determines how the DOM should be updated.

---

# 54. React Conditional Rendering

Vanilla JavaScript might use:

```javascript
if (isVisible) {
    const message = document.createElement("p");

    message.textContent = "Osama Abu Motlaq";

    container.append(message);
}
```

React typically uses:

```jsx
{isVisible && (
    <p>Osama Abu Motlaq</p>
)}
```

React manages whether the corresponding DOM node exists.

The conceptual difference is:

```text
Vanilla JavaScript
    ↓
Create/remove DOM nodes manually

React
    ↓
Describe UI from state
    ↓
React manages DOM updates
```

---

# 55. React Does Not Make These APIs Useless

Understanding:

```javascript
createElement()
append()
remove()
replaceWith()
```

is still valuable.

It helps you understand what is happening underneath React.

It also matters when working with:

* Browser APIs.
* Third-party libraries.
* DOM measurements.
* Custom integrations.
* Non-React code.
* Debugging.

The goal is not to manually manipulate the DOM inside every React component.

The goal is to understand the DOM well enough to know what React is managing.

---

# 56. Final Mental Model

DOM creation follows:

```text
                CREATE
                   ↓
          document.createElement()
                   ↓
               CONFIGURE
                   ↓
       ┌───────────┼───────────┐
       ↓           ↓           ↓
   textContent  classList  attributes
       │           │           │
       └───────────┼───────────┘
                   ↓
                INSERT
                   ↓
       ┌───────────┼───────────┐
       ↓           ↓           ↓
    append()    prepend()    before()/after()
                   ↓
                 DOM
                   ↓
          REPLACE OR REMOVE
                   ↓
     replaceWith() / remove()
```

---

# 57. Final Takeaways

* `document.createElement()` creates a new DOM element.
* Creating an element does not automatically insert it into the document.
* Configure the element before inserting it when possible.
* `append()` inserts content at the end of an element.
* `appendChild()` inserts one Node at the end.
* `prepend()` inserts content at the beginning.
* `before()` inserts content immediately before an element.
* `after()` inserts content immediately after an element.
* `replaceWith()` replaces an element.
* `remove()` removes an element directly.
* `removeChild()` removes a child through its parent.
* `replaceChildren()` removes or replaces all children.
* Appending an existing node moves it rather than copying it.
* `cloneNode()` creates a separate copy.
* `cloneNode()` does not copy event listeners registered with `addEventListener()`.
* Cloning elements with IDs can create duplicate IDs.
* `DocumentFragment` can be useful when constructing multiple nodes before insertion.
* `textContent` is a safe choice for inserting plain text.
* `createElement()` gives precise control over DOM construction.
* CSS classes should generally control predefined visual states.
* In React, normal UI creation and removal should usually be driven by JSX and state rather than manual DOM manipulation.

The most important pattern to remember is:

```text
CREATE
  ↓
CONFIGURE
  ↓
INSERT
  ↓
UPDATE
  ↓
REPLACE / REMOVE
```

And for dynamic DOM construction:

```javascript
const element = document.createElement("div");

element.textContent = "Osama Abu Motlaq";

element.classList.add("profile");

parent.append(element);
```

This is the foundation of programmatically building a DOM tree with JavaScript.
