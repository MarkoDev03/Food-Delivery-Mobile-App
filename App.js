import React from "react";
import RootNavigation from "./navigation.js";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from './redux/store';

const store = configureStore();

 const  App = () => {
    return (
      <ReduxProvider store={store}>
          <RootNavigation />
          </ReduxProvider> )
}

export default App;