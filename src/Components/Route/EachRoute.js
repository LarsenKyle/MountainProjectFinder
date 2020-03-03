import React from "react";

const EachRoute = props => {
  return (
    <tr onClick={props.clicked}>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.grade}</td>
      <td>{props.location}</td>
    </tr>
  );
};

export default EachRoute;
