const text = "JavaScript Web Platform ".repeat(100);

const encoder = new TextEncoder();

const input = new Blob([
  encoder.encode(text)
]).stream();

const compressedStream = input.pipeThrough(
  new CompressionStream("gzip")
);

const compressedResponse = new Response(compressedStream);
const compressedData = await compressedResponse.arrayBuffer();

console.log("Original size:", text.length);
console.log("Compressed size:", compressedData.byteLength);