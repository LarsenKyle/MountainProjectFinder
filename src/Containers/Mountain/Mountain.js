import React, { Component } from "react";
import "./Mountain.scss";
import axios from "axios";
import ClimbSearch from "../../Components/ClimbSearch/ClimbSearch";
import Route from "../../Components/Route/Route";

class Mountain extends Component {
  state = {
    routes: null,
    error: null,
    lat: null,
    long: null,
    distance: "50",
    minDiff: "V0",
    maxDiff: "V16",
    msg: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat: pos.coords.latitude.toString(),
        long: pos.coords.longitude.toString()
      });
    });
  }
  changeDistance = e => {
    let distance = e.target.value;
    this.setState({
      distance: distance
    });
  };
  changeDifficulty = e => {
    let difficulty = e.target.value;
    if (difficulty === "all") {
      this.setState({
        minDiff: "V0",
        maxDiff: "V16"
      });
    }

    if (difficulty === "beginner") {
      this.setState({
        minDiff: "V0",
        maxDiff: "V2"
      });
    }
    if (difficulty === "intermediate") {
      this.setState({
        minDiff: "V3",
        maxDiff: "V5"
      });
    }
    if (difficulty === "advanced") {
      this.setState({
        minDiff: "V6",
        maxDiff: "V10"
      });
    }
    if (difficulty === "expert") {
      this.setState({
        minDiff: "V10",
        maxDiff: "V16"
      });
    }
  };
  findRoutes = async () => {
    let apiKey = process.env.REACT_APP_KEY;
    try {
      let ref = await axios.get(
        `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${this.state.lat}&lon=${this.state.long}&maxDistance=${this.state.distance}&minDiff=${this.state.minDiff}&maxDiff=${this.state.maxDiff}&key=${apiKey}`
      );
      const limitRoutes = ref.data.routes.slice(0, 20);
      this.setState({
        routes: limitRoutes
      });
      console.log(this.state.routes);
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };
  clearRoutes = () => {
    this.setState({
      routes: null
    });
  };

  render() {
    let search = (
      <ClimbSearch
        clicked={this.findRoutes}
        difChange={this.changeDifficulty}
        disChange={this.changeDistance}
      />
    );
    let routeTable = null;
    if (this.state.routes) {
      search = null;
      routeTable = this.state.routes.map(route => {
        return (
          <Route
            key={route.id}
            name={route.name}
            type={route.type}
            grade={route.rating}
            location={route.location[2]}
          />
        );
      });
    }

    return (
      <div className="mountain">
        {!this.state.routes ? (
          <h2> Find climbing routes near you! </h2>
        ) : (
          <h2>Click for details!</h2>
        )}
        {search}
        {this.state.routes ? (
          <table id="routes">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Location</th>
              </tr>
            </thead>
            {routeTable}
          </table>
        ) : null}
        {this.state.routes ? (
          <button onClick={this.clearRoutes} className="btn">
            Change Search
          </button>
        ) : null}
      </div>
    );
  }
}

export default Mountain;
