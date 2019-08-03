import { computed, flow, observable } from 'mobx'

import { Idea, NewIdeaPayload } from 'interfaces/ideas'
import { IdeasService } from 'services/ideasService'
import { history } from 'utils/history'
import * as ROUTES from 'constants/routes'
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

  getOwnIdeas = flow(function*(this: IdeasStore) {
    this.state = 'pending'

    try {
      const { data } = yield IdeasService.getOwnIdeas()

      this.ideas = data
      this.error = undefined
      this.state = 'done'
    } catch (error) {
      this.error = error
      this.state = 'error'
    }
  })

  addIdea = flow(function*(this: IdeasStore, idea: NewIdeaPayload) {
    this.state = 'pending'

    try {
      yield IdeasService.addIdea(idea)

      this.error = undefined
      this.state = 'done'

      history.push(ROUTES.HOME)
    } catch (error) {
      this.state = 'error'
      this.error = error
    }
  })
}
