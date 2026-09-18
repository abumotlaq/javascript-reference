# IndexedDB and Client-Side Structured Storage

Browser applications sometimes need more storage than a simple key/value store can comfortably provide.

IndexedDB is a browser database API designed for storing significant amounts of structured client-side data.

It supports:

* Databases
* Object stores
* Transactions
* Indexes
* Structured records
* Asynchronous operations

## When IndexedDB Fits

IndexedDB is useful when an application needs:

* Structured records
* Larger client-side datasets
* Indexed lookup
* Persistent browser storage
* Offline application data
* Local application state that contains more structure than simple strings

For small preferences and simple flags, Web Storage can still be sufficient.

## Opening a Database

A database is opened by name and version:

```js
const request = indexedDB.open(
  "javascript-reference",
  1
);
```

The operation is asynchronous.

A successful connection is available through `onsuccess`:

```js
request.onsuccess = (event) => {
  const database = event.target.result;

  console.log(database.name);
};
```

Handle failures explicitly:

```js
request.onerror = () => {
  console.error(
    "Database error:",
    request.error
  );
};
```

## Database Versioning

IndexedDB databases use version numbers to manage schema changes.

```js
const request = indexedDB.open(
  "javascript-reference",
  2
);
```

When a new version is created, the browser triggers `onupgradeneeded`.

```js
request.onupgradeneeded = (event) => {
  const database = event.target.result;

  console.log(
    "Database version:",
    database.version
  );
};
```

Schema changes belong in this lifecycle step.

## Object Stores

An object store is the primary storage container for records.

```js
request.onupgradeneeded = (event) => {
  const database = event.target.result;

  if (
    !database.objectStoreNames.contains(
      "users"
    )
  ) {
    database.createObjectStore(
      "users",
      {
        keyPath: "id",
        autoIncrement: true
      }
    );
  }
};
```

Each record is stored as structured data:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

## Keys

An object store can use a key path:

```js
database.createObjectStore(
  "users",
  {
    keyPath: "id"
  }
);
```

Then records should contain the key:

```js
store.put({
  id: 1,
  name: "Osama Abu Motlaq"
});
```

An auto-incremented key can also be used:

```js
database.createObjectStore(
  "users",
  {
    keyPath: "id",
    autoIncrement: true
  }
);
```

In that case, the browser can generate keys when new records are inserted.

## Transactions

IndexedDB operations are performed through transactions.

```js
const transaction =
  database.transaction(
    "users",
    "readwrite"
  );

const store =
  transaction.objectStore(
    "users"
  );
```

Transaction modes include:

```text
readonly
readwrite
```

Use the least permissive mode required by the operation.

## Adding Records

```js
const transaction =
  database.transaction(
    "users",
    "readwrite"
  );

const store =
  transaction.objectStore(
    "users"
  );

store.add({
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
});
```

`add()` is intended for inserting a new record.

If the key already exists, the operation fails rather than replacing the existing record.

## Updating Records

Use `put()` when a record may already exist:

```js
store.put({
  id: 1,
  name: "Osama Abu Motlaq",
  role: "Full Stack JavaScript Developer"
});
```

The operation inserts or replaces the record associated with the key.

## Reading a Single Record

```js
const transaction =
  database.transaction(
    "users",
    "readonly"
  );

const store =
  transaction.objectStore(
    "users"
  );

const request =
  store.get(1);

request.onsuccess = () => {
  console.log(
    request.result
  );
};
```

## Reading Multiple Records

```js
const request =
  store.getAll();

request.onsuccess = () => {
  console.log(
    request.result
  );
};
```

Applications should avoid loading unnecessarily large datasets into memory when only a subset is required.

## Deleting Records

```js
const transaction =
  database.transaction(
    "users",
    "readwrite"
  );

const store =
  transaction.objectStore(
    "users"
  );

store.delete(1);
```

## Clearing an Object Store

To remove every record from an object store:

```js
store.clear();
```

Use this carefully because it deletes all stored records in that object store.

## Indexes

Object stores are usually keyed by a primary key.

Indexes allow efficient lookup using another property.

```js
request.onupgradeneeded = (event) => {
  const database = event.target.result;

  const store =
    database.createObjectStore(
      "users",
      {
        keyPath: "id",
        autoIncrement: true
      }
    );

  store.createIndex(
    "email",
    "email",
    {
      unique: true
    }
  );
};
```

The index can then be used:

```js
const transaction =
  database.transaction(
    "users",
    "readonly"
  );

const store =
  transaction.objectStore(
    "users"
  );

const emailIndex =
  store.index("email");

const request =
  emailIndex.get(
    "osama@example.com"
  );

request.onsuccess = () => {
  console.log(
    request.result
  );
};
```

## Unique Indexes

A unique index prevents duplicate values.

```js
store.createIndex(
  "email",
  "email",
  {
    unique: true
  }
);
```

This can enforce uniqueness at the database level.

## Transaction Completion

Transactions expose lifecycle events:

```js
transaction.oncomplete = () => {
  console.log(
    "Transaction completed."
  );
};

transaction.onerror = () => {
  console.error(
    "Transaction failed:",
    transaction.error
  );
};

transaction.onabort = () => {
  console.log(
    "Transaction aborted."
  );
};
```

A successful individual request does not necessarily mean that the entire transaction has completed.

The transaction is the larger unit of work.

## Schema Evolution

Suppose version `1` contains a `users` store:

```js
indexedDB.open(
  "javascript-reference",
  1
);
```

Later, the application needs a `projects` store.

Increase the database version:

```js
const request = indexedDB.open(
  "javascript-reference",
  2
);
```

Then create the new structure inside `onupgradeneeded`:

```js
request.onupgradeneeded = (event) => {
  const database =
    event.target.result;

  if (
    !database.objectStoreNames.contains(
      "projects"
    )
  ) {
    database.createObjectStore(
      "projects",
      {
        keyPath: "id",
        autoIncrement: true
      }
    );
  }
};
```

This is the browser equivalent of evolving a database schema.

## Closing a Database

A database connection can be closed:

```js
database.close();
```

This can be useful when coordinating schema upgrades or deliberately releasing a connection.

## IndexedDB and Local Storage

These APIs solve different levels of storage problems.

### Web Storage

Examples:

```js
localStorage.setItem(
  "theme",
  "dark"
);

const theme =
  localStorage.getItem(
    "theme"
  );
```

Good for:

* Small values
* Preferences
* Flags
* Simple cached state

### IndexedDB

Good for:

* Structured records
* Larger datasets
* Indexed queries
* Offline application data
* More complex client-side storage

A useful mental model is:

```text
Web Storage
    ↓
Simple key/value data

IndexedDB
    ↓
Structured client-side database
```

## Common Mistakes

### Treating IndexedDB as Synchronous

This does not return the stored record:

```js
const user =
  store.get(1);
```

The returned value is an asynchronous request.

Use the request's lifecycle events or an appropriate abstraction around IndexedDB.

### Putting Schema Changes Outside `onupgradeneeded`

Creating stores and indexes belongs in schema upgrade logic.

### Using `readwrite` for Read Operations

Prefer:

```js
database.transaction(
  "users",
  "readonly"
);
```

when no modification is needed.

### Loading Too Much Data

Avoid:

```js
const everything =
  await getAllEverything();
```

when the UI only needs a small subset.

Design indexes and queries around the application's real access patterns.

### Ignoring Transaction Failures

An application should handle:

* Request errors
* Transaction errors
* Transaction aborts
* Schema upgrade failures

## Design Principles

Use IndexedDB when the application genuinely benefits from structured client-side persistence.

Keep the database design intentional:

```text
Database
   ↓
Object Stores
   ↓
Indexes
   ↓
Transactions
   ↓
Records
```

Do not choose IndexedDB merely because an application uses a browser.

Choose it because the data model and persistence requirements justify it.

## References

* IndexedDB API
* IDBDatabase
* IDBTransaction
* IDBObjectStore
* IDBIndex
* IDBRequest
