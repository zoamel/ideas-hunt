import { createContext } from 'react'

import { AuthStore } from './authStore'
import { IdeasStore } from './ideasStore'

export class RootStore {
  auth = new AuthStore(this)
  ideas = new IdeasStore(this)
}

export const rootStore = new RootStore()

export default createContext(rootStore)
