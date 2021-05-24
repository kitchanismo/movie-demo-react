import { Typography, Box, Button } from '@material-ui/core'
import { GlobalContext } from 'providers/GlobalProvider'
import { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getOne } from 'services/movieService'
import { Movie } from 'types/movie'
import Rating from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIconSelected from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import { MovieContext } from 'providers/MovieProvider'

export interface MovieDetailsProps {}

const MovieDetails: React.SFC<MovieDetailsProps> = () => {
  const params = useParams<{ id: string }>()
  const history = useHistory()
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [movieState, movieDispatch] = useContext(MovieContext)!
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'MOVIE DETAILS' })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getOne(+params.id).then((movie: Movie) => {
      setMovie(movie)
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    })
  }, [])

  if (!movie) return null

  return (
    <Box>
      <img
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
        width='100%'
        src={
          movie?.poster_path
            ? 'https://image.tmdb.org/t/p/w500' + movie?.backdrop_path
            : ''
        }
      />

      <Box mx='5px' display='flex' flexDirection='column'>
        <Typography variant='h6'>{movie?.title}</Typography>
        <Typography variant='caption'>"{movie?.tagline}"</Typography>
        <Typography variant='caption' color='textSecondary'>
          {movie?.release_date} •
          {movie?.genres?.map((genre) => ' ' + genre.name + ', ')}
        </Typography>
      </Box>
      <Box mx='5px' display='flex'>
        <Rating
          size='small'
          name='read-only'
          value={(movie?.vote_average || 0) / 2}
          readOnly
          precision={0.5}
        />
        <Typography
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='caption'
          color='textSecondary'
        >
          ({movie?.vote_count})
        </Typography>

        <Typography
          style={{ marginLeft: 5 }}
          variant='caption'
          color='textSecondary'
        >
          {'• ' + movie?.runtime + ' mins'}
        </Typography>
      </Box>
      <Box mx='5px' my='10px'>
        <Typography variant='caption'>{movie?.overview}</Typography>
      </Box>
      <Button variant='contained' color='primary' fullWidth>
        Watch Trailer
      </Button>
      <Button
        style={{ marginTop: 10 }}
        variant='contained'
        color='default'
        fullWidth
        onClick={() => history.goBack()}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default MovieDetails
