chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "highlightReactPopup",
      title: "Show React Popup",
      contexts: ["selection"], // Show only when text is selected
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "highlightReactPopup" && info.selectionText) {
      // Check if tab is defined
      if (tab?.id) {
        // Ensure the tab URL is a Google Docs document
        if (tab.url?.startsWith("https://docs.google.com/document/")) {
          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              files: ["content/content.js"],
            },
            () => {
              chrome.runtime.sendMessage({ selection: info.selectionText });
            }
          );
        } else {
          console.log("This extension only works on Google Docs.");
        }
      } else {
        console.error("Error: Unable to determine the current tab.");
      }
    }
  });
  