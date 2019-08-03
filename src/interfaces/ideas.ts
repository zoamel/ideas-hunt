export interface Idea {
  ideaId: string
  title: string
  tagline: string
  description: string
  url: string
  voteCount: number
  username: string
  createdAt: string
  updatedAt: string
}

export interface NewIdeaPayload {
  title: string
  tagline: string
  description: string
  url: string
}
