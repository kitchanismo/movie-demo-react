import Box from '@material-ui/core/Box'
import Poster from 'components/Poster'
import { MovieContext } from 'providers/MovieProvider'
import { useContext } from 'react'
import { Movie } from 'types/movie'

export interface MoviesProps {
  movies: Movie[]
}

const Movies: React.SFC<MoviesProps> = ({ movies }) => {
  const [movieState, movieDispatch] = useContext(MovieContext)!

  const handleToggleFavorite = (id: number) => {
    const index = movieState?.favorites?.findIndex((fav) => +fav === id)

    //remove fav
    if (index >= 0) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...movieState?.favorites.filter((fav) => fav !== id)])
      )
      movieDispatch({ type: 'ON_REMOVE_FAVORITES', payload: id })
      return
    }

    //add fav
    localStorage.setItem(
      'favorites',
      JSON.stringify([...movieState?.favorites, id])
    )
    movieDispatch({ type: 'ON_ADD_FAVORITES', payload: id })
  }
  return (
    <Box
      mt='10px'
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      justifyContent='center'
    >
      {movies.map((movie) => (
        <Poster
          onToggleFavorite={handleToggleFavorite}
          key={movie?.id}
          movie={movie}
        />
      ))}
    </Box>
  )
}

export default Movies
