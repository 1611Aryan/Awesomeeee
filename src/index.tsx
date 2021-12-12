import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { AccessProvider } from "./Providers/AccessProvider"

import { SelectedContactProvider } from "./Providers/SelectedContactProvider"
import { SocketProvider } from "./Providers/SocketProvider"

import { Provider as ReduxProvider } from "react-redux"

import { WidthProvider } from "Providers/WidthProvider"
import store from "Redux/Store"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <WidthProvider>
      <AccessProvider>
        <ReduxProvider store={store}>
          <SocketProvider>
            <SelectedContactProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SelectedContactProvider>
          </SocketProvider>
        </ReduxProvider>
      </AccessProvider>
    </WidthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
