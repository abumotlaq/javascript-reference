const encoder = new TextEncoder();
const data = encoder.encode("Osama Abu Motlaq");

const hashBuffer = await crypto.subtle.digest(
  "SHA-256",
  data
);

const hashArray = Array.from(new Uint8Array(hashBuffer));

const hash = hashArray
  .map((byte) => byte.toString(16).padStart(2, "0"))
  .join("");

console.log(hash);