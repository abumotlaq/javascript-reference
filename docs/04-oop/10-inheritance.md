# JavaScript Inheritance

Inheritance is an Object-Oriented Programming (OOP) mechanism that allows one object or class to reuse and extend behavior from another object or class.

In JavaScript, inheritance is implemented through the **prototype chain**.

Modern JavaScript usually expresses inheritance using the `class` and `extends` syntax:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

class Developer extends User {
  code() {
    return `${this.name} is writing JavaScript.`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.introduce());
console.log(osama.code());
```

Output:

```text
My name is Osama Abu Motlaq.
Osama Abu Motlaq is writing JavaScript.
```

The `Developer` class inherits the `introduce()` method from `User` while adding its own `code()` method.

---

## 1. What Is Inheritance?

Inheritance allows a more specific type to reuse functionality from a more general type.

For example:

```text
User
  ↓
Developer
```

A `Developer` is a `User`, so it can reuse user-related behavior while adding developer-specific behavior.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    return `${this.name} logged in.`;
  }
}

class Developer extends User {
  code() {
    return `${this.name} is coding.`;
  }
}
```

Now:

```js
const osama = new Developer("Osama Abu Motlaq");

console.log(osama.login());
console.log(osama.code());
```

The object can use both methods.

---

# 2. The `extends` Keyword

The `extends` keyword creates an inheritance relationship between classes.

```js
class User {
  login() {
    return "User logged in.";
  }
}

class Developer extends User {
  code() {
    return "Developer is coding.";
  }
}
```

Here:

```text
Developer
    ↓
User
    ↓
Object
    ↓
null
```

`Developer` inherits from `User`.

Therefore:

```js
const osama = new Developer();

console.log(osama.login());
console.log(osama.code());
```

Both methods are available.

---

# 3. How Inheritance Works Internally

It is important to understand that JavaScript inheritance is fundamentally based on **prototypes**.

`class` syntax does not replace the prototype system.

Consider:

```js
class User {
  login() {
    return "User logged in.";
  }
}

class Developer extends User {
  code() {
    return "Developer is coding.";
  }
}
```

When we create:

```js
const osama = new Developer();
```

JavaScript creates an object whose prototype chain is approximately:

```text
osama
  ↓
Developer.prototype
  ↓
User.prototype
  ↓
Object.prototype
  ↓
null
```

When JavaScript evaluates:

```js
osama.login();
```

it first looks for `login` on `osama`.

If it does not find it, JavaScript searches:

```text
Developer.prototype
```

It is not there.

Then:

```text
User.prototype
```

It finds `login`.

Therefore the method can be used by `osama`.

This is the actual mechanism behind class inheritance.

---

# 4. Inherited Methods

A subclass can use methods defined by its parent.

```js
class User {
  login() {
    return "User logged in.";
  }
}

class Developer extends User {
  code() {
    return "Developer is coding.";
  }
}

const osama = new Developer();

console.log(osama.login());
console.log(osama.code());
```

`login()` belongs to the parent class.

`code()` belongs to the child class.

Conceptually:

```text
User.prototype
└── login()

Developer.prototype
└── code()
```

And:

```text
osama
  ↓
Developer.prototype
  ↓
User.prototype
```

---

# 5. Inheriting Constructor Properties

Inheritance is not limited to methods.

A parent constructor can initialize properties for the child instance.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  code() {
    return `${this.name} is coding.`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.name);
console.log(osama.code());
```

Output:

```text
Osama Abu Motlaq
Osama Abu Motlaq is coding.
```

The `name` property is created by the `User` constructor.

The `Developer` instance still receives it because the parent constructor is executed through the inheritance mechanism.

---

# 6. `super()`

When a derived class has its own constructor, it must call:

```js
super()
```

before accessing `this`.

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

const osama = new Developer("Osama Abu Motlaq", "JavaScript");

console.log(osama.name);
console.log(osama.language);
```

Output:

```text
Osama Abu Motlaq
JavaScript
```

`super(name)` calls the parent constructor:

```js
User
```

Conceptually:

```text
Developer constructor
        ↓
    super(name)
        ↓
User constructor
        ↓
this.name = name
```

Then the child constructor continues:

```js
this.language = language;
```

---

# 7. Why Must `super()` Come Before `this`?

In a derived class, `this` cannot be used before `super()`.

This is invalid:

```js
class Developer extends User {
  constructor(name) {
    this.name = name;
    super(name);
  }
}
```

JavaScript throws an error because the derived class has not initialized its parent part yet.

Correct:

```js
class Developer extends User {
  constructor(name) {
    super(name);
    this.name = name;
  }
}
```

Usually, however, you should not assign the same property twice.

A better example is:

```js
class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
}
```

---

# 8. What Does `super()` Actually Do?

Consider:

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

When:

```js
new Developer("Osama Abu Motlaq", "JavaScript");
```

is executed, the child constructor receives:

```text
name     → "Osama Abu Motlaq"
language → "JavaScript"
```

Then:

```js
super(name);
```

invokes the parent constructor.

The parent constructor performs:

```js
this.name = name;
```

After returning from `super()`:

```js
this.language = language;
```

is executed.

The resulting object contains:

```js
{
  name: "Osama Abu Motlaq",
  language: "JavaScript"
}
```

---

# 9. A Derived Class Without a Constructor

A subclass does not always need its own constructor.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  code() {
    return `${this.name} is coding.`;
  }
}
```

Now:

```js
const osama = new Developer("Osama Abu Motlaq");
```

works.

If the derived class does not define a constructor, JavaScript provides an effective default constructor that forwards the arguments to the parent constructor.

Conceptually:

```js
constructor(...args) {
  super(...args);
}
```

Therefore:

```js
new Developer("Osama Abu Motlaq");
```

ultimately initializes the parent class with the same argument.

---

# 10. Method Inheritance

Methods defined in the parent are available to the child.

```js
class User {
  login() {
    return "Logging in...";
  }

  logout() {
    return "Logging out...";
  }
}

class Developer extends User {
  code() {
    return "Writing JavaScript...";
  }
}

const osama = new Developer();

console.log(osama.login());
console.log(osama.logout());
console.log(osama.code());
```

The child receives access to:

```text
login()
logout()
code()
```

But the methods are not copied into the instance.

They are found through the prototype chain.

---

# 11. Method Overriding

A child class can define a method with the same name as a parent method.

This is called **method overriding**.

```js
class User {
  introduce() {
    return "I am a user.";
  }
}

class Developer extends User {
  introduce() {
    return "I am a developer.";
  }
}

const osama = new Developer();

console.log(osama.introduce());
```

Output:

```text
I am a developer.
```

JavaScript finds:

```text
Developer.prototype.introduce
```

before it needs to search:

```text
User.prototype.introduce
```

Therefore the child implementation wins.

---

# 12. Why Does Method Overriding Work?

Consider:

```js
class User {
  introduce() {
    return "I am a user.";
  }
}

class Developer extends User {
  introduce() {
    return "I am a developer.";
  }
}
```

The prototype structure is approximately:

```text
Developer.prototype
└── introduce()

        ↓

User.prototype
└── introduce()
```

When:

```js
osama.introduce();
```

runs, JavaScript searches from the bottom upward:

```text
osama
 ↓
Developer.prototype → found
 ↓
stop searching
```

It does not continue to `User.prototype`.

---

# 13. Calling the Parent Method with `super`

Sometimes the child wants to extend the parent's behavior instead of completely replacing it.

Use:

```js
super.methodName()
```

Example:

```js
class User {
  introduce() {
    return "I am a user.";
  }
}

class Developer extends User {
  introduce() {
    return `${super.introduce()} and I write JavaScript.`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.introduce());
```

Output:

```text
I am a user. and I write JavaScript.
```

Here:

```js
super.introduce()
```

calls the parent implementation.

---

# 14. `super` Is Not Only for Constructors

`super` has two major uses in class inheritance.

### Parent constructor

```js
super(name);
```

### Parent method

```js
super.introduce();
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

class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  introduce() {
    return `${super.introduce()} I use ${this.language}.`;
  }
}
```

---

# 15. Multi-Level Inheritance

Inheritance can have multiple levels.

```js
class User {
  login() {
    return "User logged in.";
  }
}

class Developer extends User {
  code() {
    return "Developer is coding.";
  }
}

class FrontendDeveloper extends Developer {
  buildUI() {
    return "Building user interfaces.";
  }
}
```

Now:

```text
FrontendDeveloper
       ↓
Developer
       ↓
User
       ↓
Object
       ↓
null
```

An instance can access methods from every level:

```js
const osama = new FrontendDeveloper();

console.log(osama.login());
console.log(osama.code());
console.log(osama.buildUI());
```

However, very deep inheritance hierarchies can become difficult to understand and maintain.

---

# 16. Inheritance and `instanceof`

The `instanceof` operator checks whether an object's prototype chain contains a constructor's `prototype`.

Example:

```js
class User {}

class Developer extends User {}

const osama = new Developer();

console.log(osama instanceof Developer);
console.log(osama instanceof User);
console.log(osama instanceof Object);
```

Output:

```text
true
true
true
```

Why is this possible?

Because:

```text
osama
 ↓
Developer.prototype
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

All three prototypes appear in the chain.

---

# 17. Inspecting the Prototype Chain

You can inspect the relationship directly:

```js
class User {}

class Developer extends User {}

const osama = new Developer();

console.log(Object.getPrototypeOf(osama) === Developer.prototype);
console.log(Object.getPrototypeOf(Developer.prototype) === User.prototype);
```

Output:

```text
true
true
```

This demonstrates that class inheritance is backed by prototype relationships.

---

# 18. Static Inheritance

Inheritance also affects static methods.

```js
class User {
  static describe() {
    return "This is the User class.";
  }
}

class Developer extends User {}

console.log(Developer.describe());
```

Output:

```text
This is the User class.
```

Static inheritance follows a separate relationship between the class constructors themselves.

Conceptually:

```text
Developer
    ↓
User
```

while instances have:

```text
developerInstance
    ↓
Developer.prototype
    ↓
User.prototype
```

This distinction is important.

---

# 19. Overriding Static Methods

A child class can override a static method.

```js
class User {
  static describe() {
    return "User class.";
  }
}

class Developer extends User {
  static describe() {
    return "Developer class.";
  }
}

console.log(Developer.describe());
```

Output:

```text
Developer class.
```

The child implementation shadows the inherited static method.

---

# 20. Using `super` with Static Methods

A child static method can call the parent static method:

```js
class User {
  static describe() {
    return "User class.";
  }
}

class Developer extends User {
  static describe() {
    return `${super.describe()} Extended by Developer.`;
  }
}

console.log(Developer.describe());
```

Output:

```text
User class. Extended by Developer.
```

---

# 21. Inheritance with Private Fields

Private fields belong to the class that declares them.

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

class Developer extends User {
  access() {
    return "Developer access.";
  }
}

const osama = new Developer("secret");
```

The child class cannot directly access:

```js
this.#password
```

because `#password` belongs specifically to `User`.

This would fail:

```js
class Developer extends User {
  getPassword() {
    return this.#password;
  }
}
```

Private fields are truly class-private.

The child must use a public or protected-by-convention API provided by the parent.

JavaScript does not have a traditional `protected` keyword like some other OOP languages.

---

# 22. Inheritance and Encapsulation

Inheritance does not mean that every parent implementation should be directly exposed to children.

A parent can control how its internal state is accessed.

Example:

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

class Developer extends User {
  introduce() {
    return `My name is ${this.getName()}.`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.introduce());
```

The child does not directly access:

```js
#name
```

Instead, it uses:

```js
getName()
```

This preserves encapsulation.

---

# 23. Inheritance and Polymorphism

Inheritance is closely related to **polymorphism**.

A parent class can define a common interface while child classes provide different implementations.

Example:

```js
class User {
  getRole() {
    return "User";
  }
}

class Developer extends User {
  getRole() {
    return "Developer";
  }
}

class Designer extends User {
  getRole() {
    return "Designer";
  }
}
```

Now:

```js
const users = [
  new Developer(),
  new Designer()
];

for (const user of users) {
  console.log(user.getRole());
}
```

Output:

```text
Developer
Designer
```

The code calls:

```js
user.getRole();
```

without needing to know the exact subclass.

This is polymorphic behavior.

---

# 24. Inheritance Does Not Copy Objects

Inheritance does not mean:

```text
copy all parent properties
+
copy all parent methods
```

Instead, JavaScript uses prototype relationships.

For:

```js
class User {
  login() {
    return "Logged in.";
  }
}

class Developer extends User {
  code() {
    return "Coding.";
  }
}

const osama = new Developer();
```

The relationship is approximately:

```text
osama
   ↓
Developer.prototype
   ↓
User.prototype
```

Methods are found through this chain.

---

# 25. Constructor Properties Are Still Per-Instance

Prototype-based method sharing does not mean that instance properties are shared.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {}

const osama = new Developer("Osama Abu Motlaq");
const anotherDeveloper = new Developer("Osama Abu Motlaq");

console.log(osama === anotherDeveloper);
```

Output:

```text
false
```

Each `new` creates a different object.

The `name` properties belong to their respective instances.

---

# 26. Inherited Methods Are Shared

Consider:

```js
class User {
  login() {
    return "Logged in.";
  }
}

class Developer extends User {}

const osama = new Developer("Osama Abu Motlaq");
const anotherDeveloper = new Developer("Osama Abu Motlaq");
```

The `login` method is not separately created for each instance.

It is available through:

```text
Developer.prototype
      ↓
User.prototype
```

This is one of the major benefits of prototype-based method sharing.

---

# 27. Inheritance with Constructor Functions

Before `class` syntax, inheritance was commonly implemented directly with prototypes.

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.login = function () {
  return `${this.name} logged in.`;
};

function Developer(name, language) {
  User.call(this, name);
  this.language = language;
}

Developer.prototype = Object.create(User.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.code = function () {
  return `${this.name} writes ${this.language}.`;
};
```

Then:

```js
const osama = new Developer("Osama Abu Motlaq", "JavaScript");

console.log(osama.login());
console.log(osama.code());
```

Modern code usually prefers:

```js
class User {}
class Developer extends User {}
```

because it is easier to read.

However, understanding the prototype version helps explain what `extends` is doing conceptually.

---

# 28. `extends` vs Prototype Manipulation

Modern syntax:

```js
class Developer extends User {}
```

is much easier to read than manually connecting prototypes.

The important mental model is:

```text
class syntax
     ↓
prototype relationships
```

Therefore, learning:

```text
class
extends
super
```

does not replace learning:

```text
prototype
prototype chain
[[Prototype]]
```

Both levels are useful.

---

# 29. Inheritance vs Composition

Inheritance represents an **is-a** relationship.

```text
Developer is a User
```

Composition represents a **has-a** relationship.

```text
Developer has a Logger
```

Example of composition:

```js
const logger = {
  log(message) {
    console.log(message);
  }
};

class Developer {
  constructor(name) {
    this.name = name;
    this.logger = logger;
  }

  code() {
    this.logger.log(`${this.name} is coding.`);
  }
}
```

The developer does not inherit from `Logger`.

Instead:

```text
Developer
   ↓
has a Logger
```

This distinction is extremely important in software design.

---

# 30. Why Composition Is Often Preferred

Inheritance creates a strong relationship between classes.

If:

```js
class Developer extends User {}
```

then `Developer` is tightly connected to the implementation and design of `User`.

Composition can be more flexible:

```js
class Developer {
  constructor(name, logger) {
    this.name = name;
    this.logger = logger;
  }
}
```

Now the logger can be replaced.

```js
const logger = {
  log(message) {
    console.log(message);
  }
};

const osama = new Developer("Osama Abu Motlaq", logger);
```

The developer object depends on a capability rather than requiring a specific parent class.

This is one reason modern JavaScript applications often favor composition.

---

# 31. When Inheritance Makes Sense

Inheritance can be appropriate when there is a genuine hierarchical relationship.

For example:

```text
Vehicle
├── Car
├── Motorcycle
└── Truck
```

or:

```text
Shape
├── Circle
├── Rectangle
└── Triangle
```

A useful test is:

> Is the child genuinely a specialized form of the parent?

If the answer is unclear, composition may be a better design.

---

# 32. Avoid Deep Inheritance Trees

This can become difficult:

```text
Entity
  ↓
User
  ↓
Employee
  ↓
Developer
  ↓
FrontendDeveloper
  ↓
SeniorFrontendDeveloper
```

Each level introduces another dependency.

Changing a high-level parent can affect many descendants.

Prefer simpler relationships when possible:

```text
User

Developer
  ├── Logger
  ├── AuthService
  └── ProjectService
```

This is not a rule that inheritance is bad.

The principle is:

> Use inheritance deliberately, not automatically.

---

# 33. Common Inheritance Mistakes

## Mistake 1: Forgetting `super()`

Invalid:

```js
class Developer extends User {
  constructor(name) {
    this.name = name;
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

## Mistake 2: Calling `super()` After `this`

Invalid:

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
    this.name = name;
  }
}
```

Although assigning `name` again is unnecessary in this example.

---

## Mistake 3: Assuming Methods Are Copied

Do not think:

```text
Developer receives a copy of every User method.
```

Instead think:

```text
Developer.prototype
        ↓
User.prototype
```

---

## Mistake 4: Confusing `super()` and `super.method()`

These are different:

```js
super(name);
```

calls the parent constructor.

```js
super.introduce();
```

calls a parent method.

---

## Mistake 5: Using Inheritance for Reuse Alone

Do not create:

```js
class A extends B {}
```

only because you want to reuse one function.

If there is no meaningful "is-a" relationship, a normal function or composition may be better.

---

## Mistake 6: Creating Extremely Deep Hierarchies

Deep inheritance makes behavior harder to trace.

Prefer shallow hierarchies.

---

# 34. Best Practices

### 1. Use inheritance for genuine specialization

```text
User → Developer
```

can make sense if a developer is modeled as a specialized user.

### 2. Keep inheritance hierarchies shallow

Avoid unnecessary levels.

### 3. Understand prototypes

Even when using:

```js
class
extends
super
```

remember that JavaScript inheritance is prototype-based.

### 4. Use `super()` correctly

In derived constructors:

```js
super(...);
```

must happen before using `this`.

### 5. Override intentionally

If overriding a method, make sure the child really needs different behavior.

### 6. Use `super.method()` when extending parent behavior

```js
someMethod() {
  return `${super.someMethod()} extra behavior`;
}
```

### 7. Prefer composition when inheritance creates unnecessary coupling

Ask:

```text
Is this an "is-a" relationship?
```

If not, composition may be better.

### 8. Keep parent classes focused

A parent class should not become a giant collection of unrelated functionality.

---

# 35. Inheritance vs Composition

| Inheritance                    | Composition                          |
| ------------------------------ | ------------------------------------ |
| "is-a" relationship            | "has-a" relationship                 |
| Uses `extends`                 | Uses object references/dependencies  |
| Strong coupling                | Usually more flexible                |
| Behavior comes from parent     | Behavior comes from composed objects |
| Useful for clear hierarchies   | Useful for assembling capabilities   |
| Can become rigid when overused | Often easier to change               |

Example inheritance:

```js
class Developer extends User {}
```

Example composition:

```js
class Developer {
  constructor(logger) {
    this.logger = logger;
  }
}
```

---

# 36. Inheritance Mental Model

The most important mental model is:

```text
class User
    ↓
User.prototype

class Developer extends User
    ↓
Developer.prototype
    ↓
User.prototype
    ↓
Object.prototype
    ↓
null
```

For:

```js
const osama = new Developer("Osama Abu Motlaq");
```

think:

```text
osama
  ↓
Developer.prototype
  ↓
User.prototype
  ↓
Object.prototype
  ↓
null
```

When JavaScript cannot find a property on the object, it searches upward through this chain.

---

# 37. Complete Example

```js
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    return `${this.name} logged in.`;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  introduce() {
    return `${super.introduce()} I use ${this.language}.`;
  }

  code() {
    return `${this.name} is writing ${this.language}.`;
  }
}

const osama = new Developer("Osama Abu Motlaq", "JavaScript");

console.log(osama.login());
console.log(osama.introduce());
console.log(osama.code());

console.log(osama instanceof Developer);
console.log(osama instanceof User);
```

Output:

```text
Osama Abu Motlaq logged in.
My name is Osama Abu Motlaq. I use JavaScript.
Osama Abu Motlaq is writing JavaScript.
true
true
```

The relationships are:

```text
Developer
    ↓ extends
User
```

and:

```text
osama
   ↓
Developer.prototype
   ↓
User.prototype
   ↓
Object.prototype
   ↓
null
```

---

# 38. Inheritance in React

Inheritance is **not a major pattern in modern React development**.

Modern React primarily uses:

```js
function components
hooks
composition
props
context
```

rather than class inheritance.

For example, React encourages composing components:

```jsx
function UserProfile({ user }) {
  return <h2>{user.name}</h2>;
}

function DeveloperProfile({ user }) {
  return (
    <>
      <UserProfile user={user} />
      <p>JavaScript Developer</p>
    </>
  );
}
```

This is composition rather than:

```text
DeveloperComponent extends UserComponent
```

Understanding inheritance is still valuable because:

* JavaScript itself uses prototypes.
* You may encounter classes in existing codebases.
* Libraries may use classes internally.
* It appears in technical interviews.
* Understanding `extends`, `super`, and prototypes strengthens your JavaScript fundamentals.
* It helps you understand why modern React often prefers composition.

For your React learning path, **inheritance is useful JavaScript knowledge, but it should not receive the same study priority as functions, closures, objects, arrays, async JavaScript, modules, and React fundamentals.**

---

# 39. Quick Reference

| Concept                      | Syntax                    | Purpose                            |
| ---------------------------- | ------------------------- | ---------------------------------- |
| Inheritance                  | `class B extends A`       | Create a child class               |
| Parent constructor           | `super()`                 | Call parent constructor            |
| Parent constructor arguments | `super(value)`            | Pass arguments to parent           |
| Parent method                | `super.method()`          | Call parent implementation         |
| Method overriding            | `method() {}`             | Replace inherited behavior         |
| Prototype chain              | `Object.getPrototypeOf()` | Inspect inheritance                |
| Instance check               | `instanceof`              | Check prototype-chain relationship |
| Static inheritance           | `class B extends A`       | Inherit static behavior too        |
| Private field                | `#field`                  | Encapsulate class state            |
| Composition                  | `this.service = service`  | Build objects from components      |

---

# 40. Key Takeaways

1. **Inheritance allows a child class to reuse and extend a parent class.**

2. JavaScript uses:

```js
extends
```

to express class inheritance.

3. A derived constructor usually calls:

```js
super(...)
```

before using `this`.

4. `super.method()` calls a parent implementation.

5. A child can override inherited methods.

6. JavaScript inheritance is fundamentally based on the **prototype chain**.

7. A typical chain looks like:

```text
instance
  ↓
Child.prototype
  ↓
Parent.prototype
  ↓
Object.prototype
  ↓
null
```

8. Inherited methods are normally found through prototypes rather than copied into every instance.

9. `instanceof` works by checking the prototype chain.

10. Static methods can also participate in class inheritance.

11. Private fields remain private to the class that declares them.

12. Inheritance represents an **is-a** relationship.

13. Composition represents a **has-a** relationship.

14. Deep inheritance hierarchies can create unnecessary coupling.

15. In modern JavaScript applications, composition is often preferred when inheritance does not represent a clear domain relationship.

---

## Final Mental Model

Do not memorize inheritance as simply:

```text
Child gets Parent's code.
```

Instead, think:

```text
Inheritance
     ↓
prototype relationship
     ↓
property/method lookup
     ↓
child prototype
     ↓
parent prototype
     ↓
Object.prototype
     ↓
null
```

And when using classes:

```js
class Developer extends User {
  constructor(name) {
    super(name);
  }
}
```

mentally translate it to:

```text
Developer is connected to User
        ↓
Developer.prototype
        ↓
User.prototype
```

That prototype relationship is the foundation of JavaScript inheritance.

---

## Next Topic

**`11-private-fields.md` — Private Fields**

The next topic focuses on JavaScript's `#private` class fields, how true class-level privacy works, how private fields differ from ordinary properties, and how encapsulation is implemented with them.
