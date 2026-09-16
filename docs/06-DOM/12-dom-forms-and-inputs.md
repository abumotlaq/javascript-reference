# DOM Forms and Inputs

HTML forms provide a structured way for users to enter and submit data.

JavaScript can interact with forms and form controls to:

* Read user input.
* Validate data.
* Respond to input changes.
* Prevent default form submission.
* Submit forms programmatically.
* Reset form controls.
* Work with checkboxes, radio buttons, selects, and text fields.
* Access form data.
* Handle keyboard and mouse interactions.
* Build interactive forms without reloading the page.

Understanding DOM forms is especially important before learning how forms are handled in **React**.

---

# 1. Basic Form Structure

A simple HTML form looks like this:

```html
<form id="profile-form">
  <label for="name">Name</label>

  <input
    id="name"
    name="name"
    type="text"
  />

  <button type="submit">
    Submit
  </button>
</form>
```

The main elements are:

```text
<form>
    ↓
form controls
    ↓
<input>
<select>
<textarea>
<button>
```

The `<form>` element groups related controls into one submission unit.

---

# 2. Selecting a Form

You can select a form using:

```javascript
const form = document.querySelector("#profile-form");
```

You can also access forms through:

```javascript
document.forms
```

For example:

```javascript
console.log(document.forms);
```

This returns the collection of forms in the document.

---

# 3. Selecting a Form by Name

If the form has a `name` attribute:

```html
<form name="profile">
  ...
</form>
```

you can access it through:

```javascript
const form = document.forms.profile;
```

You can also use:

```javascript
const form = document.forms["profile"];
```

However, `querySelector()` is often clearer when you already have a stable selector.

---

# 4. The `submit` Event

The most important event for a form is:

```javascript
submit
```

Example:

```javascript
const form = document.querySelector("#profile-form");

form.addEventListener("submit", (event) => {
  console.log("Form submitted");
});
```

The `submit` event occurs when the form is submitted.

---

# 5. Preventing the Default Submission

By default, submitting a form can cause the browser to navigate or reload the page.

You can prevent that behavior:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Form submission handled by JavaScript");
});
```

The important distinction is:

```javascript
event.preventDefault();
```

does **not** stop event propagation.

It prevents the browser's default action.

---

# 6. Why `preventDefault()` Is Important

Without:

```javascript
event.preventDefault();
```

a normal form submission might cause:

```text
User submits form
      ↓
Browser performs default submission
      ↓
Navigation / request
      ↓
Page may reload
```

With:

```javascript
event.preventDefault();
```

you can handle the submission yourself:

```text
User submits form
      ↓
submit event
      ↓
preventDefault()
      ↓
Read data
      ↓
Validate
      ↓
Send using fetch()
```

This is the basic pattern behind many JavaScript-powered forms.

---

# 7. Reading an Input Value

Consider:

```html
<input
  id="name"
  type="text"
>
```

Select it:

```javascript
const nameInput = document.querySelector("#name");
```

Read its current value:

```javascript
console.log(nameInput.value);
```

If the user enters:

```text
Osama Abu Motlaq
```

then:

```javascript
nameInput.value
```

returns:

```text
"Osama Abu Motlaq"
```

---

# 8. The `value` Property

Form controls usually expose their current value through:

```javascript
element.value
```

Example:

```javascript
const input = document.querySelector("#name");

console.log(input.value);
```

The important concept is:

```text
HTML attribute
      ≠
Current DOM property
```

For form controls, `.value` represents the current value.

---

# 9. `value` Attribute vs `value` Property

Consider:

```html
<input
  id="name"
  value="Osama Abu Motlaq"
>
```

The HTML contains an initial value.

JavaScript can read:

```javascript
input.getAttribute("value");
```

which represents the HTML attribute.

But:

```javascript
input.value;
```

represents the current live value.

If the user changes the input:

```text
HTML attribute:
Osama Abu Motlaq

Current value:
whatever the user entered
```

This distinction is important when working with forms.

---

# 10. Changing an Input Value

You can change the current value:

```javascript
input.value = "Osama Abu Motlaq";
```

This changes the DOM control's current value.

It does not necessarily change the HTML attribute:

```javascript
input.getAttribute("value");
```

This demonstrates again that:

```text
attribute
    ↓
initial/default configuration

property
    ↓
current live state
```

---

# 11. Text Inputs

A basic text input:

```html
<input
  id="name"
  name="name"
  type="text"
>
```

Read its value:

```javascript
const input = document.querySelector("#name");

console.log(input.value);
```

Set its value:

```javascript
input.value = "Osama Abu Motlaq";
```

---

# 12. The `input` Event

The `input` event fires when the user changes the value of an input control.

Example:

```javascript
input.addEventListener("input", (event) => {
  console.log(event.target.value);
});
```

As the user types:

```text
O
Os
Osa
Osam
Osama
...
```

the handler can run repeatedly.

This is useful for:

* Live validation.
* Search fields.
* Character counters.
* Live previews.
* Filtering.
* Formatting.

---

# 13. `input` vs `change`

These events are related but different.

### `input`

Usually fires as the value changes.

```javascript
input.addEventListener("input", handler);
```

### `change`

Fires when the control's value is committed/changed according to that control's behavior.

```javascript
input.addEventListener("change", handler);
```

For a text input, `input` is commonly used when you need immediate feedback while the user types.

---

# 14. Example: Live Character Count

HTML:

```html
<input id="message" type="text">
<p id="count">0</p>
```

JavaScript:

```javascript
const message = document.querySelector("#message");
const count = document.querySelector("#count");

message.addEventListener("input", () => {
  count.textContent = message.value.length;
});
```

If the user enters:

```text
Hello
```

the counter becomes:

```text
5
```

---

# 15. Reading Form Data

Suppose:

```html
<form id="profile-form">
  <input
    name="name"
    type="text"
  >

  <input
    name="email"
    type="email"
  >

  <button type="submit">
    Save
  </button>
</form>
```

You can manually read the values:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;

  console.log(name);
  console.log(email);
});
```

This works, but there is a more convenient API.

---

# 16. `FormData`

The `FormData` API collects successful form controls into key-value pairs.

Example:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log(formData);
});
```

You can retrieve a value:

```javascript
const name = formData.get("name");
```

And:

```javascript
const email = formData.get("email");
```

---

# 17. Why `name` Matters

Consider:

```html
<input
  id="name"
  type="text"
>
```

The input has an `id`, but no `name`.

`FormData` does not use `id` as the submission key.

Instead, use:

```html
<input
  id="name"
  name="name"
  type="text"
>
```

Now:

```javascript
formData.get("name");
```

can retrieve the value.

Think:

```text
id
→ primarily identifies the element in the document

name
→ identifies the form field in submitted form data
```

---

# 18. Converting `FormData` to an Object

You can convert entries into an object:

```javascript
const data = Object.fromEntries(
  new FormData(form)
);

console.log(data);
```

For example:

```text
{
  name: "Osama Abu Motlaq",
  email: "example@example.com"
}
```

This is convenient when working with APIs.

Be careful with file inputs, because their values may be `File` objects rather than ordinary strings.

---

# 19. `FormData.get()`

Retrieve the first value associated with a key:

```javascript
const name = formData.get("name");
```

If no matching field exists:

```javascript
formData.get("unknown");
```

returns:

```javascript
null
```

---

# 20. `FormData.getAll()`

If multiple controls use the same name:

```html
<input name="skills" value="JavaScript">
<input name="skills" value="React">
```

then:

```javascript
formData.getAll("skills");
```

returns:

```javascript
[
  "JavaScript",
  "React"
]
```

This is useful for:

* Checkboxes.
* Multi-select controls.
* Repeated fields.

---

# 21. `FormData.has()`

Check whether a field exists:

```javascript
if (formData.has("email")) {
  console.log("Email exists");
}
```

---

# 22. `FormData.entries()`

You can iterate through form data:

```javascript
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
```

Example output:

```text
name Osama Abu Motlaq
email example@example.com
```

---

# 23. `FormData.keys()`

Get field names:

```javascript
for (const key of formData.keys()) {
  console.log(key);
}
```

---

# 24. `FormData.values()`

Get field values:

```javascript
for (const value of formData.values()) {
  console.log(value);
}
```

---

# 25. Checkbox Inputs

HTML:

```html
<label>
  <input
    id="terms"
    name="terms"
    type="checkbox"
  >
  Accept terms
</label>
```

Read whether it is checked:

```javascript
const terms = document.querySelector("#terms");

console.log(terms.checked);
```

The result is:

```javascript
true
```

or:

```javascript
false
```

The important property is:

```javascript
checked
```

---

# 26. Checkbox State

You can change the checked state:

```javascript
terms.checked = true;
```

or:

```javascript
terms.checked = false;
```

This controls the current state of the checkbox.

---

# 27. Checkbox Form Data

A checked checkbox can contribute to `FormData`.

Example:

```html
<input
  name="terms"
  type="checkbox"
  value="accepted"
>
```

If checked:

```javascript
formData.get("terms");
```

returns:

```text
"accepted"
```

If unchecked, the control is generally not included as a successful form control.

This is important when processing submitted data.

---

# 28. Multiple Checkboxes

Example:

```html
<label>
  <input
    type="checkbox"
    name="skills"
    value="JavaScript"
  >
  JavaScript
</label>

<label>
  <input
    type="checkbox"
    name="skills"
    value="React"
  >
  React
</label>

<label>
  <input
    type="checkbox"
    name="skills"
    value="Next.js"
  >
  Next.js
</label>
```

If the user selects JavaScript and React:

```javascript
const skills = formData.getAll("skills");
```

Result:

```javascript
[
  "JavaScript",
  "React"
]
```

---

# 29. Radio Buttons

Radio buttons allow the user to choose one option from a group.

Example:

```html
<label>
  <input
    type="radio"
    name="experience"
    value="beginner"
  >
  Beginner
</label>

<label>
  <input
    type="radio"
    name="experience"
    value="intermediate"
  >
  Intermediate
</label>

<label>
  <input
    type="radio"
    name="experience"
    value="advanced"
  >
  Advanced
</label>
```

The shared:

```html
name="experience"
```

groups the radio buttons.

Only one can normally be selected within that group.

---

# 30. Reading a Radio Button

You can find the checked radio button:

```javascript
const selected = form.querySelector(
  'input[name="experience"]:checked'
);
```

Then:

```javascript
console.log(selected?.value);
```

Optional chaining prevents an error if nothing is selected.

---

# 31. Radio Buttons and `FormData`

If a radio button is selected:

```javascript
const experience = formData.get("experience");
```

might return:

```text
"intermediate"
```

If none is selected, there may be no corresponding form entry.

---

# 32. Select Elements

HTML:

```html
<select id="role" name="role">
  <option value="frontend">
    Frontend Developer
  </option>

  <option value="backend">
    Backend Developer
  </option>

  <option value="fullstack">
    Full Stack Developer
  </option>
</select>
```

Read the selected value:

```javascript
const role = document.querySelector("#role");

console.log(role.value);
```

If the selected option is:

```html
<option value="frontend">
```

then:

```javascript
role.value
```

is:

```text
"frontend"
```

---

# 33. Selected Option

You can access the selected option:

```javascript
const option = role.selectedOptions[0];

console.log(option.textContent);
console.log(option.value);
```

For example:

```text
Frontend Developer
frontend
```

---

# 34. Multiple Select

A `<select>` can allow multiple selections:

```html
<select
  id="skills"
  name="skills"
  multiple
>
  <option value="javascript">
    JavaScript
  </option>

  <option value="react">
    React
  </option>

  <option value="nextjs">
    Next.js
  </option>
</select>
```

You can inspect:

```javascript
const skills = document.querySelector("#skills");

console.log(skills.selectedOptions);
```

You can convert them to values:

```javascript
const values = Array.from(skills.selectedOptions)
  .map((option) => option.value);
```

---

# 35. Textarea

A `<textarea>` is used for multi-line text.

```html
<textarea
  id="message"
  name="message"
></textarea>
```

Read the current value:

```javascript
const message = document.querySelector("#message");

console.log(message.value);
```

Set the value:

```javascript
message.value = "Hello from Osama Abu Motlaq";
```

The current value is represented by:

```javascript
message.value
```

---

# 36. Input Types

HTML provides many input types:

```html
<input type="text">
<input type="email">
<input type="password">
<input type="number">
<input type="date">
<input type="time">
<input type="url">
<input type="search">
<input type="tel">
<input type="checkbox">
<input type="radio">
<input type="file">
```

JavaScript accesses many of them through the same general interface:

```javascript
input.value
```

But some controls have specialized properties and behavior.

---

# 37. Email Input

HTML:

```html
<input
  name="email"
  type="email"
>
```

The browser can provide built-in validation for email-like input.

You can inspect:

```javascript
input.validity
```

and:

```javascript
input.checkValidity();
```

---

# 38. Number Inputs

HTML:

```html
<input
  id="age"
  name="age"
  type="number"
>
```

The `.value` property is still a string:

```javascript
console.log(typeof age.value);
```

usually:

```text
string
```

If you need a number:

```javascript
const value = Number(age.value);
```

Do not assume:

```javascript
input.value
```

automatically gives you a JavaScript `number`.

---

# 39. Password Inputs

```html
<input
  name="password"
  type="password"
>
```

JavaScript can read:

```javascript
password.value
```

However, never log sensitive passwords:

```javascript
console.log(password.value);
```

Avoid exposing sensitive form values in:

* Console logs.
* URLs.
* Error messages.
* Analytics.
* Client-side storage without a legitimate reason.

---

# 40. File Inputs

HTML:

```html
<input
  id="avatar"
  name="avatar"
  type="file"
>
```

The selected files are available through:

```javascript
const files = avatar.files;
```

This is a `FileList`.

You can access the first file:

```javascript
const file = avatar.files[0];
```

Then inspect:

```javascript
console.log(file.name);
console.log(file.size);
console.log(file.type);
```

---

# 41. File Inputs and FormData

`FormData` can include files:

```javascript
const formData = new FormData(form);

const file = formData.get("avatar");
```

The result can be a `File` object.

This makes `FormData` useful when sending forms containing uploaded files.

---

# 42. Required Fields

HTML:

```html
<input
  name="email"
  type="email"
  required
>
```

The `required` attribute tells the browser that the field must contain a value for normal form validation to succeed.

JavaScript can inspect:

```javascript
input.required
```

---

# 43. `checkValidity()`

You can check whether a form control satisfies its built-in constraints:

```javascript
const valid = input.checkValidity();

console.log(valid);
```

Result:

```javascript
true
```

or:

```javascript
false
```

You can also check the entire form:

```javascript
const valid = form.checkValidity();
```

---

# 44. `reportValidity()`

You can ask the browser to report validation errors:

```javascript
form.reportValidity();
```

The browser can display its built-in validation UI.

---

# 45. The `validity` Property

Form controls expose a:

```javascript
input.validity
```

object.

It contains information such as:

```javascript
input.validity.valid
input.validity.valueMissing
input.validity.typeMismatch
input.validity.tooShort
input.validity.tooLong
input.validity.rangeUnderflow
input.validity.rangeOverflow
```

For example:

```javascript
if (input.validity.valueMissing) {
  console.log("A value is required");
}
```

---

# 46. Custom Validation

You can use:

```javascript
input.setCustomValidity("Invalid value");
```

Then:

```javascript
input.checkValidity();
```

returns:

```javascript
false
```

To clear the custom error:

```javascript
input.setCustomValidity("");
```

Important:

> Custom validity messages should be cleared when the value becomes valid.

---

# 47. Form Submission and Validation

When a form is submitted normally, browser constraint validation can occur before the `submit` event is dispatched.

For example:

```html
<input
  name="email"
  type="email"
  required
>
```

If the field is invalid, the browser may prevent normal submission and show validation feedback.

JavaScript can also use:

```javascript
form.checkValidity();
```

or:

```javascript
form.reportValidity();
```

when appropriate.

---

# 48. `novalidate`

A form can disable built-in browser validation:

```html
<form
  id="profile-form"
  novalidate
>
```

This means the browser will not perform its normal constraint validation before submission.

This is sometimes useful when an application wants to implement its own validation system.

However, disabling native validation means you must provide appropriate validation behavior yourself.

---

# 49. Resetting a Form

You can reset a form using:

```javascript
form.reset();
```

Example:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Process form...

  form.reset();
});
```

This restores controls to their default values.

---

# 50. The `reset` Event

Forms also have a:

```javascript
reset
```

event.

```javascript
form.addEventListener("reset", () => {
  console.log("Form reset");
});
```

Calling:

```javascript
form.reset();
```

can trigger the reset process and associated event behavior.

---

# 51. Submit Buttons

A button inside a form can have different types.

```html
<button type="submit">
  Submit
</button>
```

This submits the form.

A normal button can be:

```html
<button type="button">
  Open
</button>
```

And:

```html
<button type="reset">
  Reset
</button>
```

resets the form.

---

# 52. Why `type="button"` Matters

Consider:

```html
<form>
  <button>
    Open Menu
  </button>
</form>
```

A `<button>` inside a form defaults to submit behavior in HTML unless a different type is specified.

So if the button is not intended to submit the form, write:

```html
<button type="button">
  Open Menu
</button>
```

This prevents accidental form submission.

---

# 53. Submit Button vs Form Submission

The user can submit a form through more than clicking a visible submit button.

For example:

* Clicking a submit button.
* Using keyboard interaction.
* Calling form submission APIs.

Therefore, application logic should generally listen to:

```javascript
form.addEventListener("submit", handler);
```

rather than only:

```javascript
button.addEventListener("click", handler);
```

The form's `submit` event represents the actual form submission.

---

# 54. `requestSubmit()`

You can programmatically request form submission:

```javascript
form.requestSubmit();
```

This behaves more like a real user submission and participates in form validation and submission events.

You can optionally provide a submitter:

```javascript
form.requestSubmit(submitButton);
```

---

# 55. `submit()` vs `requestSubmit()`

These methods are different.

```javascript
form.submit();
```

directly submits the form and does not trigger the normal `submit` event or constraint validation in the same way.

By contrast:

```javascript
form.requestSubmit();
```

acts more like an actual submission request:

```text
validation
    ↓
submit event
    ↓
submission
```

Therefore, when you want normal form submission behavior, `requestSubmit()` is often the more appropriate API.

---

# 56. Form Controls Collection

A form exposes its controls through:

```javascript
form.elements
```

Example:

```javascript
console.log(form.elements);
```

This includes form-associated controls such as:

* `<input>`
* `<button>`
* `<select>`
* `<textarea>`
* `<fieldset>`

You can access a named control:

```javascript
form.elements.email
```

if the control has:

```html
name="email"
```

---

# 57. Example Using `form.elements`

```javascript
const nameInput = form.elements.name;
const emailInput = form.elements.email;

console.log(nameInput.value);
console.log(emailInput.value);
```

This can be cleaner than repeatedly calling:

```javascript
form.querySelector(...)
```

when you already have named form controls.

---

# 58. Labels

A label should be associated with its form control.

Example:

```html
<label for="name">
  Name
</label>

<input
  id="name"
  name="name"
  type="text"
>
```

The relationship is:

```text
label[for="name"]
        ↓
input#name
```

Clicking the label can activate the associated input.

This is important for accessibility and usability.

---

# 59. Form Accessibility

Good forms should include:

* Proper `<label>` elements.
* Meaningful `name` attributes.
* Appropriate input types.
* Clear validation messages.
* Semantic buttons.
* Correct grouping for radio buttons.
* Appropriate keyboard behavior.

Example:

```html
<label for="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
  required
>
```

This is more meaningful than:

```html
<input type="text">
```

with no label or name.

---

# 60. `focus()`

You can programmatically focus a control:

```javascript
emailInput.focus();
```

Useful for:

* Form validation.
* Search interfaces.
* Dialogs.
* Keyboard workflows.

---

# 61. `blur()`

You can remove focus:

```javascript
emailInput.blur();
```

The corresponding DOM event is:

```javascript
blur
```

---

# 62. Focus Events

Common focus events include:

```text
focus
blur
focusin
focusout
```

Remember:

```text
focus / blur
→ do not normally bubble

focusin / focusout
→ bubble
```

This distinction becomes important when using event delegation.

---

# 63. Form Input Event Flow

A common form interaction looks like:

```text
User types
    ↓
input event
    ↓
Read input.value
    ↓
Validate / update UI

User submits
    ↓
submit event
    ↓
preventDefault()
    ↓
Read FormData
    ↓
Validate
    ↓
Send data
```

This is a useful mental model for JavaScript forms.

---

# 64. Complete Form Example

HTML:

```html
<form id="profile-form">
  <div>
    <label for="name">
      Name
    </label>

    <input
      id="name"
      name="name"
      type="text"
      required
    >
  </div>

  <div>
    <label for="email">
      Email
    </label>

    <input
      id="email"
      name="email"
      type="email"
      required
    >
  </div>

  <div>
    <label for="message">
      Message
    </label>

    <textarea
      id="message"
      name="message"
      required
    ></textarea>
  </div>

  <button type="submit">
    Send
  </button>
</form>
```

JavaScript:

```javascript
const form = document.querySelector("#profile-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  console.log(data);
});
```

If the user enters:

```text
Name:
Osama Abu Motlaq

Email:
example@example.com

Message:
Hello
```

the resulting object is conceptually:

```javascript
{
  name: "Osama Abu Motlaq",
  email: "example@example.com",
  message: "Hello"
}
```

---

# 65. Adding Client-Side Validation

You can validate before sending:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log(data);
});
```

The browser's built-in constraints handle part of the validation.

Application-specific rules may require additional JavaScript validation.

---

# 66. Sending Form Data With `fetch()`

You can send JSON:

```javascript
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  console.log("Form submitted");
});
```

The flow becomes:

```text
Form
 ↓
FormData
 ↓
Object
 ↓
JSON
 ↓
fetch()
 ↓
Server/API
```

---

# 67. Sending `FormData` Directly

You do not always need to convert `FormData` to JSON.

You can send it directly:

```javascript
const formData = new FormData(form);

await fetch("/api/contact", {
  method: "POST",
  body: formData
});
```

This is especially useful for file uploads.

When sending `FormData` directly, do not manually set:

```http
Content-Type: multipart/form-data
```

The browser needs to generate the correct multipart boundary automatically.

---

# 68. Form Validation vs Server Validation

Client-side validation is useful for user experience.

But it is not a security boundary.

For example:

```javascript
if (!emailInput.checkValidity()) {
  return;
}
```

does not mean the server can trust the submitted email.

A malicious client can bypass browser validation entirely.

Therefore:

```text
Client validation
→ usability

Server validation
→ trust boundary
```

Server-side validation is still required.

---

# 69. React Connection

DOM forms are highly relevant to React.

In plain JavaScript:

```javascript
input.value
```

reads the current DOM value.

In React, you often use state:

```jsx
const [name, setName] = useState("");
```

and:

```jsx
<input
  value={name}
  onChange={(event) => {
    setName(event.target.value);
  }}
/>
```

The conceptual difference is:

```text
Vanilla JavaScript
DOM → source of current value

React controlled input
React state → source of truth
```

Understanding normal DOM forms makes React forms much easier to understand.

---

# 70. React Controlled Inputs

A controlled React input:

```jsx
<input
  value={name}
  onChange={(event) => {
    setName(event.target.value);
  }}
/>
```

The flow is:

```text
User types
    ↓
onChange
    ↓
event.target.value
    ↓
setName(...)
    ↓
React state updates
    ↓
React renders
    ↓
input receives new value
```

The DOM concept:

```javascript
event.target.value
```

is therefore directly relevant to React.

---

# 71. React Uncontrolled Inputs

React can also use the DOM as the source of the current value:

```jsx
const inputRef = useRef(null);
```

Then:

```jsx
<input ref={inputRef} />
```

and:

```javascript
console.log(inputRef.current.value);
```

This approach is called an **uncontrolled input**.

Libraries such as React Hook Form also make extensive use of uncontrolled form patterns for performance and ergonomics.

---

# 72. Next.js Connection

Forms are common in Next.js applications.

A form may:

```text
Client Component
      ↓
Form interaction
      ↓
Validation
      ↓
Server Action / API route / Route Handler
      ↓
Database
```

The browser-side concepts remain the same:

```javascript
event.preventDefault()
event.target
input.value
FormData
```

Next.js adds server-side mechanisms for processing the submitted data.

---

# 73. Common Mistakes

## Mistake 1: Listening Only to the Submit Button

Avoid:

```javascript
button.addEventListener("click", handleSubmit);
```

for form submission logic.

Prefer:

```javascript
form.addEventListener("submit", handleSubmit);
```

because a form can be submitted through keyboard interactions and other submission mechanisms.

---

## Mistake 2: Forgetting `preventDefault()`

If you intend to handle the form entirely with JavaScript:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

---

## Mistake 3: Forgetting `name`

This:

```html
<input id="email">
```

does not provide a useful `FormData` field named `email`.

Prefer:

```html
<input
  id="email"
  name="email"
>
```

---

## Mistake 4: Assuming `.value` Is Always a Number

For:

```html
<input type="number">
```

the `.value` property is still generally a string.

Convert explicitly:

```javascript
const age = Number(input.value);
```

---

## Mistake 5: Reading an Unchecked Checkbox as Normal Form Data

An unchecked checkbox is generally not included in submitted form data.

Check:

```javascript
checkbox.checked
```

when you need its current boolean state.

---

## Mistake 6: Using `submit()` When You Need Normal Submission Behavior

If you need validation and the normal `submit` event:

```javascript
form.requestSubmit();
```

is generally more appropriate than:

```javascript
form.submit();
```

---

## Mistake 7: Trusting Client-Side Validation

Never treat:

```javascript
form.checkValidity()
```

as security validation.

The server must validate submitted data.

---

## Mistake 8: Logging Sensitive Values

Avoid logging:

```javascript
password.value
```

or other sensitive information unnecessarily.

---

# 74. Best Practices

### 1. Listen to the form's `submit` event

```javascript
form.addEventListener("submit", handler);
```

---

### 2. Give controls meaningful `name` attributes

```html
<input
  name="email"
>
```

---

### 3. Use semantic input types

Prefer:

```html
<input type="email">
```

over:

```html
<input type="text">
```

when appropriate.

---

### 4. Use labels

```html
<label for="email">
  Email
</label>
```

---

### 5. Use `FormData` for form serialization

```javascript
const formData = new FormData(form);
```

---

### 6. Validate on both client and server

```text
Client
→ user experience

Server
→ authoritative validation
```

---

### 7. Use `type="button"` for non-submit buttons

```html
<button type="button">
```

---

### 8. Do not manually set the multipart content type when sending `FormData`

Let the browser create the correct boundary.

---

### 9. Avoid unnecessary direct DOM manipulation in React

In React, normally use:

```jsx
value
onChange
state
```

instead of manually changing:

```javascript
input.value
```

for controlled components.

---

# 75. Quick Reference

## Select a form

```javascript
const form = document.querySelector("#profile-form");
```

## Submit event

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

## Read input

```javascript
input.value;
```

## Change input

```javascript
input.value = "Osama Abu Motlaq";
```

## Input event

```javascript
input.addEventListener("input", (event) => {
  console.log(event.target.value);
});
```

## Checkbox state

```javascript
checkbox.checked;
```

## Select value

```javascript
select.value;
```

## Selected options

```javascript
select.selectedOptions;
```

## Form controls

```javascript
form.elements;
```

## Form data

```javascript
const formData = new FormData(form);
```

## Read form field

```javascript
formData.get("name");
```

## Read repeated fields

```javascript
formData.getAll("skills");
```

## Convert to object

```javascript
Object.fromEntries(formData);
```

## Check validity

```javascript
form.checkValidity();
```

## Display validation UI

```javascript
form.reportValidity();
```

## Reset form

```javascript
form.reset();
```

## Programmatic normal submission

```javascript
form.requestSubmit();
```

## Focus

```javascript
input.focus();
```

## Remove focus

```javascript
input.blur();
```

---

# 76. Important Form Events

| Event      | Purpose                                                         |
| ---------- | --------------------------------------------------------------- |
| `input`    | Fires as the value changes                                      |
| `change`   | Fires when a value change is committed according to the control |
| `submit`   | Form submission                                                 |
| `reset`    | Form reset                                                      |
| `focus`    | Element receives focus                                          |
| `blur`     | Element loses focus                                             |
| `focusin`  | Focus enters an element; bubbles                                |
| `focusout` | Focus leaves an element; bubbles                                |

---

# 77. Important Form Properties

| Property           | Purpose                         |
| ------------------ | ------------------------------- |
| `.value`           | Current value                   |
| `.checked`         | Current checkbox/radio state    |
| `.selectedOptions` | Selected `<option>` elements    |
| `.files`           | Selected files                  |
| `.required`        | Whether the control is required |
| `.validity`        | Constraint validation state     |
| `.form`            | Associated form                 |
| `.elements`        | Form controls collection        |

---

# 78. Important Form Methods

| Method                      | Purpose                                                          |
| --------------------------- | ---------------------------------------------------------------- |
| `form.checkValidity()`      | Checks form validity                                             |
| `form.reportValidity()`     | Checks and reports validation errors                             |
| `form.reset()`              | Resets controls                                                  |
| `form.requestSubmit()`      | Requests normal form submission                                  |
| `form.submit()`             | Directly submits without normal submit-event/validation behavior |
| `input.checkValidity()`     | Checks one control                                               |
| `input.setCustomValidity()` | Sets a custom validation message                                 |
| `input.focus()`             | Gives focus                                                      |
| `input.blur()`              | Removes focus                                                    |

---

# 79. Form Data Mental Model

Think about a form as two related systems:

```text
HTML
 ↓
Form controls
 ↓
Current DOM state
 ↓
FormData
 ↓
Submitted data
```

For example:

```html
<input
  name="name"
  value="Osama Abu Motlaq"
>
```

becomes:

```text
name
 ↓
Osama Abu Motlaq
```

through:

```javascript
const formData = new FormData(form);
```

---

# 80. Complete Mental Model

A typical JavaScript form can be understood as:

```text
                  FORM
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
    input       checkbox     select
       │           │           │
       └───────────┼───────────┘
                   ↓
             User interaction
                   ↓
              input/change
                   ↓
               Validation
                   ↓
                submit
                   ↓
           preventDefault()
                   ↓
               FormData
                   ↓
            Transform / Validate
                   ↓
                fetch()
                   ↓
                Server
```

For React:

```text
User input
    ↓
React event handler
    ↓
event.target.value
    ↓
State
    ↓
Render
```

The underlying DOM concepts are still present.

---

# 81. Final Takeaways

* A `<form>` groups related form controls and provides a standard submission mechanism.
* Handle form submission with the form's `submit` event rather than relying only on a button's `click` event.
* `event.preventDefault()` prevents the browser's default submission behavior.
* `.value` represents the current value of many form controls.
* `.checked` represents the current state of checkboxes and radio buttons.
* `input` is useful for responding immediately as a value changes.
* `change` represents a committed value change according to the control's behavior.
* `name` is important because it identifies fields in form submission data.
* `FormData` provides a convenient way to collect form controls.
* `FormData.get()` retrieves one value.
* `FormData.getAll()` retrieves multiple values with the same name.
* `Object.fromEntries()` can convert simple form data into an object.
* `type="number"` does not mean `.value` automatically becomes a JavaScript number.
* Unchecked checkboxes are generally excluded from form submission data.
* `checkValidity()` and `reportValidity()` provide access to native constraint validation.
* Client-side validation improves UX but cannot replace server-side validation.
* `requestSubmit()` is different from `submit()` and better represents a normal form submission.
* `type="button"` should be used for buttons inside forms that should not submit the form.
* `FormData` is particularly useful when forms contain file uploads.
* In React, understanding `value`, `onChange`, `event.target.value`, and controlled vs uncontrolled inputs depends on understanding the underlying DOM form model.
* In Next.js, these browser-side concepts remain important when building interactive forms and sending data to server-side logic.

The core mental model is:

```text
FORM
 ↓
USER INPUT
 ↓
DOM VALUE
 ↓
VALIDATION
 ↓
SUBMIT EVENT
 ↓
FORMDATA
 ↓
SERVER / API
```

And for React:

```text
USER INPUT
 ↓
EVENT
 ↓
STATE
 ↓
RENDER
```

Understanding this DOM model gives you the foundation needed to understand **React forms, controlled inputs, uncontrolled inputs, form validation, and form libraries** rather than treating them as unrelated React-specific features.
