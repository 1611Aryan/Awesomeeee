import React from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"

import { SelectedContactProvider } from "./Providers/SelectedContactProvider"
import { SocketProvider } from "./Providers/SocketProvider"

import { Provider as ReduxProvider } from "react-redux"

import { LoginPullTabProvider } from "Providers/LoginPullTabProvider"
import { ShowContactsProvider } from "Providers/ShowContactsProvider"
import store from "Redux/Store"

const root=createRoot(document.getElementById("root")!)

root.render(
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
  </React.StrictMode>
)
