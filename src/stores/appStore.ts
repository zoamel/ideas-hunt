import { action, observable } from 'mobx'

import { RootStore } from './rootStore'

export class AppStore {
  @observable errorMessage: string | null = null
  @observable showGlobalError = false

  constructor(private rootStore: RootStore) {}

  @action.bound
  displayGlobalError(message: string) {
    this.errorMessage = message
    this.showGlobalError = true
  }

  @action.bound
  closeGlobalError() {
    this.errorMessage = null
    this.showGlobalError = false
  }
}
