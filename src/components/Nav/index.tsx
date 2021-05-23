import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Badge from '@material-ui/core/Badge'
import { MovieContext } from 'providers/MovieProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const [movieState] = useContext(MovieContext)!
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Movie Demo
          </Typography>
          <Badge badgeContent={movieState?.favorites.length} color='secondary'>
            <FavoriteIcon style={{ color: 'white' }} />
          </Badge>
        </Toolbar>
      </AppBar>
    </div>
  )
}
