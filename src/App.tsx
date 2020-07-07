import React, { useEffect } from "react";
import { CloudinaryContext } from "cloudinary-react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import Navigation from "./Components/Navigation/Navigation";
import Homepage from "./Pages/Homepage";
import TripDetails from "./Pages/TripDetails";
import MyPage from "./Pages/MyPage";
import { getUserWithStoredToken } from "./Store/users/actions";
import { cloud_name } from "./config/constants";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CloudinaryContext cloudname={cloud_name}>
          <CSSReset />
          <Navigation />
          <Switch>
            <Route path="/trip/:id?" component={TripDetails} />
            <Route path="/users/:id?" component={MyPage} />
            <Route path="/" component={Homepage} />
          </Switch>
        </CloudinaryContext>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
