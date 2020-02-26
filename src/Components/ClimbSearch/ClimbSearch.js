import React from "react";
import "./ClimbSearch.scss";

const ClimbSearch = props => {
  const margin = {
    marginTop: "1rem"
  };
  return (
    <div className="climb-search">
      <div style={margin} className="form-group">
        <label htmlFor="dynamic-label-input">How far do you want to go?</label>
        <input
          onChange={props.disChange}
          type="number"
          id="dynamic-label-input"
          placeholder="Distance in miles"
        />
      </div>
      <div className="form-group">
        <label htmlFor="min-select">Select Difficulty</label>
        <select onChange={props.difChange} id="min-select">
          <option value="all">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <button className="btn" onClick={props.clicked}>
        Find Routes
      </button>
    </div>
  );
};

export default ClimbSearch;
