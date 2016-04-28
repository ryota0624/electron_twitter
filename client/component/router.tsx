import * as React from 'react'
import { IndexRoute, Router, Route, Link } from 'react-router'

export const app = (location, ua) => {
  return (
      <Router history={location}>
        <Route path="/" component={ThemeRoot}>
          <IndexRoute component={MovieTrend}/>
          <Route path="movie/:id" component={MovieDetail}/>
          <Route path="cast/:id" component={CastDetail}/>
          <Route path="search" component={MovieSearch}/>
          <Route path="account" component={Account}/>
        </Route>
      </Router>
  )
}