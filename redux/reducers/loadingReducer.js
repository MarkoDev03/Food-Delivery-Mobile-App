let defaultState = {
    loaded: false
  };
  
  let loadingReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "LOADED": {
        let newState = { ...state };

        newState = {
            loaded: action.payload.loaded,
          };

        return newState;
      }
  
      default:
        return state;
    }
  };
  
  export default loadingReducer;