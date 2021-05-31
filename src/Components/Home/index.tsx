import { Route, Switch } from "react-router";
import Login from "./Login";
import SignUp from "./SignUp";

const Home: React.FC = () => {
  return (
    <Switch>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
};

export default Home;
