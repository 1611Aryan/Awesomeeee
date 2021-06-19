import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { AccessProvider } from "./Providers/AccessProvider"
import { SelectedContactProvider } from "./Providers/SelectedContactProvider"
import { SocketProvider } from "./Providers/SocketProvider"
import { UserProvider } from "./Providers/UserProvider"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AccessProvider>
      <UserProvider>
        <SocketProvider>
          <SelectedContactProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SelectedContactProvider>
        </SocketProvider>
      </UserProvider>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
