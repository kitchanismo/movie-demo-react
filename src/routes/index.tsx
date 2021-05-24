import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'pages/home'
import MovieDetails from 'pages/movie'

const Routes = () => {
  return (
    <Switch>
      <Route path='/app' component={Home}></Route>
      <Route path='/movie/:id' component={MovieDetails}></Route>
      <Redirect from='/' exact to='/app' />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default Routes
