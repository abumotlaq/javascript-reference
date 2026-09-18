const blob = new Blob(
  ["Osama Abu Motlaq"],
  { type: "text/plain" }
);

console.log(blob.size);
console.log(blob.type);

const file = new File(
  ["JavaScript Reference"],
  "example.txt",
  { type: "text/plain" }
);

console.log(file.name);
console.log(file.size);
console.log(file.type);

const text = await file.text();

console.log(text);