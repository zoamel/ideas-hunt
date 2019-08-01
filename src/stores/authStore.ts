import { observable, action, computed, reaction, runInAction } from 'mobx'
import isString from 'lodash/isString'
import get from 'lodash/get'

import { history } from 'utils/history'
import { AUTH_TOKEN_NAME } from 'constants/config'
import { LoginPayload } from 'interfaces/user'
import { UsersService } from 'services/usersService'
import { RootStore } from './rootStore'

export class AuthStore {
  @observable token = window.localStorage.getItem(AUTH_TOKEN_NAME)
  @observable state: string | undefined = undefined
  @observable error: string | undefined = undefined

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

  @action
  setToken(token: string) {
    this.token = token
  }

  @action
  clearToken() {
    this.token = null
  }

  @action
  login(credentials: LoginPayload) {
    this.state = 'pending'

    UsersService.login(credentials)
      .then(({ data }) => {
        const { token } = data

        runInAction(() => {
          this.setToken(token)
          this.error = undefined
          this.state = 'done'
        })

        history.push('/')
      })
      .catch(error => {
        let errorMessage: string

        if (isString(error)) {
          errorMessage = error
        } else {
          errorMessage = get(error, 'data.general', 'Something wen wrong')
        }

        runInAction(() => {
          this.state = 'error'
          this.error = errorMessage
        })
      })
  }

  @action.bound
  logout() {
    this.clearToken()
  }
}
