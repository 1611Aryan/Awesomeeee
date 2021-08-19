import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import GlobalStyle from "./GlobalStyle"
import { AccessProvider } from "./Providers/AccessProvider"

import { SelectedContactProvider } from "./Providers/SelectedContactProvider"
import { SocketProvider } from "./Providers/SocketProvider"

import { createStore } from "redux"
import { Provider as ReduxProvider } from "react-redux"
import reducers from "./Reducers"
import { WidthProvider } from "Providers/WidthProvider"

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */

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
