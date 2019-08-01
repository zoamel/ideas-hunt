import { createContext } from 'react'

import { AuthStore } from './authStore'

export class RootStore {
  auth = new AuthStore(this)
}

const rootStore = new RootStore()

export default createContext(rootStore)
