const cache = await caches.open("javascript-reference");

const response = new Response(
  JSON.stringify({
    name: "Osama Abu Motlaq",
    language: "JavaScript"
  }),
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);

await cache.put("/user-data", response);

const cachedResponse = await cache.match("/user-data");

if (cachedResponse) {
  const data = await cachedResponse.json();
  console.log(data);
}