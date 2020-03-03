import React from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Mountain from "./Containers/Mountain/Mountain";
import RouteView from "./Containers/RouteView/RouteView";
import SavedRoutes from "./Containers/SavedRoutes/SavedRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route path="/MountainProjectFinder" exact component={Mountain} />
        <Route path="/route:id" component={RouteView} />
        <Route path="/saved" component={SavedRoutes} />
      </div>
    </BrowserRouter>
  );
}

export default App;
