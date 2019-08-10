export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface User {
  email: string
  username: string
  userId: string
}
