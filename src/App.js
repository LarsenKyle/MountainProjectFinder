import React from "react";
import Mountain from "./Containers/Mountain/Mountain";
import About from "./Containers/About/About";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Mountain} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
