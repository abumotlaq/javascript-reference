const container = document.querySelector("#container");

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log({
      type: mutation.type,
      addedNodes: mutation.addedNodes.length,
      removedNodes: mutation.removedNodes.length
    });
  }
});

if (container) {
  observer.observe(container, {
    childList: true,
    attributes: true,
    subtree: true
  });
}