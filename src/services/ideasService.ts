import httpClient from 'utils/httpClient'
import { NewIdeaPayload } from 'interfaces/ideas'

export const IdeasService = {
  getOwnIdeas() {
    return httpClient.get('/own-ideas')
  },
  addIdea(idea: NewIdeaPayload) {
    return httpClient.post('/idea', idea)
  },
}
