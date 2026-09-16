# Destructuring

Destructuring is a JavaScript syntax that allows you to **extract values from arrays or properties from objects and assign them to variables**.

It was introduced in **ES6 (ECMAScript 2015)**.

Without destructuring:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24,
    role: "Frontend Developer"
};

const name = user.name;
const age = user.age;
const role = user.role;

console.log(name);
console.log(age);
console.log(role);
```

With destructuring:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24,
    role: "Frontend Developer"
};

const { name, age, role } = user;

console.log(name);
console.log(age);
console.log(role);
```

The result is the same, but destructuring makes extracting multiple values more concise and expressive.

Destructuring works with:

* Objects
* Arrays
* Function parameters
* Default values
* Renaming
* Nested data
* Rest patterns
* Function return values
* React props
* React hooks
* API responses

---

# 1. Why Destructuring Exists

JavaScript applications frequently work with structured data.

For example:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24,
    role: "Frontend Developer"
};
```

You may need several values from this object.

Traditional property access:

```js
const name = user.name;
const age = user.age;
const role = user.role;
```

Destructuring:

```js
const { name, age, role } = user;
```

This tells JavaScript:

> Take the `name`, `age`, and `role` properties from `user` and create variables with those names.

---

# 2. Object Destructuring

The basic syntax is:

```js
const { property } = object;
```

Example:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const { name } = user;

console.log(name);
```

Output:

```text
Osama Abu Motlaq
```

Another example:

```js
const { age } = user;

console.log(age);
```

Output:

```text
24
```

---

# 3. Multiple Properties

You can extract multiple properties at once:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24,
    role: "Frontend Developer"
};

const { name, age, role } = user;

console.log(name);
console.log(age);
console.log(role);
```

Output:

```text
Osama Abu Motlaq
24
Frontend Developer
```

The order does not matter.

```js
const { role, name, age } = user;
```

works exactly as well.

This is because **object destructuring is property-name based**, not position based.

---

# 4. Object Destructuring Is Based on Property Names

Consider:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const { age, name } = user;
```

Even though `age` appears before `name`, JavaScript finds the corresponding properties by name.

Conceptually:

```text
user
│
├── name → "Osama Abu Motlaq"
└── age  → 24
```

The destructuring pattern asks for:

```text
name
age
```

and JavaScript retrieves those properties.

---

# 5. Array Destructuring

Arrays work differently.

Array destructuring is based on **position**.

Example:

```js
const projects = ["Portfolio", "Dashboard", "E-Commerce"];

const [first, second, third] = projects;

console.log(first);
console.log(second);
console.log(third);
```

Output:

```text
Portfolio
Dashboard
E-Commerce
```

The positions are:

```text
Index 0 → first
Index 1 → second
Index 2 → third
```

---

# 6. Object vs Array Destructuring

This distinction is fundamental.

### Object

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const { name, age } = user;
```

Object destructuring uses:

```text
Property names
```

### Array

```js
const projects = ["Portfolio", "Dashboard"];

const [first, second] = projects;
```

Array destructuring uses:

```text
Positions
```

Remember:

```text
Object → names
Array  → positions
```

---

# 7. Skipping Array Elements

You can skip array elements using commas.

```js
const projects = [
    "Portfolio",
    "Dashboard",
    "E-Commerce"
];

const [first, , third] = projects;

console.log(first);
console.log(third);
```

Output:

```text
Portfolio
E-Commerce
```

The empty position means:

```text
Ignore index 1
```

---

# 8. Destructuring Only Part of an Array

You do not have to extract every value.

```js
const projects = [
    "Portfolio",
    "Dashboard",
    "E-Commerce"
];

const [first] = projects;

console.log(first);
```

Output:

```text
Portfolio
```

The remaining values are simply not extracted.

---

# 9. Default Values

Destructuring supports default values.

For objects:

```js
const user = {
    name: "Osama Abu Motlaq"
};

const { name, age = 24 } = user;

console.log(name);
console.log(age);
```

Output:

```text
Osama Abu Motlaq
24
```

The `age` property does not exist, so the default value `24` is used.

---

# 10. Default Values Only Apply to `undefined`

This is an important detail.

```js
const user = {
    name: "Osama Abu Motlaq",
    age: undefined
};

const { age = 24 } = user;

console.log(age);
```

Output:

```text
24
```

But:

```js
const user = {
    age: null
};

const { age = 24 } = user;

console.log(age);
```

Output:

```text
null
```

The default is used when the extracted value is `undefined`, not when it is `null`.

Conceptually:

```text
undefined → use default
null      → keep null
```

---

# 11. Array Default Values

Arrays also support defaults.

```js
const values = [10];

const [first, second = 20] = values;

console.log(first);
console.log(second);
```

Output:

```text
10
20
```

The second element does not exist, so the default is used.

---

# 12. Renaming Object Properties

Sometimes the property name is not the variable name you want.

You can rename it during destructuring.

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const { name: userName, age: userAge } = user;

console.log(userName);
console.log(userAge);
```

Output:

```text
Osama Abu Motlaq
24
```

The syntax:

```js
const { name: userName } = user;
```

means:

```text
Read the `name` property
        ↓
Store its value in `userName`
```

It does **not** mean that the object property was renamed.

---

# 13. Property Renaming Does Not Modify the Object

Consider:

```js
const user = {
    name: "Osama Abu Motlaq"
};

const { name: userName } = user;
```

The original object still has:

```js
user.name
```

There is no:

```js
user.userName
```

The new variable is simply called:

```js
userName
```

The object itself has not changed.

---

# 14. Combining Renaming and Defaults

You can rename a property and provide a default value.

```js
const user = {
    name: "Osama Abu Motlaq"
};

const {
    name: userName,
    age: userAge = 24
} = user;

console.log(userName);
console.log(userAge);
```

Output:

```text
Osama Abu Motlaq
24
```

---

# 15. Nested Object Destructuring

Objects can contain other objects.

```js
const user = {
    name: "Osama Abu Motlaq",
    profile: {
        role: "Frontend Developer",
        experience: 2
    }
};
```

You can destructure the nested object:

```js
const {
    profile: { role, experience }
} = user;

console.log(role);
console.log(experience);
```

Output:

```text
Frontend Developer
2
```

This means:

```text
user
 ↓
profile
 ↓
role
experience
```

---

# 16. Nested Destructuring Can Become Hard to Read

Although nested destructuring is powerful, excessive nesting can hurt readability.

For example:

```js
const {
    profile: {
        settings: {
            preferences: {
                theme
            }
        }
    }
} = user;
```

This may be technically correct, but it can be difficult to understand.

Sometimes a simpler approach is better:

```js
const { profile } = user;
const { settings } = profile;
const { preferences } = settings;
const { theme } = preferences;
```

The best choice depends on the complexity of the data and how often the values are used.

---

# 17. Array Destructuring with Rest

You can collect remaining array values using `...`.

```js
const projects = [
    "Portfolio",
    "Dashboard",
    "E-Commerce",
    "Task Manager"
];

const [first, second, ...remaining] = projects;

console.log(first);
console.log(second);
console.log(remaining);
```

Output:

```text
Portfolio
Dashboard
["E-Commerce", "Task Manager"]
```

The rest pattern collects all remaining elements into a new array.

---

# 18. Rest Must Be Last

This is valid:

```js
const [first, ...remaining] = projects;
```

This is invalid:

```js
const [...remaining, last] = projects;
```

The rest element must be the final element of the destructuring pattern.

---

# 19. Object Destructuring with Rest

Rest also works with objects.

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24,
    role: "Frontend Developer"
};

const { name, ...details } = user;

console.log(name);
console.log(details);
```

Output:

```text
Osama Abu Motlaq
{
    age: 24,
    role: "Frontend Developer"
}
```

The `details` object contains the remaining own enumerable properties.

---

# 20. Destructuring Does Not Mean Copying Everything

Consider:

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const { name } = user;
```

Only the value of `name` is extracted.

JavaScript does not automatically create a new copy of the entire object.

For primitive values:

```js
const { age } = user;
```

the variable receives the primitive value.

For objects:

```js
const user = {
    name: "Osama Abu Motlaq",
    profile: {
        role: "Frontend Developer"
    }
};

const { profile } = user;
```

`profile` references the same nested object.

This matters because:

```js
profile.role = "Full Stack Developer";
```

also changes:

```js
user.profile.role
```

because both refer to the same object.

---

# 21. Function Parameter Destructuring

Destructuring is especially useful with function parameters.

Without destructuring:

```js
function displayUser(user) {
    console.log(user.name);
    console.log(user.age);
}
```

You can destructure the parameter directly:

```js
function displayUser({ name, age }) {
    console.log(name);
    console.log(age);
}
```

Then:

```js
displayUser({
    name: "Osama Abu Motlaq",
    age: 24
});
```

Output:

```text
Osama Abu Motlaq
24
```

This is one of the most important destructuring patterns in modern JavaScript.

---

# 22. Why Parameter Destructuring Is Useful

Without destructuring:

```js
function createProfile(user) {
    const name = user.name;
    const role = user.role;
}
```

With destructuring:

```js
function createProfile({ name, role }) {
    console.log(name);
    console.log(role);
}
```

The function signature communicates what properties it expects.

It can make APIs easier to understand.

---

# 23. Default Values in Function Parameters

You can combine parameter destructuring with defaults.

```js
function createProfile({
    name,
    role = "Frontend Developer"
}) {
    console.log(name);
    console.log(role);
}

createProfile({
    name: "Osama Abu Motlaq"
});
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

---

# 24. Default Parameter Object

There is an important edge case.

This:

```js
function createProfile({ name }) {
    console.log(name);
}
```

will fail if called without an argument:

```js
createProfile();
```

because JavaScript tries to destructure `undefined`.

You can provide a default object:

```js
function createProfile({ name } = {}) {
    console.log(name);
}
```

Now:

```js
createProfile();
```

does not throw because the default `{}` is used.

---

# 25. Destructuring Function Return Values

Functions can return arrays or objects, and destructuring can extract the result.

Example:

```js
function getCoordinates() {
    return [100, 200];
}

const [x, y] = getCoordinates();

console.log(x);
console.log(y);
```

Output:

```text
100
200
```

This pattern is common in JavaScript APIs.

---

# 26. Returning Objects and Destructuring

A function can return an object:

```js
function getUser() {
    return {
        name: "Osama Abu Motlaq",
        age: 24
    };
}

const { name, age } = getUser();

console.log(name);
console.log(age);
```

Output:

```text
Osama Abu Motlaq
24
```

This pattern is extremely common in application code.

---

# 27. Swapping Variables

Array destructuring provides a clean way to swap variables.

```js
let first = "Portfolio";
let second = "Dashboard";

[first, second] = [second, first];

console.log(first);
console.log(second);
```

Output:

```text
Dashboard
Portfolio
```

The right-hand side creates an array containing the values in the new order.

Then destructuring assigns them to the existing variables.

---

# 28. Assignment Destructuring

When the variables already exist, you can destructure without declaring them.

```js
let name;
let age;

({ name, age } = {
    name: "Osama Abu Motlaq",
    age: 24
});
```

The parentheses are important.

Without them, JavaScript can interpret:

```js
{ name, age } = ...
```

as a block rather than an assignment expression.

For normal code, declaration-time destructuring is usually clearer:

```js
const { name, age } = user;
```

---

# 29. Computed Property Names

Object destructuring can use computed property names.

```js
const key = "name";

const user = {
    name: "Osama Abu Motlaq"
};

const { [key]: userName } = user;

console.log(userName);
```

Output:

```text
Osama Abu Motlaq
```

This is an advanced feature and is useful when the property name is stored dynamically.

---

# 30. Destructuring `Map` and Other Iterables

Array destructuring is not limited to arrays.

It works with **iterables**.

For example:

```js
const values = new Set(["Portfolio", "Dashboard"]);

const [first, second] = values;

console.log(first);
console.log(second);
```

Output:

```text
Portfolio
Dashboard
```

This works because `Set` is iterable.

The general idea is:

```text
Array destructuring
        ↓
Uses the iterable protocol
```

Iterables are covered in detail later in the ES6 section.

---

# 31. Destructuring Strings

Strings are iterable, so they can also be destructured.

```js
const [first, second, third] = "Osama";

console.log(first);
console.log(second);
console.log(third);
```

Output:

```text
O
s
a
```

The characters are extracted according to their iterable order.

---

# 32. Destructuring `Map`

A `Map` is iterable and yields key-value pairs.

```js
const user = new Map([
    ["name", "Osama Abu Motlaq"],
    ["age", 24]
]);

for (const [key, value] of user) {
    console.log(key, value);
}
```

Output:

```text
name Osama Abu Motlaq
age 24
```

The `[key, value]` pattern is array destructuring applied to each iterable entry.

---

# 33. Destructuring in Loops

Destructuring can make loops much cleaner.

With `Object.entries()`:

```js
const user = {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
};

for (const [key, value] of Object.entries(user)) {
    console.log(key, value);
}
```

Output:

```text
name Osama Abu Motlaq
role Frontend Developer
```

Without destructuring, you would need to work with each entry array explicitly.

---

# 34. React Relevance

Destructuring is **extremely important for React**.

You will use it constantly.

Common examples include:

* Props
* `useState`
* `useReducer`
* Context
* API responses
* Component parameters
* Custom hooks
* Imported values

---

# 35. Destructuring React Props

A React component receives a props object.

Instead of:

```jsx
function Profile(props) {
    return <h1>{props.name}</h1>;
}
```

you can destructure:

```jsx
function Profile({ name }) {
    return <h1>{name}</h1>;
}
```

The second version directly extracts the `name` property.

For multiple props:

```jsx
function Profile({ name, role, age }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{role}</p>
            <p>{age}</p>
        </div>
    );
}
```

This is one of the most common uses of object destructuring in React.

---

# 36. Destructuring `useState`

Consider:

```jsx
const [count, setCount] = useState(0);
```

This is array destructuring.

`useState(0)` returns an array conceptually like:

```js
[
    currentState,
    stateUpdater
]
```

Then:

```js
const [count, setCount] = ...
```

extracts:

```text
index 0 → count
index 1 → setCount
```

This is why the names can be chosen by the developer:

```jsx
const [count, setCount] = useState(0);
```

or:

```jsx
const [isOpen, setIsOpen] = useState(false);
```

The important part is the **position**, not the variable names.

---

# 37. Destructuring `useReducer`

The same principle applies to `useReducer`:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

The returned array contains two values:

```text
index 0 → state
index 1 → dispatch
```

Array destructuring extracts them.

---

# 38. Destructuring Context Values

When a custom hook or context returns an object:

```js
const { user, logout } = useAuth();
```

This is object destructuring.

The returned object might conceptually look like:

```js
{
    user: ...,
    logout: ...
}
```

The names match object properties.

---

# 39. Destructuring Custom Hook Results

Custom hooks frequently return arrays or objects.

Array style:

```js
const [value, setValue] = useCustomHook();
```

Object style:

```js
const { data, loading, error } = useCustomHook();
```

The difference depends on what the hook returns.

This is one reason understanding the difference between object and array destructuring is essential in React.

---

# 40. Destructuring API Responses

Suppose an API returns:

```js
const responseData = {
    user: {
        name: "Osama Abu Motlaq"
    },
    posts: [],
    total: 0
};
```

You can write:

```js
const { user, posts, total } = responseData;
```

Then:

```js
console.log(user);
console.log(posts);
console.log(total);
```

Nested destructuring can also be used:

```js
const {
    user: { name }
} = responseData;

console.log(name);
```

Output:

```text
Osama Abu Motlaq
```

---

# 41. Destructuring and the Spread Operator Are Different

These two features are often confused.

### Destructuring

Extracts values:

```js
const { name } = user;
```

Think:

```text
Object → selected values
```

### Spread

Expands or copies values into another structure:

```js
const updatedUser = {
    ...user,
    age: 25
};
```

Think:

```text
Existing structure → expanded into another structure
```

A simple distinction:

```text
Destructuring → take values out
Spread        → put values into a new structure
```

They are often used together.

---

# 42. Destructuring and Rest Are Different

Consider:

```js
const { name, ...details } = user;
```

Here:

```text
name
```

is destructuring.

And:

```text
...details
```

is a **rest pattern**.

Rest collects the remaining properties.

The same syntax `...` is also used by the spread operator, but the meaning depends on context.

This distinction becomes clearer when studying spread and rest separately.

---

# 43. Common Mistakes

## Mistake 1: Using Array Syntax for Objects

Incorrect:

```js
const [name] = user;
```

if `user` is a normal object.

Object destructuring uses:

```js
const { name } = user;
```

---

## Mistake 2: Using Object Syntax for Arrays

Incorrect:

```js
const { first } = projects;
```

if you want the first array element.

Use:

```js
const [first] = projects;
```

---

## Mistake 3: Forgetting That Arrays Use Positions

Given:

```js
const values = ["Portfolio", "Dashboard"];
```

this:

```js
const [first, second] = values;
```

means:

```text
index 0 → first
index 1 → second
```

Changing the array order changes the extracted values.

---

## Mistake 4: Assuming Object Destructuring Uses Position

It does not.

```js
const user = {
    age: 24,
    name: "Osama Abu Motlaq"
};

const { name, age } = user;
```

works regardless of property order.

---

## Mistake 5: Forgetting Default Values Only Apply to `undefined`

```js
const { age = 24 } = {
    age: null
};
```

The result is:

```text
null
```

not:

```text
24
```

---

## Mistake 6: Destructuring `undefined`

This fails:

```js
const { name } = undefined;
```

It throws a `TypeError`.

A default object can help:

```js
const { name } = undefined || {};
```

or, for function parameters:

```js
function displayUser({ name } = {}) {
    console.log(name);
}
```

Choose the approach that matches the actual data contract.

---

## Mistake 7: Overusing Deep Destructuring

This:

```js
const {
    profile: {
        settings: {
            theme
        }
    }
} = user;
```

may be harder to maintain than simpler intermediate variables.

Destructuring should improve clarity, not become a puzzle.

---

# 44. Best Practices

## 44.1 Use Destructuring When It Improves Readability

Good:

```js
const { name, age } = user;
```

This clearly communicates which values are needed.

---

## 44.2 Use Meaningful Names

If the original property name is vague, rename it:

```js
const { id: userId } = user;
```

Now the purpose of the value is clearer.

---

## 44.3 Do Not Destructure Everything Automatically

You do not need to destructure an object just because you can.

If you only need one property once:

```js
console.log(user.name);
```

may be clearer than:

```js
const { name } = user;

console.log(name);
```

Use destructuring when it improves readability or when multiple values are needed.

---

## 44.4 Avoid Excessive Nesting

Prefer understandable code over maximum conciseness.

---

## 44.5 Remember the Data Shape

Before destructuring, understand whether the data is:

```text
Object
```

or:

```text
Array
```

and understand its structure.

Destructuring is based on the shape of the value.

---

# 45. Quick Reference

## Object Destructuring

```js
const { name, age } = user;
```

## Array Destructuring

```js
const [first, second] = projects;
```

## Rename

```js
const { name: userName } = user;
```

## Default Value

```js
const { age = 24 } = user;
```

## Rename + Default

```js
const { age: userAge = 24 } = user;
```

## Nested Object

```js
const {
    profile: { role }
} = user;
```

## Array Rest

```js
const [first, ...remaining] = projects;
```

## Object Rest

```js
const { name, ...details } = user;
```

## Skip Array Element

```js
const [first, , third] = values;
```

## Function Parameter

```js
function displayUser({ name, age }) {
    console.log(name, age);
}
```

## Function Return

```js
const { name } = getUser();
```

## React Props

```jsx
function Profile({ name }) {
    return <h1>{name}</h1>;
}
```

## React State

```jsx
const [count, setCount] = useState(0);
```

---

# 46. Object vs Array Destructuring

| Feature              | Object Destructuring     | Array Destructuring                    |
| -------------------- | ------------------------ | -------------------------------------- |
| Syntax               | `{}`                     | `[]`                                   |
| Based on             | Property names           | Positions                              |
| Order matters        | No                       | Yes                                    |
| Rename values        | Yes                      | Variable names determine meaning       |
| Default values       | Yes                      | Yes                                    |
| Rest                 | Yes                      | Yes                                    |
| Nested destructuring | Yes                      | Yes                                    |
| Common React use     | Props, context, API data | `useState`, `useReducer`, custom hooks |

---

# 47. Key Takeaways

1. Destructuring was introduced in ES6.
2. It extracts values from structured data.
3. Object destructuring uses property names.
4. Array destructuring uses positions.
5. Object properties can be renamed during destructuring.
6. Default values can be provided.
7. Defaults are used when the value is `undefined`.
8. Nested objects and arrays can be destructured.
9. Rest patterns can collect remaining values.
10. Destructuring works in function parameters.
11. Functions can return values that are immediately destructured.
12. Destructuring does not automatically deep-copy objects.
13. Object destructuring is extremely common in React props and context.
14. Array destructuring is fundamental to hooks such as `useState` and `useReducer`.
15. Destructuring and spread are different concepts:

    * Destructuring extracts.
    * Spread expands.
16. Destructuring should improve readability rather than make code unnecessarily compressed.

---

# 48. Final Mental Model

The easiest way to remember destructuring is:

```text
Object
   ↓
{ propertyName }
   ↓
Extract property value
```

Example:

```js
const { name } = user;
```

For arrays:

```text
Array
   ↓
[ first, second ]
   ↓
Extract by position
```

Example:

```js
const [first, second] = projects;
```

So remember:

```text
Object → property names
Array  → positions
```

And in React:

```text
Props object
    ↓
{ name, age }

useState array
    ↓
[ value, setter ]
```

Once you understand this distinction, a large amount of modern React code becomes much easier to read.
