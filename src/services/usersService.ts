import { LoginPayload, SignupPayload } from 'interfaces/user'
import httpClient from 'utils/httpClient'

export const UsersService = {
  login(credentials: LoginPayload) {
    return httpClient.post('/login', {
      email: credentials.email,
      password: credentials.password,
    })
  },
  signup(credentials: SignupPayload) {
    return httpClient.post('/signup', {
      email: credentials.email,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
      username: credentials.username,
    })
  },
  getUserData() {
    return httpClient.get('/user')
  },
}
