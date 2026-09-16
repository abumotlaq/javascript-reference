# DOM Selecting Elements

Before JavaScript can read or modify an element in the DOM, it usually needs to **find that element**.

The DOM provides several APIs for selecting elements.

The most important ones are:

```javascript
document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()

document.querySelector()
document.querySelectorAll()
```

Understanding how these APIs differ is important because they do not all return the same type of value.

---

# 1. Why Do We Need Element Selection?

Suppose the HTML contains:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

JavaScript needs a reference to that element before it can change it.

```javascript
const title = document.getElementById("title");

title.textContent = "Frontend Developer";
```

The process is:

```text
HTML
  ↓
DOM
  ↓
Find element
  ↓
Store reference
  ↓
Read or modify element
```

Element selection is therefore one of the first fundamental DOM operations.

---

# 2. `getElementById()`

`getElementById()` finds an element by its `id`.

HTML:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

JavaScript:

```javascript
const title = document.getElementById("title");

console.log(title);
```

The argument is the ID value:

```javascript
document.getElementById("title");
```

Do not include `#`.

Correct:

```javascript
document.getElementById("title");
```

Incorrect:

```javascript
document.getElementById("#title");
```

The `#` syntax belongs to CSS selectors used by methods such as `querySelector()`.

---

# 3. What Does `getElementById()` Return?

If the element exists:

```javascript
const title = document.getElementById("title");

console.log(title);
```

you receive a reference to the matching element.

If the element does not exist:

```javascript
const title = document.getElementById("missing");

console.log(title);
```

the result is:

```text
null
```

This matters because attempting to use an element that is `null` causes an error.

For example:

```javascript
const title = document.getElementById("missing");

title.textContent = "Osama Abu Motlaq";
```

This fails because `title` is `null`.

---

# 4. IDs Should Be Unique

An `id` is intended to identify one element within a document.

Good:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

Avoid:

```html
<h1 id="title">First</h1>
<p id="title">Second</p>
```

Duplicate IDs make element selection ambiguous and can lead to unexpected behavior.

For example:

```javascript
document.getElementById("title");
```

is intended to identify one element.

Use classes when multiple elements share the same category.

---

# 5. `getElementsByClassName()`

`getElementsByClassName()` selects elements by their class name.

HTML:

```html
<p class="project">Project One</p>
<p class="project">Project Two</p>
<p class="project">Project Three</p>
```

JavaScript:

```javascript
const projects = document.getElementsByClassName("project");

console.log(projects);
```

Unlike `getElementById()`, this can return multiple elements.

---

# 6. `HTMLCollection`

`getElementsByClassName()` returns an `HTMLCollection`.

Conceptually:

```text
HTMLCollection
├── <p class="project">
├── <p class="project">
└── <p class="project">
```

You can access elements by index:

```javascript
console.log(projects[0]);
console.log(projects[1]);
```

You can also check the number of elements:

```javascript
console.log(projects.length);
```

---

# 7. `getElementsByTagName()`

`getElementsByTagName()` selects elements by their HTML tag name.

Example:

```javascript
const paragraphs = document.getElementsByTagName("p");

console.log(paragraphs);
```

If the document contains:

```html
<p>Osama Abu Motlaq</p>
<p>Frontend Developer</p>
<p>React Developer</p>
```

the collection contains all matching `<p>` elements.

---

# 8. Selecting All Elements of a Tag

You can select many common elements:

```javascript
document.getElementsByTagName("div");
document.getElementsByTagName("section");
document.getElementsByTagName("button");
document.getElementsByTagName("input");
```

The result is an `HTMLCollection`.

---

# 9. Selecting Everything

You can use:

```javascript
document.getElementsByTagName("*");
```

The `*` means all elements.

Example:

```javascript
const allElements = document.getElementsByTagName("*");

console.log(allElements.length);
```

This is generally not something you need in normal application code.

It is useful for understanding how tag-based selection works.

---

# 10. `querySelector()`

`querySelector()` selects the **first element** that matches a CSS selector.

Example:

```html
<h1 class="title">Osama Abu Motlaq</h1>
```

JavaScript:

```javascript
const title = document.querySelector(".title");
```

Notice that the selector includes the `.` because `.title` is a CSS class selector.

---

# 11. `querySelector()` with an ID

HTML:

```html
<h1 id="title">Osama Abu Motlaq</h1>
```

JavaScript:

```javascript
const title = document.querySelector("#title");
```

Here `#title` is a CSS ID selector.

Compare:

```javascript
document.getElementById("title");
```

with:

```javascript
document.querySelector("#title");
```

Both can find the element.

The syntax and API are different.

---

# 12. `querySelector()` with a Tag

You can select an element by tag name:

```javascript
const heading = document.querySelector("h1");
```

If multiple `<h1>` elements exist, only the first matching element is returned.

For example:

```html
<h1>Osama Abu Motlaq</h1>
<h1>Frontend Developer</h1>
```

```javascript
const heading = document.querySelector("h1");

console.log(heading.textContent);
```

Output:

```text
Osama Abu Motlaq
```

---

# 13. `querySelector()` Returns Only the First Match

This is a critical distinction.

HTML:

```html
<p class="project">Project One</p>
<p class="project">Project Two</p>
<p class="project">Project Three</p>
```

JavaScript:

```javascript
const project = document.querySelector(".project");
```

Only the first matching `<p>` is returned.

Conceptually:

```text
.project
   │
   ├── Project One  ← returned
   ├── Project Two
   └── Project Three
```

If you want all matching elements, use:

```javascript
document.querySelectorAll(".project");
```

---

# 14. `querySelectorAll()`

`querySelectorAll()` returns all elements matching a CSS selector.

Example:

```javascript
const projects = document.querySelectorAll(".project");

console.log(projects);
```

If the HTML contains:

```html
<p class="project">Project One</p>
<p class="project">Project Two</p>
<p class="project">Project Three</p>
```

the result contains all three elements.

---

# 15. `NodeList`

`querySelectorAll()` returns a `NodeList`.

For example:

```javascript
const projects = document.querySelectorAll(".project");

console.log(projects.length);
```

If there are three matching elements:

```text
3
```

You can access them by index:

```javascript
console.log(projects[0]);
console.log(projects[1]);
console.log(projects[2]);
```

---

# 16. `NodeList` vs `HTMLCollection`

These two are commonly confused.

| API                        | Return type       |
| -------------------------- | ----------------- |
| `getElementById()`         | Element or `null` |
| `getElementsByClassName()` | `HTMLCollection`  |
| `getElementsByTagName()`   | `HTMLCollection`  |
| `querySelector()`          | Element or `null` |
| `querySelectorAll()`       | `NodeList`        |

A major practical difference is that:

```javascript
document.querySelectorAll()
```

returns a **static `NodeList`**.

Whereas:

```javascript
document.getElementsByClassName()
```

returns a **live `HTMLCollection`**.

The difference between live and static collections is important and will be covered in detail later.

---

# 17. Static vs Live Collections

Consider:

```html
<div class="project">Project One</div>
```

JavaScript:

```javascript
const projects = document.getElementsByClassName("project");
```

At this moment:

```text
projects.length === 1
```

Now JavaScript creates another element:

```javascript
const newProject = document.createElement("div");

newProject.className = "project";

document.body.append(newProject);
```

Because `HTMLCollection` is live:

```javascript
console.log(projects.length);
```

can now return:

```text
2
```

The collection automatically reflects the current DOM.

---

# 18. `querySelectorAll()` Is Static

Now consider:

```javascript
const projects = document.querySelectorAll(".project");
```

This creates a static `NodeList`.

If another matching element is added later:

```javascript
const newProject = document.createElement("div");

newProject.className = "project";

document.body.append(newProject);
```

the existing `projects` NodeList does not automatically update.

You would need to run:

```javascript
const projects = document.querySelectorAll(".project");
```

again to get a new snapshot.

---

# 19. CSS Selectors with `querySelector()`

One of the major advantages of `querySelector()` is that it accepts CSS selectors.

Examples:

```javascript
document.querySelector("#title");
document.querySelector(".project");
document.querySelector("button");
```

You can also use more complex selectors.

---

# 20. Descendant Selectors

HTML:

```html
<section class="projects">
    <h2>Projects</h2>
    <div class="project">
        <h3>Portfolio</h3>
    </div>
</section>
```

You can select the `<h3>` inside `.project`:

```javascript
const title = document.querySelector(".project h3");
```

The space means:

```text
.project
   ↓
descendant
   ↓
h3
```

---

# 21. Child Selectors

The `>` selector means a direct child.

HTML:

```html
<div class="project">
    <h2>Portfolio</h2>
</div>
```

JavaScript:

```javascript
const title = document.querySelector(".project > h2");
```

This selects an `<h2>` that is a direct child of `.project`.

---

# 22. Attribute Selectors

You can select elements based on attributes.

HTML:

```html
<input type="email">
<input type="text">
```

JavaScript:

```javascript
const emailInput = document.querySelector('input[type="email"]');
```

You can also use:

```javascript
document.querySelector("[data-project-id]");
```

This selects an element containing the `data-project-id` attribute.

---

# 23. Multiple Conditions

CSS selectors can combine conditions.

HTML:

```html
<button class="button primary">
    Open Project
</button>
```

JavaScript:

```javascript
const button = document.querySelector(".button.primary");
```

This means:

```text
element with both:
.button
.primary
```

---

# 24. Selecting a Specific Element with `:first-child`

CSS pseudo-classes can also be used.

HTML:

```html
<ul>
    <li>Project One</li>
    <li>Project Two</li>
</ul>
```

JavaScript:

```javascript
const firstItem = document.querySelector("li:first-child");
```

This selects the first `<li>` when it is the first child of its parent.

---

# 25. `querySelectorAll()` with Complex Selectors

You can use the same CSS selector capabilities with `querySelectorAll()`.

For example:

```javascript
const buttons = document.querySelectorAll(
    "button.primary"
);
```

Or:

```javascript
const inputs = document.querySelectorAll(
    'input[type="email"]'
);
```

Or:

```javascript
const projectTitles = document.querySelectorAll(
    ".project h3"
);
```

This makes `querySelectorAll()` extremely flexible.

---

# 26. Selecting from a Specific Element

Selection is not limited to `document`.

DOM elements also provide:

```javascript
element.querySelector()
element.querySelectorAll()
```

Example:

```html
<section class="projects">
    <h2>Projects</h2>

    <article class="project">
        <h3>Project One</h3>
    </article>

    <article class="project">
        <h3>Project Two</h3>
    </article>
</section>
```

JavaScript:

```javascript
const projectsSection = document.querySelector(".projects");

const titles = projectsSection.querySelectorAll("h3");
```

Now the search is scoped to the `.projects` section.

---

# 27. Why Scoped Selection Is Useful

Suppose the page contains:

```html
<section class="projects">
    <h3>Project One</h3>
</section>

<section class="experience">
    <h3>Frontend Developer</h3>
</section>
```

This:

```javascript
document.querySelectorAll("h3");
```

finds both headings.

But:

```javascript
const projects = document.querySelector(".projects");

const titles = projects.querySelectorAll("h3");
```

finds only headings inside `.projects`.

This makes the code more precise.

---

# 28. `getElementById()` vs `querySelector()`

Both can select an element by ID.

```javascript
document.getElementById("title");
```

and:

```javascript
document.querySelector("#title");
```

Conceptually:

```text
getElementById
    ↓
Specialized ID lookup

querySelector
    ↓
General CSS selector engine
```

If you already have an ID and want a straightforward ID lookup, `getElementById()` is very explicit.

If you want CSS selector syntax or need a more complex selector, `querySelector()` is more flexible.

---

# 29. `querySelector()` vs `querySelectorAll()`

This distinction must be memorized.

```javascript
document.querySelector(".project");
```

means:

```text
Give me the first matching element.
```

While:

```javascript
document.querySelectorAll(".project");
```

means:

```text
Give me all matching elements.
```

Example:

```text
HTML
├── .project
├── .project
└── .project
```

Then:

```javascript
querySelector(".project")
```

returns:

```text
first .project
```

while:

```javascript
querySelectorAll(".project")
```

returns:

```text
NodeList
├── first .project
├── second .project
└── third .project
```

---

# 30. Working with `NodeList`

A `NodeList` returned by `querySelectorAll()` can be iterated.

Example:

```javascript
const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
    console.log(project.textContent);
});
```

This is one reason `querySelectorAll()` is convenient.

You can also use:

```javascript
for (const project of projects) {
    console.log(project.textContent);
}
```

The `for...of` syntax works because the collection is iterable.

---

# 31. `NodeList` Is Not an Array

This is an important distinction.

```javascript
const projects = document.querySelectorAll(".project");
```

does not return:

```javascript
Array
```

It returns:

```javascript
NodeList
```

Therefore, you should not assume every array method is available.

For example, methods such as:

```javascript
map()
filter()
reduce()
```

are not generally methods of `NodeList`.

---

# 32. Converting a NodeList to an Array

You can create an actual array with:

```javascript
const projects = Array.from(
    document.querySelectorAll(".project")
);
```

Now:

```javascript
Array.isArray(projects);
```

returns:

```text
true
```

You can also use spread syntax:

```javascript
const projects = [
    ...document.querySelectorAll(".project")
];
```

Now `projects` is an array.

---

# 33. `HTMLCollection` Is Also Not an Array

Similarly:

```javascript
const projects =
    document.getElementsByClassName("project");
```

returns an:

```text
HTMLCollection
```

not an Array.

You can convert it:

```javascript
const projectArray = Array.from(projects);
```

---

# 34. Selecting Elements That Do Not Exist

If `querySelector()` finds nothing:

```javascript
const title = document.querySelector(".missing");
```

the result is:

```javascript
null
```

Similarly:

```javascript
const title = document.getElementById("missing");
```

returns:

```javascript
null
```

However:

```javascript
const titles = document.querySelectorAll(".missing");
```

returns an empty `NodeList`.

Conceptually:

```text
querySelector()
    ↓
null

getElementById()
    ↓
null

querySelectorAll()
    ↓
empty NodeList
```

This distinction is important when checking results.

---

# 35. Checking for a Single Element

For:

```javascript
const title = document.querySelector("#title");
```

you can check:

```javascript
if (title) {
    console.log(title.textContent);
}
```

Because if the element does not exist:

```javascript
title === null
```

---

# 36. Checking Multiple Elements

For:

```javascript
const projects = document.querySelectorAll(".project");
```

check:

```javascript
if (projects.length > 0) {
    console.log("Projects found");
}
```

An empty `NodeList` is still an object, so this:

```javascript
if (projects) {
    // ...
}
```

does not tell you whether matching elements exist.

Use:

```javascript
projects.length
```

instead.

---

# 37. Selection and Script Timing

The element must exist in the DOM when the selection code executes.

Consider:

```html
<script>
    const title = document.querySelector("h1");
</script>

<h1>Osama Abu Motlaq</h1>
```

At the moment the script executes, the `<h1>` may not yet have been parsed.

Therefore:

```javascript
document.querySelector("h1");
```

can return:

```text
null
```

---

# 38. One Solution: Place the Script After the HTML

For example:

```html
<h1>Osama Abu Motlaq</h1>

<script src="script.js"></script>
```

Now the browser has parsed the `<h1>` before loading/executing the script in the normal case.

---

# 39. Another Solution: `defer`

External scripts can use:

```html
<script src="script.js" defer></script>
```

`defer` tells the browser to download the script while parsing but defer execution until the document has been parsed.

This is a common approach for scripts that need the document structure.

---

# 40. Invalid CSS Selectors

`querySelector()` and `querySelectorAll()` use CSS selector syntax.

If the selector is invalid, they can throw a `SyntaxError`.

For example, malformed selector syntax should not be treated as if the element simply does not exist.

There is an important difference:

```text
Valid selector + no match
        ↓
null / empty NodeList

Invalid selector
        ↓
Exception
```

This distinction matters when selectors are built dynamically.

---

# 41. Dynamic Selectors

Suppose you have:

```javascript
const id = "title";

const element = document.querySelector(`#${id}`);
```

The selector becomes:

```text
#title
```

This is useful, but dynamically generated selectors can become problematic if the value contains characters that have special meaning in CSS selectors.

When arbitrary values are used, `CSS.escape()` can help create a valid selector.

Example:

```javascript
const id = "project:42";

const element = document.querySelector(
    `#${CSS.escape(id)}`
);
```

This is an advanced detail, but it is useful when building selectors from external or dynamic values.

---

# 42. Selecting by Class vs Selecting by ID

Use IDs when an element has a unique identity.

Example:

```html
<form id="contact-form"></form>
```

Use classes for groups or styling/behavior categories.

Example:

```html
<article class="project"></article>
<article class="project"></article>
<article class="project"></article>
```

Then:

```javascript
document.getElementById("contact-form");
```

can select the unique form.

And:

```javascript
document.querySelectorAll(".project");
```

can select the collection.

---

# 43. Selection Does Not Modify Anything

A selection method only gives you access to an element or collection.

For example:

```javascript
const title = document.querySelector("h1");
```

does not change the page.

It simply obtains a reference.

Modification happens afterward:

```javascript
title.textContent = "Osama Abu Motlaq";
```

Think:

```text
Select
  ↓
Reference
  ↓
Read / Modify
```

---

# 44. Selection and Object References

Suppose:

```javascript
const title = document.querySelector("h1");
```

The variable contains a reference to the DOM element.

You can perform multiple operations:

```javascript
console.log(title.textContent);

title.textContent = "Osama Abu Motlaq";

title.classList.add("active");
```

All operations work with the same DOM element.

---

# 45. A Practical Example

HTML:

```html
<section id="projects">
    <h2>Projects</h2>

    <article class="project">
        <h3>Portfolio</h3>
    </article>

    <article class="project">
        <h3>E-Commerce</h3>
    </article>
</section>
```

JavaScript:

```javascript
const projectsSection =
    document.getElementById("projects");

const projects =
    projectsSection.querySelectorAll(".project");

console.log(projects.length);

projects.forEach((project) => {
    console.log(project.textContent);
});
```

The process is:

```text
document
   ↓
#projects
   ↓
.projects inside that section
   ↓
NodeList
   ↓
Iterate over projects
```

This is a useful pattern because the second selection is scoped to the relevant part of the document.

---

# 46. Choosing the Right API

A practical decision process:

### Need one element by unique ID?

Use:

```javascript
document.getElementById("title");
```

### Need the first match using CSS selectors?

Use:

```javascript
document.querySelector(".project");
```

### Need all matches using CSS selectors?

Use:

```javascript
document.querySelectorAll(".project");
```

### Need all elements with a class?

You can use:

```javascript
document.getElementsByClassName("project");
```

### Need all elements with a tag?

You can use:

```javascript
document.getElementsByTagName("button");
```

For modern application code, `querySelector()` and `querySelectorAll()` are often convenient because they provide one consistent CSS-selector-based API.

---

# 47. Common Mistakes

## Mistake 1: Including `#` in `getElementById()`

Wrong:

```javascript
document.getElementById("#title");
```

Correct:

```javascript
document.getElementById("title");
```

---

## Mistake 2: Expecting `querySelector()` to return all matches

Wrong assumption:

```javascript
const projects = document.querySelector(".project");
```

This returns only the first match.

For all matches:

```javascript
const projects = document.querySelectorAll(".project");
```

---

## Mistake 3: Treating `NodeList` as an Array

```javascript
const projects = document.querySelectorAll(".project");
```

This is a `NodeList`, not an Array.

Convert it when actual array methods are needed:

```javascript
const projectArray = Array.from(projects);
```

---

## Mistake 4: Forgetting `null`

This can fail:

```javascript
const title = document.querySelector("#title");

title.textContent = "Osama Abu Motlaq";
```

if `#title` does not exist.

Safer when the element is optional:

```javascript
const title = document.querySelector("#title");

if (title) {
    title.textContent = "Osama Abu Motlaq";
}
```

---

## Mistake 5: Confusing `length` with existence

For:

```javascript
const projects = document.querySelectorAll(".project");
```

use:

```javascript
projects.length
```

to determine whether matches exist.

---

## Mistake 6: Using an overly broad selector

This:

```javascript
document.querySelectorAll("div");
```

may select far more elements than intended.

A more precise selector is often better:

```javascript
document.querySelectorAll(".project");
```

---

## Mistake 7: Ignoring script timing

If the DOM element does not exist when the script executes, selection may fail.

Always understand when your JavaScript runs relative to document parsing.

---

# 48. Best Practices

## 1. Use precise selectors

Prefer:

```javascript
document.querySelector(".projects .project");
```

over unnecessarily broad selectors.

---

## 2. Scope searches when appropriate

Instead of:

```javascript
document.querySelectorAll(".project-title");
```

you can sometimes use:

```javascript
projectsSection.querySelectorAll(".project-title");
```

This communicates the intended DOM area.

---

## 3. Cache frequently used references

If the same element is used repeatedly:

```javascript
const button = document.querySelector("#save-button");
```

then reuse:

```javascript
button.addEventListener("click", ...);
button.classList.add("active");
button.disabled = true;
```

instead of repeatedly searching for the same element.

Do not interpret this as "never query the DOM again." Optimize based on actual code needs.

---

## 4. Prefer semantic selectors

Selectors should communicate intent.

For example:

```javascript
document.querySelector(".project-card");
```

is often clearer than a fragile selector based on deeply nested elements.

---

## 5. Avoid fragile selectors

Avoid unnecessarily specific selectors such as:

```javascript
document.querySelector(
    "main > section:nth-child(2) > div > article > h3"
);
```

A structural change can easily break such a selector.

Prefer a stable class, ID, or data attribute.

---

# 49. React Relevance

DOM selection is **important for learning React**, but React changes how you normally select elements.

In vanilla JavaScript:

```javascript
const button = document.querySelector("button");
```

You directly search the DOM.

In React, you normally render elements through JSX:

```jsx
function Button() {
    return <button>Save</button>;
}
```

You usually do not need:

```javascript
document.querySelector("button");
```

inside a React component just to update the UI.

When direct DOM access is actually necessary, React commonly provides refs:

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

The principle is:

```text
Vanilla JavaScript
    ↓
Select DOM directly

React
    ↓
Describe UI declaratively
    ↓
Use refs for exceptional direct DOM access
```

---

# 50. Quick Reference

| Method                     | Purpose                       | Return                |
| -------------------------- | ----------------------------- | --------------------- |
| `getElementById()`         | Find one element by ID        | Element / `null`      |
| `getElementsByClassName()` | Find elements by class        | Live `HTMLCollection` |
| `getElementsByTagName()`   | Find elements by tag          | Live `HTMLCollection` |
| `querySelector()`          | Find first CSS selector match | Element / `null`      |
| `querySelectorAll()`       | Find all CSS selector matches | Static `NodeList`     |

---

# 51. Selection Syntax Quick Reference

```javascript
// ID
document.querySelector("#title");

// Class
document.querySelector(".project");

// Tag
document.querySelector("button");

// Descendant
document.querySelector(".projects .project");

// Direct child
document.querySelector(".projects > .project");

// Attribute
document.querySelector('[data-project-id]');

// Attribute value
document.querySelector('input[type="email"]');

// Multiple matches
document.querySelectorAll(".project");
```

---

# 52. Mental Model

Think of DOM selection as searching a tree.

```text
document
   │
   └── html
       │
       └── body
           │
           ├── header
           │
           ├── main
           │   │
           │   ├── section.projects
           │   │   ├── article.project
           │   │   └── article.project
           │   │
           │   └── section.about
           │
           └── footer
```

You can search from the document:

```javascript
document.querySelector(".project");
```

or search inside a specific element:

```javascript
projectsSection.querySelector(".project");
```

The second approach narrows the search area.

---

# 53. Final Takeaways

* DOM selection gives JavaScript references to elements.
* `getElementById()` is specialized for IDs.
* `querySelector()` returns the first matching element.
* `querySelectorAll()` returns all matching elements.
* `getElementsByClassName()` and `getElementsByTagName()` return `HTMLCollection` objects.
* `querySelectorAll()` returns a static `NodeList`.
* `HTMLCollection` returned by these legacy collection methods is live.
* `NodeList` and `HTMLCollection` are not Arrays.
* `querySelector()` and `querySelectorAll()` use CSS selector syntax.
* `querySelector()` returns `null` when there is no match.
* `querySelectorAll()` returns an empty `NodeList` when there are no matches.
* Element selection does not modify the DOM by itself.
* Selection timing matters because the element must exist when the code runs.
* Scoped selection can make code more precise and maintainable.
* Stable selectors are generally better than fragile structural selectors.
* In React, direct DOM selection is usually unnecessary for normal UI updates; refs are preferred when direct DOM access is genuinely required.

The core pattern is:

```text
Find
  ↓
Get a DOM reference
  ↓
Read
  ↓
Modify
  ↓
Listen for events
```

Once element selection becomes intuitive, the rest of DOM manipulation becomes much easier.
