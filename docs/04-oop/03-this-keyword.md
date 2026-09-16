# The `this` Keyword

The `this` keyword is one of the most important concepts in JavaScript.

It is also one of the most misunderstood.

The most important rule to remember is:

> The value of `this` is primarily determined by **how a function is called**, not where the function was defined.

This is especially important when working with:

* Objects
* Methods
* Constructor functions
* Classes
* Event handlers
* Callbacks
* Arrow functions
* `call()`
* `apply()`
* `bind()`

---

# 1. What Is `this`?

`this` is a special keyword that refers to a value determined by the function's execution context.

Consider:

```javascript id="0p4n3r"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    console.log(this.name);
  },
};

user.greet();
```

Output:

```text id="2x7h1k"
Osama Abu Motlaq
```

In this call:

```javascript id="l9b6k8"
user.greet();
```

`this` refers to:

```text id="1qg5x7"
user
```

Therefore:

```javascript id="b8p3kl"
this.name
```

is equivalent to:

```javascript id="u4y9qc"
user.name
```

---

# 2. The Most Important Rule

Do not think:

> "`this` means the object where the function was created."

Instead, ask:

> **How was the function called?**

Compare:

```javascript id="1h0qzy"
user.greet();
```

with:

```javascript id="0r4t2m"
const greet = user.greet;

greet();
```

These are different call sites.

The first call has:

```text id="1ihy0v"
user.greet()
     │
     └── this → user
```

The second call is:

```text id="3yq2em"
greet()
  │
  └── no object receiver
```

The value of `this` can therefore be different.

---

# 3. `this` in an Object Method

The simplest case is a method call.

```javascript id="h4wz0s"
const user = {
  name: "Osama Abu Motlaq",

  introduce() {
    return `My name is ${this.name}.`;
  },
};

console.log(user.introduce());
```

Output:

```text id="s5f0a1"
My name is Osama Abu Motlaq.
```

Here:

```javascript id="s7ck6h"
user.introduce();
```

sets the method's `this` to `user`.

---

# 4. `this` Is Not the Object Itself

It is useful to be precise.

Consider:

```javascript id="6xk2w1"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this;
  },
};
```

Calling:

```javascript id="gj6f3n"
console.log(user.greet());
```

returns the object used as the receiver of the call.

Conceptually:

```text id="c8q8wu"
user.greet()
    │
    ▼
   this
    │
    ▼
  user
```

But `this` is not permanently attached to `user`.

If the function is called differently, `this` can change.

---

# 5. Extracting a Method

Consider:

```javascript id="x4c5h6"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

This works:

```javascript id="b2r5k4"
user.greet();
```

But:

```javascript id="7lq0ab"
const greet = user.greet;

greet();
```

is a different function call.

The function was extracted from the object.

The important distinction is:

```text id="x9k6va"
user.greet()
```

versus:

```text id="8m1kpf"
greet()
```

The call expression determines the context.

---

# 6. `this` in Regular Functions

A regular function does not automatically inherit the `this` value from the surrounding object.

For example:

```javascript id="5ec0g8"
function showThis() {
  console.log(this);
}
```

How `this` behaves depends on how `showThis()` is called and whether strict mode is active.

This is why it is dangerous to memorize a single value for `this`.

Instead, identify the **call form**.

---

# 7. Default Binding

When a regular function is called without an object receiver:

```javascript id="5e5vkn"
function showThis() {
  console.log(this);
}

showThis();
```

In a typical browser script without strict mode, `this` can refer to the global object.

In strict mode:

```javascript id="f8q9gd"
"use strict";

function showThis() {
  console.log(this);
}

showThis();
```

`this` is:

```text id="9r6zcd"
undefined
```

Modern JavaScript modules are strict by default, so strict-mode behavior is especially important in modern application development.

---

# 8. Strict Mode

Strict mode changes the default `this` behavior of regular functions.

Without strict mode:

```javascript id="g9pl0p"
function greet() {
  console.log(this);
}
```

A plain function call may use the global object as `this`.

With strict mode:

```javascript id="8a5f8n"
"use strict";

function greet() {
  console.log(this);
}

greet();
```

`this` is:

```text id="4h8f7c"
undefined
```

Modules are automatically strict, so code using ES modules behaves accordingly.

---

# 9. Method Calls vs Plain Function Calls

Compare these two forms:

### Method call

```javascript id="f1i9nq"
user.greet();
```

Conceptually:

```text id="qf4r5r"
this → user
```

### Plain function call

```javascript id="2e0m2k"
const greet = user.greet;

greet();
```

The object receiver is gone.

Therefore, the `this` value is no longer automatically `user`.

This distinction explains many real-world JavaScript bugs.

---

# 10. Nested Objects

The object immediately before the method call determines the receiver.

```javascript id="u0d2m7"
const app = {
  user: {
    name: "Osama Abu Motlaq",

    greet() {
      return this.name;
    },
  },
};

console.log(app.user.greet());
```

Here:

```javascript id="r8n8r5"
app.user.greet();
```

`this` refers to:

```text id="2r5e8s"
app.user
```

not:

```text id="7a4v5x"
app
```

The immediate receiver is `app.user`.

---

# 11. Reassigning a Method

Consider:

```javascript id="5xv7xq"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};

const anotherUser = {
  name: "Osama Abu Motlaq",
  greet: user.greet,
};
```

Now:

```javascript id="n1e5vz"
anotherUser.greet();
```

uses:

```text id="l0s8zw"
this → anotherUser
```

The function was originally defined inside `user`, but that does not permanently bind `this` to `user`.

This is a crucial JavaScript concept.

---

# 12. `this` in Constructor Functions

Constructor functions are called with `new`.

```javascript id="9q1y7d"
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

When called with `new`, `this` refers to the newly created instance.

Conceptually:

```text id="r2f8sk"
new User(...)
      │
      ▼
new object
      │
      ▼
this → new object
```

Therefore:

```javascript id="5t7w9f"
this.name = name;
```

adds `name` to the new object.

---

# 13. `this` in Classes

The same concept applies to class constructors.

```javascript id="8r0b4f"
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

const user = new User("Osama Abu Motlaq");
```

When:

```javascript id="x5n1p9"
user.greet();
```

is called:

```text id="3o9zv4"
this → user
```

The constructor also uses `this` to initialize the instance.

---

# 14. `this` in Class Methods

Consider:

```javascript id="f2v8xj"
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return this.name;
  }
}
```

Calling:

```javascript id="9c2k1m"
const user = new User("Osama Abu Motlaq");

console.log(user.greet());
```

makes:

```text id="d3b0yw"
this → user
```

But extracting the method can cause a problem:

```javascript id="c1q6zs"
const greet = user.greet;

greet();
```

The extracted method is no longer called as:

```javascript id="e7t8p4"
user.greet();
```

This is one reason callbacks involving class methods often require explicit binding.

---

# 15. Arrow Functions and `this`

Arrow functions behave differently from regular functions.

Arrow functions do **not** have their own `this`.

Instead, they capture `this` from the surrounding lexical scope.

Consider:

```javascript id="9p6x7k"
const user = {
  name: "Osama Abu Motlaq",

  greet: () => {
    return this.name;
  },
};
```

This does not make `this` refer to `user`.

That is because the arrow function does not create its own `this`.

Therefore, using an arrow function as an object method is usually incorrect when you need:

```javascript id="f7y3qn"
this
```

to refer to the object.

Prefer:

```javascript id="2y7r1w"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

---

# 16. Lexical `this`

The phrase **lexical `this`** means that an arrow function gets `this` from its surrounding scope.

Example:

```javascript id="p6o5b2"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    const showName = () => {
      return this.name;
    };

    return showName();
  },
};
```

Here:

```javascript id="y7s4c1"
showName
```

is an arrow function.

It does not create a new `this`.

It captures the `this` from:

```javascript id="n4q1vf"
greet()
```

Therefore:

```text id="0o8l2u"
user.greet()
      │
      ▼
    this → user
      │
      ▼
 arrow function captures this
```

This is one of the most useful practical applications of arrow functions.

---

# 17. Arrow Functions in Callbacks

Consider:

```javascript id="d4q8v7"
class User {
  constructor(name) {
    this.name = name;
  }

  greetLater() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
}
```

The arrow function captures the `this` from `greetLater()`.

Therefore, when the callback executes later, it can still access the instance:

```text id="x5o6sk"
greetLater()
     │
     ▼
 this → user instance
     │
     ▼
arrow callback captures this
     │
     ▼
setTimeout executes callback later
```

This is a major reason arrow functions are useful for callbacks.

---

# 18. `this` with `call()`

`call()` allows you to explicitly specify the `this` value.

```javascript id="q8j6pk"
function greet() {
  return `Hello, ${this.name}!`;
}

const user = {
  name: "Osama Abu Motlaq",
};

console.log(greet.call(user));
```

Output:

```text id="3e9w8m"
Hello, Osama Abu Motlaq!
```

The syntax is:

```javascript id="c4n5xq"
function.call(thisValue, arg1, arg2);
```

`call()` invokes the function immediately.

---

# 19. `call()` with Arguments

```javascript id="2n9z5k"
function greet(message) {
  return `${message}, ${this.name}!`;
}

const user = {
  name: "Osama Abu Motlaq",
};

console.log(greet.call(user, "Welcome"));
```

Output:

```text id="2g5g2d"
Welcome, Osama Abu Motlaq!
```

Here:

```text id="d3y1w5"
user
  ↓
this

"Welcome"
  ↓
message
```

---

# 20. `apply()`

`apply()` is similar to `call()`.

The main difference is how arguments are supplied.

`call()`:

```javascript id="3c4t5u"
greet.call(user, "Welcome");
```

`apply()`:

```javascript id="m5w6x7"
greet.apply(user, ["Welcome"]);
```

Both invoke the function immediately.

Conceptually:

```text id="4td8g0"
call()
 └── arguments individually

apply()
 └── arguments in an array-like collection
```

---

# 21. `bind()`

`bind()` creates a new function with a permanently bound `this` value.

```javascript id="v8n3c2"
function greet() {
  return `Hello, ${this.name}!`;
}

const user = {
  name: "Osama Abu Motlaq",
};

const boundGreet = greet.bind(user);

console.log(boundGreet());
```

Output:

```text id="z2y9j7"
Hello, Osama Abu Motlaq!
```

Unlike `call()` and `apply()`, `bind()` does not immediately execute the function.

It returns a new function.

---

# 22. `call()` vs `apply()` vs `bind()`

| Method    | Executes immediately? | How arguments are supplied   |
| --------- | --------------------- | ---------------------------- |
| `call()`  | Yes                   | Individual arguments         |
| `apply()` | Yes                   | Array-like collection        |
| `bind()`  | No                    | Returns a new bound function |

Example:

```javascript id="4k8x6s"
greet.call(user, "Hello");

greet.apply(user, ["Hello"]);

const boundGreet = greet.bind(user);
boundGreet("Hello");
```

---

# 23. Binding Class Methods

Consider:

```javascript id="2g9c4p"
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

const user = new User("Osama Abu Motlaq");

const greet = user.greet;

greet();
```

The extracted method may lose the expected instance context.

You can explicitly bind it:

```javascript id="v5h3m0"
const greet = user.greet.bind(user);

console.log(greet());
```

Now:

```text id="0w6r2a"
greet()
  │
  ▼
this → user
```

---

# 24. `this` in Event Handlers

In browser APIs, regular function callbacks can receive a `this` value related to the event target depending on the API and invocation mechanism.

For example:

```javascript id="q3f5h8"
button.addEventListener("click", function () {
  console.log(this);
});
```

For a normal DOM event listener callback, `this` refers to the element on which the listener is registered.

An arrow function behaves differently:

```javascript id="z8p2v1"
button.addEventListener("click", () => {
  console.log(this);
});
```

The arrow function captures `this` from its surrounding lexical scope rather than receiving its own event-listener `this`.

In modern code, `event.currentTarget` is often clearer when you specifically want the element handling the event.

---

# 25. `this` in DOM Event Handlers vs React

In vanilla JavaScript:

```javascript id="2h6v9q"
button.addEventListener("click", function () {
  console.log(this);
});
```

the browser's event-listener mechanism determines the `this` value for the regular callback.

In React function components, you generally do not rely on `this` for event handlers.

For example:

```javascript id="k4r7z2"
function Button() {
  function handleClick() {
    console.log("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

Modern React uses function components and Hooks, so `this` is much less central than it was in React class components.

---

# 26. `this` in React Class Components

Older React code may contain:

```javascript id="m8q2w4"
class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props);
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

The binding was necessary because passing the method as a callback could lose the intended instance context.

Modern React function components largely eliminate this pattern.

Understanding it is still useful when reading older React code.

---

# 27. `this` and Object Methods

A useful mental model is:

```javascript id="1a4w7x"
object.method();
```

For a regular function used as a method:

```text id="q6j4y9"
object
   │
   ▼
 this
```

But:

```javascript id="4x7m2k"
const method = object.method;

method();
```

changes the call form:

```text id="8w5c3z"
method()
   │
   ▼
no object receiver
```

This is why extracting methods can produce unexpected `this` behavior.

---

# 28. `this` Is Not Lexically Bound in Regular Functions

Regular functions determine `this` dynamically.

For example:

```javascript id="0y3q6h"
function greet() {
  return this.name;
}

const user = {
  name: "Osama Abu Motlaq",
  greet,
};

const anotherUser = {
  name: "Osama Abu Motlaq",
  greet,
};

console.log(user.greet());
console.log(anotherUser.greet());
```

The same function can use different `this` values depending on the receiver.

This is dynamic `this` behavior.

---

# 29. Arrow Functions Are Different

An arrow function does not dynamically receive `this`.

```javascript id="w8m4s6"
const greet = () => {
  return this.name;
};
```

Its `this` comes from the surrounding lexical scope.

This means:

```text id="1s7d4k"
Regular function
    ↓
dynamic this

Arrow function
    ↓
lexical this
```

This is one of the most important differences between regular and arrow functions.

---

# 30. `call()`, `apply()`, and Arrow Functions

`call()`, `apply()`, and `bind()` can control `this` for regular functions.

They do not override the lexical `this` of an arrow function.

For example:

```javascript id="5m8w1q"
const greet = () => {
  return this.name;
};

greet.call({
  name: "Osama Abu Motlaq",
});
```

The arrow function does not use the supplied object as its `this`.

This is another reason to remember:

> Arrow functions do not have their own `this`.

---

# 31. Common `this` Mistake

A frequent mistake is assuming that `this` refers to the object where the function was defined.

```javascript id="8h5k2m"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

It is tempting to think:

```text id="8l3r0q"
this = user forever
```

That is incorrect.

The function can be extracted:

```javascript id="g5q9s2"
const greet = user.greet;
```

and called independently.

The call form changed.

---

# 32. Another Common Mistake: Arrow Method

This is usually not what you want:

```javascript id="m7x1p3"
const user = {
  name: "Osama Abu Motlaq",

  greet: () => {
    return this.name;
  },
};
```

The arrow function does not receive `user` as `this`.

Use a regular method when you need the object as `this`:

```javascript id="n6q4r8"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

---

# 33. Another Common Mistake: Losing `this` in a Callback

Consider:

```javascript id="p9w2x4"
class User {
  constructor(name) {
    this.name = name;
  }

  greetLater() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
}
```

The regular callback has its own `this` behavior.

A common solution is an arrow function:

```javascript id="r5t7k1"
class User {
  constructor(name) {
    this.name = name;
  }

  greetLater() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
}
```

The arrow callback captures the surrounding `this`.

---

# 34. `this` with Destructuring

Destructuring a method can also lose the method-call context.

```javascript id="s2q8v5"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};

const { greet } = user;

greet();
```

The extracted function is no longer called as:

```javascript id="z3f6x1"
user.greet();
```

If the function requires `this`, the context must be preserved explicitly.

One option is:

```javascript id="w6k4r2"
const greet = user.greet.bind(user);
```

---

# 35. `this` and Closures

Closures and `this` are separate concepts.

A closure allows a function to remember variables from its lexical scope.

`this` is determined differently for regular functions.

For example:

```javascript id="y7m3q8"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    const name = this.name;

    return function () {
      return name;
    };
  },
};
```

The returned function remembers `name` through closure.

It does not need `this`.

This distinction is important:

```text id="8p4x2s"
Closure
  ↓
remembers lexical variables

this
  ↓
depends on function invocation rules
```

Arrow functions combine lexical scoping with lexical `this`, but these are still conceptually distinct mechanisms.

---

# 36. Practical Example: Counter

```javascript id="e5k8w2"
const counter = {
  count: 0,

  increment() {
    this.count += 1;
  },

  getCount() {
    return this.count;
  },
};

counter.increment();
counter.increment();

console.log(counter.getCount());
```

Output:

```text id="h2q6m9"
2
```

The methods use:

```javascript id="a9r3p7"
this.count
```

to access the state belonging to the object.

---

# 37. Practical Example: Class

```javascript id="k7w4x1"
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");

console.log(user.introduce());
```

Output:

```text id="q3n8v5"
My name is Osama Abu Motlaq.
```

Here `this` represents the instance created by `new User()`.

---

# 38. Decision Table

Use this table as a quick mental model.

| Call Style                | Regular Function `this`    |
| ------------------------- | -------------------------- |
| `object.method()`         | `object`                   |
| `method()` in strict mode | `undefined`                |
| `new Function()`          | Newly created instance     |
| `function.call(object)`   | Explicitly supplied object |
| `function.apply(object)`  | Explicitly supplied object |
| `function.bind(object)`   | Bound to supplied object   |
| Arrow function            | Lexically inherited `this` |

The exact behavior can also be affected by special invocation mechanisms, but these rules cover the core cases.

---

# 39. Best Practices

### Use regular methods when an object should be `this`

Prefer:

```javascript id="u6m2x9"
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

---

### Use arrow functions when lexical `this` is useful

Arrow functions are particularly useful inside callbacks:

```javascript id="q9w5e1"
class User {
  greetLater() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
}
```

---

### Do not memorize `this` as "the current object"

The more accurate mental model is:

> For regular functions, determine `this` from the call site.

---

### Use `bind()` when a method must keep its instance context

```javascript id="t8r4n6"
const handler = user.greet.bind(user);
```

This is especially relevant when passing methods as callbacks.

---

### Prefer explicit references when they improve clarity

In event handlers, for example:

```javascript id="c5y9k2"
event.currentTarget
```

can be clearer than relying on `this`.

---

# 40. React Relevance

Understanding `this` is **important for JavaScript**, but its importance in modern React is lower than it was in older React.

Modern React primarily uses:

* Function components
* Hooks
* Arrow functions
* Closures
* Props
* State

You will rarely need `this` in a modern React function component.

However, understanding `this` is still valuable because it appears in:

* JavaScript objects
* Classes
* Constructor functions
* Browser APIs
* Third-party libraries
* Node.js code
* Older React class components
* Technical interviews

For your React learning path, you should understand `this` well enough to explain it and debug it, but you do **not** need to build modern React applications around class-based `this` patterns.

---

# 41. Mental Model

When you see:

```javascript id="a6f9x2"
object.method();
```

start with:

```text id="b4r7k1"
Who is before the dot?
        │
        ▼
      object
        │
        ▼
      this
```

When you see:

```javascript id="d8m3q5"
const method = object.method;

method();
```

ask:

```text id="z1x6c8"
Is the function still being called
through an object?
        │
       No
        │
        ▼
Different this behavior
```

When you see:

```javascript id="m5q9w3"
() => {}
```

remember:

```text id="s7k2v4"
Arrow function
      ↓
No own this
      ↓
Lexically inherited this
```

When you see:

```javascript id="p8r4y6"
new User();
```

remember:

```text id="f2k7m1"
new
 ↓
new instance
 ↓
this → new instance
```

---

# 42. Key Takeaways

* `this` is a special JavaScript keyword.
* For regular functions, `this` is primarily determined by how the function is called.
* `object.method()` gives the regular method's `this` value as the object receiver.
* Extracting a method changes the call form and can change `this`.
* Strict mode makes plain regular function calls use `undefined` for `this`.
* JavaScript modules are strict by default.
* Constructor functions use `this` to initialize newly created instances.
* Class constructors use `this` to initialize instances.
* Class methods use `this` when called through an instance.
* Arrow functions do not have their own `this`.
* Arrow functions capture `this` lexically from the surrounding scope.
* `call()` invokes a function immediately with an explicitly supplied `this`.
* `apply()` does the same while accepting arguments as an array-like collection.
* `bind()` creates a new function with a bound `this`.
* `call()`, `apply()`, and `bind()` cannot override an arrow function's lexical `this`.
* `this` and closures are different mechanisms.
* Modern React function components use `this` much less than older React class components.
* Understanding `this` is essential for understanding JavaScript objects, constructors, prototypes, and classes.

---

## Next Topic

```text id="v8q3m1"
04-constructor-functions.md
```

The next topic explains how JavaScript historically created reusable object instances before `class` syntax, how `new` works, and how constructor functions connect directly to the prototype system.
