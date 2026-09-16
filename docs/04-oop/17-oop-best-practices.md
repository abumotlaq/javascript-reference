# OOP Best Practices

Object-Oriented Programming (OOP) in JavaScript is most effective when objects, classes, inheritance, encapsulation, and composition are used to make software easier to understand, maintain, test, and extend.

JavaScript gives you many ways to create object-oriented designs:

* Object literals
* Constructor functions
* Prototypes
* Classes
* Private fields
* Getters and setters
* Inheritance
* Composition
* Closures and modules

The goal is not to use every OOP feature.

The goal is to choose the simplest design that correctly represents the problem.

---

## 1. Start With the Problem, Not the OOP Feature

A common mistake is starting with:

> "I need a class."

Instead, start with:

> "What data and behavior does my application need?"

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

This may be enough.

You do not need:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

just because classes exist.

### General rule

Use OOP when it makes the design clearer.

Do not introduce OOP only because it is available.

---

# 2. Prefer Simplicity

Good OOP should reduce complexity, not create more of it.

### Over-engineered

```js
class UserManagerFactory {
  createUserManagerService() {
    return new UserManagerService();
  }
}

class UserManagerService {
  createUserRepository() {
    return new UserRepository();
  }
}
```

If the application only needs a simple function, this architecture may be unnecessary.

### Simpler

```js
function createUser(name, role) {
  return {
    name,
    role,
  };
}

const user = createUser("Osama Abu Motlaq", "Frontend Developer");
```

The second design is easier to understand because there is less unnecessary abstraction.

### Principle

> Prefer the simplest design that satisfies the requirements.

---

# 3. Use Objects When You Need Data

Objects are often the simplest representation of structured data.

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  experience: 2,
};
```

Objects work especially well when you mainly need to store data.

For example:

```js
const project = {
  title: "Portfolio",
  technology: "Next.js",
  completed: true,
};
```

You do not automatically need a class.

---

# 4. Use Classes When Instances Have Shared Behavior

Classes become useful when you have multiple objects that share behavior.

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  introduce() {
    return `I am ${this.name}, a ${this.role}.`;
  }
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);

console.log(user.introduce());
```

Here, multiple `User` instances can share the same `introduce()` method.

```js
const user1 = new User("Osama Abu Motlaq", "Frontend Developer");
const user2 = new User("Osama Abu Motlaq", "Full Stack Developer");
```

The behavior is defined once on `User.prototype`.

---

# 5. Keep Constructors Focused

A constructor should primarily initialize the object's state and establish its initial invariants.

Good:

```js
class User {
  constructor(name, role) {
    if (!name) {
      throw new Error("Name is required");
    }

    this.name = name;
    this.role = role;
  }
}
```

The constructor:

1. Receives input.
2. Validates important requirements.
3. Initializes the instance.

Avoid putting large workflows inside constructors.

### Avoid

```js
class User {
  constructor(name) {
    this.name = name;

    this.loadData();
    this.sendWelcomeEmail();
    this.saveToDatabase();
    this.generateReport();
  }
}
```

This makes object creation expensive and difficult to test.

A better design separates initialization from application workflows.

---

# 6. Keep Classes Focused

A class should have a clear responsibility.

### Bad design

```js
class User {
  constructor(name) {
    this.name = name;
  }

  saveToDatabase() {}

  sendEmail() {}

  generatePDF() {}

  resizeImage() {}

  calculateInvoice() {}

  renderDashboard() {}
}
```

This class is responsible for too many unrelated things.

### Better design

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class UserRepository {
  save(user) {}
}

class EmailService {
  sendWelcomeEmail(user) {}
}

class InvoiceService {
  calculate(user) {}
}
```

Each class has a clearer responsibility.

This follows the **Single Responsibility Principle (SRP)**.

---

# 7. Prefer Composition Over Deep Inheritance

Inheritance is useful, but deep inheritance hierarchies can become difficult to maintain.

For example:

```text
Entity
  ↓
User
  ↓
Developer
  ↓
FrontendDeveloper
  ↓
ReactDeveloper
```

Changes near the top can affect many subclasses.

Composition can often be more flexible.

```js
const developer = {
  name: "Osama Abu Motlaq",
  skills: ["JavaScript", "React", "Next.js"],
};

const developerWithLogging = {
  ...developer,
  log() {
    console.log(this.name);
  },
};
```

The object gains behavior without creating a long inheritance hierarchy.

### General rule

> Prefer composition when relationships are about capabilities or reusable behavior rather than strict specialization.

---

# 8. Use Inheritance for Genuine "Is-A" Relationships

Inheritance makes the most sense when the child truly represents a specialized version of the parent.

For example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    return `${this.name} logged in`;
  }
}

class Developer extends User {
  writeCode() {
    return `${this.name} is writing code`;
  }
}
```

A `Developer` is a type of `User`.

```js
const developer = new Developer("Osama Abu Motlaq");

console.log(developer.login());
console.log(developer.writeCode());
```

The relationship is conceptually meaningful.

Do not use inheritance simply to reuse a few lines of code.

---

# 9. Avoid Deep Inheritance Trees

Even when inheritance is valid, keep the hierarchy shallow when possible.

### Difficult

```text
A
↓
B
↓
C
↓
D
↓
E
↓
F
```

Understanding where a method comes from becomes increasingly difficult.

A developer may need to inspect several prototypes to understand one object's behavior.

### Better

```text
Base
↓
Specialized
```

or use composition:

```text
Object
├── logging behavior
├── validation behavior
└── persistence behavior
```

Shallow designs are generally easier to reason about.

---

# 10. Encapsulate Internal State

If an object's state should not be modified arbitrarily, protect it.

Modern JavaScript provides private fields.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(100);

console.log(account.getBalance());
```

External code cannot directly modify:

```js
account.#balance;
```

This produces an error.

Encapsulation protects the object's invariants.

---

# 11. Protect Invariants

An invariant is a condition that should remain true for an object.

For example:

```text
Account balance must never be negative.
```

Instead of allowing unrestricted mutation:

```js
account.balance = -500;
```

control the mutation:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit must be positive");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal must be positive");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient balance");
    }

    this.#balance -= amount;
  }
}
```

The class controls how its state changes.

This is one of the most practical reasons to use encapsulation.

---

# 12. Use Getters and Setters Carefully

Getters and setters are useful when property access needs controlled behavior.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  get displayName() {
    return this.name.trim();
  }

  set displayName(value) {
    if (!value.trim()) {
      throw new Error("Name cannot be empty");
    }

    this.name = value;
  }
}
```

Usage:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.displayName);

user.displayName = "Osama Abu Motlaq";
```

However, do not hide expensive operations behind getters.

Avoid:

```js
get users() {
  return fetchUsersFromDatabase();
}
```

A getter looks like simple property access, but database or network operations are not simple property access.

Prefer an explicit method:

```js
async getUsers() {
  return fetchUsersFromDatabase();
}
```

---

# 13. Methods Should Represent Behavior

Methods are useful when an object performs an action.

```js
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter(
      (currentItem) => currentItem !== item
    );
  }
}
```

The methods communicate intent:

```js
cart.addItem(product);
cart.removeItem(product);
```

This is clearer than exposing implementation details everywhere.

---

# 14. Avoid Excessive Public Mutation

If every part of the application can directly modify an object's internal state, the object becomes difficult to reason about.

### Less controlled

```js
user.name = "";
user.age = -100;
user.role = null;
```

### More controlled

```js
user.updateName("Osama Abu Motlaq");
user.updateAge(25);
user.changeRole("Frontend Developer");
```

The second approach allows the object to validate changes.

However, do not automatically hide every property.

For simple data structures, direct properties are often perfectly appropriate.

---

# 15. Do Not Turn Every Object Into a Class

This is one of the most important JavaScript OOP guidelines.

Not every object needs:

```js
class Something {}
```

For example:

```js
const config = {
  apiUrl: "/api",
  timeout: 5000,
};
```

A class would add unnecessary complexity.

Similarly:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

may be better than:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

The correct choice depends on behavior and requirements.

---

# 16. Avoid Creating Methods Inside Every Constructor

Consider:

```js
class User {
  constructor(name) {
    this.name = name;

    this.introduce = function () {
      return `I am ${this.name}.`;
    };
  }
}
```

Each instance receives a separate function.

```text
user1.introduce → function A
user2.introduce → function B
user3.introduce → function C
```

Normally, class methods should be defined on the prototype:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `I am ${this.name}.`;
  }
}
```

Now instances can share the method:

```text
user1 ─┐
user2 ─┼──→ User.prototype.introduce
user3 ─┘
```

This is the normal class design.

---

# 17. Use Arrow Function Fields Only When Their Semantics Are Needed

Arrow function fields create a function per instance:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce = () => {
    return `I am ${this.name}.`;
  };
}
```

The advantage is lexical `this`.

This can be useful when a method is frequently passed as a callback.

```js
button.addEventListener("click", user.introduce);
```

However, it also means every instance receives its own function.

Therefore:

> Use normal class methods by default. Use arrow function fields when lexical `this` is specifically useful.

---

# 18. Understand `this` Before Designing Methods

A large number of JavaScript OOP bugs are actually `this` bugs.

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `I am ${this.name}.`;
  }
}
```

This works:

```js
const user = new User("Osama Abu Motlaq");

user.introduce();
```

But extracting the method can lose the receiver:

```js
const introduce = user.introduce;

introduce();
```

The method is no longer called as:

```js
user.introduce();
```

Use `bind()` when necessary:

```js
const introduce = user.introduce.bind(user);

introduce();
```

Understanding call-site-based `this` is essential for JavaScript OOP.

---

# 19. Do Not Use `bind()` Everywhere

Binding is useful, but unnecessary binding can make code harder to understand.

If a method is always called through its object:

```js
user.introduce();
```

there is no need to bind it.

Use `bind()` when the method is passed independently and still needs its original object context.

---

# 20. Prefer Explicit APIs

A good object exposes a small, understandable public API.

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {}

  withdraw(amount) {}

  getBalance() {}
}
```

The consumer does not need to know how the balance is stored.

The public API is:

```text
deposit()
withdraw()
getBalance()
```

The implementation can change internally without requiring every consumer to change.

This is abstraction.

---

# 21. Avoid Leaking Implementation Details

Suppose an object internally stores:

```js
this.items = [];
```

If consumers depend heavily on the exact structure:

```js
cart.items[0].quantity++;
```

then changing the internal representation becomes difficult.

Instead, expose meaningful operations:

```js
cart.increaseQuantity(productId);
```

The implementation can later change without changing every consumer.

Good APIs protect implementation flexibility.

---

# 22. Prefer Dependency Injection for External Dependencies

Instead of hard-coding dependencies inside a class:

```js
class UserService {
  constructor() {
    this.database = new Database();
  }
}
```

you can inject the dependency:

```js
class UserService {
  constructor(database) {
    this.database = database;
  }
}
```

Then:

```js
const database = new Database();

const service = new UserService(database);
```

This makes the class easier to:

* Test
* Replace
* Reuse
* Configure

For example, a test could provide a fake database.

```js
const fakeDatabase = {
  save() {
    return true;
  },
};

const service = new UserService(fakeDatabase);
```

This is an important connection between OOP, composition, and testability.

---

# 23. Favor Composition for Dependencies

Instead of:

```js
class UserService extends Database {}
```

which incorrectly suggests:

```text
UserService IS-A Database
```

use:

```js
class UserService {
  constructor(database) {
    this.database = database;
  }
}
```

Now the relationship is:

```text
UserService HAS-A Database
```

or more accurately:

```text
UserService USES-A Database
```

This is usually a better model.

---

# 24. Use Polymorphism to Reduce Conditional Logic

Suppose different notification systems have the same behavior:

```js
class EmailNotification {
  send(message) {
    console.log(`Email: ${message}`);
  }
}

class SmsNotification {
  send(message) {
    console.log(`SMS: ${message}`);
  }
}
```

A function can work with either:

```js
function notify(notification, message) {
  notification.send(message);
}
```

Now:

```js
notify(
  new EmailNotification(),
  "Hello from Osama Abu Motlaq"
);

notify(
  new SmsNotification(),
  "Hello from Osama Abu Motlaq"
);
```

The caller only needs to know that the object provides:

```js
send()
```

This is polymorphism.

JavaScript does not require a formal interface declaration for this style.

---

# 25. Avoid Giant Conditional Type Checks

This pattern can become difficult to maintain:

```js
function notify(type, message) {
  if (type === "email") {
    // ...
  } else if (type === "sms") {
    // ...
  } else if (type === "push") {
    // ...
  }
}
```

Polymorphism can move the behavior into separate objects:

```js
class EmailNotification {
  send(message) {}
}

class SmsNotification {
  send(message) {}
}

class PushNotification {
  send(message) {}
}
```

Then:

```js
function notify(notification, message) {
  notification.send(message);
}
```

Adding another implementation does not require changing the central function.

This is especially useful when behavior varies significantly between implementations.

---

# 26. Do Not Force Inheritance for Polymorphism

Polymorphism does not require inheritance.

Plain objects can participate:

```js
const emailNotification = {
  send(message) {
    console.log(`Email: ${message}`);
  },
};

const smsNotification = {
  send(message) {
    console.log(`SMS: ${message}`);
  },
};

function notify(notification, message) {
  notification.send(message);
}
```

This is valid JavaScript polymorphism through duck typing.

The requirement is behavioral compatibility, not necessarily shared ancestry.

---

# 27. Keep Abstractions Honest

An abstraction should hide unnecessary implementation details without hiding important behavior.

Good:

```js
user.login();
```

The caller does not need to know every internal authentication step.

Bad abstraction:

```js
user.doSomething();
```

The name does not communicate what the operation actually does.

Good abstractions have meaningful names and predictable behavior.

---

# 28. Avoid Abstraction for Abstraction's Sake

Too many layers can make simple software difficult to understand.

For example:

```text
Component
 ↓
Controller
 ↓
Service
 ↓
Manager
 ↓
Factory
 ↓
Repository
 ↓
Adapter
 ↓
Database
```

Some applications genuinely need layers like these.

But adding them without a real problem creates unnecessary complexity.

Before adding an abstraction, ask:

1. What problem does this solve?
2. Will this code have multiple implementations?
3. Does it reduce duplication?
4. Does it improve testing?
5. Does it make the public API clearer?
6. Will the abstraction remain stable?

If the answer is mostly "no", the abstraction may not be necessary.

---

# 29. Use Meaningful Names

Names are part of object design.

Weak:

```js
class DataManager {}
```

Better:

```js
class UserRepository {}
```

Weak:

```js
object.process();
```

Better:

```js
order.calculateTotal();
```

Good names communicate:

* Responsibility
* Intent
* Domain meaning

Clear naming reduces the need for comments.

---

# 30. Avoid Generic "Manager" and "Helper" Classes

Names such as:

```text
DataManager
AppManager
UserManager
Helper
Utils
CommonService
```

often indicate that a class has accumulated unrelated responsibilities.

Instead, identify the actual responsibility.

For example:

```js
class UserRepository {}
class EmailService {}
class InvoiceCalculator {}
class AuthenticationService {}
```

Specific names encourage focused designs.

---

# 31. Keep Methods Small and Focused

A method should ideally perform one coherent operation.

Avoid:

```js
class UserService {
  processUser(user) {
    // validate
    // transform
    // save
    // send email
    // generate report
    // log
  }
}
```

Separate responsibilities when they genuinely represent different concerns.

For example:

```js
validateUser(user);
saveUser(user);
sendWelcomeEmail(user);
```

Small methods are easier to:

* Understand
* Test
* Reuse
* Debug

---

# 32. Avoid Hidden Side Effects

Methods should have predictable effects.

For example:

```js
class User {
  get displayName() {
    this.sendAnalyticsEvent();
    return this.name;
  }
}
```

This is surprising.

Reading a property should normally not unexpectedly trigger external behavior.

Prefer:

```js
user.recordDisplayNameAccess();
```

when an action is intentionally performed.

Explicit behavior is easier to reason about.

---

# 33. Keep State Local

Objects should own the state they are responsible for.

For example:

```js
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }
}
```

The cart owns its items.

Avoid creating unrelated global mutable state:

```js
let globalCartItems = [];
```

Global mutable state makes dependencies harder to track and testing harder.

---

# 34. Be Careful With Shared Mutable State

Static properties and prototype objects can accidentally become shared mutable state.

For example:

```js
class User {
  static users = [];
}
```

Every user-related operation interacts with the same array.

This may be intentional, but shared state should be deliberate.

Similarly, avoid accidentally sharing mutable instance data:

```js
class User {
  constructor() {
    this.settings = sharedSettings;
  }
}
```

Now multiple objects may modify the same object.

Prefer creating independent state when each instance should own it:

```js
class User {
  constructor() {
    this.settings = {};
  }
}
```

---

# 35. Prefer Immutability When It Improves Predictability

JavaScript allows direct mutation:

```js
user.name = "Osama Abu Motlaq";
```

Mutation is not automatically bad.

However, immutable updates can make state changes easier to reason about.

```js
const updatedUser = {
  ...user,
  name: "Osama Abu Motlaq",
};
```

This distinction becomes particularly important in React.

React commonly relies on creating new object/array references when updating state.

---

# 36. Understand Object Identity

Objects are reference values.

```js
const user1 = {
  name: "Osama Abu Motlaq",
};

const user2 = user1;

user2.name = "Osama Abu Motlaq";

console.log(user1.name);
```

Both variables refer to the same object.

This matters when designing classes, copying objects, managing state, and working with React.

Do not confuse:

```text
same structure
```

with:

```text
same object
```

---

# 37. Do Not Mutate Objects Unexpectedly

If a function receives an object:

```js
function updateUser(user) {
  user.name = "Osama Abu Motlaq";
}
```

the original object is modified.

Sometimes that is exactly what you want.

Sometimes it creates hidden coupling.

An alternative is:

```js
function updateUser(user) {
  return {
    ...user,
    name: "Osama Abu Motlaq",
  };
}
```

Now the function returns a new object.

The right choice depends on the surrounding architecture.

The important principle is:

> Make mutation intentional and predictable.

---

# 38. Do Not Overuse Private Fields

Private fields are powerful:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

But not every property needs to be private.

If consumers legitimately need to read public data:

```js
user.name
```

making it private and creating:

```js
user.getName()
```

may add unnecessary ceremony.

Use private state when it protects invariants, hides implementation details, or prevents invalid external manipulation.

---

# 39. Use Methods for Actions and Properties for Data

This is a useful API design guideline.

Data:

```js
user.name
user.email
user.role
```

Actions:

```js
user.login()
user.logout()
user.changePassword()
```

Derived value:

```js
user.fullName
```

can reasonably be represented as a getter:

```js
get fullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

The API should communicate whether something represents a value or an action.

---

# 40. Avoid Async Work in Constructors

JavaScript constructors cannot be declared `async`.

Do not try to make object construction depend on asynchronous work.

Avoid designs like:

```js
class User {
  constructor() {
    // Cannot await database work here.
  }
}
```

Instead, use an explicit asynchronous method:

```js
class UserService {
  async loadUser() {
    // asynchronous work
  }
}
```

Or use a factory function when asynchronous creation is genuinely part of the design:

```js
async function createUser() {
  const data = await loadUserData();

  return new User(data);
}
```

This makes asynchronous behavior explicit.

---

# 41. Use Factories When Creation Is Complex

A factory function can hide complicated creation logic.

```js
function createDeveloper(name) {
  return {
    name,
    role: "Developer",
    skills: ["JavaScript", "React", "Next.js"],
  };
}
```

Usage:

```js
const developer = createDeveloper("Osama Abu Motlaq");
```

Factories are especially useful when:

* Creation requires conditions.
* Different configurations are possible.
* You want to hide construction details.
* You do not need a formal class hierarchy.

Do not create a factory simply because the word "factory" sounds architectural.

---

# 42. Use Static Methods for Class-Level Operations

Static methods are appropriate when behavior belongs to the class rather than an individual instance.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  static isValidName(name) {
    return typeof name === "string" && name.trim().length > 0;
  }
}
```

Usage:

```js
User.isValidName("Osama Abu Motlaq");
```

Not:

```js
const user = new User("Osama Abu Motlaq");

user.isValidName();
```

Use static methods when the operation does not require an instance's state.

---

# 43. Avoid Utility-Class Obsession

Some developers put unrelated functions into a class:

```js
class Utils {
  static formatDate() {}
  static calculateTotal() {}
  static validateEmail() {}
  static convertCurrency() {}
}
```

This is often unnecessary in JavaScript.

Functions can simply be exported:

```js
export function formatDate() {}

export function calculateTotal() {}

export function validateEmail() {}
```

JavaScript modules already provide a strong organizational mechanism.

You do not need a class just to group functions.

---

# 44. Prefer Modules for Encapsulation When Appropriate

JavaScript modules can hide implementation details.

```js
const secret = "internal value";

export function getValue() {
  return secret;
}
```

Consumers can access:

```js
getValue();
```

but cannot directly access the module's internal `secret`.

This provides a form of encapsulation without using a class.

Therefore:

> Encapsulation is a design principle, not a class-only feature.

---

# 45. Use OOP Together With Functional Techniques

JavaScript is multi-paradigm.

You can combine:

* Objects
* Classes
* Functions
* Closures
* Higher-order functions
* Modules
* Composition

For example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const users = [
  new User("Osama Abu Motlaq"),
];

const names = users.map((user) => user.getName());

console.log(names);
```

The class provides object-oriented structure.

`map()` provides functional behavior.

There is no requirement to choose only one paradigm.

---

# 46. Understand That JavaScript Is Prototype-Based

JavaScript classes do not replace the prototype system.

This:

```js
class User {
  introduce() {
    return "Hello";
  }
}
```

still results in the method being associated with:

```js
User.prototype
```

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

Understanding prototypes helps explain:

* `class`
* `extends`
* `super`
* `instanceof`
* Method sharing
* Inheritance
* Property lookup

Do not learn classes as if JavaScript were simply Java or C++.

---

# 47. Prefer Composition Over Inheritance in React

Modern React is primarily based on:

* Function components
* Props
* State
* Hooks
* Composition

Not class inheritance.

For example:

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

Another component can compose it:

```jsx
function Profile() {
  return (
    <Card>
      <h2>Osama Abu Motlaq</h2>
      <p>Frontend Developer</p>
    </Card>
  );
}
```

The components are composed rather than inherited.

This is one reason understanding composition is more practically valuable for modern React than building large class hierarchies.

---

# 48. React Components Have Encapsulated State

Modern React provides a practical form of state encapsulation.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

The component owns its state.

Other components interact with it through its public interface:

```jsx
<Counter />
```

rather than directly modifying:

```js
count
```

The implementation details remain inside the component.

---

# 49. React Props Are Part of a Component's Public API

Consider:

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

The component's public interface is:

```jsx
<UserCard
  name="Osama Abu Motlaq"
  role="Frontend Developer"
/>
```

The internal rendering implementation can change without changing how consumers provide the props.

This is closely related to abstraction and encapsulation.

---

# 50. Custom Hooks Are Powerful Abstractions

Modern React often uses custom hooks instead of classes for reusable behavior.

```js
function useUser() {
  // reusable state and logic
}
```

A component can consume:

```js
const user = useUser();
```

The component does not need to know every internal implementation detail.

This is a practical example of abstraction through composition and functions.

---

# 51. OOP in Next.js and Full-Stack JavaScript

Next.js applications can use OOP, but you should not force everything into classes.

For example, a service could be represented as:

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUser(id) {
    return this.repository.findById(id);
  }
}
```

But a module function may be simpler:

```js
export async function getUser(id) {
  return repository.findById(id);
}
```

Both are valid.

Choose based on:

* State
* Reusability
* Dependencies
* Testing requirements
* Complexity
* Domain behavior

For many Next.js applications, modules and functions are sufficient.

---

# 52. Do Not Confuse OOP Knowledge With OOP Usage

You can benefit from understanding OOP without writing class-heavy applications.

Knowing:

```text
objects
prototypes
classes
this
inheritance
encapsulation
polymorphism
abstraction
composition
```

helps you understand JavaScript itself and existing codebases.

But your application may still mostly use:

```text
functions
components
hooks
modules
objects
```

This is completely normal in modern JavaScript development.

---

# 53. Test Behavior, Not Implementation Details

Suppose:

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

A test should primarily care that:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.getName());
```

returns the expected value.

It should not depend unnecessarily on whether the internal implementation uses:

```js
#name
```

or another internal representation.

Tests should focus on the public behavior when possible.

---

# 54. Design for Change, Not for Imaginary Future Requirements

A common mistake is building extremely flexible architecture before the application needs it.

For example:

```text
Interface
 ↓
Abstract Factory
 ↓
Factory
 ↓
Strategy
 ↓
Adapter
 ↓
Repository
```

may be justified in a complex system.

But for a small application, it may create more complexity than value.

A good design anticipates reasonable change without trying to predict every possible future requirement.

---

# 55. Avoid Premature Design Patterns

Design patterns are tools, not mandatory architecture.

Useful patterns include:

* Factory
* Strategy
* Adapter
* Observer
* Dependency Injection
* Repository
* Composition

But do not start a project by asking:

> "Which design patterns can I use?"

Start with:

> "What problem do I need to solve?"

Then choose a pattern if it solves a real problem.

---

# 56. Favor Loose Coupling

Loose coupling means one part of the system does not depend heavily on the internal implementation of another.

For example:

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }
}
```

The service depends on the repository's behavior, not necessarily its concrete implementation.

You could provide:

```js
const productionRepository = {
  findById(id) {
    // database access
  },
};
```

or:

```js
const testRepository = {
  findById(id) {
    return { id, name: "Osama Abu Motlaq" };
  },
};
```

The service can work with either.

---

# 57. Favor High Cohesion

High cohesion means the responsibilities inside a module or class belong together.

Good:

```js
class InvoiceCalculator {
  calculateSubtotal(items) {}
  calculateTax(subtotal) {}
  calculateTotal(subtotal, tax) {}
}
```

These operations belong to the same domain responsibility.

Less cohesive:

```js
class InvoiceCalculator {
  calculateTotal() {}
  sendEmail() {}
  resizeImage() {}
  authenticateUser() {}
}
```

The responsibilities are unrelated.

High cohesion makes software easier to understand and change.

---

# 58. Avoid Circular Dependencies

A problematic design can look like:

```text
UserService
    ↓
OrderService
    ↓
UserService
```

Circular dependencies can make modules difficult to initialize, test, and reason about.

Good architecture keeps dependencies flowing in clear directions.

Composition and dependency injection can help avoid tightly coupled modules.

---

# 59. Use Errors Deliberately

Objects should reject invalid operations when necessary.

```js
class BankAccount {
  #balance = 0;

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient balance");
    }

    this.#balance -= amount;
  }
}
```

Do not silently create invalid state:

```js
withdraw(amount) {
  this.#balance -= amount;
}
```

if negative balances are forbidden.

Errors are part of the object's contract.

---

# 60. Keep Public APIs Small

A smaller API is usually easier to maintain.

Instead of exposing:

```js
user.setName();
user.setEmail();
user.setRole();
user.setStatus();
user.setInternalId();
user.setRawData();
user.resetEverything();
user.modifyInternalState();
```

consider which operations consumers genuinely need.

A smaller public interface means fewer ways for external code to depend on implementation details.

---

# 61. Prefer Explicit Dependencies

This is harder to maintain:

```js
class UserService {
  save(user) {
    globalDatabase.save(user);
  }
}
```

The dependency is hidden.

Prefer:

```js
class UserService {
  constructor(database) {
    this.database = database;
  }

  save(user) {
    this.database.save(user);
  }
}
```

Now the dependency is visible.

This improves testing and makes the class easier to understand.

---

# 62. Keep Side Effects Near the Application Boundaries

Business logic should ideally be separated from external effects when practical.

For example:

```text
UI
 ↓
Application logic
 ↓
Domain logic
 ↓
Database / API
```

This separation makes pure logic easier to test.

For example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

This function does not need a database or browser.

It can be tested independently.

---

# 63. Use Pure Functions When OOP Does Not Add Value

Not every piece of logic needs an object.

For example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

A class would add unnecessary state and structure.

Use functions for stateless transformations when they are the clearest solution.

---

# 64. Combine OOP and Functional Design Intentionally

A realistic JavaScript application may look like:

```text
Classes
    ↓
domain behavior

Functions
    ↓
transformations

Modules
    ↓
organization and encapsulation

Objects
    ↓
data

Composition
    ↓
assembly of behavior
```

This is often more natural than forcing the entire application into one programming paradigm.

---

# 65. Common OOP Mistakes

## Mistake 1: Creating a class for everything

```js
class StringHelper {}
```

when a function would be simpler.

---

## Mistake 2: Deep inheritance

```text
A → B → C → D → E
```

This increases coupling.

---

## Mistake 3: Giant classes

One class handles:

```text
database
authentication
email
validation
UI
logging
payments
```

This violates separation of concerns.

---

## Mistake 4: Misusing inheritance for code reuse

Do not inherit just because you want to reuse a method.

Use composition when the relationship is not truly "is-a".

---

## Mistake 5: Ignoring `this`

Methods can fail when extracted:

```js
const method = object.method;
```

Understand how `this` is determined.

---

## Mistake 6: Hiding expensive work behind getters

Avoid:

```js
get data() {
  return fetchData();
}
```

Use an explicit asynchronous method.

---

## Mistake 7: Overusing private fields

Privacy should solve a real design problem.

---

## Mistake 8: Excessive abstraction

More classes do not automatically mean better architecture.

---

## Mistake 9: Utility-class obsession

JavaScript modules and functions often provide a cleaner alternative.

---

## Mistake 10: Premature design patterns

Do not introduce patterns before there is a problem to solve.

---

# 66. A Practical Decision Process

When designing a piece of JavaScript, ask these questions.

### Question 1: Is this primarily data?

Consider:

```js
const user = {};
```

---

### Question 2: Does this data have shared behavior?

Consider a class:

```js
class User {}
```

---

### Question 3: Does the object need protected internal state?

Consider:

```js
#privateField
```

---

### Question 4: Is the relationship truly "is-a"?

Consider:

```js
extends
```

---

### Question 5: Is the relationship "has-a" or "uses-a"?

Prefer:

```js
composition
```

---

### Question 6: Does behavior vary between implementations?

Consider:

```js
polymorphism
```

---

### Question 7: Does creation involve meaningful complexity?

Consider:

```js
factory
```

---

### Question 8: Is there no state and no object identity?

A function may be enough.

```js
function calculateTotal(items) {}
```

---

# 67. OOP Design Checklist

Before creating a class, ask:

* Does this class represent a meaningful concept?
* Does it have a clear responsibility?
* Does it need instance state?
* Does it have behavior associated with that state?
* Should that state be public or private?
* Are the constructor responsibilities focused?
* Are methods small and coherent?
* Am I accidentally creating shared mutable state?
* Does inheritance represent a genuine "is-a" relationship?
* Would composition be simpler?
* Are dependencies explicit?
* Is the public API small?
* Are expensive operations explicit?
* Am I introducing unnecessary abstraction?
* Could a function or object literal solve the problem more simply?

---

# 68. OOP Principles Worth Remembering

The following principles are particularly useful.

## Single Responsibility Principle

A class or module should have a focused responsibility.

```text
One coherent reason to change.
```

---

## Encapsulation

Control access to internal state.

```js
#balance
```

---

## Abstraction

Expose useful behavior while hiding unnecessary implementation details.

```js
user.login();
```

---

## Polymorphism

Allow different implementations to be used through a common expected behavior.

```js
notification.send();
```

---

## Composition

Build behavior by combining smaller pieces.

```text
Object
 ├── validation
 ├── logging
 └── persistence
```

---

# 69. The Most Important Principle: Favor Clarity

The best OOP design is not the one containing the most classes.

It is the one that makes the code easiest to understand.

Compare:

```js
const total = calculateTotal(items);
```

with:

```js
const calculatorFactory = new CalculatorFactory();

const calculator = calculatorFactory
  .createInvoiceCalculator();

const invoiceService = new InvoiceService(calculator);

const total = invoiceService
  .calculateTotal(items);
```

The second architecture might be justified in a large system.

But if the application only needs a calculation, the first version is better.

### The principle

> Use abstraction, encapsulation, inheritance, polymorphism, and composition when they solve real problems—not because they are OOP features.

---

# 70. OOP in Modern JavaScript

Modern JavaScript is not exclusively object-oriented.

A professional JavaScript developer should be comfortable with:

```text
Objects
Functions
Modules
Closures
Promises
Classes
Prototypes
Composition
Functional techniques
```

The strongest developers choose between these tools based on the problem.

They do not force every problem into classes.

---

# 71. OOP Relevance to React

For modern React development, OOP is useful but should not be your primary architectural focus.

### Important for JavaScript fundamentals

```text
Objects
this
Prototypes
Classes
Closures
Composition
Polymorphism
Encapsulation
```

### More directly important for modern React

```text
Functions
Components
Props
State
Hooks
Context
Events
Forms
Effects
Rendering
Composition
Async JavaScript
Modules
Immutability
```

Modern React primarily uses function components and hooks rather than class inheritance.

However, OOP knowledge still helps you:

* Understand JavaScript deeply.
* Read existing codebases.
* Understand libraries.
* Understand prototypes.
* Understand `this`.
* Handle technical interviews.
* Work with Node.js and backend libraries.
* Maintain older React class components.

Therefore:

> Learn OOP well enough to understand JavaScript's object model and common software design principles, but do not let OOP dominate your React learning roadmap.

---

# 72. OOP Relevance to Next.js and Full-Stack JavaScript

OOP can appear in:

```text
Services
Repositories
Domain models
SDKs
Libraries
Backend systems
Database abstractions
Third-party packages
```

But Next.js applications can also be built primarily with:

```text
Functions
Modules
Server Components
Route Handlers
Server Actions
React components
Custom hooks
```

There is no requirement to build a Next.js application with classes.

The important skill is knowing when each approach is appropriate.

---

# 73. A Strong JavaScript Mental Model

Think of JavaScript OOP as a set of tools:

```text
Object
  ↓
Data + behavior

Prototype
  ↓
Shared behavior + inheritance mechanism

Class
  ↓
Cleaner syntax over prototype-based behavior

Encapsulation
  ↓
Control internal state

Abstraction
  ↓
Hide unnecessary implementation details

Polymorphism
  ↓
Different implementations, common behavior

Composition
  ↓
Combine smaller pieces

Inheritance
  ↓
Specialize an existing relationship
```

And remember:

```text
JavaScript is prototype-based.
Classes are syntax built on that model.
```

---

# 74. OOP Quick Reference

| Concept              | Main Purpose                                  |
| -------------------- | --------------------------------------------- |
| Object               | Represent data and behavior                   |
| Property             | Store object state                            |
| Method               | Define object behavior                        |
| `this`               | Refer to the relevant receiver/context        |
| Constructor          | Initialize instances                          |
| Prototype            | Share behavior and support inheritance        |
| Class                | Convenient syntax for prototype-based objects |
| Static method        | Class-level behavior                          |
| Private field        | Hide internal state                           |
| Getter               | Controlled value access                       |
| Setter               | Controlled value assignment                   |
| Inheritance          | Model specialization                          |
| Polymorphism         | Common interface, different behavior          |
| Encapsulation        | Control access to state/behavior              |
| Abstraction          | Hide unnecessary implementation details       |
| Composition          | Combine independent pieces                    |
| Dependency Injection | Supply dependencies from outside              |
| Factory              | Encapsulate object creation                   |

---

# 75. OOP Decision Tree

```text
Do I need an object?
        │
        ├── No → Use a function/module
        │
        └── Yes
             │
             ├── Mostly data → Object
             │
             └── Data + shared behavior
                    │
                    ├── Simple → Object + functions
                    │
                    └── Stateful instances → Class
                                      │
                                      ├── Need private state?
                                      │       └── Use #private
                                      │
                                      ├── Need specialization?
                                      │       └── Consider inheritance
                                      │
                                      └── Need reusable capabilities?
                                              └── Prefer composition
```

---

# 76. Final Takeaways

1. **Do not create classes automatically.**
2. **Start with the problem and requirements.**
3. **Use objects for simple structured data.**
4. **Use classes when multiple instances share meaningful behavior and state.**
5. **Keep constructors focused.**
6. **Keep classes cohesive and responsibility-driven.**
7. **Understand `this` before relying heavily on instance methods.**
8. **Use private fields when protecting internal state provides real value.**
9. **Use getters and setters for controlled value access, not hidden expensive operations.**
10. **Prefer composition when relationships are "has-a" or "uses-a".**
11. **Use inheritance for genuine "is-a" relationships.**
12. **Avoid deep inheritance hierarchies.**
13. **Use polymorphism to work with different implementations through common behavior.**
14. **Do not assume polymorphism requires inheritance.**
15. **Make dependencies explicit when possible.**
16. **Use dependency injection to reduce coupling and improve testability.**
17. **Do not turn every utility function into a class.**
18. **Use modules for organization and encapsulation when classes are unnecessary.**
19. **Avoid premature abstraction and premature design patterns.**
20. **Prefer clear, predictable APIs.**
21. **Make mutation intentional.**
22. **Keep side effects explicit.**
23. **Use functions when OOP adds no meaningful value.**
24. **Combine OOP and functional techniques when appropriate.**
25. **Remember that JavaScript is prototype-based.**
26. **Classes are built on JavaScript's prototype system.**
27. **Modern React favors functions, hooks, and composition rather than class inheritance.**
28. **OOP is important for understanding JavaScript, but it should not dominate a modern React/Next.js learning roadmap.**

---

## The Core Principle

Good OOP is not about writing more classes.

It is about designing software where:

```text
Responsibilities are clear
        ↓
State is controlled
        ↓
Dependencies are understandable
        ↓
Behavior is reusable
        ↓
Implementation details are hidden when appropriate
        ↓
Components remain loosely coupled
        ↓
The code stays easy to change
```

The most valuable OOP skill is therefore not memorizing syntax.

It is learning **how to model responsibilities and relationships clearly**.

---

## End of OOP Section

You have now covered the major JavaScript OOP concepts:

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
   ↓
Static Methods
   ↓
Inheritance
   ↓
Private Fields
   ↓
Getters & Setters
   ↓
Polymorphism
   ↓
Encapsulation
   ↓
Abstraction
   ↓
Composition
   ↓
OOP Best Practices
```

This completes the core `04-OOP` learning path.
