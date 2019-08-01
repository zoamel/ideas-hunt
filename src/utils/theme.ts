import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import blue from '@material-ui/core/colors/blue'
import { red } from '@material-ui/core/colors'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: blue,
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default responsiveFontSizes(theme)
