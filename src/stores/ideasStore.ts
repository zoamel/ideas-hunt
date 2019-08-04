import { computed, flow, observable, action } from 'mobx'

import { Idea, IdeaPayload } from 'interfaces/ideas'
import { IdeasService } from 'services/ideasService'
import { history } from 'utils/history'
import * as ROUTES from 'constants/routes'
import { RootStore } from './rootStore'

export class IdeasStore {
  @observable ideas: Idea[] = []
  @observable idea: Idea | undefined = undefined
  @observable state: string = 'pending'
  @observable error: string | undefined = undefined

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
  get hasError() {
    return this.state === 'error'
  }

  @action.bound
  clearSelectedIdea() {
    this.idea = undefined
  }

  getOwnIdeas = flow(function*(this: IdeasStore) {
    this.state = 'pending'

    try {
      const { data } = yield IdeasService.getOwnIdeas()

      this.ideas = data
      this.error = undefined
      this.state = 'done'
    } catch ({ error }) {
      this.error = error
      this.state = 'error'
    }
  })

  addIdea = flow(function*(this: IdeasStore, idea: IdeaPayload) {
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

  getIdea = flow(function*(this: IdeasStore, ideaId: string) {
    this.state = 'pending'

    try {
      const { data } = yield IdeasService.getIdea(ideaId)

      this.idea = data
      this.error = undefined
      this.state = 'done'
    } catch ({ error }) {
      this.error = error
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

      this.error = undefined
      this.state = 'done'
    } catch (error) {
      this.error = error
      this.state = 'error'
    }
  })

  deleteIdea = flow(function*(this: IdeasStore) {
    this.state = 'saving'

    try {
      yield IdeasService.deleteIdea(this.idea!.ideaId)

      this.idea = undefined
      this.error = undefined
      this.state = 'done'

      history.push(ROUTES.HOME)
    } catch (error) {
      this.error = error
      this.state = 'error'
    }
  })

  voteIdea = flow(function*(this: IdeasStore) {
    this.state = 'saving'

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
      this.error = error
      this.state = 'error'
    }
  })
}
