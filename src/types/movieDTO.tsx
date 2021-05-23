import { Movie } from './movie'

export type MovieDTO = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
