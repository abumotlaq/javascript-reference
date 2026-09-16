# JavaScript Private Fields

Private fields are class fields that can only be accessed from within the class that declares them.

JavaScript uses the `#` prefix to create truly private fields:

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

const osama = new User("secret");

console.log(osama.checkPassword("secret"));
```

Output:

```text
true
```

But this does not work:

```js
console.log(osama.#password);
```

JavaScript throws a syntax error because `#password` is private.

---

# 1. Why Private Fields Exist

Normal object properties are publicly accessible:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);
```

Output:

```text
Osama Abu Motlaq
```

The property:

```js
this.name
```

is public.

Anyone who has access to the object can read or modify it:

```js
osama.name = "Another Name";
```

Private fields provide stronger encapsulation.

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

Now external code cannot directly access:

```js
osama.#password;
```

The class controls how that data can be used.

---

# 2. Basic Private Field Syntax

A private field starts with `#`:

```js
class User {
  #password;
}
```

The field can then be accessed inside the class:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  getPasswordLength() {
    return this.#password.length;
  }
}
```

Create an instance:

```js
const osama = new User("secret");
```

Use the public method:

```js
console.log(osama.getPasswordLength());
```

Output:

```text
6
```

The password itself remains inaccessible from outside.

---

# 3. Private Fields Must Be Declared

A private field should be declared in the class body:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

The declaration:

```js
#password;
```

creates the private field.

You can also initialize it directly:

```js
class User {
  #role = "user";
}
```

Each instance receives its own private field.

---

# 4. Private Fields Are Per-Instance

Private fields belong to individual instances.

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

const osama = new User("secret");
const anotherUser = new User("different");

console.log(osama.checkPassword("secret"));
console.log(anotherUser.checkPassword("secret"));
```

Output:

```text
true
false
```

Each object has its own private state.

Conceptually:

```text
osama
 └── #password → "secret"

anotherUser
 └── #password → "different"
```

The private fields are not shared between instances.

---

# 5. Private Fields Are Truly Private

This is one of the most important differences between `#private` fields and ordinary naming conventions.

A common convention is:

```js
class User {
  constructor(password) {
    this._password = password;
  }
}
```

The underscore:

```text
_password
```

does **not** make the property private.

External code can still access it:

```js
console.log(osama._password);
```

By contrast:

```js
class User {
  #password;
}
```

creates actual JavaScript private state.

This is a language-level restriction, not simply a naming convention.

---

# 6. Private Fields Cannot Be Accessed Outside the Class

Consider:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}

const osama = new User("secret");
```

This is invalid:

```js
console.log(osama.#password);
```

It results in a syntax error.

The private name is only valid in the class body that declared it.

---

# 7. Private Fields Cannot Be Accessed with Bracket Notation

This does not bypass privacy:

```js
console.log(osama["#password"]);
```

It looks like a property access, but it is not the same thing as:

```js
osama.#password
```

The string:

```text
"#password"
```

is simply a normal string property key.

Therefore:

```js
osama["#password"];
```

does not access the private field.

---

# 8. Private Fields Are Not Normal Object Properties

Private fields are intentionally hidden from normal property inspection.

For example:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
    this.name = "Osama Abu Motlaq";
  }
}

const osama = new User("secret");

console.log(Object.keys(osama));
```

Output:

```text
["name"]
```

The private field does not appear in:

```js
Object.keys()
```

Private fields are not ordinary enumerable properties.

---

# 9. Private Fields and Property Descriptors

Private fields do not behave like ordinary properties with descriptors such as:

```text
value
writable
enumerable
configurable
```

You cannot inspect a private field using:

```js
Object.getOwnPropertyDescriptor(osama, "#password");
```

because `#password` is not a normal string-keyed property.

This is another reason private fields are fundamentally different from:

```js
this._password
```

---

# 10. Private Fields Can Be Read and Written Inside the Class

A class can freely manipulate its own private fields.

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  changePassword(newPassword) {
    this.#password = newPassword;
  }

  checkPassword(password) {
    return this.#password === password;
  }
}

const osama = new User("old-password");

console.log(osama.checkPassword("old-password"));

osama.changePassword("new-password");

console.log(osama.checkPassword("new-password"));
```

Output:

```text
true
true
```

External code cannot directly modify:

```text
#password
```

but it can use the public methods that the class provides.

---

# 11. Private Fields and Methods

Private methods can also be declared with `#`.

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  #isValidPassword(password) {
    return password.length >= 6;
  }

  changePassword(newPassword) {
    if (!this.#isValidPassword(newPassword)) {
      throw new Error("Password is too short.");
    }

    this.#password = newPassword;
  }
}
```

The method:

```js
#isValidPassword()
```

can only be called from inside the class.

External code cannot do:

```js
osama.#isValidPassword("secret");
```

---

# 12. Private Static Fields

Private fields can also be static.

```js
class User {
  static #userCount = 0;

  constructor() {
    User.#userCount++;
  }

  static getUserCount() {
    return User.#userCount;
  }
}

new User();
new User();

console.log(User.getUserCount());
```

Output:

```text
2
```

The difference is:

```text
#field
```

belongs to each instance.

While:

```text
static #field
```

belongs to the class itself.

---

# 13. Private Static Methods

Static methods can also be private:

```js
class User {
  static #validateName(name) {
    return name.length > 0;
  }

  static create(name) {
    if (!User.#validateName(name)) {
      throw new Error("Invalid name.");
    }

    return new User(name);
  }

  constructor(name) {
    this.name = name;
  }
}
```

The private static method:

```js
#validateName()
```

can only be accessed inside the class.

---

# 14. Private Fields and Inheritance

This is a critical concept.

Private fields are **not inherited in the normal sense**.

Consider:

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
  getPassword() {
    return this.#password;
  }
}
```

The child class cannot access:

```js
#password
```

because `#password` was declared by `User`.

This causes an error.

The private name belongs specifically to the class that declared it.

---

# 15. Private Fields vs Protected Fields

Many OOP languages provide:

```text
public
protected
private
```

JavaScript does not have a traditional `protected` field syntax.

JavaScript private fields use:

```js
#password
```

and they are genuinely private.

There is no equivalent syntax such as:

```js
protected password;
```

Instead, developers often use conventions or public/protected-by-design methods.

For example:

```js
class User {
  constructor(name) {
    this._name = name;
  }
}
```

The underscore is only a convention.

It does not provide language-level protection.

---

# 16. Accessing Parent Private State

A child class cannot directly access a parent's private field.

Instead, the parent can expose controlled methods.

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

Output:

```text
My name is Osama Abu Motlaq.
```

The child uses:

```js
this.getName();
```

instead of directly accessing:

```js
this.#name;
```

This preserves encapsulation.

---

# 17. Private Fields and `super`

Private fields do not become accessible through `super`.

For example:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}

class Developer extends User {
  getPassword() {
    return super.#password;
  }
}
```

This is invalid.

`super` can access inherited methods and public/protected-by-convention behavior, but it cannot bypass JavaScript private-field restrictions.

---

# 18. Private Fields and Getters

Private fields work especially well with getters.

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

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);
```

Output:

```text
Osama Abu Motlaq
```

Externally, the API looks like:

```js
osama.name;
```

Internally, the value is stored as:

```js
#name
```

This provides controlled access.

---

# 19. Private Fields and Setters

You can also validate updates using a setter.

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
    if (typeof value !== "string" || value.trim() === "") {
      throw new TypeError("Name must be a non-empty string.");
    }

    this.#name = value.trim();
  }
}

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);

osama.name = "Osama Abu Motlaq";
```

The setter controls how the private state changes.

---

# 20. Private Fields and Encapsulation

Private fields are one of JavaScript's strongest tools for encapsulation.

Encapsulation means keeping internal implementation details controlled and exposing only the operations that should be publicly available.

Example:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit must be positive.");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

External code can do:

```js
const account = new BankAccount();

account.deposit(100);

console.log(account.getBalance());
```

But it cannot directly do:

```js
account.#balance = 1000000;
```

The class controls the state.

---

# 21. Private Fields Protect Invariants

One of the biggest reasons to use private state is to protect **invariants**.

An invariant is a condition that should always remain valid.

For example:

```text
balance >= 0
```

If the balance were public:

```js
account.balance = -1000000;
```

could violate the rule.

With a private field:

```js
class BankAccount {
  #balance = 0;

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient balance.");
    }

    this.#balance -= amount;
  }
}
```

all modifications go through controlled operations.

---

# 22. Private Fields Do Not Replace Validation

Private fields prevent external direct access, but they do not automatically validate data.

This:

```js
class User {
  #age;

  constructor(age) {
    this.#age = age;
  }
}
```

still allows:

```js
new User(-500);
```

If invalid values are not allowed, validation must be implemented explicitly:

```js
class User {
  #age;

  constructor(age) {
    if (!Number.isInteger(age) || age < 0) {
      throw new TypeError("Age must be a non-negative integer.");
    }

    this.#age = age;
  }
}
```

Privacy and validation solve different problems.

```text
Private field
    ↓
Who can access the state?

Validation
    ↓
What values are allowed?
```

---

# 23. Private Fields vs Closures

JavaScript also supports private state through closures.

Example:

```js
function createUser(name) {
  let privateName = name;

  return {
    getName() {
      return privateName;
    }
  };
}

const osama = createUser("Osama Abu Motlaq");
```

The variable:

```js
privateName
```

cannot be accessed directly from outside.

Classes provide another mechanism:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

Both approaches can provide encapsulation, but they have different object models and trade-offs.

Private fields are especially useful when you want class-based APIs and class inheritance.

---

# 24. Private Fields and `this`

Private fields are accessed through `this` inside instance methods:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  introduce() {
    return `My name is ${this.#name}.`;
  }
}
```

Here:

```js
this.#name
```

means:

```text
the private #name field associated with this instance
```

The same `this` rules discussed in `03-this-keyword.md` still matter.

---

# 25. Extracting a Method Still Affects `this`

Consider:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  introduce() {
    return `My name is ${this.#name}.`;
  }
}

const osama = new User("Osama Abu Motlaq");

const introduce = osama.introduce;
```

Calling:

```js
introduce();
```

can lose the intended `this` context.

The private field itself is not the problem.

The problem is that the method needs the correct instance as `this`.

You can bind it:

```js
const introduce = osama.introduce.bind(osama);

console.log(introduce());
```

Output:

```text
My name is Osama Abu Motlaq.
```

---

# 26. Private Field Brand Checking

Private fields have an important internal concept called **private-brand checking**.

Consider:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  introduce() {
    return this.#name;
  }
}
```

The JavaScript engine does not simply ask:

```text
Does this object have a property named "#name"?
```

Instead, the object must be an instance carrying the appropriate private field associated with this class.

This is why private fields cannot be faked with:

```js
{
  "#name": "Osama Abu Motlaq"
}
```

That object does not possess the actual private field.

---

# 27. The `in` Operator with Private Fields

Private fields can be checked using a special syntax from within the class:

```js
class User {
  #name;

  static hasPrivateName(object) {
    return #name in object;
  }
}
```

Example:

```js
const osama = new User();

console.log(User.hasPrivateName(osama));
```

Output:

```text
true
```

This is different from:

```js
"#name" in osama
```

which checks for a normal property named `"#name"`.

Private field checks use the actual private name:

```js
#name in object
```

and must occur in a context where `#name` is accessible.

---

# 28. Private Fields Are Not Serialized Normally

Private fields are not included in normal JSON serialization.

Example:

```js
class User {
  #password;

  constructor(password) {
    this.#password = password;
    this.name = "Osama Abu Motlaq";
  }
}

const osama = new User("secret");

console.log(JSON.stringify(osama));
```

The result includes the public property but not the private password:

```text
{"name":"Osama Abu Motlaq"}
```

This can be useful for keeping internal state out of ordinary serialization.

However, **do not treat private fields as a complete security mechanism**.

Private fields provide language-level encapsulation, not encryption.

---

# 29. Private Fields Are Not Encryption

This distinction is essential.

A private field:

```js
#password
```

does not mean that the password is encrypted.

It means JavaScript prevents normal external code from directly accessing that private field.

You should never store real plaintext passwords in application objects.

For real authentication systems, passwords must be handled using appropriate server-side security practices such as secure password hashing.

Therefore:

```text
Private field
≠
Encryption
≠
Password security system
```

---

# 30. Private Fields and Public API Design

A strong class often keeps implementation details private while exposing a small public API.

Example:

```js
class User {
  #name;
  #isActive = false;

  constructor(name) {
    this.#name = name;
  }

  activate() {
    this.#isActive = true;
  }

  deactivate() {
    this.#isActive = false;
  }

  getStatus() {
    return this.#isActive ? "Active" : "Inactive";
  }
}
```

The consumer does not need to know how the state is stored.

It simply uses:

```js
osama.activate();
osama.getStatus();
```

This separation makes implementation changes easier.

---

# 31. Private Fields vs Public Fields

| Feature                    | Public field         | Private field                |
| -------------------------- | -------------------- | ---------------------------- |
| Syntax                     | `this.name`          | `this.#name`                 |
| External access            | Yes                  | No                           |
| Bracket access             | Yes                  | No                           |
| `Object.keys()`            | Can appear           | Does not appear              |
| JSON serialization         | Can appear           | Not normally included        |
| Inherited directly         | Accessible normally  | Not accessible by subclasses |
| Encapsulation              | Convention/API-based | Language-level               |
| Can be accessed from class | Yes                  | Yes                          |

Example:

```js
class User {
  name;
  #password;
}
```

`name` is public.

`#password` is private.

---

# 32. Private Methods vs Public Methods

Public method:

```js
introduce() {
  return "Hello.";
}
```

Private method:

```js
#validate() {
  return true;
}
```

The public method forms part of the class's external API.

The private method is an implementation detail.

A useful design principle is:

> Keep internal implementation details private when consumers do not need direct access to them.

---

# 33. Private Fields and Inheritance Design

Suppose:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

and:

```js
class Developer extends User {}
```

`Developer` does not directly know about:

```text
#name
```

The parent controls it.

If subclasses need the value, provide a public or protected-by-convention API:

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
```

This is usually better than exposing internal storage directly.

---

# 34. Common Mistakes

## Mistake 1: Using `_` and assuming it is private

```js
this._password = password;
```

This is still public.

Use:

```js
this.#password = password;
```

for actual private fields.

---

## Mistake 2: Trying to access private fields externally

Invalid:

```js
osama.#password;
```

Private fields can only be accessed from valid class code that has access to that private name.

---

## Mistake 3: Trying to use bracket notation

This does not access a private field:

```js
osama["#password"];
```

---

## Mistake 4: Expecting subclasses to access parent private fields

Invalid:

```js
class Developer extends User {
  getPassword() {
    return this.#password;
  }
}
```

The private field belongs to `User`.

---

## Mistake 5: Treating privacy as security

Private fields are not encryption.

Do not use them as a replacement for authentication or cryptographic security.

---

## Mistake 6: Making Everything Private

Not every property needs to be private.

Use privacy when it provides a meaningful design benefit.

---

# 35. Best Practices

### 1. Keep sensitive implementation state private when appropriate

```js
#balance
#internalState
#cache
```

### 2. Expose behavior instead of raw internal state

Prefer:

```js
account.deposit(100);
```

over allowing arbitrary direct mutation.

### 3. Validate data at the class boundary

Constructors and public methods should enforce valid state.

### 4. Use getters/setters when controlled property-style access is useful

```js
user.name
```

can internally use:

```js
#name
```

### 5. Do not confuse privacy with security

Private fields protect access through the language's object model.

They do not encrypt data.

### 6. Avoid unnecessary private fields

Use them when encapsulation improves the API or protects important invariants.

### 7. Prefer a small public API

A class should expose what consumers need and hide implementation details that they do not need.

---

# 36. Practical Example: Bank Account

```js
class BankAccount {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new TypeError("Deposit must be a positive number.");
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new TypeError("Withdrawal must be a positive number.");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient balance.");
    }

    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Osama Abu Motlaq");

account.deposit(500);
account.withdraw(150);

console.log(account.getBalance());
```

Output:

```text
350
```

The public API is:

```text
deposit()
withdraw()
getBalance()
```

The internal state:

```text
#balance
```

is protected.

---

# 37. Practical Example: Private Validation

Private methods are useful for implementation details.

```js
class User {
  #name;

  constructor(name) {
    this.#setName(name);
  }

  #setName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new TypeError("Name must be a non-empty string.");
    }

    this.#name = name.trim();
  }

  get name() {
    return this.#name;
  }
}

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);
```

The public interface is:

```js
osama.name;
```

The implementation detail:

```js
#setName();
```

remains private.

---

# 38. React Relevance

Private fields are **low-to-medium priority for modern React development**.

Modern React primarily uses:

```text
function components
hooks
closures
props
state
context
composition
```

rather than class-based OOP.

You generally will not write React components like:

```js
class DeveloperComponent extends UserComponent {
  #state;
}
```

Modern React does not work this way.

However, private fields are still useful JavaScript knowledge because:

* They are part of modern JavaScript.
* They deepen your understanding of classes.
* They reinforce encapsulation.
* They appear in JavaScript technical interviews.
* They may appear in libraries or non-React code.
* They help you understand the difference between public APIs and implementation details.

For your React/Next.js path, understand private fields well enough to read and explain them, but do not spend more time on them than on core JavaScript and React concepts.

---

# 39. Quick Reference

| Concept                  | Syntax               | Meaning                      |
| ------------------------ | -------------------- | ---------------------------- |
| Private instance field   | `#name`              | Private per-instance state   |
| Initialize private field | `#name = value`      | Declare and initialize       |
| Access private field     | `this.#name`         | Access from valid class code |
| Private method           | `#validate()`        | Private behavior             |
| Private static field     | `static #count`      | Private class-level state    |
| Private static method    | `static #validate()` | Private class-level behavior |
| Private field check      | `#name in object`    | Check private-field presence |
| Public convention        | `_name`              | Not actually private         |
| Getter                   | `get name()`         | Controlled read access       |
| Setter                   | `set name(value)`    | Controlled write access      |

---

# 40. Public vs Private Mental Model

Think of a class as having two layers:

```text
                 Class
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
   Public API            Private State
        │                     │
   name / methods         #password
   getters / setters      #balance
        │                 #internalMethod()
        ↓                     ↓
   External code          Class internals
```

External code should interact with the public API:

```js
osama.checkPassword("secret");
```

rather than directly manipulating:

```text
#password
```

---

# 41. The Most Important Distinction

Remember these three levels:

```text
this.name
```

is a normal public property.

```text
this._name
```

is also a normal public property; `_` is only a convention.

```text
this.#name
```

is a genuine JavaScript private field.

Therefore:

```text
name
 ↓
public

_name
 ↓
public by language rules
(private by convention only)

#name
 ↓
private by language rules
```

---

# 42. Key Takeaways

1. JavaScript private fields use the `#` syntax.

2. Private fields provide **language-level encapsulation**.

3. They cannot be accessed directly from outside the declaring class.

4. `_name` is not truly private.

5. Private fields are different from normal object properties.

6. They do not normally appear in `Object.keys()` or JSON serialization.

7. Private fields belong to the class that declares them.

8. Subclasses cannot directly access a parent's private fields.

9. Use public methods, getters, or setters when controlled access is required.

10. Private fields can protect important invariants.

11. Private methods can hide implementation details as well.

12. Static private fields belong to the class rather than individual instances.

13. Private fields are not encryption and should not be treated as a security mechanism.

14. Encapsulation is about controlling how an object's internal state is accessed and modified.

15. Modern React rarely requires class-based private fields, but understanding them is valuable JavaScript knowledge.

---

## Final Mental Model

The simplest way to understand private fields is:

```text
Public property
    ↓
Anyone with the object can access it

Private field
    ↓
Only valid code inside the declaring class can access it
```

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

Think of it as:

```text
User instance
│
├── public API
│   └── checkPassword()
│
└── private state
    └── #password
```

The goal is not merely to hide data.

The deeper goal is:

```text
hide implementation
        ↓
control access
        ↓
protect invariants
        ↓
create a predictable public API
```

That is the connection between **private fields** and **encapsulation**.

---

## Next Topic

**`12-getters-setters.md` — Getters and Setters**

The next topic focuses on `get` and `set`, property-like access to methods, validation during assignment, computed values, accessor descriptors, inheritance, and how getters/setters work together with private fields.
