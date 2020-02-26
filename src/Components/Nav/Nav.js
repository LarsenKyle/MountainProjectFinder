import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = props => {
  return (
    <header>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
