if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js") // Specify the path to your service worker file
      .then((registration) => {
        console.log("Service worker registered:", registration);
      })
      .catch((error) => {
        console.log("Service worker registration failed:", error);
      });
  });
}
