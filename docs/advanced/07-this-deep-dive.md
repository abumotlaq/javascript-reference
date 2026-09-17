# JavaScript `this` Deep Dive

## Overview

The `this` keyword is one of the most commonly misunderstood parts of JavaScript.

The most important rule is:

```text
For regular functions, `this` is primarily determined by how the function is called.
```

It is not simply determined by:

* Where the function was written
* Where the function is declared
* Which object contains the function
* Which variable name stores the function

Arrow functions behave differently because they do not create their own `this` binding.

Understanding `this` is important for:

* Objects and methods
* Constructor functions
* Classes
* Event handlers
* Callbacks
* `call()`
* `apply()`
* `bind()`
* Strict mode
* Arrow functions
* React and browser code

---

# What Is `this`?

`this` is a special keyword whose value depends on the execution context and, for regular functions, the way the function is invoked.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(this.name);
  },
};

user.showName();
```

Inside `showName()`:

```js
this
```

refers to the object used as the receiver of the method call.

In this case:

```js
this === user
```

---

# `this` Is Not the Same as a Normal Variable

You cannot think of:

```js
const this = user;
```

because `this` is not a normal identifier that you define with `let`, `const`, or `var`.

The runtime determines its value according to the function's invocation semantics.

---

# `this` in a Method Call

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    console.log(
      `Hello, ${this.name}!`
    );
  },
};

user.greet();
```

The important part is:

```js
user.greet();
```

The function is called as a property access on `user`.

Conceptually:

```text
user.greet()
     |
     v
this → user
```

---

# The Receiver Object

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};
```

This:

```js
user.showName();
```

is different from storing the method separately:

```js
const showName =
  user.showName;
```

and then:

```js
showName();
```

The function is the same function.

The invocation form is different.

---

# Losing the Receiver

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const showName =
  user.showName;

showName();
```

The second call is not a method call on `user`.

The relationship:

```text
user.showName()
```

has been lost.

For regular functions, that can change the `this` value.

---

# Four Important `this` Rules

For regular functions, focus on these common invocation forms:

```text
1. Method call
2. Plain function call
3. Explicit binding
4. Constructor call
```

Arrow functions follow a different model.

---

# Rule 1: Method Call

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    return this.name;
  },
};

console.log(
  user.showName()
);
```

Here:

```js
this === user
```

---

# Another Method Example

```js
const profile = {
  name: "Osama Abu Motlaq",

  getRole() {
    return "Frontend Developer";
  },

  describe() {
    return `${this.name} is a ${this.getRole()}.`;
  },
};

console.log(
  profile.describe()
);
```

Inside `describe()`:

```js
this
```

refers to `profile`.

Therefore:

```js
this.name
this.getRole()
```

refer to properties and methods on the same object.

---

# Nested Property Access

```js
const application = {
  user: {
    name: "Osama Abu Motlaq",

    show() {
      console.log(
        this.name
      );
    },
  },
};

application.user.show();
```

The immediate receiver is:

```text
application.user
```

Therefore:

```js
this === application.user
```

inside `show()`.

---

# Method Borrowing

A method can be borrowed from one object and called with another object.

```js
const firstUser = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const secondUser = {
  name: "Osama Abu Motlaq - Developer",
};

secondUser.showName =
  firstUser.showName;

secondUser.showName();
```

Output:

```text
Osama Abu Motlaq - Developer
```

The function comes from `firstUser`.

But the invocation receiver is:

```js
secondUser
```

Therefore:

```js
this === secondUser
```

---

# Rule 2: Plain Function Call

Consider:

```js
function showThis() {
  console.log(this);
}

showThis();
```

The function is not called as a method.

The result depends on the execution mode and host/runtime rules.

In strict mode:

```js
"use strict";

function showThis() {
  console.log(this);
}

showThis();
```

`this` is:

```text
undefined
```

---

# Strict Mode

Strict mode changes plain function-call behavior.

Example:

```js
"use strict";

function showThis() {
  return this;
}

console.log(
  showThis()
);
```

Result:

```text
undefined
```

This is one reason strict mode is useful when reasoning about `this`.

---

# Non-Strict Plain Calls

In non-strict code, plain function calls can involve `this` substitution behavior.

Historically, browsers often expose the global object in such cases.

Example:

```js
function showThis() {
  console.log(this);
}

showThis();
```

Do not rely on this behavior in modern application architecture.

Prefer understanding explicit invocation semantics and use strict mode or modules when possible.

---

# ES Modules and `this`

At the top level of an ES module:

```js
console.log(this);
```

the result is:

```text
undefined
```

Example:

```js
console.log(
  this
);
```

ES modules use strict-mode semantics.

---

# Global `this`

In browser scripts, the global object is commonly:

```js
window
```

and:

```js
globalThis
```

provides the standard global-object reference.

Example:

```js
console.log(
  globalThis
);
```

However, global-level `this` behavior depends on the script type and execution environment.

Do not assume:

```js
this === window
```

in every JavaScript environment.

---

# Rule 3: Explicit Binding

JavaScript provides:

```js
call()
apply()
bind()
```

These allow you to explicitly control the `this` value for regular functions.

---

# `call()`

Example:

```js
function showName() {
  console.log(
    this.name
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

showName.call(user);
```

The function is called immediately.

The provided object becomes:

```js
this
```

---

# `call()` With Arguments

```js
function introduce(
  role,
  country
) {
  console.log(
    `${this.name} is a ${role} from ${country}.`
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

introduce.call(
  user,
  "Frontend Developer",
  "Palestine"
);
```

The first argument to `call()` provides `this`.

The remaining arguments are passed individually to the function.

---

# `apply()`

`apply()` is similar to `call()`.

The main difference is how arguments are supplied.

```js
function introduce(
  role,
  country
) {
  console.log(
    `${this.name} is a ${role} from ${country}.`
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

introduce.apply(
  user,
  [
    "Frontend Developer",
    "Palestine",
  ]
);
```

Arguments are supplied as an array-like collection.

---

# `call()` vs `apply()`

`call()`:

```js
functionName.call(
  thisValue,
  arg1,
  arg2
);
```

`apply()`:

```js
functionName.apply(
  thisValue,
  [
    arg1,
    arg2,
  ]
);
```

The `this` behavior is conceptually the same.

The argument syntax differs.

---

# `bind()`

`bind()` creates a new function with a permanently bound `this` value.

```js
function showName() {
  console.log(
    this.name
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

const boundShowName =
  showName.bind(user);

boundShowName();
```

The returned function remembers the bound object.

---

# `bind()` Does Not Call the Function Immediately

Compare:

```js
showName.call(user);
```

with:

```js
const bound =
  showName.bind(user);
```

`call()`:

```text
Call now
```

`bind()`:

```text
Create new bound function
```

---

# Bound Arguments

`bind()` can also pre-fill arguments.

```js
function introduce(
  role,
  country
) {
  return `${this.name} is a ${role} from ${country}.`;
}

const user = {
  name: "Osama Abu Motlaq",
};

const introduceUser =
  introduce.bind(
    user,
    "Frontend Developer"
  );

console.log(
  introduceUser(
    "Palestine"
  )
);
```

The first argument after the `this` value becomes a bound function argument.

---

# Method Extraction and `bind()`

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const showName =
  user.showName.bind(user);

showName();
```

Binding preserves the intended receiver even when the function is stored separately.

---

# `bind()` and Event Handlers

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  handleClick() {
    console.log(
      this.name
    );
  },
};

const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    user.handleClick.bind(user)
  );
}
```

However, creating a new bound function each time can make later removal difficult.

A retained reference is safer:

```js
const boundHandler =
  user.handleClick.bind(user);

button.addEventListener(
  "click",
  boundHandler
);

button.removeEventListener(
  "click",
  boundHandler
);
```

---

# Rule 4: Constructor Calls

When a function is called with:

```js
new
```

the `this` value refers to the newly created instance.

Example:

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

console.log(
  user.name
);
```

Conceptually:

```text
new User(...)
      |
      v
Create Object
      |
      v
this → new Object
      |
      v
Run Constructor
```

---

# Constructor Example

```js
function Developer(
  name,
  role
) {
  this.name = name;
  this.role = role;
}

const developer =
  new Developer(
    "Osama Abu Motlaq",
    "Frontend Developer"
  );

console.log(
  developer.name
);

console.log(
  developer.role
);
```

Inside the constructor:

```js
this
```

refers to the newly created object.

---

# Constructor Return Behavior

Consider:

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );
```

The new object becomes the constructor's `this` value.

Constructors can also interact with inheritance and prototypes, which are covered separately.

---

# `this` in Classes

Classes use the same general `this` concept for instance methods.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showName() {
    console.log(
      this.name
    );
  }
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

user.showName();
```

Inside the constructor and instance method:

```js
this
```

refers to the instance when invoked normally as a method.

---

# Class Method Extraction

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showName() {
    console.log(
      this.name
    );
  }
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

const show =
  user.showName;

show();
```

The method was extracted from the instance.

The original method-call receiver is gone.

The method is not automatically bound to the instance.

---

# Binding a Class Method

```js
class User {
  constructor(name) {
    this.name = name;

    this.showName =
      this.showName.bind(
        this
      );
  }

  showName() {
    console.log(
      this.name
    );
  }
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

const show =
  user.showName;

show();
```

Now the method has a permanently bound receiver.

---

# Arrow Functions and `this`

Arrow functions do not create their own `this`.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    const show = () => {
      console.log(
        this.name
      );
    };

    show();
  },
};

user.showName();
```

The arrow function uses the surrounding lexical `this`.

---

# Arrow Function Does Not Rebind `this`

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    const show = () => {
      console.log(
        this.name
      );
    };

    show.call({
      name: "Other value",
    });
  },
};

user.showName();
```

The `call()` invocation does not change the arrow function's `this`.

Arrow functions capture `this` lexically.

---

# Arrow Function With Explicit `call()`

```js
const showName = () => {
  console.log(this);
};

showName.call({
  name: "Osama Abu Motlaq",
});
```

The explicit object does not replace the lexical `this` of the arrow function.

---

# Arrow Functions as Callbacks

This pattern is common:

```js
const user = {
  name: "Osama Abu Motlaq",

  showLater() {
    setTimeout(() => {
      console.log(
        this.name
      );
    }, 0);
  },
};

user.showLater();
```

The arrow function keeps the surrounding method's `this`.

---

# Regular Function Callback

Compare:

```js
const user = {
  name: "Osama Abu Motlaq",

  showLater() {
    setTimeout(function () {
      console.log(
        this.name
      );
    }, 0);
  },
};

user.showLater();
```

The regular callback has its own `this` semantics.

It does not automatically inherit the method's `this`.

---

# Fix With Arrow Function

```js
const user = {
  name: "Osama Abu Motlaq",

  showLater() {
    setTimeout(() => {
      console.log(
        this.name
      );
    }, 0);
  },
};

user.showLater();
```

The arrow function closes over the surrounding `this`.

---

# Alternative: `bind()`

A regular callback can also be explicitly bound.

```js
const user = {
  name: "Osama Abu Motlaq",

  showLater() {
    setTimeout(
      function () {
        console.log(
          this.name
        );
      }.bind(this),
      0
    );
  },
};

user.showLater();
```

Here the callback is explicitly bound to the method's `this`.

---

# `this` Inside `forEach()`

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  skills: [
    "JavaScript",
    "React",
  ],

  showSkills() {
    this.skills.forEach(
      (skill) => {
        console.log(
          this.name,
          skill
        );
      }
    );
  },
};

user.showSkills();
```

The arrow callback inherits:

```js
this
```

from `showSkills()`.

---

# `thisArg` in Array Methods

Some array methods historically allow a second argument that can serve as `this`.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const skills = [
  "JavaScript",
  "React",
];

skills.forEach(
  function (skill) {
    console.log(
      this.name,
      skill
    );
  },
  user
);
```

The second argument provides the `this` value for the regular callback.

This pattern is less common in modern code because arrow functions and explicit closures are often preferred.

---

# `this` in DOM Event Handlers

When a regular function is used as a DOM event listener, browsers commonly call it with:

```js
this === element
```

Example:

```js
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    function () {
      console.log(
        this === button
      );
    }
  );
}
```

For this regular event listener:

```js
this
```

refers to the event target/current listener object in the traditional DOM event-handler invocation model.

---

# Arrow Function Event Handlers

Compare:

```js
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    () => {
      console.log(this);
    }
  );
}
```

The arrow function does not receive its own `this` from the event system.

It keeps the lexical `this` from its surrounding scope.

---

# `event.currentTarget` vs `this`

For DOM event handlers, `this` can be compared with:

```js
event.currentTarget
```

Example:

```js
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    function (event) {
      console.log(
        this ===
          event.currentTarget
      );
    }
  );
}
```

For a normal event listener function, these commonly refer to the same element.

Using `event.currentTarget` is often clearer when working with event delegation.

---

# Event Delegation

Consider:

```js
const list =
  document.querySelector(
    "#list"
  );

if (list) {
  list.addEventListener(
    "click",
    function (event) {
      console.log(
        this === list
      );

      console.log(
        event.target
      );

      console.log(
        event.currentTarget
      );
    }
  );
}
```

Here:

```js
this
```

inside the regular listener is associated with the element on which the listener is registered.

```js
event.target
```

is the actual element that initiated the event.

```js
event.currentTarget
```

is the element whose listener is currently running.

---

# `this` With `call()`

Example:

```js
function getName() {
  return this.name;
}

const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  getName.call(user)
);
```

This is explicit and predictable.

---

# `this` With `apply()`

```js
function getProfile(
  role,
  country
) {
  return {
    name: this.name,
    role,
    country,
  };
}

const user = {
  name: "Osama Abu Motlaq",
};

const profile =
  getProfile.apply(
    user,
    [
      "Frontend Developer",
      "Palestine",
    ]
  );

console.log(profile);
```

---

# `this` With `bind()`

```js
function getName() {
  return this.name;
}

const user = {
  name: "Osama Abu Motlaq",
};

const getUserName =
  getName.bind(user);

console.log(
  getUserName()
);
```

---

# Explicit Binding Precedence

When reasoning about regular functions, explicit binding is usually stronger than a normal method call.

Example:

```js
function showName() {
  console.log(
    this.name
  );
}

const user = {
  name: "Osama Abu Motlaq",

  showName,
};

const anotherUser = {
  name: "Osama Abu Motlaq - Developer",
};

user.showName.call(
  anotherUser
);
```

The explicit `call()` value is used.

Output:

```text
Osama Abu Motlaq - Developer
```

---

# `bind()` and `call()`

Once a function is bound:

```js
function showName() {
  console.log(
    this.name
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

const bound =
  showName.bind(user);

bound.call({
  name: "Another value",
});
```

The bound `this` remains fixed.

The later `call()` does not replace the bound receiver in ordinary bound-function behavior.

---

# Constructor Calls and Binding

A bound function can still be used with `new` in ways governed by constructor semantics.

Example:

```js
function User(name) {
  this.name = name;
}

const BoundUser =
  User.bind(
    null
  );

const user =
  new BoundUser(
    "Osama Abu Motlaq"
  );

console.log(
  user.name
);
```

When called with `new`, constructor semantics create the new instance.

This is one of the reasons `bind()` is more nuanced than simply storing a chosen `this`.

---

# `this` in Nested Regular Functions

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  show() {
    function inner() {
      console.log(
        this
      );
    }

    inner();
  },
};

user.show();
```

The nested regular function does not automatically inherit:

```js
this
```

from `show()`.

The inner function has its own invocation semantics.

---

# Preserve `this` With Arrow Functions

```js
const user = {
  name: "Osama Abu Motlaq",

  show() {
    const inner = () => {
      console.log(
        this.name
      );
    };

    inner();
  },
};

user.show();
```

The arrow function captures the surrounding `this`.

---

# Preserve `this` With a Local Variable

Older JavaScript code sometimes used:

```js
const user = {
  name: "Osama Abu Motlaq",

  show() {
    const self = this;

    function inner() {
      console.log(
        self.name
      );
    }

    inner();
  },
};

user.show();
```

Modern JavaScript normally prefers arrow functions or explicit binding.

---

# Class Field Arrow Functions

Class fields can also use arrow functions.

```js
class User {
  name =
    "Osama Abu Motlaq";

  showName = () => {
    console.log(
      this.name
    );
  };
}

const user =
  new User();

user.showName();
```

The arrow function captures the instance.

This approach is common when a method needs stable lexical `this`, especially for callbacks.

---

# Prototype Methods vs Arrow Fields

Prototype method:

```js
class User {
  showName() {
    console.log(
      this.name
    );
  }
}
```

Arrow field:

```js
class User {
  showName = () => {
    console.log(
      this.name
    );
  };
}
```

They differ in how the function is stored and how `this` is handled.

Prototype methods are shared through the prototype.

Arrow fields create a function per instance.

---

# `this` in Static Methods

Static methods receive the constructor itself as their `this` when called as methods on the class.

```js
class User {
  static role =
    "Frontend Developer";

  static showRole() {
    console.log(
      this.role
    );
  }
}

User.showRole();
```

Here:

```js
this === User
```

inside the static method call.

---

# Static Method Borrowing

```js
class User {
  static role =
    "Frontend Developer";

  static showRole() {
    console.log(
      this.role
    );
  }
}

const showRole =
  User.showRole;

showRole();
```

The original method-call receiver has been removed.

The regular function's `this` behavior therefore changes.

---

# `this` in Inheritance

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showName() {
    console.log(
      this.name
    );
  }
}

class Developer extends User {
  showRole() {
    console.log(
      this.name
    );
  }
}

const developer =
  new Developer(
    "Osama Abu Motlaq"
  );

developer.showRole();
```

Inside `showRole()`:

```js
this
```

refers to the `Developer` instance.

---

# `super` and `this`

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return this.name;
  }
}

class Developer extends User {
  describe() {
    return `${super.describe()} - Frontend Developer`;
  }
}

const developer =
  new Developer(
    "Osama Abu Motlaq"
  );

console.log(
  developer.describe()
);
```

`super` accesses the parent class behavior while:

```js
this
```

still refers to the current instance.

---

# `this` Before `super()`

In a derived class constructor, you cannot use `this` before calling `super()`.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  constructor(name) {
    this.name = name;

    super(name);
  }
}
```

This is invalid.

The derived constructor must initialize the parent portion first:

```js
class Developer extends User {
  constructor(name) {
    super(name);

    this.role =
      "Frontend Developer";
  }
}
```

---

# Private Fields and `this`

```js
class User {
  #role =
    "Frontend Developer";

  showRole() {
    console.log(
      this.#role
    );
  }
}

const user =
  new User();

user.showRole();
```

The private field is accessed through the current instance using:

```js
this.#role
```

---

# `this` Is Not Lexically Inherited in Regular Functions

This is an important distinction.

Regular function:

```js
function inner() {
  console.log(this);
}
```

The `this` value is determined according to how `inner()` is called.

Arrow function:

```js
const inner = () => {
  console.log(this);
};
```

The `this` value comes from the surrounding lexical context.

---

# Common Mistake

This code does not do what many beginners expect:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName: function () {
    const show =
      function () {
        console.log(
          this.name
        );
      };

    show();
  },
};

user.showName();
```

The inner regular function has its own invocation.

It does not automatically inherit:

```js
this === user
```

---

# Correct With Arrow Function

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    const show = () => {
      console.log(
        this.name
      );
    };

    show();
  },
};

user.showName();
```

---

# Correct With `bind()`

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    const show =
      function () {
        console.log(
          this.name
        );
      }.bind(this);

    show();
  },
};

user.showName();
```

---

# Common Mistake: Extracting a Method

Bad assumption:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const show =
  user.showName;

show();
```

The function is no longer invoked as:

```js
user.showName()
```

Therefore the original method receiver is lost.

---

# Preserve the Method

Use:

```js
const show =
  user.showName.bind(user);

show();
```

Or call it directly:

```js
user.showName();
```

---

# Common Mistake: Arrow Function as Object Method

An arrow function is usually not appropriate when you expect method-call `this`.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName: () => {
    console.log(
      this.name
    );
  },
};

user.showName();
```

The arrow function does not take `this` from:

```js
user.showName()
```

because arrow functions do not create their own `this`.

---

# Prefer Regular Functions for Dynamic Method `this`

Use:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};
```

when the method should use the receiver object.

Use arrow functions when lexical `this` is desired.

---

# `this` and `arguments`

Arrow functions also differ from regular functions in another way.

Regular function:

```js
function showArguments() {
  console.log(
    arguments
  );
}

showArguments(
  1,
  2,
  3
);
```

Arrow functions do not have their own `arguments` object.

```js
const showArguments = () => {
  console.log(
    arguments
  );
};
```

This uses the surrounding scope's `arguments` if one exists.

A modern alternative is rest parameters:

```js
const showArguments = (
  ...values
) => {
  console.log(
    values
  );
};
```

---

# `this` With Destructuring

Method extraction can happen accidentally through destructuring.

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const {
  showName,
} = user;

showName();
```

The method is extracted.

The receiver is not automatically preserved.

---

# Preserve It With a Bound Method

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

const boundShowName =
  user.showName.bind(user);

const {
  boundShowName: showName,
} = {
  boundShowName,
};

showName();
```

A simpler approach is usually to keep the method bound once:

```js
const showName =
  user.showName.bind(user);
```

---

# `this` and Optional Chaining

Optional chaining does not fundamentally change method-call `this` semantics.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(
      this.name
    );
  },
};

user?.showName?.();
```

When the method exists and is invoked as a property call, the receiver remains relevant.

---

# `this` in `call()` With `null`

Consider:

```js
function showThis() {
  console.log(
    this
  );
}

showThis.call(null);
```

The behavior depends on whether the function is strict or non-strict.

Strict mode:

```js
"use strict";

function showThis() {
  console.log(
    this
  );
}

showThis.call(null);
```

`this` is:

```text
null
```

Non-strict functions may apply `this` substitution semantics.

---

# `call()` With Primitive Values

You can also pass primitive values:

```js
function showThis() {
  console.log(
    this
  );
}

showThis.call(42);
```

Strict-mode behavior keeps the exact primitive.

Non-strict behavior can box primitives according to legacy `this` substitution rules.

---

# `bind()` With `null`

```js
"use strict";

function showThis() {
  console.log(
    this
  );
}

const show =
  showThis.bind(null);

show();
```

The bound value remains:

```text
null
```

---

# Method Call Precedence Example

```js
function showName() {
  console.log(
    this.name
  );
}

const first = {
  name: "Osama Abu Motlaq",
  showName,
};

const second = {
  name: "Osama Abu Motlaq - Developer",
};

first.showName.call(
  second
);
```

The explicit `call()` binding determines the receiver for the regular function.

---

# A Practical Decision Tree

When you see:

```js
someFunction();
```

ask:

```text
Is it an arrow function?
    |
    +── Yes → lexical `this`
    |
    +── No
         |
         v
    How was it called?
```

If:

```js
object.method();
```

then:

```text
this → object
```

If:

```js
function.call(object);
```

then:

```text
this → object
```

If:

```js
function.apply(object, args);
```

then:

```text
this → object
```

If:

```js
function.bind(object);
```

then the returned function has bound `this`.

If:

```js
new Function();
```

then:

```text
this → new instance
```

If:

```js
function();
```

then inspect strict-mode and function semantics.

---

# `this` Debugging Technique

When confused about `this`, temporarily log it:

```js
function inspectThis() {
  console.log(
    "this:",
    this
  );
}

inspectThis();
```

For a method:

```js
const user = {
  name: "Osama Abu Motlaq",

  inspect() {
    console.log(
      "this:",
      this
    );
  },
};

user.inspect();
```

For a bound function:

```js
const bound =
  inspectThis.bind(user);

bound();
```

---

# Practical Example

```js
const user = {
  name: "Osama Abu Motlaq",

  role: "Frontend Developer",

  showProfile() {
    console.log(
      `${this.name} - ${this.role}`
    );
  },

  showLater() {
    setTimeout(() => {
      console.log(
        `${this.name} - ${this.role}`
      );
    }, 0);
  },
};

user.showProfile();

user.showLater();
```

Here:

```text
showProfile()
→ method-call `this`

showLater()
→ method-call `this`

arrow callback
→ lexical `this`
```

---

# Practical `call()` Example

```js
function showProfile(
  suffix
) {
  console.log(
    `${this.name} - ${this.role} ${suffix}`
  );
}

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

showProfile.call(
  user,
  "!"
);
```

---

# Practical `apply()` Example

```js
function showProfile(
  suffix,
  country
) {
  console.log(
    `${this.name} - ${this.role}${suffix} ${country}`
  );
}

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

showProfile.apply(
  user,
  [
    "!",
    "Palestine",
  ]
);
```

---

# Practical `bind()` Example

```js
function showProfile() {
  return `${this.name} - ${this.role}`;
}

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const getProfile =
  showProfile.bind(user);

console.log(
  getProfile()
);
```

---

# Practical Constructor Example

```js
function User(
  name,
  role
) {
  this.name = name;
  this.role = role;
}

const user =
  new User(
    "Osama Abu Motlaq",
    "Frontend Developer"
  );

console.log(user);
```

---

# Practical Class Example

```js
class User {
  constructor(
    name,
    role
  ) {
    this.name = name;
    this.role = role;
  }

  showProfile() {
    console.log(
      `${this.name} - ${this.role}`
    );
  }
}

const user =
  new User(
    "Osama Abu Motlaq",
    "Frontend Developer"
  );

user.showProfile();
```

---

# Common Misconceptions

## `this` Always Means the Current Object

False.

`this` depends on invocation semantics for regular functions.

---

## `this` Is Determined by Where a Function Is Written

False for regular functions.

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  show() {
    console.log(
      this.name
    );
  },
};
```

If the method is extracted, its `this` behavior can change.

---

## Arrow Functions Have Their Own `this`

False.

Arrow functions capture lexical `this`.

---

## `bind()` Calls the Function

False.

`bind()` creates a new bound function.

---

## `call()` Returns a Bound Function

False.

`call()` invokes the function immediately.

---

## `apply()` and `call()` Do Completely Different Things

Their main difference is argument syntax.

Both explicitly set `this` for a regular function call.

---

## Classes Automatically Bind Methods

False.

Class instance methods are not automatically bound to the instance.

---

# `this` and React

Understanding `this` is important historically and conceptually in React.

Older React class components commonly used methods like:

```js
class Profile extends React.Component {
  handleClick() {
    console.log(
      this
    );
  }
}
```

Such methods could require explicit binding:

```js
this.handleClick =
  this.handleClick.bind(
    this
  );
```

Modern React function components generally use:

```text
Functions
Hooks
Closures
Arrow functions
```

Therefore, you will encounter `this` much less frequently in modern React application code.

However, understanding it remains important for JavaScript itself, classes, browser APIs, libraries, and interviews.

---

# `this` and React Event Handlers

Modern function components commonly use:

```js
function Button() {
  function handleClick() {
    console.log(
      "Clicked"
    );
  }

  return (
    <button
      onClick={handleClick}
    >
      Click
    </button>
  );
}
```

There is no need to use:

```js
this
```

because the component is not using a class instance.

---

# Mental Model

For regular functions:

```text
How was the function called?
            |
            v
Determine `this`
```

For arrow functions:

```text
Where was the arrow function created?
            |
            v
Use lexical `this`
```

For constructors:

```text
new
 |
 v
new instance
 |
 v
this → instance
```

For explicit binding:

```text
call / apply / bind
        |
        v
explicit `this`
```

---

# Final Decision Table

| Invocation                | Typical `this` behavior                            |
| ------------------------- | -------------------------------------------------- |
| `object.method()`         | `object`                                           |
| `method()` in strict mode | `undefined`                                        |
| `fn.call(obj)`            | `obj`                                              |
| `fn.apply(obj, args)`     | `obj`                                              |
| `fn.bind(obj)()`          | bound `obj`                                        |
| `new Fn()`                | newly created instance                             |
| Arrow function            | lexical `this`                                     |
| DOM regular listener      | listener-associated element in browser event model |
| DOM arrow listener        | lexical `this`                                     |

---

# Final Mental Model

Use this sequence whenever you encounter `this`:

```text
1. Is the function an arrow function?

   Yes
   ↓
   Use lexical `this`.

   No
   ↓

2. Was it called with `new`?

   Yes
   ↓
   `this` is the new instance.

   No
   ↓

3. Was it called with `call`, `apply`, or `bind`?

   Yes
   ↓
   Use the explicit binding.

   No
   ↓

4. Was it called as `object.method()`?

   Yes
   ↓
   `this` is the receiver.

   No
   ↓

5. It is a plain function call.

   Check strict mode and runtime semantics.
```

---

# Summary

The `this` keyword is not a normal variable.

For regular functions, its value is primarily determined by how the function is invoked.

The major cases are:

* Method call: `object.method()`
* Plain function call: `function()`
* Explicit binding: `call()`, `apply()`, `bind()`
* Constructor call: `new`
* DOM event callbacks
* Class methods
* Inheritance
* Static methods
* Nested functions
* Callback functions

Arrow functions are different:

* They do not create their own `this`.
* They capture `this` from the surrounding lexical context.
* `call()`, `apply()`, and `bind()` do not replace an arrow function's lexical `this`.

The most important rule is:

```text
Regular function
→ How it is called determines `this`.

Arrow function
→ Surrounding lexical context determines `this`.
```
