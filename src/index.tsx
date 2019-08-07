import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import theme from './utils/theme'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
