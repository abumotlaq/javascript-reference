const target = document.querySelector("#target");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      console.log({
        isIntersecting: entry.isIntersecting,
        ratio: entry.intersectionRatio
      });
    }
  },
  {
    threshold: 0.5
  }
);

if (target) {
  observer.observe(target);
}