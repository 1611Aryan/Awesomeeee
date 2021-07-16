import React, { lazy, Suspense } from "react"
import { useAccess } from "./Providers/AccessProvider"
import Petal from "./Components/Loaders/Petal"

const Dashboard = lazy(() => import("./Components/Dashboard"))
const Home = lazy(() => import("./Components/Home"))

const App: React.FC = () => {
  const { access } = useAccess()

  return (
    <Suspense fallback={<Petal />}>
      {!access?.loggedIn ? <Home /> : <Dashboard />}
    </Suspense>
  )
}

export default App
