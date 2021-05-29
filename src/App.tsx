import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

import Home from "./Components/Home";
import SignUp from "./Components/SignUp";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default App;
