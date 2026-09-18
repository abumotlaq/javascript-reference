const controller = new AbortController();

const timeoutId = setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      signal: controller.signal,
      headers: {
        Accept: "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);
} catch (error) {
  if (error.name === "AbortError") {
    console.error("Request timed out");
  } else {
    console.error("Request failed:", error);
  }
} finally {
  clearTimeout(timeoutId);
}