import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"

import { SelectedContactProvider } from "./Providers/SelectedContactProvider"
import { SocketProvider } from "./Providers/SocketProvider"

import { Provider as ReduxProvider } from "react-redux"

import store from "Redux/Store"
import { LoginPullTabProvider } from "Providers/LoginPullTabProvider"
import { ShowContactsProvider } from "Providers/ShowContactsProvider"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ReduxProvider store={store}>
      <LoginPullTabProvider>
        <SocketProvider>
          <ShowContactsProvider>
            <SelectedContactProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SelectedContactProvider>
          </ShowContactsProvider>
        </SocketProvider>
      </LoginPullTabProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
