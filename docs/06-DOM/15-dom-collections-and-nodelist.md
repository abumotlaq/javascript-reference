# DOM Collections and NodeList

When JavaScript selects multiple elements from the DOM, the browser often returns a collection rather than a single element.

Two important DOM collection types are:

* `NodeList`
* `HTMLCollection`

Understanding these collections is important because they are **not always regular JavaScript arrays**.

For example:

```javascript
const buttons = document.querySelectorAll("button");
```

The result is a:

```text
NodeList
```

while:

```javascript
const items = document.getElementsByClassName("item");
```

returns an:

```text
HTMLCollection
```

These collections look similar, but they have important differences in:

* What they contain.
* Whether they are live or static.
* Which methods they provide.
* How they behave when the DOM changes.
* How they can be iterated.
* How they should be converted to arrays.

---

# 1. What Is a DOM Collection?

A DOM collection is an object that represents multiple nodes or elements.

For example:

```html
<ul>
  <li>About</li>
  <li>Projects</li>
  <li>Contact</li>
</ul>
```

If JavaScript selects all `<li>` elements:

```javascript
const items = document.querySelectorAll("li");
```

JavaScript does not receive a single `<li>`.

It receives a collection containing all matching nodes.

Conceptually:

```text
NodeList
 ├── <li>About</li>
 ├── <li>Projects</li>
 └── <li>Contact</li>
```

---

# 2. Why Collections Exist

The DOM can contain many matching elements.

For example:

```html
<button>Save</button>
<button>Cancel</button>
<button>Delete</button>
```

This:

```javascript
document.querySelector("button");
```

returns only the first matching element.

But:

```javascript
document.querySelectorAll("button");
```

returns all matching elements.

Therefore:

```text
querySelector()
        ↓
one Element

querySelectorAll()
        ↓
NodeList
```

---

# 3. What Is `NodeList`?

`NodeList` is a DOM collection type that represents a collection of nodes.

Example:

```javascript
const nodes = document.querySelectorAll("p");

console.log(nodes);
```

The result is a `NodeList`.

A `NodeList` can contain different kinds of nodes depending on how it was obtained.

Possible node types include:

* Elements.
* Text nodes.
* Comment nodes.
* Other DOM node types.

However, `querySelectorAll()` returns only matching elements.

---

# 4. `querySelectorAll()` Returns a NodeList

This is one of the most important facts:

```javascript
const elements =
  document.querySelectorAll(".card");
```

returns:

```text
NodeList
```

You can verify:

```javascript
console.log(elements instanceof NodeList);
```

Result:

```text
true
```

---

# 5. Accessing Items by Index

A `NodeList` supports numeric indexing.

```javascript
const buttons =
  document.querySelectorAll("button");

console.log(buttons[0]);
console.log(buttons[1]);
```

This works similarly to an array.

For example:

```text
buttons
 ├── [0] → first button
 ├── [1] → second button
 └── [2] → third button
```

But this similarity does **not** mean a `NodeList` is an array.

---

# 6. NodeList Is Not an Array

Consider:

```javascript
const buttons =
  document.querySelectorAll("button");

console.log(Array.isArray(buttons));
```

The result is:

```text
false
```

Therefore:

```javascript
buttons.map(...)
```

should not be assumed to work.

A `NodeList` is a DOM collection, not a normal JavaScript array.

---

# 7. The `length` Property

A `NodeList` has a `length` property.

```javascript
const buttons =
  document.querySelectorAll("button");

console.log(buttons.length);
```

If there are three buttons:

```text
3
```

You can use it like:

```javascript
for (let i = 0; i < buttons.length; i++) {
  console.log(buttons[i]);
}
```

---

# 8. `item()`

`NodeList` provides an `item()` method.

```javascript
const buttons =
  document.querySelectorAll("button");

const firstButton = buttons.item(0);
```

This is similar to:

```javascript
const firstButton = buttons[0];
```

In modern code, bracket notation is usually more convenient.

---

# 9. Iterating Over a NodeList

Modern `NodeList` objects are iterable.

You can use:

```javascript
const buttons =
  document.querySelectorAll("button");

for (const button of buttons) {
  console.log(button);
}
```

This is often one of the cleanest ways to iterate over a collection.

---

# 10. `forEach()` on NodeList

`NodeList` also provides `forEach()`.

```javascript
const buttons =
  document.querySelectorAll("button");

buttons.forEach((button) => {
  console.log(button.textContent);
});
```

This is extremely common in vanilla JavaScript.

---

# 11. Example: Add Event Listeners

HTML:

```html
<button>Save</button>
<button>Cancel</button>
<button>Delete</button>
```

JavaScript:

```javascript
const buttons =
  document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent);
  });
});
```

Each button receives its own event listener.

The flow is:

```text
querySelectorAll()
        ↓
NodeList
        ↓
forEach()
        ↓
each element
        ↓
addEventListener()
```

---

# 12. What Is `HTMLCollection`?

`HTMLCollection` is another DOM collection type.

It contains HTML elements.

For example:

```javascript
const items =
  document.getElementsByClassName("item");
```

returns an:

```text
HTMLCollection
```

You can verify:

```javascript
console.log(
  items instanceof HTMLCollection
);
```

Result:

```text
true
```

---

# 13. Common APIs That Return HTMLCollection

Several older DOM APIs return `HTMLCollection`.

Examples:

```javascript
document.getElementsByClassName("item");
```

and:

```javascript
document.getElementsByTagName("div");
```

Also:

```javascript
element.children;
```

returns an `HTMLCollection`.

---

# 14. `children` Returns HTMLCollection

Consider:

```html
<div id="container">
  <p>First</p>
  <p>Second</p>
</div>
```

JavaScript:

```javascript
const container =
  document.querySelector("#container");

console.log(container.children);
```

The result is:

```text
HTMLCollection
```

It contains the element children.

Important:

```javascript
container.children
```

does **not** include text nodes.

---

# 15. `childNodes` Returns NodeList

Compare:

```javascript
container.children;
```

with:

```javascript
container.childNodes;
```

`children` returns:

```text
HTMLCollection
```

`childNodes` returns:

```text
NodeList
```

The contents are also different.

---

# 16. `children` vs `childNodes`

Consider:

```html
<div>
  <p>First</p>
  <p>Second</p>
</div>
```

The DOM may contain:

```text
div
├── text node
├── p
├── text node
├── p
└── text node
```

Then:

```javascript
element.children;
```

contains:

```text
p
p
```

while:

```javascript
element.childNodes;
```

can contain:

```text
text
p
text
p
text
```

Whitespace in HTML can create text nodes.

---

# 17. Why This Difference Matters

Suppose you write:

```javascript
const children = element.children;
```

You know you are working with element children.

But:

```javascript
const nodes = element.childNodes;
```

means you may encounter:

* Elements.
* Text nodes.
* Comments.

Therefore, code such as:

```javascript
nodes.forEach((node) => {
  console.log(node.textContent);
});
```

can behave differently depending on the node type.

---

# 18. Static vs Live Collections

One of the most important differences is whether a collection automatically reflects later DOM changes.

There are two important concepts:

```text
Static collection
Live collection
```

A static collection represents the matching elements at the time the collection was created.

A live collection automatically reflects relevant changes to the DOM.

---

# 19. `querySelectorAll()` Returns a Static NodeList

Consider:

```javascript
const items =
  document.querySelectorAll(".item");
```

At this moment there are:

```text
3 items
```

Then:

```javascript
const newItem =
  document.createElement("div");

newItem.className = "item";

document.body.append(newItem);
```

The original `items` NodeList does not automatically gain the new element.

It remains a snapshot of the original matching elements.

To get the new result:

```javascript
const updatedItems =
  document.querySelectorAll(".item");
```

you perform the query again.

---

# 20. Static NodeList Mental Model

Think of:

```javascript
const items =
  document.querySelectorAll(".item");
```

as:

```text
DOM at time T1
      ↓
query
      ↓
NodeList snapshot
```

Later:

```text
DOM changes at T2
```

The old NodeList does not automatically update.

---

# 21. `getElementsByClassName()` Returns a Live HTMLCollection

Consider:

```javascript
const items =
  document.getElementsByClassName("item");
```

If a new element with class `item` is added:

```javascript
const newItem =
  document.createElement("div");

newItem.className = "item";

document.body.append(newItem);
```

the existing `items` collection can automatically reflect the change.

This is a live collection.

Conceptually:

```text
DOM
 ↓
HTMLCollection
 ↓
DOM changes
 ↓
collection updates
```

---

# 22. Live Collection Example

HTML:

```html
<div class="item">A</div>
<div class="item">B</div>
```

JavaScript:

```javascript
const items =
  document.getElementsByClassName("item");

console.log(items.length);
```

Result:

```text
2
```

Now:

```javascript
const newItem =
  document.createElement("div");

newItem.className = "item";

document.body.append(newItem);
```

Then:

```javascript
console.log(items.length);
```

can return:

```text
3
```

without querying again.

---

# 23. Why Live Collections Can Be Surprising

Consider:

```javascript
const items =
  document.getElementsByClassName("item");

for (let i = 0; i < items.length; i++) {
  items[i].classList.remove("item");
}
```

This can behave unexpectedly because the collection is live.

When the first element loses the class:

```text
.item
```

it may immediately disappear from the collection.

The collection changes while you are iterating over it.

---

# 24. Live Collection Mutation Problem

Suppose:

```text
Initial collection:

[ A, B, C, D ]
```

Remove the class from `A`.

The live collection becomes:

```text
[ B, C, D ]
```

The index positions shift.

Then the loop increments:

```text
i = 1
```

and now accesses:

```text
C
```

`B` may be skipped.

This is one reason live collections require care when modifying the DOM or the conditions that determine membership.

---

# 25. Safer Approach: Convert to an Array

You can create a static array snapshot:

```javascript
const items = [
  ...document.getElementsByClassName("item")
];
```

Now:

```text
HTMLCollection
     ↓
spread
     ↓
Array
```

The array does not automatically update when the DOM changes.

---

# 26. `Array.from()`

Another option:

```javascript
const items = Array.from(
  document.getElementsByClassName("item")
);
```

Now:

```javascript
Array.isArray(items);
```

returns:

```text
true
```

You can safely use array methods:

```javascript
items.map(...);
items.filter(...);
items.forEach(...);
items.find(...);
```

---

# 27. NodeList to Array

The same technique works with `NodeList`:

```javascript
const nodes =
  document.querySelectorAll(".item");

const array = [...nodes];
```

or:

```javascript
const array = Array.from(nodes);
```

Now you have a real array.

---

# 28. When Should You Convert to an Array?

Convert when you need array-specific operations.

For example:

```javascript
const buttons =
  document.querySelectorAll("button");

const buttonArray = [...buttons];

const names = buttonArray.map(
  (button) => button.textContent
);
```

Without conversion, you should not assume:

```javascript
buttons.map(...)
```

is available.

---

# 29. NodeList Supports `forEach()`

A common misconception is:

> "NodeList cannot be iterated."

That is incorrect for modern browsers.

This works:

```javascript
const items =
  document.querySelectorAll(".item");

items.forEach((item) => {
  console.log(item);
});
```

So you do not always need to convert a NodeList to an array.

---

# 30. Why Convert If `forEach()` Already Works?

Conversion is useful when you need methods that are not provided by the collection.

For example:

```javascript
const items =
  document.querySelectorAll(".item");
```

You can use:

```javascript
items.forEach(...);
```

But if you want:

```javascript
items.map(...);
```

you can convert:

```javascript
const array = [...items];

array.map(...);
```

The decision is:

```text
Need simple iteration?
→ forEach / for...of

Need array operations?
→ convert to Array
```

---

# 31. `for...of` Works With DOM Collections

You can use:

```javascript
const items =
  document.querySelectorAll(".item");

for (const item of items) {
  console.log(item);
}
```

This works because the collection is iterable.

The same style can be useful with:

```javascript
HTMLCollection
```

in modern environments.

---

# 32. `for` Loop

Traditional indexing also works:

```javascript
const items =
  document.querySelectorAll(".item");

for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

This can be useful when:

* You need the index.
* You need precise control.
* You are working with older code.
* You are modifying a collection carefully.

---

# 33. NodeList and `for...in`

Avoid using:

```javascript
for (const index in items) {
  console.log(items[index]);
}
```

for DOM collection iteration.

`for...in` is designed for enumerable property names, not for iterating collection values.

Prefer:

```javascript
for (const item of items) {
  console.log(item);
}
```

---

# 34. NodeList and `forEach()` vs `for...of`

Both are useful.

### `forEach()`

```javascript
items.forEach((item) => {
  console.log(item);
});
```

Good for simple iteration.

### `for...of`

```javascript
for (const item of items) {
  console.log(item);
}
```

Useful when you need:

```javascript
break;
continue;
```

For example:

```javascript
for (const item of items) {
  if (item.classList.contains("active")) {
    break;
  }

  console.log(item);
}
```

---

# 35. `break` With `forEach()`

You cannot use:

```javascript
items.forEach((item) => {
  if (condition) {
    break;
  }
});
```

`break` does not work this way inside `forEach()`.

If you need to stop iteration early, use:

```javascript
for (const item of items) {
  if (condition) {
    break;
  }
}
```

---

# 36. `NodeList` Can Contain Different Node Types

This is particularly important with:

```javascript
element.childNodes;
```

For example:

```javascript
const nodes = element.childNodes;

nodes.forEach((node) => {
  console.log(node.nodeType);
});
```

Possible values include:

```text
1 → Element
3 → Text
8 → Comment
```

Therefore, do not automatically assume every `NodeList` item is an `HTMLElement`.

---

# 37. Checking Node Type

You can check:

```javascript
if (node.nodeType === Node.ELEMENT_NODE) {
  // Element
}
```

This is useful when working directly with low-level DOM traversal.

---

# 38. `NodeListOf<Element>` in TypeScript

Although this repository focuses on JavaScript, you may encounter this concept when using TypeScript.

For:

```javascript
document.querySelectorAll(".card");
```

TypeScript can represent the result with a more specific collection type such as:

```text
NodeListOf<Element>
```

This provides type information about the elements.

The underlying browser concept remains a `NodeList`.

---

# 39. `HTMLCollection` Contains Elements

Unlike a general `NodeList`, `HTMLCollection` is specifically designed around HTML elements.

For example:

```javascript
const elements =
  document.getElementsByClassName("card");
```

Each item is an element.

This makes:

```javascript
elements[0].classList.add("active");
```

natural.

---

# 40. Named Access on HTMLCollection

Some `HTMLCollection` objects can provide named access based on element `id` or `name`.

For example:

```html
<div id="profile"></div>
```

Depending on the collection and browser behavior, named access may be possible.

However, do not build modern application logic around this behavior.

Prefer explicit access:

```javascript
document.querySelector("#profile");
```

or:

```javascript
collection[0];
```

when appropriate.

Explicit code is easier to understand and maintain.

---

# 41. Common DOM APIs and Their Return Types

| API                        | Typical Return Type |
| -------------------------- | ------------------- |
| `querySelector()`          | `Element` or `null` |
| `querySelectorAll()`       | `NodeList`          |
| `getElementsByClassName()` | `HTMLCollection`    |
| `getElementsByTagName()`   | `HTMLCollection`    |
| `children`                 | `HTMLCollection`    |
| `childNodes`               | `NodeList`          |
| `parentElement`            | `Element` or `null` |
| `firstElementChild`        | `Element` or `null` |
| `firstChild`               | `Node` or `null`    |

This table is worth remembering because it prevents many DOM mistakes.

---

# 42. The Important `querySelectorAll()` Rule

A very useful rule:

```javascript
document.querySelectorAll()
```

returns a **static `NodeList`**.

For example:

```javascript
const cards =
  document.querySelectorAll(".card");
```

The collection does not automatically update when matching elements are later added or removed.

Query again if you need a new snapshot:

```javascript
const cards =
  document.querySelectorAll(".card");
```

---

# 43. The Important `getElements...()` Rule

The traditional methods:

```javascript
getElementsByClassName()
getElementsByTagName()
```

return live `HTMLCollection` objects.

This means the collection can change automatically when the DOM changes.

Mental model:

```text
querySelectorAll()
→ static NodeList

getElementsByClassName()
→ live HTMLCollection

getElementsByTagName()
→ live HTMLCollection
```

---

# 44. Not Every NodeList Is Static

Be careful with this statement:

> "NodeList is always static."

That is not correct.

`NodeList` can represent either static or live collections depending on the API that produced it.

For example:

```javascript
querySelectorAll()
```

returns a static `NodeList`.

But:

```javascript
element.childNodes
```

is a live `NodeList`.

Therefore, the better rule is:

> The API determines whether the returned collection is live or static.

---

# 45. `childNodes` Can Be Live

Consider:

```javascript
const nodes =
  element.childNodes;
```

This is a live `NodeList`.

If child nodes are added or removed, the collection can reflect those changes.

This differs from:

```javascript
const nodes =
  element.querySelectorAll("*");
```

which produces a static `NodeList`.

---

# 46. Static vs Live: The Real Mental Model

Do not memorize:

```text
NodeList = static
HTMLCollection = live
```

as an absolute rule.

Instead remember:

```text
Collection type
       +
API that created it
       ↓
determines behavior
```

Examples:

```text
querySelectorAll()
→ NodeList
→ static

childNodes
→ NodeList
→ live

getElementsByClassName()
→ HTMLCollection
→ live

children
→ HTMLCollection
→ live
```

---

# 47. Collection Mutation

When working with live collections, modifying the DOM can change the collection immediately.

This can make code difficult to reason about.

For example:

```javascript
const items =
  document.getElementsByClassName("item");

while (items.length > 0) {
  items[0].remove();
}
```

This works because each removal updates the live collection.

After removing the first item:

```text
[A, B, C]
```

becomes:

```text
[B, C]
```

Then:

```javascript
items[0]
```

points to `B`.

This pattern intentionally uses the live behavior.

---

# 48. Static Snapshot Alternative

If you do not want the collection to change while modifying the DOM:

```javascript
const items = [
  ...document.getElementsByClassName("item")
];
```

Now:

```text
HTMLCollection
      ↓
Array snapshot
```

The array remains unchanged even if the DOM changes.

---

# 49. Collection vs Array

A useful comparison:

| Feature                |                 NodeList |             HTMLCollection |        Array |
| ---------------------- | -----------------------: | -------------------------: | -----------: |
| Numeric indexing       |                      Yes |                        Yes |          Yes |
| `length`               |                      Yes |                        Yes |          Yes |
| `for...of`             |                      Yes | Yes in modern environments |          Yes |
| `forEach()`            |                      Yes |              Not generally |          Yes |
| `map()`                |                       No |                         No |          Yes |
| `filter()`             |                       No |                         No |          Yes |
| `find()`               |                       No |                         No |          Yes |
| `push()`               |                       No |                         No |          Yes |
| `pop()`                |                       No |                         No |          Yes |
| Can contain text nodes | Yes, depending on source |                         No | Any JS value |
| Can be live            |      Depending on source |                        Yes |           No |

The key difference is:

```text
DOM collection ≠ Array
```

---

# 50. Converting Collections to Arrays

Two common approaches:

### Spread syntax

```javascript
const items = [...collection];
```

### `Array.from()`

```javascript
const items = Array.from(collection);
```

Both create a real array.

---

# 51. Spread vs `Array.from()`

For simple conversion:

```javascript
const items = [...collection];
```

is concise.

`Array.from()` can be more expressive:

```javascript
const items = Array.from(collection);
```

It can also map during conversion:

```javascript
const names = Array.from(
  collection,
  (item) => item.textContent
);
```

This avoids creating an intermediate array before mapping.

---

# 52. Example: Extract Text

HTML:

```html
<p>About</p>
<p>Projects</p>
<p>Contact</p>
```

JavaScript:

```javascript
const paragraphs =
  document.querySelectorAll("p");

const texts = Array.from(
  paragraphs,
  (paragraph) => paragraph.textContent
);

console.log(texts);
```

Result:

```javascript
[
  "About",
  "Projects",
  "Contact"
]
```

---

# 53. NodeList and Array Methods

If you need:

```javascript
map()
filter()
find()
some()
every()
reduce()
```

convert the collection:

```javascript
const buttons =
  document.querySelectorAll("button");

const enabledButtons =
  [...buttons].filter(
    (button) => !button.disabled
  );
```

This gives you the full Array API.

---

# 54. Do You Always Need to Convert?

No.

This is unnecessary:

```javascript
const buttons =
  document.querySelectorAll("button");

const array = [...buttons];

array.forEach((button) => {
  console.log(button);
});
```

You can simply do:

```javascript
buttons.forEach((button) => {
  console.log(button);
});
```

Convert only when the Array API or a stable snapshot is actually useful.

---

# 55. NodeList and `querySelectorAll()`

A very common pattern:

```javascript
const cards =
  document.querySelectorAll(".card");

cards.forEach((card) => {
  card.classList.add("visible");
});
```

This is one of the most common ways to manipulate multiple DOM elements.

---

# 56. Collection Scope

DOM collection methods can be called on an element, not only on `document`.

For example:

```javascript
const container =
  document.querySelector("#container");

const buttons =
  container.querySelectorAll("button");
```

Only buttons inside the container are selected.

This is often better than querying the entire document when the operation belongs to a specific component or region.

---

# 57. Example: Component-Scoped Selection

HTML:

```html
<section id="projects">
  <button>Project One</button>
  <button>Project Two</button>
</section>

<section id="about">
  <button>About</button>
</section>
```

JavaScript:

```javascript
const projects =
  document.querySelector("#projects");

const buttons =
  projects.querySelectorAll("button");
```

Only the project buttons are returned.

---

# 58. Empty Collections

If `querySelectorAll()` finds nothing:

```javascript
const items =
  document.querySelectorAll(".missing");
```

you receive an empty `NodeList`.

Its length is:

```javascript
items.length;
```

which returns:

```text
0
```

It does not return `null`.

This is an important distinction.

---

# 59. `querySelector()` vs `querySelectorAll()`

Compare:

```javascript
const item =
  document.querySelector(".item");
```

with:

```javascript
const items =
  document.querySelectorAll(".item");
```

If there are no matches:

```javascript
querySelector()
→ null
```

while:

```javascript
querySelectorAll()
→ empty NodeList
```

Mental model:

```text
querySelector
→ one or null

querySelectorAll
→ collection, possibly empty
```

---

# 60. Common Mistake: Treating NodeList as One Element

This is wrong:

```javascript
const buttons =
  document.querySelectorAll("button");

buttons.addEventListener("click", handler);
```

`buttons` is a collection, not a single button.

You need:

```javascript
buttons.forEach((button) => {
  button.addEventListener("click", handler);
});
```

---

# 61. Common Mistake: Using `.map()` Directly

This is not generally valid:

```javascript
const buttons =
  document.querySelectorAll("button");

buttons.map(...);
```

Use:

```javascript
const buttons =
  [...document.querySelectorAll("button")];

buttons.map(...);
```

or:

```javascript
const buttons =
  Array.from(
    document.querySelectorAll("button")
  );

buttons.map(...);
```

---

# 62. Common Mistake: Assuming All Collections Are Live

Do not assume:

```javascript
const items =
  document.querySelectorAll(".item");
```

will automatically update after:

```javascript
element.remove();
```

It will not.

The NodeList is static.

Query again if you need the current matching set.

---

# 63. Common Mistake: Assuming All NodeLists Are Static

This is also incorrect:

```text
NodeList = static
```

For example:

```javascript
element.childNodes;
```

returns a live `NodeList`.

Always consider the API that created the collection.

---

# 64. Common Mistake: Modifying a Live Collection While Iterating

This can cause elements to be skipped:

```javascript
const items =
  document.getElementsByClassName("item");

for (let i = 0; i < items.length; i++) {
  items[i].remove();
}
```

Because the collection changes after each removal.

Safer options include:

```javascript
const items = [
  ...document.getElementsByClassName("item")
];

items.forEach((item) => {
  item.remove();
});
```

Or intentionally consume the live collection:

```javascript
while (items.length > 0) {
  items[0].remove();
}
```

---

# 65. Common Mistake: Using `for...in`

Avoid:

```javascript
for (const key in collection) {
  console.log(collection[key]);
}
```

Prefer:

```javascript
for (const item of collection) {
  console.log(item);
}
```

`for...of` iterates values.

`for...in` iterates property keys.

---

# 66. React Connection

Understanding DOM collections is useful when learning React because React ultimately renders to the DOM.

In vanilla JavaScript:

```javascript
const buttons =
  document.querySelectorAll("button");

buttons.forEach((button) => {
  button.classList.add("active");
});
```

You manually select and manipulate DOM elements.

In React, you normally do not search for every element manually.

Instead:

```jsx
function Navigation({ isActive }) {
  return (
    <button className={isActive ? "active" : ""}>
      Projects
    </button>
  );
}
```

React manages the DOM based on state and props.

---

# 67. DOM Collections vs React Rendering

Vanilla JavaScript:

```text
DOM
 ↓
querySelectorAll()
 ↓
NodeList
 ↓
manually manipulate elements
```

React:

```text
State / Props
 ↓
JSX
 ↓
React reconciliation
 ↓
DOM
```

This is one reason React can feel different from traditional DOM programming.

---

# 68. Why You Still Need to Learn This

Even when using React, understanding collections helps you understand:

* The browser DOM.
* `querySelectorAll()`.
* Event delegation.
* DOM traversal.
* Browser APIs.
* Third-party DOM libraries.
* `ref`-based imperative code.
* Why React discourages unnecessary direct DOM manipulation.

It also helps you understand what React is abstracting away.

---

# 69. React Refs and Collections

React can give you access to DOM elements through refs.

For example:

```jsx
const buttonRef = useRef(null);
```

Then:

```jsx
<button ref={buttonRef}>
  Projects
</button>
```

The ref points to the actual DOM element.

For multiple elements, React patterns are different from simply doing:

```javascript
document.querySelectorAll();
```

You generally should not query the DOM to reconstruct data that already exists in React state or props.

---

# 70. Next.js Connection

Next.js uses React and therefore follows the same principle.

Server-rendered or Server Component code does not normally have access to the browser's DOM.

Browser DOM collections are relevant when code runs on the client.

For example, a Client Component can interact with browser APIs when appropriate.

The mental model is:

```text
Server
→ no browser DOM

Client
→ browser DOM available
→ NodeList / HTMLCollection available
```

---

# 71. DOM Collections and Event Delegation

Collections are often used before switching to event delegation.

For example:

```javascript
const buttons =
  document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", handler);
});
```

This attaches a listener to every button.

With event delegation:

```javascript
container.addEventListener("click", (event) => {
  const button =
    event.target.closest(".button");

  if (!button) {
    return;
  }

  handler(button);
});
```

you can often avoid managing a listener for every individual item.

Understanding collections helps you see both approaches.

---

# 72. Practical Example

HTML:

```html
<ul id="projects">
  <li class="project" data-id="101">
    Project One
  </li>

  <li class="project" data-id="102">
    Project Two
  </li>

  <li class="project" data-id="103">
    Project Three
  </li>
</ul>
```

JavaScript:

```javascript
const projects =
  document.querySelectorAll(".project");

projects.forEach((project) => {
  const id = Number(project.dataset.id);

  console.log({
    id,
    name: project.textContent.trim()
  });
});
```

The flow combines several DOM concepts:

```text
querySelectorAll()
      ↓
NodeList
      ↓
forEach()
      ↓
Element
      ↓
dataset
      ↓
application data
```

---

# 73. Practical Example: Convert to Array

```javascript
const projects =
  document.querySelectorAll(".project");

const projectNames = [...projects]
  .map((project) => project.textContent.trim())
  .filter(Boolean);

console.log(projectNames);
```

The conversion:

```javascript
[...projects]
```

creates a real array.

Then:

```javascript
map()
filter()
```

are available.

---

# 74. Practical Example: Live Collection

HTML:

```html
<div class="item">One</div>
<div class="item">Two</div>
```

JavaScript:

```javascript
const items =
  document.getElementsByClassName("item");

console.log(items.length);
```

Output:

```text
2
```

Add an item:

```javascript
const newItem =
  document.createElement("div");

newItem.className = "item";
newItem.textContent = "Three";

document.body.append(newItem);
```

Now:

```javascript
console.log(items.length);
```

can return:

```text
3
```

because `items` is live.

---

# 75. Practical Example: Static Collection

```javascript
const items =
  document.querySelectorAll(".item");

console.log(items.length);
```

Add:

```javascript
const newItem =
  document.createElement("div");

newItem.className = "item";

document.body.append(newItem);
```

The original:

```javascript
items.length;
```

does not automatically increase.

Query again:

```javascript
const updatedItems =
  document.querySelectorAll(".item");
```

to obtain the current snapshot.

---

# 76. A Strong Mental Model

Think about DOM collections in three dimensions.

### 1. What does it contain?

```text
NodeList
→ nodes

HTMLCollection
→ elements
```

### 2. Is it live?

```text
Static
→ snapshot

Live
→ reflects DOM changes
```

### 3. Is it an array?

```text
NodeList
→ No

HTMLCollection
→ No

Array
→ Yes
```

This model is more useful than memorizing isolated API facts.

---

# 77. Quick Reference

## Select all matching elements

```javascript
const elements =
  document.querySelectorAll(".item");
```

Returns:

```text
NodeList
```

---

## Get elements by class

```javascript
const elements =
  document.getElementsByClassName("item");
```

Returns:

```text
HTMLCollection
```

and is live.

---

## Get elements by tag

```javascript
const elements =
  document.getElementsByTagName("div");
```

Returns:

```text
HTMLCollection
```

and is live.

---

## Element children

```javascript
const children =
  element.children;
```

Returns:

```text
HTMLCollection
```

---

## All child nodes

```javascript
const nodes =
  element.childNodes;
```

Returns:

```text
NodeList
```

and is live.

---

## Iterate

```javascript
elements.forEach((element) => {
  console.log(element);
});
```

---

## Iterate with `for...of`

```javascript
for (const element of elements) {
  console.log(element);
}
```

---

## Convert to Array

```javascript
const array = [...elements];
```

or:

```javascript
const array = Array.from(elements);
```

---

## Use array methods

```javascript
const result = [...elements]
  .filter(...)
  .map(...);
```

---

# 78. Comparison Table

| Concept          | `NodeList`           | `HTMLCollection`           | `Array`              |
| ---------------- | -------------------- | -------------------------- | -------------------- |
| DOM collection   | Yes                  | Yes                        | No                   |
| Contains nodes   | Yes                  | Elements only              | Any values           |
| Numeric indexing | Yes                  | Yes                        | Yes                  |
| `length`         | Yes                  | Yes                        | Yes                  |
| `for...of`       | Yes                  | Yes in modern environments | Yes                  |
| `forEach()`      | Yes                  | Not generally              | Yes                  |
| `map()`          | No                   | No                         | Yes                  |
| `filter()`       | No                   | No                         | Yes                  |
| `find()`         | No                   | No                         | Yes                  |
| `push()`         | No                   | No                         | Yes                  |
| Static or live   | Depends on API       | Usually live               | Static               |
| Common source    | `querySelectorAll()` | `getElementsByClassName()` | `[]`, `Array.from()` |

---

# 79. Common Return-Type Cheat Sheet

```text
querySelector()
→ Element | null

querySelectorAll()
→ static NodeList

getElementsByClassName()
→ live HTMLCollection

getElementsByTagName()
→ live HTMLCollection

children
→ live HTMLCollection

childNodes
→ live NodeList

firstElementChild
→ Element | null

firstChild
→ Node | null
```

---

# 80. Final Takeaways

* A DOM collection represents multiple DOM nodes or elements.
* `NodeList` and `HTMLCollection` are DOM collection types.
* Neither one is a normal JavaScript array.
* `querySelectorAll()` returns a static `NodeList`.
* `childNodes` returns a live `NodeList`.
* `getElementsByClassName()` returns a live `HTMLCollection`.
* `getElementsByTagName()` returns a live `HTMLCollection`.
* `children` returns a live `HTMLCollection`.
* `NodeList` can contain different node types depending on the API that created it.
* `HTMLCollection` contains HTML elements.
* Both support numeric indexing and `length`.
* Modern `NodeList` objects support `forEach()`.
* DOM collections can be iterated with `for...of` in modern environments.
* DOM collections are not arrays.
* Convert a collection with:

  * `[...collection]`
  * `Array.from(collection)`
* Convert only when you actually need Array-specific methods or a stable snapshot.
* Do not use `for...in` for normal collection iteration.
* Be careful when modifying the DOM while iterating over live collections.
* Do not memorize "NodeList = static" as an absolute rule.
* The API that creates the collection determines whether it is live or static.
* `querySelector()` returns one element or `null`.
* `querySelectorAll()` returns a collection, even when no elements match.
* Understanding DOM collections is important for vanilla JavaScript and useful for understanding what React abstracts away.
* In React, ordinary UI rendering should normally be driven by state and props rather than manually querying and manipulating collections.
* In Next.js, browser DOM collections are relevant to client-side code, not normal server-side rendering logic.

The most important mental model is:

```text
DOM API
   ↓
Collection
   ↓
What does it contain?
   ↓
Is it live or static?
   ↓
Does it provide the method you need?
   ↓
Convert to Array only when necessary
```

And remember:

```text
NodeList ≠ Array

HTMLCollection ≠ Array
```

They are DOM-specific collection objects with their own behavior.
