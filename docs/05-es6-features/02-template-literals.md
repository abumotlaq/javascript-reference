# Template Literals

Template literals are a modern JavaScript feature introduced with **ES6 (ECMAScript 2015)**.

They provide a cleaner way to create strings, especially when a string contains:

* Variables
* Expressions
* Multiple lines
* Dynamic values
* Embedded JavaScript expressions

Template literals use **backticks**:

```js
const message = `Hello, Osama Abu Motlaq`;
```

instead of normal single or double quotes:

```js
const message = "Hello, Osama Abu Motlaq";
```

The most important feature is **interpolation**:

```js
const name = "Osama Abu Motlaq";

const message = `Hello, ${name}!`;

console.log(message);
```

Output:

```text
Hello, Osama Abu Motlaq!
```

---

# 1. Basic Syntax

A template literal is surrounded by backticks:

```js
const message = `Hello, Osama Abu Motlaq`;
```

Compare it with traditional strings:

```js
const message1 = "Hello, Osama Abu Motlaq";
const message2 = 'Hello, Osama Abu Motlaq';
const message3 = `Hello, Osama Abu Motlaq`;
```

All three create strings.

The difference is that template literals provide additional capabilities.

---

# 2. Backticks

Template literals use:

```text
`
```

This character is called a **backtick**, **grave accent**, or **backquote**.

It is different from:

```text
'
```

single quote, and:

```text
"
```

double quote.

Example:

```js
const message = `Hello, Osama Abu Motlaq`;
```

---

# 3. Why Template Literals Are Useful

Suppose you want to combine a variable with a string.

With string concatenation:

```js
const name = "Osama Abu Motlaq";

const message = "Hello, " + name + "!";
```

This works, but becomes harder to read as the string becomes more complex.

With a template literal:

```js
const name = "Osama Abu Motlaq";

const message = `Hello, ${name}!`;
```

The second version is usually easier to read.

---

# 4. String Interpolation

**Interpolation** means inserting values or expressions directly inside a string.

The syntax is:

```js
${expression}
```

Example:

```js
const name = "Osama Abu Motlaq";
const age = 24;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output:

```text
My name is Osama Abu Motlaq and I am 24 years old.
```

The `${...}` syntax tells JavaScript:

> Evaluate the expression inside these braces and place its result into the string.

---

# 5. Interpolation Is More Than Variables

You can put JavaScript expressions inside `${}`.

For example:

```js
const price = 100;
const quantity = 3;

const total = `Total: ${price * quantity}`;

console.log(total);
```

Output:

```text
Total: 300
```

The expression:

```js
price * quantity
```

is evaluated first.

Its result is then converted into part of the resulting string.

---

# 6. Expressions Inside Template Literals

You can use many JavaScript expressions.

### Arithmetic

```js
const price = 100;
const quantity = 2;

console.log(`Total: ${price * quantity}`);
```

Output:

```text
Total: 200
```

### Function call

```js
function getName() {
    return "Osama Abu Motlaq";
}

console.log(`User: ${getName()}`);
```

Output:

```text
User: Osama Abu Motlaq
```

### Conditional expression

```js
const age = 24;

const message = `${age >= 18 ? "Adult" : "Minor"}`;

console.log(message);
```

Output:

```text
Adult
```

### Property access

```js
const user = {
    name: "Osama Abu Motlaq"
};

console.log(`Name: ${user.name}`);
```

Output:

```text
Name: Osama Abu Motlaq
```

---

# 7. Nested Expressions

Expressions inside `${}` can contain more complex JavaScript.

```js
const user = {
    name: "Osama Abu Motlaq",
    age: 24
};

const message = `User: ${user.name}, Status: ${
    user.age >= 18 ? "Adult" : "Minor"
}`;

console.log(message);
```

Output:

```text
User: Osama Abu Motlaq, Status: Adult
```

Although this is valid, avoid making interpolation expressions unnecessarily complex.

A complicated expression is often better calculated before the template literal:

```js
const status = user.age >= 18 ? "Adult" : "Minor";

const message = `User: ${user.name}, Status: ${status}`;
```

This improves readability.

---

# 8. Multiple Variables

You can interpolate multiple values.

```js
const firstName = "Osama";
const lastName = "Abu Motlaq";

const fullName = `${firstName} ${lastName}`;

console.log(fullName);
```

Output:

```text
Osama Abu Motlaq
```

---

# 9. Multi-Line Strings

One of the major advantages of template literals is that they can span multiple lines.

```js
const message = `Hello, Osama Abu Motlaq.

Welcome to the JavaScript Reference.

Keep learning and practicing.`;

console.log(message);
```

The line breaks are preserved.

Output:

```text
Hello, Osama Abu Motlaq.

Welcome to the JavaScript Reference.

Keep learning and practicing.
```

With traditional quoted strings, creating multiline text this way is not directly supported.

---

# 10. Traditional Multi-Line Strings

Before template literals, developers commonly used concatenation:

```js
const message =
    "Hello, Osama Abu Motlaq.\n" +
    "Welcome to the JavaScript Reference.\n" +
    "Keep learning and practicing.";
```

Or explicit escape sequences:

```js
const message = "Hello, Osama Abu Motlaq.\nWelcome to JavaScript.";
```

Template literals are usually cleaner:

```js
const message = `Hello, Osama Abu Motlaq.
Welcome to JavaScript.`;
```

---

# 11. Newline Characters

A template literal preserves actual line breaks:

```js
const message = `Line 1
Line 2
Line 3`;
```

The resulting string contains newline characters.

You can also explicitly use:

```js
\n
```

inside a template literal:

```js
const message = `Line 1\nLine 2`;
```

Both approaches can create line breaks.

---

# 12. Whitespace Is Preserved

Template literals preserve whitespace inside the literal.

For example:

```js
const message = `
    Hello, Osama Abu Motlaq.
`;
```

The resulting string contains the newline and spaces around the text.

This can matter when generating:

* HTML strings
* SQL strings
* Configuration text
* Formatted output
* Multi-line messages

Do not assume indentation in your source code is automatically removed.

---

# 13. String Concatenation vs Template Literals

Traditional concatenation:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message = "Name: " + name + ", Role: " + role;
```

Template literal:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message = `Name: ${name}, Role: ${role}`;
```

The second version is generally easier to read.

---

# 14. Automatic String Conversion

Values interpolated into template literals are converted to strings.

```js
const age = 24;

const message = `Age: ${age}`;

console.log(message);
```

The number becomes part of the resulting string.

Booleans:

```js
const isStudent = true;

console.log(`Student: ${isStudent}`);
```

Output:

```text
Student: true
```

Arrays:

```js
const skills = ["HTML", "CSS", "JavaScript"];

console.log(`Skills: ${skills}`);
```

Output:

```text
Skills: HTML,CSS,JavaScript
```

Objects should be handled carefully:

```js
const user = {
    name: "Osama Abu Motlaq"
};

console.log(`User: ${user}`);
```

The result is typically:

```text
User: [object Object]
```

For readable object output, use something like:

```js
console.log(`User: ${JSON.stringify(user)}`);
```

---

# 15. Function Calls

You can call functions inside interpolation.

```js
function getGreeting() {
    return "Hello";
}

const message = `${getGreeting()}, Osama Abu Motlaq!`;

console.log(message);
```

Output:

```text
Hello, Osama Abu Motlaq!
```

The function executes before its returned value is inserted into the string.

---

# 16. Method Calls

Methods can also be called.

```js
const name = "Osama Abu Motlaq";

const message = `Name: ${name.toUpperCase()}`;

console.log(message);
```

Output:

```text
Name: OSAMA ABU MOTLAQ
```

This is useful, but keep complex logic outside the template when readability starts to suffer.

---

# 17. Conditional Values

A ternary expression can be useful inside a template literal.

```js
const isAvailable = true;

const message = `Status: ${isAvailable ? "Available" : "Unavailable"}`;

console.log(message);
```

Output:

```text
Status: Available
```

This is particularly common when generating dynamic UI text.

---

# 18. Template Literals and Objects

You can access object properties directly.

```js
const developer = {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
};

const profile = `
Name: ${developer.name}
Role: ${developer.role}
`;

console.log(profile);
```

Output:

```text
Name: Osama Abu Motlaq
Role: Frontend Developer
```

This makes template literals useful for generating formatted text from structured data.

---

# 19. Template Literals and Arrays

You can access array elements:

```js
const projects = ["Portfolio", "Dashboard", "E-Commerce"];

const message = `First project: ${projects[0]}`;

console.log(message);
```

Output:

```text
First project: Portfolio
```

You can also call array methods:

```js
const projects = ["Portfolio", "Dashboard", "E-Commerce"];

const message = `Projects: ${projects.join(", ")}`;

console.log(message);
```

Output:

```text
Projects: Portfolio, Dashboard, E-Commerce
```

---

# 20. Nested Template Literals

Template literals can be nested inside expressions.

For example:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message = `${`Name: ${name}`} - ${`Role: ${role}`}`;

console.log(message);
```

Output:

```text
Name: Osama Abu Motlaq - Role: Frontend Developer
```

This is valid but usually unnecessary.

Prefer a simpler version:

```js
const message = `Name: ${name} - Role: ${role}`;
```

Nested template literals should only be used when they genuinely improve structure.

---

# 21. Escaping Backticks

Because template literals use backticks, you need to escape a literal backtick inside them.

Use:

```js
\`
```

Example:

```js
const message = `Use the \`const\` keyword when reassignment is unnecessary.`;

console.log(message);
```

Output:

```text
Use the `const` keyword when reassignment is unnecessary.
```

---

# 22. Escaping `${`

Normally:

```js
${name}
```

starts interpolation.

If you want the literal characters `${`, escape the dollar sign:

```js
const message = `Use \${name} for interpolation syntax.`;

console.log(message);
```

Output:

```text
Use ${name} for interpolation syntax.
```

---

# 23. Backslash Escaping

Template literals still support JavaScript escape sequences.

Examples include:

```text
\n
\t
\\
\`
\$
```

For example:

```js
const message = `Hello,\tOsama Abu Motlaq`;

console.log(message);
```

The `\t` represents a tab character.

---

# 24. Tagged Template Literals

A more advanced feature is the **tagged template literal**.

Instead of simply writing:

```js
const message = `Hello, Osama Abu Motlaq`;
```

you can place a function before the template:

```js
function tag(strings, ...values) {
    console.log(strings);
    console.log(values);
}

const name = "Osama Abu Motlaq";

tag`Hello, ${name}!`;
```

The function receives the template's static strings and interpolated values separately.

Conceptually:

```text
Template
   ↓
Tag function
   ↓
strings + values
```

This allows developers to process template literals programmatically.

---

# 25. Understanding Tagged Templates

Consider:

```js
const name = "Osama Abu Motlaq";

function tag(strings, ...values) {
    console.log(strings);
    console.log(values);
}

tag`Hello, ${name}!`;
```

The function receives something conceptually similar to:

```js
strings = ["Hello, ", "!"];
values = ["Osama Abu Motlaq"];
```

The exact `strings` object is a frozen array-like structure, but conceptually this is enough to understand the mechanism.

Tagged templates are an advanced JavaScript feature.

You do not need them for normal React development, but understanding them helps you recognize the syntax when you encounter libraries that use tagged templates.

---

# 26. Tagged Templates Can Return Any Value

A tag function is just a function.

Therefore, it does not have to return a string.

```js
function tag(strings, ...values) {
    return values;
}

const name = "Osama Abu Motlaq";

const result = tag`Hello, ${name}!`;

console.log(result);
```

The returned value is determined by the tag function.

This means tagged templates are a mechanism for custom processing, not simply another form of string interpolation.

---

# 27. `String.raw`

JavaScript also provides `String.raw`, which can be useful when you want access to the raw template text.

Example:

```js
const path = String.raw`C:\Users\Osama Abu Motlaq\Projects`;

console.log(path);
```

The backslashes are preserved rather than being interpreted as ordinary escape sequences.

This can be useful when working with:

* File paths
* Regular expressions
* Raw text
* Escaped strings

However, `String.raw` does not mean "safe string."

It simply changes how the template's raw characters are processed.

---

# 28. Template Literals in React

Template literals are **highly relevant to React**.

They are frequently used for dynamic values.

For example:

```js
const userName = "Osama Abu Motlaq";

const message = `Welcome, ${userName}`;
```

They are also commonly used when constructing dynamic class names.

Example:

```js
const isActive = true;

const className = `button ${isActive ? "active" : ""}`;
```

Then:

```jsx
<button className={className}>
    Click Me
</button>
```

However, React JSX itself already provides an expression system:

```jsx
<h1>Hello, {userName}</h1>
```

Notice the distinction:

```text
JavaScript template literal:
`Hello, ${userName}`

JSX:
<h1>Hello, {userName}</h1>
```

Both allow dynamic values, but they belong to different syntaxes.

---

# 29. Template Literals vs JSX Expressions

This distinction is important when learning React.

JavaScript:

```js
const message = `Hello, ${name}`;
```

JSX:

```jsx
<h1>Hello, {name}</h1>
```

In a JavaScript template literal, interpolation uses:

```text
${...}
```

In JSX, JavaScript expressions use:

```text
{...}
```

Do not confuse them.

---

# 30. Dynamic URLs

Template literals are useful for constructing URLs.

For example:

```js
const userId = 42;

const url = `/users/${userId}`;

console.log(url);
```

Output:

```text
/users/42
```

This pattern appears frequently in React, Next.js, API requests, and routing.

For example:

```js
const projectId = 42;

const url = `/projects/${projectId}`;
```

---

# 31. Dynamic API Endpoints

Template literals are commonly used with API URLs.

```js
const userId = 42;

const endpoint = `https://api.example.com/users/${userId}`;

console.log(endpoint);
```

The dynamic value is inserted into the string.

In real applications, make sure dynamic values are properly validated and encoded when appropriate.

---

# 32. Template Literals and `fetch`

A common modern JavaScript pattern is:

```js
const userId = 42;

const response = await fetch(
    `https://api.example.com/users/${userId}`
);
```

The URL changes based on `userId`.

Template literals therefore become useful when working with:

* REST APIs
* Dynamic routes
* Query parameters
* Resource identifiers

---

# 33. Dynamic File Paths

Template literals can construct paths:

```js
const fileName = "profile";

const path = `/images/${fileName}.png`;

console.log(path);
```

Output:

```text
/images/profile.png
```

In frameworks such as Next.js, dynamic values are frequently part of URLs and route paths.

---

# 34. Common Mistakes

## Mistake 1: Using Quotes Instead of Backticks

This does not interpolate:

```js
const name = "Osama Abu Motlaq";

const message = "Hello, ${name}";
```

Output:

```text
Hello, ${name}
```

Use backticks:

```js
const message = `Hello, ${name}`;
```

Output:

```text
Hello, Osama Abu Motlaq
```

---

## Mistake 2: Forgetting `${}`

This does not interpolate the variable:

```js
const name = "Osama Abu Motlaq";

const message = `Hello, name`;
```

Output:

```text
Hello, name
```

Correct:

```js
const message = `Hello, ${name}`;
```

---

## Mistake 3: Confusing `$` with Interpolation

This is incorrect:

```js
const message = `Hello, $name`;
```

Correct:

```js
const message = `Hello, ${name}`;
```

The braces are required.

---

## Mistake 4: Complex Logic Inside `${}`

Technically, you can write:

```js
const message = `Result: ${
    someVeryLongFunction(
        anotherFunction(
            calculateSomething()
        )
    )
}`;
```

But this can quickly become difficult to read.

Prefer:

```js
const result = someVeryLongFunction(
    anotherFunction(
        calculateSomething()
    )
);

const message = `Result: ${result}`;
```

Template literals should improve readability, not reduce it.

---

# 35. Security Considerations

Template literals themselves are not a security mechanism.

For example:

```js
const userInput = "<script>...</script>";

const html = `<div>${userInput}</div>`;
```

Creating this string does not automatically make it safe to insert into raw HTML.

Security depends on how the resulting string is used.

This distinction is especially important when dealing with:

* User input
* HTML
* SQL
* URLs
* Shell commands
* Generated code

Never assume:

```text
Template literal = safe output
```

It does not.

---

# 36. Template Literals vs String Concatenation

### Concatenation

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message =
    "My name is " + name + " and I am a " + role + ".";
```

### Template literal

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message =
    `My name is ${name} and I am a ${role}.`;
```

The template literal is generally easier to scan and maintain.

---

# 37. When to Use Template Literals

Template literals are a strong choice when:

* A string contains variables.
* A string contains expressions.
* You need multiple lines.
* You are constructing dynamic URLs.
* You are generating formatted text.
* You need readable string interpolation.

Example:

```js
const name = "Osama Abu Motlaq";
const projects = 5;

const summary = `
Developer: ${name}
Projects: ${projects}
`;

console.log(summary);
```

---

# 38. When Normal Quotes Are Fine

You do not have to use template literals for every string.

If there is no interpolation or multiline content, a normal string is perfectly reasonable:

```js
const role = "Frontend Developer";
```

There is no need to write:

```js
const role = `Frontend Developer`;
```

just because template literals exist.

Choose the syntax that communicates the intent clearly.

---

# 39. Best Practices

### 39.1 Prefer Template Literals for Interpolation

Prefer:

```js
const message = `Hello, ${name}`;
```

over:

```js
const message = "Hello, " + name;
```

when the string contains several dynamic values.

---

### 39.2 Keep Expressions Simple

Prefer:

```js
const status = isActive ? "Active" : "Inactive";

const message = `Status: ${status}`;
```

over placing a large amount of logic inside `${}`.

---

### 39.3 Do Not Use Template Literals Unnecessarily

For a static string:

```js
const title = "JavaScript Reference";
```

is perfectly clear.

---

### 39.4 Be Careful with Whitespace

Remember that template literals preserve line breaks and indentation.

If exact formatting matters, inspect the resulting string.

---

### 39.5 Do Not Treat Template Literals as a Security Feature

Template literals only construct strings.

They do not sanitize:

* HTML
* SQL
* URLs
* User input
* Commands

Security must be handled separately.

---

# 40. Quick Reference

## Basic Template Literal

```js
const message = `Hello, Osama Abu Motlaq`;
```

## Interpolation

```js
const name = "Osama Abu Motlaq";

const message = `Hello, ${name}`;
```

## Expression

```js
const total = `Total: ${100 * 2}`;
```

## Function Call

```js
const message = `Name: ${getName()}`;
```

## Object Property

```js
const message = `Name: ${user.name}`;
```

## Conditional

```js
const message = `${isActive ? "Active" : "Inactive"}`;
```

## Multi-Line

```js
const message = `Line 1
Line 2
Line 3`;
```

## Escaped Backtick

```js
const message = `Use \`const\` for fixed bindings.`;
```

## Literal `${}`

```js
const message = `Use \${name}`;
```

## Tagged Template

```js
tag`Hello, ${name}`;
```

## Raw Template

```js
String.raw`C:\Users\Osama Abu Motlaq`;
```

---

# 41. Key Takeaways

1. Template literals were introduced in ES6.
2. They use backticks instead of single or double quotes.
3. Interpolation uses `${expression}`.
4. `${}` can contain JavaScript expressions, not only variables.
5. Template literals support natural multi-line strings.
6. Newlines and whitespace inside the literal are preserved.
7. Values inserted through interpolation are converted to strings.
8. Template literals can contain function calls and property access.
9. Tagged template literals allow custom processing of template data.
10. `String.raw` provides access to raw template content.
11. Template literals are heavily useful in React and Next.js for dynamic strings, URLs, and class names.
12. JSX uses `{expression}`, while JavaScript template literals use `${expression}`.
13. Template literals do not provide automatic security or sanitization.
14. Use them when they improve readability; do not use them simply because they are modern.

---

# 42. Final Mental Model

Think of a template literal as:

```text
Backticks
    +
Static text
    +
${JavaScript expression}
    =
One resulting string
```

For example:

```js
const name = "Osama Abu Motlaq";
const age = 24;

const message = `My name is ${name} and I am ${age} years old.`;
```

JavaScript evaluates:

```text
name → "Osama Abu Motlaq"
age  → 24
```

and produces:

```text
"My name is Osama Abu Motlaq and I am 24 years old."
```

The core syntax to remember is:

```js
`Text ${expression} more text`
```

The next topic is:

```text
05-es6-features/03-destructuring.md
```
