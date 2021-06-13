import React, { lazy, Suspense } from "react"
import { useEffect } from "react"
import { useAccess } from "./Providers/AccessProvider"

const Dashboard = lazy(() => import("./Components/Dashboard"))
const Home = lazy(() => import("./Components/Home"))

const App: React.FC = () => {
  const { access } = useAccess()

  useEffect(() => {
    window.addEventListener("keypress", e => {
      if (e.key === "s") {
        document.querySelector("html")?.setAttribute("theme", "small")
      }
      if (e.key === "m") {
        document.querySelector("html")?.setAttribute("theme", "medium")
      }
      if (e.key === "l") {
        document.querySelector("html")?.setAttribute("theme", "large")
      }
    })

    return window.removeEventListener("keypress", () => {})
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!access?.loggedIn ? <Home /> : <Dashboard />}
    </Suspense>
  )
}

export default App
