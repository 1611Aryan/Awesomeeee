import useTypedSelector from "Hooks/useTypedSelector"
import React, { Suspense, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import Routes from "Routes"
import Petal from "./Components/Loaders/Petal/Petal"

const App: React.FC = () => {
  const { access } = useTypedSelector(state => state)

  const routing = useRoutes(Routes(access))

  useEffect(() => {}, [])

  return <Suspense fallback={<Petal />}>{routing}</Suspense>
}

export default App
