# Objects and Data Structures

## Overview

JavaScript provides several built-in data structures for representing, organizing, and manipulating information.

The most commonly used are:

```text
Objects
Arrays
Maps
Sets
WeakMaps
WeakSets
Strings
Dates
Typed Arrays
```

Good data-structure choices make code easier to understand, maintain, and optimize.

Poor choices can create unnecessary complexity.

The goal is not to use the most advanced data structure.

The goal is to choose the simplest structure that accurately represents the data and supports the operations the application needs.

---

# Choose Data Structures Based on the Data

Start with the question:

```text
What does this data represent?
```

Then consider:

```text
How will it be accessed?
How will it be updated?
Does order matter?
Can values repeat?
Do keys exist?
Does identity matter?
Is fast lookup important?
Should the data be shared?
Should the data be mutable?
```

For example:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

represents one entity.

While:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
];
```

represents a collection.

---

# Use Objects for Structured Records

Objects are appropriate when multiple named properties describe one conceptual entity.

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

The object communicates the relationship between the fields.

---

# Avoid Using Arrays as Records

Avoid encoding unrelated properties by position:

```js
const user = [
  1,
  "Osama Abu Motlaq",
  "Frontend Developer",
];
```

The meaning of each index is implicit.

Prefer:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

The property names make the structure explicit.

---

# Use Arrays for Ordered Collections

Arrays are appropriate when the data represents a sequence.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];
```

Arrays preserve order and provide methods for processing collections.

---

# Use Plural Names for Collections

Prefer:

```js
const users = [];
const projects = [];
const skills = [];
```

instead of:

```js
const user = [];
const project = [];
const skill = [];
```

The name should communicate that multiple values are stored.

---

# Do Not Use Objects When Order Is the Main Concern

An object can contain multiple properties:

```js
const priorities = {
  low: 1,
  medium: 2,
  high: 3,
};
```

But if the primary concept is a sequence:

```js
const priorities = [
  "low",
  "medium",
  "high",
];
```

an array is more directly representative.

Choose the structure based on the semantic model.

---

# Objects and Arrays Represent Different Concepts

Compare:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

with:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
];
```

The first represents an entity.

The second represents a collection of entities.

This distinction should remain clear throughout the application.

---

# Avoid Overloading One Structure

Do not make one object represent unrelated concepts:

```js
const application = {
  user: {},
  theme: "dark",
  totalPrice: 100,
  isOnline: true,
  databaseConnection: {},
  notificationQueue: [],
};
```

A single object can technically contain anything.

That does not mean it should.

Group related concepts into appropriate structures.

---

# Keep Objects Cohesive

Good:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
};
```

The fields describe one conceptual entity.

Less cohesive:

```js
const user = {
  name: "Osama Abu Motlaq",
  theme: "dark",
  retryCount: 3,
  viewportWidth: 1366,
};
```

These values belong to different concerns.

---

# Normalize Related Data

Avoid duplicating the same entity unnecessarily.

Weak:

```js
const orders = [
  {
    id: 1,
    user: {
      id: 10,
      name: "Osama Abu Motlaq",
    },
  },
  {
    id: 2,
    user: {
      id: 10,
      name: "Osama Abu Motlaq",
    },
  },
];
```

The same user data is duplicated.

Depending on the application, a normalized representation may be clearer:

```js
const users = {
  10: {
    id: 10,
    name: "Osama Abu Motlaq",
  },
};

const orders = [
  {
    id: 1,
    userId: 10,
  },
  {
    id: 2,
    userId: 10,
  },
];
```

Normalization can reduce duplication and make updates more predictable.

---

# Do Not Normalize Everything

Normalization also introduces relationships that must be resolved:

```js
order.userId
```

must be looked up in:

```js
users
```

For small local data, nested objects may be simpler.

Choose normalization when duplication or update complexity actually justifies it.

---

# Use Maps for Keyed Collections

Objects can be used as lookup tables:

```js
const usersById = {
  1: {
    name: "Osama Abu Motlaq",
  },
};
```

But `Map` is often a better representation when the primary abstraction is a collection of key-value pairs.

```js
const usersById = new Map();

usersById.set(
  1,
  {
    name: "Osama Abu Motlaq",
  }
);
```

---

# When to Prefer `Map`

`Map` is useful when you need:

```text
Arbitrary key types
Explicit key-value semantics
Frequent insertion and deletion
Reliable iteration behavior
A collection specifically organized by keys
```

Example:

```js
const userCache = new Map();

userCache.set(
  1,
  {
    name: "Osama Abu Motlaq",
  }
);
```

---

# Use Objects for Records, Maps for Keyed Collections

A useful distinction is:

```text
Object:
Describe a thing.

Map:
Store relationships between keys and values.
```

For example:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

describes one user.

While:

```js
const usersById = new Map();
```

organizes users by identifier.

---

# Avoid Using `Map` for Every Object

This can become unnecessary:

```js
const user = new Map();

user.set("id", 1);
user.set(
  "name",
  "Osama Abu Motlaq"
);
```

If the structure represents one fixed record, an object is usually clearer:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

Use the data structure that communicates the concept directly.

---

# Sets for Unique Values

Use `Set` when uniqueness is part of the data model.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "JavaScript",
]);
```

The resulting set contains:

```text
JavaScript
React
```

Duplicate values are not retained.

---

# Avoid Arrays When Uniqueness Is the Main Rule

An array allows duplicates:

```js
const skills = [
  "JavaScript",
  "React",
  "JavaScript",
];
```

A `Set` directly represents uniqueness:

```js
const skills = new Set([
  "JavaScript",
  "React",
  "JavaScript",
]);
```

The structure itself enforces the rule.

---

# Use Arrays When Order and Duplicates Matter

An array is better when:

```text
Order matters
Duplicates are meaningful
Index-based access matters
Array-specific operations are useful
```

Example:

```js
const queue = [
  "task-a",
  "task-b",
  "task-a",
];
```

Here duplicate values may be meaningful.

---

# Converting Between Arrays and Sets

You can remove duplicates with:

```js
const uniqueSkills = [
  ...new Set(skills),
];
```

But do not use this automatically.

If duplicates have semantic meaning, removing them changes the data model.

---

# Object Property Access

Prefer direct property access when the property name is known:

```js
console.log(user.name);
```

Use bracket notation when the property is dynamic:

```js
const field = "name";

console.log(user[field]);
```

Do not use bracket notation unnecessarily.

---

# Dot Notation Is Usually Clearer

Prefer:

```js
user.name;
user.email;
user.role;
```

over:

```js
user["name"];
user["email"];
user["role"];
```

when the property names are static.

---

# Computed Property Names

Bracket notation is appropriate when constructing dynamic properties:

```js
const field = "role";

const user = {
  name: "Osama Abu Motlaq",
  [field]: "Frontend Developer",
};
```

The property name is determined dynamically.

---

# Avoid Dynamic Properties When They Hide Structure

This:

```js
const object = {};

object[field1] = value1;
object[field2] = value2;
object[field3] = value3;
```

may be reasonable for genuinely dynamic data.

But for a fixed domain model:

```js
const user = {
  name,
  email,
  role,
};
```

is usually clearer.

---

# Property Existence

Do not confuse a missing property with a property containing `undefined`.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

user.role;
```

returns:

```text
undefined
```

But that does not tell you whether the property exists.

When existence itself matters, use:

```js
Object.has(user, "role");
```

---

# Avoid Checking Properties With Unrelated Truthiness

This:

```js
if (user.role) {
  // ...
}
```

checks whether the value is truthy.

It does not specifically test whether the property exists.

When the question is property existence, make that intention explicit.

---

# Object Shapes Should Remain Predictable

Prefer records with a consistent shape:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  },
  {
    id: 2,
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  },
];
```

Avoid collections where every object has a completely different structure unless the domain genuinely requires it.

---

# Avoid Inconsistent Object Shapes

Weak:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
  {
    id: 2,
    role: "Frontend Developer",
  },
  {
    email: "osama@example.com",
  },
];
```

Consumers now need many defensive checks.

Prefer a stable structure when the entities represent the same concept.

---

# Use `null` Intentionally

`null` is useful when a value is intentionally absent.

```js
const selectedUser = null;
const error = null;
```

This can communicate:

```text
The value is known to be absent.
```

Do not use `null` randomly when `undefined` already accurately represents the state.

---

# Avoid Meaningless `null` Values

Weak:

```js
const user = {
  name: null,
  role: null,
  email: null,
  address: null,
};
```

if the application does not distinguish between:

```text
Missing
Unknown
Not applicable
Not loaded
Intentionally empty
```

Model those states intentionally.

---

# Use Explicit State Models When Necessary

Instead of:

```js
const user = null;
```

for several unrelated situations, application state may need:

```js
const state = {
  status: "loading",
  data: null,
  error: null,
};
```

This is often clearer than overloading `null` with many meanings.

---

# Discriminated State Objects

A state model can be explicit:

```js
const state = {
  status: "success",
  data: user,
  error: null,
};
```

or:

```js
const state = {
  status: "error",
  data: null,
  error: new Error(
    "Failed to load user."
  ),
};
```

The `status` property communicates which interpretation is valid.

---

# Avoid Impossible States

Weak:

```js
const state = {
  isLoading: true,
  isSuccess: true,
  isError: true,
};
```

This allows contradictory combinations.

A better model:

```js
const state = {
  status: "loading",
};
```

or:

```js
const state = {
  status: "success",
  data: user,
};
```

One explicit status can eliminate invalid combinations.

---

# Arrays of Objects

When working with collections:

```js
const projects = [
  {
    id: 1,
    name: "Portfolio",
  },
  {
    id: 2,
    name: "E-Commerce",
  },
];
```

Keep each object cohesive.

Avoid packing unrelated global state into individual elements.

---

# Stable Identifiers

Collections of entities should usually have stable identifiers:

```js
const projects = [
  {
    id: 1,
    name: "Portfolio",
  },
  {
    id: 2,
    name: "E-Commerce",
  },
];
```

The identifier can be used for lookup and updates.

---

# Do Not Use Array Position as Identity

Avoid treating:

```js
projects[0]
```

as the identity of a project.

Array positions change when items are inserted or removed.

Prefer:

```js
projects.find(
  (project) =>
    project.id === projectId
);
```

when identity matters.

---

# Arrays as Ordered Data

Array order can represent:

```text
Display order
Priority
Sequence
History
Queue position
Rank
```

Do not accidentally reorder arrays if their ordering has meaning.

---

# Sorting Mutates Arrays

Remember:

```js
users.sort(compareUsers);
```

mutates `users`.

When preserving the original is important:

```js
const sortedUsers =
  [...users].sort(
    compareUsers
  );
```

Or:

```js
const sortedUsers =
  users.toSorted(
    compareUsers
  );
```

when supported by the runtime.

---

# Reversing Mutates Arrays

`reverse()` also mutates:

```js
users.reverse();
```

Non-mutating alternatives include:

```js
const reversedUsers =
  [...users].reverse();
```

or:

```js
const reversedUsers =
  users.toReversed();
```

when supported.

---

# Avoid Mutating Shared Array State

Weak:

```js
function addProject(projects, project) {
  projects.push(project);
}
```

Prefer:

```js
function addProject(projects, project) {
  return [
    ...projects,
    project,
  ];
}
```

when the caller expects the original array to remain unchanged.

---

# Map for Transformation, Not Side Effects

`map()` is designed to produce a new array:

```js
const names =
  users.map(
    (user) => user.name
  );
```

Avoid using `map()` solely for side effects:

```js
users.map(
  (user) => console.log(user.name)
);
```

Use `forEach()` when producing a side effect is the actual purpose:

```js
users.forEach(
  (user) => console.log(user.name)
);
```

---

# Filter for Selection

Use `filter()` when the operation means:

```text
Keep some elements.
```

Example:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

Do not use `filter()` for unrelated side effects.

---

# Find for One Result

When you need one matching element:

```js
const user =
  users.find(
    (user) =>
      user.id === userId
  );
```

This communicates that one result is expected.

---

# Avoid Filtering When You Need One Item

Weak:

```js
const matchingUsers =
  users.filter(
    (user) =>
      user.id === userId
  );

const user =
  matchingUsers[0];
```

Prefer:

```js
const user =
  users.find(
    (user) =>
      user.id === userId
  );
```

The latter expresses the actual intent.

---

# Some and Every

Use `some()` when asking:

```text
Does at least one item match?
```

Example:

```js
const hasAdmin =
  users.some(
    (user) =>
      user.role === "admin"
  );
```

Use `every()` when asking:

```text
Do all items match?
```

Example:

```js
const allActive =
  users.every(
    (user) => user.isActive
  );
```

The method communicates the operation directly.

---

# Reduce Carefully

`reduce()` can be powerful:

```js
const total =
  prices.reduce(
    (sum, price) =>
      sum + price,
    0
  );
```

But avoid using `reduce()` when another array method communicates the intent more clearly.

---

# Do Not Use `reduce()` for Everything

Weak:

```js
const activeUsers =
  users.reduce(
    (result, user) => {
      if (user.isActive) {
        result.push(user);
      }

      return result;
    },
    []
  );
```

Prefer:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

The second form directly communicates the operation.

---

# Grouping Data With Reduce

`reduce()` can be appropriate when building a new structure:

```js
const usersByRole =
  users.reduce(
    (result, user) => {
      const role =
        user.role;

      if (!result[role]) {
        result[role] = [];
      }

      result[role].push(user);

      return result;
    },
    {}
  );
```

Here `reduce()` expresses a real aggregation.

---

# Prefer `Map` When Grouping by Arbitrary Keys

Grouping with `Map` can be useful when keys are not naturally object property names.

```js
const usersByRole =
  users.reduce(
    (result, user) => {
      if (!result.has(user.role)) {
        result.set(
          user.role,
          []
        );
      }

      result
        .get(user.role)
        .push(user);

      return result;
    },
    new Map()
  );
```

Choose the structure that matches the lookup model.

---

# Avoid Using Object Keys for Arbitrary Objects

Consider:

```js
const cache = {};

cache[user] = data;
```

The object is converted into a property key, which is usually not what you want.

If object identity should be the key, use `Map`:

```js
const cache = new Map();

cache.set(user, data);
```

---

# Maps Preserve Key Identity

With:

```js
const key = {};

const map = new Map();

map.set(
  key,
  "value"
);
```

you can later retrieve it using the same object:

```js
map.get(key);
```

This is different from object property keys.

---

# Use `WeakMap` for Object-Associated Metadata

`WeakMap` is useful when metadata should be associated with an object without preventing that object from being garbage collected.

```js
const metadata =
  new WeakMap();

const user = {
  name: "Osama Abu Motlaq",
};

metadata.set(
  user,
  {
    lastAccessed: Date.now(),
  }
);
```

Use `WeakMap` when its specific semantics are valuable.

Do not replace every `Map` with a `WeakMap`.

---

# Use `WeakSet` for Object Membership

`WeakSet` can track object membership without keeping those objects strongly reachable.

```js
const processedUsers =
  new WeakSet();

const user = {
  name: "Osama Abu Motlaq",
};

processedUsers.add(user);
```

Again, this is a specialized tool.

Use it when lifecycle behavior matters.

---

# Data Structures and Memory

Every data structure has memory implications.

For example:

```text
Array
→ ordered collection

Object
→ structured record

Map
→ keyed collection

Set
→ unique collection
```

Choose structures based on semantics first.

Optimize memory after measuring real problems.

---

# Avoid Premature Data Optimization

Do not replace:

```js
const users = [];
```

with an advanced indexing system before there is a demonstrated need.

A straightforward structure is often easier to maintain.

Optimize when:

```text
Data size is large
Lookups are frequent
Performance has been measured
Memory pressure is real
```

---

# Data Structure and Access Pattern

Think about how data will be accessed.

If you frequently need:

```js
users.find(
  (user) =>
    user.id === userId
);
```

for a large collection, a keyed structure may be more appropriate:

```js
const usersById =
  new Map();
```

Then:

```js
usersById.get(userId);
```

The right structure depends on workload.

---

# Dual Representations

Sometimes an application legitimately needs both:

```js
const users = [];
const usersById = new Map();
```

The array may provide ordered rendering.

The map may provide fast direct lookup.

However, maintaining two representations introduces synchronization complexity.

Use this only when the access patterns justify it.

---

# Avoid Duplicate Sources of Truth

If both:

```js
const users = [...];
const usersById = new Map(...);
```

exist, define clearly which one is authoritative.

Otherwise they can become inconsistent:

```text
users:
User 1

usersById:
User 2
```

Multiple representations should have controlled synchronization.

---

# Normalized State

For larger application state, normalized structures can reduce duplication:

```js
const state = {
  usersById: {
    1: {
      id: 1,
      name: "Osama Abu Motlaq",
    },
  },

  projectIds: [
    1,
    2,
  ],
};
```

This can be useful when entities are frequently shared or updated.

It is unnecessary for every small project.

---

# Avoid Deeply Nested State Without a Reason

Weak:

```js
const application = {
  company: {
    team: {
      department: {
        manager: {
          profile: {
            address: {
              city: "Gaza",
            },
          },
        },
      },
    },
  },
};
```

Deep structures can make access and updates cumbersome.

If the domain naturally requires nesting, keep it.

Otherwise, reconsider the model.

---

# Flatten When It Improves Ownership

Instead of:

```js
const profile = {
  user: {
    account: {
      preferences: {
        theme: "dark",
      },
    },
  },
};
```

a flatter structure may sometimes be easier:

```js
const profile = {
  userId: 1,
  theme: "dark",
};
```

Do not flatten data simply because flat data is fashionable.

Preserve meaningful domain relationships.

---

# Data Shape Should Reflect Domain Rules

Suppose an order must belong to a user.

A useful shape:

```js
const order = {
  id: 1,
  userId: 10,
  items: [],
};
```

The relationship is explicit.

The data structure itself communicates the model.

---

# Avoid Primitive Obsession When Structure Matters

Weak:

```js
const userId = 1;
const userName = "Osama Abu Motlaq";
const userRole = "Frontend Developer";
```

There are contexts where separate variables are fine.

But when these values consistently travel together, an object may better represent the concept:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

---

# Do Not Create Objects Just to Group Everything

The opposite mistake is unnecessary nesting:

```js
const values = {
  user: {
    name: "Osama Abu Motlaq",
  },
};
```

when the only useful value is:

```js
const userName =
  "Osama Abu Motlaq";
```

Use a structure when the relationship between values matters.

---

# Use Records for Fixed Shape

A record-like object works well when the keys are known:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

The shape is stable.

---

# Use Dictionaries for Dynamic Keys

When keys are generated dynamically:

```js
const usersById = {
  1: {
    name: "Osama Abu Motlaq",
  },
  2: {
    name: "Osama Abu Motlaq",
  },
};
```

an object can act as a dictionary.

For richer keyed collection semantics, consider `Map`.

---

# Prototype Safety

Be careful when using objects as dictionaries.

Modern JavaScript provides:

```js
Object.create(null);
```

to create an object without the normal object prototype:

```js
const dictionary =
  Object.create(null);

dictionary.admin = true;
```

This can be useful for specialized dictionary scenarios.

Do not use it without understanding the behavioral differences from normal objects.

---

# Avoid Using `{}` as a Universal Dictionary

Although this is common:

```js
const dictionary = {};
```

an object has inherited prototype behavior.

For many ordinary application cases this is fine.

For specialized key-value dictionaries, `Map` or a prototype-less object may be more appropriate.

---

# Serialization Considerations

Not every JavaScript data structure serializes identically.

For example:

```js
JSON.stringify({
  user: {
    name: "Osama Abu Motlaq",
  },
});
```

works naturally for plain objects.

But:

```js
JSON.stringify(
  new Map([
    ["id", 1],
  ])
);
```

does not produce the same structure you might expect from an object.

Choose data structures with persistence and transport requirements in mind.

---

# Data Structures at API Boundaries

Network APIs commonly use JSON-friendly structures:

```js
const payload = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Keep specialized internal structures:

```js
Map
Set
WeakMap
```

inside the application unless they are converted intentionally.

---

# Do Not Leak Internal Data Structures

A module can hide its internal representation.

For example:

```js
class UserStore {
  #users = new Map();

  getUser(id) {
    return this.#users.get(id);
  }
}
```

Consumers do not need to know that a `Map` is used internally.

This allows the implementation to change later.

---

# Expose the Operation, Not the Storage

Prefer:

```js
store.getUser(userId);
```

over:

```js
store.usersById.get(userId);
```

The first gives the module control over its implementation.

---

# Data Structures and Immutability

When shared data should not be mutated, use immutable update patterns.

For objects:

```js
const updatedUser = {
  ...user,
  role: "Frontend Developer",
};
```

For arrays:

```js
const updatedUsers = [
  ...users,
  newUser,
];
```

For `Map`, create a new map when reference immutability is important:

```js
const updatedUsers =
  new Map(users);

updatedUsers.set(
  userId,
  updatedUser
);
```

---

# Do Not Clone Data Automatically

This:

```js
const copiedData =
  structuredClone(data);
```

is not always an improvement.

Cloning can:

```text
Increase memory usage
Increase CPU work
Break object identity
Hide ownership problems
```

Clone when an independent copy is actually required.

---

# Use the Smallest Useful Structure

If you need one value:

```js
const userName =
  "Osama Abu Motlaq";
```

Do not create:

```js
const user = {
  profile: {
    identity: {
      name: "Osama Abu Motlaq",
    },
  },
};
```

Use structures when relationships or behavior justify them.

---

# Avoid Heterogeneous Arrays Unless Intentional

Weak:

```js
const values = [
  "Osama Abu Motlaq",
  25,
  true,
  {
    role: "Frontend Developer",
  },
];
```

The array has no obvious model.

Heterogeneous arrays can be valid for specific protocols or tuples.

But ordinary application collections usually benefit from consistent element shapes.

---

# Prefer Consistent Collection Elements

Good:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
  {
    id: 2,
    name: "Osama Abu Motlaq",
  },
];
```

Every element follows the same conceptual structure.

---

# Represent Optional Fields Carefully

If a property is genuinely optional:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

Consumers should know that:

```js
user.avatar
```

may be absent.

Do not add dozens of empty properties simply to make the object appear complete.

---

# Distinguish Missing and Empty

These values communicate different things:

```js
const user = {};

const userWithRole = {
  role: "",
};

const userWithoutRole = {
  role: null,
};
```

The application should define what each representation means.

Avoid inconsistent use of:

```text
undefined
null
""
[]
{}
```

for the same state.

---

# Data Validation at Boundaries

When data enters the system from:

```text
User input
Network responses
Files
Local storage
External libraries
```

validate its structure before relying on it.

For example:

```js
function isUser(value) {
  return (
    value &&
    typeof value.id === "number" &&
    typeof value.name === "string"
  );
}
```

The exact validation strategy depends on the application.

---

# Do Not Validate the Same Structure Everywhere

Once a boundary establishes a trusted shape, downstream code should not repeatedly reconstruct the same validation logic.

Centralize validation where practical.

---

# Defensive Data Access

Optional chaining can be useful when data is genuinely optional:

```js
const city =
  user?.profile?.address?.city;
```

But avoid using optional chaining everywhere simply to avoid understanding the expected data shape.

If the data should always exist, an unexpected `undefined` may indicate a bug.

---

# Data Structure and API Design

The structure returned by a function should be predictable.

Compare:

```js
findUser();
```

returning:

```text
User
```

or:

```text
null
```

versus sometimes returning:

```text
false
[]
{}
null
```

depending on the situation.

Consistent data contracts make consumers simpler.

---

# Avoid Returning Inconsistent Collection Types

Do not make a function sometimes return:

```text
Array
```

and sometimes:

```text
Map
```

unless that distinction is part of the explicit API contract.

Prefer one predictable representation.

---

# Data Structure and Error Results

For operations that produce data plus errors, use a deliberate structure:

```js
const result = {
  data: user,
  error: null,
};
```

or throw/reject an error.

Do not mix unrelated representations randomly.

---

# Readability Over Cleverness

This:

```js
const uniqueNames = [
  ...new Set(
    users.map(
      (user) => user.name
    )
  ),
];
```

is compact and reasonable.

But if the operation becomes more complex, intermediate variables may be clearer:

```js
const names =
  users.map(
    (user) => user.name
  );

const uniqueNames = [
  ...new Set(names),
];
```

Prefer the form that makes the transformation easiest to understand.

---

# Data Transformation Pipelines

A useful pipeline can look like:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );

const names =
  activeUsers.map(
    (user) => user.name
  );

const uniqueNames = [
  ...new Set(names),
];
```

Each step has one clear responsibility.

---

# Do Not Over-Chain Everything

This:

```js
const result =
  users
    .filter(...)
    .map(...)
    .filter(...)
    .sort(...)
    .map(...)
    .reduce(...);
```

may be elegant for simple transformations.

For complex transformations, explicit stages can improve:

```text
Debugging
Readability
Testing
Maintenance
```

---

# Data Structures and Functions

Functions should operate at the appropriate abstraction level.

Instead of exposing:

```js
usersById.get(userId);
```

throughout the application:

```js
const user =
  userStore.getUser(userId);
```

This keeps the data structure behind the module boundary.

---

# Favor Stable Interfaces

If consumers depend directly on:

```js
usersById.get(userId);
```

changing from `Map` to another structure becomes difficult.

If consumers depend on:

```js
userStore.getUser(userId);
```

the internal representation can change more easily.

---

# Avoid Deeply Coupled Structures

This:

```js
order.customer.account.profile.address.city
```

creates strong coupling to the exact structure.

Sometimes the domain genuinely requires this relationship.

But repeated deep traversal can indicate that a better abstraction is needed.

---

# Domain Methods Can Simplify Data Access

Instead of:

```js
const city =
  user.profile.address.city;
```

a domain-oriented API could expose:

```js
const city =
  user.getCity();
```

This can hide structural details when the concept itself has meaning.

Do not create methods solely to hide one property access.

---

# Data Classes vs Plain Objects

Plain objects are often sufficient:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
};
```

A class may be useful when the object needs:

```text
Behavior
Encapsulation
Invariants
Private state
Prototype-based methods
```

Do not convert every data object into a class.

---

# Prefer Plain Data for Plain Data

If the structure only stores values:

```js
const project = {
  id: 1,
  name: "Portfolio",
  status: "active",
};
```

a plain object is often simpler than:

```js
class Project {
  // ...
}
```

Use classes when behavior or encapsulation provides actual value.

---

# Avoid Mixing Data and Unrelated Behavior

A plain object should not become a dumping ground for random methods:

```js
const user = {
  name: "Osama Abu Motlaq",

  calculateServerRetryDelay() {
    // unrelated responsibility
  },
};
```

Methods should belong to the conceptual object.

---

# Data Structures Should Match Mutation Patterns

If data is frequently updated by ID:

```text
Map or keyed object
```

may be useful.

If data is mainly rendered in order:

```text
Array
```

may be better.

If data must be unique:

```text
Set
```

may be ideal.

The update pattern is as important as the storage representation.

---

# Frequently Accessed Data

Consider access complexity when data grows.

For example:

```js
users.find(
  (user) => user.id === userId
);
```

requires searching the collection.

A keyed structure provides direct key lookup:

```js
usersById.get(userId);
```

For large collections with frequent keyed access, this distinction can matter.

Do not optimize without evidence.

---

# Avoid Premature Indexing

You do not need multiple indexes for a collection of ten users.

Keep the representation simple until access patterns justify additional structures.

Complex indexing increases synchronization and maintenance costs.

---

# Data Structure Ownership

Define who owns the collection.

For example:

```js
class UserStore {
  #users = new Map();

  addUser(user) {
    this.#users.set(
      user.id,
      user
    );
  }

  getUser(id) {
    return this.#users.get(id);
  }
}
```

The store owns the map.

Callers interact through the API rather than changing the structure directly.

---

# Avoid Exposing Mutable Collections

Weak:

```js
class UserStore {
  users = [];

  getUsers() {
    return this.users;
  }
}
```

The caller can mutate the internal state.

Prefer:

```js
class UserStore {
  #users = [];

  getUsers() {
    return [...this.#users];
  }
}
```

or provide specific query methods.

---

# Prefer Query Methods Over Exposing Storage

Instead of:

```js
store.users.filter(...);
```

prefer:

```js
store.getActiveUsers();
```

This gives the owner control over the implementation.

It also communicates intent more directly.

---

# Do Not Hide Complex Performance Characteristics

An abstraction should not make an important performance difference impossible to understand.

For example:

```js
store.getUser(id);
```

may internally use:

```text
Map lookup
```

or:

```text
Linear array search
```

For most application code this should remain an implementation detail.

But performance-sensitive public APIs should document important guarantees when they matter.

---

# Object Property Ordering

Do not rely on object property order as the primary meaning of a data structure.

If order is semantically important, use an array or another structure explicitly designed for ordered data.

---

# Use Maps When Keys Are Not Strings

Objects fundamentally use property keys that are strings or symbols.

A `Map` can use values such as:

```js
const objectKey = {};

const map = new Map();

map.set(
  objectKey,
  "metadata"
);
```

The object itself remains the key.

This is one of the reasons `Map` exists.

---

# Sets and Object Identity

`Set` uses value identity semantics.

For objects:

```js
const userA = {};
const userB = {};

const users = new Set([
  userA,
]);

users.has(userA);
```

returns `true`.

But:

```js
users.has(userB);
```

returns `false`.

Even if the objects contain identical properties, they are different identities.

---

# Do Not Assume Sets Deduplicate Equivalent Objects

This:

```js
const users = new Set([
  { id: 1 },
  { id: 1 },
]);
```

contains two distinct objects.

`Set` does not automatically deduplicate objects based on their properties.

---

# Deduplicate Objects by a Meaningful Key

When uniqueness is based on an identifier:

```js
const usersById =
  new Map();

for (const user of users) {
  usersById.set(
    user.id,
    user
  );
}

const uniqueUsers = [
  ...usersById.values(),
];
```

The data structure matches the uniqueness rule.

---

# Data Structure and Search Semantics

Ask:

```text
What does "the same item" mean?
```

Possible answers:

```text
Same object identity
Same ID
Same name
Same normalized value
Same complete structure
```

The chosen data structure should reflect the actual identity rule.

---

# Data Structure and Equality

Objects use reference identity:

```js
{} === {};
```

is:

```text
false
```

Arrays work the same way:

```js
[] === [];
```

is:

```text
false
```

Do not expect structural equality from JavaScript's `===`.

---

# Avoid Using JSON Strings as Identity

A tempting approach is:

```js
const key =
  JSON.stringify(user);
```

to compare or deduplicate objects.

This can be fragile because:

```text
Property ordering
Unsupported values
Serialization rules
Performance
Semantic differences
```

can all affect the result.

Use an explicit identity key when possible.

---

# Data Structures and Security

Be careful with data coming from external sources.

Do not assume:

```js
const user =
  JSON.parse(input);
```

produces trusted data.

Validate the shape before using it.

---

# Prototype Pollution Concerns

When accepting arbitrary keys into plain objects, be conscious of prototype-related behavior.

For example:

```js
const target = {};

Object.assign(
  target,
  untrustedInput
);
```

may require careful security review depending on the application.

Prefer well-defined data schemas and safe object-handling patterns.

---

# Avoid `Object` as an Arbitrary Key-Value Container

Do not use objects as generic storage for unrelated data simply because they are convenient.

Prefer a structure whose semantics match the problem:

```text
Object → record
Array → ordered collection
Map → keyed collection
Set → unique collection
WeakMap → object-associated metadata
WeakSet → object membership
```

---

# Data Structures in Browser Applications

Common browser examples include:

```js
const formData = new FormData();

const params =
  new URLSearchParams();

const fileList = input.files;
```

These are specialized structures provided by the platform.

Use them when interacting with the APIs that expect them.

---

# Do Not Convert Specialized Structures Unnecessarily

If an API expects:

```js
new FormData()
```

do not immediately convert it into an unrelated object unless there is a reason.

Likewise, keep:

```js
URLSearchParams
```

as `URLSearchParams` when you need its API.

---

# Data Structures and APIs

The best structure is often the one that fits the surrounding API naturally.

For example:

```js
const params =
  new URLSearchParams();

params.set(
  "search",
  "javascript"
);
```

is clearer than manually concatenating query strings.

---

# Data Structures and Serialization Boundaries

At persistence or network boundaries, convert explicitly when necessary.

Example:

```js
const payload = {
  users: [...usersById.values()],
};
```

This transforms an internal `Map` into a JSON-friendly array.

The conversion is explicit and easy to inspect.

---

# Keep Internal and External Representations Separate

A clean boundary may look like:

```text
External JSON
    ↓
Validation
    ↓
Internal data structure
    ↓
Application logic
    ↓
External JSON
```

The internal representation does not have to be identical to the wire format.

---

# Avoid Leaking Persistence Models Everywhere

If a database row is:

```js
{
  user_id: 1,
  created_at: "...",
}
```

the rest of the application does not necessarily need to use those exact names.

A transformation layer can produce:

```js
{
  userId: 1,
  createdAt: "...",
}
```

The important principle is a clear boundary between representations.

---

# Data Structures and Domain Models

Use objects that express domain concepts:

```js
const order = {
  id: 1,
  customerId: 10,
  items: [],
  status: "pending",
};
```

The structure should communicate meaningful relationships.

---

# Avoid Generic Nested `data`

Weak:

```js
const response = {
  data: {
    data: {
      data: user,
    },
  },
};
```

If multiple layers are required, each layer should have a meaningful purpose.

Avoid nesting simply because one wrapper already contains another object.

---

# Data Structures and Function Contracts

If a function expects an array:

```js
function calculateTotal(items) {
  // ...
}
```

callers should know that `items` is a collection.

If it expects a record:

```js
function createUser(userData) {
  // ...
}
```

the structure should be documented or obvious.

Clear data contracts reduce defensive code.

---

# Avoid "Magic" Data Shapes

Do not require callers to construct cryptic arrays such as:

```js
createUser([
  "Osama Abu Motlaq",
  "osama@example.com",
  true,
  3,
]);
```

Prefer:

```js
createUser({
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
  isActive: true,
  retryCount: 3,
});
```

Named properties communicate meaning.

---

# Tuples Have Specific Uses

Position-based arrays can be useful when the positions have a documented meaning.

Example:

```js
const point = [
  10,
  20,
];
```

Here the structure is naturally interpreted as:

```text
[x, y]
```

The domain gives the positions meaning.

Use tuples deliberately rather than as a substitute for objects.

---

# Avoid Large Tuples

A structure such as:

```js
const user = [
  1,
  "Osama Abu Motlaq",
  "osama@example.com",
  "Frontend Developer",
  true,
  25,
  "Gaza",
];
```

becomes difficult to maintain.

Use named fields:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
  role: "Frontend Developer",
  isActive: true,
  age: 25,
  city: "Gaza",
};
```

---

# Data Structures and Readability

Compare:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

with:

```js
const user = [
  1,
  "Osama Abu Motlaq",
  "Frontend Developer",
];
```

The first structure contains its own documentation through property names.

Good data structures reduce the amount of external explanation required.

---

# Prefer Explicit Structures at Boundaries

When data crosses:

```text
Function boundaries
Module boundaries
Network boundaries
Persistence boundaries
Component boundaries
```

prefer structures whose meaning is easy to understand.

This reduces coupling and integration errors.

---

# Avoid Overly Flexible Structures

Highly dynamic objects can be difficult to reason about:

```js
const config = {};

config.anything = 1;
config.somethingElse = "value";
config.someRandomFlag = true;
```

If the application expects a known schema, make it explicit:

```js
const config = {
  timeout: 5000,
  retryCount: 3,
  isProduction: false,
};
```

---

# Dynamic Structures Have a Place

Sometimes flexibility is the requirement:

```js
const queryParams = {};

for (const [key, value] of entries) {
  queryParams[key] = value;
}
```

The important thing is that the flexibility comes from the domain rather than poor modeling.

---

# Data Structures Should Not Hide Invalid States

Prefer:

```js
const result = {
  status: "success",
  data: user,
};
```

over a structure where:

```js
result.success === true
result.loading === true
result.error !== null
result.data === null
```

can all be true simultaneously.

Model valid states explicitly.

---

# State Machines as Data

For complex state, an explicit state model can be powerful:

```js
const state = {
  status: "loading",
};
```

or:

```js
const state = {
  status: "success",
  data: user,
};
```

or:

```js
const state = {
  status: "error",
  error: new Error(
    "Failed to load user."
  ),
};
```

The structure prevents contradictory combinations.

---

# Prefer One Source of Truth

If the same fact is stored in several structures:

```js
const userRole = "admin";

const user = {
  role: "admin",
};
```

the values can diverge.

Prefer one authoritative source where possible:

```js
const user = {
  role: "admin",
};
```

Then derive:

```js
const isAdmin =
  user.role === "admin";
```

---

# Derived Data Should Usually Not Be Stored

Avoid duplicating data unnecessarily:

```js
const cart = {
  items: [],
  itemCount: 5,
};
```

if `itemCount` can always be derived:

```js
const itemCount =
  cart.items.length;
```

Stored derived data can become stale.

---

# Store Derived Data When There Is a Real Reason

Sometimes a derived value is expensive to calculate or required by a specific persistence or indexing strategy.

Then storing it may be justified.

The important question is:

```text
What guarantees that the derived value stays synchronized?
```

---

# Data Structure and Performance

Choose based on actual operations.

Example:

```text
Need ordered iteration:
Array

Need direct keyed lookup:
Map

Need uniqueness:
Set

Need one structured record:
Object
```

This simple mapping solves many design decisions.

---

# Do Not Optimize Based Only on Big-O

Big-O matters, but practical performance also depends on:

```text
Data size
Memory layout
Constant factors
Allocation
Garbage collection
Runtime implementation
Access patterns
```

Use measurements when performance matters.

---

# Data Structures and Garbage Collection

Long-lived references can prevent objects from being collected.

For example:

```js
const cache = new Map();

function cacheUser(user) {
  cache.set(
    user.id,
    user
  );
}
```

If the cache grows indefinitely, memory usage can grow indefinitely.

Data-structure choice and lifecycle management are connected.

---

# WeakMap and Lifecycle

When metadata should follow the lifetime of an object:

```js
const metadata =
  new WeakMap();
```

can avoid keeping the object alive solely because of the metadata.

This is a specialized memory-management use case.

---

# Avoid Unbounded Collections

Be careful with:

```js
const logs = [];
const cache = new Map();
const history = [];
```

if entries are continually added and never removed.

A good data structure does not automatically solve lifecycle problems.

---

# Define Collection Lifecycle

For long-lived collections, decide:

```text
When are items added?
When are they removed?
Can they expire?
Is there a maximum size?
Should old entries be evicted?
```

This is especially important for caches and queues.

---

# Queues

Arrays can represent small queues:

```js
const queue = [];

queue.push("task");

const nextTask =
  queue.shift();
```

For very large queues or performance-sensitive systems, repeated `shift()` operations may not be ideal.

A different queue implementation can track a head index.

---

# Stack Behavior

Arrays naturally support stack operations:

```js
const stack = [];

stack.push("first");
stack.push("second");

const last =
  stack.pop();
```

The data structure communicates:

```text
Last in
First out
```

---

# Use Data Structures That Match Algorithms

Examples:

```text
Stack
→ LIFO

Queue
→ FIFO

Set
→ Unique membership

Map
→ Keyed lookup

Array
→ Ordered sequence
```

When the operation matches the structure, the implementation becomes easier to understand.

---

# Avoid Manual Reimplementation of Built-Ins

Do not create custom uniqueness logic when a `Set` naturally represents the requirement.

Avoid:

```js
const seen = {};

for (const value of values) {
  if (!seen[value]) {
    seen[value] = true;
  }
}
```

Prefer:

```js
const seen =
  new Set(values);
```

when the requirement is simply unique membership.

---

# Avoid Custom Structures Without a Need

A custom class may be appropriate for specialized behavior:

```js
class Queue {
  // ...
}
```

But do not build a custom queue, map, or set merely to wrap a built-in structure with no added value.

---

# Encapsulate Complex Data Structures

If an application-specific structure has non-trivial invariants, encapsulate it.

Example:

```js
class UserStore {
  #users = new Map();

  addUser(user) {
    if (
      this.#users.has(user.id)
    ) {
      throw new Error(
        "User already exists."
      );
    }

    this.#users.set(
      user.id,
      user
    );
  }

  getUser(id) {
    return this.#users.get(id);
  }
}
```

The class owns the rules around the structure.

---

# Data Structure APIs Should Express Intent

Prefer:

```js
userStore.getUser(userId);
```

over:

```js
userStore.internalMap.get(userId);
```

The first expresses an operation.

The second exposes implementation details.

---

# Avoid Leaking Collections

A collection returned directly:

```js
getUsers() {
  return this.#users;
}
```

may allow callers to mutate it.

Consider:

```js
getUsers() {
  return [...this.#users];
}
```

or specific query methods.

---

# Return the Simplest Useful Representation

If a caller only needs a number:

```js
getUserCount();
```

do not return:

```js
{
  users: [...],
  count: 10,
  metadata: {...},
}
```

unless those additional values are actually useful.

Small contracts reduce unnecessary coupling.

---

# Data Structures and Modularity

Modules should own the data structures that represent their internal state.

Example:

```text
User module
    ↓
Owns user collection

Project module
    ↓
Owns project collection
```

Other modules should interact through intentional APIs rather than directly manipulating internal collections.

---

# Avoid Cross-Module Mutation

Weak:

```js
userStore.users.push(user);
```

Prefer:

```js
userStore.addUser(user);
```

The second gives the owning module control over validation and invariants.

---

# Use Data Structure Invariants

Examples:

```text
User IDs must be unique.

Cart quantities must be positive.

Projects must have stable IDs.

A queue contains pending tasks only.

A Set contains unique values.
```

The structure and its API should make these rules easy to maintain.

---

# Data Structures and Testing

Stable structures make tests easier to write.

Example:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
];
```

A test can assert specific fields.

Avoid test data whose shape changes unpredictably between cases.

---

# Test Data Shape

Good:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Tests now have a recognizable domain object.

---

# Avoid Overly Large Test Objects

Do not include dozens of irrelevant properties:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  email: "osama@example.com",
  // 30 unrelated properties...
};
```

Provide only the fields necessary for the behavior being tested.

This keeps tests focused.

---

# Data Structures and Documentation

When a structure is non-obvious, document its shape.

For example:

```js
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} role
 */
```

Documentation becomes especially valuable at module and API boundaries.

---

# Avoid Type Information Embedded in Names

Prefer:

```js
const users = [];
```

over:

```js
const usersArray = [];
```

Prefer:

```js
const user = {};
```

over:

```js
const userObject = {};
```

The data structure is already visible from the code.

---

# Let Types and Structure Communicate

Good:

```js
const users = new Map();
```

The declaration itself communicates the structure.

Do not write:

```js
const usersMapDataStructure =
  new Map();
```

The name adds unnecessary implementation detail.

---

# Data Structures and Readability

A good structure should make common operations obvious.

Example:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

The array and method communicate:

```text
Collection
→ filter
→ matching subset
```

The code reads almost like the requirement.

---

# Avoid Clever Data Encoding

Avoid representing multiple concepts in one string:

```js
const user = "1|Osama Abu Motlaq|admin|active";
```

This requires parsing before the data can be used.

Prefer:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  role: "admin",
  status: "active",
};
```

Structured data is easier to validate and maintain.

---

# Avoid Arrays With Encoded Meaning

Weak:

```js
const user = [
  1,
  "Osama Abu Motlaq",
  "admin",
  true,
];
```

unless the positional contract is intentionally defined.

Prefer named properties when readability matters.

---

# Use Data Structures to Prevent Invalid Operations

For unique membership:

```js
const permissions =
  new Set();

permissions.add(
  "read"
);
```

Repeatedly adding `"read"` does not create a duplicate.

The data structure itself helps enforce the rule.

---

# Data Structures and Domain Constraints

When the domain says:

```text
One item per ID
```

a `Map` may encode that constraint naturally:

```js
usersById.set(
  user.id,
  user
);
```

Setting the same ID replaces the previous entry.

That behavior may be useful or may require explicit checking.

The structure should match the desired semantics.

---

# Be Explicit About Replacement Behavior

With a `Map`:

```js
usersById.set(
  user.id,
  user
);
```

an existing value is replaced.

If that is not allowed, enforce the invariant:

```js
if (usersById.has(user.id)) {
  throw new Error(
    "User already exists."
  );
}
```

Data structures provide mechanics.

Your code provides domain rules.

---

# Do Not Confuse Storage With Business Rules

A `Map` can enforce:

```text
One value per key
```

But it cannot decide:

```text
Whether replacing a user is allowed
```

That remains application logic.

---

# Data Structures and Concurrency

JavaScript environments are typically single-threaded at the main execution context level, but asynchronous operations can still cause ordering concerns.

Mutable shared structures can become difficult to reason about when multiple async operations update them.

Prefer explicit state transitions and clear ownership.

---

# Async Collection Updates

Be careful with:

```js
let users = [];

async function loadUsers() {
  users = await fetchUsers();
}
```

if multiple asynchronous operations can update the same variable.

A more explicit architecture can make ownership and update ordering clearer.

---

# Avoid Mutable Global Collections

Weak:

```js
const users = [];

export async function loadUsers() {
  users.push(
    ...(await fetchUsers())
  );
}
```

The module state grows over time.

If such caching is intentional, define:

```text
When data expires
How it is refreshed
How duplicates are prevented
How consumers read it
```

---

# Data Structure Lifecycle Should Be Explicit

For every long-lived collection, know:

```text
Creation
Population
Updates
Reads
Cleanup
Disposal
```

This is especially important for:

```text
Caches
Event listener registries
Observers
Queues
Subscriptions
Connection pools
```

---

# Use the Right Structure for Relationships

One-to-many relationships can be represented as:

```js
const projectsByUserId =
  new Map();
```

Then:

```js
projectsByUserId.set(
  userId,
  projects
);
```

The relationship becomes explicit.

---

# Avoid Repeated Nested Searches

If code repeatedly does:

```js
users.find(
  (user) =>
    user.id === userId
);
```

inside loops, consider whether the data should be indexed:

```js
const usersById =
  new Map(
    users.map(
      (user) => [
        user.id,
        user,
      ]
    )
  );
```

Then:

```js
usersById.get(userId);
```

This can improve repeated lookup performance.

Use this pattern when the workload justifies it.

---

# Precompute When Access Is Frequent

A precomputed lookup can be useful when:

```text
Reads are frequent
Data changes infrequently
Lookup cost matters
```

But remember the synchronization cost when the underlying data changes.

---

# Do Not Optimize One Operation at the Expense of the Whole System

A `Map` may make lookup easy but complicate:

```text
Ordering
Serialization
Synchronization
Rendering
```

Data structures have trade-offs.

Evaluate the complete workflow.

---

# Data Structures and UI Rendering

UI systems often want ordered arrays:

```js
const projects = [
  projectA,
  projectB,
  projectC,
];
```

Even if the underlying application also maintains:

```js
const projectsById =
  new Map();
```

The UI should receive the representation that best fits rendering.

---

# Data Structures and React

React state often works naturally with:

```text
Arrays
Objects
Normalized objects
```

For example:

```js
const [projects, setProjects] =
  useState([]);
```

or:

```js
const [usersById, setUsersById] =
  useState({});
```

The best choice depends on how state is read and updated.

---

# Avoid Over-Normalizing React State

Do not create a large normalized store for a tiny component:

```js
const [state, setState] =
  useState({
    usersById: {},
    userIds: [],
  });
```

when:

```js
const [users, setUsers] =
  useState([]);
```

is sufficient.

Use normalization when update and access patterns justify it.

---

# Immutable Updates for Objects in React

Prefer:

```js
setUser({
  ...user,
  role: "Frontend Developer",
});
```

rather than:

```js
user.role =
  "Frontend Developer";

setUser(user);
```

The latter mutates the existing state object.

---

# Immutable Updates for Arrays in React

Prefer:

```js
setProjects(
  (projects) => [
    ...projects,
    newProject,
  ]
);
```

For removal:

```js
setProjects(
  (projects) =>
    projects.filter(
      (project) =>
        project.id !== projectId
    )
);
```

For updates:

```js
setProjects(
  (projects) =>
    projects.map(
      (project) =>
        project.id === projectId
          ? {
              ...project,
              ...updates,
            }
          : project
    )
);
```

---

# State Shape Should Match UI Operations

If the UI frequently asks:

```text
Find project by ID
Update project by ID
Delete project by ID
```

a normalized representation may become useful.

If the UI mainly:

```text
Renders projects in order
Filters projects
Sorts projects
```

an array may be sufficient.

Design state around actual operations.

---

# Data Structures and Component Boundaries

Do not pass large internal structures through many layers when a component only needs one value.

Instead of:

```js
<UserCard
  usersById={usersById}
  userId={userId}
/>
```

consider:

```js
<UserCard
  user={usersById.get(userId)}
/>
```

The component receives what it needs.

---

# Avoid Propagating Storage Details

A child component should generally not need to know whether users are stored in:

```text
Array
Map
Object
Database
Cache
```

Pass domain data or expose intentional APIs.

---

# Data Structures and Accessibility

For UI data, preserve semantics rather than encoding presentation details into the data model.

Weak:

```js
const button = {
  text: "Save",
  color: "blue",
  leftMargin: 20,
};
```

Better:

```js
const action = {
  label: "Save",
  type: "primary",
};
```

Presentation rules can remain in the UI layer.

---

# Data Structures and Configuration

Configuration should use explicit properties:

```js
const config = {
  apiUrl: "/api",
  timeoutMs: 5000,
  retryCount: 3,
};
```

Avoid positional arrays:

```js
const config = [
  "/api",
  5000,
  3,
];
```

Named configuration is easier to maintain.

---

# Data Structures and Environment Variables

Environment variables arrive as strings.

Convert them deliberately:

```js
const retryCount =
  Number(process.env.RETRY_COUNT);
```

Do not assume:

```js
process.env.RETRY_COUNT
```

is automatically a number.

---

# Data Validation and Defaults

When constructing objects from external data:

```js
const user = {
  id: data.id,
  name: data.name ?? "",
  role: data.role ?? "user",
};
```

Apply defaults intentionally.

Do not hide invalid external data with meaningless defaults.

---

# Avoid Silent Data Corruption

Weak:

```js
const age =
  Number(data.age) || 0;
```

This can turn invalid input into:

```text
0
```

without distinguishing:

```text
Invalid
Missing
Actually zero
```

When those states matter, validate explicitly.

---

# Use Explicit Parsing

Prefer:

```js
const age =
  Number.parseInt(
    input,
    10
  );
```

or:

```js
const price =
  Number(input);
```

depending on the expected format.

Choose a conversion based on the actual input contract.

---

# Data Structures and Serialization

Before serializing, understand what can be represented.

For example:

```js
const payload = {
  createdAt:
    new Date().toISOString(),
};
```

Explicitly converting values can make API contracts clearer.

---

# Do Not Store Functions in JSON Data Models

Functions are behavior, not JSON data.

Avoid treating:

```js
const user = {
  name: "Osama Abu Motlaq",
  save() {
    // ...
  },
};
```

as a JSON payload.

Keep transport data separate from behavior.

---

# Separate DTO-Like Data From Rich Objects

For network communication:

```js
const payload = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

For internal behavior:

```js
class User {
  constructor(data) {
    this.name = data.name;
    this.role = data.role;
  }

  getDisplayName() {
    return this.name;
  }
}
```

Do not force one representation to serve every purpose.

---

# Data Structure Decision Framework

When choosing a structure, ask:

```text
What is one item?

What is a collection?

Does order matter?

Are duplicates allowed?

Do I need keyed lookup?

Are keys strings only?

Does object identity matter?

Will this data be serialized?

Is the data shared?

How will it be updated?

Who owns it?

How large can it become?

How frequently is it accessed?

Does the structure enforce an important domain rule?
```

Then choose the simplest structure that satisfies the requirements.

---

# Practical Mapping

A useful first-pass mapping:

```text
One structured entity
→ Object

Ordered collection
→ Array

Unique collection
→ Set

Key-value collection
→ Map

Object-associated metadata
→ WeakMap

Object membership tracking
→ WeakSet

Queue
→ Array or dedicated queue abstraction

Stack
→ Array

Dynamic state with explicit status
→ Object with a status field
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text
Use objects for structured records.

Use arrays for ordered collections.

Use Sets when uniqueness matters.

Use Maps for explicit keyed collections.

Do not use arrays as unnamed records.

Do not use Maps for ordinary fixed-shape objects.

Keep collection element shapes consistent.

Give entities stable identifiers when identity matters.

Do not use array position as identity.

Avoid duplicate sources of truth.

Avoid storing derived data without a reason.

Keep shared data ownership clear.

Do not expose mutable internal collections unnecessarily.

Use immutable update patterns for shared state when appropriate.

Choose structures based on access patterns.

Do not optimize before measuring.

Keep external and internal representations separate.

Validate external data at boundaries.

Use the simplest structure that matches the domain.
```

---

# Final Principles

```text
Data structures are part of the design.

Use the structure that matches the meaning.

Objects represent records.

Arrays represent ordered collections.

Sets represent uniqueness.

Maps represent key-value relationships.

Weak collections represent specialized object-lifetime relationships.

Stable data shapes reduce defensive code.

Explicit state models reduce impossible states.

Ownership matters as much as structure.

Avoid unnecessary normalization.

Avoid unnecessary duplication.

Avoid leaking internal storage details.

Choose structures based on real access patterns.

Optimize only when there is evidence.

Prefer readable data over clever encoding.
```

---

# Summary

Good JavaScript data modeling starts with semantics.

Do not begin with:

```text
"Which data structure is fastest?"
```

Begin with:

```text
"What concept am I representing?"
```

Then determine:

```text
How is it accessed?
How is it updated?
Who owns it?
What constraints must always hold?
```

A useful mental model is:

```text
Meaning
   ↓
Data shape
   ↓
Operations
   ↓
Ownership
   ↓
Lifecycle
   ↓
Performance
```

The best data structure is usually not the most sophisticated one.

It is the one that makes the intended data model and its common operations easiest to understand and maintain.

```text
Correct model
    +
Clear ownership
    +
Consistent shape
    +
Appropriate operations
    +
Controlled lifecycle
    =
Maintainable JavaScript
```
