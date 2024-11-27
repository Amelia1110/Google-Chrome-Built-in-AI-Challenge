chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "highlightReactPopup",
    title: "Show React Popup",
    contexts: ["selection"], // Show only when text is selected
  });
});

// Add type annotations to `info` and `tab` for better TypeScript support
chrome.contextMenus.onClicked.addListener(
  async (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
    if (info.menuItemId === "highlightReactPopup" && info.selectionText) {
      // Check if the tab and tab ID are defined
      if (tab?.id) {
        // Ensure the tab URL is a Google Docs document
        if (tab.url?.startsWith("https://docs.google.com/document/")) {
          try {
            // Using chrome.scripting.executeScript to run the content script
            await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content/content.js"], // Ensure this file exists and is correctly referenced
            });
            // Send the selected text to the content script
            chrome.runtime.sendMessage({ selection: info.selectionText });
          } catch (error) {
            console.error("Failed to execute script:", error);
          }
        } else {
          console.log("This extension only works on Google Docs.");
        }
      } else {
        console.error("Error: Unable to determine the current tab.");
      }
    }
  }
);
