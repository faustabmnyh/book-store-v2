import React from "react";

const LoadingBox = ({height}) => {
  return (
    <div className={`loading-container ${height}`}>
      <div className="loading">
        <i className="fa fa-spinner fa-spin"></i>
        <span>Please wait for a moment</span>
      </div>
    </div>
  );
};

export default LoadingBox;
