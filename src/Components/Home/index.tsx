import { Suspense } from "react"
import { Outlet } from "react-router"
import Petal from "Components/Loaders/Petal/Petal"

const Home: React.FC = () => {
  return (
    <Suspense fallback={<Petal />}>
      <Outlet />
    </Suspense>
  )
}

export default Home
