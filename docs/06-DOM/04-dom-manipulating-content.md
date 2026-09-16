# DOM Manipulating Content

After selecting an element from the DOM, one of the most common tasks is reading or changing its content.

For example, consider:

```html
<h1 id="title">Hello</h1>
```

JavaScript can select this element:

```javascript
const title = document.querySelector("#title");
```

Then it can read or change its content.

```javascript
title.textContent = "Osama Abu Motlaq";
```

The page changes from:

```text
Hello
```

to:

```text
Osama Abu Motlaq
```

The most common APIs for working with element content are:

```javascript
textContent
innerText
innerHTML
```

Although they may appear similar, they behave differently.

---

# 1. Reading Element Content

Suppose we have:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

First, select the element:

```javascript
const title = document.querySelector("#title");
```

Then you can read its content:

```javascript
console.log(title.textContent);
```

Output:

```text
Osama Abu Motlaq
```

The property:

```javascript
textContent
```

can both:

* Read text.
* Change text.

---

# 2. Changing Text with `textContent`

You can assign a new value:

```javascript
const title = document.querySelector("#title");

title.textContent = "Frontend Developer";
```

If the original HTML is:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

the visible result becomes:

```text
Frontend Developer
```

The existing text is replaced.

---

# 3. `textContent` Replaces Existing Content

Consider:

```html
<div id="profile">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

If you write:

```javascript
const profile = document.querySelector("#profile");

profile.textContent = "New Content";
```

The previous content is replaced.

Conceptually:

```text
Before:

div
├── h2
└── p


After:

div
└── "New Content"
```

The previous child elements are removed and replaced with a text node.

This is important:

```javascript
element.textContent = "Something";
```

does not append text.

It replaces the existing content.

---

# 4. Adding Text Without Replacing

Suppose:

```html
<p id="message">Hello</p>
```

If you write:

```javascript
message.textContent = "World";
```

the result becomes:

```text
World
```

The previous text is replaced.

If you want to append text:

```javascript
message.textContent += " World";
```

The result becomes:

```text
Hello World
```

The process is:

```javascript
message.textContent
```

Read the current value:

```text
Hello
```

Then:

```javascript
+= " World"
```

adds new text.

---

# 5. `textContent` Treats HTML as Text

Consider:

```javascript
const message = document.querySelector("#message");

message.textContent = "<strong>Hello</strong>";
```

The browser displays:

```text
<strong>Hello</strong>
```

The `<strong>` tags are not interpreted as HTML.

They are treated as normal text.

This is an important difference between:

```javascript
textContent
```

and:

```javascript
innerHTML
```

---

# 6. Why `textContent` Is Safer

Suppose a value comes from a user:

```javascript
const userInput = "<script>alert('Hello')</script>";
```

If you use:

```javascript
element.textContent = userInput;
```

the value is inserted as text.

The browser does not interpret it as HTML.

The visible result is:

```text
<script>alert('Hello')</script>
```

This makes `textContent` generally safer for inserting plain text.

When you do not need HTML parsing, prefer:

```javascript
textContent
```

over:

```javascript
innerHTML
```

---

# 7. Reading Nested Text with `textContent`

Consider:

```html
<div id="profile">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

Then:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.textContent);
```

The result contains the text from descendant nodes.

Conceptually:

```text
Osama Abu Motlaq
Frontend Developer
```

`textContent` reads text from inside child elements as well.

---

# 8. `innerText`

`innerText` also works with text.

Example:

```javascript
const title = document.querySelector("#title");

console.log(title.innerText);
```

You can also change text:

```javascript
title.innerText = "Frontend Developer";
```

At first glance, this looks similar to:

```javascript
textContent
```

However, the behavior is not exactly the same.

---

# 9. `textContent` vs `innerText`

The main conceptual difference is:

```text
textContent
→ Gets the text content from the DOM.

innerText
→ Represents rendered, human-visible text.
```

Consider:

```html
<div id="content">
    <p>Hello</p>
    <p style="display: none;">Hidden Text</p>
</div>
```

Then:

```javascript
const content = document.querySelector("#content");
```

With:

```javascript
console.log(content.textContent);
```

the hidden text is still part of the DOM text content.

While:

```javascript
console.log(content.innerText);
```

generally reflects the text that is rendered as visible text.

---

# 10. Why `innerText` Can Behave Differently

`innerText` depends more on layout and rendering information.

For example:

```html
<p style="display: none;">
    Hidden
</p>
```

The text exists in the DOM.

Therefore:

```javascript
element.textContent
```

can access it.

But `innerText` is concerned with rendered text.

This distinction can matter when:

* Elements are hidden.
* CSS affects visibility.
* Layout information matters.

---

# 11. Practical Recommendation

For normal JavaScript development, when you want to work with plain text:

```javascript
element.textContent
```

is often the preferred choice.

Example:

```javascript
title.textContent = "Frontend Developer";
```

Use `innerText` when you specifically need behavior related to rendered text.

Do not think of `innerText` as simply another spelling of `textContent`.

---

# 12. `innerHTML`

`innerHTML` reads or changes the HTML inside an element.

Consider:

```html
<div id="content">
    <p>Hello</p>
</div>
```

Then:

```javascript
const content = document.querySelector("#content");

console.log(content.innerHTML);
```

You get the HTML inside the element.

Conceptually:

```html
<p>Hello</p>
```

---

# 13. Changing Content with `innerHTML`

You can assign HTML:

```javascript
const content = document.querySelector("#content");

content.innerHTML = `
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
`;
```

The browser parses the string as HTML.

The resulting DOM becomes conceptually:

```text
div
├── h2
│   └── "Osama Abu Motlaq"
│
└── p
    └── "Frontend Developer"
```

This is different from `textContent`.

---

# 14. `textContent` vs `innerHTML`

Consider:

```javascript
const element = document.querySelector("#content");
```

Using:

```javascript
element.textContent = "<h2>Hello</h2>";
```

displays:

```text
<h2>Hello</h2>
```

But:

```javascript
element.innerHTML = "<h2>Hello</h2>";
```

creates an actual:

```html
<h2>Hello</h2>
```

element.

The difference:

```text
textContent
    ↓
Treats the value as text

innerHTML
    ↓
Parses the value as HTML
```

---

# 15. `innerHTML` Replaces Existing Content

Just like `textContent`, assigning to `innerHTML` replaces the existing content.

Example:

```html
<div id="content">
    <p>Old Content</p>
</div>
```

Then:

```javascript
content.innerHTML = "<h2>New Content</h2>";
```

The previous `<p>` is removed.

The new DOM becomes:

```html
<div id="content">
    <h2>New Content</h2>
</div>
```

---

# 16. Reading `innerHTML`

Suppose:

```html
<div id="profile">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

Then:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.innerHTML);
```

returns a string representing the HTML inside the element.

Conceptually:

```html
<h2>Osama Abu Motlaq</h2>
<p>Frontend Developer</p>
```

Notice:

```javascript
innerHTML
```

does not return DOM elements.

It returns a:

```text
String
```

representing HTML markup.

---

# 17. The Danger of `innerHTML`

Suppose your application receives content from a user:

```javascript
const userName = "<img src=x onerror=alert('Hello')>";
```

Then:

```javascript
element.innerHTML = userName;
```

asks the browser to parse the string as HTML.

Untrusted HTML can create security vulnerabilities, including Cross-Site Scripting (XSS).

Therefore:

```text
Untrusted data
        ↓
Do not insert directly with innerHTML
```

For plain user-generated text, prefer:

```javascript
element.textContent = userInput;
```

---

# 18. A Simple Security Rule

Use:

```javascript
textContent
```

when inserting:

* User names
* Comments
* Messages
* Search text
* Form input
* API data that should be displayed as plain text

Example:

```javascript
username.textContent = user.name;
```

Only use:

```javascript
innerHTML
```

when you intentionally need to insert HTML and you understand where that HTML comes from.

---

# 19. `innerHTML` and Existing Event Listeners

Consider:

```html
<div id="container">
    <button id="button">Click</button>
</div>
```

JavaScript:

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    console.log("Clicked");
});
```

Now:

```javascript
const container = document.querySelector("#container");

container.innerHTML = `
    <button id="button">New Button</button>
`;
```

The old button is removed.

A new button is created.

The new button is not the same DOM object as the old button.

Therefore, the event listener attached to the old button does not automatically transfer to the new button.

This is one reason repeatedly rebuilding parts of the DOM with `innerHTML` can create unexpected behavior.

---

# 20. `outerHTML`

There is also:

```javascript
outerHTML
```

While:

```javascript
element.innerHTML
```

represents the content inside the element:

```text
element
└── inner content
```

`outerHTML` represents the element itself plus its content.

Example:

```html
<div id="profile">
    <p>Hello</p>
</div>
```

Then:

```javascript
console.log(profile.innerHTML);
```

represents:

```html
<p>Hello</p>
```

While:

```javascript
console.log(profile.outerHTML);
```

represents:

```html
<div id="profile">
    <p>Hello</p>
</div>
```

---

# 21. Changing `outerHTML`

You can also replace the element itself.

Example:

```javascript
profile.outerHTML = `
    <section class="profile">
        Osama Abu Motlaq
    </section>
`;
```

Conceptually:

```text
Before:

div#profile
└── p


After:

section.profile
└── text
```

Unlike `innerHTML`, `outerHTML` replaces the element itself.

---

# 22. `innerHTML` vs `outerHTML`

Consider:

```html
<div id="profile">
    <p>Hello</p>
</div>
```

### `innerHTML`

```javascript
profile.innerHTML
```

Represents:

```html
<p>Hello</p>
```

### `outerHTML`

```javascript
profile.outerHTML
```

Represents:

```html
<div id="profile">
    <p>Hello</p>
</div>
```

The difference:

```text
innerHTML
    ↓
Inside the element

outerHTML
    ↓
The element itself + its content
```

---

# 23. `textContent` vs `innerText` vs `innerHTML`

Here is the main comparison:

| Property      | Works With  | Parses HTML? | Focus         |
| ------------- | ----------- | -----------: | ------------- |
| `textContent` | Text        |           No | DOM text      |
| `innerText`   | Text        |           No | Rendered text |
| `innerHTML`   | HTML string |          Yes | HTML markup   |

Example:

```javascript
element.textContent = "<strong>Hello</strong>";
```

Displays:

```text
<strong>Hello</strong>
```

While:

```javascript
element.innerHTML = "<strong>Hello</strong>";
```

Displays:

**Hello**

---

# 24. A Complete Example

HTML:

```html
<div id="profile">
    <h2>Osama Abu Motlaq</h2>
    <p>Computer Science Student</p>
</div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");
```

### Read text:

```javascript
console.log(profile.textContent);
```

### Read HTML:

```javascript
console.log(profile.innerHTML);
```

### Replace with text:

```javascript
profile.textContent = "Frontend Developer";
```

### Replace with HTML:

```javascript
profile.innerHTML = `
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
`;
```

---

# 25. Adding Content with `innerHTML +=`

You might see code like:

```javascript
container.innerHTML += `
    <p>New Project</p>
`;
```

This appears to append new content.

However, conceptually, JavaScript:

1. Reads the current HTML.
2. Creates a new string.
3. Parses and replaces the content.

Because the content is rebuilt, this can affect existing DOM nodes and event listeners.

For dynamically adding elements, creating DOM nodes is often a better approach.

For example:

```javascript
const project = document.createElement("p");

project.textContent = "New Project";

container.append(project);
```

We will cover creating and inserting elements in a later DOM file.

---

# 26. Emptying an Element

You can remove all text and child elements with:

```javascript
element.textContent = "";
```

Example:

```javascript
const list = document.querySelector("#projects");

list.textContent = "";
```

The element remains:

```html
<div id="projects"></div>
```

but its contents are removed.

You can also use:

```javascript
element.innerHTML = "";
```

However, when you simply want to clear the contents, `textContent = ""` is a straightforward choice.

---

# 27. Checking Empty Content

Example:

```html
<p id="message"></p>
```

JavaScript:

```javascript
const message = document.querySelector("#message");

console.log(message.textContent);
```

The result is:

```text
""
```

You can check:

```javascript
if (message.textContent === "") {
    console.log("The message is empty");
}
```

However, whitespace can make an element technically non-empty.

For example:

```html
<p id="message">
    
</p>
```

You can use:

```javascript
if (message.textContent.trim() === "") {
    console.log("The message is empty");
}
```

`trim()` removes whitespace from the beginning and end.

---

# 28. Template Literals with `innerHTML`

Template literals make it easy to create dynamic HTML strings.

Example:

```javascript
const user = {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
};

const profile = document.querySelector("#profile");

profile.innerHTML = `
    <h2>${user.name}</h2>
    <p>${user.role}</p>
`;
```

The browser creates HTML from the resulting string.

This can be useful, but remember:

```text
Dynamic data + innerHTML
        ↓
Security considerations
```

Never assume data is safe merely because it comes from an API or database.

---

# 29. Content Manipulation Flow

The general process is:

```text
HTML
  ↓
DOM
  ↓
Select element
  ↓
Get reference
  ↓
Read content
  ↓
Modify content
  ↓
Browser updates the page
```

Example:

```javascript
const title = document.querySelector("#title");

title.textContent = "Frontend Developer";
```

---

# 30. Content Manipulation Is Direct DOM Mutation

When you write:

```javascript
title.textContent = "Frontend Developer";
```

you are directly changing the DOM.

The browser then updates what is displayed.

Conceptually:

```text
JavaScript
    ↓
DOM mutation
    ↓
Browser rendering
    ↓
Updated UI
```

This is imperative programming.

You are explicitly telling the browser:

> Find this element and change its content.

---

# 31. React Relevance

This file is **important for understanding React** because React manages many of these DOM updates for you.

In vanilla JavaScript:

```javascript
const title = document.querySelector("#title");

title.textContent = "Frontend Developer";
```

In React:

```jsx
function Profile() {
    return <h1>Frontend Developer</h1>;
}
```

Or with state:

```jsx
function Profile() {
    const [role, setRole] = useState("Computer Science Student");

    return <h1>{role}</h1>;
}
```

When the state changes:

```javascript
setRole("Frontend Developer");
```

React updates the DOM.

You normally do not write:

```javascript
document.querySelector("#title").textContent = "...";
```

inside React components for normal UI updates.

---

# 32. React's Declarative Approach

Compare:

### Vanilla JavaScript

```javascript
const title = document.querySelector("#title");

title.textContent = "Frontend Developer";
```

You explicitly describe the steps:

```text
Find element
    ↓
Change content
```

### React

```jsx
<h1>{role}</h1>
```

You describe what the UI should display.

When:

```javascript
role
```

changes, React handles the DOM update.

Conceptually:

```text
State
  ↓
React
  ↓
Updated UI
```

This is one of the core differences between imperative DOM manipulation and declarative UI programming.

---

# 33. When React May Still Use Direct DOM APIs

Direct DOM manipulation is not completely forbidden in React.

Sometimes you need:

```javascript
textContent
```

or direct DOM access through:

```javascript
useRef()
```

Examples include:

* Focusing an input.
* Integrating a third-party library.
* Working with browser APIs.
* Measuring an element.
* Accessing a video or canvas element.

But for normal text rendering, React state and JSX should control the UI.

---

# 34. Common Mistakes

## Mistake 1: Using `innerHTML` for Plain Text

Unnecessary:

```javascript
element.innerHTML = userName;
```

Better:

```javascript
element.textContent = userName;
```

if you only need text.

---

## Mistake 2: Forgetting That Assignment Replaces Content

This:

```javascript
element.textContent = "Hello";
```

replaces the previous content.

It does not append.

---

## Mistake 3: Expecting `textContent` to Parse HTML

This:

```javascript
element.textContent = "<h1>Hello</h1>";
```

does not create an `<h1>`.

It displays the characters as text.

---

## Mistake 4: Inserting Untrusted Data with `innerHTML`

Avoid:

```javascript
element.innerHTML = userInput;
```

when `userInput` is untrusted.

Prefer:

```javascript
element.textContent = userInput;
```

for plain text.

---

## Mistake 5: Assuming `innerText` and `textContent` Are Identical

They can behave differently because `innerText` considers rendered text while `textContent` reflects DOM text content.

---

## Mistake 6: Rebuilding Interactive Elements with `innerHTML`

If you replace existing HTML:

```javascript
container.innerHTML = "...";
```

the old DOM nodes are removed.

Any event listeners attached directly to those old nodes do not automatically move to newly created nodes.

---

# 35. Best Practices

## 1. Prefer `textContent` for Plain Text

```javascript
element.textContent = "Frontend Developer";
```

This is simple and avoids HTML parsing.

---

## 2. Use `innerHTML` Only When You Need HTML

Example:

```javascript
element.innerHTML = `
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
`;
```

Only do this when HTML generation is intentional.

---

## 3. Never Trust Arbitrary Input as HTML

User-generated or external data should not automatically be passed to:

```javascript
innerHTML
```

without proper sanitization when HTML support is actually required.

---

## 4. Remember That Content Replacement Removes Children

Both:

```javascript
element.textContent = "...";
```

and:

```javascript
element.innerHTML = "...";
```

replace existing content.

---

## 5. Prefer DOM APIs for Complex Dynamic UI

Instead of repeatedly building large HTML strings, you can create elements:

```javascript
const item = document.createElement("li");

item.textContent = "New Project";

list.append(item);
```

This approach will be covered in detail in the next files.

---

# 36. Quick Reference

```javascript
// Read DOM text
element.textContent;

// Change DOM text
element.textContent = "Hello";

// Append text
element.textContent += " World";

// Read rendered text
element.innerText;

// Change rendered text
element.innerText = "Hello";

// Read HTML inside the element
element.innerHTML;

// Insert HTML
element.innerHTML = "<strong>Hello</strong>";

// Read the element itself + its content
element.outerHTML;

// Clear content
element.textContent = "";
```

---

# 37. Mental Model

Think of the element like a container:

```text
┌───────────────────────────┐
│         ELEMENT           │
│                           │
│   Content lives here      │
│                           │
└───────────────────────────┘
```

### `textContent`

```text
Give me or replace the text.
```

### `innerText`

```text
Give me or replace the rendered text.
```

### `innerHTML`

```text
Give me or replace the HTML inside.
```

### `outerHTML`

```text
Give me or replace the entire element.
```

---

# 38. Final Comparison

| Feature                           | `textContent`          | `innerText`                                | `innerHTML`                           |
| --------------------------------- | ---------------------- | ------------------------------------------ | ------------------------------------- |
| Reads text                        | Yes                    | Yes                                        | No, returns HTML string               |
| Sets text                         | Yes                    | Yes                                        | No, parses HTML                       |
| Parses HTML                       | No                     | No                                         | Yes                                   |
| Includes hidden text              | Generally yes          | Based on rendered text                     | HTML structure is included            |
| Suitable for plain text           | Yes                    | Yes, when rendered-text behavior is needed | Not necessary                         |
| Security risk with untrusted HTML | Low for HTML injection | Low for HTML injection                     | High if untrusted content is inserted |

---

# 39. Final Takeaways

* `textContent` reads and changes plain DOM text.
* `textContent` does not parse HTML.
* `textContent = "..."` replaces existing content.
* `innerText` works with rendered text and can behave differently because it considers layout and visibility.
* `innerHTML` reads and writes HTML markup inside an element.
* `innerHTML` parses strings as HTML.
* `innerHTML` should not receive untrusted content without appropriate sanitization.
* `outerHTML` represents the entire element including its content.
* Assigning `outerHTML` replaces the element itself.
* Replacing content removes the previous child nodes.
* Rebuilding elements with `innerHTML` can remove direct event listeners attached to old nodes.
* For plain text, `textContent` is usually the best default.
* For intentional HTML generation, `innerHTML` can be useful but requires more care.
* In React, normal content updates should usually happen through JSX and state instead of direct DOM manipulation.

The core idea is:

```text
Select Element
      ↓
Choose the Type of Content
      ↓
Plain Text → textContent
Rendered Text → innerText
HTML → innerHTML
      ↓
Update the DOM
```

Understanding these differences is essential before moving to creating, inserting, replacing, and removing DOM elements.
