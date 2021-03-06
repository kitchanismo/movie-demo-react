import { Genre } from './genre'
import { Language } from './language'

export type Movie = {
  id: number
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  isFavorite?: boolean
  budget?: number
  genres?: Genre[]
  homepage?: string
  runtime?: number
  status?: string
  tagline?: string
  spoken_languages?: Language[]
}
