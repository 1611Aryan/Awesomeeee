import React from "react";
import Dashboard from "./Components/Dashboard";

import Home from "./Components/Home";
import { useAccess } from "./Providers/AccessProvider";

const App: React.FC = () => {
  const { access } = useAccess();

  return !access ? <Home /> : <Dashboard />;
};

export default App;
