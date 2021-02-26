import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./components/Home"
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import LocationContainer from "./components/LocationContainer";
import Gmap from "./components/Maps/Map.js";
import { authenticate } from "./services/auth";
import { setUser } from "./store/session"
import "./components/NavBar/Navbar.css"
import LocationForm from"./components/LocationForm/location_form"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setUser(user));
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar className="nav" setDisplay={setDisplay} setAuthenticated={setAuthenticated} authenticated={authenticated} />
      {loaded && (
        <Switch>
          <Route exact path="/" >
            <Home display={display} />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          {/* <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList />
          </ProtectedRoute> */}
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/locations/:locationId" exact={true} authenticated={authenticated}>
            <LocationContainer />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard" exact={true} authenticated={authenticated}>
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/locations/add/new" exact={true} authenticated={authenticated}>
            <LocationForm />
          </ProtectedRoute>
          <Route path="/map">
            <Gmap />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
