import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Movie } from 'types/movie'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles({
  media: {
    height: 450,
  },
})

export interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.SFC<MovieCardProps> = ({ movie }) => {
  const classes = useStyles()

  return (
    <Card style={{ marginBottom: 20 }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            movie?.poster_path
              ? 'https://image.tmdb.org/t/p/w300' + movie.poster_path
              : ''
          }
          title={movie?.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {movie?.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {movie?.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default MovieCard
