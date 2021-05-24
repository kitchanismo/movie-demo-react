import React, { useContext, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from 'routes'
import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { GlobalContext } from 'providers/GlobalProvider'
import Nav from 'components/Nav'
import MovieProvider from 'providers/MovieProvider'

const App: React.FC = (props) => {
  const [state, dispatch] = useContext(GlobalContext)!
  const styles = useStyles()

  return (
    <>
      <MovieProvider>
        <Nav />
        <Container maxWidth='md' className={styles.container}>
          <CssBaseline />
          <Routes />
        </Container>
      </MovieProvider>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: 20,
  },
}))

export default App
