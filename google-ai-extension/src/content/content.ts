if (window.location.hostname === "docs.google.com" && window.location.pathname.startsWith("/document")) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.selection) {
        const containerId = "react-popup-container";
  
        // Remove existing popup
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
  
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("popup/index.js");
        script.onload = () => {
          script.remove();
        };
        document.body.appendChild(script);
      }
    });
  } else {
    console.log("This application only runs on Google Docs.");
  }
  