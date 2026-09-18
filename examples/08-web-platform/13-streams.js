const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("JavaScript");
    controller.enqueue("Web");
    controller.enqueue("Platform");
    controller.close();
  }
});

const reader = stream.getReader();

while (true) {
  const { value, done } = await reader.read();

  if (done) {
    break;
  }

  console.log(value);
}