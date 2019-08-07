import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

import { rootStore } from 'stores/rootStore'
import { AUTH_TOKEN_NAME } from 'constants/config'

function onRequest(config: AxiosRequestConfig) {
  const authToken = localStorage.getItem(AUTH_TOKEN_NAME)

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
}

function onResponseSuccess(response: AxiosResponse) {
  return response
}

function onResponseError(error: AxiosError) {
  // This reject is needed in order to try/catch to work properly
  if (error.response) {
    if (error.response.status === 403) {
      rootStore.auth.logout()
    } else {
      return Promise.reject(error.response.data)
    }
  }

  if (error.message === 'Network Error') {
    rootStore.app.displayGlobalError('Network Error')
  } else {
    return Promise.reject(error.message)
  }
}

const httpClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    method: 'GET',
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(onRequest)
  instance.interceptors.response.use(onResponseSuccess, onResponseError)

  return instance
}

export default httpClient()
