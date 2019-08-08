import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

import logoImage from 'assets/logo.png'

//#region Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoImage: {
      width: 150,
    },
    spacer: {
      flex: 1,
    },
    loginButtonContainer: {
      marginRight: theme.spacing(2),
    },
  }),
)
//#endregion

//#region Types
type Props = RouteComponentProps & {
  isLoggedIn: boolean
  onLogout: () => void
}
//#endregion

const Header: React.FC<Props> = observer(({ isLoggedIn, onLogout }) => {
  const classes = useStyles()

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Link to="/">
          <img src={logoImage} className={classes.logoImage} alt="Ideas Hunt" />
        </Link>

        <div className={classes.spacer} />

        {isLoggedIn && (
          <Button onClick={onLogout} variant="outlined" color="primary">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
})

export default withRouter(Header)
