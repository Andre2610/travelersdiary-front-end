import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
} from "@chakra-ui/core";
import Navigation from "./Components/Navigation/Navigation";
import Homepage from "./Pages/Homepage";
import TripDetails from "./Pages/TripDetails";

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Navigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/trip/:id?" component={TripDetails} />
        </Switch>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
