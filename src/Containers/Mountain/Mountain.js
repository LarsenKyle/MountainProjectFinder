import React, { Component } from "react";
import axios from "axios";
import ClimbSearch from "../../Components/ClimbSearch/ClimbSearch";

class Mountain extends Component {
  state = {
    routes: null,
    error: null,
    lat: null,
    long: null,
    distance: "50",
    minDiff: "v0",
    maxDiff: "V16"
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat: pos.coords.latitude.toString(),
        long: pos.coords.longitude.toString()
      });
    });
  }
  checkRoutes = async () => {
    if (!this.state.routes) {
      try {
        let ref = await axios.get(
          `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${this.state.lat}&lon=${this.state.long}&maxDistance=${this.state.distance}&minDiff=${this.state.minDiff}&maxDiff=${this.state.maxDiff}&key=200482277-6a6cd92f3d2c6bf7e97ea689bf580c56`
        );
        const limitRoutes = ref.data.routes.slice(0, 15);
        this.setState({
          routes: limitRoutes
        });
        console.log(this.state.routes);
      } catch (error) {
        console.log(error);
        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <div className="mountain">
        <h2 onClick={this.checkRoutes}> Find climbing routes near you! </h2>
        <ClimbSearch />
      </div>
    );
  }
}

export default Mountain;
