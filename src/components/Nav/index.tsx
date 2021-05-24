import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Badge from '@material-ui/core/Badge'
import LinearProgress from '@material-ui/core/LinearProgress'

import { GlobalContext } from 'providers/GlobalProvider'
import { getPopular } from 'services/movieService'
import { MovieContext } from 'providers/MovieProvider'
import { MovieDTO } from 'types/movieDTO'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const [globalState, globalDispatch] = useContext(GlobalContext)!
  const [_, movieDispatch] = useContext(MovieContext)!

  const classes = useStyles()

  const handleOnLoadPopularMovies = () => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getPopular(1).then((data: MovieDTO) => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      movieDispatch({
        type: 'ON_SET_MOVIES',
        payload: data,
      })
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            onClick={handleOnLoadPopularMovies}
            variant='h6'
            className={classes.title}
          >
            {globalState?.title}
          </Typography>
        </Toolbar>
        {globalState?.isLoading && <LinearProgress color='secondary' />}
      </AppBar>
    </div>
  )
}
