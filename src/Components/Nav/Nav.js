import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = props => {
  return (
    <div>
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
    </div>
  );
};

export default Nav;
