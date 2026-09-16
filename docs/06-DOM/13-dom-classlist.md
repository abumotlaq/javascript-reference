# DOM classList

The `classList` property provides a convenient API for reading, adding, removing, toggling, and replacing CSS classes on DOM elements.

Instead of manually manipulating the entire `class` attribute, JavaScript can work with individual classes through methods such as:

```javascript
element.classList.add()
element.classList.remove()
element.classList.toggle()
element.classList.contains()
element.classList.replace()
```

`classList` is one of the most commonly used DOM APIs for interactive interfaces.

It is especially useful for:

* Opening and closing menus.
* Showing and hiding elements.
* Active navigation states.
* Form validation states.
* Modal dialogs.
* Tabs and accordions.
* Dark/light theme classes.
* Responsive UI behavior.
* Animation states.
* Dynamic CSS states.

---

# 1. The `class` Attribute

An HTML element can contain multiple CSS classes:

```html
<div class="card featured active">
  Osama Abu Motlaq
</div>
```

The `class` attribute contains three classes:

```text
card
featured
active
```

JavaScript can access the element:

```javascript
const card = document.querySelector(".card");
```

And inspect its classes:

```javascript
console.log(card.classList);
```

---

# 2. What Is `classList`?

`classList` is a read-only property that provides a live `DOMTokenList` representing the element's classes.

Example:

```javascript
const card = document.querySelector(".card");

console.log(card.classList);
```

Conceptually:

```text
classList
   ↓
["card", "featured", "active"]
```

It is not an ordinary JavaScript array.

It is a `DOMTokenList`.

This means it provides specialized methods for managing class names.

---

# 3. `classList` vs `className`

There are two common ways to work with classes:

```javascript
element.className
```

and:

```javascript
element.classList
```

Example:

```html
<div class="card featured"></div>
```

Then:

```javascript
console.log(element.className);
```

returns:

```text
"card featured"
```

while:

```javascript
console.log(element.classList);
```

provides a class-token interface.

---

# 4. Why `classList` Is Usually Better

Suppose an element has:

```html
<div class="card featured active"></div>
```

If you write:

```javascript
element.className = "active";
```

you replace the entire class list.

The original classes are lost:

```html
<div class="active"></div>
```

With `classList`, you can change only one class:

```javascript
element.classList.add("active");
```

or:

```javascript
element.classList.remove("active");
```

This makes class manipulation more precise.

---

# 5. `classList.add()`

Use `add()` to add one or more classes.

```javascript
element.classList.add("active");
```

If the element initially has:

```html
<div class="card"></div>
```

after:

```javascript
element.classList.add("active");
```

it becomes:

```html
<div class="card active"></div>
```

The existing `card` class remains.

---

# 6. Adding Multiple Classes

You can add multiple classes at once:

```javascript
element.classList.add(
  "active",
  "featured",
  "highlighted"
);
```

Result:

```html
<div class="card active featured highlighted"></div>
```

This is more concise than:

```javascript
element.classList.add("active");
element.classList.add("featured");
element.classList.add("highlighted");
```

---

# 7. Adding an Existing Class

If a class already exists:

```javascript
element.classList.add("card");
```

adding it again does not create a duplicate.

For example:

```html
<div class="card"></div>
```

After:

```javascript
element.classList.add("card");
```

it remains conceptually:

```html
<div class="card"></div>
```

not:

```html
<div class="card card"></div>
```

This is one advantage of `classList` over manual string manipulation.

---

# 8. `classList.remove()`

Use `remove()` to remove classes.

```javascript
element.classList.remove("active");
```

For:

```html
<div class="card active"></div>
```

the result becomes:

```html
<div class="card"></div>
```

---

# 9. Removing Multiple Classes

You can remove multiple classes:

```javascript
element.classList.remove(
  "active",
  "featured",
  "highlighted"
);
```

This removes only those classes.

Other classes remain untouched.

---

# 10. Removing a Class That Does Not Exist

This is safe:

```javascript
element.classList.remove("unknown");
```

If the class does not exist, nothing happens.

JavaScript does not throw an error simply because the class is missing.

---

# 11. `classList.contains()`

Use `contains()` to check whether an element has a class.

```javascript
const isActive = element.classList.contains("active");

console.log(isActive);
```

The result is a boolean:

```javascript
true
```

or:

```javascript
false
```

---

# 12. Practical `contains()` Example

```javascript
if (card.classList.contains("featured")) {
  console.log("Featured card");
}
```

The method answers:

> Does this element currently contain this class?

It does not add or remove anything.

---

# 13. `classList.toggle()`

`toggle()` is one of the most useful methods.

It switches a class between two states.

```javascript
element.classList.toggle("active");
```

If `active` does not exist:

```text
active
↓
added
```

If `active` already exists:

```text
active
↓
removed
```

---

# 14. Toggle Mental Model

Think of:

```javascript
element.classList.toggle("active");
```

as:

```text
Does active exist?
       │
   ┌───┴───┐
   │       │
  Yes      No
   │       │
Remove    Add
```

This is extremely useful for UI state.

---

# 15. Example: Open and Close Menu

HTML:

```html
<button id="menu-button">
  Menu
</button>

<nav id="menu" class="menu">
  Navigation
</nav>
```

JavaScript:

```javascript
const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

button.addEventListener("click", () => {
  menu.classList.toggle("open");
});
```

CSS:

```css
.menu {
  display: none;
}

.menu.open {
  display: block;
}
```

The interaction becomes:

```text
Click
 ↓
toggle("open")
 ↓
CSS class changes
 ↓
CSS changes appearance
```

---

# 16. `toggle()` Return Value

`toggle()` returns a boolean.

```javascript
const isActive = element.classList.toggle("active");

console.log(isActive);
```

If the class was added:

```javascript
true
```

If the class was removed:

```javascript
false
```

This can be useful when the JavaScript needs to know the new state.

---

# 17. `toggle()` With a Force Parameter

`toggle()` can receive a second argument:

```javascript
element.classList.toggle("active", true);
```

This guarantees that the class exists.

Using:

```javascript
true
```

means:

```text
add the class
```

Using:

```javascript
false
```

means:

```text
remove the class
```

---

# 18. Force Parameter Example

Instead of:

```javascript
if (isActive) {
  element.classList.add("active");
} else {
  element.classList.remove("active");
}
```

you can write:

```javascript
element.classList.toggle("active", isActive);
```

This creates an explicit relationship:

```text
isActive = true
→ active class exists

isActive = false
→ active class does not exist
```

This is useful when the class should represent an already-known state rather than simply toggling.

---

# 19. `classList.replace()`

Use:

```javascript
element.classList.replace(
  "old-class",
  "new-class"
);
```

to replace one class with another.

Example:

```html
<div class="card inactive"></div>
```

JavaScript:

```javascript
element.classList.replace(
  "inactive",
  "active"
);
```

Result:

```html
<div class="card active"></div>
```

---

# 20. `replace()` Return Value

`replace()` returns a boolean.

```javascript
const replaced = element.classList.replace(
  "inactive",
  "active"
);
```

If the old class existed and was replaced:

```javascript
true
```

Otherwise:

```javascript
false
```

---

# 21. `classList.item()`

You can access a class by its numeric position:

```javascript
const firstClass = element.classList.item(0);

console.log(firstClass);
```

For:

```html
<div class="card featured active"></div>
```

you may get:

```text
card
```

However, most application code should prefer:

```javascript
contains()
```

when it needs to check for a specific class.

---

# 22. `classList.length`

You can find the number of classes:

```javascript
console.log(element.classList.length);
```

For:

```html
<div class="card featured active"></div>
```

the result is:

```text
3
```

---

# 23. Iterating Over `classList`

`DOMTokenList` is iterable.

You can use:

```javascript
for (const className of element.classList) {
  console.log(className);
}
```

For:

```html
<div class="card featured active"></div>
```

the output is conceptually:

```text
card
featured
active
```

---

# 24. Converting `classList` to an Array

If you specifically need an actual array:

```javascript
const classes = Array.from(element.classList);
```

Now:

```javascript
Array.isArray(classes);
```

returns:

```javascript
true
```

You can then use normal array methods:

```javascript
const classes = [...element.classList];

const longClasses = classes.filter(
  (className) => className.length > 5
);
```

---

# 25. `classList` and `className`

Consider:

```html
<div class="card active"></div>
```

### `className`

```javascript
element.className;
```

returns the class attribute as a string:

```text
"card active"
```

### `classList`

```javascript
element.classList;
```

provides individual class tokens.

Use `className` when you intentionally want to work with the complete class attribute.

Use `classList` when you want to manipulate individual classes.

---

# 26. Why Manual String Manipulation Is Error-Prone

You might see code such as:

```javascript
element.className += " active";
```

This can work, but it is fragile.

Potential problems include:

* Extra whitespace.
* Duplicate classes.
* Removing one class safely.
* Checking whether a class exists.
* Managing multiple classes.

`classList` provides dedicated operations for these tasks.

Prefer:

```javascript
element.classList.add("active");
```

instead of:

```javascript
element.className += " active";
```

---

# 27. Removing With `className` Is Worse

Suppose:

```html
<div class="card active featured"></div>
```

You cannot safely remove only `active` with:

```javascript
element.className = element.className.replace("active", "");
```

This is string manipulation rather than class-aware manipulation.

Prefer:

```javascript
element.classList.remove("active");
```

The browser understands that `active` is a class token.

---

# 28. Class Names Are Tokens

A class list is conceptually:

```text
"card active featured"
```

split into:

```text
card
active
featured
```

Each class is a token.

This explains why:

```javascript
classList.add()
classList.remove()
classList.contains()
```

operate on individual classes rather than arbitrary strings.

---

# 29. Invalid Class Tokens

A class name cannot contain whitespace as part of a single class token.

For example:

```javascript
element.classList.add("active featured");
```

is invalid because the argument contains whitespace.

Instead use:

```javascript
element.classList.add(
  "active",
  "featured"
);
```

Each argument represents one class token.

---

# 30. Class Names and CSS

A class manipulated through JavaScript does nothing visually by itself.

For example:

```javascript
element.classList.add("active");
```

only changes the DOM.

CSS must define what `active` means:

```css
.active {
  background: black;
  color: white;
}
```

Therefore:

```text
JavaScript
→ changes class

CSS
→ defines visual behavior
```

This separation is an important UI design principle.

---

# 31. Active Navigation Item

Example:

```html
<nav>
  <a class="nav-link" href="/about">
    About
  </a>

  <a class="nav-link" href="/projects">
    Projects
  </a>
</nav>
```

JavaScript:

```javascript
const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
```

The pattern is:

```text
Remove active from all
        ↓
Add active to selected element
```

This pattern appears frequently in tabs and navigation systems.

---

# 32. Showing and Hiding Elements

CSS:

```css
.hidden {
  display: none;
}
```

JavaScript:

```javascript
element.classList.toggle("hidden");
```

This is often cleaner than:

```javascript
element.style.display = "none";
```

because the visibility behavior remains in CSS.

---

# 33. Class-Based UI State

A useful design pattern is:

```text
JavaScript
→ manages state class

CSS
→ manages presentation
```

For example:

```text
menu
menu open

modal
modal open

button
button active

input
input invalid
```

This keeps JavaScript from becoming responsible for every visual detail.

---

# 34. Form Validation Classes

HTML:

```html
<input id="email" type="email">
```

CSS:

```css
.input-error {
  border: 1px solid red;
}
```

JavaScript:

```javascript
if (!email.checkValidity()) {
  email.classList.add("input-error");
} else {
  email.classList.remove("input-error");
}
```

A more concise version:

```javascript
email.classList.toggle(
  "input-error",
  !email.checkValidity()
);
```

The second argument makes the class reflect the validation state.

---

# 35. Multiple State Classes

An element may have multiple independent classes:

```html
<div class="card active featured"></div>
```

Each class can represent a different concern:

```text
card
→ base styling

active
→ current state

featured
→ special variation
```

JavaScript can modify one without affecting the others:

```javascript
card.classList.remove("active");
```

Result:

```html
<div class="card featured"></div>
```

---

# 36. Conditional Class Logic

You can combine conditions with `classList`.

```javascript
const isFeatured = true;

card.classList.toggle(
  "featured",
  isFeatured
);
```

This is effectively:

```javascript
if (isFeatured) {
  card.classList.add("featured");
} else {
  card.classList.remove("featured");
}
```

The `toggle(class, condition)` form is particularly useful when the desired state is already known.

---

# 37. Working With `dataset`

`classList` often works together with `dataset`.

HTML:

```html
<button
  class="tab"
  data-tab="projects"
>
  Projects
</button>
```

JavaScript:

```javascript
const tab = document.querySelector(".tab");

console.log(tab.dataset.tab);
```

Result:

```text
projects
```

Then you might update a class:

```javascript
tab.classList.add("active");
```

This creates a common pattern:

```text
data-* attribute
→ identifies information

class
→ represents visual state
```

---

# 38. Event Handling + `classList`

Example:

```javascript
const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

button.addEventListener("click", () => {
  menu.classList.toggle("open");
});
```

This combines two DOM concepts:

```text
Event
 ↓
Handler
 ↓
classList
 ↓
CSS state
```

This is one of the fundamental patterns in vanilla JavaScript UI development.

---

# 39. `classList` and Event Delegation

`classList` is frequently used with event delegation.

Example:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest(".tab");

  if (!button) {
    return;
  }

  button.classList.add("active");
});
```

The flow is:

```text
Container receives event
        ↓
Find clicked tab
        ↓
Modify its class
```

This becomes particularly useful when there are many dynamic elements.

---

# 40. Complete Tabs Example

HTML:

```html
<div class="tabs">
  <button class="tab active" data-tab="about">
    About
  </button>

  <button class="tab" data-tab="projects">
    Projects
  </button>

  <button class="tab" data-tab="contact">
    Contact
  </button>
</div>
```

JavaScript:

```javascript
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");
  });
});
```

CSS:

```css
.tab {
  opacity: 0.6;
}

.tab.active {
  opacity: 1;
}
```

The JavaScript does not directly define the visual style.

It only manages:

```text
active
```

CSS decides what `active` looks like.

---

# 41. `classList` and DOM State

It is useful to think of classes as UI state markers.

For example:

```text
modal
modal open

menu
menu open

tab
tab active

input
input invalid

button
button loading
```

JavaScript changes the state marker:

```javascript
element.classList.add("loading");
```

CSS reacts to it:

```css
.button.loading {
  opacity: 0.6;
}
```

This pattern separates behavior from presentation.

---

# 42. Class Order

The order of classes in `classList` generally corresponds to the order represented in the `class` attribute.

However, you should not design application logic around class ordering.

Avoid assumptions such as:

```javascript
element.classList.item(0) === "active"
```

unless the order is explicitly meaningful to your own code.

Classes should normally be treated as an unordered set of tokens.

---

# 43. `classList` Is Live

The `classList` object reflects changes to the element.

For example:

```javascript
const classes = element.classList;

element.classList.add("active");

console.log(classes.contains("active"));
```

This reflects the updated class list.

The important idea is:

```text
classList
 ↓
current classes of the element
```

---

# 44. `classList` Does Not Modify CSS Directly

This:

```javascript
element.classList.add("active");
```

does not directly execute CSS.

Instead:

```text
DOM class changes
        ↓
CSS selector matches
        ↓
Browser recalculates styles
        ↓
Element appearance changes
```

For example:

```css
.card.active {
  transform: scale(1.05);
}
```

When `active` is added, the selector can start matching.

---

# 45. `classList` vs Inline Styles

Compare:

```javascript
element.style.display = "none";
```

with:

```javascript
element.classList.add("hidden");
```

The first directly changes an inline style.

The second changes a class.

A class-based approach is often preferable when the visual rule belongs in CSS:

```css
.hidden {
  display: none;
}
```

Use inline styles when the actual value is genuinely dynamic:

```javascript
element.style.width = `${width}px`;
```

---

# 46. Common Mistakes

## Mistake 1: Replacing All Classes

Avoid:

```javascript
element.className = "active";
```

when you only want to add a class.

Prefer:

```javascript
element.classList.add("active");
```

---

## Mistake 2: Using String Replacement

Avoid:

```javascript
element.className =
  element.className.replace("active", "");
```

Prefer:

```javascript
element.classList.remove("active");
```

---

## Mistake 3: Using `toggle()` When the Desired State Is Known

Suppose:

```javascript
const isActive = true;
```

Avoid blindly doing:

```javascript
element.classList.toggle("active");
```

because the result depends on the current DOM state.

Prefer:

```javascript
element.classList.toggle("active", isActive);
```

This makes the intended state explicit.

---

## Mistake 4: Passing Multiple Classes as One String

Avoid:

```javascript
element.classList.add("active featured");
```

Prefer:

```javascript
element.classList.add(
  "active",
  "featured"
);
```

---

## Mistake 5: Expecting `classList` to Be an Array

This:

```javascript
element.classList.map(...)
```

does not work like an ordinary array.

If you need array methods:

```javascript
const classes = [...element.classList];

classes.map(...);
```

---

## Mistake 6: Putting Visual Logic Everywhere in JavaScript

Avoid:

```javascript
element.style.backgroundColor = "...";
element.style.color = "...";
element.style.border = "...";
```

for every UI state.

Often a cleaner design is:

```javascript
element.classList.add("error");
```

and:

```css
.error {
  /* visual rules */
}
```

---

# 47. Best Practices

### 1. Prefer `classList` for class manipulation

Use:

```javascript
add()
remove()
toggle()
contains()
replace()
```

instead of manually editing class strings.

---

### 2. Keep presentation in CSS

JavaScript should generally express:

```text
active
open
hidden
error
loading
```

while CSS defines how those states look.

---

### 3. Use the forced form of `toggle()` when appropriate

```javascript
element.classList.toggle(
  "active",
  isActive
);
```

This makes state synchronization explicit.

---

### 4. Use semantic state names

Prefer:

```text
active
open
selected
disabled
error
loading
```

over vague names such as:

```text
blue
style2
thing
class1
```

A state class should describe what the element means, not merely its current appearance.

---

### 5. Avoid relying on class order

Treat classes as independent tokens.

---

### 6. Do not use classes as a database

A class such as:

```text
user-12345
```

should not normally be your primary data storage mechanism.

Use:

```html
data-user-id="12345"
```

for element-specific metadata.

Use classes primarily for styling and UI state.

---

# 48. React Connection

`classList` is extremely important for understanding the DOM, but React changes how you normally manage classes.

In vanilla JavaScript:

```javascript
element.classList.add("active");
```

you directly modify the DOM.

In React, you normally describe the desired class from state:

```jsx
<button className={isActive ? "tab active" : "tab"}>
  Projects
</button>
```

The mental model becomes:

```text
Vanilla JavaScript

JavaScript
    ↓
classList
    ↓
DOM
    ↓
CSS
```

React:

```text
State
 ↓
JSX
 ↓
className
 ↓
React updates DOM
 ↓
CSS
```

---

# 49. React `className` vs DOM `classList`

In JSX, you normally write:

```jsx
<div className="card active">
  Osama Abu Motlaq
</div>
```

not:

```javascript
element.classList.add("active");
```

React owns the DOM representation.

You generally tell React what the UI should look like rather than manually changing the DOM behind React's back.

---

# 50. Conditional Classes in React

Example:

```jsx
<div className={isActive ? "card active" : "card"}>
  Osama Abu Motlaq
</div>
```

Or:

```jsx
<div
  className={`card ${isActive ? "active" : ""}`}
>
  Osama Abu Motlaq
</div>
```

The underlying browser still has a `class` attribute.

React simply manages it declaratively.

---

# 51. Why This Matters for React

Understanding `classList` teaches you what actually happens in the browser.

You learn that:

```text
class
 ↓
CSS selector
 ↓
visual state
```

Then React introduces a different way of controlling that state:

```text
React state
 ↓
JSX className
 ↓
DOM class
 ↓
CSS
```

So `classList` is important for understanding the DOM itself, even though you should rarely use it for ordinary React UI updates.

---

# 52. When Direct `classList` Manipulation Can Make Sense in React

Direct DOM manipulation can occasionally be appropriate when working with:

* Third-party libraries.
* DOM APIs that React does not control.
* Imperative animations.
* Special browser APIs.
* Elements accessed through refs.

Example:

```jsx
const elementRef = useRef(null);
```

Then:

```javascript
elementRef.current.classList.add("active");
```

However, this should be deliberate.

For ordinary component state, prefer:

```jsx
className={isActive ? "active" : ""}
```

because React should remain the source of truth.

---

# 53. `classList` and Next.js

Next.js uses React, so the same principle applies.

For normal UI state:

```jsx
className={isOpen ? "menu open" : "menu"}
```

is generally preferable to:

```javascript
element.classList.toggle("open");
```

Direct DOM APIs are primarily relevant in client-side browser code.

Remember:

```text
Server
→ no normal DOM

Browser
→ DOM exists
```

This distinction matters when working with Next.js Server Components and Client Components.

---

# 54. Comparison Table

| API                             | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| `classList.add()`               | Add classes                              |
| `classList.remove()`            | Remove classes                           |
| `classList.toggle()`            | Add/remove depending on current state    |
| `classList.toggle(name, force)` | Explicitly add/remove based on condition |
| `classList.contains()`          | Check for a class                        |
| `classList.replace()`           | Replace one class with another           |
| `classList.item()`              | Get a class by index                     |
| `classList.length`              | Number of classes                        |
| `className`                     | Get/set complete class attribute         |

---

# 55. Quick Reference

## Select an element

```javascript
const element = document.querySelector(".card");
```

## Add a class

```javascript
element.classList.add("active");
```

## Add multiple classes

```javascript
element.classList.add(
  "active",
  "featured"
);
```

## Remove a class

```javascript
element.classList.remove("active");
```

## Remove multiple classes

```javascript
element.classList.remove(
  "active",
  "featured"
);
```

## Check a class

```javascript
element.classList.contains("active");
```

## Toggle a class

```javascript
element.classList.toggle("active");
```

## Toggle based on a condition

```javascript
element.classList.toggle(
  "active",
  isActive
);
```

## Replace a class

```javascript
element.classList.replace(
  "inactive",
  "active"
);
```

## Number of classes

```javascript
element.classList.length;
```

## Get a class by index

```javascript
element.classList.item(0);
```

## Iterate

```javascript
for (const className of element.classList) {
  console.log(className);
}
```

## Convert to an array

```javascript
const classes = [...element.classList];
```

---

# 56. Practical Decision Guide

Use:

```javascript
classList.add()
```

when you want:

```text
"This state/class should exist."
```

Use:

```javascript
classList.remove()
```

when you want:

```text
"This state/class should not exist."
```

Use:

```javascript
classList.toggle()
```

when you want:

```text
"Switch between the two states."
```

Use:

```javascript
classList.toggle(name, condition)
```

when you want:

```text
"The class should match this boolean condition."
```

Use:

```javascript
classList.contains()
```

when you want:

```text
"Tell me whether this class exists."
```

Use:

```javascript
classList.replace()
```

when you want:

```text
"Replace this state/class with another."
```

---

# 57. Final Mental Model

The most important idea is:

```text
classList
    ↓
Manage CSS class tokens
    ↓
Class changes
    ↓
CSS selectors react
    ↓
Visual/UI state changes
```

For example:

```javascript
menu.classList.toggle("open");
```

does not directly mean:

```text
"show the menu"
```

It means:

```text
Add/remove the "open" class.
```

Then CSS determines what that class means:

```css
.menu.open {
  display: block;
}
```

This separation is fundamental:

```text
JavaScript
→ behavior/state

CSS
→ presentation
```

---

# 58. Final Takeaways

* `classList` provides a class-aware API for DOM elements.
* `classList` represents the element's individual class tokens.
* It is a `DOMTokenList`, not a normal JavaScript array.
* `add()` adds classes without replacing existing classes.
* `remove()` removes specific classes.
* `contains()` checks whether a class exists.
* `toggle()` switches a class between present and absent.
* `toggle(className, condition)` makes a class reflect an explicit boolean state.
* `replace()` changes one class into another.
* `length` reports the number of classes.
* `item()` retrieves a class by position.
* `className` represents the complete class attribute as a string.
* `classList` is generally safer and clearer than manually manipulating `className`.
* CSS classes can represent UI states such as `active`, `open`, `loading`, and `error`.
* JavaScript can manage the state class while CSS manages the visual presentation.
* `classList` works naturally with DOM events and event delegation.
* In React, ordinary UI state should normally be represented through React state and `className`, rather than direct `classList` manipulation.
* Direct DOM class manipulation in React is mainly appropriate for deliberate imperative integrations such as certain third-party libraries or DOM APIs.
* Understanding `classList` gives you a strong foundation for understanding how React ultimately updates the browser's DOM.

The core pattern to remember is:

```text
JavaScript
    ↓
classList
    ↓
DOM class
    ↓
CSS selector
    ↓
Visual state
```

And in React:

```text
State
    ↓
JSX / className
    ↓
React
    ↓
DOM class
    ↓
CSS
```
