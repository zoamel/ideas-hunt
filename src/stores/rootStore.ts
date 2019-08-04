import { createContext } from 'react'

import { AuthStore } from './authStore'
import { UserStore } from './userStore'
import { IdeasStore } from './ideasStore'

export class RootStore {
  auth = new AuthStore(this)
  user = new UserStore(this)
  ideas = new IdeasStore(this)
}

export const rootStore = new RootStore()

export default createContext(rootStore)
