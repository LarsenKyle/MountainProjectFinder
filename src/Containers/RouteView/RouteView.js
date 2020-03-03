import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./RouteView.scss";

class RouteView extends Component {
  state = {
    route: null,
    loading: false,
    starToggle: false
  };
  async componentDidMount() {
    let isSaved = JSON.parse(localStorage.getItem("routeIDs"));

    if (isSaved === null) isSaved = [];

    if (isSaved.includes(parseInt(this.props.match.params.id))) {
      this.setState({ starToggle: true });
    }
    if (!this.state.route) {
      let ref = await axios.get(
        `https://www.mountainproject.com/data/get-routes?routeIds=${this.props.match.params.id}&key=200482277-6a6cd92f3d2c6bf7e97ea689bf580c56`
      );
      this.setState({ route: ref.data.routes[0] });
    }
  }
  clearStorage = () => {
    localStorage.clear();
  };
  saveRoute = () => {
    if (!this.state.starToggle) {
      let routeIDs = JSON.parse(localStorage.getItem("routeIDs"));
      if (routeIDs === null) routeIDs = [];
      routeIDs.push(this.state.route.id);
      localStorage.setItem("routeIDs", JSON.stringify(routeIDs));
    } else {
      let routeIDs = JSON.parse(localStorage.getItem("routeIDs"));
      let filteredRoute = routeIDs.filter(route => {
        return route != this.state.route.id;
      });
      console.log(filteredRoute);

      localStorage.setItem("routeIDs", JSON.stringify(filteredRoute));
    }
    const opposite = !this.state.starToggle;
    this.setState({
      starToggle: opposite
    });
  };
  render() {
    let location = <p>loading...</p>;
    if (this.state.route) {
      location = this.state.route.location.map(loc => {
        return <p key={loc}>{loc}</p>;
      });
    }
    return (
      <div>
        {this.state.route ? (
          <div className="line">
            <div className="flex">
              <div className="info">
                <h2 onClick={this.clearStorage}>{this.state.route.name}</h2>
                {!this.state.starToggle ? (
                  <svg
                    onClick={this.saveRoute}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                  </svg>
                ) : (
                  <svg
                    onClick={this.saveRoute}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                )}
                <p className="local">Location</p>
                <div className="info-line">{location}</div>
                <div className="info-line">
                  <p className="emph">Type:</p> <p>{this.state.route.type}</p>
                </div>
                <div className="info-line">
                  <p className="emph">Grade:</p>{" "}
                  <p>{this.state.route.rating}</p>
                </div>
                <div className="info-line">
                  <p className="emph">Rating:</p>{" "}
                  <p> {this.state.route.stars} Stars</p>
                </div>
              </div>
              {this.state.route.imgSmallMed ? (
                <img alt="Selected Route" src={this.state.route.imgSmallMed} />
              ) : null}
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    rts: state
  };
};
export default connect(mapStateToProps)(RouteView);
