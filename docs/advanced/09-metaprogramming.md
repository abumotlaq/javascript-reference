# JavaScript Metaprogramming

## Overview

Metaprogramming is the practice of writing code that can inspect, control, or change the behavior of other code and language-level operations.

In JavaScript, metaprogramming commonly involves:

* Property descriptors
* `Object.defineProperty()`
* `Object.getOwnPropertyDescriptor()`
* `Object.getOwnPropertyDescriptors()`
* `Reflect`
* `Proxy`
* `Symbol`
* Custom property access
* Custom assignment behavior
* Custom function calls
* Custom construction
* Custom `instanceof` behavior
* Prototype manipulation
* Object extensibility control

Metaprogramming is powerful because it allows JavaScript code to participate in operations that normally happen implicitly.

A simplified model is:

```text id="az7q1m"
Normal Code
    |
    v
JavaScript Operation
    |
    v
Default Behavior


Metaprogramming
    |
    v
JavaScript Operation
    |
    v
Custom Behavior
```

---

# What Is Metaprogramming?

Normal programming usually means:

```js id="v2d8sz"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  user.name
);
```

Metaprogramming is about controlling operations such as:

```text id="5v9z4e"
What happens when a property is read?
What happens when a property is written?
What properties exist?
What happens when a property is deleted?
What happens when a function is called?
What happens when an object is created with new?
What happens when instanceof is evaluated?
```

JavaScript exposes APIs that let you customize some of these operations.

---

# Property Descriptors

Every own property has a property descriptor.

Example:

```js id="q1r3tj"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.getOwnPropertyDescriptor(
    user,
    "name"
  )
);
```

A typical descriptor contains:

```text id="5r9f2q"
value
writable
enumerable
configurable
```

---

# Data Property Descriptors

Example:

```js id="m3e8fl"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: true,
    enumerable: true,
    configurable: true,
  }
);

console.log(
  user.name
);
```

The descriptor controls how the property behaves.

---

# `writable`

A non-writable property cannot normally be changed through assignment.

```js id="g4j2qx"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: false,
    enumerable: true,
    configurable: true,
  }
);

user.name =
  "Osama Abu Motlaq - Developer";

console.log(
  user.name
);
```

In non-strict code, the assignment is ignored.

In strict mode, attempting to write can throw a `TypeError`.

---

# `enumerable`

The `enumerable` descriptor controls whether a property appears in common property enumeration operations.

```js id="c7m8vy"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: true,
    enumerable: false,
    configurable: true,
  }
);

console.log(
  Object.keys(user)
);
```

The property does not appear in `Object.keys()`.

But it still exists:

```js id="9sx7pn"
console.log(
  user.name
);
```

---

# `configurable`

The `configurable` descriptor controls whether the property descriptor can be changed or the property can be deleted.

```js id="8v4wjm"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: true,
    enumerable: true,
    configurable: false,
  }
);
```

Once a property becomes non-configurable, its descriptor cannot generally be redefined arbitrarily.

---

# Property Descriptors Are Not the Same as Values

Consider:

```js id="t2f8wu"
const user = {
  name: "Osama Abu Motlaq",
};
```

The property includes more than:

```text id="2g0w9y"
name → value
```

It also has behavioral attributes.

Conceptually:

```text id="m8ln9l"
name
|
├── value
├── writable
├── enumerable
└── configurable
```

---

# Accessor Descriptors

Properties can also use:

```text id="1qk0sc"
get
set
enumerable
configurable
```

Example:

```js id="b3w5n0"
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",
};

Object.defineProperty(
  user,
  "fullName",
  {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },

    enumerable: true,
    configurable: true,
  }
);

console.log(
  user.fullName
);
```

---

# Getter

A getter runs when the property is read.

```js id="4g9j3n"
const user = {
  name: "Osama Abu Motlaq",

  get description() {
    return `${this.name} is a Frontend Developer.`;
  },
};

console.log(
  user.description
);
```

Notice:

```js id="1s0r2e"
user.description
```

is used without parentheses.

---

# Setter

A setter runs when the property is assigned.

```js id="h7b5wq"
const user = {
  name: "Osama Abu Motlaq",

  set displayName(value) {
    this.name =
      value.trim();
  },
};

user.displayName =
  "  Osama Abu Motlaq  ";

console.log(
  user.name
);
```

---

# Getter and Setter Together

```js id="q8a4yd"
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    const [firstName, lastName] =
      value.split(" ");

    this.firstName =
      firstName;

    this.lastName =
      lastName;
  },
};

console.log(
  user.fullName
);

user.fullName =
  "Osama Abu Motlaq";

console.log(
  user.fullName
);
```

---

# `Object.defineProperty()`

The method:

```js id="s4p8n7"
Object.defineProperty()
```

allows you to define or redefine an own property with a descriptor.

Example:

```js id="jj6qtf"
const user = {};

Object.defineProperty(
  user,
  "role",
  {
    value:
      "Frontend Developer",
    writable: true,
    enumerable: true,
    configurable: true,
  }
);

console.log(
  user.role
);
```

---

# `Object.defineProperties()`

Multiple properties can be defined at once.

```js id="ka03l9"
const user = {};

Object.defineProperties(
  user,
  {
    name: {
      value: "Osama Abu Motlaq",
      writable: true,
      enumerable: true,
      configurable: true,
    },

    role: {
      value:
        "Frontend Developer",
      writable: true,
      enumerable: true,
      configurable: true,
    },
  }
);

console.log(user);
```

---

# Getting a Descriptor

```js id="p5x3qu"
const user = {
  name: "Osama Abu Motlaq",
};

const descriptor =
  Object.getOwnPropertyDescriptor(
    user,
    "name"
  );

console.log(
  descriptor
);
```

---

# Getting All Descriptors

```js id="6y2a9m"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(
  Object.getOwnPropertyDescriptors(
    user
  )
);
```

This returns descriptors for all own properties.

---

# Descriptors and Copying

A normal spread:

```js id="r0t6xk"
const copy = {
  ...user,
};
```

copies own enumerable values.

It does not preserve all property descriptors.

For example, accessor properties can behave differently after copying.

---

# Descriptor-Preserving Copy

```js id="u3l6cz"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: false,
    enumerable: true,
    configurable: false,
  }
);

const copy =
  Object.create(
    Object.getPrototypeOf(user),
    Object.getOwnPropertyDescriptors(
      user
    )
  );

console.log(
  Object.getOwnPropertyDescriptor(
    copy,
    "name"
  )
);
```

This preserves the descriptor behavior.

---

# Reflect

`Reflect` provides methods for performing several fundamental JavaScript object operations.

Examples include:

```text id="2x8a1d"
Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.defineProperty()
Reflect.getOwnPropertyDescriptor()
Reflect.getPrototypeOf()
Reflect.setPrototypeOf()
Reflect.ownKeys()
Reflect.construct()
Reflect.apply()
Reflect.preventExtensions()
Reflect.isExtensible()
Reflect.getOwnPropertyDescriptor()
Reflect.defineProperty()
```

---

# `Reflect.get()`

Example:

```js id="5n4j0w"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Reflect.get(
    user,
    "name"
  )
);
```

This performs property access programmatically.

---

# `Reflect.set()`

```js id="2j9t5n"
const user = {
  name: "Osama Abu Motlaq",
};

Reflect.set(
  user,
  "role",
  "Frontend Developer"
);

console.log(
  user.role
);
```

---

# `Reflect.has()`

```js id="v4y8km"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Reflect.has(
    user,
    "name"
  )
);

console.log(
  Reflect.has(
    user,
    "toString"
  )
);
```

Like `in`, the lookup can include inherited properties.

---

# `Reflect.deleteProperty()`

```js id="c5p6s9"
const user = {
  name: "Osama Abu Motlaq",
};

Reflect.deleteProperty(
  user,
  "name"
);

console.log(
  user.name
);
```

---

# `Reflect.defineProperty()`

```js id="j8w4ha"
const user = {};

const success =
  Reflect.defineProperty(
    user,
    "name",
    {
      value:
        "Osama Abu Motlaq",
      enumerable: true,
      writable: true,
      configurable: true,
    }
  );

console.log(
  success
);

console.log(
  user.name
);
```

Unlike `Object.defineProperty()`, `Reflect.defineProperty()` returns a boolean indicating whether the operation succeeded.

---

# `Reflect.getPrototypeOf()`

```js id="g7b2rj"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Reflect.getPrototypeOf(
    user
  )
);
```

---

# `Reflect.setPrototypeOf()`

```js id="q1c9vt"
const prototype = {
  role: "Frontend Developer",
};

const user = {
  name: "Osama Abu Motlaq",
};

Reflect.setPrototypeOf(
  user,
  prototype
);

console.log(
  user.role
);
```

Prototype mutation should still be used carefully.

---

# `Reflect.ownKeys()`

`Reflect.ownKeys()` returns all own property keys, including:

* String keys
* Enumerable and non-enumerable keys
* Symbol keys

Example:

```js id="d2f6rh"
const secret =
  Symbol("secret");

const user = {
  name: "Osama Abu Motlaq",
};

user[secret] =
  "Private-like value";

Object.defineProperty(
  user,
  "hidden",
  {
    value: true,
    enumerable: false,
  }
);

console.log(
  Reflect.ownKeys(user)
);
```

---

# Symbols in Metaprogramming

Symbols can provide unique property keys.

```js id="y4s7mc"
const id =
  Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
};

user[id] =
  100;

console.log(
  user[id]
);
```

Symbols are useful when you need property keys that are unlikely to collide with normal string property names.

---

# Symbol Keys Are Not Returned by `Object.keys()`

```js id="r1u2kx"
const id =
  Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
};

user[id] = 100;

console.log(
  Object.keys(user)
);
```

The Symbol key is not included in `Object.keys()`.

But:

```js id="c4m8ds"
console.log(
  Reflect.ownKeys(user)
);
```

includes it.

---

# Well-Known Symbols

JavaScript defines special symbols that customize built-in language behavior.

Examples include:

```text id="u1yxhm"
Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.species
Symbol.match
Symbol.replace
Symbol.search
Symbol.split
```

These allow objects to participate in built-in operations.

---

# `Symbol.iterator`

An object can define its own iterator behavior.

Example:

```js id="s1c7hb"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",

  *[Symbol.iterator]() {
    yield this.name;
    yield this.role;
  },
};

for (
  const value of user
) {
  console.log(value);
}
```

The object now works with:

```js id="z6g8pw"
for...of
```

because it provides an iterator.

---

# Custom Iterator Behavior

A more explicit iterator:

```js id="e9p3wd"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",

  [Symbol.iterator]() {
    const values = [
      this.name,
      this.role,
    ];

    let index = 0;

    return {
      next() {
        if (
          index <
          values.length
        ) {
          return {
            value:
              values[index++],
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  },
};

for (
  const value of user
) {
  console.log(value);
}
```

---

# `Symbol.toPrimitive`

`Symbol.toPrimitive` customizes how an object is converted to a primitive.

Example:

```js id="w9y5p2"
const user = {
  name: "Osama Abu Motlaq",

  [Symbol.toPrimitive](
    hint
  ) {
    if (
      hint === "string"
    ) {
      return this.name;
    }

    return 1;
  },
};

console.log(
  String(user)
);

console.log(
  Number(user)
);
```

The `hint` can influence which representation the object returns.

---

# Primitive Conversion

Normally JavaScript determines how to convert objects when an operation expects a primitive.

`Symbol.toPrimitive` allows an object to customize this process.

Example:

```js id="42z7ca"
const value = {
  [Symbol.toPrimitive](
    hint
  ) {
    if (
      hint === "string"
    ) {
      return "Custom String";
    }

    return 100;
  },
};

console.log(
  String(value)
);

console.log(
  Number(value)
);
```

---

# `Symbol.toStringTag`

This symbol can customize the result of:

```js id="4b2n7a"
Object.prototype.toString.call()
```

Example:

```js id="k3w8yh"
const user = {
  [Symbol.toStringTag]:
    "User",
};

console.log(
  Object.prototype.toString.call(
    user
  )
);
```

A result similar to:

```text id="pc4z5s"
[object User]
```

can be produced.

---

# `Symbol.hasInstance`

A class or constructor can customize how `instanceof` behaves.

Example:

```js id="l7x4wf"
class Developer {
  static [Symbol.hasInstance](
    value
  ) {
    return (
      value !== null &&
      typeof value === "object" &&
      value.role ===
        "Frontend Developer"
    );
  }
}

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(
  user instanceof Developer
);
```

The custom `Symbol.hasInstance` method controls the result.

---

# `Proxy`

A `Proxy` allows an object or function to be wrapped so that operations can be intercepted.

Basic structure:

```js id="w0y6sn"
const proxy =
  new Proxy(
    target,
    handler
  );
```

Where:

```text id="zzkqbp"
target
→ original object

handler
→ customization rules

proxy
→ wrapped object
```

---

# Basic Proxy

```js id="q6k2dn"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {}
  );

console.log(
  proxy.name
);
```

With an empty handler, normal behavior is forwarded.

---

# Proxy `get` Trap

The `get` trap intercepts property reads.

```js id="x6k8pq"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      get(target, property) {
        console.log(
          "Reading:",
          property
        );

        return target[property];
      },
    }
  );

console.log(
  proxy.name
);
```

---

# `get` Trap Parameters

The common parameters are:

```text id="7f4j8e"
target
property
receiver
```

Example:

```js id="f5n2mb"
const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          target
        );

        console.log(
          property
        );

        console.log(
          receiver
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );
```

---

# Use `Reflect` Inside Proxy Traps

Instead of manually reproducing all JavaScript property semantics:

```js id="11g6pi"
return target[property];
```

often prefer:

```js id="32q4yw"
return Reflect.get(
  target,
  property,
  receiver
);
```

This preserves more of the default language behavior.

---

# Proxy `set` Trap

The `set` trap intercepts property assignments.

```js id="1n2qvt"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        console.log(
          "Writing:",
          property,
          value
        );

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );

proxy.role =
  "Frontend Developer";
```

---

# Validating Assignments

A proxy can validate data.

```js id="s9g1ut"
const user = {};

const proxy =
  new Proxy(
    user,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property ===
            "age" &&
          typeof value !==
            "number"
        ) {
          throw new TypeError(
            "Age must be a number."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );

proxy.age = 25;

console.log(
  proxy.age
);
```

---

# `deleteProperty` Trap

The `deleteProperty` trap intercepts:

```js id="9u4f3v"
delete object.property
```

Example:

```js id="7v9wqh"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      deleteProperty(
        target,
        property
      ) {
        console.log(
          "Deleting:",
          property
        );

        return Reflect.deleteProperty(
          target,
          property
        );
      },
    }
  );

delete proxy.name;
```

---

# `has` Trap

The `has` trap intercepts:

```js id="6p8dju"
property in object
```

Example:

```js id="4w5s8n"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      has(
        target,
        property
      ) {
        console.log(
          "Checking:",
          property
        );

        return Reflect.has(
          target,
          property
        );
      },
    }
  );

console.log(
  "name" in proxy
);
```

---

# `ownKeys` Trap

The `ownKeys` trap controls the keys returned by operations such as:

```js id="j7h5vx"
Reflect.ownKeys()
Object.keys()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
```

Example:

```js id="7q4n8e"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const proxy =
  new Proxy(
    user,
    {
      ownKeys(target) {
        console.log(
          "Getting keys."
        );

        return Reflect.ownKeys(
          target
        );
      },
    }
  );

console.log(
  Reflect.ownKeys(proxy)
);
```

---

# `getOwnPropertyDescriptor` Trap

This trap intercepts requests for property descriptors.

```js id="k4w0vm"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      getOwnPropertyDescriptor(
        target,
        property
      ) {
        console.log(
          "Descriptor:",
          property
        );

        return Reflect.getOwnPropertyDescriptor(
          target,
          property
        );
      },
    }
  );

console.log(
  Object.getOwnPropertyDescriptor(
    proxy,
    "name"
  )
);
```

---

# `defineProperty` Trap

```js id="c8f4ml"
const user = {};

const proxy =
  new Proxy(
    user,
    {
      defineProperty(
        target,
        property,
        descriptor
      ) {
        console.log(
          "Defining:",
          property
        );

        return Reflect.defineProperty(
          target,
          property,
          descriptor
        );
      },
    }
  );

Object.defineProperty(
  proxy,
  "name",
  {
    value: "Osama Abu Motlaq",
    enumerable: true,
  }
);
```

---

# `getPrototypeOf` Trap

```js id="m2k7de"
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

const proxy =
  new Proxy(
    user,
    {
      getPrototypeOf(
        target
      ) {
        console.log(
          "Getting prototype."
        );

        return Reflect.getPrototypeOf(
          target
        );
      },
    }
  );

console.log(
  Object.getPrototypeOf(
    proxy
  )
);
```

---

# `setPrototypeOf` Trap

```js id="v1m9gx"
const user = {
  name: "Osama Abu Motlaq",
};

const prototype = {
  role: "Frontend Developer",
};

const proxy =
  new Proxy(
    user,
    {
      setPrototypeOf(
        target,
        newPrototype
      ) {
        console.log(
          "Changing prototype."
        );

        return Reflect.setPrototypeOf(
          target,
          newPrototype
        );
      },
    }
  );

Object.setPrototypeOf(
  proxy,
  prototype
);

console.log(
  proxy.role
);
```

---

# `isExtensible` Trap

```js id="b2e6q1"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      isExtensible(target) {
        console.log(
          "Checking extensibility."
        );

        return Reflect.isExtensible(
          target
        );
      },
    }
  );

console.log(
  Object.isExtensible(
    proxy
  )
);
```

---

# `preventExtensions` Trap

```js id="d8c1ye"
const user = {};

const proxy =
  new Proxy(
    user,
    {
      preventExtensions(
        target
      ) {
        console.log(
          "Preventing extensions."
        );

        return Reflect.preventExtensions(
          target
        );
      },
    }
  );

Object.preventExtensions(
  proxy
);

console.log(
  Object.isExtensible(
    proxy
  )
);
```

---

# `apply` Trap

Functions can also be proxied.

```js id="p1m6vc"
function greet(
  name
) {
  return `Hello, ${name}!`;
}

const proxy =
  new Proxy(
    greet,
    {
      apply(
        target,
        thisArg,
        argumentsList
      ) {
        console.log(
          "Calling function."
        );

        return Reflect.apply(
          target,
          thisArg,
          argumentsList
        );
      },
    }
  );

console.log(
  proxy(
    "Osama Abu Motlaq"
  )
);
```

---

# `construct` Trap

A proxy can intercept constructor calls.

```js id="g5j9xs"
class User {
  constructor(name) {
    this.name = name;
  }
}

const proxy =
  new Proxy(
    User,
    {
      construct(
        target,
        argumentsList,
        newTarget
      ) {
        console.log(
          "Constructing object."
        );

        return Reflect.construct(
          target,
          argumentsList,
          newTarget
        );
      },
    }
  );

const user =
  new proxy(
    "Osama Abu Motlaq"
  );

console.log(
  user.name
);
```

---

# Proxy Traps and `Reflect`

A common pattern is:

```js id="v0sn9j"
const proxy =
  new Proxy(
    target,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
```

This creates a transparent wrapper with specific interception points.

---

# Read-Only Proxy

A proxy can prevent normal writes.

```js id="w6q8pe"
const user = {
  name: "Osama Abu Motlaq",
};

const readOnly =
  new Proxy(
    user,
    {
      set() {
        throw new TypeError(
          "Object is read-only."
        );
      },

      deleteProperty() {
        throw new TypeError(
          "Object is read-only."
        );
      },
    }
  );

console.log(
  readOnly.name
);
```

---

# Validation Proxy

```js id="m6w1gc"
const user = {};

const validatedUser =
  new Proxy(
    user,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property ===
            "name" &&
          typeof value !==
            "string"
        ) {
          throw new TypeError(
            "Name must be a string."
          );
        }

        if (
          property ===
            "age" &&
          (
            typeof value !==
              "number" ||
            value < 0
          )
        ) {
          throw new TypeError(
            "Age must be a non-negative number."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );

validatedUser.name =
  "Osama Abu Motlaq";

validatedUser.age =
  25;
```

---

# Logging Proxy

```js id="3b7y6d"
function createLogger(
  object
) {
  return new Proxy(
    object,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          "GET:",
          String(property)
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        console.log(
          "SET:",
          String(property),
          value
        );

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}

const user =
  createLogger({
    name: "Osama Abu Motlaq",
  });

console.log(
  user.name
);

user.role =
  "Frontend Developer";
```

---

# Default Values With a Proxy

```js id="28s8yj"
const defaults = {
  role: "Frontend Developer",
  language: "JavaScript",
};

const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        const value =
          Reflect.get(
            target,
            property,
            receiver
          );

        if (
          value === undefined &&
          property in defaults
        ) {
          return defaults[
            property
          ];
        }

        return value;
      },
    }
  );

console.log(
  proxy.role
);

console.log(
  proxy.language
);
```

---

# Negative Index Arrays

A proxy can customize array access.

```js id="0d1m1c"
function createNegativeIndexArray(
  array
) {
  return new Proxy(
    array,
    {
      get(
        target,
        property,
        receiver
      ) {
        if (
          typeof property ===
            "string" &&
          /^-\d+$/.test(property)
        ) {
          const index =
            target.length +
            Number(property);

          return target[index];
        }

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );
}

const numbers =
  createNegativeIndexArray([
    10,
    20,
    30,
    40,
  ]);

console.log(
  numbers[-1]
);

console.log(
  numbers[-2]
);
```

---

# Function Call Logging

A callable Proxy can monitor function execution.

```js id="p1n5mq"
function calculate(
  price,
  quantity
) {
  return price * quantity;
}

const loggedCalculate =
  new Proxy(
    calculate,
    {
      apply(
        target,
        thisArg,
        argumentsList
      ) {
        console.log(
          "Arguments:",
          argumentsList
        );

        const result =
          Reflect.apply(
            target,
            thisArg,
            argumentsList
          );

        console.log(
          "Result:",
          result
        );

        return result;
      },
    }
  );

console.log(
  loggedCalculate(
    100,
    3
  )
);
```

---

# `Proxy.revocable()`

A revocable Proxy can be disabled.

```js id="w7j2qk"
const user = {
  name: "Osama Abu Motlaq",
};

const {
  proxy,
  revoke,
} =
  Proxy.revocable(
    user,
    {}
  );

console.log(
  proxy.name
);

revoke();
```

After revocation, operations through the proxy throw.

---

# Revocable Proxy Example

```js id="k3x8tp"
const user = {
  name: "Osama Abu Motlaq",
};

const result =
  Proxy.revocable(
    user,
    {}
  );

console.log(
  result.proxy.name
);

result.revoke();

try {
  console.log(
    result.proxy.name
  );
} catch (error) {
  console.error(
    error.message
  );
}
```

---

# Proxy Invariants

Proxy traps cannot arbitrarily violate all rules of the target object's descriptors and extensibility state.

The language defines invariants that proxy handlers must respect.

For example, a proxy cannot simply report a different value for a non-configurable, non-writable own data property in situations where the invariant would be violated.

Example:

```js id="e4u7fj"
const user = {};

Object.defineProperty(
  user,
  "name",
  {
    value: "Osama Abu Motlaq",
    writable: false,
    configurable: false,
  }
);

const proxy =
  new Proxy(
    user,
    {
      get() {
        return "Different value";
      },
    }
  );

console.log(
  proxy.name
);
```

The proxy cannot freely violate the target's non-configurable property invariant.

---

# Why `Reflect` Helps With Invariants

When implementing a trap, forwarding to the corresponding `Reflect` operation is often the safest starting point.

Example:

```js id="7c2r2y"
const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );
```

This preserves default semantics unless you intentionally customize them.

---

# Proxy and Prototype Behavior

A Proxy participates in property lookup.

Example:

```js id="a2s6qm"
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          "Reading:",
          property
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  proxy.role
);
```

The `get` trap can observe access to inherited properties as well as own properties.

---

# Receiver in `Reflect.get()`

The third argument matters when accessors or prototype methods rely on:

```js id="5kw9am"
this
```

Example:

```js id="54dmz4"
const prototype = {
  get role() {
    return this.name ===
      "Osama Abu Motlaq"
      ? "Frontend Developer"
      : "Unknown";
  },
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  proxy.role
);
```

Passing the receiver preserves the intended `this` behavior for inherited accessors.

---

# `Reflect.apply()`

A function can be invoked through `Reflect.apply()`.

```js id="czw5f4"
function greet(
  message
) {
  return `${message}, ${this.name}!`;
}

const user = {
  name: "Osama Abu Motlaq",
};

const result =
  Reflect.apply(
    greet,
    user,
    [
      "Hello",
    ]
  );

console.log(
  result
);
```

This is the reflective equivalent of controlled function invocation.

---

# `Reflect.construct()`

A constructor can be invoked reflectively.

```js id="9h9r1e"
class User {
  constructor(name) {
    this.name = name;
  }
}

const user =
  Reflect.construct(
    User,
    [
      "Osama Abu Motlaq",
    ]
  );

console.log(
  user.name
);
```

---

# Reflective Object Creation

`Reflect.construct()` is useful when the constructor and arguments are determined dynamically.

```js id="r9q5b0"
function createInstance(
  Constructor,
  args
) {
  return Reflect.construct(
    Constructor,
    args
  );
}

class User {
  constructor(name) {
    this.name = name;
  }
}

const user =
  createInstance(
    User,
    [
      "Osama Abu Motlaq",
    ]
  );

console.log(
  user.name
);
```

---

# `Reflect.preventExtensions()`

```js id="f0f5k4"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Reflect.isExtensible(user)
);

Reflect.preventExtensions(
  user
);

console.log(
  Reflect.isExtensible(user)
);
```

---

# Extensibility

By default, objects are extensible:

```js id="k0d8jl"
const user = {};

console.log(
  Object.isExtensible(user)
);
```

You can prevent adding new own properties:

```js id="uj3t3h"
Object.preventExtensions(
  user
);
```

---

# Sealing and Freezing

Metaprogramming also includes controlling object mutability.

Seal:

```js id="xk4t8u"
const user = {
  name: "Osama Abu Motlaq",
};

Object.seal(user);
```

Freeze:

```js id="a7p9om"
const settings = {
  theme: "dark",
};

Object.freeze(
  settings
);
```

These operations modify the object's property constraints.

---

# Preventing Extensions

```js id="v5i0g6"
const user = {
  name: "Osama Abu Motlaq",
};

Object.preventExtensions(
  user
);

user.role =
  "Frontend Developer";

console.log(
  user.role
);
```

In strict mode, adding a new property to a non-extensible object throws.

---

# Introspection

JavaScript provides many APIs for inspecting objects.

Common examples:

```text id="y7m8h4"
Object.keys()
Object.values()
Object.entries()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.getOwnPropertyDescriptors()
Reflect.ownKeys()
Object.getPrototypeOf()
Object.getOwnPropertyDescriptor()
```

These APIs are part of JavaScript's reflective capabilities.

---

# Property Names and Symbols

Example:

```js id="q0i5fw"
const secret =
  Symbol("secret");

const user = {
  name: "Osama Abu Motlaq",
};

user[secret] =
  "Hidden-like value";

console.log(
  Object.getOwnPropertyNames(
    user
  )
);

console.log(
  Object.getOwnPropertySymbols(
    user
  )
);

console.log(
  Reflect.ownKeys(user)
);
```

---

# `Reflect.ownKeys()` vs `Object.keys()`

Compare:

```js id="r1m8yy"
const secret =
  Symbol("secret");

const user = {
  name: "Osama Abu Motlaq",
};

user[secret] = 100;

Object.defineProperty(
  user,
  "hidden",
  {
    value: true,
    enumerable: false,
  }
);

console.log(
  Object.keys(user)
);

console.log(
  Reflect.ownKeys(user)
);
```

`Reflect.ownKeys()` provides the broader set of own keys.

---

# Custom `instanceof`

The `Symbol.hasInstance` mechanism allows custom behavior:

```js id="mx7e9c"
class FrontendDeveloper {
  static [Symbol.hasInstance](
    value
  ) {
    return (
      typeof value ===
        "object" &&
      value !== null &&
      value.role ===
        "Frontend Developer"
    );
  }
}

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(
  user instanceof
    FrontendDeveloper
);
```

This demonstrates that `instanceof` itself can be customized.

---

# Custom String Conversion

```js id="6d1qpk"
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",

  [Symbol.toPrimitive](
    hint
  ) {
    if (
      hint === "string"
    ) {
      return `${this.name} - ${this.role}`;
    }

    return 1;
  },
};

console.log(
  `${profile}`
);
```

The object's primitive conversion behavior is customized.

---

# Custom Iteration

```js id="u3g0z2"
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",

  *[Symbol.iterator]() {
    yield this.name;
    yield this.role;
  },
};

console.log(
  [
    ...profile,
  ]
);
```

The spread syntax uses the object's iterator.

---

# Meta-Level Control Over Functions

Functions can be proxied just like objects.

```js id="9u8m2j"
function calculate(
  first,
  second
) {
  return first + second;
}

const proxy =
  new Proxy(
    calculate,
    {
      apply(
        target,
        thisArg,
        argumentsList
      ) {
        console.log(
          "Calling function with:",
          argumentsList
        );

        return Reflect.apply(
          target,
          thisArg,
          argumentsList
        );
      },
    }
  );

console.log(
  proxy(10, 20)
);
```

---

# Meta-Level Control Over Constructors

```js id="k6f3yw"
class User {
  constructor(name) {
    this.name = name;
  }
}

const UserProxy =
  new Proxy(
    User,
    {
      construct(
        target,
        argumentsList,
        newTarget
      ) {
        console.log(
          "Creating User"
        );

        return Reflect.construct(
          target,
          argumentsList,
          newTarget
        );
      },
    }
  );

const user =
  new UserProxy(
    "Osama Abu Motlaq"
  );

console.log(
  user.name
);
```

---

# Proxy-Based Access Control

A proxy can restrict certain properties.

```js id="j9q7m3"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const restricted =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        if (
          property ===
          "role"
        ) {
          throw new Error(
            "Access denied."
          );
        }

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  restricted.name
);
```

---

# Proxy-Based Validation

```js id="d3o6yn"
const profile = {};

const validated =
  new Proxy(
    profile,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property ===
            "name" &&
          value.trim() ===
            ""
        ) {
          throw new Error(
            "Name cannot be empty."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );

validated.name =
  "Osama Abu Motlaq";
```

---

# Proxy-Based Defaults

```js id="r7w2md"
const defaults = {
  theme: "dark",
  language: "javascript",
};

const settings = {};

const proxy =
  new Proxy(
    settings,
    {
      get(
        target,
        property,
        receiver
      ) {
        if (
          Reflect.has(
            target,
            property
          )
        ) {
          return Reflect.get(
            target,
            property,
            receiver
          );
        }

        return defaults[property];
      },
    }
  );

console.log(
  proxy.theme
);

console.log(
  proxy.language
);
```

---

# Proxy-Based Change Tracking

```js id="h5j9bv"
const user = {
  name: "Osama Abu Motlaq",
};

const changes = [];

const tracked =
  new Proxy(
    user,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        changes.push({
          property,
          value,
        });

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );

tracked.role =
  "Frontend Developer";

tracked.name =
  "Osama Abu Motlaq";

console.log(
  changes
);
```

---

# Proxy-Based API

A Proxy can create an abstraction over a normal object.

```js id="n1r8go"
function createConfig(
  initialValues
) {
  return new Proxy(
    initialValues,
    {
      get(
        target,
        property,
        receiver
      ) {
        const value =
          Reflect.get(
            target,
            property,
            receiver
          );

        if (
          value === undefined
        ) {
          throw new Error(
            `Unknown config key: ${String(property)}`
          );
        }

        return value;
      },
    }
  );
}

const config =
  createConfig({
    apiUrl:
      "/api",
    debug: true,
  });

console.log(
  config.apiUrl
);
```

---

# Avoid Overusing Proxy

Proxy is powerful, but it should not be used for every object.

Potential disadvantages include:

* More complex control flow
* Harder debugging
* More difficult reasoning
* Runtime overhead in some scenarios
* Compatibility considerations
* Unexpected behavior when traps are incomplete

Prefer ordinary language features when they are sufficient.

---

# Trap Forwarding Pattern

A safe starting pattern is:

```js id="x4q9cs"
const proxy =
  new Proxy(
    target,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },

      has(
        target,
        property
      ) {
        return Reflect.has(
          target,
          property
        );
      },

      deleteProperty(
        target,
        property
      ) {
        return Reflect.deleteProperty(
          target,
          property
        );
      },
    }
  );
```

Customize only the behavior you actually need.

---

# The `receiver` Parameter

When writing traps such as:

```js id="4lqk8x"
get(
  target,
  property,
  receiver
)
```

the `receiver` represents the object through which the property access occurred.

This becomes important for:

* Accessors
* Prototype inheritance
* `super`
* Correct `this` behavior

---

# Example With Inheritance

```js id="2ds8qv"
const prototype = {
  get role() {
    return this.name;
  },
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  proxy.role
);
```

Using `Reflect.get()` with the receiver preserves the accessor's expected `this`.

---

# Proxy and `get` Trap Recursion

Be careful when a trap accesses the proxy again.

Problematic pattern:

```js id="1l3j8b"
const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property
      ) {
        return proxy[property];
      },
    }
  );
```

This can recursively call the same trap.

Prefer the target or `Reflect`:

```js id="l0x6i4"
const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );
```

---

# Proxy and `set` Trap Recursion

Similarly, avoid:

```js id="pr1k72"
const proxy =
  new Proxy(
    user,
    {
      set(
        target,
        property,
        value
      ) {
        proxy[property] =
          value;

        return true;
      },
    }
  );
```

This can trigger the `set` trap repeatedly.

Prefer:

```js id="s5yr4g"
Reflect.set(
  target,
  property,
  value
);
```

---

# Proxy and Arrays

Arrays are valid Proxy targets.

```js id="k7x3jd"
const numbers = [
  10,
  20,
  30,
];

const proxy =
  new Proxy(
    numbers,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          "Access:",
          property
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  proxy[0]
);

console.log(
  proxy.length
);
```

---

# Proxy and Function Properties

Functions are objects too.

```js id="r1g8kh"
function greet() {
  return "Hello";
}

greet.label =
  "Greeting Function";

const proxy =
  new Proxy(
    greet,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  proxy.label
);
```

---

# Revocable Access

Revocable proxies are useful when access should expire.

```js id="u0t6z9"
const data = {
  secret:
    "Temporary value",
};

const access =
  Proxy.revocable(
    data,
    {}
  );

console.log(
  access.proxy.secret
);

access.revoke();
```

After revocation, operations using the proxy throw.

---

# Metaprogramming and Security

Metaprogramming can enforce useful policies.

Example:

```js id="m4x7qp"
const user = {
  name: "Osama Abu Motlaq",
};

const protectedUser =
  new Proxy(
    user,
    {
      deleteProperty() {
        return false;
      },
    }
  );

console.log(
  delete protectedUser.name
);
```

However, Proxy-based protection is not a replacement for server-side authorization or security boundaries.

---

# Proxy Is Not a Security Boundary

A proxy exists inside the same JavaScript environment as the code using it.

If application code has direct access to the original target:

```js id="x4g6ny"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {}
  );
```

the target is still directly accessible through:

```js id="k3m4qp"
user
```

Therefore, the proxy does not magically make the original object secure.

---

# Proxy and Encapsulation

Proxies can help enforce runtime conventions:

```js id="f9x8sr"
const state = {};

const protectedState =
  new Proxy(
    state,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property.startsWith(
            "_"
          )
        ) {
          throw new Error(
            "Private properties cannot be assigned."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
```

This is runtime behavior, not a language-level private field.

---

# Proxy vs Private Fields

Native private field:

```js id="up3oh8"
class User {
  #role =
    "Frontend Developer";

  getRole() {
    return this.#role;
  }
}
```

Proxy-based restriction:

```js id="d7yp6n"
const user = {
  role:
    "Frontend Developer",
};
```

A Proxy can intercept operations.

A `#privateField` is a language-level private field with different semantics.

Do not treat them as interchangeable.

---

# Metaprogramming and Decorator-Like Patterns

JavaScript can use descriptors and wrapper functions to modify behavior.

Example:

```js id="j1s4gd"
function logMethod(
  target,
  property,
  descriptor
) {
  const original =
    descriptor.value;

  descriptor.value =
    function (...args) {
      console.log(
        `Calling ${property}`
      );

      return original.apply(
        this,
        args
      );
    };

  return descriptor;
}
```

The function modifies a method descriptor.

This is a low-level pattern behind many metaprogramming techniques.

---

# Applying a Method Wrapper

```js id="z7k4tw"
class User {
  showName() {
    return "Osama Abu Motlaq";
  }
}

const descriptor =
  Object.getOwnPropertyDescriptor(
    User.prototype,
    "showName"
  );

const original =
  descriptor.value;

descriptor.value =
  function (...args) {
    console.log(
      "Method called."
    );

    return original.apply(
      this,
      args
    );
  };

Object.defineProperty(
  User.prototype,
  "showName",
  descriptor
);

const user =
  new User();

console.log(
  user.showName()
);
```

---

# Reflective Property Access

Instead of:

```js id="y6zv2j"
object[property]
```

you can use:

```js id="02gt3t"
Reflect.get(
  object,
  property
);
```

This becomes particularly useful when implementing generic behavior.

---

# Generic Getter

```js id="cs45zy"
function getValue(
  object,
  property
) {
  return Reflect.get(
    object,
    property
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  getValue(
    user,
    "name"
  )
);
```

---

# Generic Setter

```js id="q8c4ks"
function setValue(
  object,
  property,
  value
) {
  return Reflect.set(
    object,
    property,
    value
  );
}

const user = {};

setValue(
  user,
  "name",
  "Osama Abu Motlaq"
);

console.log(
  user.name
);
```

---

# Generic Invoker

```js id="e8t3mv"
function invoke(
  functionValue,
  thisValue,
  args
) {
  return Reflect.apply(
    functionValue,
    thisValue,
    args
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

function getName() {
  return this.name;
}

console.log(
  invoke(
    getName,
    user,
    []
  )
);
```

---

# Generic Constructor

```js id="j6n1wc"
function create(
  Constructor,
  args
) {
  return Reflect.construct(
    Constructor,
    args
  );
}

class User {
  constructor(name) {
    this.name = name;
  }
}

const user =
  create(
    User,
    [
      "Osama Abu Motlaq",
    ]
  );

console.log(
  user.name
);
```

---

# Metaprogramming With Prototypes

Metaprogramming can inspect or modify prototype behavior.

```js id="p0k7gm"
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

console.log(
  Reflect.getPrototypeOf(
    user
  )
);

console.log(
  Reflect.has(
    user,
    "role"
  )
);
```

---

# Metaprogramming With Property Descriptors

```js id="j4v8ny"
const user = {};

Reflect.defineProperty(
  user,
  "name",
  {
    value:
      "Osama Abu Motlaq",
    writable: false,
    enumerable: true,
    configurable: false,
  }
);

console.log(
  Reflect.getOwnPropertyDescriptor(
    user,
    "name"
  )
);
```

---

# Meta-Level Object Inspection

```js id="m3w6rx"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(
  {
    keys:
      Reflect.ownKeys(user),

    prototype:
      Reflect.getPrototypeOf(
        user
      ),

    extensible:
      Reflect.isExtensible(
        user
      ),

    descriptors:
      Object.getOwnPropertyDescriptors(
        user
      ),
  }
);
```

---

# Metaprogramming and Frameworks

Metaprogramming techniques appear in advanced libraries and frameworks.

Examples can include:

```text id="u8e1wk"
Reactive systems
ORMs
Validation libraries
State management
Dependency injection
Proxies
Data binding
Instrumentation
Mocking
Logging
```

A framework may intercept operations such as:

```text id="7q8jhj"
Read property
Write property
Call function
Create object
Enumerate keys
Observe changes
```

---

# Reactive Objects

A simplified reactive system can be built with Proxy.

```js id="v4x8zc"
function reactive(
  object,
  onChange
) {
  return new Proxy(
    object,
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        const result =
          Reflect.set(
            target,
            property,
            value,
            receiver
          );

        onChange(
          property,
          value
        );

        return result;
      },
    }
  );
}

const state =
  reactive(
    {
      count: 0,
    },
    (
      property,
      value
    ) => {
      console.log(
        "Changed:",
        property,
        value
      );
    }
  );

state.count = 1;
state.count = 2;
```

This is a simplified example of an idea used by reactive systems.

---

# Read Tracking

A Proxy can also track reads.

```js id="2p7w8m"
function reactive(
  object
) {
  return new Proxy(
    object,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          "Read:",
          property
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        console.log(
          "Write:",
          property,
          value
        );

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}

const state =
  reactive({
    count: 0,
  });

console.log(
  state.count
);

state.count = 1;
```

---

# Why Frameworks Use More Than Proxy

A real reactive system requires much more than intercepting property access.

It may need:

```text id="3n4b5x"
Dependency tracking
Effect management
Nested object handling
Arrays
Computed values
Cleanup
Scheduling
Change detection
Identity management
Caching
```

A small Proxy example should not be confused with a complete reactive framework.

---

# Metaprogramming and Validation

Proxy can enforce runtime rules.

```js id="c8b1y4"
function createValidatedUser() {
  return new Proxy(
    {},
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property ===
            "name" &&
          typeof value !==
            "string"
        ) {
          throw new TypeError(
            "Name must be a string."
          );
        }

        if (
          property ===
            "role" &&
          typeof value !==
            "string"
        ) {
          throw new TypeError(
            "Role must be a string."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}

const user =
  createValidatedUser();

user.name =
  "Osama Abu Motlaq";

user.role =
  "Frontend Developer";
```

---

# Metaprogramming and Logging

```js id="e2g6bj"
function withLogging(
  object
) {
  return new Proxy(
    object,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          `Reading ${String(property)}`
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        console.log(
          `Writing ${String(property)}`
        );

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}

const user =
  withLogging({
    name: "Osama Abu Motlaq",
  });

console.log(
  user.name
);

user.role =
  "Frontend Developer";
```

---

# Metaprogramming and API Boundaries

A Proxy can expose a controlled interface.

```js id="x2v8mq"
const internal = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  secret: "Internal value",
};

const publicApi =
  new Proxy(
    internal,
    {
      get(
        target,
        property,
        receiver
      ) {
        if (
          property ===
          "secret"
        ) {
          throw new Error(
            "Private property."
          );
        }

        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );

console.log(
  publicApi.name
);

console.log(
  publicApi.role
);
```

The original target remains accessible to code that already owns it, so this is not a complete security boundary.

---

# Proxy and Property Existence

```js id="q4u2ks"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      has(
        target,
        property
      ) {
        if (
          property ===
          "secret"
        ) {
          return false;
        }

        return Reflect.has(
          target,
          property
        );
      },
    }
  );

console.log(
  "name" in proxy
);

console.log(
  "secret" in proxy
);
```

---

# Proxy and Enumeration

```js id="b8r5vn"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const proxy =
  new Proxy(
    user,
    {
      ownKeys() {
        return [
          "name",
        ];
      },
    }
  );

console.log(
  Reflect.ownKeys(proxy)
);
```

Trap invariants still apply, so a custom `ownKeys` implementation cannot violate required non-configurable property rules.

---

# Proxy and Deletion

```js id="p3s6xe"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      deleteProperty(
        target,
        property
      ) {
        if (
          property ===
          "name"
        ) {
          return false;
        }

        return Reflect.deleteProperty(
          target,
          property
        );
      },
    }
  );

console.log(
  delete proxy.name
);

console.log(
  proxy.name
);
```

---

# Proxy and Property Definition

```js id="n7r4yj"
const user = {};

const proxy =
  new Proxy(
    user,
    {
      defineProperty(
        target,
        property,
        descriptor
      ) {
        if (
          property ===
          "name"
        ) {
          descriptor.enumerable =
            true;
        }

        return Reflect.defineProperty(
          target,
          property,
          descriptor
        );
      },
    }
  );

Object.defineProperty(
  proxy,
  "name",
  {
    value:
      "Osama Abu Motlaq",
  }
);

console.log(
  Object.keys(proxy)
);
```

---

# Metaprogramming and Object Immutability

A proxy can attempt to provide a read-only interface:

```js id="r7v3qz"
const state = {
  count: 0,
};

const readOnlyState =
  new Proxy(
    state,
    {
      set() {
        throw new TypeError(
          "State is read-only."
        );
      },

      deleteProperty() {
        throw new TypeError(
          "State is read-only."
        );
      },

      defineProperty() {
        throw new TypeError(
          "State is read-only."
        );
      },
    }
  );

console.log(
  readOnlyState.count
);
```

Again, this protects access through the proxy, not direct access to the original target.

---

# Proxy Identity

A Proxy is a distinct object from its target.

```js id="m0f6sa"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {}
  );

console.log(
  proxy === user
);
```

Result:

```text id="6qz9px"
false
```

The proxy wraps the target.

---

# Proxy Target Access

Keep the target private when a proxy is intended to be the public interface.

```js id="h2v8nt"
function createUser() {
  const target = {
    name: "Osama Abu Motlaq",
  };

  return new Proxy(
    target,
    {}
  );
}

const user =
  createUser();

console.log(
  user.name
);
```

The target is not returned separately.

This creates a cleaner abstraction boundary, although it is still not a security boundary inside the same runtime.

---

# Revocable Proxy as a Lifecycle Tool

```js id="g6c1fw"
function createAccess() {
  const target = {
    name: "Osama Abu Motlaq",
  };

  const access =
    Proxy.revocable(
      target,
      {}
    );

  return {
    proxy:
      access.proxy,

    revoke:
      access.revoke,
  };
}

const access =
  createAccess();

console.log(
  access.proxy.name
);

access.revoke();
```

This can be useful when an access capability should expire.

---

# Metaprogramming and API Design

Metaprogramming is strongest when the customization reflects a meaningful abstraction.

Good examples include:

```text id="x6h4j8"
Validation
Logging
Reactive state
Controlled access
Instrumentation
Custom iteration
Custom primitive conversion
Dynamic object APIs
```

Bad reasons include:

```text id="0l5q2t"
Making simple code clever
Replacing ordinary functions unnecessarily
Hiding basic logic
Adding traps without a real requirement
```

---

# Performance Considerations

Proxies can introduce overhead because operations may pass through trap logic.

Example:

```js id="f2l7qe"
const user = {
  name: "Osama Abu Motlaq",
};

const proxy =
  new Proxy(
    user,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },
    }
  );
```

A normal property read:

```js id="3e8l5m"
user.name
```

does not have the same interception overhead as:

```js id="1z6qq5"
proxy.name
```

Do not assume Proxy overhead is always problematic.

Measure when performance matters.

---

# Debugging Proxies

Proxies can make debugging harder because:

```text id="w5s4yd"
Object Access
     |
     v
Trap
     |
     v
Custom Logic
     |
     v
Reflect
     |
     v
Target
```

When debugging, inspect:

* Target
* Handler
* Trap logic
* Receiver
* Prototype chain
* Descriptor constraints

---

# A Transparent Proxy

A transparent proxy tries to forward operations without changing behavior.

```js id="y8q2df"
function transparentProxy(
  target
) {
  return new Proxy(
    target,
    {
      get(
        target,
        property,
        receiver
      ) {
        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}
```

Additional traps can be added only when necessary.

---

# Custom Object Behavior

Metaprogramming allows an object to participate differently in JavaScript language operations.

Examples:

```text id="2x9d8v"
Property read
→ Proxy get

Property write
→ Proxy set

Property existence
→ Proxy has

Property deletion
→ Proxy deleteProperty

Property definition
→ Proxy defineProperty

Property enumeration
→ Proxy ownKeys

Function invocation
→ Proxy apply

Constructor invocation
→ Proxy construct

Primitive conversion
→ Symbol.toPrimitive

Iteration
→ Symbol.iterator

instanceof
→ Symbol.hasInstance
```

---

# Metaprogramming Mental Model

Think of normal JavaScript as:

```text id="1q9n3c"
Code
 ↓
Language Operation
 ↓
Default Runtime Behavior
```

Metaprogramming allows:

```text id="v4k3jp"
Code
 ↓
Language Operation
 ↓
Customization Hook
 ↓
Custom Behavior
```

Examples:

```text id="f2s6ar"
Proxy
Reflect
Property Descriptors
Symbols
Prototype APIs
```

---

# Practical Metaprogramming Example

```js id="a9u6yc"
function createTrackedObject(
  initialValues
) {
  const history = [];

  const proxy =
    new Proxy(
      initialValues,
      {
        get(
          target,
          property,
          receiver
        ) {
          history.push({
            type: "get",
            property:
              String(property),
          });

          return Reflect.get(
            target,
            property,
            receiver
          );
        },

        set(
          target,
          property,
          value,
          receiver
        ) {
          history.push({
            type: "set",
            property:
              String(property),
            value,
          });

          return Reflect.set(
            target,
            property,
            value,
            receiver
          );
        },
      }
    );

  return {
    proxy,
    history,
  };
}

const tracked =
  createTrackedObject({
    name: "Osama Abu Motlaq",
  });

console.log(
  tracked.proxy.name
);

tracked.proxy.role =
  "Frontend Developer";

console.log(
  tracked.history
);
```

This combines:

```text id="p6d3xq"
Proxy
+
Reflect
+
Runtime operation tracking
```

---

# Practical Validation Example

```js id="r3c5w2"
function createUser() {
  return new Proxy(
    {},
    {
      set(
        target,
        property,
        value,
        receiver
      ) {
        if (
          property ===
            "name" &&
          typeof value !==
            "string"
        ) {
          throw new TypeError(
            "Name must be a string."
          );
        }

        if (
          property ===
            "age" &&
          (
            typeof value !==
              "number" ||
            value < 0
          )
        ) {
          throw new TypeError(
            "Age must be a non-negative number."
          );
        }

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },
    }
  );
}

const user =
  createUser();

user.name =
  "Osama Abu Motlaq";

user.age =
  25;

console.log(user);
```

---

# Practical Read-Only Example

```js id="k7v3pm"
function createReadOnly(
  object
) {
  return new Proxy(
    object,
    {
      set() {
        throw new TypeError(
          "Object is read-only."
        );
      },

      deleteProperty() {
        throw new TypeError(
          "Object is read-only."
        );
      },

      defineProperty() {
        throw new TypeError(
          "Object is read-only."
        );
      },
    }
  );
}

const user =
  createReadOnly({
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  });

console.log(
  user.name
);
```

---

# Practical Logging Example

```js id="f8w2qr"
function createLogger(
  object
) {
  return new Proxy(
    object,
    {
      get(
        target,
        property,
        receiver
      ) {
        console.log(
          "GET",
          String(property)
        );

        return Reflect.get(
          target,
          property,
          receiver
        );
      },

      set(
        target,
        property,
        value,
        receiver
      ) {
        console.log(
          "SET",
          String(property),
          value
        );

        return Reflect.set(
          target,
          property,
          value,
          receiver
        );
      },

      deleteProperty(
        target,
        property
      ) {
        console.log(
          "DELETE",
          String(property)
        );

        return Reflect.deleteProperty(
          target,
          property
        );
      },
    }
  );
}

const user =
  createLogger({
    name: "Osama Abu Motlaq",
  });

console.log(
  user.name
);

user.role =
  "Frontend Developer";

delete user.role;
```

---

# When to Use Metaprogramming

Use metaprogramming when you genuinely need to control or observe JavaScript operations.

Good use cases:

```text id="7k4r2e"
Reactive systems
Validation
Instrumentation
Logging
Custom collection behavior
Framework internals
Advanced libraries
Controlled abstractions
```

Avoid it when ordinary code already expresses the behavior clearly.

---

# Metaprogramming and Maintainability

Powerful abstractions should remain understandable.

A proxy that silently changes fundamental object behavior can make code difficult to debug.

Prefer:

```js id="0h1r4v"
user.name
```

when ordinary property access is sufficient.

Use Proxy when the application benefits from interception:

```js id="x7v2ra"
proxy.name
```

with a clearly defined reason.

---

# Metaprogramming and React

Metaprogramming is generally an advanced JavaScript topic rather than a core React requirement.

You should understand:

```text id="5l1yt6"
Objects
Functions
Closures
Prototypes
Modules
Promises
Async/Await
```

before spending significant time on:

```text id="z5z8n7"
Proxy
Reflect
Descriptors
Symbols
```

React application development does not require you to build Proxy-based frameworks.

However, understanding these mechanisms can help when reading:

* State-management libraries
* Reactive systems
* Framework internals
* Advanced JavaScript libraries

---

# Common Misconceptions

## Metaprogramming Means Magic

It does not.

It means using language-level reflection and interception mechanisms intentionally.

---

## Proxy Replaces Classes

False.

Proxy and classes solve different problems.

---

## Reflect Creates a Proxy

False.

`Reflect` provides reflective operations.

`Proxy` provides interception.

They are often used together.

---

## Symbols Are Private

A Symbol key is not a true private field.

Code can still discover Symbol keys through APIs such as:

```js id="60b9sp"
Object.getOwnPropertySymbols()
```

and:

```js id="3m2q7d"
Reflect.ownKeys()
```

For true language-level private fields, use:

```js id="sj6jcr"
#privateField
```

---

## Proxy Creates Security

False.

Proxy behavior is inside the same JavaScript environment and is not a security boundary.

---

## `WeakMap` Is Just a Faster Map

False.

Weak collections have different reachability and API semantics.

---

## Getters Are Just Functions

A getter is invoked through property access:

```js id="h4f5pw"
user.name
```

rather than:

```js id="n8x1sb"
user.name()
```

The invocation semantics are different.

---

# Metaprogramming Checklist

When working with metaprogramming, ask:

```text id="b8h3ry"
1. What normal JavaScript operation am I changing?

2. Could ordinary JavaScript express this more clearly?

3. Do I need a Proxy?

4. Do I need Reflect?

5. Do I need a property descriptor?

6. Do I need a Symbol?

7. What invariants must the Proxy respect?

8. Does the trap preserve the receiver correctly?

9. Could the trap recursively trigger itself?

10. Does the abstraction make debugging harder?

11. Could the behavior affect performance?

12. Is the mechanism actually necessary?
```

---

# Final Mental Model

JavaScript provides several levels of control:

```text id="e6r3t8"
Ordinary Objects
      |
      v
Property Descriptors
      |
      v
Reflection APIs
      |
      v
Symbols
      |
      v
Proxy Interception
      |
      v
Custom Runtime Behavior
```

The main tools are:

```text id="y8m4sb"
Object.defineProperty()
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()

Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.ownKeys()
Reflect.apply()
Reflect.construct()

Proxy
Proxy.revocable()

Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.hasInstance
```

---

# Summary

Metaprogramming is the ability to inspect and customize aspects of JavaScript's behavior.

The most important concepts are:

* Property descriptors control property behavior.
* `Object.defineProperty()` defines properties with explicit descriptors.
* Accessors use `get` and `set`.
* `Reflect` provides programmatic access to fundamental object operations.
* `Proxy` intercepts operations performed on objects and functions.
* Proxy traps include `get`, `set`, `has`, `deleteProperty`, `ownKeys`, `apply`, `construct`, and others.
* `Reflect` is commonly used inside Proxy traps to preserve default behavior.
* The `receiver` argument matters for correct prototype and accessor behavior.
* Proxy traps are subject to language-defined invariants.
* `Proxy.revocable()` allows a proxy to be disabled.
* Symbols provide unique property keys.
* Well-known Symbols customize built-in language operations.
* `Symbol.iterator` controls iteration behavior.
* `Symbol.toPrimitive` controls object-to-primitive conversion.
* `Symbol.hasInstance` can customize `instanceof`.
* Property descriptors can create advanced immutable, hidden, or accessor-based properties.
* Metaprogramming can power validation, logging, tracking, reactivity, and framework internals.
* Proxy is not a security boundary.
* Weak references and private fields solve different problems from Proxy.
* Metaprogramming should be used when it provides a meaningful abstraction rather than simply making code more clever.

The core idea is:

```text id="v1q0wb"
Normal JavaScript
       |
       v
Default Language Behavior


Metaprogramming
       |
       v
Observe / Intercept / Customize
       |
       v
Language Behavior
```

And the most important practical distinction is:

```text id="a7m3xk"
Reflect
→ perform language-level operations programmatically

Proxy
→ intercept language-level operations

Descriptors
→ define how properties behave

Symbols
→ customize or participate in built-in language protocols
```
