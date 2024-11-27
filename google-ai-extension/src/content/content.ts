// Only run if on a Google Docs document
if (window.location.hostname === "docs.google.com" && window.location.pathname.startsWith("/document")) {
  chrome.runtime.onMessage.addListener((message: { selection?: string }) => {
    if (message.selection) {
      const containerId = "react-popup-container";

      // Remove existing popup if it exists
      const existingPopup = document.getElementById(containerId);
      if (existingPopup) existingPopup.remove();

      // Create popup container
      const container = document.createElement("div");
      container.id = containerId;
      container.style.position = "fixed";
      container.style.top = "20px";
      container.style.right = "20px";
      container.style.zIndex = "10000";
      container.style.background = "white";
      container.style.border = "1px solid black";
      container.style.padding = "10px";
      container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

      document.body.appendChild(container);

      // Inject React App
      const root = document.createElement("div");
      root.id = "react-root";
      container.appendChild(root);

      // Dynamically load the React app script
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("popup/index.js");
      script.onload = () => {
        // Remove the script after it’s loaded
        script.remove();
      };

      // Error handling if script injection fails
      script.onerror = () => {
        console.error("Failed to load the React app script.");
      };

      document.body.appendChild(script);
    }
  });
} else {
  console.log("This application only runs on Google Docs.");
}
