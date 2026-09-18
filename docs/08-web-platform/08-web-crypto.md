# Web Crypto API

The Web Crypto API provides low-level cryptographic functionality to web applications.

It can be used for operations such as:

* Generating cryptographically secure random values
* Hashing data
* Generating cryptographic keys
* Encrypting and decrypting data
* Creating and verifying digital signatures
* Deriving keys

The API is intentionally low-level. Using a cryptographic primitive correctly requires understanding the security problem being solved.

## The `crypto` Object

Browser environments expose cryptographic functionality through `crypto`.

```js
console.log(crypto);
```

The object provides capabilities such as:

```js
crypto.getRandomValues();
crypto.subtle;
```

The `subtle` property exposes the `SubtleCrypto` API.

---

# Cryptographically Secure Random Values

`Math.random()` is designed for general-purpose pseudo-random values.

It should not be used for security-sensitive values.

For cryptographic randomness, use:

```js
const values = new Uint32Array(4);

crypto.getRandomValues(values);

console.log(values);
```

The browser fills the typed array with cryptographically strong random values.

## Generating a Random Token

A common pattern is converting random bytes into hexadecimal:

```js
const bytes = new Uint8Array(16);

crypto.getRandomValues(bytes);

const token = Array.from(bytes)
  .map((byte) =>
    byte.toString(16).padStart(2, "0")
  )
  .join("");

console.log(token);
```

The important distinction is:

```text
Math.random()
→ General-purpose pseudo-random values

crypto.getRandomValues()
→ Cryptographically secure randomness
```

---

# Hashing

A cryptographic hash converts input data into a fixed-size digest.

Conceptually:

```text
Input
  ↓
Hash Function
  ↓
Digest
```

A common algorithm is SHA-256.

## Preparing Text

`crypto.subtle` works with binary data, so text can first be encoded with `TextEncoder`:

```js
const encoder = new TextEncoder();

const data = encoder.encode(
  "Osama Abu Motlaq"
);
```

## Creating a SHA-256 Digest

```js
const digest = await crypto.subtle.digest(
  "SHA-256",
  data
);

console.log(digest);
```

The result is an `ArrayBuffer`.

## Converting the Digest to Hexadecimal

```js
const bytes = new Uint8Array(digest);

const hash = Array.from(bytes)
  .map((byte) =>
    byte.toString(16).padStart(2, "0")
  )
  .join("");

console.log(hash);
```

A reusable function:

```js
async function sha256(text) {
  const encoder = new TextEncoder();

  const data = encoder.encode(text);

  const digest = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(
    new Uint8Array(digest)
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

const hash = await sha256(
  "Osama Abu Motlaq"
);

console.log(hash);
```

---

# Hashing Is Not Encryption

These concepts solve different problems.

## Hashing

```text
Input
  ↓
Hash Function
  ↓
Digest
```

A cryptographic hash is designed to be one-way for practical purposes.

## Encryption

```text
Plaintext
   ↓
Encryption + Key
   ↓
Ciphertext
```

The ciphertext is intended to be decrypted with an appropriate key.

Do not describe a SHA-256 hash as "encrypted data."

---

# `SubtleCrypto`

The cryptographic primitives exposed through:

```js
crypto.subtle
```

include operations such as:

```text
digest()
generateKey()
importKey()
exportKey()
encrypt()
decrypt()
sign()
verify()
deriveKey()
deriveBits()
wrapKey()
unwrapKey()
```

The appropriate operation depends on the cryptographic algorithm and application requirement.

---

# Generating a Symmetric Key

A symmetric algorithm uses the same secret key for encryption and decryption.

For example, AES-GCM:

```js
const key = await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  true,
  ["encrypt", "decrypt"]
);
```

The arguments describe:

* Algorithm
* Key size
* Whether the key may be exported
* Allowed key usages

## Encrypting Data

First encode the plaintext:

```js
const encoder = new TextEncoder();

const data = encoder.encode(
  "JavaScript Reference"
);
```

Generate a unique initialization vector:

```js
const iv = crypto.getRandomValues(
  new Uint8Array(12)
);
```

Encrypt:

```js
const ciphertext =
  await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    data
  );

console.log(ciphertext);
```

## Decrypting Data

Use the same key and IV:

```js
const plaintext =
  await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    ciphertext
  );
```

Decode the result:

```js
const decoder = new TextDecoder();

const text =
  decoder.decode(plaintext);

console.log(text);
```

The complete relationship is:

```text
Plaintext
    ↓
AES-GCM + Key + IV
    ↓
Ciphertext
    ↓
AES-GCM + Key + IV
    ↓
Plaintext
```

---

# Initialization Vectors

Authenticated encryption algorithms such as AES-GCM require an initialization vector.

Example:

```js
const iv = crypto.getRandomValues(
  new Uint8Array(12)
);
```

The IV is generally not a secret.

However, it must be generated and managed according to the requirements of the selected algorithm.

For AES-GCM, reusing an IV with the same key is a serious security problem.

Do not use a fixed value like:

```js
const iv = new Uint8Array(12);
```

for repeated encryption with the same key.

---

# Key Export and Import

Applications sometimes need to serialize or transfer cryptographic keys.

A key can be exported in a supported format:

```js
const exportedKey =
  await crypto.subtle.exportKey(
    "raw",
    key
  );
```

A raw key can later be imported:

```js
const importedKey =
  await crypto.subtle.importKey(
    "raw",
    exportedKey,
    {
      name: "AES-GCM"
    },
    true,
    [
      "encrypt",
      "decrypt"
    ]
  );
```

The supported format depends on the algorithm and key type.

---

# Non-Extractable Keys

When generating a key, the `extractable` parameter controls whether the key may be exported.

For example:

```js
const key = await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  false,
  [
    "encrypt",
    "decrypt"
  ]
);
```

Here:

```text
extractable = false
```

means application code cannot export the key through the normal Web Crypto key export mechanisms.

This can reduce unnecessary exposure of key material.

---

# Digital Signatures

Some cryptographic algorithms are designed for digital signatures.

The basic model is:

```text
Private Key
    ↓
Sign Message
    ↓
Signature

Public Key
    ↓
Verify Signature
```

Conceptually:

```js
const signature =
  await crypto.subtle.sign(
    algorithm,
    privateKey,
    data
  );
```

Verification:

```js
const valid =
  await crypto.subtle.verify(
    algorithm,
    publicKey,
    signature,
    data
  );
```

Digital signatures provide mechanisms for authenticity and integrity when used with an appropriate key management system.

---

# Key Pairs

Asymmetric cryptography uses a pair of keys:

```text
Private Key
→ Keep secret

Public Key
→ Can be shared
```

Applications can generate a pair using a supported algorithm:

```js
const keyPair =
  await crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent:
        new Uint8Array([
          1,
          0,
          1
        ]),
      hash: "SHA-256"
    },
    true,
    [
      "sign",
      "verify"
    ]
  );
```

The exact algorithm and parameters should be selected based on a documented security requirement.

---

# Key Derivation

Web Crypto also provides key-derivation primitives.

The general model is:

```text
Password / Secret
       ↓
Key Derivation
       ↓
Derived Key
```

Applications should use established password-based key derivation algorithms rather than inventing custom transformations.

For example, supported algorithms can include:

```text
PBKDF2
HKDF
```

The parameters must be selected deliberately, including:

* Hash function
* Salt
* Iteration or derivation parameters
* Intended key length
* Key usage

---

# Passwords and Hashing

A frequent mistake is assuming that:

```js
await crypto.subtle.digest(
  "SHA-256",
  data
);
```

is automatically a suitable password-storage system.

It is not.

Password storage requires password-specific hashing and key-stretching strategies.

A browser application should generally send passwords over secure transport to a properly designed authentication system rather than implementing an improvised password database in client-side JavaScript.

Do not create a custom algorithm such as:

```text
password
  ↓
SHA-256
  ↓
SHA-256 again
  ↓
custom transformation
```

Custom cryptographic constructions are difficult to evaluate and maintain safely.

---

# Secure Contexts

Many Web Crypto features are available in secure contexts.

Production applications should use HTTPS.

Local development commonly uses:

```text
http://localhost
```

rather than an arbitrary insecure production origin.

---

# Cryptography Does Not Replace Authentication

Encryption alone does not establish who a user is.

Authentication, authorization, encryption, signatures, key management, and secure transport solve different problems.

A secure application may need several layers:

```text
HTTPS
  ↓
Authentication
  ↓
Authorization
  ↓
Secure key management
  ↓
Cryptographic operations
```

Do not assume that adding encryption to data automatically makes the entire application secure.

---

# Protecting Key Material

Private keys and secret keys require appropriate protection.

Do not place secrets directly in source code:

```js
const secretKey = "my-super-secret-key";
```

Source code shipped to a browser is available to the client.

Similarly, environment variables exposed to client-side JavaScript are not secret merely because they originated from an environment file.

Secrets that must remain confidential should normally remain on trusted server-side infrastructure.

---

# Web Crypto and Local Storage

Avoid storing sensitive cryptographic material in `localStorage` merely because it is convenient.

For example:

```js
localStorage.setItem(
  "private-key",
  exportedKey
);
```

This can expose key material to any JavaScript running within the same origin that can access the storage.

Storage strategy should be part of the security design.

---

# Common Mistakes

## Using `Math.random()` for Security

Do not use:

```js
Math.random();
```

for:

* Authentication tokens
* Password reset tokens
* Session secrets
* Cryptographic keys
* Security-sensitive identifiers

Use:

```js
crypto.getRandomValues();
```

when cryptographic randomness is required.

## Confusing Hashing and Encryption

A digest cannot be decrypted.

If the application needs reversible confidentiality, use an encryption algorithm and proper key management.

## Reusing Nonces or IVs Incorrectly

Algorithms such as AES-GCM have strict requirements for nonce/IV handling.

Do not reuse an IV with the same key.

## Exposing Secret Keys

Never ship private secrets to the browser under the assumption that frontend source code is private.

## Designing Custom Cryptography

Avoid inventing algorithms or protocols.

Use established primitives and protocols with well-understood security properties.

## Ignoring Errors

Cryptographic operations can reject because of:

* Invalid keys
* Invalid algorithm parameters
* Wrong key usage
* Invalid data
* Unsupported formats

Handle failures explicitly.

---

# Choosing an Operation

A useful mental model:

```text
crypto.getRandomValues()
→ Secure random bytes

crypto.subtle.digest()
→ Hash

crypto.subtle.generateKey()
→ Generate keys

crypto.subtle.encrypt()
→ Encryption

crypto.subtle.decrypt()
→ Decryption

crypto.subtle.sign()
→ Digital signature

crypto.subtle.verify()
→ Signature verification

crypto.subtle.deriveKey()
→ Key derivation
```

The API operation should match the security requirement.

---

# Best Practices

* Use cryptographically secure randomness for security-sensitive values.
* Use established cryptographic algorithms.
* Keep private keys and secrets out of client source code.
* Never assume hashing and encryption are interchangeable.
* Never reuse nonces or IVs when the algorithm prohibits reuse.
* Prefer non-extractable keys when export is unnecessary.
* Keep passwords out of client-side storage.
* Use HTTPS in production.
* Treat Web Crypto as a set of primitives rather than a complete security architecture.
* Document the purpose of every cryptographic operation.
* Avoid custom cryptographic protocols.
* Consider server-side security requirements in addition to browser-side cryptography.

# Mental Model

Web Crypto provides cryptographic building blocks:

```text
Randomness
     ↓
Keys
     ↓
Cryptographic Operation
     ↓
Protected Data
```

But the security of an application depends on more than the cryptographic primitive itself:

```text
Algorithm
+
Key Management
+
Secure Transport
+
Authentication
+
Authorization
+
Secure Storage
+
Correct Implementation
```

Strong cryptography cannot compensate for insecure application architecture.

## References

* Web Crypto API
* Crypto
* SubtleCrypto
* CryptoKey
* `getRandomValues()`
* `digest()`
* `generateKey()`
* `encrypt()`
* `decrypt()`
* `sign()`
* `verify()`
* `deriveKey()`
