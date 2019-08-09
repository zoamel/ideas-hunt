import { action, observable } from 'mobx'

import { NotificationType } from 'interfaces/app'
import { RootStore } from './rootStore'

const DEFAULT_NOTIFICATION_TYPE = 'info'

export class AppStore {
  @observable notificationMessage: string | null = null
  @observable showNotification = false
  @observable notificationType: NotificationType = DEFAULT_NOTIFICATION_TYPE

  constructor(private rootStore: RootStore) {}

  @action.bound
  displayNotification(message: string, type: NotificationType) {
    this.notificationMessage = message
    this.showNotification = true
    this.notificationType = type
  }

  @action.bound
  closeNotification() {
    this.notificationMessage = null
    this.showNotification = false
    this.notificationType = DEFAULT_NOTIFICATION_TYPE
  }
}
