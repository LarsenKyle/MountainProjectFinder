import React, { Component } from "react";
import Route from "../../Components/Route/Route";
import Axios from "axios";

class SavedRoutes extends Component {
  state = {
    routes: null
  };
  async componentDidMount() {
    let apiKey = process.env.REACT_APP_KEY;
    let routeIDs = JSON.parse(localStorage.getItem("routeIDs"));
    if (routeIDs.length > 0) {
      routeIDs.join();
      let ref = await Axios.get(
        `https://www.mountainproject.com/data/get-routes?routeIds=${routeIDs}&${apiKey}`
      );
      this.setState({
        routes: ref.data.routes
      });
    }
  }
  clear = () => {
    localStorage.clear();
  };
  visitRoute = id => {
    this.props.history.push(`/route${id}`);
  };
  render() {
    let routeTable = <p>loading...</p>;
    if (this.state.routes) {
      routeTable = this.state.routes.map(route => {
        let arrNum = parseInt(route.location.length);
        arrNum -= 1;
        return (
          <Route
            key={route.id}
            name={route.name}
            type={route.type}
            grade={route.rating}
            location={route.location[arrNum]}
            clicked={() => this.visitRoute(route.id)}
          />
        );
      });
    }
    return (
      <div className="saved-routes">
        <h2>SavedRoutes</h2>
        <p>Click a route for more details!</p>
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
      </div>
    );
  }
}

export default SavedRoutes;
