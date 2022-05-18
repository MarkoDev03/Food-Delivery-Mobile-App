import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import themeReducer from "./themeReducer"
import loadingReducer from "./loadingReducer"

let reducers = combineReducers({
  cartReducer: cartReducer,
  themeReducer: themeReducer,
  loadingReducer: loadingReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;