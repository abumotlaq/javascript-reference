const channel = new BroadcastChannel("javascript-reference");

channel.onmessage = (event) => {
  console.log("Received:", event.data);
};

channel.postMessage({
  user: "Osama Abu Motlaq",
  message: "Hello from another browsing context"
});

setTimeout(() => {
  channel.close();
}, 5000);