import React from "react";

const EachRoute = props => {
  const clickIt = () => {
    console.log(props);
  };
  return (
    <tr onClick={clickIt}>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.grade}</td>
      <td>{props.location}</td>
    </tr>
  );
};

export default EachRoute;
