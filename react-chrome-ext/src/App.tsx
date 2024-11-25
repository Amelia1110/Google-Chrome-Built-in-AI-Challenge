import React, { useEffect, useState } from "react";
import chromeAPI from "./utils/chromeAPI";

function App() {
    const [highlightedText, setHighlightedText] = useState("");

    useEffect(() => {
        // Listen for messages from the background script
        chromeAPI.runtime.onMessage.addListener((message) => {
            if (message.action === "textSelected") {
                setHighlightedText(message.text);
            }
        });
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <h1>React Highlight Extension</h1>
            {highlightedText ? (
                <p>Selected Text: {highlightedText}</p>
            ) : (
                <p>Select text on a page to see it here.</p>
            )}
        </div>
    );
}

export default App;