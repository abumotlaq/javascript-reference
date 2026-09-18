const workerCode = `
  self.onmessage = (event) => {
    const result = event.data * 2;
    self.postMessage(result);
  };
`;

const blob = new Blob(
  [workerCode],
  { type: "text/javascript" }
);

const workerUrl = URL.createObjectURL(blob);
const worker = new Worker(workerUrl);

worker.onmessage = (event) => {
  console.log("Worker result:", event.data);

  worker.terminate();
  URL.revokeObjectURL(workerUrl);
};

worker.postMessage(21);