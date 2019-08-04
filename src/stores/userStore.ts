import { observable, computed, flow } from 'mobx'

import { User } from 'interfaces/user'
import { UsersService } from 'services/usersService'
import { RootStore } from './rootStore'

export class UserStore {
  @observable user: User | undefined = undefined
  @observable state: string | undefined = undefined
  @observable error: string | undefined = undefined

  constructor(private rootStore: RootStore) {}

  @computed
  get isPending() {
    return this.state === 'pending'
  }

  @computed
  get hasError() {
    return this.state === 'error'
  }

  getUserData = flow(function*(this: UserStore) {
    try {
      const { data } = yield UsersService.getUserData()
      this.user = data
    } catch ({ error }) {
      console.error(error)
    }
  })
}
