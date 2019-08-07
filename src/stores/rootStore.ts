import { createContext } from 'react'
import { configure } from 'mobx'

import { AppStore } from './appStore'
import { AuthStore } from './authStore'
import { UserStore } from './userStore'
import { IdeasStore } from './ideasStore'

// Mobx config
configure({ enforceActions: 'observed' })

export class RootStore {
  app = new AppStore(this)
  auth = new AuthStore(this)
  user = new UserStore(this)
  ideas = new IdeasStore(this)
}

export const rootStore = new RootStore()

export default createContext(rootStore)
