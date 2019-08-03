import React, { useContext } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Router, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'

import * as ROUTES from 'constants/routes'
import { history } from 'utils/history'
import rootStore from 'stores/rootStore'
import Header from 'components/layout/Header'
import PrivateRoute from 'components/ui/PrivateRoute'

// Routes
import Home from 'screens/home/Home'
import Login from 'screens/Login'

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(3, 0),
    },
  }),
)

// Component
const App: React.FC = observer(() => {
  const classes = useStyles()
  const { auth: authStore } = useContext(rootStore)

  return (
    <Router history={history}>
      <Header isLoggedIn={authStore.isLoggedIn} onLogout={authStore.logout} />

      <main className={classes.mainContainer}>
        <Container>
          <Switch>
            <PrivateRoute path={ROUTES.HOME} exact component={Home} />
            <Route path={ROUTES.SIGN_IN} exact component={Login} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
})

export default App
