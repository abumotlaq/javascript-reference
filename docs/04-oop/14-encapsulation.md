# Encapsulation in JavaScript

Encapsulation is one of the fundamental concepts of Object-Oriented Programming (OOP).

The main idea is:

> **Keep an object's internal state and implementation details controlled, while exposing a clear public interface.**

In simple terms:

```text
Internal implementation
        ↓
     protected
        ↓
Public interface
        ↓
What other code is allowed to use
```

For example, a bank account should not allow external code to directly change its balance to an invalid value.

Instead of:

```js
account.balance = -500000;
```

the object can control how the balance changes:

```js
account.deposit(500);
account.withdraw(100);
```

This allows the object to protect its own rules.

---

# 1. The Core Idea

Consider this object:

```js
const account = {
  balance: 1000
};
```

Any code can modify the balance:

```js
account.balance = -5000;
```

There is no protection.

Encapsulation tries to prevent this kind of uncontrolled modification.

A better design is:

```js
class BankAccount {
  #balance = 1000;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

Now:

```js
const account = new BankAccount();

account.deposit(500);

console.log(account.getBalance());
// 1500
```

But this does not work:

```js
account.#balance = -5000;
```

JavaScript prevents external code from accessing the private field.

---

# 2. What Encapsulation Protects

Encapsulation can protect:

* internal state
* implementation details
* object invariants
* business rules
* internal helper methods
* mutable data
* operations that should not be called directly

For example:

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

External code does not need direct access to:

```js
#password
```

It only needs the public operation:

```js
checkPassword()
```

This creates a controlled interface.

---

# 3. Public vs Private

A useful mental model is:

```text
Object
│
├── Public API
│     ├── methods
│     ├── getters
│     └── public properties
│
└── Internal implementation
      ├── private fields
      ├── private methods
      └── internal logic
```

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    // Public method
  }

  withdraw(amount) {
    // Public method
  }

  #validateAmount(amount) {
    // Private method
  }
}
```

The consumer interacts with:

```js
account.deposit(500);
account.withdraw(100);
```

The consumer does not need to know how validation or balance management works internally.

---

# 4. JavaScript Private Fields

Modern JavaScript provides true private class fields using `#`.

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

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.getName());
// Osama Abu Motlaq
```

But this is invalid:

```js
console.log(user.#name);
```

The field is private to the class.

---

# 5. Why `#` Matters

Consider the difference:

```js
class User {
  _name = "Osama Abu Motlaq";
}
```

and:

```js
class User {
  #name = "Osama Abu Motlaq";
}
```

The underscore:

```js
_name
```

is only a naming convention.

Other code can still access it:

```js
const user = new User();

console.log(user._name);
```

The `#` syntax provides actual language-level private access.

```js
const user = new User();

console.log(user.#name);
// SyntaxError
```

Therefore:

```text
_name
→ convention

#name
→ actual private field
```

---

# 6. Encapsulation With Validation

One of the most useful reasons for encapsulation is protecting valid state.

Without encapsulation:

```js
class User {
  age = 20;
}
```

External code can do:

```js
user.age = -100;
```

The object now contains invalid state.

Encapsulation allows the class to control changes:

```js
class User {
  #age;

  constructor(age) {
    this.#setAge(age);
  }

  #setAge(age) {
    if (age < 0) {
      throw new Error("Age cannot be negative.");
    }

    this.#age = age;
  }

  getAge() {
    return this.#age;
  }
}
```

Now:

```js
const user = new User(20);

console.log(user.getAge());
// 20
```

An invalid value is rejected:

```js
new User(-10);
// Error
```

The object protects its invariant.

---

# 7. What Is an Invariant?

An **invariant** is a condition that should remain true for an object's valid state.

For example:

```text
Bank account balance >= 0
```

or:

```text
User age >= 0
```

or:

```text
Product price >= 0
```

Encapsulation can enforce these rules.

Example:

```js
class Product {
  #price;

  constructor(price) {
    if (price < 0) {
      throw new Error("Price cannot be negative.");
    }

    this.#price = price;
  }

  getPrice() {
    return this.#price;
  }
}
```

The class controls the invariant:

```text
price >= 0
```

---

# 8. Encapsulation With Methods

Encapsulation does not necessarily mean every property must be private.

The important question is:

> Which operations should the object control?

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient funds.");
    }

    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

The object exposes meaningful operations:

```js
account.deposit(500);
account.withdraw(100);
account.getBalance();
```

Instead of exposing direct state mutation.

---

# 9. Encapsulation Is More Than Hiding Data

A common misconception is:

> Encapsulation means making properties private.

That is only part of the concept.

Encapsulation is about **controlling access to state and behavior**.

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    // Validation + state change
  }
}
```

The class encapsulates:

* the balance
* validation rules
* state changes
* the API used to interact with the account

Therefore:

```text
Encapsulation
=
Controlled state
+
Controlled behavior
+
Clear public interface
```

---

# 10. Private Methods

Private methods can hide internal implementation logic.

```js
class User {
  #normalizeName(name) {
    return name.trim();
  }

  constructor(name) {
    this.name = this.#normalizeName(name);
  }
}
```

The helper:

```js
#normalizeName()
```

is not part of the public API.

External code cannot call:

```js
user.#normalizeName();
```

This is useful when an operation is purely an implementation detail.

---

# 11. Public Methods Can Use Private Methods

A common pattern is:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
  }

  #validateAmount(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }
  }
}
```

The public method:

```js
deposit()
```

is the API.

The private method:

```js
#validateAmount()
```

is an implementation detail.

This creates a clean separation:

```text
External code
      ↓
 deposit()
      ↓
#validateAmount()
      ↓
 internal state
```

---

# 12. Getters and Encapsulation

Getters can expose controlled access to private state.

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

Now:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.name);
// Osama Abu Motlaq
```

The consumer sees:

```js
user.name
```

but internally the value is stored in:

```js
#name
```

This is a clean encapsulation pattern.

---

# 13. Setters and Encapsulation

Setters can control changes to internal state.

```js
class User {
  #name;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value.trim()) {
      throw new Error("Name cannot be empty.");
    }

    this.#name = value.trim();
  }
}
```

Now:

```js
const user = new User("Osama Abu Motlaq");

user.name = "Osama Abu Motlaq";

console.log(user.name);
// Osama Abu Motlaq
```

But:

```js
user.name = "";
```

throws an error.

The setter protects the internal state.

---

# 14. Encapsulation With Read-Only State

Sometimes state should be readable but not directly writable.

For example:

```js
class User {
  #id;

  constructor(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
}
```

Now:

```js
const user = new User(101);

console.log(user.id);
// 101
```

There is no setter.

Therefore:

```js
user.id = 500;
```

does not provide a supported way to change the private ID.

This is useful for values that should remain stable after creation.

---

# 15. Encapsulation and Object State

Consider two designs.

### Direct state mutation

```js
class BankAccount {
  balance = 0;
}
```

External code:

```js
account.balance += 500;
account.balance = -10000;
```

The object has little control.

### Encapsulated state

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount.");
    }

    this.#balance += amount;
  }
}
```

Now the object controls state transitions.

```text
Direct mutation
→ external code controls state

Encapsulation
→ object controls state
```

---

# 16. Encapsulation and State Transitions

An object can expose operations instead of raw state.

For example:

```js
class ShoppingCart {
  #items = [];

  addItem(item) {
    this.#items.push(item);
  }

  removeItem(itemId) {
    this.#items = this.#items.filter(
      item => item.id !== itemId
    );
  }

  getItems() {
    return [...this.#items];
  }
}
```

The internal array is private:

```js
#items
```

External code cannot directly replace it.

The class controls how items are added and removed.

---

# 17. Why Return Copies?

Consider:

```js
class ShoppingCart {
  #items = [];

  getItems() {
    return this.#items;
  }
}
```

Now external code can mutate the internal array:

```js
const items = cart.getItems();

items.push({
  id: 1
});
```

The private field itself was not directly accessed, but the reference was exposed.

A safer approach is:

```js
getItems() {
  return [...this.#items];
}
```

Now the caller receives a shallow copy.

The internal array remains controlled by the class.

---

# 18. Shallow Copy Limitation

The spread operator only creates a shallow copy.

Consider:

```js
class ShoppingCart {
  #items = [
    {
      id: 1,
      name: "Keyboard"
    }
  ];

  getItems() {
    return [...this.#items];
  }
}
```

The array is copied, but the item object is still shared.

Therefore:

```js
const items = cart.getItems();

items[0].name = "Changed";
```

may still mutate the original nested object.

For deeply nested mutable data, stronger copying or immutable design may be required.

Modern JavaScript also provides:

```js
structuredClone(value);
```

when a deep clone is appropriate and supported by the data.

---

# 19. Encapsulation With Private Static Members

Encapsulation can also apply to static state.

```js
class User {
  static #count = 0;

  constructor(name) {
    this.name = name;
    User.#count++;
  }

  static getCount() {
    return User.#count;
  }
}
```

Create instances:

```js
new User("Osama Abu Motlaq");
new User("Osama Abu Motlaq");
```

Then:

```js
console.log(User.getCount());
// 2
```

External code cannot directly access:

```js
User.#count;
```

The class controls access to the static state.

---

# 20. Encapsulation and Inheritance

Private fields have an important relationship with inheritance.

Consider:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

A child class cannot directly access the parent's private field:

```js
class Admin extends User {
  showName() {
    return this.#name;
  }
}
```

This is invalid.

The private field belongs specifically to the class that declared it.

The child should use a public or protected-by-convention API instead.

For example:

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

class Admin extends User {
  showName() {
    return this.getName();
  }
}
```

This preserves encapsulation.

---

# 21. JavaScript Does Not Have Traditional `protected`

Languages such as Java and C# commonly provide:

```text
public
private
protected
```

JavaScript has:

```text
public
private (#)
```

There is no traditional language-level `protected` keyword for class fields.

A common convention is:

```js
_name
```

to indicate:

> This is intended for internal/subclass use.

But it is not enforced by JavaScript.

Therefore:

```js
_name
```

is not actually private.

---

# 22. Encapsulation With Closures

Private state existed in JavaScript before private class fields.

Closures can create encapsulated state.

```js
function createAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
    },

    getBalance() {
      return balance;
    }
  };
}
```

Create an account:

```js
const account = createAccount();

account.deposit(500);

console.log(account.getBalance());
// 500
```

There is no direct access to:

```js
balance
```

because it is inside the closure.

This is another form of encapsulation.

---

# 23. Closures vs Private Fields

Both can hide internal state.

### Closure

```js
function createUser(name) {
  let username = name;

  return {
    getName() {
      return username;
    }
  };
}
```

### Private class field

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

Private fields are useful when you want:

* class syntax
* inheritance
* instance-based objects
* private methods
* private static members

Closures are useful when you want:

* factory functions
* small encapsulated modules
* private lexical state without classes

Neither approach is universally better.

---

# 24. Encapsulation vs Abstraction

These concepts are closely related but different.

### Encapsulation

Controls access to state and implementation.

```text
"How do I control what can access this?"
```

### Abstraction

Hides unnecessary complexity and exposes the important interface.

```text
"What does the consumer actually need to know?"
```

Example:

```js
account.withdraw(100);
```

Encapsulation protects:

```text
balance
validation
internal rules
```

Abstraction gives the consumer a simple operation:

```text
withdraw()
```

A useful mental model:

```text
Encapsulation
→ controls access

Abstraction
→ simplifies usage
```

---

# 25. Encapsulation vs Data Hiding

These terms are related but not identical.

**Data hiding** focuses on preventing direct access to internal data.

**Encapsulation** is broader.

It combines data with the operations that control that data.

For example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    // Controlled state transition
  }

  withdraw(amount) {
    // Controlled state transition
  }
}
```

This does not simply hide `#balance`.

It also encapsulates the rules for changing the balance.

---

# 26. Encapsulation and APIs

A well-encapsulated object exposes a small and understandable public API.

For example:

```js
class User {
  #name;
  #email;

  constructor(name, email) {
    this.#name = name;
    this.#email = email;
  }

  getProfile() {
    return {
      name: this.#name,
      email: this.#email
    };
  }
}
```

Consumers only need:

```js
user.getProfile();
```

They do not need to know:

* how the values are stored
* how they are validated
* whether the implementation changes later

This reduces coupling between the consumer and implementation.

---

# 27. Reducing Coupling

Suppose external code directly depends on:

```js
user._firstName
user._lastName
```

Changing the internal structure becomes difficult.

Instead:

```js
user.getFullName();
```

The internal implementation can change:

```js
#firstName
#lastName
```

or:

```js
#fullName
```

without requiring every consumer to change.

Encapsulation therefore helps reduce coupling.

---

# 28. Encapsulation and Refactoring

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

Many parts of an application may directly access:

```js
user.name
```

Changing the storage model can become difficult.

With encapsulation:

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

Consumers depend on:

```js
user.getName();
```

The implementation can change while the public API remains stable.

This is one reason encapsulation is useful in larger systems.

---

# 29. Encapsulation Does Not Mean "Hide Everything"

A common mistake is making every property private without considering the API.

For example, this may be unnecessarily complicated:

```js
class User {
  #name;

  getName() {
    return this.#name;
  }
}
```

if the application simply needs a normal immutable data object.

Sometimes this is perfectly reasonable:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

Encapsulation should be used where controlling access or invariants provides value.

Do not add abstraction and privacy simply for the sake of OOP.

---

# 30. Encapsulation and Immutability

Encapsulation and immutability are related but different.

### Encapsulation

Controls how state can be accessed or modified.

### Immutability

Means a value is not changed after creation.

For example:

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

The name is encapsulated.

But encapsulation alone does not necessarily make an object immutable.

A class can still provide:

```js
set name(value) {
  this.#name = value;
}
```

which allows controlled mutation.

---

# 31. Encapsulation and Security

Encapsulation can improve application design, but it should not be confused with security.

Private fields:

```js
#password
```

prevent normal external JavaScript access.

They do **not** provide:

* encryption
* password hashing
* database security
* authorization
* network security
* protection from compromised runtime environments

For example, storing a password as:

```js
#password = "secret";
```

does not make the password secure.

Security requires appropriate mechanisms such as:

* password hashing
* authentication
* authorization
* HTTPS
* secure storage
* server-side validation

Encapsulation is a software design mechanism, not a complete security mechanism.

---

# 32. Encapsulation in Real Applications

Encapsulation becomes useful when an object owns important rules.

Examples include:

### Shopping cart

```text
addItem()
removeItem()
calculateTotal()
```

### Bank account

```text
deposit()
withdraw()
getBalance()
```

### User account

```text
changePassword()
getProfile()
```

### Order

```text
addProduct()
removeProduct()
calculateTotal()
submit()
```

### API client

```text
request()
get()
post()
```

The implementation details can remain internal.

---

# 33. A Complete Example

Consider a bank account:

```js
class BankAccount {
  #balance;
  #owner;

  constructor(owner, initialBalance = 0) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }

    this.#owner = owner;
    this.#balance = initialBalance;
  }

  get owner() {
    return this.#owner;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    this.#validateAmount(amount);

    this.#balance += amount;
  }

  withdraw(amount) {
    this.#validateAmount(amount);

    if (amount > this.#balance) {
      throw new Error("Insufficient funds.");
    }

    this.#balance -= amount;
  }

  #validateAmount(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }
  }
}
```

Use it:

```js
const account = new BankAccount(
  "Osama Abu Motlaq",
  1000
);

account.deposit(500);

account.withdraw(200);

console.log(account.owner);
// Osama Abu Motlaq

console.log(account.balance);
// 1300
```

The class controls:

```text
#owner
#balance
#validateAmount()
```

The public API is:

```text
owner
balance
deposit()
withdraw()
```

The consumer does not need to know the internal implementation.

---

# 34. The Public Interface

A good way to understand encapsulation is to imagine that other developers will use your class without reading its source code.

They should only need to understand:

```js
const account = new BankAccount(
  "Osama Abu Motlaq",
  1000
);

account.deposit(500);
account.withdraw(200);

console.log(account.balance);
```

They should not need to understand:

```js
#balance
#owner
#validateAmount()
```

The public API is the contract.

The implementation is the internal mechanism.

---

# 35. Common Mistake: Exposing Internal Arrays

Avoid:

```js
class Cart {
  #items = [];

  get items() {
    return this.#items;
  }
}
```

because:

```js
cart.items.push(newItem);
```

can mutate the internal collection.

Prefer:

```js
get items() {
  return [...this.#items];
}
```

when exposing a snapshot is sufficient.

---

# 36. Common Mistake: Fake Private Fields

This:

```js
class User {
  _password = "secret";
}
```

does not provide true privacy.

Anyone can do:

```js
user._password;
```

Use:

```js
class User {
  #password = "secret";
}
```

when actual class-level private access is required.

---

# 37. Common Mistake: Public Setter With No Validation

This:

```js
class User {
  #age;

  set age(value) {
    this.#age = value;
  }
}
```

provides controlled syntax but no meaningful protection.

A setter should add value when it enforces a rule:

```js
set age(value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Invalid age.");
  }

  this.#age = value;
}
```

---

# 38. Common Mistake: Returning Internal Mutable Objects

Consider:

```js
getProfile() {
  return this.#profile;
}
```

If `#profile` is mutable, callers may indirectly modify internal state.

Depending on the design, consider:

```js
getProfile() {
  return { ...this.#profile };
}
```

or return a deliberately immutable/read-only representation.

Again, remember that shallow copies do not protect nested references.

---

# 39. Common Mistake: Excessive Getters and Setters

Do not automatically create:

```js
getName()
setName()
getEmail()
setEmail()
getAge()
setAge()
```

for every property.

If there is no meaningful control, validation, transformation, or abstraction, direct public data may be simpler.

Encapsulation should solve a real design problem.

---

# 40. Common Mistake: Putting Too Much Logic Behind Accessors

Avoid surprising behavior such as:

```js
get data() {
  // Performs a network request
  // Writes to a database
  // Changes application state
}
```

A getter looks like a property:

```js
object.data
```

It should generally behave like a value lookup.

Operations involving significant work or side effects are usually clearer as methods:

```js
object.loadData();
```

---

# 41. Encapsulation in React

**Importance for modern React: Low to Medium.**

Modern React does not usually use class-based OOP encapsulation as its primary architecture.

React mainly uses:

```text
Function Components
Hooks
Props
State
Context
Composition
```

However, the underlying principle is highly relevant.

React components encapsulate their implementation details.

For example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}
```

The component exposes a UI:

```text
button
```

while keeping its internal state and implementation inside the component.

The consumer does not directly manipulate:

```js
count
```

Instead, the component controls how its state changes.

This is conceptually similar to encapsulation.

---

# 42. Encapsulation in React Components

Consider:

```jsx
function UserProfile() {
  const [name, setName] = useState("Osama Abu Motlaq");

  function changeName(newName) {
    setName(newName.trim());
  }

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={() => changeName("Osama Abu Motlaq")}>
        Change Name
      </button>
    </div>
  );
}
```

The state:

```js
name
```

belongs to the component.

Other components do not directly access that local variable.

They interact through the component's public interface:

```text
props
events
callbacks
rendered output
```

Again, this is not classical class-based encapsulation, but the design principle is similar.

---

# 43. Encapsulation in Next.js and Backend Code

Encapsulation is particularly useful in larger Next.js or Node.js applications.

For example, instead of allowing many parts of the application to directly interact with database details:

```text
Component
    ↓
Database query
```

you can create a service/repository layer:

```text
Component
    ↓
Service
    ↓
Repository
    ↓
Database
```

The component does not need to know:

* SQL details
* database implementation
* connection management
* validation logic

For example:

```js
async function getUserProfile(userId) {
  // Database implementation
}
```

Other code simply uses:

```js
const profile = await getUserProfile(userId);
```

This is encapsulation at an architectural level.

---

# 44. Encapsulation and Separation of Concerns

Encapsulation works closely with separation of concerns.

Instead of one huge function:

```text
validate user
connect database
query database
transform data
send response
handle errors
```

you can separate responsibilities.

For example:

```text
Route Handler
     ↓
Service
     ↓
Repository
     ↓
Database
```

Each layer encapsulates its implementation.

This can make larger applications easier to maintain.

---

# 45. Encapsulation and Testing

Encapsulation can make testing more focused.

Suppose:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount.");
    }

    this.#balance += amount;
  }
}
```

Tests can focus on the public behavior:

```js
account.deposit(500);

expect(account.balance).toBe(500);
```

The test does not need to know how `#balance` is internally stored.

This means tests depend on the public contract rather than implementation details.

That can make refactoring easier.

---

# 46. Encapsulation and API Stability

A strong public API allows internal implementation to evolve.

Version 1:

```js
class User {
  #firstName;
  #lastName;

  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
```

Later, the implementation might change:

```js
class User {
  #fullName;

  getFullName() {
    return this.#fullName;
  }
}
```

The consumer can still use:

```js
user.getFullName();
```

The public contract remains stable.

This is one of the strongest practical benefits of encapsulation.

---

# 47. Encapsulation Design Principle

When designing a class, ask:

### What should users of this object know?

Expose that.

### What should remain an implementation detail?

Hide that.

### What rules must always remain true?

Enforce those rules.

For example:

```text
BankAccount

Public:
    deposit()
    withdraw()
    balance

Private:
    internal balance representation
    validation helpers
```

This creates a deliberate API.

---

# 48. A Simple Mental Model

Think about a car.

You interact with:

```text
steering wheel
brake
accelerator
gear selector
```

You do not directly control:

```text
fuel injection
engine timing
transmission internals
```

The interface is simple:

```text
Driver
  ↓
Controls
  ↓
Car
  ↓
Internal mechanisms
```

Encapsulation follows a similar idea in software:

```text
Consumer
   ↓
Public API
   ↓
Object
   ↓
Private implementation
```

---

# 49. Encapsulation vs Polymorphism

These concepts solve different problems.

### Encapsulation

Controls access:

```text
Who can access or modify this?
```

### Polymorphism

Controls variation in behavior:

```text
How can different objects implement the same operation?
```

For example:

```js
class User {
  #name;

  getRole() {
    return "User";
  }
}

class Admin extends User {
  getRole() {
    return "Administrator";
  }
}
```

Here:

```text
#name
→ encapsulation

getRole() overriding
→ polymorphism
```

They can work together.

---

# 50. Encapsulation vs Inheritance

Inheritance answers:

```text
"What relationship exists between these classes?"
```

Encapsulation answers:

```text
"Which parts of this object should be exposed?"
```

For example:

```js
class Admin extends User {
  // Inheritance
}
```

while:

```js
class User {
  #password;

  // Encapsulation
}
```

A class can use encapsulation without inheritance.

A class can use inheritance without meaningful private state.

These are independent concepts.

---

# 51. Encapsulation vs Composition

Composition combines objects or behaviors.

Encapsulation controls the internal details of those objects.

For example:

```js
function createService(logger) {
  return {
    run() {
      logger.log("Running service");
    }
  };
}
```

The service depends on a logger behavior.

The service can still encapsulate its own internal state.

Therefore:

```text
Composition
→ combine behavior

Encapsulation
→ control implementation/state
```

---

# 52. Best Practices

### 1. Keep the public API small

Expose only what consumers actually need.

---

### 2. Protect important invariants

If a value must satisfy a rule, enforce it at the boundary.

---

### 3. Use `#private` when true privacy is required

Do not confuse `_property` with actual private state.

---

### 4. Avoid exposing mutable internal references

Return copies or controlled representations when necessary.

---

### 5. Prefer meaningful methods

Use methods such as:

```js
deposit()
withdraw()
changePassword()
addItem()
removeItem()
```

when the operation has business meaning.

---

### 6. Do not over-encapsulate simple data

A plain object is sometimes the correct solution.

---

### 7. Keep implementation details internal

Consumers should depend on the public contract rather than internal representation.

---

### 8. Do not confuse encapsulation with security

Private fields are not encryption or a complete security mechanism.

---

### 9. Prefer stable APIs

Design public methods around what consumers need, not around how the implementation currently works.

---

### 10. Favor composition in modern application architecture

Especially in React and JavaScript applications, composition is often more practical than large inheritance hierarchies.

---

# 53. Quick Reference

| Feature            | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `#field`           | True private instance field                      |
| `#method()`        | Private instance method                          |
| `static #field`    | Private static field                             |
| `static #method()` | Private static method                            |
| `_field`           | Naming convention, not true privacy              |
| Getter             | Controlled read access                           |
| Setter             | Controlled write access                          |
| Closure            | Can create private lexical state                 |
| Public method      | Exposes controlled behavior                      |
| Copy returned data | Prevents direct mutation of internal collections |

---

# 54. Encapsulation Checklist

When designing an object or class, ask:

```text
□ What state belongs to this object?
□ Which state should be private?
□ Which operations should be public?
□ Can external code put the object into an invalid state?
□ Should validation happen before state changes?
□ Am I exposing mutable internal references?
□ Does this getter/setter provide real value?
□ Can implementation details change without breaking consumers?
□ Am I adding complexity without a real benefit?
```

---

# 55. Mental Model

Remember encapsulation as:

```text
             OBJECT
                │
        ┌───────┴────────┐
        ↓                ↓
    PUBLIC API       PRIVATE STATE
        │                │
    methods          #fields
    getters          #methods
    setters
        │                │
        └───────┬────────┘
                ↓
       CONTROLLED BEHAVIOR
```

The central idea is:

```text
Do not let every part of the application
freely manipulate an object's internal state.

Give the object controlled ways to manage itself.
```

---

# Key Takeaways

1. **Encapsulation controls access to an object's state and implementation.**
2. Modern JavaScript provides true private fields using `#`.
3. `_property` is only a convention and does not create privacy.
4. Encapsulation is broader than simply hiding properties.
5. Public methods can provide controlled state transitions.
6. Private methods can hide implementation details.
7. Getters and setters can provide controlled access when they add real value.
8. Returning internal mutable references can break encapsulation.
9. Closures can also provide private state.
10. Encapsulation helps protect object invariants.
11. Encapsulation reduces coupling between consumers and implementation details.
12. Encapsulation and abstraction are related but solve different problems.
13. Encapsulation and polymorphism can work together.
14. Encapsulation is useful beyond classes, including services and application architecture.
15. Modern React does not rely heavily on class-based OOP, but components naturally encapsulate state and implementation.
16. Do not over-engineer simple objects just to apply OOP concepts.

---

## React Relevance

**Importance for learning React: Low to Medium.**

You should understand encapsulation as part of your JavaScript and software-design foundation.

However, for your React and Next.js path, prioritize:

```text
JavaScript
    ↓
Functions
    ↓
Objects
    ↓
Closures
    ↓
Array Methods
    ↓
Async JavaScript
    ↓
Modules
    ↓
React
    ↓
Next.js
```

Modern React relies much more on **composition, hooks, props, state, and Context** than on traditional class-based encapsulation.

Still, understanding encapsulation will help you:

* read existing OOP JavaScript code
* understand libraries
* design cleaner services
* understand application architecture
* reason about state ownership
* answer OOP interview questions
* understand why implementation details should not leak across your application

---

## Next Topic

Continue with:

**`15-abstraction.md`**

Abstraction builds on encapsulation by focusing on how to expose only the essential interface while hiding unnecessary implementation complexity.
