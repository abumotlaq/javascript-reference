# DOM Manipulating Styles

JavaScript can manipulate the visual appearance of DOM elements by changing their CSS styles.

For example:

```html
<div id="profile">
    Osama Abu Motlaq
</div>
```

JavaScript can change its color:

```javascript
const profile = document.querySelector("#profile");

profile.style.color = "blue";
```

The browser effectively receives an inline style:

```html
<div id="profile" style="color: blue;">
    Osama Abu Motlaq
</div>
```

There are several ways to work with styles through JavaScript:

```text
element.style
element.classList
getComputedStyle()
CSS classes
CSS custom properties
```

The most important distinction is:

```text
Direct style manipulation
        ↓
element.style

Class manipulation
        ↓
element.classList

Read the final computed CSS
        ↓
getComputedStyle()
```

---

# 1. The `style` Property

Every DOM element exposes a:

```javascript
style
```

property.

Example:

```html
<p id="message">Hello</p>
```

JavaScript:

```javascript
const message = document.querySelector("#message");

message.style.color = "blue";
```

This changes the element's inline style.

---

# 2. Reading an Inline Style

Suppose:

```html
<p id="message" style="color: blue;">
    Hello
</p>
```

You can read the inline style:

```javascript
const message = document.querySelector("#message");

console.log(message.style.color);
```

Output:

```text
blue
```

Important:

```javascript
element.style
```

represents the element's **inline styles**.

It does not necessarily represent every style currently affecting the element.

---

# 3. Setting Multiple Styles

You can change several CSS properties individually:

```javascript
const profile = document.querySelector("#profile");

profile.style.color = "white";
profile.style.backgroundColor = "black";
profile.style.padding = "20px";
profile.style.borderRadius = "8px";
```

The resulting element may have inline styles similar to:

```html
<div
    id="profile"
    style="
        color: white;
        background-color: black;
        padding: 20px;
        border-radius: 8px;
    "
>
    Osama Abu Motlaq
</div>
```

---

# 4. CSS Property Names in JavaScript

CSS normally uses kebab-case:

```css
background-color
font-size
border-radius
margin-top
```

JavaScript style properties generally use **camelCase**:

```javascript
element.style.backgroundColor;
element.style.fontSize;
element.style.borderRadius;
element.style.marginTop;
```

The conversion is:

```text
background-color
       ↓
backgroundColor

font-size
       ↓
fontSize

border-radius
       ↓
borderRadius
```

---

# 5. Why JavaScript Uses CamelCase

CSS property:

```css
font-size: 24px;
```

JavaScript:

```javascript
element.style.fontSize = "24px";
```

The hyphen is removed and the following word starts with an uppercase letter.

This convention is called:

```text
camelCase
```

---

# 6. More Style Examples

```javascript
element.style.width = "300px";
element.style.height = "200px";
element.style.marginTop = "20px";
element.style.padding = "16px";
element.style.borderRadius = "10px";
element.style.fontSize = "18px";
element.style.fontWeight = "700";
element.style.textAlign = "center";
```

Most CSS properties can be accessed through the corresponding JavaScript style property.

---

# 7. CSS Values Are Usually Strings

Consider:

```javascript
element.style.width = "300px";
```

The value is a string:

```javascript
"300px"
```

not:

```javascript
300
```

This is important because CSS values often contain units or keywords.

For example:

```javascript
element.style.width = "50%";
element.style.fontSize = "2rem";
element.style.margin = "10px";
element.style.display = "none";
```

---

# 8. CSS Units

When a CSS property requires a unit, include the unit:

```javascript
element.style.width = "300px";
element.style.height = "100px";
element.style.marginTop = "20px";
```

Incorrect:

```javascript
element.style.width = 300;
```

For most CSS length properties, JavaScript needs a valid CSS value such as:

```javascript
element.style.width = "300px";
```

---

# 9. Setting Numeric Values with Template Literals

If the number comes from JavaScript:

```javascript
const width = 300;

element.style.width = `${width}px`;
```

The template literal creates:

```text
"300px"
```

This is useful when calculating dimensions dynamically.

---

# 10. Removing an Inline Style

You can remove an inline style by assigning an empty string:

```javascript
element.style.color = "";
```

Example:

```javascript
const message = document.querySelector("#message");

message.style.color = "red";

message.style.color = "";
```

The inline `color` declaration is removed.

---

# 11. `style.cssText`

The `cssText` property represents the inline CSS declarations of an element.

Example:

```javascript
const profile = document.querySelector("#profile");

profile.style.cssText = `
    color: white;
    background-color: black;
    padding: 20px;
`;
```

This sets several inline styles at once.

---

# 12. Important `cssText` Warning

Assigning:

```javascript
element.style.cssText = "...";
```

replaces the element's existing inline style declarations.

For example:

```javascript
element.style.color = "red";
element.style.padding = "20px";

element.style.cssText = "background-color: black;";
```

The previous inline styles can be replaced.

Therefore, when changing one property, this is often safer:

```javascript
element.style.backgroundColor = "black";
```

rather than replacing the entire `cssText`.

---

# 13. `style.setProperty()`

You can also use:

```javascript
element.style.setProperty(property, value);
```

Example:

```javascript
element.style.setProperty("background-color", "black");
```

This uses the CSS property name directly.

Compare:

```javascript
element.style.backgroundColor = "black";
```

with:

```javascript
element.style.setProperty("background-color", "black");
```

Both can set the same inline CSS declaration.

---

# 14. Removing a Property with `removeProperty()`

You can remove an inline CSS property with:

```javascript
element.style.removeProperty("color");
```

Example:

```javascript
const message = document.querySelector("#message");

message.style.color = "red";

message.style.removeProperty("color");
```

The inline `color` declaration is removed.

---

# 15. CSS Custom Properties

CSS custom properties are variables beginning with:

```text
--
```

Example:

```css
:root {
    --primary-color: blue;
}
```

JavaScript can read or change them using:

```javascript
style.setProperty()
```

Example:

```javascript
document.documentElement.style.setProperty(
    "--primary-color",
    "purple"
);
```

Now CSS using:

```css
color: var(--primary-color);
```

can respond to the new value.

---

# 16. Reading CSS Custom Properties

Suppose:

```css
#profile {
    --profile-color: blue;
}
```

You can read it with:

```javascript
const profile = document.querySelector("#profile");

const color = profile.style.getPropertyValue("--profile-color");

console.log(color);
```

This reads the inline custom property.

---

# 17. Why `classList` Matters

Although `style` is useful, directly changing many CSS properties from JavaScript can become difficult to maintain.

Consider:

```javascript
element.style.color = "white";
element.style.backgroundColor = "black";
element.style.padding = "20px";
element.style.borderRadius = "8px";
```

A cleaner approach is often to define the design in CSS:

```css
.profile-active {
    color: white;
    background-color: black;
    padding: 20px;
    border-radius: 8px;
}
```

Then JavaScript only controls the class:

```javascript
element.classList.add("profile-active");
```

This separates:

```text
JavaScript
→ Behavior and state

CSS
→ Presentation and styling
```

This separation is usually easier to maintain.

---

# 18. `classList`

The `classList` property provides methods for manipulating CSS classes.

The most important methods are:

```javascript
add()
remove()
toggle()
contains()
replace()
```

Example:

```javascript
const profile = document.querySelector("#profile");

profile.classList.add("active");
```

---

# 19. `classList.add()`

Add one class:

```javascript
element.classList.add("active");
```

Add multiple classes:

```javascript
element.classList.add("active", "visible");
```

For example:

```javascript
profile.classList.add("profile-card", "active");
```

The classes are added without removing existing classes.

---

# 20. `classList.remove()`

Remove a class:

```javascript
element.classList.remove("active");
```

Multiple classes:

```javascript
element.classList.remove("active", "hidden");
```

Existing classes that are not specified remain unchanged.

---

# 21. `classList.contains()`

Check whether an element has a class:

```javascript
if (element.classList.contains("active")) {
    console.log("The element is active");
}
```

The result is a boolean:

```text
true
```

or:

```text
false
```

This is useful when behavior depends on a CSS class representing a UI state.

---

# 22. `classList.toggle()`

`toggle()` is one of the most useful methods.

```javascript
element.classList.toggle("active");
```

If the class exists:

```text
active → removed
```

If the class does not exist:

```text
active → added
```

Mental model:

```text
toggle = add if missing, remove if present
```

---

# 23. Example: Toggle a Menu

HTML:

```html
<button id="menu-button">
    Menu
</button>

<nav id="menu" class="hidden">
    Projects
    About
    Contact
</nav>
```

CSS:

```css
.hidden {
    display: none;
}
```

JavaScript:

```javascript
const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});
```

Every click changes the class:

```text
hidden
    ↓
removed
    ↓
menu visible
```

and:

```text
no hidden
    ↓
added
    ↓
menu hidden
```

---

# 24. `toggle()` with a Boolean

`toggle()` can receive a second argument:

```javascript
element.classList.toggle("active", condition);
```

This is extremely useful.

If:

```javascript
condition === true
```

the class is added.

If:

```javascript
condition === false
```

the class is removed.

Example:

```javascript
const isActive = true;

element.classList.toggle("active", isActive);
```

This effectively means:

```text
true
  → ensure class exists

false
  → ensure class does not exist
```

---

# 25. `classList.replace()`

You can replace one class with another:

```javascript
element.classList.replace("inactive", "active");
```

If the element has:

```text
inactive
```

it becomes:

```text
active
```

This can be useful when switching between mutually exclusive states.

---

# 26. `className`

Another property is:

```javascript
element.className
```

Example:

```html
<div id="profile" class="card active"></div>
```

Then:

```javascript
console.log(profile.className);
```

returns:

```text
card active
```

You can replace the entire class string:

```javascript
profile.className = "card highlighted";
```

The previous class list is replaced.

---

# 27. `className` vs `classList`

Compare:

```javascript
element.className = "card active";
```

with:

```javascript
element.classList.add("active");
```

The first replaces the entire class value.

The second modifies the existing class list.

For individual class operations, prefer:

```javascript
classList
```

because it communicates your intention more clearly.

---

# 28. Why Classes Are Often Better Than Inline Styles

Suppose you want an active profile state.

Instead of:

```javascript
profile.style.backgroundColor = "black";
profile.style.color = "white";
profile.style.border = "2px solid blue";
```

define the style in CSS:

```css
.profile-active {
    background-color: black;
    color: white;
    border: 2px solid blue;
}
```

Then:

```javascript
profile.classList.add("profile-active");
```

This has several advantages:

* CSS remains responsible for styling.
* JavaScript remains responsible for behavior.
* Styles are reusable.
* CSS media queries continue to work naturally.
* Design changes do not require changing JavaScript.
* The JavaScript code becomes easier to read.

---

# 29. Reading Computed Styles

`element.style` only represents inline styles.

To find the final computed style applied by the browser, use:

```javascript
getComputedStyle(element);
```

Example:

```javascript
const profile = document.querySelector("#profile");

const styles = getComputedStyle(profile);

console.log(styles.color);
console.log(styles.fontSize);
```

The browser returns the computed values.

---

# 30. Why `getComputedStyle()` Is Different

Suppose CSS contains:

```css
#profile {
    color: blue;
    font-size: 24px;
}
```

HTML:

```html
<div id="profile">
    Osama Abu Motlaq
</div>
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

console.log(profile.style.color);
```

This may return:

```text
""
```

because the color came from a stylesheet, not an inline style.

But:

```javascript
const styles = getComputedStyle(profile);

console.log(styles.color);
```

can return the browser's computed color value.

This is the key distinction:

```text
element.style
    ↓
Inline styles

getComputedStyle(element)
    ↓
Final computed styles
```

---

# 31. `getComputedStyle()` Returns Read-Only Information

Example:

```javascript
const styles = getComputedStyle(profile);

console.log(styles.color);
```

You use the result to inspect styles.

You do not normally modify the page by doing:

```javascript
styles.color = "red";
```

Instead, modify the element:

```javascript
profile.style.color = "red";
```

or change its class:

```javascript
profile.classList.add("active");
```

---

# 32. CSS Classes and Computed Styles

Consider:

```css
.profile {
    color: black;
}

.profile.active {
    color: blue;
}
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

profile.classList.add("active");
```

Now:

```javascript
const styles = getComputedStyle(profile);

console.log(styles.color);
```

reflects the final style after CSS rules have been applied.

---

# 33. Inline Style vs CSS Class vs Computed Style

These three concepts should not be confused.

### Inline style

```javascript
element.style.color = "red";
```

Directly changes an inline declaration.

### CSS class

```javascript
element.classList.add("active");
```

Changes which CSS rules apply.

### Computed style

```javascript
getComputedStyle(element).color;
```

Reads the final result calculated by the browser.

Mental model:

```text
CSS rules
   +
Inline styles
   +
Browser state
   ↓
Computed style
```

---

# 34. CSS Custom Properties and Themes

CSS variables are especially useful for themes.

CSS:

```css
:root {
    --background: white;
    --text: black;
}

.dark {
    --background: black;
    --text: white;
}

body {
    background: var(--background);
    color: var(--text);
}
```

JavaScript can toggle the theme:

```javascript
document.documentElement.classList.toggle("dark");
```

This is often cleaner than changing many individual style properties.

---

# 35. Dynamic Theme Values

JavaScript can also set a CSS variable:

```javascript
document.documentElement.style.setProperty(
    "--primary-color",
    "purple"
);
```

CSS:

```css
button {
    background-color: var(--primary-color);
}
```

Now JavaScript controls the value while CSS controls how that value is used.

This creates a useful separation:

```text
JavaScript
    ↓
Theme value

CSS
    ↓
Visual design
```

---

# 36. Important CSS Cascade Concept

Styles can come from different sources:

```text
Browser defaults
       ↓
External/internal CSS
       ↓
CSS classes/selectors
       ↓
Inline styles
       ↓
!important and specificity rules
```

The actual cascade is more nuanced than this simplified sequence, because specificity, origin, layers, importance, and source order all matter.

The important point for DOM work is:

```javascript
element.style
```

does not tell you the complete CSS cascade.

For the resulting style, use:

```javascript
getComputedStyle(element)
```

---

# 37. Manipulating Styles with CSS Classes

A common pattern is:

```html
<div id="profile">
    Osama Abu Motlaq
</div>
```

CSS:

```css
.profile {
    padding: 20px;
    border-radius: 8px;
}

.profile.active {
    background-color: black;
    color: white;
}
```

JavaScript:

```javascript
const profile = document.querySelector("#profile");

profile.classList.add("profile");
profile.classList.add("active");
```

JavaScript controls state.

CSS controls presentation.

---

# 38. Practical Example: Active State

HTML:

```html
<button id="profile-button">
    Profile
</button>
```

CSS:

```css
.active {
    background-color: black;
    color: white;
}
```

JavaScript:

```javascript
const button = document.querySelector("#profile-button");

button.addEventListener("click", () => {
    button.classList.toggle("active");
});
```

This is a very common DOM pattern:

```text
User interaction
      ↓
JavaScript event
      ↓
classList.toggle()
      ↓
CSS rule changes appearance
```

---

# 39. Practical Example: Showing Validation State

HTML:

```html
<input id="email" type="email">
```

CSS:

```css
.invalid {
    border: 2px solid red;
}
```

JavaScript:

```javascript
const email = document.querySelector("#email");

if (email.value.trim() === "") {
    email.classList.add("invalid");
} else {
    email.classList.remove("invalid");
}
```

The JavaScript decides the state.

CSS decides how that state looks.

---

# 40. Practical Example: Dynamic Width

Sometimes direct style manipulation is appropriate.

```javascript
const progress = document.querySelector("#progress");

const percentage = 75;

progress.style.width = `${percentage}%`;
```

This is a good use case because the value itself is dynamic.

The result:

```html
<div id="progress" style="width: 75%;"></div>
```

The number changes dynamically, so JavaScript needs to provide the value.

---

# 41. When `style` Is Appropriate

Direct style manipulation is useful when:

* A value is dynamically calculated.
* An animation value changes continuously.
* An element's position must be calculated.
* A dimension comes from JavaScript.
* A CSS custom property needs a dynamic value.
* A temporary inline style is intentional.

Example:

```javascript
element.style.transform = `translateX(${distance}px)`;
```

---

# 42. When `classList` Is Better

Use classes when you are representing predefined states:

```text
active
hidden
open
closed
selected
disabled
error
success
dark
loading
```

For example:

```javascript
button.classList.toggle("loading", isLoading);
```

This is usually cleaner than setting many individual styles.

---

# 43. Avoid Building CSS Logic in JavaScript

Avoid excessive code like:

```javascript
element.style.color = isActive ? "white" : "black";
element.style.backgroundColor = isActive ? "blue" : "transparent";
element.style.border = isActive ? "2px solid blue" : "1px solid gray";
```

Instead:

```css
.active {
    color: white;
    background-color: blue;
    border: 2px solid blue;
}
```

Then:

```javascript
element.classList.toggle("active", isActive);
```

This keeps presentation in CSS.

---

# 44. React Relevance

This topic is **very important for React**, but the recommended approach changes.

In vanilla JavaScript:

```javascript
button.classList.toggle("active");
```

In React, you normally express the state through JSX:

```jsx
<button className={isActive ? "active" : ""}>
    Profile
</button>
```

Or:

```jsx
<button className={`button ${isActive ? "active" : ""}`}>
    Profile
</button>
```

React then manages the DOM.

You generally should not do:

```javascript
document.querySelector("button").classList.add("active");
```

inside a React component for ordinary UI state.

---

# 45. React State → Class

The conceptual React flow is:

```text
State
  ↓
Conditional className
  ↓
React
  ↓
DOM
  ↓
CSS
  ↓
Visual result
```

Example:

```jsx
function Profile() {
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            className={isActive ? "active" : ""}
            onClick={() => setIsActive(!isActive)}
        >
            Osama Abu Motlaq
        </button>
    );
}
```

The state controls the class.

The class controls the appearance.

---

# 46. Direct DOM Styling in React

Direct DOM manipulation can still be appropriate in special cases, especially with:

```text
useRef()
```

Examples include:

* Measuring an element.
* Controlling focus.
* Integrating third-party DOM libraries.
* Working with browser APIs.
* Accessing media elements.

But for ordinary styling:

```text
React state
    ↓
className / style prop
    ↓
CSS
```

is generally the preferred architecture.

---

# 47. React `style` Prop

React also supports inline styles:

```jsx
<div style={{ color: "red", fontSize: "20px" }}>
    Osama Abu Motlaq
</div>
```

Notice that React uses a JavaScript object.

CSS:

```css
font-size: 20px;
```

React:

```jsx
style={{ fontSize: "20px" }}
```

The same camelCase concept applies.

However, for larger styles, CSS classes are often easier to maintain.

---

# 48. Common Mistakes

## Mistake 1: Using CSS Property Names with Hyphens

Incorrect:

```javascript
element.style.background-color = "black";
```

Correct:

```javascript
element.style.backgroundColor = "black";
```

---

## Mistake 2: Forgetting Units

Usually incorrect:

```javascript
element.style.width = "300";
```

Better:

```javascript
element.style.width = "300px";
```

---

## Mistake 3: Confusing `style` with Computed Styles

This:

```javascript
element.style.color
```

only concerns inline styles.

For the final computed value:

```javascript
getComputedStyle(element).color;
```

---

## Mistake 4: Replacing All Classes Accidentally

This:

```javascript
element.className = "active";
```

removes the previous classes.

If you only want to add:

```javascript
element.classList.add("active");
```

---

## Mistake 5: Using `innerHTML` for Styling

Do not rebuild HTML simply to change a visual state.

Prefer:

```javascript
element.classList.add("active");
```

---

## Mistake 6: Using Too Many Inline Styles

Large amounts of styling inside JavaScript can make the code difficult to maintain.

Prefer CSS classes for predefined visual states.

---

## Mistake 7: Treating `dataset` as Boolean State

This:

```javascript
element.dataset.active = false;
```

stores a string representation.

It does not create a real JavaScript boolean in the DOM attribute.

For styling/state classes, use:

```javascript
element.classList.toggle("active", isActive);
```

when appropriate.

---

# 49. Best Practices

### Use `classList` for predefined UI states

```javascript
element.classList.toggle("active", isActive);
```

### Use `style` for genuinely dynamic values

```javascript
element.style.width = `${percentage}%`;
```

### Keep most visual design in CSS

```css
.active {
    background-color: black;
    color: white;
}
```

### Use `getComputedStyle()` when you need to inspect the final style

```javascript
const styles = getComputedStyle(element);
```

### Use CSS custom properties for dynamic theme values

```javascript
document.documentElement.style.setProperty(
    "--primary-color",
    "purple"
);
```

### Avoid replacing `className` unless you intentionally want to replace all classes

### Avoid large `cssText` assignments when only one property needs changing

---

# 50. Quick Reference

## Direct style

```javascript
element.style.color = "red";
element.style.backgroundColor = "black";
element.style.fontSize = "20px";
```

## Remove inline style

```javascript
element.style.color = "";
```

## Multiple styles

```javascript
element.style.cssText = `
    color: white;
    background-color: black;
`;
```

## Set CSS property

```javascript
element.style.setProperty("background-color", "black");
```

## Remove CSS property

```javascript
element.style.removeProperty("background-color");
```

## Add class

```javascript
element.classList.add("active");
```

## Remove class

```javascript
element.classList.remove("active");
```

## Check class

```javascript
element.classList.contains("active");
```

## Toggle class

```javascript
element.classList.toggle("active");
```

## Toggle based on condition

```javascript
element.classList.toggle("active", isActive);
```

## Replace class

```javascript
element.classList.replace("old", "new");
```

## Read inline styles

```javascript
element.style.color;
```

## Read computed styles

```javascript
getComputedStyle(element).color;
```

## Set CSS variable

```javascript
element.style.setProperty("--primary-color", "blue");
```

---

# 51. Decision Guide

When you need to manipulate styles, ask:

### Is this a predefined visual state?

Use:

```javascript
classList
```

Example:

```javascript
element.classList.toggle("active", isActive);
```

### Is this a dynamically calculated value?

Use:

```javascript
style
```

Example:

```javascript
element.style.width = `${percentage}%`;
```

### Do you need to inspect the final CSS value?

Use:

```javascript
getComputedStyle()
```

Example:

```javascript
const styles = getComputedStyle(element);
```

### Do you need to change a theme variable?

Use:

```javascript
style.setProperty()
```

Example:

```javascript
document.documentElement.style.setProperty(
    "--primary-color",
    "blue"
);
```

---

# 52. Final Mental Model

Think of styling as three different responsibilities:

```text
                 DOM Styling
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     style        classList    getComputedStyle
        │            │            │
        ↓            ↓            ↓
   Set dynamic    Change CSS    Read final
     values        states         result
```

A common architecture is:

```text
JavaScript
    ↓
State / behavior
    ↓
classList
    ↓
CSS
    ↓
Visual appearance
```

For dynamic numerical values:

```text
JavaScript
    ↓
Calculated value
    ↓
element.style
    ↓
CSS
    ↓
Visual appearance
```

---

# 53. Final Takeaways

* `element.style` manipulates inline CSS styles.
* JavaScript style property names normally use camelCase.
* CSS values are generally assigned as strings.
* Length values usually require units such as `px`, `%`, `rem`, or `vh`.
* `style.cssText` can assign multiple inline styles but can replace existing inline declarations.
* `style.setProperty()` works with normal CSS property names and CSS custom properties.
* `style.removeProperty()` removes an inline CSS declaration.
* `classList` is the preferred API for adding, removing, checking, and toggling CSS classes.
* `className` represents the class attribute as a string and can replace the entire class list.
* `getComputedStyle()` lets you inspect the final styles calculated by the browser.
* `element.style` and `getComputedStyle(element)` answer different questions.
* CSS custom properties can connect dynamic JavaScript values with CSS.
* Predefined visual states are usually better represented by CSS classes.
* Dynamically calculated values are often appropriate for inline styles.
* In React, ordinary UI styling should generally be driven by state, `className`, and the `style` prop rather than direct DOM manipulation.
* Direct DOM styling remains useful for specialized cases involving measurements, browser APIs, animations, or third-party libraries.

The core rule is:

```text
Predefined state
    → classList

Dynamic calculated value
    → style

Final rendered CSS value
    → getComputedStyle()

Theme variable
    → CSS custom property
```

Once you understand these four paths, DOM styling becomes much easier to reason about.
