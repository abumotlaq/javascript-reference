# Web Platform

This section covers browser and platform APIs that extend JavaScript beyond the language itself.

The Web Platform provides APIs for networking, storage, concurrency, caching, streaming data, cryptography, device access, and communication between browsing contexts.

## Scope

The topics in this section focus on practical browser capabilities that are broader than the core JavaScript language.

The section builds on concepts covered in:

* `03-async`
* `06-DOM`
* `07-BOM`

## Structure

```text
08-web-platform/
├── 00-README.md
├── 01-networking-and-data-transfer.md
├── 02-cancellation-and-abort.md
├── 03-indexeddb-and-client-storage.md
├── 04-workers-and-cross-context-communication.md
├── 05-service-workers-and-caching.md
├── 06-streams-encoding-and-compression.md
├── 07-observers.md
├── 08-web-crypto.md
├── 09-sharing-and-media.md
└── 10-web-platform-best-practices.md
```

## Topic Coverage

### Networking and Data Transfer

Covers:

* Fetch API
* Request
* Response
* Headers
* FormData
* Blob
* File
* Request and response bodies

Related examples:

```text
01-fetch-api.js
03-form-data.js
04-blob-and-file.js
```

### Cancellation and Abort

Covers:

* AbortController
* AbortSignal
* Canceling asynchronous operations
* Canceling fetch requests
* Handling `AbortError`

Related example:

```text
02-abort-controller.js
```

### Client-Side Structured Storage

Covers:

* IndexedDB
* Databases
* Object stores
* Transactions
* Persistent structured data

Related example:

```text
05-indexeddb.js
```

### Workers and Cross-Context Communication

Covers:

* Web Workers
* Worker messaging
* Worker lifecycle
* BroadcastChannel
* Web Locks
* Coordination between tabs and workers

Related examples:

```text
06-web-worker.js
11-broadcast-channel.js
12-web-locks.js
```

### Service Workers and Caching

Covers:

* Service Worker registration
* Installation
* Activation
* Fetch interception
* Cache API
* Offline strategies
* Cache lifecycle

Related examples:

```text
07-service-worker-registration.js
08-service-worker.js
09-cache-api.js
```

### Streams, Encoding, and Compression

Covers:

* ReadableStream
* Readers
* TextEncoder
* TextDecoder
* CompressionStream
* Transform pipelines
* Streaming data processing

Related examples:

```text
13-streams.js
14-text-encoder-decoder.js
15-compression-stream.js
```

### Observers

Covers:

* IntersectionObserver
* ResizeObserver
* MutationObserver
* Observing visibility
* Observing element size
* Observing DOM changes

Related examples:

```text
16-intersection-observer.js
17-resize-observer.js
18-mutation-observer.js
```

### Web Crypto

Covers:

* `crypto`
* `crypto.subtle`
* Hashing
* Randomness
* Cryptographic primitives
* Security considerations

Related example:

```text
10-web-crypto.js
```

### Sharing and Media

Covers:

* Web Share API
* MediaDevices
* Camera and microphone access
* Permissions
* Media streams
* Secure-context requirements

Related examples:

```text
19-web-share.js
20-media-devices.js
```

## Learning Principle

```text
JavaScript
    ↓
DOM
    ↓
BOM
    ↓
Web Platform APIs
```

The goal is not to memorize every browser API.

The goal is to understand the major capabilities exposed by the platform and know how to work with them safely and effectively.

## Important Distinction

JavaScript is the programming language.

The Web Platform is the environment that provides browser capabilities to JavaScript.

For example:

```js
const values = [1, 2, 3];

values.map((value) => value * 2);
```

`Array.prototype.map()` belongs to JavaScript.

By contrast:

```js
fetch("/api/users");
```

`fetch()` is provided by the Web Platform.

Understanding this distinction helps separate language knowledge from browser-environment knowledge.
