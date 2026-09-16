# Static Methods

Static methods are methods that belong to the class itself rather than to individual instances.

They are defined using the `static` keyword:

```js
class User {
  static createGuest() {
    return new User("Osama Abu Motlaq");
  }
}
```

A static method is called on the class:

```js
const user = User.createGuest();
```

It is **not** called on an instance:

```js
user.createGuest();
```

The fundamental distinction is:

```text
Instance method
    ↓
instance.method()

Static method
    ↓
Class.method()
```

---

# 1. Basic Static Method

Example:

```js
class User {
  static getType() {
    return "User";
  }
}
```

Call it:

```js
console.log(User.getType());
```

Output:

```text
User
```

Notice that no instance was created.

```js
User.getType();
```

works directly on the class.

---

# 2. Static Methods vs Instance Methods

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }

  static getType() {
    return "User";
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

The instance method is called like this:

```js
user.introduce();
```

The static method is called like this:

```js
User.getType();
```

The difference:

```text
User
 │
 └── static getType()

user
 │
 └── instance introduce()
```

---

# 3. Why Use Static Methods?

A static method is useful when an operation:

* Does not depend on one specific instance.
* Belongs conceptually to the class.
* Creates or manages instances.
* Provides a utility related to the class.
* Performs class-level logic.

For example:

```js
class User {
  static createGuest() {
    return new User(
      "Osama Abu Motlaq",
      "Guest"
    );
  }

  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

The operation:

```js
User.createGuest();
```

creates a user.

It does not need an existing user instance.

Therefore, a static method is appropriate.

---

# 4. Static Methods Are Not Instance Methods

Consider:

```js
class User {
  static getType() {
    return "User";
  }
}

const user = new User();
```

This works:

```js
User.getType();
```

This does not:

```js
user.getType();
```

Why?

Because `getType()` is static.

It belongs to:

```js
User
```

not:

```js
User.prototype
```

---

# 5. Where Static Methods Are Stored

This is an important JavaScript detail.

Instance methods:

```js
class User {
  sayHello() {}
}
```

are placed on:

```js
User.prototype
```

Static methods:

```js
class User {
  static getType() {}
}
```

are properties of:

```js
User
```

Conceptually:

```text
User
 │
 └── getType()       ← static method
 │
 └── prototype
       │
       └── sayHello() ← instance method
```

This explains why:

```js
User.getType();
```

works while:

```js
user.getType();
```

does not.

---

# 6. Inspecting a Static Method

Example:

```js
class User {
  static getType() {
    return "User";
  }

  sayHello() {
    return "Hello.";
  }
}
```

Check the class:

```js
console.log(
  Object.hasOwn(User, "getType")
);
```

Output:

```text
true
```

Check the prototype:

```js
console.log(
  Object.hasOwn(User.prototype, "sayHello")
);
```

Output:

```text
true
```

But:

```js
console.log(
  Object.hasOwn(User.prototype, "getType")
);
```

Output:

```text
false
```

This demonstrates the different locations.

---

# 7. Static Methods Do Not Automatically Have an Instance

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  static getType() {
    return "User";
  }
}
```

When you call:

```js
User.getType();
```

there is no particular:

```js
user
```

instance involved.

Therefore, a static method should not be designed as though it automatically has access to instance state.

---

# 8. Static Methods and `this`

Static methods can use `this`.

However, inside a static method, `this` refers to the class object involved in the call, not an instance.

Example:

```js
class User {
  static getType() {
    return this;
  }
}

console.log(User.getType() === User);
```

Output:

```text
true
```

Therefore:

```text
Inside instance method:
this → instance

Inside static method:
this → class
```

when called directly through the class.

---

# 9. Static Method Accessing Static Properties

Static methods can access static properties.

Example:

```js
class User {
  static type = "User";

  static getType() {
    return this.type;
  }
}

console.log(User.getType());
```

Output:

```text
User
```

Here:

```js
this.type
```

refers to:

```js
User.type
```

because `this` refers to the class in this call.

---

# 10. Static Properties

Static properties belong to the class itself.

Example:

```js
class User {
  static count = 0;

  constructor(name) {
    this.name = name;
    User.count++;
  }
}
```

Create instances:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

Now:

```js
console.log(User.count);
```

Output:

```text
2
```

The counter belongs to the class:

```js
User.count
```

not to each instance.

Static properties are useful when information should be shared at the class level.

---

# 11. Static Method Using a Static Property

A common pattern is:

```js
class User {
  static count = 0;

  constructor(name) {
    this.name = name;
    User.count++;
  }

  static getCount() {
    return User.count;
  }
}
```

Create instances:

```js
new User("Osama Abu Motlaq");
new User("Osama Abu Motlaq");
new User("Osama Abu Motlaq");
```

Then:

```js
console.log(User.getCount());
```

Output:

```text
3
```

The method:

```js
getCount()
```

belongs to the class because it operates on class-level state.

---

# 12. Static Factory Methods

One of the most useful applications of static methods is a **factory method**.

A factory method creates and returns instances.

Example:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  static createDeveloper(name) {
    return new User(
      name,
      "Frontend Developer"
    );
  }
}
```

Use:

```js
const user = User.createDeveloper(
  "Osama Abu Motlaq"
);
```

The result is a normal `User` instance.

```js
console.log(user.name);
console.log(user.role);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

This is called a factory method because it provides a convenient way to create objects.

---

# 13. Why a Factory Method Can Be Useful

Without a factory method:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

With a factory:

```js
const user = User.createDeveloper(
  "Osama Abu Motlaq"
);
```

The second version can hide construction details.

For example, if creating a developer always requires:

```text
role
default permissions
default settings
default configuration
```

the factory can centralize that logic.

---

# 14. Static Methods as Named Constructors

JavaScript does not have multiple constructors with different names like some languages.

You cannot define:

```js
constructor()
constructor()
```

multiple times and expect overloads.

Instead, static factory methods can provide named creation paths:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  static createDeveloper(name) {
    return new User(
      name,
      "Frontend Developer"
    );
  }

  static createAdmin(name) {
    return new User(
      name,
      "Administrator"
    );
  }
}
```

Now:

```js
const developer = User.createDeveloper(
  "Osama Abu Motlaq"
);

const admin = User.createAdmin(
  "Osama Abu Motlaq"
);
```

This can make object creation more expressive.

---

# 15. Static Methods and Validation

Static methods can also validate or transform data related to the class.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  static isValidName(name) {
    return (
      typeof name === "string" &&
      name.trim().length > 0
    );
  }
}
```

Use:

```js
console.log(
  User.isValidName("Osama Abu Motlaq")
);
```

Output:

```text
true
```

This does not require an existing user.

Therefore, it can reasonably belong to the class.

---

# 16. Static Methods and Conversion

A static method can transform external data into a class instance.

Example:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  static fromJSON(data) {
    return new User(
      data.name,
      data.role
    );
  }
}
```

Given:

```js
const data = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};
```

Create the instance:

```js
const user = User.fromJSON(data);
```

Now:

```js
console.log(user instanceof User);
```

Output:

```text
true
```

This pattern is useful when converting API or database data into domain objects.

---

# 17. Static Methods and `this` vs Class Name

Consider:

```js
class User {
  static type = "User";

  static getType() {
    return this.type;
  }
}
```

You could write:

```js
return User.type;
```

instead.

Both can work.

Using:

```js
this.type
```

can be more flexible with inheritance because `this` can refer to the subclass when the static method is inherited and called through that subclass.

This becomes important with static inheritance.

---

# 18. Static Method Inheritance

Static methods can be inherited.

Example:

```js
class User {
  static getType() {
    return "User";
  }
}

class Developer extends User {}
```

Now:

```js
console.log(
  Developer.getType()
);
```

Output:

```text
User
```

Why?

Because the class itself has a prototype relationship:

```text
Developer
    ↓
User
```

Static property/method lookup can therefore travel through the class inheritance chain.

---

# 19. Static Method Overriding

A subclass can define its own static method with the same name.

```js
class User {
  static getType() {
    return "User";
  }
}

class Developer extends User {
  static getType() {
    return "Developer";
  }
}
```

Now:

```js
console.log(User.getType());
console.log(Developer.getType());
```

Output:

```text
User
Developer
```

The subclass version overrides the inherited static method for the subclass.

---

# 20. Calling a Parent Static Method With `super`

A subclass can call the parent's static method using:

```js
super
```

Example:

```js
class User {
  static getType() {
    return "User";
  }
}

class Developer extends User {
  static getType() {
    return `${super.getType()} → Developer`;
  }
}
```

Now:

```js
console.log(
  Developer.getType()
);
```

Output:

```text
User → Developer
```

The expression:

```js
super.getType()
```

accesses the inherited static method.

---

# 21. Static Methods vs Instance State

This distinction is critical.

Suppose:

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

`introduce()` needs:

```js
this.name
```

which belongs to one particular instance.

Therefore:

```js
user.introduce();
```

is appropriate.

A static method does not represent one particular user:

```js
User.someOperation();
```

Therefore, static methods should generally not depend on instance-specific data.

---

# 22. Static Method Calling an Instance Method

A static method can create an instance and then use its methods.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }

  static createAndIntroduce(name) {
    const user = new User(name);

    return user.introduce();
  }
}
```

Use:

```js
console.log(
  User.createAndIntroduce(
    "Osama Abu Motlaq"
  )
);
```

Output:

```text
My name is Osama Abu Motlaq.
```

The static method creates the instance explicitly.

There is no implicit instance.

---

# 23. Static Methods Are Not Automatically Available Through Instances

This does not work:

```js
class User {
  static create() {
    return new User();
  }
}

const user = new User();

user.create();
```

The method belongs to:

```js
User
```

not:

```js
user
```

Correct:

```js
User.create();
```

---

# 24. Static Fields and Mutable Shared State

Static state is shared at the class level.

Example:

```js
class User {
  static users = [];

  constructor(name) {
    this.name = name;
    User.users.push(this);
  }
}
```

Create users:

```js
new User("Osama Abu Motlaq");
new User("Osama Abu Motlaq");
```

Now:

```js
console.log(User.users.length);
```

Output:

```text
2
```

The array belongs to the class.

This means every instance indirectly interacts with the same array.

That may be useful, but shared mutable state should be designed carefully.

---

# 25. Static Method for Managing Shared State

The previous pattern can be encapsulated:

```js
class User {
  static users = [];

  constructor(name) {
    this.name = name;
    User.users.push(this);
  }

  static getAll() {
    return [...User.users];
  }
}
```

Now:

```js
new User("Osama Abu Motlaq");
new User("Osama Abu Motlaq");

const users = User.getAll();
```

The static method provides access to class-level data.

The spread:

```js
[...User.users]
```

returns a shallow copy instead of exposing the original array directly.

---

# 26. Static Methods and `instanceof`

Static methods themselves do not make an object an instance.

Example:

```js
class User {
  static create() {
    return new User();
  }
}

const user = User.create();
```

Now:

```js
console.log(user instanceof User);
```

Output:

```text
true
```

The reason is that:

```js
User.create()
```

returned:

```js
new User()
```

The static method itself does not create an instance relationship merely by existing.

---

# 27. Static Method Naming

Static methods should communicate what they do.

Good examples:

```js
User.create()
User.fromJSON()
User.isValid()
User.findById()
User.getType()
```

The exact naming depends on the class's responsibility.

Avoid vague names such as:

```js
User.doSomething()
User.process()
User.handle()
```

when a more precise name is possible.

---

# 28. Static Methods and Utility Classes

Some classes are designed almost entirely around static methods.

Example:

```js
class MathHelper {
  static double(value) {
    return value * 2;
  }

  static square(value) {
    return value ** 2;
  }
}
```

Use:

```js
console.log(MathHelper.double(5));
console.log(MathHelper.square(5));
```

Output:

```text
10
25
```

No instance is necessary.

However, in JavaScript, you should not automatically create a class just to group unrelated utility functions.

Sometimes plain functions are simpler:

```js
function double(value) {
  return value * 2;
}

function square(value) {
  return value ** 2;
}
```

Use a static method when the operation genuinely belongs to the class abstraction.

---

# 29. Static Methods vs Plain Functions

Consider:

```js
class User {
  static isValidName(name) {
    return (
      typeof name === "string" &&
      name.trim() !== ""
    );
  }
}
```

You could also write:

```js
function isValidUserName(name) {
  return (
    typeof name === "string" &&
    name.trim() !== ""
  );
}
```

Which is better?

It depends on the domain.

If the operation is conceptually part of the `User` abstraction:

```js
User.isValidName(...)
```

can communicate intent clearly.

If it is a general-purpose utility:

```js
isValidUserName(...)
```

may be simpler.

Do not use static methods merely because a class already exists.

---

# 30. Static Methods and Database Operations

In traditional OOP architectures, static methods can sometimes represent class-level data access:

```js
class User {
  static async findById(id) {
    // Query database
  }
}
```

Conceptually:

```js
const user = await User.findById(id);
```

There is no existing `user` instance because the operation is searching for one.

However, in modern JavaScript applications, database access is often better handled by:

* Service functions
* Repository modules
* ORM models
* Framework-specific server functions

So static methods are an option, not a universal rule.

---

# 31. Static Methods in JavaScript Built-ins

JavaScript itself uses static methods extensively.

For example:

```js
Array.isArray(value);
```

`isArray()` is static.

You do not write:

```js
const items = [];

items.isArray();
```

Instead:

```js
Array.isArray(items);
```

Another example:

```js
Object.keys(object);
```

`keys()` belongs to:

```js
Object
```

not to a particular object.

Also:

```js
Number.isNaN(value);
```

and:

```js
Promise.resolve(value);
```

are static methods.

These built-ins are excellent examples of the concept.

---

# 32. Static Factory Methods in Built-ins

JavaScript also provides static creation methods.

For example:

```js
Promise.resolve(value);
```

creates a Promise.

Similarly:

```js
Array.from(iterable);
```

creates an array from an iterable or array-like value.

These operations belong to the constructor/class-level object rather than to an existing instance.

---

# 33. Static Methods and Inheritance With `this`

Consider:

```js
class User {
  static create() {
    return new this();
  }
}

class Developer extends User {}
```

Now:

```js
const developer = Developer.create();
```

Because the static method is called as:

```js
Developer.create()
```

`this` inside the static method refers to:

```js
Developer
```

Therefore:

```js
new this()
```

becomes conceptually:

```js
new Developer()
```

This is a more advanced pattern and should be used intentionally.

---

# 34. `this` in Static Methods vs Instance Methods

Compare:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return this.name;
  }

  static getClassName() {
    return this.name;
  }
}
```

For:

```js
const user = new User(
  "Osama Abu Motlaq"
);
```

calling:

```js
user.introduce();
```

means:

```text
this → user
```

Calling:

```js
User.getClassName();
```

means:

```text
this → User
```

This is a crucial distinction.

---

# 35. Common Mistakes

## Mistake 1: Calling a static method on an instance

Incorrect:

```js
const user = new User();

user.getType();
```

Correct:

```js
User.getType();
```

---

## Mistake 2: Calling an instance method on the class

Incorrect:

```js
User.introduce();
```

if `introduce()` is defined as:

```js
introduce() {}
```

Correct:

```js
const user = new User();

user.introduce();
```

---

## Mistake 3: Expecting Instance State in a Static Method

This is conceptually wrong:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  static introduce() {
    return this.name;
  }
}
```

Here `this` refers to the class, not a specific user instance.

If the method needs a user's name, it should usually be an instance method.

---

## Mistake 4: Making Everything Static

Do not make methods static simply because you do not want to create an instance.

Ask:

> Does this behavior belong to the class or to an individual instance?

That determines the appropriate design.

---

# 36. Best Practices

### 1. Use static methods for class-level behavior

Use them when an operation does not require one particular instance.

### 2. Use factory methods when they improve object creation

Examples:

```js
User.createDeveloper()
User.fromJSON()
```

### 3. Use instance methods for instance behavior

If the operation depends on:

```js
this.name
this.items
this.status
```

an instance method is usually appropriate.

### 4. Be careful with static mutable state

For example:

```js
static users = [];
```

creates shared state.

Make sure that sharing is intentional.

### 5. Prefer plain functions for generic utilities

A static method should have a meaningful relationship to the class.

### 6. Understand `this`

In a static call:

```js
User.method();
```

`this` normally refers to `User`.

### 7. Avoid unnecessary class abstractions

JavaScript does not require everything to be represented as a class.

---

# 37. Quick Reference

### Define a static method

```js
class User {
  static getType() {
    return "User";
  }
}
```

### Call a static method

```js
User.getType();
```

### Define an instance method

```js
class User {
  getName() {
    return this.name;
  }
}
```

### Call an instance method

```js
const user = new User();

user.getName();
```

### Static property

```js
class User {
  static count = 0;
}
```

### Access static property

```js
User.count;
```

### Static factory

```js
class User {
  static create() {
    return new User();
  }
}
```

### Static inheritance

```js
class Developer extends User {}
```

A static method defined on `User` may be available through:

```js
Developer.method();
```

---

# 38. Static vs Instance Mental Model

Think of a class as having two levels:

```text
                    User
                     │
          ┌──────────┴──────────┐
          │                     │
      CLASS LEVEL          INSTANCE LEVEL
          │                     │
          ↓                     ↓
    static methods         instance methods
    static properties      instance properties
          │                     │
          ↓                     ↓
     User.method()          user.method()
```

Example:

```js
class User {
  static getType() {
    return "User";
  }

  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}
```

Usage:

```js
const user = new User("Osama Abu Motlaq");

User.getType();
user.introduce();
```

The first operation belongs to the class.

The second belongs to the instance.

---

# 39. The Prototype Model

The distinction becomes clearer when you visualize the JavaScript object model:

```text
                    User
                     │
          ┌──────────┴──────────┐
          │                     │
     static method          prototype
          │                     │
          ↓                     ↓
     User.getType()       sayHello()
                                ↑
                                │
                              user
```

More precisely:

```text
User
 ├── static methods
 ├── static properties
 └── prototype
       ├── constructor
       └── instance methods
```

An instance:

```text
user
 ├── own instance properties
 └── [[Prototype]]
        ↓
   User.prototype
```

This explains why static and instance methods are accessed differently.

---

# 40. React Relevance

Static methods are **not a major part of modern React development**.

Modern React primarily uses:

```js
function Component() {
  return <div>Hello</div>;
}
```

and hooks such as:

```js
useState()
useEffect()
useContext()
```

rather than class-based OOP.

However, static methods remain useful JavaScript knowledge because:

* JavaScript built-ins use static methods.
* Libraries may expose static APIs.
* Older React class components exist in legacy codebases.
* OOP concepts can appear in technical interviews.
* Understanding static vs instance behavior improves your understanding of classes.

For your React/Next.js path:

```text
Importance:
JavaScript fundamentals → High
React fundamentals → Low
Understanding libraries/APIs → Medium
Interviews → Medium
```

You should understand the concept clearly, but it does not deserve the same study time as React state, effects, props, rendering, or JavaScript functions.

---

# 41. Final Comparison

| Question                 | Instance Method   | Static Method                        |
| ------------------------ | ----------------- | ------------------------------------ |
| Belongs to               | Instance behavior | Class-level behavior                 |
| Syntax                   | `method() {}`     | `static method() {}`                 |
| Called with              | `user.method()`   | `User.method()`                      |
| Stored on                | `User.prototype`  | `User`                               |
| Requires an instance?    | Usually yes       | No                                   |
| Accesses instance state? | Yes               | No specific instance                 |
| `this`                   | Calling instance  | Calling class                        |
| Common use               | Object behavior   | Factory, validation, class utilities |
| Example                  | `user.login()`    | `User.fromJSON()`                    |

---

# 42. Key Takeaways

1. A static method belongs to the **class**, not an individual instance.

2. Define it with:

```js
static methodName() {}
```

3. Call it with:

```js
ClassName.methodName();
```

4. Instance methods are called with:

```js
instance.methodName();
```

5. Instance methods normally live on:

```js
ClassName.prototype
```

6. Static methods are properties of:

```js
ClassName
```

7. Inside a static method:

```js
this
```

normally refers to the class involved in the call.

8. Static methods are useful for:

```text
factories
validation
class-level utilities
class-level operations
```

9. Do not use static methods for behavior that depends on a particular instance.

10. JavaScript's built-in APIs provide many static-method examples:

```js
Array.isArray()
Object.keys()
Number.isNaN()
Promise.resolve()
Array.from()
```

The core mental model is:

```text
Instance behavior
        ↓
instance.method()

Class behavior
        ↓
Class.method()
```

The next topic:

**`10-inheritance.md`**

will explain how classes can inherit behavior from other classes using `extends` and `super`, how the prototype chain changes with inheritance, method overriding, constructor inheritance, and the difference between inheritance and composition.
