import React, { lazy, Suspense } from "react"
import { useAccess } from "./Providers/AccessProvider"

const Dashboard = lazy(() => import("./Components/Dashboard"))
const Home = lazy(() => import("./Components/Home"))

const App: React.FC = () => {
  const { access } = useAccess()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!access?.loggedIn ? <Home /> : <Dashboard />}
    </Suspense>
  )
}

export default App
