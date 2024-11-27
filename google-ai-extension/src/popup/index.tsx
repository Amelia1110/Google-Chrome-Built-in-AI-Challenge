import React from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";

chrome.runtime.onMessage.addListener((message) => {
  if (message.selection) {
    ReactDOM.render(
      <React.StrictMode>
        <Popup selection={message.selection} />
      </React.StrictMode>,
      document.getElementById("react-root")
    );
  }
});
