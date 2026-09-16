# Default Parameters

**Default parameters** allow a function parameter to automatically receive a default value when the caller does not provide a value, or explicitly provides `undefined`.

They make functions safer and easier to use because the function can define sensible fallback values directly in its parameter list.

Basic syntax:

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}`;
}
```

Calling:

```js
console.log(greet());
```

Output:

```text
Hello, Osama Abu Motlaq
```

The key idea is:

> A default parameter is used when the corresponding argument is `undefined`.

---

# 1. Why Default Parameters Exist

Without default parameters, you might write:

```js
function greet(name) {
  if (name === undefined) {
    name = "Osama Abu Motlaq";
  }

  return `Hello, ${name}`;
}
```

This works, but the function contains extra initialization logic.

With a default parameter:

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}`;
}
```

The intention is immediately visible:

```text
name
 ↓
provided?
 ↓
No / undefined
 ↓
use default
```

This is one reason default parameters improve function readability.

---

# 2. Basic Syntax

The syntax is:

```js
function functionName(parameter = defaultValue) {
  // function body
}
```

Example:

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}`;
}
```

If an argument is provided:

```js
console.log(greet("Osama Abu Motlaq"));
```

The provided value is used.

If no argument is provided:

```js
console.log(greet());
```

The default value is used.

---

# 3. Default Parameters Are Used for `undefined`

This is the most important rule.

```js
function greet(name = "Osama Abu Motlaq") {
  return name;
}
```

Calling:

```js
greet();
```

uses the default.

Calling:

```js
greet(undefined);
```

also uses the default.

Conceptually:

```js
name = undefined
```

causes:

```js
name = "Osama Abu Motlaq"
```

---

# 4. `null` Does Not Trigger the Default

`null` is different from `undefined`.

```js
function greet(name = "Osama Abu Motlaq") {
  return name;
}
```

Now:

```js
console.log(greet(null));
```

Output:

```text
null
```

The default is not used.

The rule is:

```text
undefined → default value
null      → null
```

This distinction is extremely important when working with APIs, databases, forms, and React state.

---

# 5. Other Falsy Values Do Not Trigger Defaults

Default parameters do not activate for every falsy value.

Consider:

```js
function showValue(value = "Default") {
  return value;
}
```

These values are still used:

```js
showValue(false);
showValue(0);
showValue("");
showValue(null);
```

Results:

```text
false
0
""
null
```

Only:

```js
showValue(undefined);
```

produces:

```text
Default
```

Therefore:

> Default parameters are based on `undefined`, not general truthiness.

---

# 6. Default Parameter vs `||`

These two patterns are not equivalent.

### Default parameter

```js
function example(value = 10) {
  return value;
}
```

Calling:

```js
example(0);
```

returns:

```text
0
```

### Logical OR

```js
function example(value) {
  return value || 10;
}
```

Calling:

```js
example(0);
```

returns:

```text
10
```

Why?

Because `0` is falsy.

The `||` operator replaces any falsy value:

```text
false
0
""
null
undefined
NaN
```

Default parameters replace only:

```text
undefined
```

---

# 7. Default Parameter vs `??`

Nullish coalescing (`??`) is closer to default parameters, but there is still an important difference.

```js
function example(value = 10) {
  return value;
}
```

With:

```js
example(null);
```

the result is:

```text
null
```

But:

```js
function example(value) {
  return value ?? 10;
}
```

with:

```js
example(null);
```

returns:

```text
10
```

Why?

Because `??` treats both:

```text
null
undefined
```

as missing values.

Default parameters treat only:

```text
undefined
```

as missing.

---

# 8. Comparison: Default, `||`, and `??`

Consider:

```js
const values = [
  undefined,
  null,
  0,
  false,
  "",
  "JavaScript"
];
```

### Default parameter

```js
function withDefault(value = "Default") {
  return value;
}
```

### `||`

```js
function withOr(value) {
  return value || "Default";
}
```

### `??`

```js
function withNullish(value) {
  return value ?? "Default";
}
```

The behavior differs:

| Input | `value = "Default"` | `value || "Default"` | `value ?? "Default"` |
|---|---|---|---|
| `undefined` | Default | Default | Default |
| `null` | `null` | Default | Default |
| `0` | `0` | Default | `0` |
| `false` | `false` | Default | `false` |
| `""` | `""` | Default | `""` |
| `"JavaScript"` | JavaScript | JavaScript | JavaScript |

This distinction is worth memorizing.

---

# 9. Multiple Default Parameters

A function can have several default parameters.

```js
function createProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer",
  location = "Gaza"
) {
  return {
    name,
    role,
    location
  };
}
```

Calling:

```js
console.log(createProfile());
```

produces:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
}
```

Each parameter is evaluated independently.

---

# 10. Providing Some Arguments

Suppose:

```js
function createProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer",
  location = "Gaza"
) {
  return {
    name,
    role,
    location
  };
}
```

You can provide only the first two:

```js
createProfile(
  "Osama Abu Motlaq",
  "Full Stack Developer"
);
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Full Stack Developer",
  location: "Gaza"
}
```

The third parameter uses its default.

---

# 11. Skipping a Parameter With `undefined`

JavaScript does not have a special syntax for "skip this positional argument."

You can explicitly pass `undefined`:

```js
function createProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer",
  location = "Gaza"
) {
  return {
    name,
    role,
    location
  };
}
```

To use the default name while providing a different role:

```js
createProfile(
  undefined,
  "Full Stack Developer"
);
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Full Stack Developer",
  location: "Gaza"
}
```

This works, but if a function has many optional parameters, an options object is usually clearer.

---

# 12. Default Parameters Can Use Expressions

The default value does not have to be a simple literal.

For example:

```js
function createId(id = Math.random()) {
  return id;
}
```

The expression is evaluated when the default is needed.

Another example:

```js
function getTimestamp(timestamp = Date.now()) {
  return timestamp;
}
```

Calling:

```js
getTimestamp();
```

uses the current timestamp.

---

# 13. Default Parameters Are Evaluated at Call Time

Consider:

```js
function getTime(time = Date.now()) {
  return time;
}
```

Each call can receive a different default:

```js
console.log(getTime());
console.log(getTime());
```

The expression:

```js
Date.now()
```

is evaluated when the function is called and the parameter is `undefined`.

It is not evaluated once when the function is defined.

---

# 14. Default Parameters Can Reference Earlier Parameters

A default parameter can use a parameter that appears before it.

```js
function createProfile(
  name = "Osama Abu Motlaq",
  message = `Hello, ${name}`
) {
  return message;
}
```

Calling:

```js
console.log(createProfile());
```

Output:

```text
Hello, Osama Abu Motlaq
```

The second default can access the first parameter.

---

# 15. Parameter Order Matters

This works:

```js
function example(
  first = 10,
  second = first + 5
) {
  return second;
}
```

Calling:

```js
console.log(example());
```

Output:

```text
15
```

The second parameter can reference the first because the first parameter has already been initialized.

---

# 16. Later Parameters Cannot Be Referenced Before Initialization

This is problematic:

```js
function example(
  first = second,
  second = 10
) {
  return first;
}
```

Calling:

```js
example();
```

throws a `ReferenceError`.

The parameter:

```js
second
```

has not been initialized when the default for `first` is evaluated.

The rule is:

> Default parameter expressions are evaluated from left to right.

Earlier parameters can be referenced by later parameters.

The reverse is not safely available.

---

# 17. Default Parameters Have Their Own Parameter Scope

Default parameter expressions are evaluated in a special parameter scope before the function body executes.

This can produce behavior that surprises beginners.

For example:

```js
let value = 100;

function example(value = value) {
  return value;
}
```

Calling:

```js
example();
```

does not simply use the outer `value`.

The parameter named `value` shadows the outer binding while its own default is being initialized, resulting in a `ReferenceError`.

A clearer pattern is:

```js
const defaultValue = 100;

function example(value = defaultValue) {
  return value;
}
```

Now the intention is explicit.

---

# 18. Default Parameters and Function Calls

A default value can call another function.

```js
function getDefaultRole() {
  return "Frontend Developer";
}

function createProfile(
  name = "Osama Abu Motlaq",
  role = getDefaultRole()
) {
  return {
    name,
    role
  };
}
```

If the caller does not provide `role`, JavaScript calls:

```js
getDefaultRole()
```

to obtain the default.

---

# 19. Default Parameters Can Be Objects

You can use an object as a default value.

```js
function createProfile(
  profile = {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
  }
) {
  return profile;
}
```

Calling:

```js
createProfile();
```

returns the default object.

However, there is usually a cleaner pattern when you need optional properties:

```js
function createProfile({
  name = "Osama Abu Motlaq",
  role = "Frontend Developer"
} = {}) {
  return {
    name,
    role
  };
}
```

This pattern combines:

* Parameter destructuring
* Default parameter
* Property defaults

It is extremely useful in modern JavaScript.

---

# 20. Why `= {}` Is Important With Destructuring

Consider:

```js
function createProfile({
  name = "Osama Abu Motlaq"
}) {
  return name;
}
```

Calling:

```js
createProfile();
```

throws a `TypeError` because JavaScript cannot destructure `undefined`.

The safer version is:

```js
function createProfile({
  name = "Osama Abu Motlaq"
} = {}) {
  return name;
}
```

Now:

```js
createProfile();
```

works.

The outer:

```js
= {}
```

handles the missing argument.

The inner:

```js
name = "Osama Abu Motlaq"
```

handles the missing property.

These are two different defaults.

---

# 21. Parameter Default vs Property Default

Consider:

```js
function createProfile({
  name = "Osama Abu Motlaq"
} = {}) {
  return name;
}
```

There are two levels.

### Parameter default

```js
= {}
```

means:

> If the entire argument is `undefined`, use an empty object.

### Property default

```js
name = "Osama Abu Motlaq"
```

means:

> If the `name` property is `undefined`, use this value.

For example:

```js
createProfile();
```

uses both defaults.

But:

```js
createProfile({});
```

uses:

```text
parameter → provided object
name      → default
```

And:

```js
createProfile({
  name: "Osama Abu Motlaq"
});
```

uses the provided name.

---

# 22. Default Parameters With Arrays

Defaults can also be arrays.

```js
function createSkills(
  skills = ["JavaScript", "React"]
) {
  return skills;
}
```

Calling:

```js
createSkills();
```

returns:

```js
["JavaScript", "React"]
```

Calling:

```js
createSkills(["Next.js"]);
```

returns:

```js
["Next.js"]
```

The provided argument replaces the default entirely.

---

# 23. Default Arrays Are Created Per Call

Consider:

```js
function createList(items = []) {
  return items;
}
```

Each call that uses the default receives a newly created array.

```js
const first = createList();
const second = createList();

console.log(first === second);
```

Output:

```text
false
```

This is different from using one shared mutable array outside the function.

Default expressions are evaluated when needed.

---

# 24. Default Objects Are Created Per Call

The same applies to objects.

```js
function createProfile(
  profile = {
    name: "Osama Abu Motlaq"
  }
) {
  return profile;
}
```

Then:

```js
const first = createProfile();
const second = createProfile();

console.log(first === second);
```

Output:

```text
false
```

Each default object is created separately.

---

# 25. Default Parameters and Rest Parameters

Default parameters can be combined with rest parameters.

```js
function createProfile(
  name = "Osama Abu Motlaq",
  ...skills
) {
  return {
    name,
    skills
  };
}
```

Calling:

```js
createProfile(
  undefined,
  "JavaScript",
  "React",
  "Next.js"
);
```

produces:

```js
{
  name: "Osama Abu Motlaq",
  skills: [
    "JavaScript",
    "React",
    "Next.js"
  ]
}
```

The default parameter handles the missing first value.

The rest parameter collects the remaining arguments.

---

# 26. Rest Must Still Be Last

This remains invalid:

```js
function example(
  ...values,
  defaultValue = 10
) {}
```

Rest parameters must be last.

Correct:

```js
function example(
  defaultValue = 10,
  ...values
) {}
```

The order of parameter features matters.

---

# 27. Default Parameters and `arguments`

Default parameters affect the relationship between named parameters and the `arguments` object.

For example:

```js
function example(value = 10) {
  console.log(value);
  console.log(arguments[0]);
}
```

Calling:

```js
example();
```

produces:

```text
10
undefined
```

The default value exists for the named parameter:

```js
value
```

but there was still no actual argument supplied.

Modern JavaScript code should generally prefer named parameters and rest parameters over relying on `arguments`.

---

# 28. Default Parameters and Arrow Functions

Arrow functions support default parameters.

```js
const greet = (
  name = "Osama Abu Motlaq"
) => {
  return `Hello, ${name}`;
};

console.log(greet());
```

Output:

```text
Hello, Osama Abu Motlaq
```

The rules are the same as with regular functions.

---

# 29. Default Parameters and Methods

Object methods can use defaults:

```js
const profile = {
  name: "Osama Abu Motlaq",

  introduce(role = "Frontend Developer") {
    return `${this.name} is a ${role}`;
  }
};

console.log(profile.introduce());
```

Output:

```text
Osama Abu Motlaq is a Frontend Developer
```

And:

```js
console.log(
  profile.introduce("Full Stack Developer")
);
```

produces:

```text
Osama Abu Motlaq is a Full Stack Developer
```

Default parameters do not change how `this` works.

---

# 30. Default Parameters and Async Functions

Default parameters also work with async functions:

```js
async function fetchData(
  url = "/api/profile"
) {
  // request logic
}
```

If no URL is provided, the default is used.

The `async` keyword does not change the rules of default parameter initialization.

---

# 31. Default Parameters in React

Default parameters are useful when creating reusable React components.

For example:

```jsx
function Button({
  text = "Submit",
  type = "button"
}) {
  return (
    <button type={type}>
      {text}
    </button>
  );
}
```

Now:

```jsx
<Button />
```

uses:

```text
text → "Submit"
type → "button"
```

While:

```jsx
<Button
  text="Save"
  type="submit"
/>
```

uses the provided values.

This is particularly useful when a component has optional props.

---

# 32. Default Parameters and React Props

A common pattern is:

```jsx
function Profile({
  name = "Osama Abu Motlaq",
  role = "Frontend Developer"
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

The defaults apply when those properties are `undefined`.

This is different from testing the props with `||`.

For example:

```js
const role = props.role || "Frontend Developer";
```

would replace any falsy value.

Parameter destructuring defaults are more precise because they respond specifically to `undefined`.

---

# 33. Default Parameters and React State

Default parameters are not a replacement for React state initialization.

For example:

```js
function createUser(
  name = "Osama Abu Motlaq"
) {
  return {
    name
  };
}
```

The default only applies when the function is called.

React state is different:

```js
const [user, setUser] = useState({
  name: "Osama Abu Motlaq"
});
```

The initial state belongs to the component's state lifecycle.

Do not confuse:

```text
Function parameter default
```

with:

```text
React state initialization
```

They solve different problems.

---

# 34. Default Parameters and API Data

Suppose a function processes API data:

```js
function formatProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer"
) {
  return `${name} - ${role}`;
}
```

If an API returns:

```js
{
  name: undefined,
  role: "Frontend Developer"
}
```

the default name is used.

But if it returns:

```js
{
  name: null,
  role: "Frontend Developer"
}
```

the default is not used.

This distinction matters because APIs and databases may intentionally use `null` to represent missing or unknown data.

---

# 35. Common Mistake: Thinking `null` Uses the Default

Incorrect assumption:

```js
function greet(name = "Osama Abu Motlaq") {
  return name;
}

greet(null);
```

Some beginners expect:

```text
Osama Abu Motlaq
```

Actual result:

```text
null
```

Remember:

```text
undefined → default
null      → provided value
```

---

# 36. Common Mistake: Using `||` When `0` Is Valid

Suppose:

```js
function setPage(page) {
  return page || 1;
}
```

If:

```js
setPage(0);
```

the function returns:

```text
1
```

because `0` is falsy.

If `0` is a valid value, this is wrong.

A default parameter:

```js
function setPage(page = 1) {
  return page;
}
```

preserves:

```js
setPage(0);
```

as:

```text
0
```

---

# 37. Common Mistake: Using Defaults for Validation

This:

```js
function createUser(name = "Osama Abu Motlaq") {
  // ...
}
```

does not validate the argument.

For example:

```js
createUser("");
```

still receives an empty string.

If the application requires a non-empty name, validation is a separate concern:

```js
function createUser(name = "Osama Abu Motlaq") {
  if (name.trim() === "") {
    throw new TypeError("Name cannot be empty.");
  }

  return { name };
}
```

Default values provide fallback behavior.

They do not replace validation.

---

# 38. Common Mistake: Too Many Positional Defaults

This can become difficult to read:

```js
function createProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer",
  location = "Gaza",
  language = "English",
  theme = "dark"
) {
  // ...
}
```

If you want to customize only `theme`, you would need to provide earlier arguments or use `undefined`:

```js
createProfile(
  undefined,
  undefined,
  undefined,
  undefined,
  "light"
);
```

This is a sign that an options object may be better.

For example:

```js
function createProfile({
  name = "Osama Abu Motlaq",
  role = "Frontend Developer",
  location = "Gaza",
  language = "English",
  theme = "dark"
} = {}) {
  // ...
}
```

Now the caller can provide only what matters:

```js
createProfile({
  theme: "light"
});
```

This is much clearer.

---

# 39. Common Mistake: Confusing Parameter Defaults With Destructuring Defaults

These are different:

```js
function example(value = 10) {}
```

and:

```js
function example({ value = 10 } = {}) {}
```

The first gives a default to the entire parameter.

The second contains two levels:

```text
argument default → {}
property default → 10
```

Understanding this distinction becomes important when working with React props.

---

# 40. Default Parameters and Function Length

The `length` property of a function counts parameters before the first parameter with a default value.

Example:

```js
function example(first, second = 10, third) {
  // ...
}
```

Then:

```js
console.log(example.length);
```

Output:

```text
1
```

Why?

The first parameter has no default.

The count stops at the first default parameter.

This is mostly a language detail rather than an everyday application feature.

---

# 41. Default Parameters and Evaluation Order

Default parameters are evaluated left to right.

Consider:

```js
function example(
  first = 10,
  second = first * 2,
  third = second * 2
) {
  return third;
}
```

Calling:

```js
console.log(example());
```

produces:

```text
40
```

The process is:

```text
first  → 10
second → 10 * 2 = 20
third  → 20 * 2 = 40
```

This is a useful mental model.

---

# 42. Default Parameters Can Use Functions

Defaults can be dynamic.

```js
function getRole() {
  return "Frontend Developer";
}

function createProfile(
  name = "Osama Abu Motlaq",
  role = getRole()
) {
  return {
    name,
    role
  };
}
```

If the caller provides `role`, `getRole()` is not needed.

The default expression is evaluated only when the argument is `undefined`.

This is important because default expressions can contain function calls.

---

# 43. Default Parameters and Side Effects

Because default expressions can execute code, avoid unnecessary side effects inside them.

Avoid overly complicated defaults such as:

```js
function process(
  value = performComplexOperation()
) {
  // ...
}
```

unless that behavior is genuinely part of the function's contract.

Prefer defaults that are:

* Simple
* Predictable
* Cheap
* Easy to understand

Complex initialization logic can usually be moved into the function body or a separate function.

---

# 44. Practical Example: Pagination

A useful example:

```js
function getPage(
  page = 1,
  limit = 10
) {
  return {
    page,
    limit
  };
}
```

Examples:

```js
getPage();
```

returns:

```js
{
  page: 1,
  limit: 10
}
```

And:

```js
getPage(3);
```

returns:

```js
{
  page: 3,
  limit: 10
}
```

And:

```js
getPage(3, 20);
```

returns:

```js
{
  page: 3,
  limit: 20
}
```

---

# 45. Practical Example: Configuration

Default parameters work well for simple configuration:

```js
function createConfig(
  theme = "light",
  language = "English"
) {
  return {
    theme,
    language
  };
}
```

Calling:

```js
createConfig();
```

returns:

```js
{
  theme: "light",
  language: "English"
}
```

Calling:

```js
createConfig("dark");
```

returns:

```js
{
  theme: "dark",
  language: "English"
}
```

For many options, prefer an options object.

---

# 46. Practical Example: Safe Function API

```js
function createButton({
  text = "Submit",
  type = "button",
  disabled = false
} = {}) {
  return {
    text,
    type,
    disabled
  };
}
```

Now:

```js
createButton();
```

returns:

```js
{
  text: "Submit",
  type: "button",
  disabled: false
}
```

And:

```js
createButton({
  text: "Save",
  disabled: true
});
```

returns:

```js
{
  text: "Save",
  type: "button",
  disabled: true
}
```

This pattern is common in modern JavaScript libraries.

---

# 47. Default Parameters vs Manual Initialization

### Manual initialization

```js
function greet(name) {
  if (name === undefined) {
    name = "Osama Abu Motlaq";
  }

  return `Hello, ${name}`;
}
```

### Default parameter

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}`;
}
```

The second version communicates the function's contract more directly.

Use manual initialization when the fallback requires more complicated logic than a parameter default should reasonably contain.

---

# 48. Default Parameters vs Options Objects

### Simple function

```js
function greet(
  name = "Osama Abu Motlaq",
  role = "Developer"
) {
  // ...
}
```

This is fine when the parameter list is short and positional order is meaningful.

### Many optional settings

```js
function createProfile({
  name = "Osama Abu Motlaq",
  role = "Developer",
  theme = "dark",
  language = "English"
} = {}) {
  // ...
}
```

The options-object approach is usually easier to maintain.

---

# 49. Best Practices

### 1. Use defaults for genuine fallback values

Good:

```js
function greet(
  name = "Osama Abu Motlaq"
) {}
```

---

### 2. Remember that only `undefined` triggers the default

```text
undefined → default
null      → null
0         → 0
false     → false
""        → ""
```

---

### 3. Prefer `??` when `null` should also count as missing

```js
const value = input ?? defaultValue;
```

Use this when the desired behavior is:

```text
null OR undefined → fallback
```

---

### 4. Avoid `||` when falsy values are valid

If `0`, `false`, or `""` are legitimate values, `||` may be too aggressive.

---

### 5. Use options objects for many optional parameters

Prefer:

```js
function createProfile({
  name = "Osama Abu Motlaq",
  role = "Developer"
} = {}) {}
```

when positional parameters become difficult to use.

---

### 6. Keep default expressions simple

Defaults should not hide complicated application logic.

---

### 7. Do not confuse defaults with validation

A default value answers:

> "What should I use if the argument is undefined?"

Validation answers:

> "Is the provided value acceptable?"

These are different responsibilities.

---

# 50. Quick Reference

## Basic

```js
function greet(
  name = "Osama Abu Motlaq"
) {
  return name;
}
```

---

## Multiple Defaults

```js
function createProfile(
  name = "Osama Abu Motlaq",
  role = "Frontend Developer"
) {
  // ...
}
```

---

## `undefined`

```js
greet(undefined);
```

Uses the default.

---

## `null`

```js
greet(null);
```

Does not use the default.

---

## Default Expression

```js
function getValue(
  value = Date.now()
) {
  return value;
}
```

---

## Default With Destructuring

```js
function createProfile({
  name = "Osama Abu Motlaq",
  role = "Frontend Developer"
} = {}) {
  // ...
}
```

---

## Default + Rest

```js
function createProfile(
  name = "Osama Abu Motlaq",
  ...skills
) {
  // ...
}
```

---

## Arrow Function

```js
const greet = (
  name = "Osama Abu Motlaq"
) => {
  return `Hello, ${name}`;
};
```

---

# 51. Default Parameters vs `||` vs `??`

| Situation | Default Parameter | `||` | `??` |
|---|---:|---:|---:|
| `undefined` | Fallback | Fallback | Fallback |
| `null` | Keep `null` | Fallback | Fallback |
| `0` | Keep `0` | Fallback | Keep `0` |
| `false` | Keep `false` | Fallback | Keep `false` |
| `""` | Keep `""` | Fallback | Keep `""` |

Mental model:

```text
Default parameter
        ↓
undefined only


??
        ↓
undefined + null


||
        ↓
Any falsy value
```

---

# 52. Default Parameters and React

Default parameters are particularly relevant to React because components are functions.

For example:

```jsx
function Button({
  text = "Submit",
  disabled = false
}) {
  return (
    <button disabled={disabled}>
      {text}
    </button>
  );
}
```

This is useful for optional props.

You should understand the distinction between:

```js
text = "Submit"
```

and:

```js
text || "Submit"
```

because they do not behave identically.

Default parameters are also useful in:

* Utility functions
* Custom hooks
* Configuration functions
* API helpers
* Event helpers
* Component props

---

# 53. Key Takeaways

1. Default parameters provide fallback values for function parameters.
2. They are activated when the argument is `undefined`.
3. `null` does not trigger a default parameter.
4. `0`, `false`, and `""` also do not trigger defaults.
5. Default expressions are evaluated when needed, at function call time.
6. Default parameters are evaluated from left to right.
7. Later parameters can reference earlier parameters.
8. A later parameter should not be referenced from an earlier parameter's default.
9. Default parameters work with regular functions, arrow functions, methods, constructors, and async functions.
10. They can be combined with destructuring.
11. `= {}` is useful when destructuring an optional object parameter.
12. Default parameters are different from `||`.
13. Default parameters are also different from `??`.
14. Default values do not perform validation.
15. Rest parameters can be combined with defaults, but rest must remain last.
16. Default parameters are highly useful for React component props and reusable functions.

---

# 54. Mental Model

When you see:

```js
function greet(
  name = "Osama Abu Motlaq"
) {
  // ...
}
```

think:

```text
Function called
      ↓
Was name provided?
      ↓
   undefined?
    ↙     ↘
  Yes      No
   ↓        ↓
Default   Use provided value
```

The most important rule is:

```text
DEFAULT PARAMETER
        ↓
Triggered by undefined
```

Not:

```text
null
0
false
""
```

And remember the three-way distinction:

```text
parameter = default
        ↓
undefined only


value ?? default
        ↓
undefined + null


value || default
        ↓
all falsy values
```

Once this distinction is clear, default parameters become a predictable part of JavaScript rather than just another syntax feature.
