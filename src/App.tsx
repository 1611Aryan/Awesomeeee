import React, { Suspense, useEffect } from "react"

import { useAccess } from "./Providers/AccessProvider"
import Petal from "./Components/Loaders/Petal/Petal"
import { useRoutes } from "react-router-dom"
import Routes from "Routes"

const App: React.FC = () => {
  const { access } = useAccess()

  const routing = useRoutes(Routes(access))

  useEffect(() => {}, [])

  return <Suspense fallback={<Petal />}>{routing}</Suspense>
}

export default App
