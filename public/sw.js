if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") // Specify the path to your service worker file
      .catch((error) => {
        console.log("Service worker registration failed:", error);
      });
  });
}
