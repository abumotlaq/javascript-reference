# Composition in JavaScript

Composition is a software design principle where complex behavior or objects are built by **combining smaller, independent pieces**.

The core idea is:

> **Build objects and systems by combining capabilities instead of relying primarily on inheritance.**

For example, instead of creating:

```text
AdminUser
  ↓
PremiumAdminUser
  ↓
PremiumAdminUserWithNotifications
```

you can compose independent capabilities:

```text
User
 ├── authentication
 ├── permissions
 ├── notifications
 └── payments
```

This often produces code that is easier to change, test, and reuse.

---

# 1. The Core Idea

Suppose an application needs a user who can:

* log in
* receive notifications
* manage permissions

One approach is inheritance:

```text
User
  ↓
AuthenticatedUser
  ↓
AdminUser
  ↓
NotifiedAdminUser
```

As requirements grow, the inheritance hierarchy can become difficult to maintain.

Composition takes another approach:

```text
User
  +
Authentication
  +
Notifications
  +
Permissions
```

Each capability can be developed independently.

---

# 2. "Has-A" vs "Is-A"

A useful way to understand the difference is:

### Inheritance

Usually represents an **"is-a"** relationship.

```text
Admin is a User.
```

Therefore:

```js
class Admin extends User {}
```

### Composition

Usually represents a **"has-a"** or **"uses-a"** relationship.

```text
User has authentication.
User has permissions.
User uses notifications.
```

Therefore:

```js
const user = {
  authentication,
  permissions,
  notifications
};
```

This distinction is useful, but it is not an absolute rule.

---

# 3. Simple Composition Example

Start with small independent objects:

```js
const canLogin = {
  login() {
    return "Osama Abu Motlaq logged in";
  }
};

const canLogout = {
  logout() {
    return "Osama Abu Motlaq logged out";
  }
};
```

Now compose them:

```js
const user = {
  name: "Osama Abu Motlaq",
  ...canLogin,
  ...canLogout
};
```

The resulting object has:

```js
user.login();
user.logout();
```

The behavior was composed from smaller pieces.

---

# 4. Composition Through Functions

Composition does not require objects or classes.

Functions can be composed as well.

Consider:

```js
function addTax(price) {
  return price * 1.15;
}

function roundPrice(price) {
  return Math.round(price);
}
```

You can combine them:

```js
const finalPrice = roundPrice(addTax(100));

console.log(finalPrice);
// 115
```

The output of one function becomes the input of another.

Conceptually:

```text
price
  ↓
addTax()
  ↓
roundPrice()
  ↓
finalPrice
```

This is function composition.

---

# 5. Creating a Composition Function

You can create a reusable function that combines other functions:

```js
function compose(first, second) {
  return value => second(first(value));
}
```

Use it:

```js
const calculateFinalPrice = compose(
  addTax,
  roundPrice
);

console.log(calculateFinalPrice(100));
// 115
```

The important idea is:

```text
Small functions
      ↓
Combined behavior
      ↓
New functionality
```

---

# 6. Composition Through Object Factories

A factory function can compose capabilities.

```js
function createUser(name) {
  return {
    name,

    login() {
      return `${this.name} logged in`;
    },

    logout() {
      return `${this.name} logged out`;
    }
  };
}
```

Create an object:

```js
const user = createUser("Osama Abu Motlaq");
```

The factory creates an object by assembling its behavior.

---

# 7. Composing Separate Capabilities

Instead of placing everything in one large object:

```js
const authentication = {
  login() {
    return "Logged in";
  },

  logout() {
    return "Logged out";
  }
};

const notifications = {
  notify(message) {
    return `Notification: ${message}`;
  }
};

const permissions = {
  hasPermission(permission) {
    return permission === "admin";
  }
};
```

Compose them:

```js
const user = {
  name: "Osama Abu Motlaq",
  ...authentication,
  ...notifications,
  ...permissions
};
```

Now:

```js
user.login();

user.notify("Welcome");

user.hasPermission("admin");
```

The object received behavior from multiple independent pieces.

---

# 8. Composition vs Inheritance

Consider inheritance:

```js
class User {
  login() {
    return "Logged in";
  }
}

class Admin extends User {
  deleteUser() {
    return "User deleted";
  }
}
```

The relationship is:

```text
Admin
  ↓
User
```

The `Admin` class inherits behavior from `User`.

Composition:

```js
const authentication = {
  login() {
    return "Logged in";
  }
};

const administration = {
  deleteUser() {
    return "User deleted";
  }
};

const admin = {
  ...authentication,
  ...administration
};
```

Now:

```text
Admin
 ├── authentication behavior
 └── administration behavior
```

There is no parent-child inheritance relationship.

---

# 9. Why Composition Can Be More Flexible

Suppose you have:

```text
User
Admin
Moderator
Editor
Customer
SupportAgent
```

Inheritance might lead to many specialized classes.

Composition allows capabilities to be combined:

```text
Admin
 ├── authentication
 ├── permissions
 └── moderation

Editor
 ├── authentication
 └── contentEditing

SupportAgent
 ├── authentication
 ├── permissions
 └── support
```

Each object gets only the capabilities it needs.

---

# 10. The Problem With Deep Inheritance

Imagine:

```text
Person
  ↓
Employee
  ↓
Manager
  ↓
SeniorManager
  ↓
TechnicalManager
  ↓
TechnicalManagerWithBilling
```

A change high in the hierarchy can affect many subclasses.

You may also end up inheriting behavior that a subclass does not actually need.

This is one reason developers often prefer composition when relationships are primarily about capabilities rather than true specialization.

---

# 11. Composition Avoids Rigid Hierarchies

With composition:

```js
const authentication = {
  login() {
    return "Logged in";
  }
};

const payment = {
  pay(amount) {
    return `Paid ${amount}`;
  }
};

const notifications = {
  notify(message) {
    return message;
  }
};
```

You can build different objects:

```js
const customer = {
  ...authentication,
  ...payment
};

const supportAgent = {
  ...authentication,
  ...notifications
};
```

Each object gets different capabilities.

This is more flexible than forcing both objects into the same inheritance hierarchy.

---

# 12. Composition With Closures

Closures provide another powerful way to compose behavior.

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    getCount() {
      return count;
    }
  };
}
```

Create a counter:

```js
const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount());
// 2
```

The behavior and private state are composed together inside the factory.

The caller does not need a class.

---

# 13. Composition With Private State

Composition can also be used with classes.

```js
class User {
  #authentication;

  constructor(authentication) {
    this.#authentication = authentication;
  }

  login() {
    return this.#authentication.login();
  }
}
```

Provide a dependency:

```js
const authentication = {
  login() {
    return "Osama Abu Motlaq logged in";
  }
};
```

Create the user:

```js
const user = new User(authentication);
```

Now:

```js
user.login();
```

The `User` object uses another object to provide authentication behavior.

This is composition.

---

# 14. Composition and Dependency Injection

The previous example demonstrates **dependency injection**.

Instead of creating the authentication system internally:

```js
class User {
  constructor() {
    this.authentication = new Authentication();
  }
}
```

inject it:

```js
class User {
  constructor(authentication) {
    this.authentication = authentication;
  }
}
```

Now the dependency comes from outside.

This improves flexibility.

You can provide:

```text
ProductionAuthentication
TestAuthentication
MockAuthentication
```

as long as they provide the behavior the `User` needs.

---

# 15. Composition and Polymorphism

Composition and polymorphism work very well together.

Suppose a notification system expects:

```js
notification.send(message);
```

You could provide:

```js
const emailNotification = {
  send(message) {
    return `Email: ${message}`;
  }
};
```

Or:

```js
const smsNotification = {
  send(message) {
    return `SMS: ${message}`;
  }
};
```

A service can receive either:

```js
function notify(notification, message) {
  return notification.send(message);
}
```

This combines:

```text
Composition
→ inject notification behavior

Polymorphism
→ different objects implement send()
```

---

# 16. Composition Through Parameters

One of the simplest forms of composition is passing behavior as an argument.

```js
function processOrder(order, calculateTotal) {
  return calculateTotal(order);
}
```

Provide one implementation:

```js
function calculateTotal(order) {
  return order.items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

Use it:

```js
processOrder(order, calculateTotal);
```

The `processOrder()` function is composed with the calculation behavior.

---

# 17. Composition Through Higher-Order Functions

Higher-order functions are another form of composition.

```js
function withLogging(fn) {
  return (...args) => {
    console.log("Function called");

    return fn(...args);
  };
}
```

Create a function:

```js
function greet(name) {
  return `Hello, ${name}`;
}
```

Compose logging with it:

```js
const loggedGreet = withLogging(greet);
```

Now:

```js
loggedGreet("Osama Abu Motlaq");
```

The original behavior was enhanced by composing another behavior around it.

Conceptually:

```text
greet()
  +
logging
  ↓
loggedGreet()
```

---

# 18. Composition and Decorators

A decorator-style function can add behavior without modifying the original function.

```js
function withTiming(fn) {
  return (...args) => {
    const start = performance.now();

    const result = fn(...args);

    const end = performance.now();

    console.log(`Execution time: ${end - start}ms`);

    return result;
  };
}
```

Compose it:

```js
const timedFunction = withTiming(calculateTotal);
```

The original function remains unchanged.

This is a useful example of composition.

---

# 19. Composition in React

**Importance for learning React: Very High.**

Composition is one of the most important design concepts in modern React.

React strongly favors:

```text
Composition
```

over large inheritance hierarchies.

For example:

```jsx
function Card({ children }) {
  return (
    <section className="card">
      {children}
    </section>
  );
}
```

Use it:

```jsx
<Card>
  <h2>Projects</h2>
  <p>Osama Abu Motlaq's projects</p>
</Card>
```

The `Card` component provides structure.

The parent provides the content.

This is composition.

---

# 20. Composition With `children`

The `children` prop is one of React's clearest composition mechanisms.

Component:

```jsx
function Panel({ children }) {
  return (
    <div className="panel">
      {children}
    </div>
  );
}
```

Usage:

```jsx
<Panel>
  <h2>Profile</h2>
  <p>Osama Abu Motlaq</p>
</Panel>
```

The component does not need to know exactly what content it will contain.

It provides a reusable container.

Conceptually:

```text
Panel
  +
children
  ↓
Composed UI
```

---

# 21. Component Composition

Instead of creating one giant component:

```jsx
function Dashboard() {
  // hundreds of lines
}
```

you can compose smaller components:

```jsx
function Dashboard() {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </>
  );
}
```

The page is composed from smaller components.

```text
Dashboard
 ├── Header
 ├── Sidebar
 ├── MainContent
 └── Footer
```

Each component has a focused responsibility.

---

# 22. Composition vs Inheritance in React

React does not require class inheritance for component reuse.

Instead of:

```text
BaseComponent
    ↓
CardComponent
    ↓
SpecialCardComponent
```

you usually compose:

```jsx
<Card>
  <ProjectDetails />
</Card>
```

or:

```jsx
<Card>
  <ProjectImage />
  <ProjectInfo />
  <ProjectActions />
</Card>
```

This gives the parent control over the structure.

---

# 23. Compound Components

Composition can also produce compound components.

For example:

```jsx
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

Modal.Header = function Header({ children }) {
  return <header>{children}</header>;
};

Modal.Body = function Body({ children }) {
  return <main>{children}</main>;
};

Modal.Footer = function Footer({ children }) {
  return <footer>{children}</footer>;
};
```

Usage:

```jsx
<Modal>
  <Modal.Header>
    <h2>Project</h2>
  </Modal.Header>

  <Modal.Body>
    <p>Osama Abu Motlaq</p>
  </Modal.Body>

  <Modal.Footer>
    <button>Close</button>
  </Modal.Footer>
</Modal>
```

The interface is built through composition.

---

# 24. Composition With Custom Hooks

Custom hooks can also compose behavior.

For example:

```js
function useUserProfile() {
  const user = useUser();
  const permissions = usePermissions();

  return {
    user,
    permissions
  };
}
```

This hook composes multiple pieces of behavior:

```text
useUser()
     +
usePermissions()
     ↓
useUserProfile()
```

A component can consume the higher-level abstraction:

```js
const {
  user,
  permissions
} = useUserProfile();
```

This is extremely common in modern React applications.

---

# 25. Composition in Next.js

In a Next.js application, composition can exist at multiple levels.

For example:

```text
Page
 ├── Header
 ├── Navigation
 ├── ProjectList
 │    └── ProjectCard
 ├── ContactForm
 └── Footer
```

Each piece is composed into the page.

You can also compose application logic:

```text
Page
 ↓
Custom Hook
 ↓
Service
 ↓
Repository
 ↓
Supabase
```

For example:

```js
const projects = await projectService.getProjects();
```

The service may internally use a repository.

The repository may internally use Supabase.

Each layer composes with another layer without exposing every implementation detail to the UI.

---

# 26. Composition With Supabase

Suppose you have:

```js
const projectRepository = {
  async getProjects() {
    // Supabase query
  }
};
```

A service can use it:

```js
function createProjectService(repository) {
  return {
    async getProjects() {
      return repository.getProjects();
    }
  };
}
```

Create the service:

```js
const projectService = createProjectService(
  projectRepository
);
```

Now the application can use:

```js
const projects = await projectService.getProjects();
```

The service is composed with the repository.

The UI does not need to know the exact Supabase query.

---

# 27. Composition and Separation of Concerns

Composition works well when each piece has a focused responsibility.

For example:

```text
Authentication
→ handles authentication

Payment
→ handles payments

Notification
→ handles notifications

User
→ combines the required behavior
```

Instead of:

```text
Huge User class
→ authentication
→ payments
→ notifications
→ logging
→ database
→ email
→ analytics
```

Composition helps prevent classes and modules from becoming overly responsible.

---

# 28. Composition and Reusability

Suppose authentication is needed by:

```text
User
Admin
Moderator
SupportAgent
```

Instead of duplicating authentication code:

```js
const authentication = {
  login() {
    // Login logic
  },

  logout() {
    // Logout logic
  }
};
```

Different objects can use the same capability.

```js
const user = {
  ...authentication
};

const admin = {
  ...authentication
};
```

The behavior is reusable.

---

# 29. Composition and Testing

Composition can make testing easier because dependencies can be replaced.

Production:

```js
const realRepository = {
  async getUser(id) {
    // Real database operation
  }
};
```

Test:

```js
const fakeRepository = {
  async getUser(id) {
    return {
      id,
      name: "Osama Abu Motlaq"
    };
  }
};
```

Service:

```js
function createUserService(repository) {
  return {
    getUser(id) {
      return repository.getUser(id);
    }
  };
}
```

Testing:

```js
const userService = createUserService(
  fakeRepository
);
```

The service does not need a real database.

---

# 30. Composition and Loose Coupling

Composition often reduces coupling.

Tightly coupled:

```js
class UserService {
  constructor() {
    this.repository = new SupabaseRepository();
  }
}
```

The service knows the exact implementation.

Loosely coupled:

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }
}
```

Now the service only requires an object that provides the expected behavior.

This is easier to change.

---

# 31. Composition Does Not Mean "Use Spread Everywhere"

This is an important distinction.

This:

```js
const user = {
  ...authentication,
  ...notifications
};
```

is one way to compose objects.

But composition is a broader design concept.

You can compose using:

```text
functions
objects
classes
modules
components
hooks
dependencies
services
```

Therefore:

```text
Composition
≠ object spread
```

Object spread is merely one JavaScript mechanism that can implement composition.

---

# 32. Composition Through Modules

Modules naturally support composition.

Authentication module:

```js
export function login() {
  // Authentication logic
}
```

Notification module:

```js
export function notify(message) {
  // Notification logic
}
```

Another module can compose them:

```js
import { login } from "./authentication.js";
import { notify } from "./notifications.js";

export function handleUser() {
  login();
  notify("Welcome");
}
```

The application combines independent modules into a larger behavior.

---

# 33. Composition and Immutability

Composition often works well with immutable data.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "developer"
};

const updatedUser = {
  ...user,
  role: "admin"
};
```

The original object is not modified.

The new object is composed from:

```text
existing properties
+
new/overridden properties
```

This pattern is especially common in React state updates.

---

# 34. Composition in React State

For an object state:

```js
const [user, setUser] = useState({
  name: "Osama Abu Motlaq",
  role: "developer"
});
```

You can update one property:

```js
setUser(previousUser => ({
  ...previousUser,
  role: "admin"
}));
```

The new state is composed from the previous state plus the changed property.

This is a practical example of composition through object spread.

---

# 35. Composition vs Inheritance: Practical Comparison

| Composition                         | Inheritance                            |
| ----------------------------------- | -------------------------------------- |
| Combines independent pieces         | Creates parent-child relationships     |
| Often more flexible                 | Often more rigid                       |
| Promotes reuse through capabilities | Promotes reuse through hierarchy       |
| Usually reduces deep hierarchies    | Can create deep hierarchies            |
| Excellent for React                 | Less important in modern React         |
| Easy to replace dependencies        | Parent behavior can be tightly coupled |
| Works naturally with functions      | Commonly uses classes                  |
| Supports dependency injection well  | Often relies on `extends`              |

Neither is universally better.

The correct choice depends on the relationship and design requirements.

---

# 36. When Inheritance Makes Sense

Inheritance can still be appropriate.

For example:

```js
class Animal {
  move() {
    return "Moving";
  }
}

class Dog extends Animal {
  bark() {
    return "Woof";
  }
}
```

There is a meaningful conceptual relationship:

```text
Dog is an Animal.
```

Inheritance can be reasonable when:

* the relationship is genuinely hierarchical
* the child is a valid substitute for the parent
* shared behavior is stable
* the hierarchy remains shallow
* overriding behavior is meaningful

Do not avoid inheritance simply because composition is popular.

---

# 37. When Composition Is Better

Composition is often preferable when:

* behavior is optional
* capabilities can be combined independently
* requirements change frequently
* objects need different combinations of behavior
* you want easy dependency replacement
* inheritance would create many subclasses
* you are building React components
* you want loosely coupled modules

A useful question is:

> **Can I combine these behaviors instead of creating another subclass?**

If yes, composition may be the better design.

---

# 38. The Composition Over Inheritance Principle

You will often hear:

> **Favor composition over inheritance.**

This does **not** mean:

> "Never use inheritance."

It means:

> When both approaches can solve the problem, composition often provides more flexibility and lower coupling.

For example, instead of:

```text
User
 ↓
AdminUser
 ↓
PremiumAdminUser
 ↓
PremiumAdminUserWithNotifications
```

consider:

```text
User
 +
Admin permissions
 +
Premium features
 +
Notifications
```

The second design can often evolve more easily.

---

# 39. Composition and the Single Responsibility Principle

Composition works naturally with the **Single Responsibility Principle (SRP)**.

Instead of:

```js
class User {
  login() {}
  sendEmail() {}
  processPayment() {}
  saveToDatabase() {}
  generateReport() {}
}
```

you can separate responsibilities:

```text
Authentication
EmailService
PaymentService
UserRepository
ReportService
```

Then compose them where necessary.

This keeps individual units smaller and easier to reason about.

---

# 40. Common Mistake: Overusing Inheritance

Bad design:

```text
BaseComponent
    ↓
DataComponent
    ↓
UserComponent
    ↓
AdminUserComponent
    ↓
SpecialAdminComponent
```

If the subclasses exist only to combine unrelated behaviors, composition may be better.

For example:

```text
authentication
permissions
data fetching
notifications
```

can often be composed rather than inherited.

---

# 41. Common Mistake: Creating Huge Composed Objects

Composition can also be abused.

For example:

```js
const user = {
  ...authentication,
  ...payments,
  ...notifications,
  ...analytics,
  ...database,
  ...logging,
  ...reports,
  ...settings
};
```

This may create an object with too many responsibilities.

Composition is not automatically good.

The individual pieces must still have clear responsibilities.

---

# 42. Common Mistake: Method Name Collisions

When using object spread:

```js
const first = {
  save() {
    return "First";
  }
};

const second = {
  save() {
    return "Second";
  }
};

const combined = {
  ...first,
  ...second
};
```

The second `save()` replaces the first.

Therefore:

```js
combined.save();
```

returns:

```text
Second
```

Be careful when composing objects with overlapping property names.

---

# 43. Common Mistake: Losing `this`

Composition using object spread can interact with `this`.

For example:

```js
const userMethods = {
  greet() {
    return `Hello, ${this.name}`;
  }
};

const user = {
  name: "Osama Abu Motlaq",
  ...userMethods
};
```

This works when called as:

```js
user.greet();
```

But extracting the method can lose the receiver:

```js
const greet = user.greet;

greet();
```

The behavior of `this` still follows JavaScript's normal function-call rules.

Composition does not change how `this` works.

---

# 44. Common Mistake: Confusing Composition With Duplication

This:

```js
const user = {
  login() {
    // duplicated login logic
  }
};

const admin = {
  login() {
    // same duplicated login logic
  }
};
```

is not good composition.

Better:

```js
const authentication = {
  login() {
    // Shared implementation
  }
};
```

Then reuse the capability.

Composition should encourage reusable behavior, not duplicate it.

---

# 45. A Complete JavaScript Example

Consider an application with authentication and notifications.

```js
const authentication = {
  login() {
    return `${this.name} logged in`;
  },

  logout() {
    return `${this.name} logged out`;
  }
};

const notifications = {
  notify(message) {
    return `${this.name}: ${message}`;
  }
};

const user = {
  name: "Osama Abu Motlaq",
  ...authentication,
  ...notifications
};
```

Use it:

```js
console.log(user.login());
// Osama Abu Motlaq logged in

console.log(user.notify("Welcome"));
// Osama Abu Motlaq: Welcome

console.log(user.logout());
// Osama Abu Motlaq logged out
```

The final object was created by composing independent capabilities.

---

# 46. A More Scalable Example

Instead of sharing plain objects, you can create factories.

```js
function createAuthentication() {
  return {
    login() {
      return `${this.name} logged in`;
    },

    logout() {
      return `${this.name} logged out`;
    }
  };
}

function createNotifications() {
  return {
    notify(message) {
      return `${this.name}: ${message}`;
    }
  };
}
```

Compose:

```js
function createUser(name) {
  return {
    name,
    ...createAuthentication(),
    ...createNotifications()
  };
}
```

Use:

```js
const user = createUser("Osama Abu Motlaq");
```

Now:

```js
user.login();
user.notify("Welcome");
user.logout();
```

This is composition through factories.

---

# 47. Composition Through Classes

Composition is not limited to functional programming.

```js
class Authentication {
  login() {
    return "Logged in";
  }
}

class User {
  constructor(authentication) {
    this.authentication = authentication;
  }

  login() {
    return this.authentication.login();
  }
}
```

Compose:

```js
const authentication = new Authentication();

const user = new User(authentication);
```

Now:

```js
user.login();
```

The `User` object **has an** `Authentication` object.

That is composition.

---

# 48. Mental Model

Think about inheritance as:

```text
Parent
  ↓
Child
  ↓
Grandchild
```

Behavior comes through the hierarchy.

Think about composition as:

```text
       Authentication
             +
       Notifications
             +
         Payments
             ↓
           User
```

Behavior comes from combining independent pieces.

The central question changes from:

```text
"What class should this extend?"
```

to:

```text
"What capabilities does this object need?"
```

That is the key mental shift.

---

# 49. Composition in Modern JavaScript

Modern JavaScript applications commonly use composition through:

```text
Functions
Modules
Closures
Factory functions
Dependency injection
Higher-order functions
Objects
Classes
React components
Custom hooks
Services
Repositories
```

You do not need an OOP hierarchy to build sophisticated software.

Composition is one of the reasons JavaScript can support both object-oriented and functional design styles.

---

# 50. React Mental Model

For React, remember:

```text
Component
    +
Component
    +
Component
    ↓
Page
```

And:

```text
Hook
    +
Hook
    ↓
Custom Hook
```

And:

```text
Service
    +
Repository
    ↓
Application Logic
```

React especially encourages building larger systems from smaller pieces.

For example:

```jsx
function ProjectPage() {
  return (
    <>
      <Header />
      <ProjectDetails />
      <ProjectTechnologies />
      <ProjectLinks />
      <Footer />
    </>
  );
}
```

The page is not inheriting from these components.

It is **composing** them.

---

# 51. Quick Reference

| Technique                | Example                           |
| ------------------------ | --------------------------------- |
| Object composition       | `{ ...a, ...b }`                  |
| Function composition     | `f(g(value))`                     |
| Component composition    | `<Card><Content /></Card>`        |
| Dependency composition   | `new Service(repository)`         |
| Hook composition         | `useA()` + `useB()`               |
| Module composition       | Import multiple modules           |
| Closure composition      | Factory returns combined behavior |
| Higher-order composition | `withLogging(fn)`                 |

---

# 52. Composition vs Inheritance Mental Model

```text
INHERITANCE

        Parent
          ↓
        Child
          ↓
      Specialized
```

Reuse comes from the hierarchy.

```text
COMPOSITION

   Behavior A
       +
   Behavior B
       +
   Behavior C
       ↓
     Object
```

Reuse comes from combining independent capabilities.

---

# 53. Key Takeaways

1. **Composition builds complex behavior by combining smaller pieces.**
2. Composition is broader than object spread.
3. Composition can use functions, objects, modules, classes, hooks, and components.
4. Inheritance represents a parent-child relationship.
5. Composition often represents a "has-a" or "uses-a" relationship.
6. Composition can reduce coupling and avoid deep inheritance hierarchies.
7. Dependency injection is a common way to implement composition.
8. Composition works especially well with polymorphism.
9. JavaScript supports composition naturally because functions are first-class values.
10. React strongly favors composition over inheritance.
11. `children` is one of the most important composition mechanisms in React.
12. Custom hooks compose reusable behavior.
13. Services and repositories can be composed in full-stack JavaScript applications.
14. Composition does not automatically mean good design; each piece still needs a clear responsibility.
15. "Favor composition over inheritance" means prefer composition when it provides a more flexible and maintainable design, not that inheritance should never be used.
16. The most useful question is often:
    **"What capabilities does this object or component need?"**

---

## React Relevance

**Importance for learning React: Very High.**

For modern React development, composition is substantially more important than classical inheritance.

You should be comfortable with:

```text
Components
    ↓
children
    ↓
Props
    ↓
Custom Hooks
    ↓
Reusable Functions
    ↓
Composition
```

For your React → Next.js path, this concept is directly applicable to building reusable UI components and organizing application logic.

---

## Next Topic

Continue with:

**`17-oop-best-practices.md`**

This final OOP file will bring together the concepts from the entire OOP section and focus on practical design decisions, common mistakes, maintainability, and when OOP is actually useful in modern JavaScript.
