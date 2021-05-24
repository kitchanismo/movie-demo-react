import { Box, Typography } from '@material-ui/core'
import { Movie } from 'types/movie'
import Rating from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteIconSelected from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { toElipse } from 'utils/helper'
import Fade from 'react-reveal/Fade'

export interface PosterProps {
  movie: Movie
  onToggleFavorite: (id: number) => void
}

const Poster: React.SFC<PosterProps> = ({ movie, onToggleFavorite }) => {
  const history = useHistory()
  return (
    <Fade>
      <Box
        width={150}
        mx='5px'
        mb='10px'
        style={{
          WebkitBoxShadow: '6px 6px 6px -6px black',
          MozBoxShadow: '6px 6px 6px -6px black',
          boxShadow: '6px 6px 6px -6px black',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,

          position: 'relative',
        }}
      >
        <img
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          width='150'
          src={
            movie?.poster_path
              ? 'https://image.tmdb.org/t/p/w200' + movie?.poster_path
              : ''
          }
          onClick={() => history.push('/movie/' + movie.id)}
        />
        <IconButton
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 10,
          }}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie?.isFavorite ? (
            <FavoriteIconSelected color='secondary' />
          ) : (
            <FavoriteIcon color='secondary' />
          )}
        </IconButton>
        <Box px='7px' py='3px' display='flex' flexDirection='column'>
          <>
            <Typography variant='subtitle2'>
              {toElipse(movie?.title)}
            </Typography>
            <Box
              my='3px'
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
            >
              <Rating
                size='small'
                name='read-only'
                value={movie?.vote_average / 2}
                readOnly
                precision={0.5}
              />
              <Typography variant='caption' color='textSecondary'>
                ({movie?.vote_count})
              </Typography>
            </Box>
          </>
        </Box>
      </Box>
    </Fade>
  )
}

export default Poster
