import { observable, action, computed, reaction, flow, autorun } from 'mobx'
import isString from 'lodash/isString'
import get from 'lodash/get'

import { history } from 'utils/history'
import * as ROUTES from 'constants/routes'
import { AUTH_TOKEN_NAME } from 'constants/config'
import { LoginPayload, User } from 'interfaces/user'
import { UsersService } from 'services/usersService'
import { RootStore } from './rootStore'

export class AuthStore {
  @observable token = window.localStorage.getItem(AUTH_TOKEN_NAME)
  @observable user: User | undefined = undefined
  @observable state: string | undefined = undefined
  @observable error: string | undefined = undefined

  constructor(private rootStore: RootStore) {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem(AUTH_TOKEN_NAME, token)
          this.rootStore.user.getUserData()
        } else {
          window.localStorage.removeItem(AUTH_TOKEN_NAME)
        }
      },
    )

    autorun(
      reaction => {
        if (this.isLoggedIn) {
          this.rootStore.user.getUserData()
        }

        reaction.dispose()
      },
      { delay: 100 },
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
      this.error = undefined
      this.state = 'done'
      history.push(ROUTES.HOME)
    } catch (error) {
      let errorMessage: string

      if (isString(error)) {
        errorMessage = error
      } else {
        errorMessage = get(error, 'data.general', 'Something wen wrong')
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
