import React from "react";

const MessageBox = ({ variant, children }) => {
  return <div className={`error error__${variant || "info"}`}>{children}</div>;
};

export default MessageBox;
