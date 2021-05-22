import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Container from '@material-ui/core/Container'
import Home from 'components/pages/home'

const Layout = () => {
  const styles = useStyles()

  return (
    <Container maxWidth='xs' className={styles.container}>
      <Switch>
        <Route path='/app' component={Home}></Route>
        <Redirect from='/' exact to='/app' />
        <Redirect to='/not-found' />
      </Switch>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    paddingBottom: 110,
    paddingTop: 80,
    height: '100%',
  },
}))

export default Layout
