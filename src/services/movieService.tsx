import http from 'utils/http'

export const search = (query: string, page: number) => {
  return http
    .get(
      `search/movie?query=${query}&page=${page}&=api_key=e822228c18fd6cdf123ed253457d9b6d`
    )
    .then((res) => res.data)
}
