// TypeScript utility for handling the `chrome` API with a fallback.

type ChromeAPI = typeof chrome;

// Mock implementation for development
const mockChrome: ChromeAPI = {
    runtime: {
        onMessage: {
            addListener: (callback: (message: any, sender: any, sendResponse: (response: any) => void) => void) => {
                console.log("Mock: listener added.");
                // Simulate receiving a message
                setTimeout(() => {
                    callback({ action: "textSelected", text: "Mock selected text" }, {}, () => {
                        console.log("Mock response sent.");
                    });
                }, 1000);
            },
        },
        sendMessage: (message: any, callback?: (response: any) => void) => {
            console.log("Mock: message sent", message);
            if (callback) callback({ success: true });
        },
    },
    // Add other chrome API mocks as needed.
} as unknown as ChromeAPI; // Use a type assertion since not all fields are implemented.

const chromeAPI: ChromeAPI = typeof chrome !== "undefined" ? chrome : mockChrome;

export default chromeAPI;
