import { LoginPayload } from 'interfaces/user'
import httpClient from 'utils/httpClient'

export const UsersService = {
  login(credentials: LoginPayload) {
    return httpClient.post('/login', {
      email: credentials.email,
      password: credentials.password,
    })
  },
}
