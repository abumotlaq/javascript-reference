if ("locks" in navigator) {
  navigator.locks.request("javascript-reference", async (lock) => {
    console.log("Lock acquired:", lock.name);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    console.log("Lock released");
  });
}