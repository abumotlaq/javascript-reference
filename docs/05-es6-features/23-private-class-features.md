# Private Class Features

> A deep reference to JavaScript private class features, including private fields, private methods, private static members, private getters and setters, initialization, inheritance, encapsulation, brand checks, limitations, and practical usage.

---

# 1. What Are Private Class Features?

JavaScript classes can define members that are **private to the class that declares them**.

Private class features are identified with the `#` prefix.

Examples include:

```js
class User {
  #password;
}
```

The `#password` field cannot be accessed directly from outside the class.

Private class features can include:

* private instance fields
* private instance methods
* private getters
* private setters
* private static fields
* private static methods
* private static getters
* private static setters

---

# 2. Why Do Private Class Features Exist?

Before native private fields were introduced, JavaScript developers commonly simulated private state using:

* closures
* naming conventions such as `_value`
* `WeakMap`
* modules

For example:

```js
class User {
  _password;
}
```

The underscore is only a convention.

It does **not** make the property private.

Anyone can still access it:

```js
const user = new User();

user._password;
```

Native private fields provide actual language-level access restrictions.

---

# 3. The `#` Syntax

A private field is declared with `#`:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

The important distinction is:

```text
password
```

is a normal variable/property name, while:

```text
#password
```

is a private class name.

---

# 4. Basic Private Field

Example:

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

Usage:

```js
const user = new User("secret");

console.log(user.checkPassword("secret"));
```

Output:

```text
true
```

The password is accessed internally through:

```js
this.#password
```

---

# 5. External Access Is Not Allowed

This does not work:

```js
const user = new User("secret");

console.log(user.#password);
```

JavaScript reports a syntax error.

Private fields are intentionally inaccessible from outside the class body.

---

# 6. Private Fields Are Not Normal Properties

Consider:

```js
class User {
  #password = "secret";

  constructor() {
    this.name = "Osama Abu Motlaq";
  }
}
```

The object has:

```text
public property:
name

private class field:
#password
```

They are fundamentally different kinds of class members.

---

# 7. Private Fields Must Be Declared

A private name must be declared inside the class:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

You cannot create a new private field dynamically from outside.

---

# 8. Private Fields Are Per Instance

Each object receives its own private field.

```js
class Counter {
  #value = 0;

  increment() {
    this.#value++;
  }

  getValue() {
    return this.#value;
  }
}
```

Create two instances:

```js
const first = new Counter();
const second = new Counter();

first.increment();
first.increment();

second.increment();

console.log(first.getValue());
console.log(second.getValue());
```

Output:

```text
2
1
```

Each instance has independent private state.

---

# 9. Private Fields Can Have Initial Values

You can initialize a private field directly:

```js
class User {
  #active = true;
}
```

The field is initialized when an instance is created.

You can also initialize it inside the constructor:

```js
class User {
  #active;

  constructor() {
    this.#active = true;
  }
}
```

Both approaches are valid.

---

# 10. Private Fields and Constructor Parameters

A common pattern is:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}
```

Usage:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.getName());
```

Output:

```text
Osama Abu Motlaq
```

The caller can access the value only through the public API provided by the class.

---

# 11. Public and Private State Together

A class can contain both:

```js
class User {
  #password;

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }
}
```

Here:

```text
name
```

is public.

```text
#password
```

is private.

This allows the class to expose only the information that other code needs.

---

# 12. Private Methods

Classes can also define private methods.

Syntax:

```js
class User {
  #validatePassword(password) {
    return password.length >= 8;
  }
}
```

A private method can only be called from code that has access to the class's private name.

---

# 13. Using a Private Method

Example:

```js
class User {
  #validatePassword(password) {
    return password.length >= 8;
  }

  setPassword(password) {
    if (!this.#validatePassword(password)) {
      throw new Error("Password is too short");
    }

    this.#password = password;
  }

  #password;
}
```

The public method:

```js
setPassword()
```

uses the private method:

```js
#validatePassword()
```

The validation implementation remains internal.

---

# 14. Private Methods vs Public Methods

Public method:

```js
class User {
  getName() {
    return this.name;
  }
}
```

Private method:

```js
class User {
  #validateName() {
    return this.name.length > 0;
  }
}
```

The difference is the `#` prefix.

Public methods are part of the external API.

Private methods are implementation details.

---

# 15. Private Getters

A getter can also be private:

```js
class User {
  #firstName = "Osama";
  #lastName = "Abu Motlaq";

  get #fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
```

The getter can be used internally:

```js
class User {
  #firstName = "Osama";
  #lastName = "Abu Motlaq";

  get #fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  displayName() {
    return this.#fullName;
  }
}
```

---

# 16. Private Setters

A setter can also be private:

```js
class User {
  #name = "";

  get name() {
    return this.#name;
  }

  set #internalName(value) {
    this.#name = value.trim();
  }

  updateName(value) {
    this.#internalName = value;
  }
}
```

The public method controls access to the private setter.

---

# 17. Private Static Fields

Private fields do not have to belong to individual instances.

They can also belong to the class itself.

Example:

```js
class User {
  static #count = 0;

  constructor() {
    User.#count++;
  }

  static getCount() {
    return User.#count;
  }
}
```

Usage:

```js
new User();
new User();

console.log(User.getCount());
```

Output:

```text
2
```

---

# 18. Private Static Methods

Static methods can also be private:

```js
class User {
  static #validateName(name) {
    return typeof name === "string" && name.length > 0;
  }

  static create(name) {
    if (!User.#validateName(name)) {
      throw new Error("Invalid name");
    }

    return new User(name);
  }

  constructor(name) {
    this.name = name;
  }
}
```

The public static method:

```js
User.create()
```

uses the private implementation:

```js
User.#validateName()
```

---

# 19. Instance vs Static Private Features

Instance private member:

```js
class User {
  #name;
}
```

belongs to each object.

Static private member:

```js
class User {
  static #count;
}
```

belongs to the class itself.

Mental model:

```text
User class
│
├── static #count
│
├── instance 1
│   └── #name
│
└── instance 2
    └── #name
```

---

# 20. Private Fields and Encapsulation

Private class features are closely related to **encapsulation**.

Encapsulation means controlling how internal state and behavior are accessed.

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

External code cannot directly modify:

```text
#balance
```

It must use the class's public methods.

---

# 21. Protecting Invariants

One of the strongest reasons to use private fields is protecting invariants.

An invariant is a condition that should always remain valid.

For example:

```text
balance >= 0
```

The class can enforce this:

```js
class BankAccount {
  #balance = 0;

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }

    this.#balance -= amount;
  }
}
```

External code cannot simply write:

```js
account.#balance = -1000;
```

because the field is private.

---

# 22. Private Fields Are Not Encryption

Private fields provide language-level access restrictions.

They do not provide:

* encryption
* password hashing
* secure storage
* network security
* authorization
* authentication

For example:

```js
class User {
  #password;
}
```

does not mean the password is encrypted.

Sensitive data still needs appropriate security practices.

---

# 23. Private Fields vs Underscore Convention

This:

```js
class User {
  _password;
}
```

does not provide true privacy.

This:

```js
class User {
  #password;
}
```

does.

Comparison:

| Feature               | `_password`     | `#password`          |
| --------------------- | --------------- | -------------------- |
| Convention            | Yes             | No                   |
| Truly private         | No              | Yes                  |
| External access       | Allowed         | Not allowed          |
| Language enforced     | No              | Yes                  |
| Reflection visibility | Normal property | Special private slot |

---

# 24. Private Fields and Object Keys

Private fields do not appear in:

```js
Object.keys()
```

For example:

```js
class User {
  #password = "secret";

  constructor() {
    this.name = "Osama Abu Motlaq";
  }
}

const user = new User();

console.log(Object.keys(user));
```

Output:

```text
["name"]
```

The private field does not appear as a normal enumerable property.

---

# 25. Private Fields and `Object.getOwnPropertyNames()`

Private fields also do not appear as ordinary property names through:

```js
Object.getOwnPropertyNames()
```

Private names are not normal string property keys.

This is an important distinction between:

```text
public object properties
```

and:

```text
private class elements
```

---

# 26. Private Fields and Symbols

A private field:

```js
#value
```

is not equivalent to:

```js
const value = Symbol();
```

Symbols create unique property keys.

Private fields use JavaScript's private class element mechanism.

They have different semantics and access rules.

---

# 27. Private Fields and Closures

Before native private fields, closures were a common way to create private state.

Example:

```js
function createCounter() {
  let value = 0;

  return {
    increment() {
      value++;
    },

    getValue() {
      return value;
    },
  };
}
```

The variable:

```text
value
```

cannot be directly accessed by callers.

Native private fields provide another approach:

```js
class Counter {
  #value = 0;

  increment() {
    this.#value++;
  }

  getValue() {
    return this.#value;
  }
}
```

Both provide encapsulation, but they use different mechanisms.

---

# 28. Private Fields vs WeakMap

Another historical approach is `WeakMap`.

```js
const privateData = new WeakMap();

class User {
  constructor(password) {
    privateData.set(this, {
      password,
    });
  }

  checkPassword(password) {
    return privateData.get(this).password === password;
  }
}
```

Modern JavaScript often allows this to be simplified with:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

---

# 29. Private Fields and Inheritance

Private members belong specifically to the class that declares them.

Consider:

```js
class Parent {
  #value = 10;
}
```

A subclass does not automatically gain access to:

```text
#value
```

as a private name.

For example:

```js
class Child extends Parent {
  getValue() {
    return this.#value;
  }
}
```

This is invalid because `#value` was declared by `Parent`, not `Child`.

---

# 30. Private Fields Are Class-Specific

This is an important mental model:

```text
Parent
└── #value

Child
└── #value
```

If both classes declare a private field with the same name:

```js
class Parent {
  #value = 10;
}

class Child extends Parent {
  #value = 20;
}
```

these are **different private fields**.

The names do not collide.

---

# 31. Private Fields and `super`

A subclass can use public/protected-like APIs exposed by the parent:

```js
class Parent {
  getValue() {
    return 10;
  }
}

class Child extends Parent {
  getParentValue() {
    return super.getValue();
  }
}
```

But private fields remain restricted to the class that declared them.

A child cannot use:

```js
super.#value
```

to access a parent's private field.

---

# 32. Private Brand Checks

JavaScript provides a special syntax to check whether an object contains a private field declared by a class:

```js
#value in object
```

Example:

```js
class User {
  #id;

  static hasId(value) {
    return #id in value;
  }
}
```

Usage:

```js
const user = new User();

console.log(User.hasId(user));
```

Output:

```text
true
```

---

# 33. Why Brand Checks Exist

A private field is associated with a class-specific internal identity, sometimes described as a **private brand**.

Objects created by the class receive that brand.

Therefore:

```js
#value in object
```

can answer:

> Does this object have access to this class's private field?

This is different from checking ordinary properties.

---

# 34. Brand Check Example

```js
class User {
  #id;

  static hasId(value) {
    return #id in value;
  }
}

const user = new User();

console.log(User.hasId(user));
console.log(User.hasId({}));
```

Output:

```text
true
false
```

---

# 35. Private Fields and Proxies

Private field access does not behave like ordinary property access through a Proxy.

For example:

```js
proxy.#value
```

still depends on whether the underlying object has the correct private brand.

Private fields are not simply properties that a Proxy can intercept using:

```js
get()
set()
```

This is another reason private fields are fundamentally different from normal properties.

---

# 36. Private Fields and Object Cloning

Private fields are not copied as ordinary enumerable properties.

For example:

```js
const copy = {
  ...user,
};
```

does not reproduce the private state.

Likewise:

```js
Object.assign({}, user);
```

does not copy private class fields.

This matters when designing classes that contain private state.

---

# 37. Private Fields and JSON

Private fields are not directly serialized by:

```js
JSON.stringify()
```

For example:

```js
class User {
  #password = "secret";

  constructor(name) {
    this.name = name;
  }
}
```

When serialized:

```js
JSON.stringify(new User("Osama Abu Motlaq"));
```

the private password is not included as a normal property.

This can be useful for preventing internal implementation details from automatically becoming part of serialized object data.

---

# 38. Private Methods and `this`

Private methods still use `this` like normal class methods.

```js
class User {
  #name = "Osama Abu Motlaq";

  #getName() {
    return this.#name;
  }

  displayName() {
    return this.#getName();
  }
}
```

Inside the private method:

```js
this
```

refers to the object on which the method is called.

---

# 39. Private Method Extraction

Private methods should not be treated like ordinary public methods that are freely extracted.

For example, class design should generally keep private implementation calls inside the class:

```js
class User {
  #validate() {
    return true;
  }

  save() {
    if (!this.#validate()) {
      throw new Error("Invalid user");
    }
  }
}
```

The private method is part of the internal implementation rather than the external API.

---

# 40. Private Static State

Private static fields are useful for class-level state.

Example:

```js
class Logger {
  static #count = 0;

  static log(message) {
    Logger.#count++;
    console.log(message);
  }

  static getCount() {
    return Logger.#count;
  }
}
```

The counter belongs to the class, not each instance.

---

# 41. Private Static Helper

Private static methods are useful for internal class-level utilities:

```js
class User {
  static #normalizeName(name) {
    return name.trim();
  }

  static create(name) {
    return new User(
      User.#normalizeName(name)
    );
  }

  constructor(name) {
    this.name = name;
  }
}
```

The helper does not need to be part of the public API.

---

# 42. Private Access Inside Static Methods

A static method can access private static members:

```js
class Counter {
  static #count = 0;

  static increment() {
    Counter.#count++;
  }

  static getCount() {
    return Counter.#count;
  }
}
```

The access is:

```js
Counter.#count
```

rather than:

```js
this.#count
```

although `this` can also be relevant in appropriate static contexts.

---

# 43. Private Access Inside Constructors

Constructors can initialize private fields:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

This is one of the most common patterns for private state.

---

# 44. Initialization Order

Class fields are initialized as part of object construction.

For a derived class:

```js
class Child extends Parent {
  #value = 10;

  constructor() {
    super();
  }
}
```

the parent constructor must be initialized through:

```js
super();
```

before the derived instance can use `this`.

Private fields follow the class's initialization semantics and must not be assumed to exist before the appropriate initialization phase.

---

# 45. Private Field Access Before Initialization

If code attempts to access a private field before the field has been initialized for the relevant object, JavaScript can throw an error.

The safe rule is:

> Access a private field only after the class has established the instance's private state.

This is particularly important in constructors and inheritance.

---

# 46. Private Fields Cannot Be Dynamically Added

Normal properties can be added dynamically:

```js
const user = {};

user.name = "Osama Abu Motlaq";
```

Private fields cannot be dynamically added like this:

```js
user.#name = "...";
```

Private names must be declared in the class definition.

---

# 47. Private Fields and `delete`

You cannot delete a private field with:

```js
delete this.#value;
```

Private fields have fixed class-defined structure rather than behaving like ordinary dynamically configurable properties.

If the field should represent an optional value, use a value such as:

```js
this.#value = null;
```

instead.

---

# 48. Private Fields Are Not Configurable Properties

Normal properties have property descriptors.

For example:

```js
Object.getOwnPropertyDescriptor(
  object,
  "name"
);
```

Private fields do not appear as ordinary property descriptors.

This reflects their different internal representation.

---

# 49. Private Fields and Reflection

Private fields are intentionally hidden from ordinary reflection mechanisms such as:

```js
Object.keys()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Reflect.ownKeys()
```

This does not mean they are cryptographically hidden.

It means JavaScript does not expose them as normal property keys.

---

# 50. Private Fields and DevTools

Browser developer tools may provide special ways to inspect internal object state while debugging.

Do not interpret the language-level privacy model as:

> Nobody can ever observe the value under any circumstances.

The important guarantee is that ordinary JavaScript code cannot directly access the private member using normal property access.

---

# 51. Encapsulation Example

A useful practical example:

```js
class BankAccount {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }

    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

The public API is:

```text
deposit()
withdraw()
getBalance()
```

The internal state is:

```text
#balance
```

---

# 52. Why This Design Is Better

Without encapsulation:

```js
account.balance = -100000;
```

could bypass business rules.

With:

```js
#balance
```

the class controls all modifications.

This creates a clear boundary:

```text
External code
      │
      ▼
Public API
      │
      ▼
Validation / business rules
      │
      ▼
Private state
```

---

# 53. Private Features and Getters

Private fields often work well with public getters.

```js
class User {
  #email;

  constructor(email) {
    this.#email = email;
  }

  get email() {
    return this.#email;
  }
}
```

Now external code can read:

```js
user.email
```

but cannot directly modify:

```text
#email
```

unless the class provides a controlled mechanism.

---

# 54. Private State with Controlled Mutation

A class can expose operations instead of exposing raw state.

Instead of:

```js
user.balance = 500;
```

use:

```js
user.deposit(500);
```

The difference is important.

A property exposes data.

A method can enforce behavior and rules.

---

# 55. Private Fields and Validation

Private state is especially useful when data must remain valid.

```js
class User {
  #age;

  constructor(age) {
    this.setAge(age);
  }

  setAge(age) {
    if (!Number.isInteger(age) || age < 0) {
      throw new Error("Invalid age");
    }

    this.#age = age;
  }

  getAge() {
    return this.#age;
  }
}
```

Every update passes through validation.

---

# 56. Private Fields and Derived Values

A private field can store source data while a public getter exposes derived information:

```js
class User {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
```

The caller does not need to know how `fullName` is constructed.

---

# 57. Private Methods for Internal Steps

Private methods can make complex classes easier to organize.

```js
class User {
  #normalizeName(name) {
    return name.trim();
  }

  #validateName(name) {
    return name.length > 0;
  }

  constructor(name) {
    const normalized =
      this.#normalizeName(name);

    if (!this.#validateName(normalized)) {
      throw new Error("Invalid name");
    }

    this.name = normalized;
  }
}
```

The constructor coordinates internal operations without exposing them publicly.

---

# 58. Do Not Make Everything Private

Private features should serve a design purpose.

Avoid:

```text
private everything
```

Instead, ask:

> Does external code need direct access to this member?

If yes, it may belong in the public API.

If no, it may be an implementation detail.

---

# 59. Public API vs Implementation

A well-designed class separates:

```text
Public API
│
├── methods consumers need
├── properties consumers need
└── documented behavior

Implementation
│
├── private fields
├── private methods
├── validation
└── internal algorithms
```

Private class features help enforce this boundary.

---

# 60. Private Features and Inheritance Design

Private members can make inheritance less convenient because subclasses cannot directly access the parent's private state.

This is intentional.

If subclasses need access, consider exposing a controlled public/protected-like method.

JavaScript does not have a dedicated `protected` class field syntax like some other languages.

For example:

```js
class Parent {
  #value = 10;

  getValue() {
    return this.#value;
  }
}

class Child extends Parent {
  useValue() {
    return this.getValue();
  }
}
```

The child uses the parent's public API rather than accessing its private state.

---

# 61. Private Fields vs Protected Fields

JavaScript does not provide a native:

```text
protected
```

class member keyword.

The closest design alternatives include:

* public methods
* private fields
* module boundaries
* closures
* conventions

If subclass access is required, design an explicit API rather than relying on accidental access.

---

# 62. Common Mistake: Using the Wrong Syntax

This is invalid:

```js
class User {
  private name;
}
```

JavaScript's native private syntax is:

```js
class User {
  #name;
}
```

The `#` is essential.

---

# 63. Common Mistake: Treating `_name` as Private

This:

```js
class User {
  _name = "Osama Abu Motlaq";
}
```

is still publicly accessible:

```js
user._name;
```

If actual language-level privacy is required:

```js
class User {
  #name = "Osama Abu Motlaq";
}
```

---

# 64. Common Mistake: Accessing Private Fields Outside the Class

Invalid:

```js
class User {
  #name = "Osama Abu Motlaq";
}

const user = new User();

console.log(user.#name);
```

Private names can only be used where the declaring class permits access.

---

# 65. Common Mistake: Using a String Property Name

This does not access a private field:

```js
user["#name"];
```

It refers to a normal property literally named:

```text
"#name"
```

It is not equivalent to:

```js
user.#name
```

Private names are not string property keys.

---

# 66. Common Mistake: Assuming Same Name Means Same Private Field

These are different:

```js
class Parent {
  #value;
}

class Child extends Parent {
  #value;
}
```

Each class owns its own private `#value`.

Private names are scoped to the declaring class.

---

# 67. Common Mistake: Expecting Spread to Copy Private State

This:

```js
const copy = {
  ...user,
};
```

does not copy the private state.

Private fields are not enumerable object properties.

If a class needs cloning, provide an explicit method or factory.

---

# 68. Common Mistake: Expecting JSON to Include Private State

This:

```js
JSON.stringify(user);
```

does not automatically serialize private fields.

If private data needs to be represented externally, provide an explicit public representation.

For example:

```js
toJSON() {
  return {
    name: this.name,
  };
}
```

---

# 69. Common Mistake: Using Private Fields for Security

Do not use:

```js
#password
```

as a replacement for password hashing.

Private fields control JavaScript access.

Passwords should be handled using appropriate security mechanisms, including secure hashing and proper server-side practices.

---

# 70. Common Mistake: Overusing Classes

Private fields do not mean every piece of JavaScript should become a class.

Modern JavaScript applications frequently use:

```text
functions
modules
closures
objects
composition
React components
custom hooks
```

Classes are useful when object identity, encapsulated state, and behavior genuinely fit the problem.

---

# 71. React Relevance

Private class features are **low priority for modern React development**.

React applications primarily use:

```text
function components
hooks
closures
modules
composition
```

rather than class-based application architecture.

However, private class features remain useful for:

* JavaScript fundamentals
* interviews
* understanding object-oriented JavaScript
* libraries
* legacy code
* specialized domain models

---

# 72. React Classes vs Modern React

Older React code commonly used class components:

```js
class UserProfile extends React.Component {
  // ...
}
```

Modern React generally uses:

```js
function UserProfile() {
  // ...
}
```

Therefore, learning private class features is valuable for JavaScript knowledge, but it should not take priority over:

```text
functions
closures
objects
modules
state
hooks
async JavaScript
```

for a React-focused developer.

---

# 73. Next.js Relevance

The same principle applies to Next.js.

Next.js applications commonly rely on:

```text
modules
functions
server functions
React components
hooks
composition
```

Private class features may still appear inside:

```text
service classes
repository classes
SDKs
third-party libraries
domain models
Node.js code
```

but they are not a core Next.js feature.

---

# 74. A Practical Next.js-Style Example

A service class could encapsulate internal state:

```js
class UserService {
  #client;

  constructor(client) {
    this.#client = client;
  }

  async getUser(id) {
    return this.#client.getUser(id);
  }
}
```

The outside code only needs:

```js
service.getUser(id);
```

The implementation detail:

```text
#client
```

remains internal.

However, a class is not automatically better than a function-based module. Choose the simpler design that fits the application.

---

# 75. Private Fields and Dependency Injection

Private fields can store injected dependencies:

```js
class UserService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getUser(id) {
    return this.#repository.findById(id);
  }
}
```

The dependency is hidden from direct mutation.

The class controls how it is used.

---

# 76. Private Features and Testing

Private implementation details should generally not be tested directly.

Prefer testing the public behavior:

```js
const account = new BankAccount();

account.deposit(100);

console.log(account.getBalance());
```

Test:

```text
observable behavior
```

rather than:

```text
internal implementation
```

This makes tests less coupled to implementation details.

---

# 77. Private Features and Refactoring

Private members make internal refactoring easier.

Suppose:

```js
#calculateTotal()
```

is replaced internally with a different algorithm.

External code does not need to change as long as:

```text
public API
```

remains compatible.

This is one of the main architectural benefits of encapsulation.

---

# 78. Private Methods and Abstraction

Private methods are often used to implement abstraction.

For example:

```js
class Order {
  #calculateTax() {
    // internal implementation
  }

  getTotal() {
    // public behavior
  }
}
```

Consumers care about:

```text
getTotal()
```

rather than how tax calculation is implemented internally.

This connects:

```text
private implementation
        ↓
abstraction
        ↓
public API
```

---

# 79. Private Fields and Composition

Private state also works naturally with composition.

A class may encapsulate one responsibility:

```js
class ShoppingCart {
  #items = [];

  addItem(item) {
    this.#items.push(item);
  }

  getItems() {
    return [...this.#items];
  }
}
```

Returning a copy:

```js
[...this.#items]
```

prevents callers from directly mutating the internal array.

The private field protects the internal reference, while the copy protects the returned data from accidental mutation.

---

# 80. Private State and Defensive Copies

Consider:

```js
class ShoppingCart {
  #items = [];

  getItems() {
    return this.#items;
  }
}
```

The caller receives the actual internal array.

That can allow:

```js
cart.getItems().push(item);
```

without using the class API.

A safer design may be:

```js
getItems() {
  return [...this.#items];
}
```

Now the caller receives a shallow copy.

Private fields and defensive copies often work together.

---

# 81. Private Field Checklist

When designing a private field, ask:

```text
Does this state need external direct access?
Does the class need to enforce invariants?
Could external mutation break the object?
Is the value an implementation detail?
Should consumers use a method instead?
Should consumers receive a read-only/derived representation?
```

If direct external access is unnecessary, a private field may be appropriate.

---

# 82. Private Class Features Quick Reference

### Private instance field

```js
class User {
  #name;
}
```

### Private instance method

```js
class User {
  #validate() {}
}
```

### Private getter

```js
class User {
  get #name() {
    return this.#value;
  }
}
```

### Private setter

```js
class User {
  set #name(value) {
    this.#value = value;
  }
}
```

### Private static field

```js
class User {
  static #count = 0;
}
```

### Private static method

```js
class User {
  static #validate() {}
}
```

### Private brand check

```js
#value in object
```

---

# 83. Public vs Private

| Feature                 | Public   | Private      |
| ----------------------- | -------- | ------------ |
| Syntax                  | `name`   | `#name`      |
| External access         | Yes      | No           |
| Normal property key     | Yes      | No           |
| `Object.keys()`         | Possible | No           |
| `Reflect.ownKeys()`     | Possible | No           |
| JSON serialization      | Possible | Not directly |
| Dynamic property access | Yes      | No           |
| Class-specific access   | No       | Yes          |

---

# 84. Private Field vs Getter

A private field stores state:

```js
#name
```

A getter exposes controlled access:

```js
get name() {
  return this.#name;
}
```

Together:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
```

This gives:

```text
private storage
      +
public read access
```

---

# 85. Private Field vs Private Method

Use a private field for:

```text
internal state/data
```

Use a private method for:

```text
internal behavior/algorithm
```

Example:

```js
class User {
  #name;

  #normalizeName(name) {
    return name.trim();
  }
}
```

The distinction is:

```text
#name
→ state

#normalizeName()
→ behavior
```

---

# 86. Private Instance vs Private Static

Use a private instance field when each object needs its own state:

```js
class User {
  #name;
}
```

Use a private static field when the state belongs to the class:

```js
class User {
  static #count = 0;
}
```

Mental model:

```text
Instance private
→ one copy per instance

Static private
→ one class-level member
```

---

# 87. Private Features and Object Identity

Private fields are associated with individual class instances.

For example:

```js
class User {
  #id;

  constructor(id) {
    this.#id = id;
  }
}
```

Two users can have the same public properties while still being separate instances with separate private state.

This is one reason private fields fit naturally with objects that have identity and lifecycle.

---

# 88. Private Fields and `instanceof`

`instanceof` checks prototype-based class relationships:

```js
user instanceof User
```

Private brand checks answer a different question:

```js
#id in user
```

Conceptually:

```text
instanceof
→ Is this object associated with this constructor/prototype chain?

private brand check
→ Does this object contain this class's private state?
```

Do not treat the two mechanisms as interchangeable.

---

# 89. When Private Class Features Are Appropriate

They are particularly useful when:

* state must not be directly modified
* invariants must be enforced
* implementation details should be hidden
* a class has meaningful identity
* internal algorithms should not become public API
* subclass code should not directly depend on internal state
* controlled access improves maintainability

---

# 90. When They Are Not Appropriate

Avoid private class features when:

* a simple function is enough
* a plain object is enough
* state does not need encapsulation
* a class exists only because "OOP is required"
* the application is naturally function-based
* the abstraction adds more complexity than value

Modern JavaScript gives you several tools for encapsulation.

Choose the simplest one that solves the problem.

---

# 91. Mental Model

Think about a class like this:

```text
Class
│
├── Public API
│   ├── methods
│   ├── getters
│   └── public properties
│
└── Internal implementation
    ├── #private fields
    ├── #private methods
    ├── validation
    └── internal algorithms
```

External code interacts with:

```text
Public API
```

The class controls:

```text
Private implementation
```

---

# 92. Key Takeaways

1. JavaScript supports native private class features using `#`.
2. Private fields are not ordinary object properties.
3. Private fields can store per-instance state.
4. Private methods encapsulate internal behavior.
5. Private getters and setters are supported.
6. Static members can also be private.
7. Private members are accessible only within the appropriate class scope.
8. `_name` is a convention, not true privacy.
9. Private fields are different from Symbols.
10. Private fields are different from closure-based privacy.
11. Private fields can replace many historical WeakMap-based patterns.
12. Private members are not inherited as directly accessible private names.
13. A subclass cannot access a parent's private field directly.
14. Different classes can independently declare private members with the same name.
15. `#value in object` performs a private brand check.
16. Private fields do not appear as ordinary object keys.
17. Spread and `Object.assign()` do not copy private fields as normal properties.
18. JSON serialization does not automatically include private fields.
19. Private fields are not encryption.
20. Private fields help enforce invariants and controlled mutation.
21. Private state is often paired with public methods or getters.
22. Defensive copies can further protect private collections.
23. Private implementation details should generally not be tested directly.
24. Private features can make refactoring safer by reducing external coupling.
25. Private class features are useful for OOP-oriented JavaScript.
26. They are not required for every JavaScript application.
27. Modern React and Next.js primarily favor functions, hooks, modules, and composition.
28. For a React/Next.js developer, private class features are useful JavaScript knowledge but are lower priority than functions, closures, objects, modules, promises, and async/await.

---

# React / Next.js Priority

**Priority for React learning: Low to Medium.**

You should understand:

```text
#private fields
#private methods
private vs public members
encapsulation
why private state can protect invariants
private fields vs normal properties
```

You do not need to build your React applications around classes.

For a modern React/Next.js developer, the more important JavaScript concepts are:

```text
Functions
Objects
Arrays
Destructuring
Spread / Rest
Closures
Modules
Promises
async / await
Error Handling
Optional Chaining
Nullish Coalescing
Array Methods
```

Private class features are mainly important because they complete your understanding of modern JavaScript classes and encapsulation.
