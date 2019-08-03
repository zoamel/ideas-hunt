import { observable, action, computed, reaction, runInAction } from 'mobx'

import { Idea } from 'interfaces/ideas'
import { IdeasService } from 'services/ideasService'
import { RootStore } from './rootStore'

export class IdeasStore {
  @observable ideas: Idea[] = []
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

  @action
  getOwnIdeas() {
    this.state = 'pending'

    IdeasService.getOwnIdeas().then(
      ({ data }) => {
        const ideas: Idea[] = data

        runInAction(() => {
          this.ideas = ideas
          this.state = 'done'
        })
      },
      error => {
        runInAction(() => {
          this.error = error
          this.state = 'error'
        })
      },
    )
  }
}
