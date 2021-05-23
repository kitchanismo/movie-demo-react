import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { produce } from 'immer'
import { Movie } from 'types/movie'
import { MovieDTO } from 'types/movieDTO'

export const MovieContext =
  createContext<[state: MovieState, dispatch: Dispatch<MovieAction>] | null>(
    null
  )

interface MovieState {
  data: MovieDTO
  query: string
  favorites: number[]
}

type MovieAction =
  | {
      type: 'ON_SET_MOVIES'
      payload: MovieDTO
    }
  | { type: 'ON_SET_PAGE'; payload: number }
  | { type: 'ON_SET_QUERY'; payload: string }
  | { type: 'ON_SET_FAVORITES'; payload: number[] }
  | { type: 'ON_ADD_FAVORITES'; payload: number }
  | { type: 'ON_REMOVE_FAVORITES'; payload: number }

const reducer = (state: MovieState, action: MovieAction) => {
  switch (action.type) {
    case 'ON_SET_MOVIES':
      state.data.page = action.payload.page
      state.data.total_pages = action.payload.total_pages
      state.data.total_results = action.payload.total_results
      state.data.results = action.payload?.results.map((movie) => ({
        ...movie,
        isFavorite: state?.favorites.includes(movie.id),
      }))
      break
    case 'ON_SET_PAGE':
      state.data.page = action.payload
      break
    case 'ON_SET_QUERY':
      state.query = action.payload
      break
    case 'ON_SET_FAVORITES':
      state.favorites = action.payload

      break
    case 'ON_ADD_FAVORITES':
      state.favorites.push(action.payload)
      state.data.results = state?.data.results.map((movie) => ({
        ...movie,
        isFavorite: state?.favorites.includes(movie.id),
      }))
      break
    case 'ON_REMOVE_FAVORITES':
      state.favorites = state.favorites.filter((fav) => +fav !== action.payload)
      state.data.results = state?.data.results.map((movie) => ({
        ...movie,
        isFavorite: state?.favorites.includes(movie.id),
      }))
      break

    default:
      return state
  }
  return state
}

const MovieProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    favorites: [],
    query: '',
    data: { page: 1, total_pages: 0, total_results: 0, results: [] },
  })

  useEffect(() => {
    const favorites =
      (JSON.parse(localStorage.getItem('favorites') || '[]') as number[]) || []

    dispatch({ type: 'ON_SET_FAVORITES', payload: favorites })
  }, [state.data])

  return (
    <>
      <MovieContext.Provider value={[state, dispatch]}>
        {props.children}
      </MovieContext.Provider>
    </>
  )
}

export default MovieProvider
