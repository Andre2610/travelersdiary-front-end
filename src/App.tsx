import React, { useEffect } from "react";
import { CloudinaryContext } from "cloudinary-react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import Navigation from "./Components/Navigation/Navigation";
import Messagebox from "./Components/AppStateComponents/Messagebox";
import Homepage from "./Pages/Homepage";
import TripDetails from "./Pages/TripDetails";
import MyPage from "./Pages/MyPage";
import Footer from "./Components/Footer/Footer";
import { getUserWithStoredToken } from "./Store/users/actions";
import { selectAppLoading } from "./Store/appState/selector";
import Loading from "./Components/AppStateComponents/Loading";
import { cloud_name } from "./config/constants";
import { useDispatch, useSelector } from "react-redux";
import { CustomTheme } from "./Style/CustomTheme";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAppLoading);
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <ColorModeProvider>
        <CloudinaryContext cloudname={cloud_name}>
          <CSSReset />
          <Navigation />
          <Messagebox />
          {loading ? <Loading /> : null}
          <Switch>
            <Route path="/trip/:id?" component={TripDetails} />
            <Route path="/users/:id?" component={MyPage} />
            <Route path="/" component={Homepage} />
          </Switch>
          <Footer />
        </CloudinaryContext>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
