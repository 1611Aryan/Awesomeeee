import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { AccessProvider } from "./Providers/AccessProvider"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AccessProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
