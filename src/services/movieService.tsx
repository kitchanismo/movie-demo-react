import http from 'utils/http'
const API_KEY = process.env.API_KEY

export const search = (query: string, page: number) => {
  return http
    .get(`search/movie?query=${query}&page=${page}&=api_key=${API_KEY}`)
    .then((res) => res.data)
}

export const getOne = (id: number) => {
  return http.get(`movie/${id}?api_key=${API_KEY}`).then((res) => res.data)
}

export const getPopular = (page: number) => {
  return http
    .get(`movie/popular?page=${page}&api_key=${API_KEY}`)
    .then((res) => res.data)
}
