import React from "react";
import "./Route.scss";
import EachRoute from "./EachRoute";

const Route = props => {
  return (
    <EachRoute
      grade={props.grade}
      type={props.type}
      name={props.name}
      location={props.location}
      clicked={props.clicked}
    />
  );
};

export default Route;
