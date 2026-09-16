# Class Constructors

A class constructor is a special method used to initialize a new object when an instance of a class is created.

The constructor is defined using:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

When you create an instance:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

JavaScript automatically executes the constructor.

The constructor receives the values passed to `new User(...)` and uses them to initialize the new instance.

---

# 1. What Is a Constructor?

A constructor is a special method inside a class.

Its name must be exactly:

```js
constructor
```

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The constructor runs when:

```js
new User(...)
```

is executed.

For example:

```js
const user = new User("Osama Abu Motlaq");
```

Conceptually:

```text
new User("Osama Abu Motlaq")
              ↓
       Create a new instance
              ↓
       Run constructor()
              ↓
       this → new instance
              ↓
       this.name = "Osama Abu Motlaq"
```

---

# 2. Basic Constructor Example

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);

console.log(user.name);
console.log(user.role);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

The constructor initializes two instance properties:

```js
this.name
this.role
```

---

# 3. Constructor Parameters

A constructor can receive parameters just like a normal function.

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

Here:

```text
name
role
```

are constructor parameters.

When creating the instance:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

the values are assigned like this:

```text
name → "Osama Abu Motlaq"
role → "Frontend Developer"
```

Then:

```js
this.name = name;
this.role = role;
```

stores them on the new instance.

---

# 4. Understanding `this` Inside a Constructor

This is one of the most important constructor concepts.

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

When:

```js
const user = new User("Osama Abu Motlaq");
```

runs, `this` refers to the newly created `user` instance.

Therefore:

```js
this.name = name;
```

effectively creates:

```js
user.name = "Osama Abu Motlaq";
```

Conceptually:

```text
new User(...)
      ↓
   new object
      ↓
this = new object
      ↓
this.name = name
```

---

# 5. Constructor Initialization

A constructor is often used to establish the initial state of an instance.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
    this.isActive = true;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

The instance starts with:

```js
{
  name: "Osama Abu Motlaq",
  loginCount: 0,
  isActive: true
}
```

The constructor establishes the initial state.

---

# 6. Constructor Parameters vs Instance Properties

These are not the same thing.

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

`name` on the left side:

```js
this.name
```

is an instance property.

`name` on the right side:

```js
name
```

is the constructor parameter.

This:

```js
this.name = name;
```

means:

> Store the value received through the `name` parameter in the instance's `name` property.

---

# 7. Multiple Instances

A constructor runs separately for every new instance.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

The constructor executes twice.

Conceptually:

```text
new User(...)
   ↓
constructor #1
   ↓
user1

new User(...)
   ↓
constructor #2
   ↓
user2
```

Each instance receives its own instance properties.

---

# 8. Independent Instance State

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

Each instance has its own:

```js
loginCount
```

property.

---

# 9. Default Constructor

A class does not have to explicitly define a constructor.

Example:

```js
class User {
  sayHello() {
    return "Hello";
  }
}
```

You can still write:

```js
const user = new User();
```

JavaScript provides a default constructor when you do not define one.

For a base class, conceptually:

```js
constructor(...args) {}
```

is provided.

This allows:

```js
class User {}

const user = new User();
```

to work.

---

# 10. Constructor With Default Parameters

Constructors can use default parameter values.

```js
class User {
  constructor(
    name,
    role = "Frontend Developer"
  ) {
    this.name = name;
    this.role = role;
  }
}
```

Now:

```js
const user = new User("Osama Abu Motlaq");
```

produces:

```js
console.log(user.role);
```

Output:

```text
Frontend Developer
```

The default value is used because no second argument was provided.

---

# 11. Default Values and `undefined`

Default parameters are used when the corresponding argument is `undefined`.

```js
class User {
  constructor(
    name,
    role = "Frontend Developer"
  ) {
    this.name = name;
    this.role = role;
  }
}
```

This:

```js
new User(
  "Osama Abu Motlaq",
  undefined
);
```

uses the default:

```text
Frontend Developer
```

But:

```js
new User(
  "Osama Abu Motlaq",
  null
);
```

does not use the default.

The value becomes:

```js
null
```

This follows normal JavaScript default-parameter behavior.

---

# 12. Constructor Validation

A constructor can validate incoming data.

Example:

```js
class User {
  constructor(name) {
    if (!name) {
      throw new Error("Name is required.");
    }

    this.name = name;
  }
}
```

Valid:

```js
const user = new User("Osama Abu Motlaq");
```

Invalid:

```js
const user = new User();
```

The constructor throws an error.

This can be useful when an instance should never exist in an invalid state.

However, validation should remain reasonably focused. Complex validation logic may belong in a separate validation layer.

---

# 13. Constructor With an Object Parameter

When a class requires many values, passing one configuration object can be clearer.

Instead of:

```js
class User {
  constructor(name, role, country, isActive) {
    this.name = name;
    this.role = role;
    this.country = country;
    this.isActive = isActive;
  }
}
```

you can use:

```js
class User {
  constructor({
    name,
    role,
    country,
    isActive
  }) {
    this.name = name;
    this.role = role;
    this.country = country;
    this.isActive = isActive;
  }
}
```

Create the instance:

```js
const user = new User({
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  country: "Palestine",
  isActive: true
});
```

This becomes easier to read when many values are involved.

---

# 14. Destructuring in a Constructor

The previous example uses parameter destructuring:

```js
constructor({
  name,
  role,
  country
}) {
  this.name = name;
  this.role = role;
  this.country = country;
}
```

Instead of receiving one object and accessing:

```js
options.name
options.role
options.country
```

the values are extracted directly.

This is normal JavaScript destructuring applied to constructor parameters.

---

# 15. Constructor With Computed Values

A constructor does not have to simply copy parameters.

It can calculate initial values.

```js
class User {
  constructor(name) {
    this.name = name;
    this.displayName = name.toUpperCase();
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.displayName);
```

Output:

```text
OSAMA ABU MOTLAQ
```

The constructor can establish derived state when appropriate.

---

# 16. Constructor With Generated Values

A constructor can generate values as part of initialization.

```js
class User {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date();
  }
}
```

Each instance receives its own `createdAt` value.

For example:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.createdAt);
```

The exact output depends on when the instance was created.

---

# 17. Constructor vs Class Methods

The constructor is for initialization.

Methods are generally for behavior.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }

  getName() {
    return this.name;
  }
}
```

The constructor:

```js
constructor(name) {
  this.name = name;
  this.loginCount = 0;
}
```

establishes initial state.

The methods:

```js
login()
getName()
```

define behavior.

A useful mental model is:

```text
constructor
    ↓
initial state

methods
    ↓
behavior after creation
```

---

# 18. Constructors Do Not Need to Create Methods

Avoid putting normal methods inside the constructor unless there is a specific reason.

For example:

```js
class User {
  constructor(name) {
    this.name = name;

    this.sayHello = function () {
      return `Hello, ${this.name}.`;
    };
  }
}
```

This creates a new function for every instance.

Compare this:

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

The second version defines `sayHello` as a shared prototype method.

Conceptually:

```text
Constructor-defined function:

user1 → own sayHello function
user2 → own sayHello function


Class method:

user1 ──┐
        ├──→ User.prototype.sayHello
user2 ──┘
```

For normal shared behavior, the class method is usually the better design.

---

# 19. Constructor Return Behavior

Constructors are special regarding return values.

Normally:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

creates and returns the new instance.

A constructor can explicitly return a value, but the behavior depends on what is returned.

Returning a primitive:

```js
class User {
  constructor(name) {
    this.name = name;
    return 42;
  }
}
```

does not replace the instance.

The primitive return value is ignored.

But returning an object can replace the normally created instance:

```js
class User {
  constructor(name) {
    this.name = name;

    return {
      custom: true
    };
  }
}
```

Then:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.custom);
```

Output:

```text
true
```

The explicitly returned object becomes the result of the `new` expression.

This is an advanced behavior and is usually not something you should use in ordinary class design.

---

# 20. `new.target`

JavaScript provides:

```js
new.target
```

which can be used inside constructors.

It tells you which constructor was directly invoked with `new`.

Example:

```js
class User {
  constructor(name) {
    console.log(new.target);
    this.name = name;
  }
}

const user = new User("Osama Abu Motlaq");
```

The output refers to:

```text
User
```

`new.target` can be useful when designing base classes or checking how a constructor was invoked.

---

# 21. Preventing Direct Construction

A base class can use `new.target` to prevent direct instantiation.

Example:

```js
class User {
  constructor(name) {
    if (new.target === User) {
      throw new Error(
        "User cannot be instantiated directly."
      );
    }

    this.name = name;
  }
}
```

This is an advanced pattern.

For most applications, especially React and Next.js applications, you will rarely need it.

---

# 22. Constructors and Inheritance

Constructors become more interesting when inheritance is involved.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
}
```

Create an instance:

```js
const developer = new Developer(
  "Osama Abu Motlaq",
  "JavaScript"
);
```

The child constructor receives:

```text
name
language
```

Then:

```js
super(name);
```

calls the parent constructor.

The parent constructor initializes:

```js
this.name
```

The child constructor initializes:

```js
this.language
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  language: "JavaScript"
}
```

---

# 23. Why `super()` Is Required

In a derived class:

```js
class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
}
```

the child class does not initially have an initialized `this`.

Therefore, this is invalid:

```js
class Developer extends User {
  constructor(name, language) {
    this.language = language;
    super(name);
  }
}
```

You must call:

```js
super(name);
```

before accessing:

```js
this
```

in the derived constructor.

The reason is that the parent constructor participates in initializing the derived instance.

---

# 24. Derived Class Without a Constructor

A derived class does not always need its own constructor.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {}
```

Now:

```js
const developer = new Developer(
  "Osama Abu Motlaq"
);
```

works.

Conceptually, JavaScript provides a default derived constructor similar to:

```js
constructor(...args) {
  super(...args);
}
```

This forwards the arguments to the parent constructor.

---

# 25. Calling a Constructor Is Not the Same as Calling a Method

A constructor:

```js
constructor(name) {
  this.name = name;
}
```

is automatically involved in:

```js
new User("Osama Abu Motlaq");
```

A method:

```js
sayHello() {
  return `Hello, ${this.name}.`;
}
```

must be explicitly called:

```js
user.sayHello();
```

Therefore:

```text
constructor
→ initialization during new

method
→ behavior called later
```

---

# 26. Constructor and Prototype Relationship

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
```

There are two important parts:

```text
Instance
    ↓
this.name
```

and:

```text
User.prototype
    ↓
sayHello()
```

When:

```js
const user = new User("Osama Abu Motlaq");
```

runs:

```text
new
 ↓
create instance
 ↓
connect instance → User.prototype
 ↓
run constructor
 ↓
initialize this.name
```

Therefore, the constructor and prototype system work together.

---

# 27. Constructor vs Constructor Function

A class constructor:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

is conceptually related to the older constructor-function pattern:

```js
function User(name) {
  this.name = name;
}
```

Both are used with:

```js
new User("Osama Abu Motlaq");
```

The modern class syntax is more structured.

However, the underlying object model still involves prototypes.

---

# 28. Constructor Function vs Class Constructor

Constructor function:

```js
function User(name) {
  this.name = name;
}
```

Class:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

Both initialize:

```js
this.name
```

But classes have additional language semantics, including:

* Mandatory `new`.
* Strict-mode class bodies.
* Class-specific inheritance syntax.
* Private fields.
* Static members.
* `super`.
* Class-specific method definitions.

---

# 29. Constructor Initialization Should Be Predictable

A good constructor should make the initial state easy to understand.

Good:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
    this.isActive = true;
  }
}
```

Less desirable:

```js
class User {
  constructor(name) {
    // Many unrelated operations
    // Database calls
    // UI updates
    // Network requests
    // Complex business workflows
  }
}
```

A constructor should generally establish the object's initial state rather than become a large application workflow.

---

# 30. Avoid Side Effects When Possible

A constructor can technically perform many operations, but constructors that perform external side effects are harder to reason about.

For example, avoid designing constructors around:

```text
create object
    ↓
make network request
    ↓
modify database
    ↓
update UI
    ↓
start unrelated processes
```

Prefer:

```text
create object
    ↓
initialize state
```

Then call explicit methods or application services for external operations.

---

# 31. Constructor Invariants

A useful OOP concept is an **invariant**.

An invariant is a condition that should remain true for a valid instance.

Example:

```js
class User {
  constructor(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new TypeError(
        "User name must be a non-empty string."
      );
    }

    this.name = name.trim();
  }
}
```

After successful construction, you know:

```text
user.name
```

is a non-empty string.

This makes the object safer to use later.

The constructor can therefore act as a boundary where initial validity is established.

---

# 32. Constructor and Encapsulation

Constructors can also initialize private fields.

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  checkPassword(password) {
    return this.#password === password;
  }
}
```

The constructor initializes:

```js
#password
```

while external code cannot directly access it.

Private fields are covered more deeply in:

```text
11-private-fields.md
```

---

# 33. Constructor and Getters/Setters

Constructors can initialize internal fields used by getters and setters.

Example:

```js
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value.trim();
  }
}
```

The constructor establishes:

```js
_name
```

while the getter and setter control access through:

```js
name
```

This becomes especially useful when validation or transformation is needed.

---

# 34. Constructor With Array or Object State

Constructors can initialize arrays and objects.

```js
class User {
  constructor(name) {
    this.name = name;
    this.skills = [];
    this.settings = {
      theme: "light"
    };
  }
}
```

Each instance receives its own:

```js
skills
settings
```

objects.

This is important.

Do not accidentally share mutable state between instances through a shared object unless that sharing is intentional.

---

# 35. A Common Shared-State Mistake

Instance state should normally be created inside the constructor:

```js
class User {
  constructor(name) {
    this.name = name;
    this.skills = [];
  }
}
```

Each instance gets a separate array.

Conceptually:

```text
user1.skills → []
user2.skills → []
```

They are different arrays.

This is different from intentionally placing mutable shared state on:

```js
User.prototype
```

which would cause instances to access the same object.

Understanding this distinction is important when working with prototypes.

---

# 36. Constructor Design Example

A reasonably structured class might look like:

```js
class User {
  constructor(name, role = "Developer") {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new TypeError(
        "Name must be a non-empty string."
      );
    }

    this.name = name.trim();
    this.role = role;
    this.loginCount = 0;
    this.isActive = true;
  }

  login() {
    this.loginCount++;
  }

  deactivate() {
    this.isActive = false;
  }
}
```

Create an instance:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

The constructor establishes:

```text
name
role
loginCount
isActive
```

The methods provide behavior:

```text
login()
deactivate()
```

This separation makes the class easier to understand.

---

# 37. Common Mistakes

## Mistake 1: Misspelling `constructor`

Incorrect:

```js
class User {
  constructer(name) {
    this.name = name;
  }
}
```

`constructer` is just a normal method name.

Correct:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The name must be exactly:

```js
constructor
```

---

## Mistake 2: Forgetting `this`

Incorrect:

```js
class User {
  constructor(name) {
    name = name;
  }
}
```

This does not create an instance property.

Correct:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

## Mistake 3: Using `this` Before `super()`

Incorrect:

```js
class Developer extends User {
  constructor(name) {
    this.name = name;
    super(name);
  }
}
```

Correct:

```js
class Developer extends User {
  constructor(name) {
    super(name);
  }
}
```

---

## Mistake 4: Putting Every Method Inside the Constructor

Avoid:

```js
class User {
  constructor(name) {
    this.name = name;

    this.sayHello = function () {
      return `Hello, ${this.name}.`;
    };
  }
}
```

Prefer:

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

unless an instance-specific function is intentionally required.

---

## Mistake 5: Making the Constructor Too Large

Avoid using the constructor as the place for every piece of application logic.

Keep initialization focused.

---

# 38. Best Practices

### 1. Initialize required instance state

Make the initial state explicit.

### 2. Validate important inputs

If an instance should never contain invalid required data, validate it during construction.

### 3. Keep constructors focused

Initialization should not become a large business workflow.

### 4. Use prototype methods for shared behavior

Normal class methods are shared through the prototype.

### 5. Create mutable instance state per instance

For example:

```js
this.items = [];
```

rather than accidentally sharing one mutable array between all instances.

### 6. Use object parameters for large constructor signatures

Prefer:

```js
new User({
  name,
  role,
  country
});
```

when many options are involved.

### 7. Avoid returning objects from constructors

Although technically possible, replacing the constructed instance with an explicitly returned object is unusual and can make the class confusing.

---

# 39. Quick Reference

| Concept                | Meaning                                             |
| ---------------------- | --------------------------------------------------- |
| `constructor()`        | Initializes a new class instance                    |
| `new User()`           | Creates a new instance                              |
| `this`                 | Refers to the instance being initialized            |
| `this.name = name`     | Stores constructor input on the instance            |
| Default constructor    | Automatically provided when none is defined         |
| Default parameter      | Provides a fallback value                           |
| `super()`              | Calls the parent constructor                        |
| `new.target`           | Identifies the constructor invoked with `new`       |
| Instance property      | Data stored directly on an instance                 |
| Class method           | Shared behavior normally stored on the prototype    |
| Private field          | Internal state declared with `#`                    |
| Constructor validation | Ensures initial state satisfies required conditions |

---

# 40. Constructor Mental Model

When you see:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Osama Abu Motlaq");
```

think:

```text
                    class User
                        │
                        │
                 new User(...)
                        │
                        ▼
                Create instance
                        │
                        ▼
              Connect prototype
                        │
                        ▼
              Run constructor
                        │
                        ▼
              this = new instance
                        │
                        ▼
             this.name = name
                        │
                        ▼
                    user
```

The constructor is therefore not responsible for defining the entire class.

Its primary job is to initialize the newly created instance.

---

# 41. OOP Connection

The concepts now connect like this:

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
```

You should now understand:

```text
class
  ↓
defines a reusable structure

new
  ↓
creates an instance

constructor()
  ↓
initializes the instance

this
  ↓
refers to that instance during construction

prototype
  ↓
provides shared class methods
```

The next topic:

**`08-instance-methods.md`**

will focus specifically on methods that belong to instances, how they use `this`, why class methods are stored on the prototype, method sharing, method overriding, and how instance methods differ from static methods.
