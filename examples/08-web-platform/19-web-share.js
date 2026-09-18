const shareData = {
  title: "JavaScript Reference",
  text: "JavaScript Web Platform example",
  url: window.location.href
};

if (navigator.share) {
  try {
    await navigator.share(shareData);
    console.log("Shared successfully");
  } catch (error) {
    console.error("Share failed:", error);
  }
} else {
  console.log("Web Share API is not supported");
}