const element = document.querySelector("#target");

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log({
      width: entry.contentRect.width,
      height: entry.contentRect.height
    });
  }
});

if (element) {
  observer.observe(element);
}