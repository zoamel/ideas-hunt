import httpClient from 'utils/httpClient'
import { IdeaPayload } from 'interfaces/ideas'

export const IdeasService = {
  getOwnIdeas() {
    return httpClient.get('/own-ideas')
  },
  addIdea(data: IdeaPayload) {
    return httpClient.post('/idea', data)
  },
  getIdea(ideaId: string) {
    return httpClient.get(`/idea/${ideaId}`)
  },
  updateIdea(ideaId: string, data: IdeaPayload) {
    return httpClient.post(`/idea/${ideaId}`, data)
  },
  deleteIdea(ideaId: string) {
    return httpClient.delete(`/idea/${ideaId}`)
  },
  voteIdea(ideaId: string) {
    return httpClient.post(`/idea/${ideaId}/vote`)
  },
}
