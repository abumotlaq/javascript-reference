# DOM Traversing Elements

**DOM traversal** means navigating from one DOM node or element to another using their relationships in the DOM tree.

After selecting an element, you often need to find:

* Its parent
* Its children
* Its first child
* Its last child
* Its next sibling
* Its previous sibling
* Other elements inside it
* Ancestors higher in the tree

For example:

```html
<div class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

You might select the `<h2>` and then navigate to its parent `<div>` or its sibling `<p>`.

The DOM provides several properties and methods for this purpose.

---

# 1. Why DOM Traversal Matters

Suppose you have:

```html
<article class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
    <button>View Project</button>
</article>
```

You can select the button:

```javascript
const button = document.querySelector("button");
```

But perhaps you need the entire project card containing that button.

Instead of searching the whole document again, you can navigate upward:

```javascript
const project = button.parentElement;
```

The process becomes:

```text
button
  ↑
parentElement
  ↑
article.project
```

This is the basic idea behind DOM traversal.

---

# 2. The DOM Tree

Consider:

```html
<body>
    <main>
        <section class="projects">
            <article class="project">
                <h2>Osama Abu Motlaq</h2>
                <p>Frontend Developer</p>
            </article>
        </section>
    </main>
</body>
```

Conceptually:

```text
document
   │
   └── html
       │
       └── body
           │
           └── main
               │
               └── section.projects
                   │
                   └── article.project
                       │
                       ├── h2
                       │    └── "Osama Abu Motlaq"
                       │
                       └── p
                            └── "Frontend Developer"
```

Every node has relationships with other nodes.

Traversal means using those relationships.

---

# 3. Parent

A parent is the node directly containing another node.

For:

```html
<article>
    <h2>Osama Abu Motlaq</h2>
</article>
```

`article` is the parent of `h2`.

You can access it with:

```javascript
const heading = document.querySelector("h2");

console.log(heading.parentElement);
```

Result:

```html
<article>
    <h2>Osama Abu Motlaq</h2>
</article>
```

---

# 4. `parentElement`

`parentElement` returns the parent **element**.

Example:

```javascript
const heading = document.querySelector("h2");

const parent = heading.parentElement;

console.log(parent);
```

If the structure is:

```text
article
 └── h2
```

then:

```text
heading.parentElement
        ↓
article
```

If the parent is not an element, `parentElement` can return `null`.

---

# 5. `parentNode`

`parentNode` returns the parent **node**.

Example:

```javascript
const heading = document.querySelector("h2");

console.log(heading.parentNode);
```

For most normal HTML elements, this will appear similar to:

```javascript
heading.parentElement
```

because their parent is usually another element.

However, `parentNode` is more general because it works with DOM node types, not only element parents.

---

# 6. `parentElement` vs `parentNode`

This distinction is important.

```text
parentElement
    ↓
Returns an Element or null

parentNode
    ↓
Returns a Node or null
```

Example:

```javascript
const heading = document.querySelector("h2");

console.log(heading.parentElement);
console.log(heading.parentNode);
```

For a normal `<h2>` inside an `<article>`, both will reference the `<article>`.

But conceptually they answer slightly different questions:

```text
parentElement
→ What element contains me?

parentNode
→ What DOM node contains me?
```

For ordinary element traversal, `parentElement` is often the clearer choice when you specifically need an element.

---

# 7. Children

An element can contain other elements.

Example:

```html
<div class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
    <button>View Project</button>
</div>
```

The children are:

```text
div.project
├── h2
├── p
└── button
```

You can access element children using:

```javascript
const project = document.querySelector(".project");

console.log(project.children);
```

---

# 8. `children`

`children` returns an `HTMLCollection` containing the element's **element children**.

Example:

```javascript
const project = document.querySelector(".project");

console.log(project.children.length);
```

For:

```html
<div class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
    <button>View Project</button>
</div>
```

the result is:

```text
3
```

The collection contains:

```text
0 → h2
1 → p
2 → button
```

---

# 9. `firstElementChild`

You can access the first child element:

```javascript
const project = document.querySelector(".project");

console.log(project.firstElementChild);
```

Given:

```html
<div class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

the result is:

```html
<h2>Osama Abu Motlaq</h2>
```

---

# 10. `lastElementChild`

Similarly:

```javascript
const project = document.querySelector(".project");

console.log(project.lastElementChild);
```

returns:

```html
<p>Frontend Developer</p>
```

Conceptually:

```text
project
├── h2 ← firstElementChild
└── p  ← lastElementChild
```

---

# 11. `childNodes`

`childNodes` returns all child nodes, not only element children.

Example:

```html
<div>
    <h2>Osama Abu Motlaq</h2>
</div>
```

The DOM can conceptually contain:

```text
div
├── Text Node
├── h2
│   └── Text Node
└── Text Node
```

The whitespace around `<h2>` can produce text nodes.

Therefore:

```javascript
const div = document.querySelector("div");

console.log(div.childNodes);
```

can contain more nodes than:

```javascript
div.children
```

---

# 12. `children` vs `childNodes`

This is one of the most important DOM traversal distinctions.

### `children`

Returns element children only.

```javascript
element.children
```

### `childNodes`

Returns all child nodes.

```javascript
element.childNodes
```

Conceptually:

```text
HTML:
<div>
    <h2>Hello</h2>
</div>
```

Possible DOM structure:

```text
div
├── Text Node      ← whitespace
├── h2             ← Element
│   └── Text Node
└── Text Node      ← whitespace
```

Therefore:

```text
children
→ h2

childNodes
→ whitespace
→ h2
→ whitespace
```

When you want only HTML elements, `children` is usually the appropriate choice.

---

# 13. `firstChild` vs `firstElementChild`

These properties are also different.

```javascript
element.firstChild
```

returns the first child node.

While:

```javascript
element.firstElementChild
```

returns the first child element.

Example:

```html
<div>
    <h2>Osama Abu Motlaq</h2>
</div>
```

The first child node may be a text node containing whitespace.

Therefore:

```javascript
div.firstChild
```

and:

```javascript
div.firstElementChild
```

may return different nodes.

---

# 14. `lastChild` vs `lastElementChild`

The same distinction exists for the last child.

```javascript
element.lastChild
```

returns the last child node.

```javascript
element.lastElementChild
```

returns the last child element.

Whitespace can therefore make:

```javascript
lastChild
```

different from:

```javascript
lastElementChild
```

---

# 15. Siblings

Siblings are nodes that share the same parent.

Example:

```html
<div>
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
    <button>View Project</button>
</div>
```

The structure is:

```text
div
├── h2
├── p
└── button
```

The `<h2>`, `<p>`, and `<button>` are siblings.

---

# 16. `nextElementSibling`

You can move from one element to the next sibling element.

Example:

```javascript
const heading = document.querySelector("h2");

console.log(heading.nextElementSibling);
```

Result:

```html
<p>Frontend Developer</p>
```

The relationship is:

```text
h2
 ↓
nextElementSibling
 ↓
p
```

---

# 17. `previousElementSibling`

You can also move backward:

```javascript
const paragraph = document.querySelector("p");

console.log(paragraph.previousElementSibling);
```

Result:

```html
<h2>Osama Abu Motlaq</h2>
```

The relationship is:

```text
p
 ↑
previousElementSibling
 ↑
h2
```

---

# 18. `nextSibling` vs `nextElementSibling`

Just like `childNodes` and `children`, there is a difference between node-based and element-based traversal.

```javascript
element.nextSibling
```

returns the next node.

```javascript
element.nextElementSibling
```

returns the next element.

Whitespace can therefore affect `nextSibling`.

For example:

```html
<h2>Osama Abu Motlaq</h2>
<p>Frontend Developer</p>
```

There may be a whitespace text node between them.

Therefore:

```javascript
heading.nextSibling
```

could refer to a text node.

While:

```javascript
heading.nextElementSibling
```

returns the `<p>` element.

For normal element-to-element traversal, `nextElementSibling` is usually easier to reason about.

---

# 19. `previousSibling` vs `previousElementSibling`

The same principle applies when moving backward.

```javascript
element.previousSibling
```

returns the previous node.

```javascript
element.previousElementSibling
```

returns the previous element.

If whitespace exists between elements, `previousSibling` may return a text node.

---

# 20. Traversing Upward

Suppose:

```html
<section class="projects">
    <article class="project">
        <h2>Osama Abu Motlaq</h2>
    </article>
</section>
```

Start with:

```javascript
const heading = document.querySelector("h2");
```

Move upward:

```javascript
const article = heading.parentElement;
```

Then:

```javascript
const section = article.parentElement;
```

Then:

```javascript
const main = section.parentElement;
```

Conceptually:

```text
h2
 ↑
article
 ↑
section
 ↑
main
```

This is upward traversal.

---

# 21. Traversing Downward

Suppose:

```html
<article class="project">
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</article>
```

Start with:

```javascript
const article = document.querySelector(".project");
```

Then:

```javascript
console.log(article.children);
```

You can access:

```javascript
article.firstElementChild;
article.lastElementChild;
```

Conceptually:

```text
article
├── h2
└── p
```

This is downward traversal.

---

# 22. Traversing Sideways

Sideways traversal means moving between siblings.

```javascript
const heading = document.querySelector("h2");

const paragraph = heading.nextElementSibling;
```

Or:

```javascript
const paragraph = document.querySelector("p");

const heading = paragraph.previousElementSibling;
```

Conceptually:

```text
h2 ─────→ p ─────→ button
   next       next

h2 ←───── p ←───── button
 previous    previous
```

---

# 23. `closest()`

`closest()` is one of the most useful traversal methods.

It searches upward from an element and returns the nearest ancestor that matches a CSS selector.

Example:

```html
<article class="project">
    <h2>Osama Abu Motlaq</h2>
    <button>View Project</button>
</article>
```

JavaScript:

```javascript
const button = document.querySelector("button");

const project = button.closest(".project");

console.log(project);
```

The result is the nearest `.project` ancestor.

Conceptually:

```text
button
  ↑
article.project
```

---

# 24. Why `closest()` Is Useful

Without `closest()` you might write:

```javascript
const button = document.querySelector("button");

const article = button.parentElement;
```

But this assumes the button is a direct child.

If the structure changes:

```html
<article class="project">
    <div class="actions">
        <button>View Project</button>
    </div>
</article>
```

then:

```javascript
button.parentElement
```

returns:

```html
<div class="actions">
```

not the project article.

But:

```javascript
button.closest(".project");
```

still finds:

```html
<article class="project">
```

This makes `closest()` useful when the exact nesting level is not important.

---

# 25. `matches()`

`matches()` checks whether an element matches a CSS selector.

Example:

```javascript
const button = document.querySelector("button");

console.log(button.matches(".primary"));
```

If the button has:

```html
<button class="primary">Save</button>
```

the result is:

```text
true
```

Otherwise:

```text
false
```

This is particularly useful when combined with event delegation.

---

# 26. `contains()`

`contains()` checks whether one node contains another node.

Example:

```html
<section class="projects">
    <article class="project">
        <h2>Osama Abu Motlaq</h2>
    </article>
</section>
```

JavaScript:

```javascript
const section = document.querySelector(".projects");
const heading = document.querySelector("h2");

console.log(section.contains(heading));
```

Result:

```text
true
```

Because the `<h2>` is a descendant of the section.

---

# 27. `contains()` and Direct Children

`contains()` does not mean "is my direct child."

It means the node is contained somewhere below the current node.

Example:

```text
section
└── article
    └── h2
```

Then:

```javascript
section.contains(h2);
```

returns:

```text
true
```

even though `h2` is not a direct child of `section`.

This distinction is important.

---

# 28. `children` and `querySelectorAll()`

Suppose:

```html
<div class="project">
    <h2>Osama Abu Motlaq</h2>

    <div class="details">
        <p>Frontend Developer</p>
    </div>
</div>
```

Then:

```javascript
const project = document.querySelector(".project");
```

### Direct element children

```javascript
project.children;
```

returns:

```text
h2
div.details
```

### All matching descendants

```javascript
project.querySelectorAll("p");
```

returns:

```text
p
```

The key difference:

```text
children
→ direct element children only

querySelectorAll()
→ matching descendants at any depth
```

---

# 29. Traversal vs Selection

Selection:

```javascript
document.querySelector(".project");
```

means:

> Search the document for an element matching this selector.

Traversal:

```javascript
project.parentElement;
```

means:

> Start from this element and move through an existing DOM relationship.

This distinction helps you decide which operation makes your code clearer.

---

# 30. A Complete Traversal Example

HTML:

```html
<section class="projects">
    <article class="project">
        <h2>Osama Abu Motlaq</h2>
        <p>Frontend Developer</p>

        <div class="actions">
            <button>View Project</button>
        </div>
    </article>
</section>
```

JavaScript:

```javascript
const button = document.querySelector("button");

const actions = button.parentElement;

const project = button.closest(".project");

const heading = project.firstElementChild;

const paragraph = heading.nextElementSibling;

console.log(actions);
console.log(project);
console.log(heading);
console.log(paragraph);
```

The traversal looks like:

```text
button
  │
  ├── parentElement
  │      ↓
  │   .actions
  │
  └── closest(".project")
         ↓
      article.project
         │
         └── firstElementChild
                ↓
               h2
                │
                └── nextElementSibling
                       ↓
                       p
```

This demonstrates how traversal APIs can be combined.

---

# 31. Traversing Through Lists

HTML:

```html
<ul class="projects">
    <li>Project One</li>
    <li>Project Two</li>
    <li>Project Three</li>
</ul>
```

JavaScript:

```javascript
const list = document.querySelector(".projects");

const first = list.firstElementChild;
const second = first.nextElementSibling;
const third = second.nextElementSibling;
```

Now:

```text
first  → Project One
second → Project Two
third  → Project Three
```

For larger collections, however, selecting all matching elements and iterating over them is usually clearer than manually chaining sibling traversal.

---

# 32. Traversing with `children`

You can also use indexes:

```javascript
const list = document.querySelector(".projects");

const first = list.children[0];
const second = list.children[1];
const third = list.children[2];
```

This works because `children` is an indexed collection.

But remember:

```javascript
list.children
```

is an `HTMLCollection`, not an Array.

---

# 33. Traversing with `for...of`

Because an `HTMLCollection` is iterable in modern browsers, you can use:

```javascript
const projects = document.querySelector(".projects");

for (const project of projects.children) {
    console.log(project.textContent);
}
```

This is often cleaner than manually accessing indexes.

---

# 34. Traversing the DOM Tree with `parentElement`

You can repeatedly move upward.

For example:

```javascript
const heading = document.querySelector("h2");

let current = heading;

while (current) {
    console.log(current);

    current = current.parentElement;
}
```

Conceptually:

```text
h2
↑
article
↑
section
↑
main
↑
body
↑
html
↑
document
```

Note that `parentElement` eventually becomes `null` when there is no parent element.

---

# 35. Element Traversal vs Node Traversal

There are two conceptual traversal styles.

### Element-oriented traversal

```javascript
parentElement
children
firstElementChild
lastElementChild
nextElementSibling
previousElementSibling
```

These focus on HTML elements.

### Node-oriented traversal

```javascript
parentNode
childNodes
firstChild
lastChild
nextSibling
previousSibling
```

These operate at the more general DOM node level.

A useful mental model:

```text
Node traversal
    ↓
Everything in the DOM tree

Element traversal
    ↓
HTML element relationships
```

---

# 36. Why Whitespace Matters

Consider:

```html
<div>
    <h2>Osama Abu Motlaq</h2>
    <p>Frontend Developer</p>
</div>
```

A beginner might imagine:

```text
div
├── h2
└── p
```

But the DOM can also contain text nodes for whitespace:

```text
div
├── Text Node
├── h2
├── Text Node
├── p
└── Text Node
```

Therefore:

```javascript
div.childNodes
```

and:

```javascript
div.children
```

can produce different results.

This is one of the main reasons element-specific traversal properties exist.

---

# 37. Common Mistakes

## Mistake 1: Confusing `children` and `childNodes`

Wrong assumption:

```javascript
element.childNodes
```

contains only elements.

It can contain text and other node types.

Use:

```javascript
element.children
```

when you specifically want element children.

---

## Mistake 2: Confusing `firstChild` and `firstElementChild`

`firstChild` can be a text node.

`firstElementChild` is an element.

---

## Mistake 3: Confusing `nextSibling` and `nextElementSibling`

Whitespace can make:

```javascript
nextSibling
```

return a text node.

Use:

```javascript
nextElementSibling
```

for element-to-element traversal.

---

## Mistake 4: Assuming `parentElement` always exists

At the top of the element tree:

```javascript
element.parentElement
```

can eventually become:

```text
null
```

Always consider that possibility when repeatedly traversing upward.

---

## Mistake 5: Assuming `parentElement` finds any ancestor

It only returns the **immediate parent**.

If you need a matching ancestor at any level, use:

```javascript
element.closest(".project");
```

---

## Mistake 6: Using long chains of `parentElement`

This can become fragile:

```javascript
button.parentElement.parentElement.parentElement;
```

If the HTML structure changes, the code may break.

Prefer:

```javascript
button.closest(".project");
```

when you are looking for a specific ancestor.

---

## Mistake 7: Traversing when selection is clearer

This:

```javascript
const title = project.querySelector(".project-title");
```

may be clearer than:

```javascript
const title = project.firstElementChild
    .nextElementSibling
    .nextElementSibling;
```

Choose the approach that communicates the intended relationship.

---

# 38. Best Practices

## 1. Prefer element-based traversal when working with elements

Use:

```javascript
parentElement
children
firstElementChild
nextElementSibling
```

when you do not need text or other node types.

---

## 2. Use `closest()` for semantic ancestor lookup

Instead of:

```javascript
button.parentElement.parentElement;
```

prefer:

```javascript
button.closest(".project");
```

when the desired ancestor has a meaningful selector.

---

## 3. Avoid fragile structural chains

Avoid depending on exact nesting unless the structure itself is important.

---

## 4. Use selectors when they express intent better

This:

```javascript
project.querySelector(".project-title");
```

is often clearer than navigating through several siblings.

---

## 5. Understand the difference between direct children and descendants

```javascript
element.children;
```

means direct element children.

```javascript
element.querySelectorAll(".item");
```

can find matching descendants at any depth.

---

# 39. React Relevance

DOM traversal is **useful for understanding React**, but you will rarely perform this kind of traversal manually in normal React UI code.

Vanilla JavaScript might do:

```javascript
const button = document.querySelector("button");

const project = button.closest(".project");
```

React usually expresses the relationship through component structure:

```jsx
function Project() {
    return (
        <article className="project">
            <h2>Osama Abu Motlaq</h2>
            <button>View Project</button>
        </article>
    );
}
```

React already knows the component hierarchy.

You normally do not need to navigate through the DOM to discover relationships between your components.

However, understanding:

```text
parent
child
sibling
ancestor
descendant
```

helps you understand:

* Event bubbling
* Event delegation
* DOM refs
* Accessibility relationships
* Browser rendering
* How React ultimately renders UI into the DOM

---

# 40. React and `closest()`

There are still situations where direct DOM traversal can be useful.

For example, when integrating a browser API or third-party library, you may receive a real DOM event:

```javascript
function handleClick(event) {
    const project = event.target.closest(".project");

    console.log(project);
}
```

But in normal React application code, prefer React's data flow and component structure when possible.

---

# 41. Quick Reference

| Property / Method        | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `parentElement`          | Get immediate parent element                |
| `parentNode`             | Get immediate parent node                   |
| `children`               | Get direct element children                 |
| `childNodes`             | Get all direct child nodes                  |
| `firstElementChild`      | Get first child element                     |
| `lastElementChild`       | Get last child element                      |
| `firstChild`             | Get first child node                        |
| `lastChild`              | Get last child node                         |
| `nextElementSibling`     | Get next sibling element                    |
| `previousElementSibling` | Get previous sibling element                |
| `nextSibling`            | Get next sibling node                       |
| `previousSibling`        | Get previous sibling node                   |
| `closest()`              | Find nearest matching ancestor              |
| `matches()`              | Check whether an element matches a selector |
| `contains()`             | Check whether a node contains another node  |

---

# 42. Element Traversal vs Node Traversal

| Element-oriented         | Node-oriented     |
| ------------------------ | ----------------- |
| `parentElement`          | `parentNode`      |
| `children`               | `childNodes`      |
| `firstElementChild`      | `firstChild`      |
| `lastElementChild`       | `lastChild`       |
| `nextElementSibling`     | `nextSibling`     |
| `previousElementSibling` | `previousSibling` |

The practical distinction is:

```text
Element APIs
    ↓
Focus on HTML elements

Node APIs
    ↓
Include text nodes, comments, and other node types
```

---

# 43. Mental Model

Think of DOM traversal as moving through a family tree.

```text
                 body
                  │
                main
                  │
               section
                  │
               article
              /       \
            h2         p
             │
      "Osama Abu Motlaq"
```

### Move up

```javascript
element.parentElement;
```

### Move down

```javascript
element.children;
```

### Move to the first child

```javascript
element.firstElementChild;
```

### Move to the last child

```javascript
element.lastElementChild;
```

### Move right

```javascript
element.nextElementSibling;
```

### Move left

```javascript
element.previousElementSibling;
```

### Find a matching ancestor

```javascript
element.closest(".project");
```

### Check containment

```javascript
parent.contains(child);
```

---

# 44. Final Takeaways

* DOM traversal means navigating relationships between nodes and elements.
* `parentElement` moves to the immediate parent element.
* `children` returns direct element children.
* `childNodes` returns all direct child nodes.
* `firstElementChild` and `lastElementChild` work specifically with elements.
* `firstChild` and `lastChild` work with general nodes.
* `nextElementSibling` and `previousElementSibling` navigate between sibling elements.
* `nextSibling` and `previousSibling` navigate between general sibling nodes.
* Whitespace can appear as text nodes in the DOM.
* `closest()` finds the nearest matching ancestor.
* `matches()` checks whether an element matches a selector.
* `contains()` checks whether one node contains another.
* Traversal and selection are different operations.
* Use traversal when the relationship itself is what you need.
* Use selectors when directly expressing what you want is clearer.
* Avoid fragile chains of `parentElement`.
* Prefer `closest()` when searching for a semantic ancestor.
* Understanding DOM traversal is especially useful for events and event delegation.
* React abstracts much of this work, but the underlying DOM relationships still matter.

The core mental model is:

```text
                 PARENT
                   ↑
                   │
PREVIOUS ←── ELEMENT ──→ NEXT
                   │
                   ↓
                CHILDREN
```

Once you understand this tree and these relationships, DOM manipulation becomes much more predictable.
