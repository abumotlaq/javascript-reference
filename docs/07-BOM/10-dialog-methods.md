# Browser Dialog Methods

Browsers provide a small set of built-in dialog methods through the `window` object:

* `alert()`
* `confirm()`
* `prompt()`

These methods allow JavaScript to display simple browser-controlled dialogs.

Example:

```js
alert("Hello, Osama Abu Motlaq!");
```

Although these APIs are easy to use, they have important characteristics and limitations.

They are:

* synchronous from the JavaScript perspective
* blocking while the dialog is active
* controlled by the browser
* difficult to style
* limited compared with custom UI components
* generally unsuitable for modern application interfaces

---

# 1. The Three Main Dialog Methods

| Method      | Purpose               | Return Value       |
| ----------- | --------------------- | ------------------ |
| `alert()`   | Show a message        | `undefined`        |
| `confirm()` | Ask for confirmation  | `true` or `false`  |
| `prompt()`  | Ask the user for text | `string` or `null` |

The methods are available through `window`:

```js
window.alert();
window.confirm();
window.prompt();
```

Because `window` is the browser global object, these are also commonly called directly:

```js
alert();
confirm();
prompt();
```

---

# 2. `alert()`

`alert()` displays a message to the user.

## Syntax

```js
alert(message);
```

Example:

```js
alert("Hello, Osama Abu Motlaq!");
```

The browser displays the message in a native dialog.

---

# 3. What Does `alert()` Return?

`alert()` returns:

```js
undefined
```

Example:

```js
const result = alert("Hello, Osama Abu Motlaq!");

console.log(result);
```

Output:

```text
undefined
```

`alert()` is intended to communicate information, not collect a response.

---

# 4. `alert()` Is Blocking

One of the most important characteristics of `alert()` is that JavaScript execution pauses while the dialog is open.

Example:

```js
console.log("Before");

alert("Hello, Osama Abu Motlaq!");

console.log("After");
```

The logical sequence is:

```text
Before
[Dialog appears]
[JavaScript waits]
[User dismisses dialog]
After
```

The second `console.log()` does not execute until the dialog is dismissed.

---

# 5. Why Blocking Matters

Blocking dialogs can interrupt the normal flow of an application.

For example:

```js
alert("Please read this message.");
```

While the dialog is displayed, the user cannot continue interacting normally with the page.

This can make the interface feel:

* interrupted
* old-fashioned
* difficult to use
* difficult to control visually

This is one reason modern applications often use custom dialogs instead.

---

# 6. `confirm()`

`confirm()` asks the user to confirm an action.

## Syntax

```js
confirm(message);
```

Example:

```js
const result = confirm("Do you want to continue?");
```

The browser normally provides buttons equivalent to:

```text
OK
Cancel
```

---

# 7. Return Value of `confirm()`

`confirm()` returns a Boolean.

If the user confirms:

```js
true
```

If the user cancels:

```js
false
```

Example:

```js
const shouldContinue = confirm(
  "Do you want to continue, Osama Abu Motlaq?"
);

if (shouldContinue) {
  console.log("User confirmed.");
} else {
  console.log("User cancelled.");
}
```

---

# 8. Practical `confirm()` Example

A common use case is asking before deleting something.

```js
const shouldDelete = confirm(
  "Do you want to delete this item?"
);

if (shouldDelete) {
  console.log("Delete operation started.");
}
```

The important idea is that the return value controls the next action.

---

# 9. `confirm()` Is Also Blocking

Like `alert()`, `confirm()` pauses JavaScript execution until the user responds.

Example:

```js
console.log("Start");

const result = confirm("Continue?");

console.log("Result:", result);

console.log("End");
```

The final output cannot occur until the user has responded.

---

# 10. `prompt()`

`prompt()` asks the user to enter text.

## Syntax

```js
prompt(message);
```

Example:

```js
const name = prompt("What is your name?");
```

If the user enters:

```text
Osama Abu Motlaq
```

then:

```js
console.log(name);
```

outputs:

```text
Osama Abu Motlaq
```

---

# 11. `prompt()` Return Value

`prompt()` can return:

* a `string`
* `null`

If the user enters text and accepts:

```js
"Osama Abu Motlaq"
```

If the user cancels:

```js
null
```

Example:

```js
const name = prompt("Enter your name:");

if (name !== null) {
  console.log(`Hello, ${name}!`);
}
```

---

# 12. Empty String vs `null`

This distinction is important.

Consider:

```js
const name = prompt("Enter your name:");
```

There are at least two different situations.

### User clicks OK without entering text

The result can be:

```js
""
```

This is an empty string.

### User clicks Cancel

The result is:

```js
null
```

These values are not the same:

```js
"" !== null
```

Understanding this distinction prevents incorrect logic.

---

# 13. Checking `prompt()` Correctly

A robust check:

```js
const name = prompt("Enter your name:");

if (name === null) {
  console.log("User cancelled.");
} else if (name === "") {
  console.log("User submitted an empty value.");
} else {
  console.log(`Hello, ${name}!`);
}
```

This distinguishes the three cases clearly.

---

# 14. The Optional Default Value

`prompt()` can receive a second argument.

```js
prompt(message, defaultValue);
```

Example:

```js
const name = prompt(
  "What is your name?",
  "Osama Abu Motlaq"
);
```

The input field begins with:

```text
Osama Abu Motlaq
```

The user can modify it before accepting.

---

# 15. Example with a Default Value

```js
const city = prompt(
  "Where are you located?",
  "Gaza"
);

if (city !== null) {
  console.log(`Selected location: ${city}`);
}
```

The second argument provides an initial value.

---

# 16. Dialogs and Type Conversion

`prompt()` always returns text when the user submits a value.

For example:

```js
const age = prompt("Enter your age:");

console.log(typeof age);
```

The result is:

```text
string
```

Even if the user enters:

```text
25
```

the value is:

```js
"25"
```

not:

```js
25
```

---

# 17. Converting a `prompt()` Result

Use an explicit conversion when you need a number.

```js
const ageInput = prompt("Enter your age:");

if (ageInput !== null) {
  const age = Number(ageInput);

  console.log(age);
  console.log(typeof age);
}
```

This makes the desired type explicit.

---

# 18. Validating User Input

Never assume that `prompt()` returns valid data.

Example:

```js
const ageInput = prompt("Enter your age:");

if (ageInput === null) {
  console.log("Cancelled.");
} else {
  const age = Number(ageInput);

  if (Number.isNaN(age)) {
    console.log("Please enter a valid number.");
  } else {
    console.log(`Age: ${age}`);
  }
}
```

This is safer than blindly using:

```js
const age = Number(prompt("Enter your age"));
```

because cancellation needs to be handled separately.

---

# 19. Whitespace Validation

User input may contain spaces.

Example:

```js
const name = prompt("Enter your name:");

if (name !== null) {
  const cleanedName = name.trim();

  if (cleanedName === "") {
    console.log("A name is required.");
  } else {
    console.log(`Hello, ${cleanedName}!`);
  }
}
```

`trim()` removes leading and trailing whitespace.

---

# 20. `alert()`, `confirm()`, and `prompt()` Are `window` Methods

All three methods are available through `window`.

```js
window.alert("Hello");
window.confirm("Continue?");
window.prompt("Enter your name");
```

Because `window` is the global browser object, the following is usually equivalent:

```js
alert("Hello");
confirm("Continue?");
prompt("Enter your name");
```

---

# 21. Dialogs and the Browser Environment

These methods belong to the browser environment.

They are not core JavaScript syntax.

JavaScript provides language features such as:

```js
const
let
if
for
class
Promise
```

The browser adds APIs such as:

```js
window
document
alert
confirm
prompt
localStorage
fetch
```

This distinction is important when learning JavaScript for web development.

---

# 22. Dialogs and the Event Loop

These dialogs behave differently from asynchronous browser APIs.

Consider:

```js
console.log("A");

alert("Pause");

console.log("B");
```

The second statement prevents normal JavaScript execution from continuing until the user closes the dialog.

This is fundamentally different from:

```js
setTimeout(() => {
  console.log("Timer");
}, 1000);
```

A timer schedules future work.

A dialog blocks execution while it is open.

---

# 23. Dialogs vs Timers

| Feature                   | Dialog                       | Timer                       |
| ------------------------- | ---------------------------- | --------------------------- |
| Blocks JS execution       | Yes                          | No                          |
| User interaction required | Usually                      | No                          |
| Styling control           | Very limited                 | Not applicable              |
| Common examples           | `alert`, `confirm`, `prompt` | `setTimeout`, `setInterval` |
| Modern application UI     | Usually avoided              | Common                      |

---

# 24. `alert()` Is Not a UI Component

This:

```js
alert("Saved successfully!");
```

is not equivalent to creating:

```html
<div class="notification">Saved successfully!</div>
```

The browser owns the native dialog.

You do not control the HTML structure of the `alert()` box.

---

# 25. Styling Limitations

You cannot reliably customize the native browser dialog with CSS.

For example:

```js
alert("Hello");
```

does not allow you to choose:

* custom width
* custom colors
* custom fonts
* custom buttons
* custom layout
* custom animations

The browser and operating system control its presentation.

---

# 26. When to Use `alert()`

`alert()` can still be useful for:

* learning JavaScript
* simple demonstrations
* very small scripts
* debugging simple interactions
* educational examples

Example:

```js
alert("JavaScript is working!");
```

However, production applications usually use application-controlled UI instead.

---

# 27. When to Use `confirm()`

`confirm()` is useful for understanding the basic confirmation flow:

```js
const confirmed = confirm("Continue?");
```

However, production interfaces often require more control over:

* wording
* accessibility
* design
* keyboard behavior
* focus management
* destructive-action styling

A custom dialog is usually more appropriate for those cases.

---

# 28. When to Use `prompt()`

`prompt()` is useful for:

* learning
* quick experiments
* very small scripts
* temporary prototypes

It is generally not the best choice for serious application forms.

A custom form gives you control over:

* validation
* labels
* accessibility
* styling
* error messages
* input types
* keyboard behavior

---

# 29. Security: Dialogs Are Not Authentication

Never treat a browser dialog as a security boundary.

For example:

```js
const password = prompt("Enter your password:");
```

does not create a secure authentication system.

The browser-side code is controlled by the user.

Security decisions must be enforced on trusted server-side infrastructure.

---

# 30. `prompt()` and Sensitive Information

Avoid collecting sensitive information through `prompt()`.

For example, do not build a production authentication system around:

```js
const password = prompt("Password:");
```

Problems include:

* poor UX
* limited control
* lack of proper security architecture
* potentially inappropriate display behavior
* no secure server-side validation by itself

Use proper forms and secure authentication mechanisms instead.

---

# 31. Dialogs and User Experience

Native dialogs interrupt the user's current workflow.

For example:

```js
alert("You have unsaved changes.");
```

may force the user to stop what they are doing.

A custom application-controlled notification can often communicate the same information without blocking the interface.

---

# 32. Native Dialogs and Accessibility

Browser dialogs have built-in browser-level behavior, but they still have limitations from an application-design perspective.

Custom dialogs require careful implementation of:

* keyboard navigation
* focus management
* screen-reader semantics
* Escape-key behavior
* focus restoration
* appropriate ARIA semantics

Do not build a custom dialog without understanding these requirements.

---

# 33. Custom Dialog vs Native Dialog

A native dialog:

```js
confirm("Delete this item?");
```

is simple.

A custom dialog might provide:

```text
Delete item?

This action cannot be undone.

[Cancel] [Delete]
```

The second approach requires more implementation, but provides much greater control.

---

# 34. Dialogs and Destructive Actions

A confirmation dialog can be conceptually useful for destructive operations.

Example:

```js
const confirmed = confirm(
  "Do you want to delete this item?"
);

if (confirmed) {
  deleteItem();
}
```

However, for a production application, a custom confirmation component may provide a better experience and clearer destructive-action design.

---

# 35. Important Limitation: Dialogs Can Be Suppressed

Browsers can restrict or suppress dialogs in some situations.

For example, browsers may limit abusive repeated dialogs.

This means applications should not assume that native dialogs are an unlimited communication channel.

Do not build critical application logic around repeated `alert()` calls.

---

# 36. Repeated `alert()` Calls

This is poor application design:

```js
for (let i = 0; i < 100; i++) {
  alert(`Message ${i}`);
}
```

Repeated dialogs can:

* interrupt the user repeatedly
* create a hostile experience
* trigger browser protections

Use a page-based UI when presenting multiple pieces of information.

---

# 37. Dialogs and User Activation

Modern browsers apply restrictions to some browser-controlled UI and privileged actions.

Developers should not assume that any script can freely open dialogs in every context.

In particular, browsers may restrict behavior that appears abusive or automated.

The exact behavior can vary by browser and execution context.

---

# 38. Dialogs in React

React can technically call native dialogs:

```jsx
function SaveButton() {
  function handleClick() {
    alert("Saved, Osama Abu Motlaq!");
  }

  return (
    <button onClick={handleClick}>
      Save
    </button>
  );
}
```

This works because the code executes in the browser in response to an interaction.

However, React applications generally prefer rendering application-controlled UI.

---

# 39. `confirm()` in React

Example:

```jsx
function DeleteButton() {
  function handleDelete() {
    const confirmed = confirm(
      "Do you want to delete this item?"
    );

    if (!confirmed) {
      return;
    }

    console.log("Deleting...");
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}
```

This is technically valid.

But it is still a browser-native blocking dialog rather than a React component.

---

# 40. Why React Applications Often Avoid Native Dialogs

React is designed around declarative UI.

Instead of:

```js
confirm("Delete this item?");
```

a React application can represent dialog state:

```jsx
const [isOpen, setIsOpen] = useState(false);
```

Then render:

```jsx
{isOpen && <DeleteDialog />}
```

The UI becomes part of the component state.

This provides much more control.

---

# 41. Example: React Dialog State

```jsx
function DeleteSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Delete
      </button>

      {isOpen && (
        <div>
          <p>Delete this item?</p>

          <button onClick={() => setIsOpen(false)}>
            Cancel
          </button>

          <button
            onClick={() => {
              console.log("Deleted");
              setIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
```

This approach treats the dialog as normal application state.

---

# 42. Native Dialogs vs React State

Native dialog:

```js
confirm("Continue?");
```

Mental model:

```text
Imperative
↓
Browser creates dialog
↓
JavaScript waits
↓
Result returned
```

React-controlled dialog:

```text
State changes
↓
React renders UI
↓
User interacts with UI
↓
Event updates state
```

The second model fits React's declarative architecture more naturally.

---

# 43. Next.js Considerations

In Next.js, native dialog methods are browser APIs.

They should therefore be used only in client-side code.

For example:

```jsx
"use client";

export default function Page() {
  function handleClick() {
    const confirmed = confirm(
      "Continue, Osama Abu Motlaq?"
    );

    console.log(confirmed);
  }

  return (
    <button onClick={handleClick}>
      Continue
    </button>
  );
}
```

The important point is not the `confirm()` method itself.

The important point is understanding the execution environment.

---

# 44. Do Not Use Dialogs During Server Rendering

Browser APIs such as:

```js
window
document
alert
confirm
prompt
```

depend on a browser environment.

Server-side code cannot interact with the user's browser dialog in the same way.

When working with Next.js, always understand whether code is:

```text
Server-side
or
Client-side
```

---

# 45. Dialog Methods and Error Handling

Do not use `alert()` as your main application error-handling architecture.

Avoid patterns like:

```js
try {
  saveData();
} catch (error) {
  alert(error.message);
}
```

For a production React or Next.js application, it is often better to:

* store an error state
* render an accessible error message
* provide recovery actions
* preserve application context

Example:

```jsx
const [error, setError] = useState(null);
```

Then:

```jsx
{error && <p role="alert">{error}</p>}
```

This keeps the error part of the application UI.

---

# 46. `alert()` vs Inline Feedback

Native dialog:

```js
alert("Profile updated.");
```

Inline feedback:

```jsx
<p role="status">
  Profile updated.
</p>
```

The second approach gives the application control over:

* placement
* styling
* duration
* accessibility
* interaction
* persistence

---

# 47. Dialogs vs Notifications

A native dialog interrupts the user.

A notification can appear inside the application's interface.

For example:

```text
Native dialog:
[ Saved successfully! ]
       [ OK ]

Application UI:
--------------------------------
Profile updated successfully.
--------------------------------
```

The second approach is often better for non-critical informational messages.

---

# 48. Dialogs and Forms

Using `prompt()` for serious forms is usually a poor design.

Example:

```js
const name = prompt("Name:");
const email = prompt("Email:");
const message = prompt("Message:");
```

This produces a sequence of blocking dialogs.

A real form can instead present all fields together:

```html
<form>
  <label>Name</label>
  <input>

  <label>Email</label>
  <input>

  <label>Message</label>
  <textarea></textarea>

  <button type="submit">
    Send
  </button>
</form>
```

The form model is more flexible and accessible.

---

# 49. Dialog Return Values Quick Reference

## `alert()`

```js
const result = alert("Hello");
```

Result:

```js
undefined
```

---

## `confirm()`

```js
const result = confirm("Continue?");
```

Result:

```js
true
```

or:

```js
false
```

---

## `prompt()`

```js
const result = prompt("Name?");
```

Result:

```js
"Osama Abu Motlaq"
```

or:

```js
null
```

---

# 50. Common Mistake: Treating `prompt()` as a Number Input

Incorrect assumption:

```js
const age = prompt("Age?");
```

Then:

```js
console.log(typeof age);
```

Result:

```text
string
```

Convert explicitly:

```js
const ageInput = prompt("Age?");

if (ageInput !== null) {
  const age = Number(ageInput);
}
```

---

# 51. Common Mistake: Ignoring Cancellation

This:

```js
const name = prompt("Name:");

console.log(name.length);
```

can fail conceptually because:

```js
name
```

may be:

```js
null
```

Safer:

```js
const name = prompt("Name:");

if (name !== null) {
  console.log(name.length);
}
```

---

# 52. Common Mistake: Using Truthiness for `prompt()`

Consider:

```js
const value = prompt("Enter something:");

if (!value) {
  console.log("Cancelled");
}
```

This combines different cases.

Both:

```js
null
```

and:

```js
""
```

are falsy.

If you need to distinguish cancellation from empty input, use explicit checks:

```js
if (value === null) {
  console.log("Cancelled");
} else if (value === "") {
  console.log("Empty input");
}
```

---

# 53. Common Mistake: Assuming `confirm()` Returns a String

Wrong:

```js
const result = confirm("Continue?");

if (result === "true") {
  console.log("Confirmed");
}
```

The result is a Boolean:

```js
true
```

not:

```js
"true"
```

Correct:

```js
if (result === true) {
  console.log("Confirmed");
}
```

Or more simply:

```js
if (result) {
  console.log("Confirmed");
}
```

---

# 54. Common Mistake: Calling Dialogs During Page Initialization

Avoid unnecessarily interrupting users as soon as a page loads:

```js
alert("Welcome!");
```

This can make the page feel intrusive.

Prefer interaction-driven communication when possible.

---

# 55. Native Dialogs Are Imperative

Calling:

```js
alert("Hello");
```

is an imperative instruction:

> Browser, show this dialog now.

Calling:

```js
confirm("Delete?");
```

is also imperative.

This differs from declarative UI systems such as React.

Understanding this distinction is useful when moving from plain DOM development to React.

---

# 56. Custom Dialogs Are More Flexible

A custom dialog can support:

* multiple actions
* icons
* detailed explanations
* validation
* loading states
* asynchronous operations
* responsive design
* custom keyboard handling
* accessible semantics

For example:

```text
Delete project?

Project: Portfolio

This action cannot be undone.

[Cancel]       [Delete project]
```

This type of interface is difficult to achieve with `confirm()` alone.

---

# 57. Native Dialogs and Asynchronous Code

You can use a native dialog before starting asynchronous work:

```js
const confirmed = confirm(
  "Start the operation?"
);

if (confirmed) {
  fetch("/api/data");
}
```

The confirmation happens first.

The asynchronous request begins only after the user confirms.

However, the dialog itself is synchronous and blocking.

---

# 58. Dialog Methods and Promises

Native dialogs do not return Promises.

For example:

```js
const result = confirm("Continue?");
```

returns the Boolean directly.

You do not write:

```js
const result = await confirm("Continue?");
```

because `confirm()` is not Promise-based.

A custom application dialog can be designed around asynchronous interaction if desired.

---

# 59. A Promise-Based Custom Confirmation Concept

A custom confirmation function could conceptually work like this:

```js
const confirmed = await askForConfirmation();
```

The exact implementation would require a UI component and Promise resolution.

This model is much more compatible with modern asynchronous applications.

The important distinction is:

```text
Native confirm:
sync return value

Custom async dialog:
Promise-based result
```

---

# 60. Dialogs and Browser UX Policies

Native dialogs are controlled by the browser.

This means application developers cannot assume:

* identical visual design across browsers
* identical placement
* identical dimensions
* identical button labels
* identical interaction details

The browser decides the exact presentation.

Applications that require consistent visual design should use application-controlled UI.

---

# 61. Dialog Security Model

Native dialogs do not grant additional privileges to JavaScript.

For example:

```js
confirm("Are you an administrator?");
```

does not authenticate anything.

The user can choose either option.

Security must come from:

* server-side authorization
* authenticated sessions
* secure APIs
* validated data
* proper access control

The dialog is only a UI mechanism.

---

# 62. Practical Example: Confirmation Before Navigation

A basic example:

```js
const confirmed = confirm(
  "Leave this page?"
);

if (confirmed) {
  location.href = "/dashboard";
}
```

This demonstrates how `confirm()` can control the next action.

For production applications with unsaved form data, browser navigation protection mechanisms should be considered rather than relying only on a custom `confirm()` call.

---

# 63. Practical Example: Simple Input

```js
const name = prompt(
  "Enter your name:",
  "Osama Abu Motlaq"
);

if (name !== null) {
  console.log(`Welcome, ${name}!`);
}
```

This is a simple demonstration of:

* user input
* default values
* cancellation
* string handling

---

# 64. Practical Example: Confirmation Flow

```js
const confirmed = confirm(
  "Do you want to save your changes?"
);

if (confirmed) {
  console.log("Saving...");
} else {
  console.log("Save cancelled.");
}
```

This is one of the simplest ways to understand Boolean-driven control flow.

---

# 65. Practical Example: `prompt()` and Validation

```js
const ageInput = prompt("Enter your age:");

if (ageInput === null) {
  console.log("Operation cancelled.");
} else {
  const age = Number(ageInput);

  if (!Number.isInteger(age) || age < 0) {
    console.log("Invalid age.");
  } else {
    console.log(`Age: ${age}`);
  }
}
```

This example demonstrates:

* cancellation handling
* type conversion
* validation
* conditional logic

---

# 66. React Relevance

Dialog methods are relevant to React mainly because they help you understand the difference between:

* browser imperative APIs
* React declarative UI
* synchronous user interaction
* state-driven components

You will often replace:

```js
confirm("Delete?");
```

with state such as:

```js
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
```

and replace:

```js
alert("Saved!");
```

with UI state such as:

```js
const [message, setMessage] = useState("");
```

This is an important conceptual transition when learning React.

---

# 67. Next.js Relevance

In Next.js, the main concern is the client/server boundary.

Native dialog methods depend on the browser.

Therefore:

```js
alert()
confirm()
prompt()
```

belong in client-side execution.

They are especially relevant inside:

* Client Components
* event handlers
* browser-only interactions

They are not server-side UI mechanisms.

---

# 68. Quick Comparison

```text
alert()
   ↓
Inform the user
   ↓
Returns undefined

confirm()
   ↓
Ask for yes/no style decision
   ↓
Returns true/false

prompt()
   ↓
Ask for text
   ↓
Returns string/null
```

---

# 69. Best Practices

### Use dialogs mainly for simple browser interactions

Good for:

```js
alert("Test");
```

during learning or debugging.

### Do not build a complete application's UI around native dialogs

Use application-controlled components when you need design and accessibility control.

### Handle `prompt()` cancellation

Always remember:

```js
prompt(...) === null
```

is possible.

### Convert input explicitly

If you need a number:

```js
Number(input)
```

### Do not treat dialogs as security

A browser dialog does not enforce permissions or authentication.

### Avoid excessive blocking interactions

Repeated native dialogs can create a poor user experience.

### Prefer state-driven UI in React

Instead of:

```js
confirm("Delete?");
```

consider rendering a React confirmation component when the application requires richer behavior.

---

# 70. Final Mental Model

Think of the three dialog methods this way:

```text
alert()
│
├── Inform the user
├── Blocks execution while open
└── Returns undefined


confirm()
│
├── Ask for confirmation
├── Blocks execution while open
└── Returns true or false


prompt()
│
├── Ask for text
├── Blocks execution while open
└── Returns string or null
```

The key distinction is:

> Native dialog methods are simple browser-controlled, synchronous interaction APIs. They are useful for learning and small scripts, but modern applications usually need state-driven UI components that provide greater control, accessibility, and design flexibility.

For React and Next.js development, understanding these APIs is useful not because you will use them everywhere, but because they clearly demonstrate the difference between **imperative browser APIs** and **declarative application UI**.
