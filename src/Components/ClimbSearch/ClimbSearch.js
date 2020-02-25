import React from "react";

const ClimbSearch = props => {
  return (
    <div className="climb-search">
      <label for="distance">How far do you want to go?</label>
      <input id="distance" type="number" />
    </div>
  );
};

export default ClimbSearch;
