const request = indexedDB.open("javascript-reference", 1);

request.onupgradeneeded = (event) => {
  const database = event.target.result;

  if (!database.objectStoreNames.contains("users")) {
    database.createObjectStore("users", {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

request.onsuccess = (event) => {
  const database = event.target.result;

  const transaction = database.transaction("users", "readwrite");
  const store = transaction.objectStore("users");

  store.add({
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
  });

  transaction.oncomplete = () => {
    console.log("User stored");

    const readTransaction = database.transaction("users", "readonly");
    const readStore = readTransaction.objectStore("users");

    const getRequest = readStore.getAll();

    getRequest.onsuccess = () => {
      console.log(getRequest.result);
    };
  };
};

request.onerror = () => {
  console.error("IndexedDB error:", request.error);
};