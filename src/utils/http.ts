import axios, { AxiosError } from 'axios'
import { apiUrl } from 'configs/index.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl

  const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODIyMjI4YzE4ZmQ2Y2RmMTIzZWQyNTM0NTdkOWI2ZCIsInN1YiI6IjYwYThiYzI1YWY4NWRlMDAyOWQ1N2YwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pqfZLjA8HlJcIYKDOzUJz8ZDOy3iBLVLoBWTVskyF60"

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.message === 'Network Error' ||
      error.message === 'Internal Server Error'
    ) {
      throw Error(error.message)
    }

    throw error
  }
)


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios.create(),
}
