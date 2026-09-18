const encoder = new TextEncoder();
const decoder = new TextDecoder();

const text = "Osama Abu Motlaq";

const encoded = encoder.encode(text);
const decoded = decoder.decode(encoded);

console.log(encoded);
console.log(decoded);