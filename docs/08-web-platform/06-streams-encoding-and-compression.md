# Streams, Encoding, and Compression

Web applications often process data incrementally rather than loading an entire resource into memory before processing it.

The Web Platform provides APIs for:

* Reading data as streams
* Processing chunks incrementally
* Encoding text as bytes
* Decoding bytes as text
* Transforming streamed data
* Compressing streamed data

This section combines `Streams`, `TextEncoder`, `TextDecoder`, and `CompressionStream` because they solve closely related data-processing problems.

## Why Streams Matter

Without streaming, a large resource is often handled conceptually like this:

```text
Network
   ↓
Download everything
   ↓
Load everything into memory
   ↓
Process
```

With streaming:

```text
Network
   ↓
Chunk
   ↓
Process
   ↓
Next chunk
   ↓
Process
```

Streaming can allow an application to start processing data before the complete resource has arrived.

This is especially useful for:

* Large responses
* Files
* Media
* Generated data
* Compression
* Incremental processing

---

# ReadableStream

A `ReadableStream` represents a source of readable data.

A simple stream can be created manually:

```js
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("JavaScript");
    controller.enqueue("Web Platform");
    controller.enqueue("Streams");

    controller.close();
  }
});
```

The stream has now produced three chunks.

## Reading a Stream

Use `getReader()` to obtain a reader:

```js
const reader = stream.getReader();
```

Read chunks asynchronously:

```js
while (true) {
  const {
    value,
    done
  } = await reader.read();

  if (done) {
    break;
  }

  console.log(value);
}
```

Each call to:

```js
reader.read()
```

returns a Promise that resolves to an object containing:

```js
{
  value,
  done
}
```

The meaning is:

```text
done: false
→ A chunk was received.

done: true
→ The stream has finished.
```

## Closing a Stream

A custom stream can be closed by calling:

```js
controller.close();
```

After closure, no more chunks should be produced.

## Errors in a Stream

A stream can signal an error:

```js
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("First chunk");

    controller.error(
      new Error("Stream failed")
    );
  }
});
```

Consumers should handle the failure:

```js
try {
  const reader = stream.getReader();

  while (true) {
    const {
      value,
      done
    } = await reader.read();

    if (done) {
      break;
    }

    console.log(value);
  }
} catch (error) {
  console.error(
    "Stream error:",
    error
  );
}
```

---

# Fetch Response Streams

Fetch responses can expose a readable body stream.

```js
const response =
  await fetch("/api/data");

const reader =
  response.body.getReader();
```

Then read chunks:

```js
while (true) {
  const {
    value,
    done
  } = await reader.read();

  if (done) {
    break;
  }

  console.log(value);
}
```

The chunks from a network response are often represented as `Uint8Array` values.

This means the application may need to decode the bytes into text.

---

# TextEncoder

`TextEncoder` converts text into UTF-8 encoded bytes.

```js
const encoder =
  new TextEncoder();

const bytes =
  encoder.encode(
    "Osama Abu Motlaq"
  );

console.log(bytes);
```

The result is a `Uint8Array`.

Conceptually:

```text
String
  ↓
TextEncoder
  ↓
UTF-8 bytes
```

## Example

```js
const encoder =
  new TextEncoder();

const data =
  encoder.encode(
    "JavaScript Reference"
  );

console.log(
  data instanceof Uint8Array
);
```

The result is a byte representation rather than a JavaScript string.

---

# TextDecoder

`TextDecoder` performs the opposite conversion.

```js
const decoder =
  new TextDecoder();

const text =
  decoder.decode(bytes);

console.log(text);
```

Conceptually:

```text
UTF-8 bytes
  ↓
TextDecoder
  ↓
String
```

## Encoding and Decoding Together

```js
const encoder =
  new TextEncoder();

const decoder =
  new TextDecoder();

const text =
  "Osama Abu Motlaq";

const encoded =
  encoder.encode(text);

const decoded =
  decoder.decode(encoded);

console.log(encoded);
console.log(decoded);
```

This round trip demonstrates the relationship between text and its byte representation.

---

# Decoding Network Streams

A fetch response can be decoded incrementally.

```js
const response =
  await fetch("/api/messages");

const reader =
  response.body.getReader();

const decoder =
  new TextDecoder();

while (true) {
  const {
    value,
    done
  } = await reader.read();

  if (done) {
    break;
  }

  const chunk =
    decoder.decode(
      value,
      {
        stream: true
      }
    );

  console.log(chunk);
}
```

The `stream: true` option allows the decoder to correctly handle multi-byte characters that may be split across chunks.

When the stream ends, flush the decoder:

```js
const finalChunk =
  decoder.decode();

console.log(finalChunk);
```

This pattern becomes important when processing text incrementally.

---

# Streams and Memory

A large resource can be expensive if the application first loads everything:

```js
const response =
  await fetch("/large-file");

const data =
  await response.arrayBuffer();
```

The entire response is materialized before further processing.

Streaming can instead process smaller chunks:

```js
const response =
  await fetch("/large-file");

const reader =
  response.body.getReader();

while (true) {
  const {
    value,
    done
  } = await reader.read();

  if (done) {
    break;
  }

  processChunk(value);
}
```

This does not automatically make every application faster.

The benefit depends on:

* Resource size
* Processing cost
* Network behavior
* Memory constraints
* The consumer's ability to process incrementally

---

# WritableStream

A `WritableStream` represents a destination for data.

A simple writable stream:

```js
const writable =
  new WritableStream({
    write(chunk) {
      console.log(
        "Received:",
        chunk
      );
    }
  });
```

A writer can be obtained:

```js
const writer =
  writable.getWriter();

await writer.write(
  "JavaScript"
);

await writer.write(
  "Web Platform"
);

await writer.close();
```

The general model is:

```text
ReadableStream
      ↓
    Data
      ↓
WritableStream
```

---

# TransformStream

A `TransformStream` sits between a readable source and a writable destination.

Conceptually:

```text
Readable
   ↓
Transform
   ↓
Writable
```

Example:

```js
const transform =
  new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(
        chunk.toUpperCase()
      );
    }
  });
```

Use it in a pipeline:

```js
const input =
  new ReadableStream({
    start(controller) {
      controller.enqueue(
        "javascript"
      );

      controller.enqueue(
        "web platform"
      );

      controller.close();
    }
  });

const output =
  input.pipeThrough(
    transform
  );
```

Consume the result:

```js
const reader =
  output.getReader();

while (true) {
  const {
    value,
    done
  } = await reader.read();

  if (done) {
    break;
  }

  console.log(value);
}
```

---

# `pipeThrough()`

`pipeThrough()` sends a stream through a transformation.

```js
const transformed =
  input.pipeThrough(
    transform
  );
```

This allows multiple processing stages:

```text
ReadableStream
      ↓
TransformStream
      ↓
TransformStream
      ↓
WritableStream
```

For example:

```js
const pipeline =
  input
    .pipeThrough(firstTransform)
    .pipeThrough(secondTransform);
```

The pipeline model makes complex streaming logic easier to reason about.

---

# CompressionStream

`CompressionStream` provides stream-based compression.

For example:

```js
const input =
  new Blob([
    "JavaScript ".repeat(100)
  ]).stream();

const compressed =
  input.pipeThrough(
    new CompressionStream("gzip")
  );
```

The input stream is transformed into compressed output.

## Reading Compressed Data

Convert the resulting stream into a response:

```js
const response =
  new Response(
    compressed
  );

const buffer =
  await response.arrayBuffer();

console.log(
  buffer.byteLength
);
```

This is one way to inspect the compressed result.

## Compression Pipeline

The relationship can be visualized as:

```text
Text / Data
    ↓
ReadableStream
    ↓
CompressionStream
    ↓
Compressed Stream
```

---

# Decompression

The platform also provides `DecompressionStream`.

```js
const decompressed =
  compressed.pipeThrough(
    new DecompressionStream("gzip")
  );
```

A useful pipeline can therefore be:

```text
Compressed Data
      ↓
DecompressionStream
      ↓
Readable Data
```

The compression format must be supported by the browser and match the stream operation.

---

# Streams and Backpressure

A stream pipeline can involve producers and consumers operating at different speeds.

For example:

```text
Producer
   ↓
Fast
   ↓
Consumer
   ↓
Slow
```

Without flow control, a fast producer could generate data faster than the consumer can process it.

Streams provide mechanisms for coordinating this flow.

This concept is known as **backpressure**.

The general principle is:

```text
Producer should not continuously outrun consumer capacity.
```

Backpressure becomes especially important for:

* Large files
* Network streams
* Transformation pipelines
* Compression
* Data processing

---

# Fetch Streaming Example

A simple text-stream processing pattern:

```js
const response =
  await fetch("/api/logs");

if (!response.ok) {
  throw new Error(
    `Request failed: ${response.status}`
  );
}

if (!response.body) {
  throw new Error(
    "Response body is not available."
  );
}

const reader =
  response.body.getReader();

const decoder =
  new TextDecoder();

try {
  while (true) {
    const {
      value,
      done
    } = await reader.read();

    if (done) {
      break;
    }

    const text =
      decoder.decode(
        value,
        {
          stream: true
        }
      );

    console.log(text);
  }
} finally {
  reader.releaseLock();
}
```

Releasing the reader lock allows the stream to be used appropriately after the reading operation ends.

---

# Aborting Streamed Fetches

Streams are asynchronous and may need cancellation.

Combine them with `AbortController`:

```js
const controller =
  new AbortController();

const response =
  await fetch(
    "/api/large-file",
    {
      signal:
        controller.signal
    }
  );
```

Cancel later:

```js
controller.abort();
```

This is especially useful when:

* The user navigates away
* A download is canceled
* A search request becomes irrelevant
* A large operation is no longer needed

Streaming and cancellation often belong together.

---

# Binary Data

Streams frequently expose byte-oriented data.

For example:

```js
const response =
  await fetch(
    "/assets/file.bin"
  );

const reader =
  response.body.getReader();

const {
  value,
  done
} = await reader.read();

if (!done) {
  console.log(
    value instanceof Uint8Array
  );
}
```

Do not convert binary data to strings unless the data is actually textual.

For binary content, prefer APIs such as:

```js
response.arrayBuffer()
response.blob()
```

or process the stream as bytes.

---

# Choosing the Right API

A useful mental model:

```text
ReadableStream
→ Read chunks

WritableStream
→ Write chunks

TransformStream
→ Transform chunks

TextEncoder
→ Text → bytes

TextDecoder
→ bytes → text

CompressionStream
→ Compress chunks

DecompressionStream
→ Decompress chunks
```

These APIs can be combined into pipelines when the application benefits from incremental processing.

---

# Common Mistakes

## Loading Everything Into Memory Unnecessarily

For large resources, do not assume:

```js
const data =
  await response.arrayBuffer();
```

is always the best approach.

Consider streaming when incremental processing is possible.

## Ignoring `response.body`

Not every response flow should assume a readable body exists:

```js
if (!response.body) {
  throw new Error(
    "Readable response body unavailable."
  );
}
```

## Decoding Each Chunk Independently

This can break multi-byte characters.

Prefer:

```js
decoder.decode(
  chunk,
  {
    stream: true
  }
);
```

when processing incremental text.

## Treating Binary Data as Text

Do not use `TextDecoder` for arbitrary binary content.

Choose the representation based on what the data actually contains.

## Ignoring Cancellation

Large streams may continue processing after the user no longer needs them.

Use `AbortController` when cancellation is meaningful.

## Building Complex Pipelines Without Understanding Backpressure

A stream pipeline is more than a sequence of transformations.

The producer, transformations, and consumer should be able to operate together without unnecessary buffering.

---

# Best Practices

* Use streams when data can be processed incrementally.
* Avoid loading very large resources into memory unnecessarily.
* Keep binary data as binary.
* Use `TextEncoder` and `TextDecoder` deliberately.
* Use streaming decoding for chunked text.
* Use transform streams for reusable data-processing stages.
* Use compression when the cost-benefit tradeoff makes sense.
* Consider backpressure when designing pipelines.
* Combine streaming with cancellation for long-running operations.
* Release readers when the operation is complete.
* Handle stream errors explicitly.

# References

* Streams API
* ReadableStream
* WritableStream
* TransformStream
* Encoding API
* TextEncoder
* TextDecoder
* Compression Streams API
* CompressionStream
* DecompressionStream
