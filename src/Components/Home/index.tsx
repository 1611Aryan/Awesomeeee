import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router"
import Petal from "Components/Loaders/Petal/Petal"

const Login = lazy(() => import("./Login"))
const SignUp = lazy(() => import("./SignUp"))
const ForgotPassword = lazy(() => import("./ForgotPassword"))

const Home: React.FC = () => {
  return (
    <Suspense fallback={<Petal />}>
      <Switch>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Home
