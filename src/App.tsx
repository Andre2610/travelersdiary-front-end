import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
