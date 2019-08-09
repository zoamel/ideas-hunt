import { computed, flow, observable, action } from 'mobx'

import { Idea, IdeaPayload } from 'interfaces/ideas'
import { IdeasService } from 'services/ideasService'
import { history } from 'utils/history'
import * as ROUTES from 'constants/routes'
import { RootStore } from './rootStore'

export class IdeasStore {
  @observable ideas: Idea[] = []
  @observable idea: Idea | null = null
  @observable state: string = 'pending'
  @observable generalError: string | null = null
  @observable votingError: string | null = null
  @observable editError: string | null = null

  constructor(private rootStore: RootStore) {}

  @computed
  get isPending() {
    return this.state === 'pending'
  }

  @computed
  get isSaving() {
    return this.state === 'saving'
  }

  @computed
  get isVoting() {
    return this.state === 'voting'
  }

  @computed
  get hasGeneralError() {
    return this.state === 'generalError'
  }

  @computed
  get hasVotingError() {
    return this.state === 'votingError'
  }

  @computed
  get hasEditError() {
    return this.state === 'editError'
  }

  @action.bound
  clearSelectedIdea() {
    this.idea = null
  }

  getOwnIdeas = flow(function*(this: IdeasStore) {
    this.state = 'pending'

    try {
      const { data } = yield IdeasService.getOwnIdeas()

      this.ideas = data
      this.generalError = null
      this.state = 'done'
    } catch ({ error }) {
      this.generalError = error
      this.state = 'error'
    }
  })

  addIdea = flow(function*(this: IdeasStore, idea: IdeaPayload) {
    this.state = 'pending'

    try {
      yield IdeasService.addIdea(idea)

      this.editError = null
      this.state = 'done'

      history.push(ROUTES.HOME)
    } catch (error) {
      this.state = 'editError'
      this.editError = error
    }
  })

  getIdea = flow(function*(this: IdeasStore, ideaId: string) {
    this.state = 'pending'

    try {
      const { data } = yield IdeasService.getIdea(ideaId)

      this.idea = data
      this.generalError = null
      this.state = 'done'
    } catch ({ error }) {
      this.generalError = error
      this.state = 'error'
    }
  })

  updateIdea = flow(function*(this: IdeasStore, idea: IdeaPayload) {
    this.state = 'saving'

    try {
      const ideaPayload: IdeaPayload = {
        title: idea.title,
        tagline: idea.tagline,
        description: idea.description,
        url: idea.url,
      }

      yield IdeasService.updateIdea(this.idea!.ideaId, ideaPayload)

      this.idea = {
        ...this.idea,
        ...ideaPayload,
      } as Idea

      this.editError = null
      this.state = 'done'
    } catch (error) {
      this.editError = error
      this.state = 'editError'
    }
  })

  deleteIdea = flow(function*(this: IdeasStore) {
    this.state = 'saving'

    try {
      yield IdeasService.deleteIdea(this.idea!.ideaId)

      this.idea = null
      this.editError = null
      this.state = 'done'

      history.push(ROUTES.HOME)
    } catch (error) {
      this.editError = error
      this.state = 'editError'
    }
  })

  voteIdea = flow(function*(this: IdeasStore) {
    this.state = 'voting'

    try {
      if (this.idea) {
        const { data } = yield IdeasService.voteIdea(this.idea.ideaId)

        this.idea = {
          ...this.idea,
          ...data,
        }

        this.state = 'done'
      }
    } catch ({ error }) {
      console.error(error)
      this.rootStore.app.displayNotification(error, 'error')
      this.state = 'votingError'
    }
  })
}
