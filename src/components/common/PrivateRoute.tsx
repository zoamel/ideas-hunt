import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { observer } from 'mobx-react'

import rootStore from 'stores/rootStore'
import * as ROUTES from 'constants/routes'

//#region Types
type Props = RouteProps & {
  component: React.ReactType
}
//#endregion

const PrivateRoute: React.FC<Props> = observer(
  ({ component: Component, ...rest }) => {
    const store = useContext(rootStore)

    const { isLoggedIn } = store.auth

    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: ROUTES.SIGN_IN,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  },
)

export default PrivateRoute
