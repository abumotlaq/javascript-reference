# Computed Property Names

Computed property names allow JavaScript to use the **result of an expression as an object property name**.

They are written using square brackets:

```js
const object = {
  [expression]: value,
};
```

The expression inside `[]` is evaluated first, and its result becomes the property key.

Computed property names were introduced with **ES6 (ECMAScript 2015)**.

They are especially useful when working with:

* Dynamic object properties
* Forms
* State updates
* API payloads
* Configuration objects
* Data transformation
* React state
* Dynamic keys
* Object creation

---

# 1. The Basic Idea

Normally, object property names are written directly:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

Here, the property name is literally:

```text
name
```

With a computed property name:

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

JavaScript evaluates:

```js
[key]
```

The value of `key` is:

```text
name
```

So the resulting object is:

```js
{
  name: "Osama Abu Motlaq"
}
```

---

# 2. Why Are They Called "Computed"?

The property name is **computed**, meaning JavaScript calculates it.

Consider:

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

The process is conceptually:

```text
key
 ↓
"name"
 ↓
"name" becomes the property name
 ↓
{
  name: "Osama Abu Motlaq"
}
```

The property name does not have to be known literally when the source code is written.

It can be calculated at runtime.

---

# 3. Without Computed Property Names

Suppose:

```js
const key = "name";
```

This:

```js
const user = {
  key: "Osama Abu Motlaq",
};
```

creates:

```js
{
  key: "Osama Abu Motlaq"
}
```

It does **not** use the value of the variable `key`.

The property is literally named:

```text
key
```

---

# 4. With Computed Property Names

To use the value of `key`, use square brackets:

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

Now the result is:

```js
{
  name: "Osama Abu Motlaq"
}
```

The brackets tell JavaScript:

> Evaluate this expression and use its result as the property name.

---

# 5. Variable as a Property Name

The simplest use case is a variable.

```js
const propertyName = "role";

const user = {
  [propertyName]: "Frontend Developer",
};

console.log(user);
```

Result:

```js
{
  role: "Frontend Developer"
}
```

The variable contains:

```text
role
```

Therefore:

```js
[propertyName]
```

becomes:

```text
role
```

---

# 6. The Expression Can Be More Than a Variable

The expression inside `[]` can be any valid JavaScript expression.

For example:

```js
const prefix = "user";
const property = "name";

const user = {
  [`${prefix}_${property}`]: "Osama Abu Motlaq",
};
```

The expression:

```js
`${prefix}_${property}`
```

produces:

```text
user_name
```

Therefore:

```js
user
```

contains:

```js
{
  user_name: "Osama Abu Motlaq"
}
```

---

# 7. Computed Property Names with Arithmetic

An expression can contain calculations.

```js
const number = 1;

const data = {
  [`item${number + 1}`]: "Osama Abu Motlaq",
};

console.log(data);
```

The expression:

```js
number + 1
```

produces:

```text
2
```

Therefore:

```js
data
```

becomes:

```js
{
  item2: "Osama Abu Motlaq"
}
```

---

# 8. Computed Property Names with Function Calls

The expression can also call a function.

```js
function createKey() {
  return "username";
}

const user = {
  [createKey()]: "Osama Abu Motlaq",
};
```

The function returns:

```text
username
```

Therefore:

```js
user
```

becomes:

```js
{
  username: "Osama Abu Motlaq"
}
```

---

# 9. Computed Property Names with Methods

A computed property name can also define a method.

```js
const methodName = "greet";

const user = {
  [methodName]() {
    return "Hello from Osama Abu Motlaq";
  },
};

console.log(user.greet());
```

The expression:

```js
[methodName]
```

produces:

```text
greet
```

So JavaScript creates a method named:

```text
greet
```

---

# 10. Computed Property Names Are Evaluated During Object Creation

Consider:

```js
let key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};

key = "role";
```

Changing `key` afterward does not change the object's property.

The object still contains:

```js
{
  name: "Osama Abu Motlaq"
}
```

Why?

Because the computed property name was evaluated when the object literal was created.

Conceptually:

```text
key = "name"

Create object
    ↓
Evaluate [key]
    ↓
"name"
    ↓
Create property "name"

Later:
key = "role"

Existing object is not changed
```

---

# 11. Computed Property Names vs Property Access

These two uses of brackets are related but different.

## Dynamic property access

```js
const key = "name";

console.log(user[key]);
```

This means:

> Read the property whose name is stored in `key`.

---

## Computed property creation

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

This means:

> Create a property whose name is stored in `key`.

The same bracket concept is involved, but one **accesses** a property while the other **creates** one.

---

# 12. Creating Objects with Dynamic Fields

Computed properties are useful when the object's structure is dynamic.

```js
function createField(fieldName, value) {
  return {
    [fieldName]: value,
  };
}

const result = createField(
  "name",
  "Osama Abu Motlaq"
);

console.log(result);
```

Output:

```js
{
  name: "Osama Abu Motlaq"
}
```

Another call could use a different field:

```js
const result = createField(
  "role",
  "Frontend Developer"
);
```

Result:

```js
{
  role: "Frontend Developer"
}
```

The function does not need to know the property name beforehand.

---

# 13. Building Multiple Dynamic Properties

You can create an object containing several computed properties.

```js
const firstKey = "name";
const secondKey = "role";

const user = {
  [firstKey]: "Osama Abu Motlaq",
  [secondKey]: "Frontend Developer",
};
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

---

# 14. Dynamic Form Data

One of the most important real-world uses is form handling.

Suppose an input contains:

```html
<input name="email" />
```

The browser provides:

```js
event.target.name
```

which might contain:

```text
email
```

You can create an object dynamically:

```js
const fieldName = "email";
const fieldValue = "osama@example.com";

const update = {
  [fieldName]: fieldValue,
};
```

Result:

```js
{
  email: "osama@example.com"
}
```

The same code can work with:

```text
name
email
subject
message
```

without manually writing a separate object property for each field.

---

# 15. React Form Example

Computed property names are extremely important in React.

Consider:

```jsx
function handleChange(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  setFormData((previous) => ({
    ...previous,
    [fieldName]: fieldValue,
  }));
}
```

The critical part is:

```js
[fieldName]: fieldValue
```

Suppose:

```js
fieldName = "email";
fieldValue = "osama@example.com";
```

JavaScript effectively creates:

```js
{
  email: "osama@example.com"
}
```

If the input is:

```html
<input name="name" />
```

then:

```js
fieldName
```

could be:

```text
name
```

and the same code updates:

```js
{
  name: "Osama Abu Motlaq"
}
```

This is one of the most practical reasons you should understand computed property names before working extensively with React forms.

---

# 16. Computed Properties and Object Spread

Computed properties are often combined with the spread operator.

```js
const key = "role";
const value = "Frontend Developer";

const user = {
  name: "Osama Abu Motlaq",
  [key]: value,
};
```

The result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

In React state updates, you will often see:

```js
setUser((previous) => ({
  ...previous,
  [key]: value,
}));
```

These are two different operations:

```js
...previous
```

copies existing properties.

```js
[key]: value
```

creates or replaces a specific dynamic property.

---

# 17. Updating a Dynamic Property

You can use computed property access with object spread to create an updated object.

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const key = "role";
const newValue = "Full Stack JavaScript Developer";

const updatedUser = {
  ...user,
  [key]: newValue,
};
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Full Stack JavaScript Developer"
}
```

The original object is not directly mutated.

This pattern is particularly important in React because immutable state updates are standard.

---

# 18. Creating Dynamic API Payloads

Suppose an API expects different fields depending on the operation.

```js
const fieldName = "username";
const fieldValue = "Osama Abu Motlaq";

const payload = {
  [fieldName]: fieldValue,
};
```

The API payload becomes:

```js
{
  username: "Osama Abu Motlaq"
}
```

The same technique can be used when transforming user input into API request data.

---

# 19. Computed Properties and Arrays

An array index can also be used as a computed property.

```js
const index = 1;

const object = {
  [index]: "Osama Abu Motlaq",
};

console.log(object);
```

The result is:

```js
{
  1: "Osama Abu Motlaq"
}
```

Object property keys are converted to property keys internally.

Therefore, this is effectively accessible as:

```js
object[1];
```

---

# 20. Numbers as Computed Property Names

You can use a number directly:

```js
const user = {
  [1]: "Osama Abu Motlaq",
};
```

The property can be accessed using:

```js
console.log(user[1]);
```

Output:

```text
Osama Abu Motlaq
```

Although JavaScript allows this, remember that ordinary object property keys are generally strings or symbols.

The number `1` is converted into the property key `"1"`.

---

# 21. Boolean Expressions as Property Names

Expressions can produce booleans.

```js
const isAdmin = true;

const permissions = {
  [isAdmin]: "Full access",
};
```

The property key becomes:

```text
true
```

Conceptually:

```js
{
  true: "Full access"
}
```

This is valid JavaScript, although using meaningful string keys is usually clearer in application code.

---

# 22. Symbols as Computed Property Names

Symbols are an important advanced use case.

```js
const id = Symbol("id");

const user = {
  [id]: 123,
};
```

The property key is the Symbol itself.

It is not converted into a normal string.

You can access it using the same Symbol:

```js
console.log(user[id]);
```

Output:

```text
123
```

This connects computed property names with the ES6 `Symbol` feature.

---

# 23. Template Literals and Computed Property Names

Template literals are frequently combined with computed properties.

```js
const section = "profile";
const field = "name";

const data = {
  [`${section}_${field}`]: "Osama Abu Motlaq",
};
```

Result:

```js
{
  profile_name: "Osama Abu Motlaq"
}
```

This is useful when property names follow a predictable naming convention.

---

# 24. Dynamic Event Handler Objects

You can dynamically construct objects containing handlers.

```js
const eventName = "onClick";

const handlers = {
  [eventName]() {
    console.log("Clicked by Osama Abu Motlaq");
  },
};
```

The resulting object has:

```js
handlers.onClick
```

as a method.

This pattern can be useful when building configuration or behavior objects dynamically.

---

# 25. Multiple Computed Properties

You can use multiple computed property names in the same object.

```js
const nameKey = "name";
const roleKey = "role";
const locationKey = "location";

const user = {
  [nameKey]: "Osama Abu Motlaq",
  [roleKey]: "Frontend Developer",
  [locationKey]: "Gaza",
};
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
}
```

---

# 26. Duplicate Computed Property Names

Computed properties can produce the same key.

```js
const firstKey = "name";
const secondKey = "name";

const user = {
  [firstKey]: "Osama Abu Motlaq",
  [secondKey]: "Frontend Developer",
};
```

Both expressions produce:

```text
name
```

Therefore, the later property overwrites the earlier one.

The final result is:

```js
{
  name: "Frontend Developer"
}
```

This follows the normal object literal rule that later definitions of the same property replace earlier definitions.

---

# 27. Computed Property Names Are Not the Same as Destructuring

Do not confuse:

```js
const user = {
  [key]: value,
};
```

with destructuring.

Computed property names are used to **create or define** dynamic object properties.

Destructuring is used to **extract values** from objects.

Example:

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

This creates:

```js
{
  name: "Osama Abu Motlaq"
}
```

Destructuring works differently:

```js
const { name } = user;
```

This extracts the value of:

```text
name
```

These concepts often appear together in modern JavaScript, but they solve different problems.

---

# 28. Computed Property Names vs Dot Notation

Dot notation:

```js
user.name;
```

is appropriate when the property name is known literally.

Bracket notation:

```js
user[key];
```

is appropriate when the property name is dynamic.

For example:

```js
const key = "name";

console.log(user[key]);
```

You cannot use:

```js
user.key;
```

to access the property stored in `key`.

That would look for a literal property named:

```text
key
```

---

# 29. Creating vs Accessing Dynamic Properties

Keep this mental distinction clear.

### Create

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

### Access

```js
console.log(user[key]);
```

### Update

```js
user[key] = "Frontend Developer";
```

The same variable can therefore participate in the entire lifecycle of a dynamic property:

```text
key
 ↓
Create
 ↓
Access
 ↓
Update
```

---

# 30. Computed Property Names and Object Methods

You can dynamically choose a method name.

```js
const action = "introduce";

const user = {
  name: "Osama Abu Motlaq",

  [action]() {
    return `My name is ${this.name}`;
  },
};

console.log(user.introduce());
```

Output:

```text
My name is Osama Abu Motlaq
```

This is useful for dynamically generated objects and configuration systems.

---

# 31. Computed Property Names and Classes

Computed property names can also be used in classes.

```js
const methodName = "greet";

class User {
  constructor() {
    this.name = "Osama Abu Motlaq";
  }

  [methodName]() {
    return `Hello, ${this.name}`;
  }
}
```

Now:

```js
const user = new User();

console.log(user.greet());
```

produces:

```text
Hello, Osama Abu Motlaq
```

The method name was determined dynamically.

---

# 32. Evaluation Order

Computed property expressions are evaluated while the object literal is being created.

Consider:

```js
let counter = 0;

const user = {
  [`field${++counter}`]: "Osama Abu Motlaq",
  [`field${++counter}`]: "Frontend Developer",
};
```

The expressions are evaluated in order.

First:

```js
++counter
```

produces:

```text
1
```

Then:

```js
++counter
```

produces:

```text
2
```

The resulting object is:

```js
{
  field1: "Osama Abu Motlaq",
  field2: "Frontend Developer"
}
```

This demonstrates that computed property names are actual expressions, not just a special form of variable syntax.

---

# 33. Side Effects Inside Computed Property Names

Because expressions are evaluated, they can technically have side effects.

For example:

```js
let counter = 0;

const object = {
  [`item${++counter}`]: "Osama Abu Motlaq",
};
```

After creating the object:

```js
counter === 1;
```

Although valid, avoid complicated expressions with side effects when a simpler expression is possible.

Prefer readable code.

---

# 34. Common Mistakes

## Mistake 1: Forgetting the Brackets

Incorrect:

```js
const key = "name";

const user = {
  key: "Osama Abu Motlaq",
};
```

This creates:

```js
{
  key: "Osama Abu Motlaq"
}
```

Correct:

```js
const user = {
  [key]: "Osama Abu Motlaq",
};
```

This creates:

```js
{
  name: "Osama Abu Motlaq"
}
```

---

## Mistake 2: Confusing `object.key` with `object[key]`

Given:

```js
const key = "name";
```

This:

```js
user.key;
```

means:

> Access the property literally named `key`.

This:

```js
user[key];
```

means:

> Evaluate `key`, then access the property whose name is its value.

Therefore:

```js
user[key];
```

is the correct dynamic access syntax.

---

## Mistake 3: Thinking the Variable Remains Connected

Consider:

```js
let key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};

key = "role";
```

The object does not automatically change to:

```js
{
  role: "Osama Abu Motlaq"
}
```

It remains:

```js
{
  name: "Osama Abu Motlaq"
}
```

The computed key was evaluated during object creation.

---

## Mistake 4: Using Computed Properties When They Are Unnecessary

This:

```js
const user = {
  ["name"]: "Osama Abu Motlaq",
};
```

works, but it is unnecessarily complicated.

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

Use computed property syntax when the property name is genuinely dynamic.

---

# 35. Best Practices

## 1. Use computed properties for dynamic keys

Good:

```js
const fieldName = "email";

const data = {
  [fieldName]: "osama@example.com",
};
```

The key is genuinely dynamic.

---

## 2. Use normal property syntax for fixed keys

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

instead of:

```js
const user = {
  ["name"]: "Osama Abu Motlaq",
};
```

---

## 3. Keep expressions readable

Good:

```js
const key = `${section}_${field}`;

const data = {
  [key]: value,
};
```

This may be easier to understand than putting a large expression directly inside the brackets.

---

## 4. Avoid unnecessary side effects

Avoid complicated expressions such as:

```js
const data = {
  [`item${someFunctionThatChangesGlobalState()}`]: value,
};
```

The syntax allows it, but the resulting code is harder to reason about.

---

## 5. Learn both creation and access

You should understand both:

```js
{
  [key]: value
}
```

and:

```js
object[key]
```

The first dynamically defines a property.

The second dynamically accesses a property.

---

# 36. React Importance

**Very high.**

Computed property names are one of the JavaScript features you should be comfortable with before becoming proficient in React.

You will commonly encounter them in:

### Forms

```js
setFormData((previous) => ({
  ...previous,
  [event.target.name]: event.target.value,
}));
```

### State updates

```js
setUser((previous) => ({
  ...previous,
  [field]: value,
}));
```

### Dynamic data

```js
const data = {
  [key]: value,
};
```

### API payloads

```js
const payload = {
  [fieldName]: fieldValue,
};
```

The React code is not introducing a special React feature here.

It is using normal JavaScript.

This is an important principle:

> Many patterns that look like "React syntax" are actually JavaScript features being used inside React.

---

# 37. Next.js Importance

Computed property names are also useful in Next.js applications.

They can appear in:

* Form handling
* Server Actions
* API payloads
* Database data transformations
* Configuration
* Search/filter parameters
* Dynamic objects
* Authentication data
* Request processing

For example:

```js
const field = "email";
const value = "osama@example.com";

const payload = {
  [field]: value,
};
```

Next.js does not change how computed property names work.

They remain standard JavaScript.

---

# 38. Relationship to Other ES6 Features

Computed property names are often used together with other modern JavaScript features.

### Template literals

```js
const section = "user";
const field = "name";

const object = {
  [`${section}_${field}`]: "Osama Abu Motlaq",
};
```

### Spread operator

```js
const updated = {
  ...previous,
  [key]: value,
};
```

### Destructuring

```js
const { name } = user;
```

### Arrow functions

```js
const update = (key, value) => ({
  [key]: value,
});
```

Understanding these features together is much more valuable than memorizing each one in isolation.

---

# 39. A Practical Example

Imagine a form with three inputs:

```html
<input name="name" />
<input name="email" />
<input name="role" />
```

You want one change handler to update the correct property.

A simplified JavaScript version is:

```js
function updateField(previous, event) {
  return {
    ...previous,
    [event.target.name]: event.target.value,
  };
}
```

Suppose:

```js
event.target.name === "email";
event.target.value === "osama@example.com";
```

Then:

```js
[event.target.name]
```

becomes:

```text
email
```

and the returned object contains:

```js
{
  ...previous,
  email: "osama@example.com"
}
```

This is one of the most useful real-world applications of computed property names.

---

# 40. Quick Reference

## Static Property

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

---

## Dynamic Property

```js
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

---

## Dynamic Access

```js
console.log(user[key]);
```

---

## Dynamic Update

```js
user[key] = "Frontend Developer";
```

---

## Dynamic Property with Template Literal

```js
const type = "user";
const field = "name";

const data = {
  [`${type}_${field}`]: "Osama Abu Motlaq",
};
```

---

## Dynamic Method

```js
const method = "greet";

const user = {
  [method]() {
    return "Hello";
  },
};
```

---

## React State Pattern

```js
setFormData((previous) => ({
  ...previous,
  [field]: value,
}));
```

---

# 41. Mental Model

Remember the three most important forms:

```js
const key = "name";
```

### Define dynamically

```js
const user = {
  [key]: "Osama Abu Motlaq",
};
```

Think:

```text
[key]
  ↓
evaluate key
  ↓
"name"
  ↓
create property "name"
```

### Read dynamically

```js
user[key];
```

Think:

```text
key
 ↓
"name"
 ↓
read user.name
```

### Update dynamically

```js
user[key] = value;
```

Think:

```text
key
 ↓
"name"
 ↓
update user.name
```

---

# 42. Key Takeaways

* Computed property names allow property names to be determined dynamically.
* They use square brackets:

  ```js
  [expression]
  ```
* The expression is evaluated when the object or class definition is created.
* A variable can provide the property name:

  ```js
  const key = "name";

  const user = {
    [key]: "Osama Abu Motlaq",
  };
  ```
* Expressions can include:

  * Variables
  * Arithmetic
  * Template literals
  * Function calls
  * Other valid JavaScript expressions
* Computed property names can define both properties and methods.
* They are different from normal property shorthand.
* They are different from destructuring.
* `object[key]` dynamically accesses a property.
* `{ [key]: value }` dynamically creates a property.
* They are extremely useful for React forms and state updates.
* They are standard JavaScript, not a React-specific feature.
* Use them when property names are genuinely dynamic.
* Do not use them unnecessarily when a normal property name is clearer.

---

## One Rule to Remember

If you see:

```js
[key]
```

inside an object definition, think:

> **"Evaluate `key` and use its result as the property name."**

That single rule explains the core behavior of computed property names.
