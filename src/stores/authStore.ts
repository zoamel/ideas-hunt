import { observable, action, computed, reaction, flow } from 'mobx'
import isString from 'lodash/isString'
import get from 'lodash/get'

import { history } from 'utils/history'
import * as ROUTES from 'constants/routes'
import { AUTH_TOKEN_NAME } from 'constants/config'
import { LoginPayload } from 'interfaces/user'
import { UsersService } from 'services/usersService'
import { RootStore } from './rootStore'

export class AuthStore {
  @observable token = window.localStorage.getItem(AUTH_TOKEN_NAME)
  @observable state: string | null = null
  @observable error: string | null = null

  constructor(private rootStore: RootStore) {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem(AUTH_TOKEN_NAME, token)
        } else {
          window.localStorage.removeItem(AUTH_TOKEN_NAME)
        }
      },
    )
  }

  @computed
  get isLoggedIn() {
    return Boolean(this.token)
  }

  @computed
  get isPending() {
    return this.state === 'pending'
  }

  @computed
  get hasError() {
    return this.state === 'error'
  }

  login = flow(function*(this: AuthStore, credentials: LoginPayload) {
    this.state = 'pending'

    try {
      const { data } = yield UsersService.login(credentials)
      const { token } = data

      this.token = token
      this.error = null
      this.state = 'done'

      history.push(ROUTES.HOME)
    } catch (error) {
      let errorMessage: string

      if (isString(error)) {
        errorMessage = error
      } else {
        errorMessage = get(error, 'data.general', 'Something went wrong')
      }

      this.state = 'error'
      this.error = errorMessage
    }
  })

  @action.bound
  logout() {
    this.token = null
    history.push(ROUTES.SIGN_IN)
  }
}
