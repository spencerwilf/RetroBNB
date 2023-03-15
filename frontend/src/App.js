import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";
import UserSpots from "./components/UserSpots";
import EditSpotWrapper from "./components/EditSpot/EditSpotWrapper";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path='/'>
          <LandingPage/>
          </Route>
          <Route path='/spots/new'>
            <CreateSpot/>
          </Route>
          <Route path='/spots/current'>
          <UserSpots/>
          </Route>
          <Route path = '/spots/:spotId/edit'>
            <EditSpotWrapper/>
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot/>
          </Route>
          <Route path='/spots/new'>
            <CreateSpot/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
