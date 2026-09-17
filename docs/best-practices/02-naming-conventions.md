# JavaScript Naming Conventions

## Overview

Naming is one of the most important parts of writing maintainable JavaScript.

Good names reduce the amount of code a developer needs to read before understanding what a variable, function, object, class, or module represents.

Compare:

```js
const x = 25;
```

with:

```js
const userAge = 25;
```

The second name communicates intent without requiring additional context.

Good naming should answer:

```text
What does this value represent?
What does this function do?
What does this boolean mean?
What does this module provide?
What kind of data does this object contain?
```

The goal is not to make names long.

The goal is to make names meaningful.

---

# General Naming Principles

A good name should be:

```text
Clear
Specific
Consistent
Readable
Predictable
Domain-aware
```

Avoid names that require the reader to decode their meaning.

Prefer:

```js
const userName = "Osama Abu Motlaq";
```

over:

```js
const n = "Osama Abu Motlaq";
```

---

# Use Descriptive Names

Prefer names that communicate the purpose of a value:

```js
const userName = "Osama Abu Motlaq";
const userEmail = "osama@example.com";
const accountBalance = 500;
```

Avoid vague names:

```js
const value = "Osama Abu Motlaq";
const data = "osama@example.com";
const thing = 500;
```

Generic names are sometimes appropriate for genuinely generic values, but they should not be the default.

---

# Names Should Describe Meaning

Consider:

```js
const users = [];
```

This clearly communicates a collection of users.

Compare it with:

```js
const data = [];
```

The second name does not tell the reader what the array contains.

Prefer names that communicate the domain concept.

---

# Avoid Meaningless Names

Avoid:

```js
const foo = "Osama Abu Motlaq";
const bar = "Frontend Developer";
const temp = 42;
```

unless those names are deliberately used for a generic temporary example.

Production code should communicate meaning.

---

# Avoid Single-Letter Names

Avoid:

```js
const u = getUser();
const p = getProject();
const s = getSettings();
```

Prefer:

```js
const user = getUser();
const project = getProject();
const settings = getSettings();
```

Single-letter names are acceptable in certain contexts.

For example, mathematical code may naturally use:

```js
const x = 10;
const y = 20;
```

A short callback parameter can also be acceptable when the meaning is obvious:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(
  (number) => number * 2
);
```

Prefer clarity when the variable's role is not immediately obvious.

---

# Avoid Ambiguous Abbreviations

Avoid:

```js
const usr = getUser();
const cfg = getConfig();
const btn = getButton();
```

Prefer:

```js
const user = getUser();
const config = getConfig();
const button = getButton();
```

Common abbreviations may be acceptable when they are universally understood within the project, but consistency matters.

---

# Avoid Excessive Abbreviations

Avoid:

```js
const usrPrfDt = getUserProfileData();
```

Prefer:

```js
const userProfileData =
  getUserProfileData();
```

Longer names are preferable when they significantly improve understanding.

---

# Do Not Make Names Unnecessarily Long

Clarity does not mean making every name extremely long.

Avoid:

```js
const currentAuthenticatedUserProfileInformation =
  getCurrentAuthenticatedUserProfileInformation();
```

Prefer:

```js
const userProfile =
  getUserProfile();
```

The right name depends on context.

---

# Context Matters

Inside a function that clearly processes users:

```js
function processUsers(users) {
  for (const user of users) {
    console.log(user.name);
  }
}
```

`user` is clear.

There is no need for:

```js
for (
  const currentUserObject
  of users
) {
  console.log(
    currentUserObject.name
  );
}
```

Use the surrounding context to avoid unnecessary verbosity.

---

# Prefer Domain Language

Use terminology from the problem domain.

For example:

```js
const cartItems = [];
const subtotal = 100;
const shippingCost = 15;
const orderTotal =
  subtotal + shippingCost;
```

These names describe the business concepts directly.

Avoid generic alternatives:

```js
const list = [];
const a = 100;
const b = 15;
const c = a + b;
```

---

# Use `camelCase` for Variables

The standard convention for JavaScript variables and functions is `camelCase`.

Prefer:

```js
const userName = "Osama Abu Motlaq";
const accountBalance = 500;

function getUserProfile() {
  // ...
}
```

Avoid inconsistent forms:

```js
const user_name = "Osama Abu Motlaq";
const UserName = "Osama Abu Motlaq";
const username_value = "Osama Abu Motlaq";
```

Use one convention consistently.

---

# Use `PascalCase` for Classes

Classes are typically named using `PascalCase`.

Prefer:

```js
class UserProfile {
  // ...
}
```

Avoid:

```js
class userProfile {
  // ...
}
```

And:

```js
class user_profile {
  // ...
}
```

---

# Use `camelCase` for Methods

Object and class methods should normally use `camelCase`.

```js
class UserProfile {
  getName() {
    return this.name;
  }

  updateProfile() {
    // ...
  }
}
```

---

# Use `camelCase` for Object Properties

Prefer:

```js
const user = {
  firstName: "Osama Abu Motlaq",
  lastName: "Abu Motlaq",
  emailAddress: "osama@example.com",
};
```

---

# Use `UPPER_SNAKE_CASE` for True Constants

Use uppercase names for values that represent fixed configuration or domain constants.

```js
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
const API_VERSION = "v1";
```

Do not automatically uppercase every variable that uses `const`.

This:

```js
const userName = "Osama Abu Motlaq";
```

does not need:

```js
const USER_NAME = "Osama Abu Motlaq";
```

The distinction should communicate intent.

---

# Boolean Naming

Boolean names should make the value read naturally.

Prefer:

```js
const isActive = true;
const isLoading = false;
const hasAccess = true;
const canEdit = false;
const shouldRetry = true;
```

These names communicate that the value is boolean.

---

# Boolean Prefixes

Useful prefixes include:

```text
is
has
can
should
will
did
```

Examples:

```js
const isAuthenticated = true;
const hasPermission = false;
const canDelete = true;
const shouldRetry = false;
const didLoad = true;
```

---

# Avoid Ambiguous Boolean Names

Avoid:

```js
const active = true;
const access = false;
const edit = true;
```

Prefer:

```js
const isActive = true;
const hasAccess = false;
const canEdit = true;
```

The type and meaning become easier to understand.

---

# Boolean Functions

Boolean-returning functions should usually read like questions.

Prefer:

```js
function isValidUser(user) {
  // ...
}

function hasAccess(user) {
  // ...
}

function canEditProject(user) {
  // ...
}
```

Then usage becomes natural:

```js
if (isValidUser(user)) {
  // ...
}

if (hasAccess(user)) {
  // ...
}
```

---

# Avoid Boolean Function Names That Sound Like Actions

Avoid:

```js
function validateUser() {
  return true;
}
```

if the function only checks a condition.

Prefer:

```js
function isValidUser() {
  return true;
}
```

However, `validateUser()` can be appropriate if the function performs validation logic that may throw an error or return validation results.

The name should match behavior.

---

# Verb-Based Function Names

Functions usually represent actions.

Good prefixes include:

```text
get
set
create
update
delete
remove
add
calculate
validate
format
parse
fetch
load
save
send
handle
render
build
transform
```

Examples:

```js
function getUser() {}

function createProject() {}

function updateProfile() {}

function calculateTotal() {}

function formatDate() {}
```

---

# Match Function Names to Their Behavior

If a function returns data:

```js
function getUser() {
  return user;
}
```

If it creates something:

```js
function createUser() {
  // ...
}
```

If it deletes something:

```js
function deleteUser() {
  // ...
}
```

Avoid naming every function `process()`.

`process()` communicates very little unless the domain context makes it obvious.

---

# `get` vs `fetch`

Use names carefully.

`get` commonly describes retrieving an already available value:

```js
function getUserById(id) {
  return users.find(
    (user) => user.id === id
  );
}
```

`fetch` commonly communicates an asynchronous or network request:

```js
async function fetchUserById(id) {
  const response =
    await fetch(`/api/users/${id}`);

  return response.json();
}
```

The naming difference helps communicate behavior.

---

# `create` vs `build`

Use terms that describe the operation.

For example:

```js
function createUser(data) {
  // Persist or create a user.
}
```

versus:

```js
function buildUserPayload(user) {
  return {
    name: user.name,
    email: user.email,
  };
}
```

`build` is often useful for constructing data.

`create` often implies that something is actually created.

The exact convention should follow the project domain.

---

# `update` vs `set`

`set` often refers to assigning a specific value:

```js
function setTheme(theme) {
  // ...
}
```

`update` often implies modifying existing state or data:

```js
function updateUserProfile(profile) {
  // ...
}
```

Use names that communicate the level of operation.

---

# `add` vs `insert`

The distinction depends on the domain.

Example:

```js
cart.add(item);
```

is natural for a collection or user-facing operation.

Database-focused code may use:

```js
insertUser(user);
```

Use domain-specific vocabulary consistently.

---

# `remove` vs `delete`

`delete` often communicates permanent deletion:

```js
deleteUser(userId);
```

`remove` may describe removing an item from a collection:

```js
cart.remove(itemId);
```

Choose terms that match the behavior.

---

# Event Handler Naming

Event handlers should usually communicate that they respond to an event.

Common patterns:

```js
function handleClick() {}

function handleSubmit() {}

function handleChange() {}

function handleKeyDown() {}
```

Example:

```js
button.addEventListener(
  "click",
  handleClick
);
```

---

# Event Listener vs Event Handler

The following name is clear:

```js
function handleSubmit(event) {
  event.preventDefault();
}
```

The function handles the event.

This:

```js
function submit() {}
```

may be ambiguous because it can sound like an action that submits a form rather than a function that handles a submit event.

---

# Callback Naming

Use callback parameter names that communicate their role.

Prefer:

```js
users.map(
  (user) => user.name
);
```

over:

```js
users.map(
  (item) => item.name
);
```

when the array contains users.

---

# Avoid Generic `item` When the Domain Is Known

Generic:

```js
products.map(
  (item) => item.price
);
```

More descriptive:

```js
products.map(
  (product) => product.price
);
```

The second form communicates the data model.

---

# Error Naming

Errors should communicate what went wrong.

Prefer:

```js
const networkError = new Error(
  "Failed to load user."
);
```

or:

```js
catch (error) {
  console.error(error);
}
```

Avoid unnecessarily vague error variables in larger contexts.

---

# Error Class Names

Custom error classes should normally end with `Error`.

```js
class ValidationError extends Error {
  // ...
}

class AuthenticationError extends Error {
  // ...
}
```

This makes the type immediately recognizable.

---

# Promise and Async Naming

Use names that communicate asynchronous behavior where useful.

For example:

```js
const userPromise =
  fetchUser();
```

And:

```js
const user =
  await fetchUser();
```

The second variable represents the resolved user rather than the Promise.

---

# Avoid Misleading Async Names

Avoid:

```js
const user = fetchUser();
```

if `fetchUser()` returns a Promise and the surrounding code makes this distinction important.

Prefer:

```js
const userPromise =
  fetchUser();
```

or:

```js
const user =
  await fetchUser();
```

depending on the context.

---

# Array Naming

Plural names are often useful for collections.

Prefer:

```js
const users = [];
const projects = [];
const messages = [];
const skills = [];
```

Avoid:

```js
const user = [];
const project = [];
const message = [];
```

when the variable contains multiple values.

---

# Single Item vs Collection

Compare:

```js
const user = {};
const users = [];
```

and:

```js
const project = {};
const projects = [];
```

The names immediately communicate cardinality.

---

# Boolean Collections

Prefer:

```js
const selectedUsers = [];
const activeProjects = [];
```

rather than unclear names such as:

```js
const usersTrue = [];
const projectsActive = [];
```

Use natural language.

---

# Object Naming

Name objects according to what they represent.

Prefer:

```js
const userProfile = {
  name: "Osama Abu Motlaq",
};
```

over:

```js
const object = {
  name: "Osama Abu Motlaq",
};
```

---

# Configuration Objects

Use names such as:

```js
const config = {};
const databaseConfig = {};
const apiConfig = {};
const buildConfig = {};
```

when the object actually contains configuration.

---

# Options Objects

Use `options` for optional behavior parameters:

```js
function createUser(
  userData,
  options
) {
  // ...
}
```

This is especially useful when the second parameter controls behavior.

---

# Destructuring Names

When destructuring, preserve meaningful names:

```js
const {
  firstName,
  lastName,
  email,
} = user;
```

Avoid meaningless aliases:

```js
const {
  firstName: a,
  lastName: b,
  email: c,
} = user;
```

Rename only when there is a genuine naming conflict or clarity benefit.

---

# Useful Aliases

Aliases can improve clarity in a collision:

```js
const {
  name: userName,
} = user;
```

This is useful when:

```js
const name = project.name;
const userName = user.name;
```

The alias adds useful context.

---

# Avoid Redundant Names

Avoid:

```js
const userUserName = user.username;
```

Prefer:

```js
const userName = user.username;
```

Do not repeat information that the surrounding context already provides.

---

# Avoid Redundant Type Words

Avoid unnecessary suffixes such as:

```js
const userObject = {};
const usersArray = [];
const nameString = "Osama Abu Motlaq";
```

Prefer:

```js
const user = {};
const users = [];
const name = "Osama Abu Motlaq";
```

The type is often obvious from the code.

---

# When Type Suffixes Are Useful

Type-related suffixes can sometimes be useful when they prevent ambiguity.

For example:

```js
const timeoutId = setTimeout(
  handleTimeout,
  1000
);
```

Here `Id` communicates the purpose of the value.

The goal is not to eliminate suffixes.

The goal is to avoid meaningless suffixes.

---

# DOM Naming

Name DOM elements according to their role.

Prefer:

```js
const submitButton =
  document.querySelector("#submit");

const emailInput =
  document.querySelector("#email");

const profileForm =
  document.querySelector("#profile-form");
```

Avoid:

```js
const element1 =
  document.querySelector("#submit");

const element2 =
  document.querySelector("#email");
```

---

# DOM Element Prefixes

Prefixes such as:

```text
btn
input
div
```

are sometimes used in legacy code:

```js
const btnSubmit = ...;
const inputEmail = ...;
```

Modern code generally benefits more from semantic names:

```js
const submitButton = ...;
const emailInput = ...;
```

The semantic name communicates both the purpose and often the element type without a cryptic abbreviation.

---

# CSS Class Names

When JavaScript interacts with CSS classes, prefer semantic names.

Example:

```js
element.classList.add("is-active");
element.classList.remove("is-active");
```

Names such as:

```text
is-active
is-hidden
has-error
```

communicate state clearly.

---

# State Naming

State names should represent the state itself.

Prefer:

```js
const isLoading = true;
const errorMessage = null;
const selectedProject = null;
```

Avoid:

```js
const state1 = true;
const state2 = null;
const currentThing = null;
```

---

# React-Style State Naming

When working with React, common conventions include:

```js
const [isOpen, setIsOpen] =
  useState(false);

const [user, setUser] =
  useState(null);

const [error, setError] =
  useState(null);
```

The setter should normally use the same concept with a `set` prefix.

---

# Setter Naming

Prefer:

```js
const [name, setName] =
  useState("");

const [isLoading, setIsLoading] =
  useState(false);
```

Avoid:

```js
const [name, updateName] =
  useState("");

const [isLoading, changeLoading] =
  useState(false);
```

unless the function has semantics beyond simple state replacement.

---

# Module and File Names

File names should be consistent with the project's convention.

Examples:

```text
user-service.js
user-profile.js
format-date.js
api-client.js
```

or:

```text
userService.js
userProfile.js
formatDate.js
apiClient.js
```

Neither convention is universally correct.

Choose one and apply it consistently.

---

# Match File Names to Exports

A file named:

```text
format-date.js
```

should have an obvious relationship to:

```js
export function formatDate() {
  // ...
}
```

The relationship should be easy to understand.

---

# Avoid Generic File Names

Avoid files such as:

```text
stuff.js
helpers.js
misc.js
common.js
utils.js
```

when they contain many unrelated responsibilities.

A file can use `utils.js` for genuinely related utility functions, but generic names often become dumping grounds.

Prefer focused modules when the codebase grows.

---

# Folder Naming

Folders should communicate their responsibility.

Examples:

```text
components/
services/
utils/
api/
hooks/
features/
pages/
```

Avoid arbitrary folder names that provide no information.

---

# Class Naming

Classes should describe the type of object they represent.

Prefer:

```js
class UserProfile {}
class ApiClient {}
class ValidationError {}
```

Avoid:

```js
class Manager {}
class Handler {}
class Thing {}
```

unless the domain actually defines those concepts clearly.

---

# Abstract Concepts

For classes representing an abstraction, names such as:

```js
class PaymentProcessor {}
class StorageAdapter {}
class NotificationService {}
```

can be useful because they describe responsibility.

Do not add `Manager`, `Handler`, `Service`, or `Processor` merely to make a class sound important.

The word should represent a real responsibility.

---

# Avoid Generic Suffixes

Names such as:

```text
Manager
Helper
Utility
Handler
Thing
Stuff
```

can become vague.

Compare:

```js
class UserManager {}
```

with:

```js
class UserRepository {}
```

or:

```js
class UserService {}
```

The latter names should be used only when they accurately describe the responsibility.

---

# Naming Private Data

Modern JavaScript supports private class fields:

```js
class UserAccount {
  #balance = 0;

  getBalance() {
    return this.#balance;
  }
}
```

The private field should still have a meaningful name.

Privacy does not replace good naming.

---

# Naming Callback Functions

If a callback is reused or non-trivial, give it a meaningful name:

```js
function isActiveUser(user) {
  return user.isActive;
}

const activeUsers =
  users.filter(isActiveUser);
```

This can be clearer than embedding a large anonymous expression.

---

# Naming Regular Expressions

If a regular expression has a meaningful purpose, give it a descriptive name:

```js
const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

Avoid:

```js
const regex = /.../;
```

when the expression is used for a specific business rule.

---

# Naming Dates and Times

Use names that communicate the temporal meaning.

Prefer:

```js
const createdAt = new Date();
const updatedAt = new Date();
const expirationDate = new Date();
```

Avoid:

```js
const date1 = new Date();
const date2 = new Date();
const time = new Date();
```

when multiple dates have different meanings.

---

# Naming IDs

Be explicit about the entity represented by an ID.

Prefer:

```js
const userId = 10;
const projectId = 20;
const orderId = 30;
```

Avoid:

```js
const id1 = 10;
const id2 = 20;
const id3 = 30;
```

---

# Naming URLs

Use names that communicate what the URL represents:

```js
const apiUrl =
  "https://example.com/api";

const profileUrl =
  "/profile";
```

Avoid:

```js
const url1 = "...";
const url2 = "...";
```

when several URLs exist.

---

# Naming API Responses

Do not call every API response `data`.

Prefer:

```js
const userData =
  await fetchUser();

const projects =
  await fetchProjects();
```

If the response object itself contains metadata, use:

```js
const response =
  await fetch("/api/users");
```

and then:

```js
const responseData =
  await response.json();
```

Use the name that reflects what the variable actually contains.

---

# Avoid `data` When More Specific Information Exists

Weak:

```js
const data = await response.json();
```

Better:

```js
const users = await response.json();
```

or:

```js
const userProfile =
  await response.json();
```

The more specific name reduces the need to inspect the source.

---

# Naming Parsed Data

Use names that communicate the transformation:

```js
const parsedResponse =
  JSON.parse(rawResponse);
```

or:

```js
const parsedUser =
  JSON.parse(rawUser);
```

The distinction can be useful when raw and processed values coexist.

---

# Naming Transformations

Prefer:

```js
const normalizedUsers =
  normalizeUsers(users);

const formattedDate =
  formatDate(date);

const filteredProjects =
  filterProjects(projects);
```

The name communicates the state of the data after the operation.

---

# Use Parallel Naming

When multiple concepts are related, use a consistent pattern.

Example:

```js
const rawData = "...";
const parsedData = JSON.parse(
  rawData
);
const normalizedData =
  normalizeData(parsedData);
```

The naming describes the transformation pipeline.

---

# Naming Promises and Resolved Values

When both versions exist:

```js
const userPromise =
  fetchUser();

const user =
  await userPromise;
```

This is clearer than:

```js
const user =
  fetchUser();

const user2 =
  await user;
```

---

# Avoid `newData`, `newValue`, `newThing`

Weak:

```js
const newData = transform(data);
```

Prefer:

```js
const normalizedUsers =
  normalizeUsers(users);
```

The new name should describe what the transformed value represents.

---

# Avoid `oldData`

Weak:

```js
const oldData = user;
```

Prefer:

```js
const previousUser = user;
```

or:

```js
const previousProfile =
  currentProfile;
```

Use precise temporal or domain terminology.

---

# Naming Previous and Next State

Useful names include:

```js
const previousState = state;
const nextState = calculateNextState(
  state
);
```

This is much clearer than:

```js
const oldState = state;
const newState = calculateState(
  state
);
```

Both can be valid, but `previous` and `next` often communicate state transitions more precisely.

---

# Naming Temporary Variables

Temporary variables are acceptable when they simplify a meaningful operation.

Good:

```js
const normalizedName =
  user.name.trim().toLowerCase();
```

Less useful:

```js
const temp =
  user.name.trim().toLowerCase();
```

The temporary name should preserve meaning.

---

# Naming Loop Variables

Prefer:

```js
for (const user of users) {
  console.log(user.name);
}
```

over:

```js
for (const item of users) {
  console.log(item.name);
}
```

when the collection contains users.

---

# Naming Counters

A simple counter can use:

```js
let count = 0;
```

A domain-specific counter should be specific:

```js
let retryCount = 0;
let requestCount = 0;
let userCount = 0;
```

---

# Naming Index Variables

`index` is often appropriate:

```js
for (
  let index = 0;
  index < users.length;
  index += 1
) {
  console.log(users[index]);
}
```

Using `i` is also conventional for simple loops:

```js
for (
  let i = 0;
  i < users.length;
  i += 1
) {
  console.log(users[i]);
}
```

Prefer `index` when the loop is complex or the index has semantic importance.

---

# Naming Recursive Functions

Recursive functions should have names that describe what they recursively process.

Example:

```js
function calculateFactorial(number) {
  if (number <= 1) {
    return 1;
  }

  return (
    number *
    calculateFactorial(number - 1)
  );
}
```

Avoid generic recursive names such as:

```js
function process(value) {
  // ...
}
```

when the actual responsibility can be named precisely.

---

# Naming Event-Related Values

Prefer:

```js
const clickEvent = event;
const keyboardEvent = event;
```

only when a more specific name helps distinguish multiple event values.

Otherwise:

```js
function handleClick(event) {
  // ...
}
```

is sufficient.

Avoid unnecessary renaming.

---

# Naming DOM Collections

Prefer plural names:

```js
const buttons =
  document.querySelectorAll("button");

const inputs =
  document.querySelectorAll("input");
```

This communicates that the variable contains multiple elements.

---

# Naming Node References

Use a semantic name:

```js
const profileContainer =
  document.querySelector("#profile");
```

rather than:

```js
const node =
  document.querySelector("#profile");
```

unless the generic node abstraction is intentionally important.

---

# Naming Storage Keys

Use a consistent convention:

```js
const THEME_STORAGE_KEY =
  "theme-preference";
```

This avoids repeating raw strings throughout the application.

---

# Naming Environment Variables

Environment variable naming conventions are usually uppercase:

```text
DATABASE_URL
API_URL
PUBLIC_API_URL
NODE_ENV
```

The exact prefix depends on the environment and framework.

Never place secrets directly in source code merely to make naming easier.

---

# Naming Modules

A module should have a name that communicates its responsibility.

Examples:

```text
auth.js
api-client.js
date-utils.js
validation.js
storage.js
```

Avoid combining unrelated responsibilities into one module simply because the file name sounds generic.

---

# Naming Utility Functions

Utilities should describe the operation:

```js
formatCurrency();
parseQueryString();
isValidEmail();
normalizeName();
clampValue();
```

Avoid:

```js
helper();
process();
doThing();
utilityFunction();
```

---

# Naming API Methods

Use names consistent with the API's domain.

For example:

```js
getUserById();
createUser();
updateUser();
deleteUser();
```

The method names form a predictable vocabulary.

---

# Naming Database Functions

Database operations often use:

```js
findUserById();
findUsers();
insertUser();
updateUser();
deleteUser();
```

The exact vocabulary depends on the repository or data layer.

The important principle is consistency.

---

# Naming Classes and Instances

Class:

```js
class ApiClient {}
```

Instance:

```js
const apiClient =
  new ApiClient();
```

The class uses `PascalCase`.

The instance uses `camelCase`.

---

# Naming Constructors

Constructors are normally the class name:

```js
class UserProfile {
  constructor(name) {
    this.name = name;
  }
}
```

Usage:

```js
const profile =
  new UserProfile(
    "Osama Abu Motlaq"
  );
```

---

# Naming Symbols

Symbols used as special keys should communicate their meaning:

```js
const userId =
  Symbol("userId");
```

Avoid meaningless descriptions:

```js
const x =
  Symbol("x");
```

unless the symbol is truly generic.

---

# Naming Private Class Fields

Private fields should still be descriptive:

```js
class UserAccount {
  #balance = 0;
  #accountId = null;
}
```

Do not shorten names simply because the fields are private.

---

# Naming Getters and Setters

Use property-like names:

```js
class UserProfile {
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}
```

Callers interact with:

```js
profile.name;
```

rather than:

```js
profile.getName();
profile.setName();
```

when using actual getters and setters.

---

# Naming Acronyms

Acronym style should remain consistent.

For example:

```js
const userId = 10;
const apiUrl = "/api";
```

is commonly easier to read than:

```js
const userID = 10;
const APIURL = "/api";
```

But established project conventions should be respected.

---

# Naming `URL` and `ID`

JavaScript projects often use:

```js
userId
apiUrl
imageUrl
```

while other systems may use:

```js
userID
apiURL
imageURL
```

There is no universal requirement.

Choose a convention and use it consistently.

For this reference, prefer:

```text
Id
Url
Api
```

within `camelCase` names.

Examples:

```js
const userId = 10;
const apiUrl = "/api";
const apiClient = {};
```

---

# Avoid Negated Boolean Names

Avoid:

```js
const isNotActive = false;
const isNotDisabled = true;
```

These names can create double negatives.

Prefer representing the positive state:

```js
const isActive = true;
const isDisabled = false;
```

Then use normal logic:

```js
if (!isActive) {
  // ...
}
```

---

# Avoid Double Negatives

Avoid:

```js
if (!isNotActive) {
  // ...
}
```

Prefer:

```js
if (isActive) {
  // ...
}
```

Double negatives increase cognitive load.

---

# Name Functions by Observable Behavior

A function named:

```js
calculateTotal();
```

should calculate a total.

A function named:

```js
saveUser();
```

should save a user.

Do not let names imply behavior the function does not perform.

---

# Avoid Misleading Names

Bad:

```js
function getUser() {
  deleteUser();
}
```

The name and implementation disagree.

Names form part of the API contract.

---

# Naming Side Effects

A name can help communicate side effects.

Compare:

```js
const formattedName =
  formatName(user.name);
```

with:

```js
const formattedName =
  saveAndFormatName(user.name);
```

The second name tells the reader that something more than formatting occurs.

Side effects should not be hidden behind innocent-sounding names.

---

# Naming Pure Functions

Pure transformations often work well as verbs describing the transformation:

```js
formatDate();
normalizeUser();
sortProjects();
filterUsers();
calculateTotal();
```

The function should return the described result without unexpected side effects.

---

# Naming Mutations

When a function mutates an object or collection, a mutation-oriented verb can make that behavior clearer.

Examples:

```js
addItem();
removeItem();
updateUser();
resetForm();
clearCache();
```

The name communicates that something changes.

---

# Naming `reset`, `clear`, and `remove`

Use these terms precisely.

`reset`:

```js
resetForm();
```

Restore a known default state.

`clear`:

```js
clearCache();
```

Remove existing contents.

`remove`:

```js
removeItem(itemId);
```

Remove a specific item.

Precise vocabulary makes APIs easier to predict.

---

# Naming `validate`

`validate` can mean different things.

If it returns a boolean:

```js
function isValidEmail(email) {
  return true;
}
```

If it performs validation and returns detailed results:

```js
function validateUser(user) {
  return {
    isValid: true,
    errors: [],
  };
}
```

If it throws on invalid input:

```js
function validateUser(user) {
  if (!user.email) {
    throw new Error(
      "Email is required."
    );
  }
}
```

The name and contract should agree.

---

# Naming `parse`

Use `parse` when transforming serialized or encoded input into structured data.

Examples:

```js
parseJson();
parseUrl();
parseQueryString();
parseDate();
```

The name communicates transformation from one representation to another.

---

# Naming `serialize`

Use `serialize` when converting structured data into a storable or transferable representation.

Examples:

```js
serializeUser();
serializeForm();
serializeQuery();
```

This creates a predictable vocabulary around data transformations.

---

# Naming `normalize`

Use `normalize` when converting different or inconsistent representations into a consistent format.

Example:

```js
normalizeUser();
normalizePhoneNumber();
normalizeSearchQuery();
```

The term should describe a real normalization operation.

---

# Naming `transform`

`transform` is useful when a value changes shape or representation.

Example:

```js
transformApiResponse();
transformUserData();
```

Do not use it for every function that changes data.

More specific names are often better.

---

# Naming `convert`

Use `convert` when moving between types, units, or representations.

Examples:

```js
convertCurrency();
convertToNumber();
convertTemperature();
```

The source and target representation should be clear when relevant.

---

# Naming `format`

Use `format` for presentation-oriented transformations:

```js
formatCurrency();
formatDate();
formatPhoneNumber();
```

The function should generally produce a display-friendly representation rather than persist data.

---

# Naming `render`

Use `render` when producing or updating UI output.

Example:

```js
renderUserProfile(user);
renderProjects(projects);
```

The name communicates a presentation side effect.

---

# Naming `handle`

Use `handle` primarily for event or callback handling:

```js
handleClick();
handleSubmit();
handleChange();
handleError();
```

Avoid using `handle` for every function.

A function that calculates a value should usually be named after the calculation:

```js
calculateTotal();
```

not:

```js
handleTotal();
```

---

# Naming `on` Functions

In UI systems, `on` can describe event callbacks:

```js
onSubmit();
onChange();
onClick();
```

However, names beginning with `on` are often better suited to callback props or event APIs.

For internal event handler functions:

```js
handleSubmit();
handleChange();
```

can be more descriptive.

---

# Naming Callback Props

In component-based systems, callback props often use `on`:

```js
<Component
  onSubmit={handleSubmit}
/>
```

The convention communicates:

```text
The component receives something
that should happen when an event occurs.
```

---

# Naming Components

For React components, use `PascalCase`:

```js
function UserProfile() {
  // ...
}
```

Not:

```js
function userProfile() {
  // ...
}
```

The naming convention distinguishes components from normal functions.

---

# Naming Hooks

Custom React hooks should begin with `use`:

```js
function useUserProfile() {
  // ...
}
```

This convention also communicates that the function follows React's Hook semantics.

---

# Naming Contexts

A context should describe the data or capability it provides:

```js
const ThemeContext = {};
const AuthContext = {};
const UserContext = {};
```

Avoid:

```js
const Context1 = {};
```

---

# Naming Reducer Functions

Reducer names should represent the state they manage:

```js
function cartReducer(state, action) {
  // ...
}
```

Avoid:

```js
function reducer(state, action) {
  // ...
}
```

when multiple reducers exist.

---

# Naming Actions

Action names should communicate what happened.

Examples:

```js
"cart/item-added"
"cart/item-removed"
"user/profile-updated"
"auth/logged-in"
```

The exact convention depends on the architecture.

Predictability is the important goal.

---

# Naming Files and Functions Together

A predictable relationship improves navigation.

Example:

```text
format-date.js
```

contains:

```js
export function formatDate() {
  // ...
}
```

Another:

```text
user-service.js
```

contains:

```js
export function getUser() {
  // ...
}
```

The connection should be obvious.

---

# Naming Environment-Specific Values

Make the environment visible when relevant:

```js
const developmentApiUrl = "...";
const productionApiUrl = "...";
```

or use configuration objects:

```js
const config = {
  apiUrl: "...",
};
```

Avoid:

```js
const url = "...";
```

when several environment-specific URLs exist.

---

# Naming Configuration Properties

Configuration names should describe exactly what they control:

```js
const config = {
  apiUrl: "...",
  timeout: 5000,
  retryCount: 3,
};
```

Avoid:

```js
const config = {
  url: "...",
  time: 5000,
  count: 3,
};
```

unless the context makes them unambiguous.

---

# Naming Errors and Status Values

Use explicit status vocabulary.

Prefer:

```js
const status = "loading";
```

and:

```js
const requestStatus = "loading";
```

when multiple statuses exist.

Avoid:

```js
const state = "loading";
```

when several unrelated states are present in the same scope.

---

# Naming Enums or Constant Objects

For a fixed set of states:

```js
const REQUEST_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
```

This creates a central vocabulary.

---

# Avoid Duplicate Vocabulary

Do not represent the same concept using several unrelated names.

For example:

```text
userId
accountId
memberId
```

should not all mean the same underlying concept unless the domain genuinely distinguishes them.

Pick a canonical term.

---

# Domain Vocabulary Should Be Stable

If your application calls a person a:

```text
user
```

do not randomly alternate between:

```text
user
customer
member
account
person
```

unless those are genuinely different concepts.

Stable vocabulary prevents confusion.

---

# Naming Across Layers

A concept should generally retain its core terminology across layers.

For example:

```text
UI:
user

API:
user

Database:
user
```

Specific naming conventions may differ syntactically, but the domain concept should remain recognizable.

---

# Avoid Translation Between Unnecessary Names

Avoid:

```js
const customer =
  userFromApi;
```

when `customer` and `user` actually represent the same concept.

Rename only when the domain meaning changes.

---

# Naming Function Parameters Based on Domain

Prefer:

```js
function calculateShipping(
  order
) {
  // ...
}
```

over:

```js
function calculateShipping(
  data
) {
  // ...
}
```

The domain name communicates what the function expects.

---

# Avoid Generic Object Parameters

Weak:

```js
function save(data) {
  // ...
}
```

Better:

```js
function saveUser(user) {
  // ...
}
```

or:

```js
function saveUserProfile(profile) {
  // ...
}
```

The second form is easier to understand at the call site.

---

# Naming Return Values

When a function returns a meaningful value, preserve that meaning.

```js
const total =
  calculateTotal(order);

const formattedDate =
  formatDate(createdAt);

const activeUsers =
  getActiveUsers(users);
```

Avoid:

```js
const result =
  calculateTotal(order);
```

unless the result genuinely has no more specific meaning.

---

# Use Parallel Names for Parallel Concepts

Good:

```js
const createdAt = ...;
const updatedAt = ...;
const deletedAt = ...;
```

Good:

```js
const minPrice = ...;
const maxPrice = ...;
```

Good:

```js
const startDate = ...;
const endDate = ...;
```

Parallel naming makes relationships obvious.

---

# Naming Ranges and Bounds

Prefer:

```js
const minAge = 18;
const maxAge = 65;
```

over:

```js
const age1 = 18;
const age2 = 65;
```

The semantic relationship is immediately visible.

---

# Naming Dimensions

Prefer:

```js
const width = 800;
const height = 600;
```

over:

```js
const a = 800;
const b = 600;
```

The same principle applies to:

```text
x
y
z
```

when the mathematical context makes them meaningful.

---

# Naming Counters by Unit

Prefer:

```js
const retryCount = 3;
const itemCount = 10;
const durationInSeconds = 30;
```

over ambiguous values:

```js
const count = 3;
const total = 10;
const duration = 30;
```

when the unit matters.

---

# Include Units When Necessary

Prefer:

```js
const timeoutInMilliseconds = 5000;
```

or:

```js
const timeoutMs = 5000;
```

when multiple units could be confused.

The same principle applies to:

```js
const durationInSeconds = 30;
const distanceInKilometers = 10;
const priceInCents = 5000;
```

---

# Naming Currency

Currency values should make the representation clear when necessary.

For example:

```js
const priceInCents = 1999;
```

is more explicit than:

```js
const price = 1999;
```

when the application stores cents internally.

---

# Naming Dates vs Timestamps

Differentiate between a `Date` object and a numeric timestamp when that distinction matters:

```js
const createdAt =
  new Date();

const createdAtTimestamp =
  Date.now();
```

Precise names reduce type confusion.

---

# Avoid Naming a Value by Its Implementation

Avoid:

```js
const arrayOfUsers = [];
```

when `users` is sufficient.

Avoid:

```js
const userObject = {};
```

when `user` is sufficient.

Name values by what they mean rather than how they are implemented.

---

# Name by Abstraction Level

A function working at the business level should usually use business terminology:

```js
calculateOrderTotal();
```

rather than implementation details:

```js
reducePriceArray();
```

The implementation may use `reduce`, but the API should describe the business operation.

---

# Expose Intent, Hide Implementation

Good:

```js
const total =
  calculateOrderTotal(order);
```

The caller should not need to know whether the implementation uses:

```text
reduce
for
map
database queries
multiple helper functions
```

Good names create a useful abstraction boundary.

---

# Naming Helpers

If a helper exists because of a specific operation, name it after that operation.

Prefer:

```js
formatUserName();
```

over:

```js
userHelper();
```

The latter provides little useful information.

---

# Avoid Generic `helper.js` Files

A project with:

```text
helpers.js
```

often becomes a collection of unrelated functions.

Prefer focused files:

```text
date-utils.js
string-utils.js
validation.js
formatters.js
```

when the codebase justifies the separation.

---

# Naming Tests

Test names should describe behavior.

Prefer:

```js
it("returns false for an invalid email", () => {
  // ...
});
```

instead of:

```js
it("test email", () => {
  // ...
});
```

A good test name communicates the expected behavior.

---

# Naming Test Variables

Keep test data meaningful:

```js
const validEmail =
  "osama@example.com";

const invalidEmail =
  "invalid-email";
```

instead of:

```js
const x = "...";
const y = "...";
```

Readable tests are easier to maintain.

---

# Naming Mocks

Make mocked dependencies explicit:

```js
const mockUser = {
  name: "Osama Abu Motlaq",
};
```

or:

```js
const mockFetchUser =
  jest.fn();
```

The `mock` prefix can communicate test-only behavior.

---

# Naming Fixtures

Fixtures should describe what they represent:

```js
const userFixture = {
  name: "Osama Abu Motlaq",
};

const orderFixture = {
  id: 1,
};
```

Avoid:

```js
const fixture1 = {};
const fixture2 = {};
```

---

# Naming Environment Files

Environment file names should follow the tooling and framework conventions.

Examples include:

```text
.env
.env.local
.env.test
.env.production
```

Do not invent custom naming patterns that conflict with the environment's expectations.

---

# Naming Git-Related Scripts

Package scripts should describe actions clearly:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "...",
    "lint": "..."
  }
}
```

Avoid vague script names such as:

```json
{
  "scripts": {
    "do-it": "..."
  }
}
```

---

# Avoid Misleading Plurals

Use plural names for collections.

But do not pluralize objects:

```js
const users = [];
const user = {};
```

Avoid:

```js
const user = [];
const users = {};
```

unless the data model genuinely requires that representation.

---

# Naming Empty Values

The name should describe what the value will represent even when initially empty:

```js
const users = [];
const selectedUser = null;
const errorMessage = null;
```

Avoid:

```js
const value = null;
const thing = [];
```

---

# Naming Optional Values

Optional values should still have meaningful names:

```js
const optionalUserId =
  getUserId();
```

In many cases, the `optional` prefix is unnecessary if the type or behavior already makes it obvious.

Prefer:

```js
const userId =
  getUserId();
```

when the surrounding contract clearly allows `null` or `undefined`.

---

# Naming Fallback Values

Prefer:

```js
const defaultName =
  "Osama Abu Motlaq";
```

or:

```js
const fallbackName =
  "Unknown User";
```

depending on the semantic difference.

`default` and `fallback` should not be treated as interchangeable when the behavior differs.

---

# Naming Cached Values

Use:

```js
const cachedUser =
  cache.get(userId);
```

when the value specifically came from cache.

This can distinguish it from:

```js
const user =
  await fetchUser(userId);
```

---

# Naming Derived Values

Derived values should communicate their relationship:

```js
const fullName =
  `${firstName} ${lastName}`;

const totalPrice =
  subtotal + shippingCost;

const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

Good names make derivation obvious.

---

# Avoid `result`, `response`, and `value` by Default

These names are not always wrong.

They become weak when the actual concept is known.

Weak:

```js
const result =
  calculateTotal(order);
```

Better:

```js
const orderTotal =
  calculateTotal(order);
```

Weak:

```js
const value =
  formatDate(date);
```

Better:

```js
const formattedDate =
  formatDate(date);
```

---

# When Generic Names Are Appropriate

Generic names are appropriate when the abstraction itself is generic.

Example:

```js
function identity(value) {
  return value;
}
```

Here `value` is intentionally generic.

Another:

```js
function swap(a, b) {
  return [b, a];
}
```

The parameters are generic by design.

Naming should follow the abstraction.

---

# Naming Mathematical Functions

Use conventional notation when it improves mathematical clarity.

Example:

```js
function calculateDistance(x1, y1, x2, y2) {
  // ...
}
```

Here `x1`, `y1`, `x2`, and `y2` have established mathematical meaning.

Do not replace meaningful mathematical names with verbose names when that harms readability.

---

# Naming Regex Groups

When named groups are supported, use meaningful names:

```js
const pattern =
  /(?<username>\w+)@(?<domain>\w+\.\w+)/;
```

Meaningful group names are easier to use later.

---

# Naming Symbols and Private APIs

Internal identifiers can still benefit from clear names:

```js
const internalCache =
  new Map();
```

Avoid treating "internal" as an excuse for meaningless naming.

Code may become public later.

---

# Naming Public APIs Carefully

Names exported from modules are more important because other code depends on them.

Prefer:

```js
export function calculateOrderTotal() {}
```

over:

```js
export function process() {}
```

Public names should be stable and descriptive.

---

# Naming Should Survive Refactoring

Good names describe the concept rather than the current implementation.

Weak:

```js
const filteredArray =
  users.filter(...);
```

Better:

```js
const activeUsers =
  users.filter(...);
```

If the implementation changes from `filter()` to a database query, `activeUsers` still makes sense.

---

# Avoid Names Tied to Algorithms

Weak:

```js
const reducedUsers =
  users.reduce(...);
```

Better:

```js
const usersByRole =
  users.reduce(...);
```

The second name communicates the result rather than the algorithm used to produce it.

---

# Avoid Names Tied to UI Details

Weak:

```js
const leftBlueBox = ...;
```

Better:

```js
const userProfile = ...;
```

Implementation-specific visual descriptions become fragile when the UI changes.

---

# Name by Responsibility

A service named:

```js
NotificationService
```

should deal with notifications.

A function named:

```js
sendNotification()
```

should send notifications.

The naming system should reflect responsibility boundaries.

---

# Names as Documentation

Good names can eliminate unnecessary comments.

Instead of:

```js
// Check whether the user can edit
// the current project.
if (user.permissions.includes("edit")) {
  // ...
}
```

Use:

```js
const canEditProject =
  user.permissions.includes("edit");

if (canEditProject) {
  // ...
}
```

The code now communicates the concept directly.

---

# Naming Reduces Cognitive Load

Weak:

```js
const a = users.filter(
  (x) => x.active
);
```

Stronger:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

The second version contains enough information to understand the operation without mentally decoding variables.

---

# Naming Consistency Across a Codebase

Choose one vocabulary.

For example, do not use:

```text
removeUser()
deleteUser()
destroyUser()
```

for exactly the same operation across different modules.

Choose the term that best represents the domain and use it consistently.

---

# Naming Standards for This Reference

This repository uses the following general conventions:

```text
camelCase:
Variables
Functions
Methods
Object properties

PascalCase:
Classes
React components
Constructors
Custom types when applicable

UPPER_SNAKE_CASE:
True constants
Configuration constants
Fixed enumerations

Plural names:
Collections

Boolean prefixes:
is
has
can
should
```

Examples:

```js
const userName = "Osama Abu Motlaq";
const userProfiles = [];

const isActive = true;
const hasAccess = true;
const canEdit = false;

const MAX_RETRIES = 3;

function getUserProfile() {
  // ...
}

class UserProfile {
  // ...
}
```

---

# Naming Checklist

Before finalizing a variable, function, class, or module, ask:

```text
[ ] Does the name communicate its purpose?

[ ] Is the name specific enough?

[ ] Is the name unnecessarily long?

[ ] Is the name consistent with the surrounding code?

[ ] Does the name match the actual behavior?

[ ] Does a boolean read naturally?

[ ] Does a collection use a plural name?

[ ] Does a function name describe its action?

[ ] Does a class name describe the object type?

[ ] Is an abbreviation really necessary?

[ ] Is the name tied too closely to the implementation?

[ ] Would another developer understand the name
    without opening the implementation?

[ ] Does the same concept use the same terminology
    elsewhere in the project?
```

---

# Final Naming Principles

```text
Name things by meaning.

Prefer clarity over brevity.

Avoid meaningless abbreviations.

Use domain vocabulary.

Use verbs for actions.

Use nouns for data and objects.

Use questions for boolean functions.

Use plural names for collections.

Use consistent prefixes for booleans.

Use consistent naming across modules.

Do not hide side effects behind misleading names.

Do not name values after their implementation
when the domain meaning is more useful.

Prefer names that remain correct after refactoring.

Use context to avoid unnecessary verbosity.

Do not make names longer than their value.

Treat public names as part of the API.

Make the code explain itself whenever possible.
```

---

# Summary

Naming is not a cosmetic decision.

A name is part of the program's interface.

Good naming allows developers to understand code faster, makes APIs easier to use, and reduces the amount of context required to modify a system safely.

A strong naming strategy can often be summarized as:

```text
Meaning
  +
Consistency
  +
Context
  +
Precision
  =
Readable Code
```

The best name is not necessarily the shortest name or the longest name.

It is the name that communicates the correct concept with the least unnecessary mental effort.
