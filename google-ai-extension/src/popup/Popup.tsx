import React from "react";

type PopupProps = {
  selection: string;
};

const Popup: React.FC<PopupProps> = ({ selection }) => {
  return (
    <div>
      <h3>Highlighted Text</h3>
      <p>{selection}</p>
    </div>
  );
};

export default Popup;
