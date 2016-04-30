import * as React from 'react'
import { hashHistory, IndexRoute, Router, Route, Link } from 'react-router';
import Provider from './smartComponent/root';
import TimeLine from './smartComponent/timeLine';
export const app = (store) => {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Provider(store)}>
          <IndexRoute component={TimeLine}/>
        </Route>
      </Router>
  )
}

          // 
          // <Route path="movie/:id" component={MovieDetail}/>
          // <Route path="cast/:id" component={CastDetail}/>
          // <Route path="search" component={MovieSearch}/>
          // <Route path="account" component={Account}/>