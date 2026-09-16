# Instance Methods

Instance methods are methods that can be called on individual instances created from a class.

They are defined inside a class without the `static` keyword.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.sayHello());
```

Output:

```text
Hello, Osama Abu Motlaq.
```

The method:

```js
sayHello()
```

is an **instance method** because it is called on an instance:

```js
user.sayHello();
```

---

# 1. What Is an Instance Method?

An instance method is behavior associated with instances of a class.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

Call the method:

```js
user.sayHello();
```

The important distinction is:

```text
User
 ↓
class definition

user
 ↓
instance

user.sayHello()
 ↓
instance method call
```

The method operates using the instance's state.

---

# 2. Basic Instance Method

```js
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User("Osama Abu Motlaq");

console.log(user.getName());
```

Output:

```text
Osama Abu Motlaq
```

The method accesses:

```js
this.name
```

because `this` refers to the instance when the method is called as:

```js
user.getName();
```

---

# 3. Instance Methods Can Modify Instance State

Instance methods can read and modify properties belonging to the instance.

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

user.login();
user.login();

console.log(user.loginCount);
```

Output:

```text
2
```

The method modifies:

```js
this.loginCount
```

which belongs to that particular instance.

---

# 4. Each Instance Has Its Own State

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }
}
```

Create two instances:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

Call the method only on `user1`:

```js
user1.login();
user1.login();
```

Now:

```js
console.log(user1.loginCount);
console.log(user2.loginCount);
```

Output:

```text
2
0
```

The state belongs to each instance.

```text
user1
 ├── loginCount → 2
 └── ...

user2
 ├── loginCount → 0
 └── ...
```

---

# 5. Instance Methods Are Defined Once

A very important JavaScript detail:

When you write:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

JavaScript does **not** normally create a completely separate `sayHello` function inside every instance.

Instead, the method is placed on:

```js
User.prototype
```

Conceptually:

```text
user1 ──┐
        │
user2 ──┼──→ User.prototype.sayHello
        │
user3 ──┘
```

This allows instances to share the same method implementation.

---

# 6. Instance Method and Prototype

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

You can inspect the prototype:

```js
console.log(
  Object.hasOwn(user, "sayHello")
);
```

Output:

```text
false
```

Why?

Because `sayHello` is not normally an own property of `user`.

It is found through the prototype chain.

Conceptually:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

When JavaScript evaluates:

```js
user.sayHello
```

it first checks `user`.

If it does not find `sayHello`, JavaScript continues to:

```js
User.prototype
```

where it finds the method.

---

# 7. Proving the Method Is on the Prototype

You can inspect it directly:

```js
console.log(
  Object.hasOwn(User.prototype, "sayHello")
);
```

Output:

```text
true
```

You can also compare the method:

```js
console.log(
  user.sayHello === User.prototype.sayHello
);
```

Output:

```text
true
```

This demonstrates that the method being accessed by the instance is the same function stored on the prototype.

---

# 8. Instance Methods Use `this`

Instance methods commonly operate on instance properties through:

```js
this
```

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}
```

Calling:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.introduce());
```

causes:

```js
this
```

to refer to:

```js
user
```

Therefore:

```js
this.name
```

means:

```js
user.name
```

during that method call.

---

# 9. The Call Site Determines `this`

For regular instance methods, `this` depends on how the method is called.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");

user.introduce();
```

Here:

```js
user.introduce()
```

makes:

```js
this === user
```

inside `introduce()`.

This is the same fundamental `this` rule discussed in `03-this-keyword.md`.

---

# 10. Extracting an Instance Method

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");

const introduce = user.introduce;
```

Now:

```js
introduce();
```

is no longer:

```js
user.introduce();
```

The receiver has been removed.

Therefore, the method may lose its intended `this` context.

This is one of the most common problems with instance methods.

---

# 11. Fixing an Extracted Method With `bind`

You can explicitly bind the method:

```js
const introduce = user.introduce.bind(user);

console.log(introduce());
```

Now:

```js
this
```

inside the method remains bound to:

```js
user
```

The result is:

```text
My name is Osama Abu Motlaq.
```

---

# 12. Instance Methods and `call()`

You can explicitly provide `this` using:

```js
call()
```

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");

console.log(user.introduce.call(user));
```

The method executes with:

```js
this === user
```

`call()` is useful when you intentionally need to control the receiver.

---

# 13. Instance Methods and `apply()`

`apply()` works similarly to `call()`.

```js
console.log(
  user.introduce.apply(user)
);
```

The main difference between `call()` and `apply()` is how arguments are passed.

With `call()`:

```js
method.call(object, arg1, arg2);
```

With `apply()`:

```js
method.apply(object, [arg1, arg2]);
```

---

# 14. Instance Methods With Parameters

Instance methods can receive parameters.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet(otherName) {
    return `${this.name} says hello to ${otherName}.`;
  }
}

const user = new User("Osama Abu Motlaq");

console.log(user.greet("Osama Abu Motlaq"));
```

Output:

```text
Osama Abu Motlaq says hello to Osama Abu Motlaq.
```

The method can combine:

```text
instance state
+
method parameters
```

---

# 15. Instance Methods Can Return Values

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const user = new User("Osama Abu Motlaq");

const name = user.getName();

console.log(name);
```

Output:

```text
Osama Abu Motlaq
```

An instance method can return:

* strings
* numbers
* booleans
* objects
* arrays
* other values
* `undefined`

just like a normal JavaScript function.

---

# 16. Instance Methods Can Return `this`

A method can return the current instance.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  setName(name) {
    this.name = name;
    return this;
  }
}
```

Then:

```js
const user = new User("Osama Abu Motlaq");

user.setName("Osama Abu Motlaq");
```

returns the same instance.

This pattern can enable method chaining.

---

# 17. Method Chaining

Example:

```js
class User {
  constructor(name) {
    this.name = name;
    this.active = false;
  }

  activate() {
    this.active = true;
    return this;
  }

  rename(name) {
    this.name = name;
    return this;
  }
}
```

Now:

```js
const user = new User("Osama Abu Motlaq");

user
  .activate()
  .rename("Osama Abu Motlaq");
```

Each method returns:

```js
this
```

so the next method can immediately be called.

Method chaining is useful when the API is intentionally designed around it.

It should not be added merely because chaining looks convenient.

---

# 18. Instance Methods Calling Other Instance Methods

An instance method can call another method using:

```js
this.methodName()
```

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  introduce() {
    return `My name is ${this.getName()}.`;
  }
}
```

Calling:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.introduce());
```

works because:

```js
this
```

refers to the same instance.

Conceptually:

```text
user.introduce()
       ↓
   this = user
       ↓
this.getName()
       ↓
user.getName()
```

---

# 19. Instance Methods Can Access Private Fields

Instance methods can access private class fields.

```js
class User {
  #loginCount = 0;

  login() {
    this.#loginCount++;
  }

  getLoginCount() {
    return this.#loginCount;
  }
}
```

Use:

```js
const user = new User("Osama Abu Motlaq");
```

The private field cannot be accessed directly from outside the class:

```js
user.#loginCount;
```

This causes a syntax error.

But instance methods can access it because they are part of the class definition.

Private fields are covered in more detail in:

```text
11-private-fields.md
```

---

# 20. Instance Methods and Getters

A getter is technically an accessor rather than a normal method.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  get displayName() {
    return this.name.toUpperCase();
  }
}
```

Use:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.displayName);
```

Notice:

```js
user.displayName
```

rather than:

```js
user.displayName()
```

Getters are useful when something conceptually behaves like a property rather than an action.

---

# 21. Instance Methods vs Static Methods

Instance methods:

```js
class User {
  sayHello() {
    return "Hello.";
  }
}
```

are called on an instance:

```js
const user = new User();

user.sayHello();
```

Static methods:

```js
class User {
  static create() {
    return new User();
  }
}
```

are called on the class itself:

```js
User.create();
```

The distinction is:

```text
Instance method
      ↓
instance.method()

Static method
      ↓
Class.method()
```

Static methods are covered in:

```text
09-static-methods.md
```

---

# 22. Instance Method vs Static Method Table

| Feature                  | Instance Method     | Static Method                        |
| ------------------------ | ------------------- | ------------------------------------ |
| Definition               | `method() {}`       | `static method() {}`                 |
| Called on                | Instance            | Class                                |
| Example                  | `user.login()`      | `User.create()`                      |
| Access to instance state | Yes, through `this` | No instance automatically provided   |
| Stored on                | `Class.prototype`   | `Class` itself                       |
| Typical purpose          | Instance behavior   | Class-level utility/factory behavior |

---

# 23. Instance Methods Are Not Own Properties

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");
```

Check:

```js
console.log(
  Object.hasOwn(user, "sayHello")
);
```

Output:

```text
false
```

But:

```js
console.log(
  Object.hasOwn(User.prototype, "sayHello")
);
```

Output:

```text
true
```

This distinction is fundamental to understanding JavaScript's prototype system.

---

# 24. Why Shared Methods Matter

Suppose you create many instances:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
const user3 = new User("Osama Abu Motlaq");
```

The class method:

```js
sayHello()
```

is shared through the prototype rather than creating a separate method implementation for each instance.

Conceptually:

```text
user1 ──┐
user2 ──┼──→ User.prototype.sayHello
user3 ──┘
```

This is one of the major benefits of the prototype-based object model.

---

# 25. Instance Properties vs Instance Methods

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }
}
```

Here:

```js
this.name
this.loginCount
```

are instance properties.

While:

```js
login()
```

is an instance method.

Conceptually:

```text
user
│
├── name → "Osama Abu Motlaq"
├── loginCount → 0
│
└── [[Prototype]]
       │
       └── login()
```

This is an important distinction.

---

# 26. Instance Method Shadowing

Because property lookup starts with the instance, an instance can shadow a prototype method.

Example:

```js
class User {
  sayHello() {
    return "Hello from the prototype.";
  }
}

const user = new User("Osama Abu Motlaq");

user.sayHello = function () {
  return "Hello from the instance.";
};
```

Now:

```js
console.log(user.sayHello());
```

Output:

```text
Hello from the instance.
```

JavaScript finds the own property first and does not continue to the prototype.

Conceptually:

```text
user
 ↓
sayHello found here
 ↓
stop searching
```

The prototype method still exists:

```js
User.prototype.sayHello
```

but it is shadowed for this instance.

---

# 27. Calling the Prototype Method Directly

You can explicitly access the prototype method:

```js
console.log(
  User.prototype.sayHello.call(user)
);
```

This bypasses the shadowing own property.

This is useful for understanding the prototype chain, although directly reaching into prototypes should generally be reserved for situations where it is actually needed.

---

# 28. Overriding Instance Methods in Subclasses

A subclass can define a method with the same name.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `User: ${this.name}.`;
  }
}

class Developer extends User {
  describe() {
    return `Developer: ${this.name}.`;
  }
}
```

Now:

```js
const developer = new Developer(
  "Osama Abu Motlaq"
);

console.log(developer.describe());
```

Output:

```text
Developer: Osama Abu Motlaq.
```

The subclass method overrides the inherited method.

This is one of the foundations of polymorphism.

---

# 29. Calling the Parent Method With `super`

A subclass can call the parent's implementation:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `User: ${this.name}.`;
  }
}

class Developer extends User {
  describe() {
    return `${super.describe()} Role: Developer.`;
  }
}
```

Now:

```js
const developer = new Developer(
  "Osama Abu Motlaq"
);

console.log(developer.describe());
```

Output:

```text
User: Osama Abu Motlaq. Role: Developer.
```

Here:

```js
super.describe()
```

refers to the inherited method implementation.

---

# 30. Instance Methods and Composition

Instance methods can cooperate with other objects.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

class Team {
  constructor() {
    this.members = [];
  }

  addMember(user) {
    this.members.push(user);
  }
}
```

Use:

```js
const user = new User("Osama Abu Motlaq");
const team = new Team();

team.addMember(user);
```

The `Team` instance contains a `User` instance.

This is composition:

```text
Team
 ↓
contains
 ↓
User
```

Composition is covered more deeply in:

```text
16-composition.md
```

---

# 31. Instance Methods and Asynchronous Code

Instance methods can be asynchronous.

Use:

```js
async
```

before the method:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  async loadProfile() {
    const response = await fetch("/api/profile");

    return response.json();
  }
}
```

Call it:

```js
const user = new User("Osama Abu Motlaq");

const profile = await user.loadProfile();
```

Because the method is `async`, it always returns a Promise.

This is normal JavaScript behavior.

The async concepts are covered in:

```text
03-async/
```

---

# 32. Instance Methods and React

Instance methods are important for understanding JavaScript OOP, but they are **not central to modern React application development**.

Modern React primarily uses:

```js
function Component() {
  return <div>Hello</div>;
}
```

rather than:

```js
class Component extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```

Modern React development relies heavily on:

* Function components
* Hooks
* Props
* State
* Context
* Event handlers

However, understanding instance methods is still useful because:

1. JavaScript libraries may use classes.
2. Older React code uses class components.
3. Interviews may test JavaScript OOP.
4. Understanding prototypes improves your JavaScript fundamentals.
5. Classes appear in many existing codebases.

For your React/Next.js path, learn the concept properly, but do not spend excessive time memorizing advanced OOP patterns.

---

# 33. Instance Methods in Old React Class Components

Older React code can look like:

```js
class UserProfile extends React.Component {
  handleClick() {
    console.log("Clicked");
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click
      </button>
    );
  }
}
```

Here:

```js
handleClick()
```

is an instance method of the React component class.

Older React code sometimes needed explicit binding:

```js
this.handleClick = this.handleClick.bind(this);
```

because the method could be passed around and lose its `this` context.

Modern function components avoid this class-method binding problem.

---

# 34. Arrow Function Fields

A class can define an arrow-function field:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello = () => {
    return `Hello, ${this.name}.`;
  };
}
```

This is different from a normal class method:

```js
sayHello() {
  return `Hello, ${this.name}.`;
}
```

The arrow-function field creates an own function property for each instance.

Conceptually:

```text
Normal class method:

user
 ↓
User.prototype.sayHello


Arrow field:

user
 ↓
own sayHello function
```

The arrow function also captures lexical `this`.

This can be useful when a method is frequently passed as a callback and should retain the instance context.

However, it has a memory trade-off because every instance gets its own function.

---

# 35. Normal Method vs Arrow Function Field

| Feature                   | Normal Class Method | Arrow Function Field |
| ------------------------- | ------------------- | -------------------- |
| Location                  | Prototype           | Instance             |
| Shared?                   | Yes                 | No                   |
| Own property?             | No                  | Yes                  |
| `this`                    | Determined by call  | Lexically captured   |
| New function per instance | No                  | Yes                  |
| Typical default           | Yes                 | Use when needed      |

For normal shared behavior, prefer:

```js
method() {}
```

Use an arrow-function field when its lexical `this` behavior provides a concrete benefit.

---

# 36. Instance Method Descriptor

Class methods have specific property descriptor characteristics.

Example:

```js
class User {
  sayHello() {
    return "Hello.";
  }
}

console.log(
  Object.getOwnPropertyDescriptor(
    User.prototype,
    "sayHello"
  )
);
```

The descriptor shows that class methods are generally:

```text
writable: true
enumerable: false
configurable: true
```

The important point here is:

```text
class methods are non-enumerable
```

This differs from many methods assigned manually as ordinary object properties.

---

# 37. Instance Methods and Inheritance

When inheritance is used:

```js
class User {
  describe() {
    return "User";
  }
}

class Developer extends User {
  code() {
    return "JavaScript";
  }
}
```

a `Developer` instance can access both:

```js
developer.describe();
developer.code();
```

because property lookup can travel through the prototype chain.

Conceptually:

```text
developer
   ↓
Developer.prototype
   ↓
User.prototype
   ↓
Object.prototype
   ↓
null
```

This is how inherited instance methods become available.

---

# 38. Method Lookup Process

When JavaScript evaluates:

```js
developer.describe();
```

the lookup is conceptually:

```text
1. Search developer
        ↓
2. Search Developer.prototype
        ↓
3. Search User.prototype
        ↓
4. Search Object.prototype
        ↓
5. If not found → undefined
```

If a function is found, JavaScript then calls it.

The receiver remains important for determining `this`.

---

# 39. Common Mistakes

## Mistake 1: Calling an instance method on the class

Incorrect:

```js
class User {
  sayHello() {
    return "Hello.";
  }
}

User.sayHello();
```

This does not work because `sayHello()` is an instance method.

Correct:

```js
const user = new User();

user.sayHello();
```

---

## Mistake 2: Forgetting `new`

Incorrect:

```js
const user = User();
```

Classes must be constructed using:

```js
new User();
```

---

## Mistake 3: Losing `this`

```js
const method = user.sayHello;

method();
```

The method was extracted from the object.

If the method depends on `this`, its context may be lost.

Use:

```js
const method = user.sayHello.bind(user);
```

when you need a permanently bound function.

---

## Mistake 4: Defining normal methods inside the constructor

Avoid unnecessarily doing:

```js
constructor() {
  this.method = function () {};
}
```

Normal class methods should usually be defined directly in the class body.

---

## Mistake 5: Confusing instance state with prototype state

Instance state:

```js
this.name
this.items
```

belongs to individual instances.

Prototype methods:

```js
method() {}
```

are shared through the prototype.

Do not accidentally put mutable shared state on the prototype.

---

# 40. Best Practices

### 1. Use instance methods for instance behavior

If behavior operates on a particular object's state, an instance method is often appropriate.

### 2. Keep methods focused

A method should ideally have one clear responsibility.

### 3. Use `this` deliberately

Know what object is the receiver when the method is called.

### 4. Prefer normal class methods by default

They are shared through the prototype.

### 5. Use arrow-function fields intentionally

They are useful when lexical `this` is specifically needed, but they create a separate function for each instance.

### 6. Avoid unnecessary prototype manipulation

Understanding prototypes is important, but application code usually does not need to modify them directly.

### 7. Prefer composition when inheritance becomes complicated

Large inheritance hierarchies can become difficult to maintain.

---

# 41. Quick Reference

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

Call an instance method:

```js
user.sayHello();
```

Access the prototype:

```js
User.prototype;
```

Check whether the instance owns the method:

```js
Object.hasOwn(user, "sayHello");
```

Check whether the prototype owns the method:

```js
Object.hasOwn(
  User.prototype,
  "sayHello"
);
```

Compare the function:

```js
user.sayHello === User.prototype.sayHello;
```

Bind the method:

```js
const sayHello = user.sayHello.bind(user);
```

---

# 42. Instance Methods Mental Model

When you see:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");

user.sayHello();
```

think:

```text
                 User
                  │
          ┌───────┴────────┐
          │                │
     constructor()     sayHello()
          │                │
          │                ↓
          │         User.prototype
          │
          ↓
        user
          │
          ├── name
          │
          └── [[Prototype]]
                    │
                    ↓
             User.prototype
                    │
                    └── sayHello()
```

The key idea:

```text
constructor
    ↓
initializes instance state

instance properties
    ↓
belong to the instance

instance methods
    ↓
normally live on the prototype

this
    ↓
refers to the calling instance
```

---

# 43. The Most Important Distinction

Do not think:

```text
class
 ↓
each object receives a complete copy of every method
```

Think:

```text
class
 ↓
prototype
 ↓
shared methods

instance
 ↓
own state
 ↓
prototype link
```

For example:

```text
user1 ──┐
user2 ──┼──→ User.prototype.sayHello
user3 ──┘
```

while:

```text
user1.name → "Osama Abu Motlaq"
user2.name → "Osama Abu Motlaq"
user3.name → "Osama Abu Motlaq"
```

are separate instance properties.

This distinction is fundamental to understanding JavaScript's object model.

---

# 44. OOP Connection

The current OOP concepts now connect as:

```text
Objects
   ↓
Properties & Methods
   ↓
this
   ↓
Constructor Functions
   ↓
Prototypes
   ↓
Classes
   ↓
Class Constructors
   ↓
Instance Methods
```

You should now understand:

```text
Class
  ↓
defines the structure

Constructor
  ↓
initializes each instance

Instance
  ↓
contains its own state

Instance Method
  ↓
provides behavior for an instance

Prototype
  ↓
stores shared class methods

this
  ↓
usually refers to the instance when called as instance.method()
```

The next topic:

**`09-static-methods.md`**

will explain the opposite model: methods that belong to the **class itself** rather than to individual instances.
