let defaultState = {
    modes: { dark: false, type: "manual" },
  };
  
  let themeReducer = (state = defaultState, action) => {
    switch (action.type) {
      case "CHANGE_COLOR_TEHEM": {
        let newState = { ...state };

       if (action.payload.type == "manual") {
        if (action.payload.mode) {
          newState.modes = {
            dark: false,
            type:action.payload.type
          };
        } else {
            newState.modes = {
                dark: true,
                type:action.payload.type
              };
        }
       } else if (action.payload.type == "system") {
        newState.modes = {
          dark: action.payload.mode,
          type:action.payload.type
        };
       }
        return newState;
      }
  
      default:
        return state;
    }
  };
  
  export default themeReducer;