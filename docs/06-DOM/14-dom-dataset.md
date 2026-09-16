# DOM dataset

The `dataset` property provides a convenient JavaScript interface for reading and modifying HTML `data-*` attributes.

Custom `data-*` attributes allow developers to attach small pieces of metadata to HTML elements.

For example:

```html
<button
  data-user-id="42"
  data-role="admin"
>
  Osama Abu Motlaq
</button>
```

JavaScript can access these values through:

```javascript
button.dataset.userId
button.dataset.role
```

The `dataset` API is especially useful for:

* Event delegation.
* Storing element-specific metadata.
* Connecting DOM elements to JavaScript logic.
* Identifying buttons, tabs, cards, and list items.
* Reading configuration values from HTML.
* Working with dynamically generated elements.

---

# 1. What Are `data-*` Attributes?

HTML provides a standard way to store custom data on elements:

```html
<div data-user-id="42"></div>
```

The important rule is that custom data attributes begin with:

```text
data-
```

Examples:

```html
<div data-user-id="42"></div>

<button data-action="delete"></button>

<div data-product-id="1001"></div>

<section data-theme="dark"></section>
```

These attributes are valid HTML and are intended for application-specific metadata.

---

# 2. Why Use `data-*` Attributes?

HTML already has attributes such as:

```html
id
class
href
src
name
value
```

But sometimes an application needs additional information.

For example:

```html
<button>
  Delete
</button>
```

JavaScript may need to know which record the button refers to.

Instead of relying on the button's text or CSS classes, you can write:

```html
<button data-user-id="42">
  Delete
</button>
```

Now the DOM element contains explicit metadata:

```text
button
 ├── visible content: Delete
 └── metadata: user ID = 42
```

---

# 3. The `dataset` Property

Given:

```html
<button id="profile-button" data-user-id="42">
  Osama Abu Motlaq
</button>
```

JavaScript:

```javascript
const button = document.querySelector("#profile-button");

console.log(button.dataset.userId);
```

Output:

```text
42
```

The HTML attribute:

```html
data-user-id
```

becomes:

```javascript
dataset.userId
```

---

# 4. The Naming Conversion Rule

The most important rule is:

```text
data-user-id
      ↓
dataset.userId
```

The first part remains:

```text
data-
```

but JavaScript accesses the attribute through `dataset`.

Hyphen-separated words after `data-` are converted to camelCase.

Examples:

| HTML                  | JavaScript              |
| --------------------- | ----------------------- |
| `data-user-id`        | `dataset.userId`        |
| `data-product-id`     | `dataset.productId`     |
| `data-first-name`     | `dataset.firstName`     |
| `data-account-status` | `dataset.accountStatus` |
| `data-theme`          | `dataset.theme`         |

---

# 5. Simple Example

HTML:

```html
<div
  id="profile"
  data-user-id="42"
  data-role="developer"
>
  Osama Abu Motlaq
</div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.dataset.userId);
console.log(profile.dataset.role);
```

Output:

```text
42
developer
```

---

# 6. Reading `data-*` Attributes

Suppose:

```html
<div
  data-user-id="42"
  data-role="developer"
></div>
```

You can read the values:

```javascript
console.log(element.dataset.userId);
```

and:

```javascript
console.log(element.dataset.role);
```

The values are returned as strings.

---

# 7. `dataset` Values Are Strings

This is extremely important.

Consider:

```html
<div data-count="10"></div>
```

Then:

```javascript
const count = element.dataset.count;

console.log(count);
```

The value is:

```text
"10"
```

not:

```javascript
10
```

Therefore:

```javascript
typeof count;
```

returns:

```text
"string"
```

---

# 8. Converting Dataset Values

If the value represents a number:

```javascript
const count = Number(element.dataset.count);
```

Now:

```javascript
typeof count;
```

returns:

```text
"number"
```

For example:

```javascript
const userId = Number(element.dataset.userId);

console.log(userId);
```

---

# 9. Boolean Values

Suppose:

```html
<button data-active="true">
  Profile
</button>
```

You might expect:

```javascript
element.dataset.active === true;
```

But this is:

```javascript
false
```

because:

```javascript
element.dataset.active
```

is:

```text
"true"
```

To convert it:

```javascript
const isActive = element.dataset.active === "true";
```

Now:

```javascript
typeof isActive;
```

is:

```text
"boolean"
```

---

# 10. Common Conversion Pattern

```javascript
const id = Number(element.dataset.userId);

const isActive =
  element.dataset.active === "true";
```

The important mental model is:

```text
HTML attributes
        ↓
strings
        ↓
dataset
        ↓
strings
        ↓
explicit conversion when needed
```

---

# 11. Writing Dataset Values

You can also modify `data-*` attributes through `dataset`.

HTML:

```html
<div id="profile"></div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

profile.dataset.userId = "42";
```

The browser updates the element to conceptually:

```html
<div
  id="profile"
  data-user-id="42"
></div>
```

---

# 12. Adding a Dataset Property

You can create a new data attribute:

```javascript
element.dataset.status = "active";
```

This creates:

```html
data-status="active"
```

Similarly:

```javascript
element.dataset.userId = "42";
```

creates:

```html
data-user-id="42"
```

---

# 13. Modifying a Dataset Property

Suppose:

```html
<div data-status="pending"></div>
```

JavaScript:

```javascript
element.dataset.status = "active";
```

The result becomes:

```html
<div data-status="active"></div>
```

---

# 14. Removing a Dataset Property

Use the `delete` operator:

```javascript
delete element.dataset.status;
```

This removes:

```html
data-status
```

from the element.

For example:

```html
<div data-status="active"></div>
```

After:

```javascript
delete element.dataset.status;
```

the attribute is removed.

---

# 15. `dataset` and `getAttribute()`

You can access the same data using either:

```javascript
element.dataset.userId;
```

or:

```javascript
element.getAttribute("data-user-id");
```

Example:

```html
<div data-user-id="42"></div>
```

Both return:

```text
"42"
```

But `dataset` provides a more convenient interface for `data-*` attributes.

---

# 16. `dataset` vs `getAttribute()`

Compare:

```javascript
element.dataset.userId;
```

with:

```javascript
element.getAttribute("data-user-id");
```

The first is JavaScript-friendly camelCase.

The second uses the original HTML attribute name.

Use `dataset` when working specifically with `data-*` attributes.

Use `getAttribute()` when you need a general attribute API.

---

# 17. `dataset` and `setAttribute()`

These two approaches are also equivalent in many cases.

Using `dataset`:

```javascript
element.dataset.userId = "42";
```

Using `setAttribute()`:

```javascript
element.setAttribute(
  "data-user-id",
  "42"
);
```

Both produce:

```html
data-user-id="42"
```

`dataset` is usually more readable for `data-*` attributes.

---

# 18. Multi-Word Attributes

Consider:

```html
<div data-account-status="active"></div>
```

Access it with:

```javascript
element.dataset.accountStatus;
```

The hyphen is removed and the next word is capitalized:

```text
data-account-status
        ↓
accountStatus
```

Another example:

```html
<div data-project-owner-name="Osama Abu Motlaq"></div>
```

JavaScript:

```javascript
element.dataset.projectOwnerName;
```

---

# 19. Multiple Data Attributes

An element can have multiple custom data attributes:

```html
<article
  data-id="101"
  data-category="javascript"
  data-author="Osama Abu Motlaq"
  data-published="true"
>
  JavaScript Reference
</article>
```

JavaScript:

```javascript
const article = document.querySelector("article");

console.log(article.dataset.id);
console.log(article.dataset.category);
console.log(article.dataset.author);
console.log(article.dataset.published);
```

Output:

```text
101
javascript
Osama Abu Motlaq
true
```

Remember that even `"true"` is a string.

---

# 20. Dataset as Element Metadata

A useful mental model is:

```text
Element
 ├── content
 ├── styling
 ├── behavior
 └── metadata
       ├── data-id
       ├── data-category
       └── data-status
```

For example:

```html
<button
  class="delete-button"
  data-user-id="42"
>
  Delete
</button>
```

The class tells JavaScript/CSS:

```text
"This is a delete button."
```

The dataset tells JavaScript:

```text
"This button operates on user 42."
```

---

# 21. `dataset` With Event Handling

This is one of the most important practical uses.

HTML:

```html
<button
  class="user-button"
  data-user-id="42"
>
  View Profile
</button>

<button
  class="user-button"
  data-user-id="73"
>
  View Profile
</button>
```

JavaScript:

```javascript
const buttons =
  document.querySelectorAll(".user-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const userId = button.dataset.userId;

    console.log(userId);
  });
});
```

Each button carries its own metadata.

---

# 22. Dataset With Event Delegation

`dataset` becomes especially useful with event delegation.

HTML:

```html
<div id="users">
  <button
    class="user-button"
    data-user-id="42"
  >
    Osama Abu Motlaq
  </button>

  <button
    class="user-button"
    data-user-id="73"
  >
    View User
  </button>
</div>
```

JavaScript:

```javascript
const users = document.querySelector("#users");

users.addEventListener("click", (event) => {
  const button = event.target.closest(".user-button");

  if (!button) {
    return;
  }

  const userId = button.dataset.userId;

  console.log(userId);
});
```

The important flow is:

```text
Click
 ↓
event.target
 ↓
closest(".user-button")
 ↓
dataset.userId
 ↓
identify the related data
```

---

# 23. Why Dataset Is Useful With Event Delegation

Imagine a list containing 100 buttons.

You do not need 100 separate listeners.

Instead:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-user-id]");

  if (!button) {
    return;
  }

  const userId = button.dataset.userId;

  // Handle user
});
```

The element carries the information required by the handler.

---

# 24. Dataset With Buttons

A common pattern is:

```html
<button
  data-action="delete"
  data-id="42"
>
  Delete
</button>
```

JavaScript:

```javascript
const action = button.dataset.action;
const id = button.dataset.id;

console.log(action);
console.log(id);
```

Output:

```text
delete
42
```

This allows one event handler to understand what the button represents.

---

# 25. Action-Based Interfaces

Consider:

```html
<div id="toolbar">
  <button
    data-action="save"
  >
    Save
  </button>

  <button
    data-action="delete"
  >
    Delete
  </button>

  <button
    data-action="cancel"
  >
    Cancel
  </button>
</div>
```

JavaScript:

```javascript
toolbar.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === "save") {
    console.log("Save");
  }

  if (action === "delete") {
    console.log("Delete");
  }

  if (action === "cancel") {
    console.log("Cancel");
  }
});
```

The HTML declares the action.

The JavaScript interprets it.

---

# 26. Dataset With Lists

Consider:

```html
<ul id="projects">
  <li data-project-id="101">
    Project A
  </li>

  <li data-project-id="102">
    Project B
  </li>
</ul>
```

JavaScript:

```javascript
const projects =
  document.querySelector("#projects");

projects.addEventListener("click", (event) => {
  const project = event.target.closest("li");

  if (!project) {
    return;
  }

  const projectId =
    Number(project.dataset.projectId);

  console.log(projectId);
});
```

This pattern is useful for dynamic lists.

---

# 27. Dataset With Tabs

HTML:

```html
<div class="tabs">
  <button
    class="tab"
    data-tab="about"
  >
    About
  </button>

  <button
    class="tab"
    data-tab="projects"
  >
    Projects
  </button>

  <button
    class="tab"
    data-tab="contact"
  >
    Contact
  </button>
</div>
```

JavaScript:

```javascript
const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", (event) => {
  const tab = event.target.closest(".tab");

  if (!tab) {
    return;
  }

  const tabName = tab.dataset.tab;

  console.log(tabName);
});
```

Now JavaScript knows which tab was selected without relying on the button's visible text.

---

# 28. Dataset and `classList`

`dataset` and `classList` often work together.

For example:

```html
<button
  class="tab"
  data-tab="projects"
>
  Projects
</button>
```

The dataset identifies the logical item:

```javascript
tab.dataset.tab;
```

The class represents visual state:

```javascript
tab.classList.add("active");
```

Mental model:

```text
dataset
→ application metadata

classList
→ CSS/UI state
```

---

# 29. Dataset Is Not a Replacement for `class`

Do not store state like this:

```html
<button class="active-project-42">
```

when the actual information is:

```text
project ID = 42
active = true
```

A cleaner representation can be:

```html
<button
  class="active"
  data-project-id="42"
>
```

Now each piece has a clear purpose:

```text
class
→ presentation/state

data-project-id
→ metadata
```

---

# 30. Dataset Is Not a Replacement for Form Attributes

For forms, use semantic HTML attributes where appropriate.

For example:

```html
<input
  name="email"
  type="email"
>
```

Do not unnecessarily replace:

```html
name="email"
```

with:

```html
data-name="email"
```

`data-*` is intended for custom application metadata.

Native HTML attributes should be used when the browser already provides the required semantics.

---

# 31. Dataset and Accessibility

Do not use `data-*` attributes as a replacement for accessibility attributes.

For example, avoid:

```html
<button
  data-label="Close"
>
  ×
</button>
```

when the actual accessibility requirement is a label.

Use:

```html
<button
  aria-label="Close"
>
  ×
</button>
```

`aria-*` attributes have a defined accessibility purpose.

`data-*` attributes are application metadata.

---

# 32. Dataset and Semantic HTML

Prefer native HTML when a native attribute exists.

For example:

```html
<button disabled>
  Submit
</button>
```

is better than:

```html
<button data-disabled="true">
  Submit
</button>
```

The native `disabled` attribute has browser semantics.

The custom `data-disabled` attribute does not automatically disable anything.

---

# 33. Dataset Values Are Not Automatically Interpreted

Consider:

```html
<div
  data-count="10"
  data-active="true"
></div>
```

JavaScript receives:

```javascript
element.dataset.count;
```

as:

```text
"10"
```

and:

```javascript
element.dataset.active;
```

as:

```text
"true"
```

The browser does not automatically convert them into:

```javascript
10
true
```

You decide how to interpret the values.

---

# 34. Dataset and JSON

You may encounter:

```html
<div
  data-config='{"theme":"dark","compact":true}'
></div>
```

JavaScript:

```javascript
const config =
  JSON.parse(element.dataset.config);
```

Now:

```javascript
config.theme;
```

returns:

```text
dark
```

and:

```javascript
config.compact;
```

returns:

```javascript
true
```

However, storing large or complex application state inside `data-*` attributes is usually not a good architecture.

Use dataset for small pieces of metadata.

---

# 35. Dataset Should Usually Contain Small Values

Good examples:

```html
data-id="42"
data-action="delete"
data-tab="projects"
data-category="javascript"
```

Less suitable:

```html
data-entire-user-object="..."
```

or:

```html
data-complete-application-state="..."
```

The larger and more complex the data becomes, the less appropriate `data-*` becomes.

---

# 36. Dataset and Security

`data-*` attributes are not a security mechanism.

For example:

```html
<button data-role="admin">
  Delete
</button>
```

does not make the user an administrator.

A user can inspect and modify the DOM.

Therefore:

```text
data-role="admin"
```

must never be treated as authoritative authorization information.

Authorization must be enforced on the server.

---

# 37. Dataset and Server-Side Security

Suppose:

```html
<button data-user-id="42">
  Delete User
</button>
```

The value:

```text
42
```

is controlled by the client.

A malicious user could modify it.

Therefore, a server must still verify:

```text
Who is making the request?
 ↓
Are they authenticated?
 ↓
Are they authorized?
 ↓
Can they modify this resource?
```

The dataset is only a convenient way to carry client-side metadata.

---

# 38. Dataset and `innerHTML`

If you generate HTML using:

```javascript
container.innerHTML = `
  <button
    data-user-id="42"
  >
    Osama Abu Motlaq
  </button>
`;
```

the browser creates the data attribute.

You can then access it:

```javascript
const button =
  container.querySelector("button");

console.log(button.dataset.userId);
```

Result:

```text
42
```

However, be careful when inserting untrusted data into `innerHTML`.

Do not place untrusted content into HTML without proper handling.

---

# 39. Dataset With Dynamic Elements

Suppose JavaScript creates an element:

```javascript
const button = document.createElement("button");

button.textContent = "View Profile";
button.dataset.userId = "42";
```

The resulting element conceptually becomes:

```html
<button data-user-id="42">
  View Profile
</button>
```

This is a convenient way to attach metadata while constructing DOM elements.

---

# 40. Dataset and `createElement()`

Complete example:

```javascript
const button =
  document.createElement("button");

button.textContent = "View Profile";

button.dataset.userId = "42";

document.body.append(button);
```

The DOM now contains:

```html
<button data-user-id="42">
  View Profile
</button>
```

---

# 41. Checking Whether Data Exists

You can check whether a dataset property exists:

```javascript
if (element.dataset.userId !== undefined) {
  console.log("User ID exists");
}
```

Another option is to check the actual attribute:

```javascript
if (element.hasAttribute("data-user-id")) {
  console.log("User ID exists");
}
```

The second form explicitly checks the HTML attribute.

---

# 42. Dataset and Empty Values

Consider:

```html
<div data-status=""></div>
```

Then:

```javascript
element.dataset.status;
```

returns:

```text
""
```

The attribute exists, but its value is an empty string.

This is different from an absent attribute.

For example:

```html
<div></div>
```

results in:

```javascript
element.dataset.status;
```

being:

```javascript
undefined
```

---

# 43. Missing vs Empty Dataset Values

The distinction is:

```text
data-status=""
        ↓
dataset.status === ""

No data-status attribute
        ↓
dataset.status === undefined
```

This can matter when implementing conditional logic.

---

# 44. Dataset and Attribute Selectors

CSS can also select elements using `data-*` attributes.

For example:

```css
button[data-action="delete"] {
  /* styles */
}
```

HTML:

```html
<button data-action="delete">
  Delete
</button>
```

The browser applies the selector because the attribute exists with the specified value.

---

# 45. Dataset + CSS

You can combine metadata and styling:

```html
<div
  class="status"
  data-status="success"
>
  Saved
</div>
```

CSS:

```css
.status[data-status="success"] {
  font-weight: bold;
}
```

JavaScript:

```javascript
element.dataset.status = "error";
```

Now the CSS selector:

```css
[data-status="error"]
```

can apply instead.

This can be useful, but avoid using `data-*` purely as a replacement for classes when the value represents only visual state.

---

# 46. Dataset + `classList`: Choosing Between Them

Suppose you need:

```text
active state
project ID
```

A good representation is:

```html
<button
  class="active"
  data-project-id="42"
>
  Project
</button>
```

Use:

```javascript
button.classList.contains("active");
```

for the UI state.

Use:

```javascript
button.dataset.projectId;
```

for the project metadata.

This keeps the responsibilities clear.

---

# 47. Dataset With `closest()`

This pattern is extremely common:

```javascript
container.addEventListener("click", (event) => {
  const button =
    event.target.closest("[data-user-id]");

  if (!button) {
    return;
  }

  const userId = button.dataset.userId;

  console.log(userId);
});
```

Notice that the selector itself can identify the element:

```css
[data-user-id]
```

Then `dataset` retrieves the value.

---

# 48. Dataset With Dynamic Lists

Consider a list generated from JavaScript:

```javascript
const users = [
  {
    id: 42,
    name: "Osama Abu Motlaq"
  },
  {
    id: 73,
    name: "Osama Abu Motlaq"
  }
];
```

When generating buttons:

```javascript
users.forEach((user) => {
  const button =
    document.createElement("button");

  button.textContent = user.name;
  button.dataset.userId = String(user.id);

  container.append(button);
});
```

Later, event delegation can retrieve:

```javascript
const userId =
  event.target.closest("button").dataset.userId;
```

This separates the visible label from the identifier.

---

# 49. Important: Dataset Is DOM Metadata

Do not confuse:

```javascript
element.dataset.userId;
```

with:

```javascript
user.id;
```

The first is data stored on a DOM element.

The second is data stored in a JavaScript object.

For example:

```javascript
const user = {
  id: 42,
  name: "Osama Abu Motlaq"
};
```

is application data.

Meanwhile:

```html
<button data-user-id="42">
```

is DOM metadata.

A common flow is:

```text
JavaScript data
 ↓
render DOM
 ↓
data-* metadata
 ↓
user interaction
 ↓
read dataset
 ↓
identify original data
```

---

# 50. React Connection

`data-*` attributes are also valid in React.

For example:

```jsx
<button data-user-id="42">
  Osama Abu Motlaq
</button>
```

You can access the value from a React event:

```jsx
function handleClick(event) {
  console.log(event.currentTarget.dataset.userId);
}
```

The browser still exposes the standard DOM `dataset` API.

---

# 51. React `data-*` Attributes

React allows custom data attributes using the standard HTML syntax:

```jsx
<div data-project-id="42">
  Project
</div>
```

The attribute appears in the resulting DOM as:

```html
<div data-project-id="42">
```

and the browser exposes:

```javascript
element.dataset.projectId;
```

---

# 52. React and `data-*` for DOM Metadata

A practical example:

```jsx
function ProjectButton() {
  function handleClick(event) {
    const projectId =
      event.currentTarget.dataset.projectId;

    console.log(projectId);
  }

  return (
    <button
      data-project-id="42"
      onClick={handleClick}
    >
      View Project
    </button>
  );
}
```

This can be useful when integrating React with DOM-oriented logic.

However, if the value is already naturally available as React data, you may not need to move it through the DOM.

For example:

```jsx
function ProjectButton({ projectId }) {
  function handleClick() {
    console.log(projectId);
  }

  return (
    <button onClick={handleClick}>
      View Project
    </button>
  );
}
```

In React, this is often simpler because the data remains in JavaScript rather than being stored and retrieved from the DOM.

---

# 53. React: When `dataset` Makes Sense

`dataset` can be useful when:

* Working with event delegation.
* Integrating a third-party DOM library.
* Interacting with non-React DOM code.
* You specifically need metadata on the rendered element.
* Building DOM-oriented components.

But for ordinary React component communication:

```text
props
state
context
```

are usually the primary mechanisms.

Do not introduce `dataset` merely because it exists.

---

# 54. Next.js Connection

Next.js uses React, so the same DOM rules apply.

`dataset` is available when code runs in the browser and has access to an actual DOM element.

For example, inside a Client Component event handler:

```jsx
function handleClick(event) {
  const projectId =
    event.currentTarget.dataset.projectId;

  console.log(projectId);
}
```

The important distinction is:

```text
Server-side code
→ no browser DOM element

Client-side browser code
→ DOM exists
→ dataset is available
```

---

# 55. Dataset Is Not a Database

Do not confuse:

```html
data-user-id="42"
```

with database storage.

The attribute exists in the browser DOM.

It does not persist data to:

* PostgreSQL.
* Supabase.
* MongoDB.
* MySQL.
* Any server database.

The correct architecture is:

```text
Database
 ↓
Server/API
 ↓
JavaScript application
 ↓
DOM
 ↓
data-* metadata
```

if the metadata is needed on the client.

---

# 56. Dataset and API Data

Suppose an API returns:

```javascript
const project = {
  id: 42,
  title: "JavaScript Reference"
};
```

You could render:

```html
<article data-project-id="42">
  JavaScript Reference
</article>
```

The database/API remains the source of the actual application data.

The DOM attribute is only a client-side representation useful for interaction.

---

# 57. Common Mistakes

## Mistake 1: Expecting Numbers

Avoid assuming:

```javascript
element.dataset.userId === 42;
```

because the dataset value is a string.

Use:

```javascript
Number(element.dataset.userId) === 42;
```

when numeric comparison is intended.

---

## Mistake 2: Expecting Boolean Conversion

This:

```javascript
Boolean(element.dataset.active);
```

does not correctly interpret:

```text
"false"
```

because any non-empty string is truthy.

For example:

```javascript
Boolean("false");
```

returns:

```javascript
true
```

Instead:

```javascript
const isActive =
  element.dataset.active === "true";
```

---

## Mistake 3: Using `data-*` Instead of Native HTML

Avoid:

```html
<button data-disabled="true">
```

when you actually need:

```html
<button disabled>
```

Native attributes provide native browser behavior.

---

## Mistake 4: Using Dataset for Large Data

Avoid putting an entire application object into:

```html
data-object="..."
```

Use dataset for small pieces of metadata.

---

## Mistake 5: Treating Dataset as Secure

Never trust:

```html
data-role="admin"
```

as proof of authorization.

Client-side DOM data can be changed.

---

## Mistake 6: Using Dataset When React Already Has the Data

In React:

```jsx
function ProjectButton({ projectId }) {
  return (
    <button onClick={() => console.log(projectId)}>
      Project
    </button>
  );
}
```

may be cleaner than:

```jsx
<button
  data-project-id={projectId}
  onClick={(event) =>
    console.log(event.currentTarget.dataset.projectId)
  }
>
  Project
</button>
```

The second is valid, but the first avoids unnecessary DOM indirection.

---

# 58. Best Practices

### 1. Use `data-*` for small custom metadata

Good:

```html
data-id="42"
data-action="delete"
data-tab="projects"
```

---

### 2. Remember that dataset values are strings

Convert explicitly when necessary:

```javascript
Number(value);
```

or:

```javascript
value === "true";
```

---

### 3. Prefer native HTML attributes when available

Use:

```html
disabled
required
name
value
type
```

when their native semantics match the requirement.

---

### 4. Do not use dataset as a security boundary

The client controls the DOM.

Server-side authorization remains mandatory.

---

### 5. Keep metadata small

Dataset should identify or describe an element, not become a storage system.

---

### 6. Use camelCase in JavaScript

HTML:

```html
data-project-id
```

JavaScript:

```javascript
element.dataset.projectId
```

---

### 7. Use dataset naturally with event delegation

A strong pattern is:

```javascript
container.addEventListener("click", (event) => {
  const element =
    event.target.closest("[data-id]");

  if (!element) {
    return;
  }

  const id = element.dataset.id;
});
```

---

# 59. Quick Reference

## Read

```javascript
element.dataset.userId;
```

HTML:

```html
data-user-id="42"
```

---

## Write

```javascript
element.dataset.userId = "42";
```

---

## Modify

```javascript
element.dataset.status = "active";
```

---

## Delete

```javascript
delete element.dataset.status;
```

---

## Check an attribute

```javascript
element.hasAttribute("data-user-id");
```

---

## Read using `getAttribute()`

```javascript
element.getAttribute("data-user-id");
```

---

## Write using `setAttribute()`

```javascript
element.setAttribute(
  "data-user-id",
  "42"
);
```

---

## Convert to number

```javascript
const id = Number(
  element.dataset.userId
);
```

---

## Convert to boolean

```javascript
const active =
  element.dataset.active === "true";
```

---

## Find by data attribute

```javascript
document.querySelector(
  '[data-user-id="42"]'
);
```

---

## Event delegation

```javascript
container.addEventListener("click", (event) => {
  const element =
    event.target.closest("[data-user-id]");

  if (!element) {
    return;
  }

  const userId = element.dataset.userId;

  console.log(userId);
});
```

---

# 60. `dataset` vs `classList`

These APIs solve different problems.

| API                 | Primary Purpose                 |
| ------------------- | ------------------------------- |
| `classList`         | Manage CSS classes and UI state |
| `dataset`           | Manage custom DOM metadata      |
| `getAttribute()`    | Read any HTML attribute         |
| `setAttribute()`    | Set any HTML attribute          |
| `removeAttribute()` | Remove any HTML attribute       |

Example:

```html
<button
  class="active"
  data-user-id="42"
>
  Osama Abu Motlaq
</button>
```

Use:

```javascript
button.classList.contains("active");
```

to ask:

```text
Is the button active?
```

Use:

```javascript
button.dataset.userId;
```

to ask:

```text
Which user does this button represent?
```

---

# 61. `dataset` vs `className`

`className`:

```javascript
element.className;
```

works with the entire `class` attribute.

`dataset`:

```javascript
element.dataset;
```

works with `data-*` attributes.

They have completely different purposes.

---

# 62. `dataset` vs JavaScript Objects

Compare:

```javascript
const user = {
  id: 42,
  name: "Osama Abu Motlaq"
};
```

with:

```html
<button data-user-id="42">
  Osama Abu Motlaq
</button>
```

The object is application data.

The `data-*` attribute is DOM metadata.

Do not automatically move all application data into the DOM.

Store data where it naturally belongs.

---

# 63. A Complete Practical Example

HTML:

```html
<div id="projects">
  <button
    class="project-button"
    data-project-id="101"
    data-action="open"
  >
    Project One
  </button>

  <button
    class="project-button"
    data-project-id="102"
    data-action="open"
  >
    Project Two
  </button>
</div>
```

JavaScript:

```javascript
const projects =
  document.querySelector("#projects");

projects.addEventListener("click", (event) => {
  const button =
    event.target.closest(".project-button");

  if (!button) {
    return;
  }

  const projectId =
    Number(button.dataset.projectId);

  const action =
    button.dataset.action;

  console.log({
    projectId,
    action
  });
});
```

When the first button is clicked:

```text
projectId → 101
action    → "open"
```

The important architecture is:

```text
HTML
 ↓
data-project-id
data-action
 ↓
dataset
 ↓
event handler
 ↓
application logic
```

---

# 64. Final Mental Model

Think of `data-*` and `dataset` as a bridge between HTML and JavaScript.

```text
HTML
data-user-id="42"
        ↓
DOM
        ↓
dataset.userId
        ↓
JavaScript
```

The conversion rule is:

```text
data-user-id
      ↓
dataset.userId
```

The most important property of dataset values is:

```text
They are strings.
```

Therefore:

```javascript
Number(element.dataset.userId);
```

may be necessary for numeric data.

And:

```javascript
element.dataset.active === "true";
```

may be necessary for boolean interpretation.

---

# 65. Final Takeaways

* `data-*` attributes provide a standard way to store custom metadata on HTML elements.
* JavaScript accesses them through the `dataset` property.
* `data-user-id` becomes `dataset.userId`.
* Hyphenated names are converted to camelCase.
* Dataset values are strings.
* Numbers must be explicitly converted when numeric behavior is required.
* Boolean values must be interpreted explicitly.
* You can create or modify attributes through `dataset`.
* You can remove a dataset property with `delete`.
* `dataset` and `getAttribute()` can access the same `data-*` information.
* `dataset` is especially useful with event handling and event delegation.
* `dataset` is useful for identifying buttons, tabs, cards, list items, and other interactive elements.
* `classList` and `dataset` have different responsibilities:

  * `classList` → UI/CSS state.
  * `dataset` → DOM metadata.
* Native HTML attributes should be preferred when they already provide the required semantics.
* `data-*` attributes are not an accessibility replacement for `aria-*`.
* `data-*` attributes are not a security mechanism.
* Dataset should contain small pieces of metadata rather than large application state.
* In React, `dataset` is available, but props and state are usually better when the data already exists inside the component.
* In Next.js, `dataset` belongs to browser-side DOM interaction and is not available as a normal server-side DOM API.
* Understanding `dataset` is valuable for DOM programming, event delegation, and understanding how metadata can move between HTML and JavaScript.

The core idea to remember:

```text
data-* attribute
       ↓
     dataset
       ↓
JavaScript metadata
```

While:

```text
class
  ↓
classList
  ↓
UI / CSS state
```

These two APIs complement each other without serving the same purpose.
