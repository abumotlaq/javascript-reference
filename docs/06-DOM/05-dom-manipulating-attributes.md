# DOM Manipulating Attributes

HTML elements contain **attributes** that provide additional information about the element.

For example:

```html
<img id="profile-image" src="osama.png" alt="Osama Abu Motlaq">
```

This element has several attributes:

```text
id
src
alt
```

JavaScript can read, change, add, and remove these attributes.

The main DOM APIs for manipulating attributes are:

```javascript
getAttribute()
setAttribute()
hasAttribute()
removeAttribute()
```

You can also access many common HTML attributes directly through element properties:

```javascript
element.id
element.title
element.src
element.href
element.value
element.disabled
element.checked
```

Understanding the difference between **attributes** and **properties** is important for DOM development.

---

# 1. What Is an HTML Attribute?

An attribute is additional information written inside an HTML opening tag.

Example:

```html
<button id="save-button" type="button" disabled>
    Save
</button>
```

The attributes are:

```text
id="save-button"
type="button"
disabled
```

They provide information about the element.

Another example:

```html
<a href="/projects" target="_blank">
    Projects
</a>
```

The attributes are:

```text
href
target
```

---

# 2. Selecting an Element First

Before manipulating an attribute, you normally need a reference to the element.

Example:

```html
<img id="profile-image" src="osama.png" alt="Osama Abu Motlaq">
```

JavaScript:

```javascript
const image = document.querySelector("#profile-image");
```

Now:

```javascript
image
```

references the DOM element.

You can manipulate its attributes.

---

# 3. Reading an Attribute with `getAttribute()`

The `getAttribute()` method reads an attribute.

Syntax:

```javascript
element.getAttribute("attributeName");
```

Example:

```javascript
const image = document.querySelector("#profile-image");

const source = image.getAttribute("src");

console.log(source);
```

Output:

```text
osama.png
```

Another example:

```javascript
const altText = image.getAttribute("alt");

console.log(altText);
```

Output:

```text
Osama Abu Motlaq
```

---

# 4. Reading an Attribute That Does Not Exist

Suppose:

```html
<img id="profile-image" src="osama.png">
```

There is no:

```text
title
```

attribute.

Then:

```javascript
const image = document.querySelector("#profile-image");

console.log(image.getAttribute("title"));
```

returns:

```javascript
null
```

This is different from:

```javascript
undefined
```

The important distinction is:

```text
Attribute does not exist
        ↓
getAttribute()
        ↓
null
```

---

# 5. Setting an Attribute with `setAttribute()`

The `setAttribute()` method adds a new attribute or changes an existing one.

Syntax:

```javascript
element.setAttribute("attributeName", "value");
```

Example:

```javascript
const image = document.querySelector("#profile-image");

image.setAttribute("alt", "Osama Abu Motlaq");
```

If the attribute already exists, its value is changed.

If it does not exist, it is created.

---

# 6. Changing an Existing Attribute

HTML:

```html
<img id="profile-image" src="old-image.png">
```

JavaScript:

```javascript
const image = document.querySelector("#profile-image");

image.setAttribute("src", "osama.png");
```

The resulting HTML is conceptually:

```html
<img id="profile-image" src="osama.png">
```

The existing `src` attribute was changed.

---

# 7. Adding a New Attribute

HTML:

```html
<button id="profile-button">
    View Profile
</button>
```

JavaScript:

```javascript
const button = document.querySelector("#profile-button");

button.setAttribute("title", "View Osama Abu Motlaq profile");
```

The resulting element has:

```html
<button
    id="profile-button"
    title="View Osama Abu Motlaq profile"
>
    View Profile
</button>
```

`setAttribute()` therefore has two jobs:

```text
Existing attribute
        ↓
Update it

Missing attribute
        ↓
Create it
```

---

# 8. `hasAttribute()`

The `hasAttribute()` method checks whether an attribute exists.

Syntax:

```javascript
element.hasAttribute("attributeName");
```

Example:

```javascript
const image = document.querySelector("#profile-image");

console.log(image.hasAttribute("src"));
```

Output:

```text
true
```

And:

```javascript
console.log(image.hasAttribute("title"));
```

might return:

```text
false
```

This checks whether the attribute exists, not whether its value is truthy.

---

# 9. `removeAttribute()`

The `removeAttribute()` method removes an attribute.

Example:

```javascript
const image = document.querySelector("#profile-image");

image.removeAttribute("alt");
```

If the original HTML is:

```html
<img
    id="profile-image"
    src="osama.png"
    alt="Osama Abu Motlaq"
>
```

after:

```javascript
image.removeAttribute("alt");
```

the `alt` attribute is removed.

Conceptually:

```html
<img
    id="profile-image"
    src="osama.png"
>
```

---

# 10. Complete Attribute API

The four core methods are:

```javascript
getAttribute()
setAttribute()
hasAttribute()
removeAttribute()
```

Example:

```javascript
const button = document.querySelector("#save-button");

// Read
button.getAttribute("type");

// Create or update
button.setAttribute("type", "submit");

// Check
button.hasAttribute("disabled");

// Remove
button.removeAttribute("disabled");
```

These methods work with standard HTML attributes.

---

# 11. Boolean Attributes

Some HTML attributes are **boolean attributes**.

Examples include:

```text
disabled
checked
selected
required
readonly
multiple
autofocus
hidden
```

Their important property is **presence**.

For example:

```html
<button disabled>
    Save
</button>
```

The presence of:

```text
disabled
```

means the button is disabled.

---

# 12. Checking Boolean Attributes

You can use:

```javascript
button.hasAttribute("disabled");
```

Example:

```javascript
const button = document.querySelector("#save-button");

if (button.hasAttribute("disabled")) {
    console.log("The button is disabled");
}
```

This checks whether the attribute exists.

---

# 13. Removing a Boolean Attribute

Suppose:

```html
<button id="save-button" disabled>
    Save
</button>
```

You can enable it by removing the attribute:

```javascript
const button = document.querySelector("#save-button");

button.removeAttribute("disabled");
```

Now:

```html
<button id="save-button">
    Save
</button>
```

The button is no longer disabled.

---

# 14. Adding a Boolean Attribute

You can disable the button again:

```javascript
button.setAttribute("disabled", "");
```

The resulting HTML is conceptually:

```html
<button id="save-button" disabled>
    Save
</button>
```

For boolean attributes, the exact string value is generally not what determines the state.

The important fact is that the attribute exists.

---

# 15. Boolean Attribute Pitfall

Consider:

```javascript
button.setAttribute("disabled", "false");
```

It may look like this means:

```text
disabled = false
```

But for a boolean HTML attribute, the presence of the attribute is what matters.

So:

```html
<button disabled="false">
```

is still considered disabled.

This is why boolean attributes should be handled carefully.

In JavaScript, for standard DOM properties, this is often clearer:

```javascript
button.disabled = false;
```

or:

```javascript
button.disabled = true;
```

---

# 16. Attributes vs Properties

This is one of the most important DOM concepts.

Consider:

```html
<input id="username" value="Osama Abu Motlaq">
```

The HTML contains the attribute:

```text
value="Osama Abu Motlaq"
```

But the DOM element also has a JavaScript property:

```javascript
input.value
```

These are related, but they are not conceptually identical.

Think of it as:

```text
HTML
  ↓
Attribute

DOM object
  ↓
Property
```

---

# 17. Accessing Common Attributes as Properties

Many standard HTML attributes have corresponding DOM properties.

For example:

```html
<img id="profile-image" src="osama.png" alt="Osama Abu Motlaq">
```

You can use:

```javascript
const image = document.querySelector("#profile-image");

console.log(image.src);
console.log(image.alt);
```

Instead of:

```javascript
image.getAttribute("src");
image.getAttribute("alt");
```

Both approaches can be useful.

---

# 18. Property Syntax

Common examples:

```javascript
element.id
element.title
element.lang
element.hidden
element.className
element.value
element.checked
element.disabled
element.required
```

For example:

```javascript
const button = document.querySelector("#save-button");

button.disabled = true;
```

This is often clearer than:

```javascript
button.setAttribute("disabled", "");
```

for changing a boolean state.

---

# 19. Attribute vs Property: Simple Mental Model

Use this mental model:

```text
Attribute
    ↓
HTML markup/configuration

Property
    ↓
Current DOM object state
```

For example:

```html
<input value="Osama Abu Motlaq">
```

The HTML provides an initial value.

But while the user types, the current value is represented by:

```javascript
input.value
```

This distinction becomes particularly important with form elements.

---

# 20. The `value` Example

Consider:

```html
<input id="username" value="Osama Abu Motlaq">
```

Then:

```javascript
const input = document.querySelector("#username");
```

The initial HTML attribute can be read with:

```javascript
input.getAttribute("value");
```

The current DOM value can be read with:

```javascript
input.value;
```

Initially, both may contain:

```text
Osama Abu Motlaq
```

But if the user changes the input:

```javascript
input.value
```

represents the current value.

The original HTML attribute does not necessarily change.

This illustrates why attributes and properties should not be treated as identical.

---

# 21. `id` Attribute and `id` Property

HTML:

```html
<section id="about"></section>
```

You can read the attribute:

```javascript
section.getAttribute("id");
```

or the property:

```javascript
section.id;
```

Both will normally return:

```text
about
```

You can change it with:

```javascript
section.id = "profile";
```

or:

```javascript
section.setAttribute("id", "profile");
```

---

# 22. `class` and `className`

HTML uses:

```html
<div class="profile-card"></div>
```

The DOM property is:

```javascript
element.className
```

Example:

```javascript
const card = document.querySelector(".profile-card");

console.log(card.className);
```

Output:

```text
profile-card
```

You can also use:

```javascript
card.setAttribute("class", "profile-card active");
```

or:

```javascript
card.className = "profile-card active";
```

However, for adding and removing individual classes, prefer `classList`.

Example:

```javascript
card.classList.add("active");
```

We will cover `classList` in detail in the appropriate DOM file.

---

# 23. `href` Attribute vs `href` Property

Consider:

```html
<a id="projects-link" href="/projects">
    Projects
</a>
```

You can read the HTML attribute:

```javascript
const link = document.querySelector("#projects-link");

console.log(link.getAttribute("href"));
```

Output:

```text
/projects
```

But:

```javascript
console.log(link.href);
```

may return the resolved absolute URL.

For example:

```text
https://example.com/projects
```

This demonstrates that a DOM property can provide a processed or resolved representation rather than exactly the raw HTML attribute value.

---

# 24. `src` Attribute vs `src` Property

Similarly:

```html
<img src="images/osama.png">
```

The attribute:

```javascript
image.getAttribute("src");
```

may return:

```text
images/osama.png
```

while:

```javascript
image.src
```

can return a fully resolved URL.

Therefore:

```text
getAttribute("src")
    ↓
Raw attribute value

image.src
    ↓
Resolved DOM property value
```

This distinction is useful when debugging URLs.

---

# 25. Custom Data Attributes

HTML allows custom attributes using:

```text
data-*
```

Example:

```html
<div
    id="profile"
    data-user-id="42"
    data-role="developer"
>
    Osama Abu Motlaq
</div>
```

These are called **data attributes**.

They are intended for storing custom data associated with an element.

---

# 26. Reading `data-*` with `getAttribute()`

You can read them directly:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.getAttribute("data-user-id"));
```

Output:

```text
42
```

And:

```javascript
console.log(profile.getAttribute("data-role"));
```

Output:

```text
developer
```

---

# 27. The `dataset` Property

There is a more convenient API for `data-*` attributes:

```javascript
dataset
```

Example:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.dataset.userId);
```

Output:

```text
42
```

And:

```javascript
console.log(profile.dataset.role);
```

Output:

```text
developer
```

The conversion is:

```text
data-user-id
      ↓
dataset.userId
```

and:

```text
data-role
      ↓
dataset.role
```

---

# 28. Changing `data-*` Attributes with `dataset`

HTML:

```html
<div id="profile" data-role="student">
    Osama Abu Motlaq
</div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

profile.dataset.role = "developer";
```

The resulting HTML is conceptually:

```html
<div
    id="profile"
    data-role="developer"
>
    Osama Abu Motlaq
</div>
```

---

# 29. Adding a New Data Attribute

You can write:

```javascript
profile.dataset.status = "active";
```

This creates:

```html
data-status="active"
```

So:

```javascript
profile.dataset.status
```

corresponds to:

```html
data-status
```

---

# 30. Removing a Data Attribute

You can use:

```javascript
delete profile.dataset.status;
```

This removes:

```html
data-status
```

Alternatively:

```javascript
profile.removeAttribute("data-status");
```

Both can remove the data attribute.

---

# 31. `dataset` Naming Conversion

Consider:

```html
<div
    data-user-name="Osama Abu Motlaq"
    data-project-count="5"
></div>
```

JavaScript:

```javascript
element.dataset.userName;
element.dataset.projectCount;
```

The conversion is:

```text
data-user-name
      ↓
dataset.userName

data-project-count
      ↓
dataset.projectCount
```

Hyphenated names become camelCase properties.

---

# 32. `getAttribute()` vs `dataset`

Both can access data attributes.

Using:

```javascript
element.getAttribute("data-user-name");
```

or:

```javascript
element.dataset.userName;
```

The second is usually more convenient when working specifically with `data-*` attributes.

Use `getAttribute()` when you want the general attribute API.

Use `dataset` when your intent is specifically working with custom `data-*` values.

---

# 33. Attribute Names Are Strings

Attributes are represented by names and values.

For example:

```html
<div data-count="10"></div>
```

The value is:

```text
"10"
```

not:

```javascript
10
```

So:

```javascript
const count = element.dataset.count;

console.log(typeof count);
```

returns:

```text
string
```

If you need a number:

```javascript
const count = Number(element.dataset.count);
```

Now:

```javascript
typeof count
```

is:

```text
number
```

---

# 34. Attributes and Type Conversion

HTML attributes are generally represented as strings.

For example:

```html
<input data-age="25">
```

Then:

```javascript
element.dataset.age
```

returns:

```text
"25"
```

not:

```javascript
25
```

Therefore:

```javascript
Number(element.dataset.age);
```

may be necessary when numeric behavior is required.

Similarly:

```javascript
element.dataset.active = false;
```

stores:

```text
"false"
```

as a string.

It does not create a JavaScript boolean value.

---

# 35. Enumerating Attributes

An element exposes its attributes through:

```javascript
element.attributes
```

Example:

```html
<img
    id="profile-image"
    src="osama.png"
    alt="Osama Abu Motlaq"
>
```

JavaScript:

```javascript
const image = document.querySelector("#profile-image");

console.log(image.attributes);
```

This returns a collection of attribute nodes.

You can inspect:

```javascript
console.log(image.attributes[0]);
```

and access:

```javascript
image.attributes[0].name;
image.attributes[0].value;
```

---

# 36. Looping Through Attributes

You can iterate through the collection:

```javascript
const image = document.querySelector("#profile-image");

for (const attribute of image.attributes) {
    console.log(attribute.name, attribute.value);
}
```

Possible output:

```text
id profile-image
src osama.png
alt Osama Abu Motlaq
```

This is useful when you need to inspect all attributes dynamically.

---

# 37. `hasAttribute()` vs Property Checks

Consider:

```html
<button id="save-button" disabled>
    Save
</button>
```

You can check:

```javascript
button.hasAttribute("disabled");
```

This asks:

> Does the `disabled` attribute exist?

You can also check:

```javascript
button.disabled;
```

This asks about the DOM property's current disabled state.

For boolean HTML features, the property is often more natural when your goal is to control behavior.

---

# 38. Attribute Manipulation with Forms

Attributes and properties become especially important with forms.

Example:

```html
<input
    id="email"
    type="email"
    required
>
```

You can inspect:

```javascript
const email = document.querySelector("#email");

console.log(email.getAttribute("type"));
console.log(email.type);

console.log(email.hasAttribute("required"));
console.log(email.required);
```

The first pair concerns the input type.

The second pair demonstrates attribute presence versus the DOM property representing the current state.

---

# 39. Changing Form State

For boolean properties:

```javascript
email.required = false;
```

is generally clearer than:

```javascript
email.removeAttribute("required");
```

Both can affect the element's required state, but the property communicates that you are changing the current DOM state.

Similarly:

```javascript
checkbox.checked = true;
```

is usually preferable to manually managing:

```javascript
checkbox.setAttribute("checked", "");
```

when your goal is to control the current checked state.

---

# 40. Attribute Manipulation and CSS

Attributes can also be used by CSS.

HTML:

```html
<button data-state="active">
    Save
</button>
```

CSS can target the attribute:

```css
button[data-state="active"] {
    font-weight: bold;
}
```

JavaScript:

```javascript
button.dataset.state = "inactive";
```

The DOM attribute changes:

```html
data-state="inactive"
```

and CSS can respond to that state.

This creates a useful relationship:

```text
JavaScript
    ↓
Changes attribute
    ↓
CSS selector matches new state
    ↓
Visual appearance changes
```

---

# 41. Attribute Selectors

CSS can select elements based on attributes.

Examples:

```css
[data-role]
```

Selects elements that have:

```text
data-role
```

This:

```css
[data-role="developer"]
```

selects elements where:

```text
data-role = "developer"
```

JavaScript can modify the value:

```javascript
element.dataset.role = "developer";
```

This makes attributes useful for representing simple UI states.

---

# 42. Do Not Store Application State Carelessly in Attributes

You may see code like:

```html
<div data-count="100"></div>
```

and then use it as application state.

This can be useful for small DOM-related metadata, but it is not a replacement for a proper state-management system.

For example, in React, you generally should not use:

```text
data-* attributes
```

as a substitute for:

```text
React state
```

Use them when they actually represent DOM-related metadata or when an external DOM API needs them.

---

# 43. React Relevance

Understanding attributes is **important for React** because JSX uses HTML-like attributes, but React handles them declaratively.

For example:

```jsx
<img
    src="/osama.png"
    alt="Osama Abu Motlaq"
/>
```

This looks similar to HTML:

```html
<img
    src="/osama.png"
    alt="Osama Abu Motlaq"
>
```

But React controls the resulting DOM based on props and state.

You normally do not manually write:

```javascript
document.querySelector("img").setAttribute("src", "/osama.png");
```

inside a React component for ordinary UI updates.

---

# 44. JSX Attributes Are Props

In React:

```jsx
<Profile name="Osama Abu Motlaq" />
```

`name` is a React prop.

It is not simply the same concept as a native DOM attribute.

React receives:

```text
name
```

as component data.

For a DOM element:

```jsx
<img src="/osama.png" alt="Osama Abu Motlaq" />
```

React eventually manages the corresponding DOM properties/attributes as appropriate.

This distinction becomes important when learning:

* Props
* State
* DOM attributes
* Controlled inputs
* Event handling

---

# 45. `data-*` Attributes in React

React also supports custom data attributes:

```jsx
<div data-user-id="42">
    Osama Abu Motlaq
</div>
```

You can inspect them in the browser as normal DOM attributes.

This can be useful for:

* DOM metadata.
* Testing selectors.
* Integrations.
* Identifying elements.

For testing, many testing tools specifically use:

```text
data-testid
```

when appropriate.

---

# 46. Common Mistakes

## Mistake 1: Treating Boolean Attributes Like Normal Strings

Incorrect mental model:

```javascript
button.setAttribute("disabled", "false");
```

does not mean:

```text
disabled = false
```

The attribute still exists.

For DOM state, prefer:

```javascript
button.disabled = false;
```

when appropriate.

---

## Mistake 2: Assuming Attributes and Properties Are Identical

For example:

```javascript
input.getAttribute("value");
```

and:

```javascript
input.value;
```

can represent different concepts.

Remember:

```text
Attribute → HTML markup

Property → DOM object state/value
```

---

## Mistake 3: Expecting `dataset` Values to Be Numbers or Booleans

This:

```javascript
element.dataset.count = 10;
```

stores a string representation.

Read it as:

```javascript
"10"
```

Convert it when necessary:

```javascript
Number(element.dataset.count);
```

---

## Mistake 4: Using `innerHTML` to Change Attributes

Do not rebuild an entire element just to change one attribute.

Instead of:

```javascript
element.outerHTML = `
    <button id="save-button" disabled>
        Save
    </button>
`;
```

use:

```javascript
element.disabled = true;
```

or:

```javascript
element.setAttribute("disabled", "");
```

depending on the goal.

---

## Mistake 5: Forgetting That `setAttribute()` Creates Missing Attributes

This:

```javascript
element.setAttribute("title", "Profile");
```

does not require the `title` attribute to already exist.

It creates it if necessary.

---

# 47. Best Practices

### Use the general attribute API when you need attributes directly

```javascript
getAttribute()
setAttribute()
hasAttribute()
removeAttribute()
```

### Prefer DOM properties for current element state

For example:

```javascript
input.value
checkbox.checked
button.disabled
input.required
```

### Use `dataset` for `data-*` attributes

```javascript
element.dataset.userId
```

### Remember that attribute values are strings

Convert them when numeric or boolean behavior is required.

### Use `textContent` for plain text

Do not use `innerHTML` simply to update an attribute or text.

### Avoid using attributes as a replacement for application state

Especially in React applications, use the appropriate state mechanism.

---

# 48. Quick Reference

## Read

```javascript
element.getAttribute("src");
```

## Set

```javascript
element.setAttribute("src", "osama.png");
```

## Check

```javascript
element.hasAttribute("src");
```

## Remove

```javascript
element.removeAttribute("src");
```

## Common property

```javascript
element.id;
element.title;
element.src;
element.href;
element.value;
element.checked;
element.disabled;
```

## Data attribute

```html
<div data-user-id="42"></div>
```

```javascript
element.dataset.userId;
```

## Change data attribute

```javascript
element.dataset.userId = "50";
```

## Remove data attribute

```javascript
delete element.dataset.userId;
```

---

# 49. Attribute Manipulation Mental Model

Think about an HTML element as having two related layers:

```text
HTML Markup
     │
     ├── id="profile"
     ├── class="card"
     ├── data-user-id="42"
     └── disabled
     │
     ↓
DOM Element Object
     │
     ├── element.id
     ├── element.className
     ├── element.dataset.userId
     ├── element.disabled
     └── element.value
```

The attribute API works directly with markup-level attributes:

```text
getAttribute
setAttribute
hasAttribute
removeAttribute
```

DOM properties expose JavaScript-level representations and state.

---

# 50. Attribute vs Property Decision Guide

When you need to:

### Read a specific raw HTML attribute

Use:

```javascript
getAttribute()
```

### Create or change an attribute

Use:

```javascript
setAttribute()
```

### Check whether an attribute exists

Use:

```javascript
hasAttribute()
```

### Remove an attribute

Use:

```javascript
removeAttribute()
```

### Work with `data-*`

Use:

```javascript
dataset
```

### Control current form/UI state

Usually prefer the appropriate DOM property:

```javascript
input.value
checkbox.checked
button.disabled
input.required
```

---

# 51. Final Takeaways

* HTML attributes provide additional information about elements.
* JavaScript can manipulate attributes through the DOM.
* `getAttribute()` reads an attribute.
* `setAttribute()` creates or updates an attribute.
* `hasAttribute()` checks whether an attribute exists.
* `removeAttribute()` removes an attribute.
* Boolean attributes are primarily controlled by their presence.
* `disabled="false"` is still a present `disabled` attribute.
* DOM properties and HTML attributes are related but are not always identical.
* Properties such as `value`, `checked`, and `disabled` often represent the current DOM state.
* `data-*` attributes are accessed conveniently through `dataset`.
* `dataset` values are strings.
* `href` and `src` properties may return resolved URLs rather than the raw attribute value.
* `element.attributes` provides access to the element's attributes.
* Attributes can interact with CSS attribute selectors.
* Attributes should not be treated as a replacement for proper application state.
* In React, normal UI changes should generally be driven through props and state rather than direct DOM attribute manipulation.

The core mental model is:

```text
HTML Attribute
      ↓
DOM Attribute API
      ↓
getAttribute()
setAttribute()
hasAttribute()
removeAttribute()

DOM Property
      ↓
Current JavaScript-facing state
      ↓
element.value
element.checked
element.disabled
element.id
...
```

Understanding the difference between **attributes** and **properties** is one of the most important foundations for working confidently with the DOM and with React's interaction with the DOM.
