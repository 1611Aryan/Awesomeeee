import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router"

const Login = lazy(() => import("./Login"))
const SignUp = lazy(() => import("./SignUp"))

const Home: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Home
