import React, { useState } from "react";

const Popup: React.FC<{ selection: string }> = ({ selection }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    <div key="tab1">
      <h3>Tab 1</h3>
      <p>{selection}</p>
    </div>,
    <div key="tab2">
      <h3>Tab 2</h3>
      <p>More content for Tab 2</p>
    </div>,
    <div key="tab3">
      <h3>Tab 3</h3>
      <p>More content for Tab 3</p>
    </div>,
    <div key="tab4">
      <h3>Tab 4</h3>
      <p>More content for Tab 4</p>
    </div>,
  ];

  return (
    <div id="react-root">
      {/* Tab navigation */}
      <div className="tab-container">
        {["Tab 1", "Tab 2", "Tab 3", "Tab 4"].map((tabName, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? "active" : ""}`}
          >
            {tabName}
          </div>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {tabContents[activeTab]}
      </div>
    </div>
  );
};

export default Popup;
