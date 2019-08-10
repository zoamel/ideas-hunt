import React, { useContext } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Router, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'

import * as ROUTES from 'constants/routes'
import { history } from 'utils/history'
import rootStore from 'stores/rootStore'
import Header from 'components/layout/Header'
import PrivateRoute from 'components/common/PrivateRoute'
import GlobalMessage from 'components/ui/globalMessage/GlobalMessage'

// Routes
import Home from 'screens/home/Home'
import Login from 'screens/login/Login'
import Signup from 'screens/signup/Signup'
import AddIdea from 'screens/addIdea/AddIdea'
import ShowIdea from 'screens/showIdea/ShowIdea'
import PublicView from 'screens/publicView/PublicView'
import NotFound from 'screens/notFound/NotFound'

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
  const store = useContext(rootStore)

  const { isLoggedIn, logout } = store.auth
  const {
    showNotification,
    notificationMessage,
    notificationType,
    closeNotification,
  } = store.app

  return (
    <Router history={history}>
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />

      <GlobalMessage
        visible={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={closeNotification}
      />

      <main className={classes.mainContainer}>
        <Container maxWidth="md">
          <Switch>
            <PrivateRoute path={ROUTES.HOME} exact component={Home} />
            <PrivateRoute path={ROUTES.ADD_IDEA} exact component={AddIdea} />
            <PrivateRoute path={ROUTES.SHOW_IDEA} exact component={ShowIdea} />
            <Route path={ROUTES.PUBLIC_VIEW} exact component={PublicView} />
            <Route path={ROUTES.SIGN_IN} exact component={Login} />
            <Route path={ROUTES.SIGN_UP} exact component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
})

export default App
