import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { AccessProvider } from "./Providers/AccessProvider"
import { UserProvider } from "./Providers/UserProvider"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AccessProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
