const initialState = {
  routes: "sauce"
};

const reducer = (state = initialState, action) => {
  if (action.type === "GET_ROUTES") {
    return {
      routes: action.routes
    };
  }
  return state;
};

export default reducer;
