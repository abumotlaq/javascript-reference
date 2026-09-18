const controller = new AbortController();

setTimeout(() => {
  controller.abort();
}, 1000);

try {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      signal: controller.signal
    }
  );

  const posts = await response.json();

  console.log(posts);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request aborted");
  } else {
    console.error(error);
  }
}