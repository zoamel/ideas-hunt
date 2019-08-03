import httpClient from 'utils/httpClient'

export const IdeasService = {
  getOwnIdeas() {
    return httpClient.get('/own-ideas')
  },
}
