import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'pages/home'

const Routes = () => {
  return (
    <Switch>
      <Route path='/app' component={Home}></Route>
      <Redirect from='/' exact to='/app' />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default Routes
