import * as React from 'react'
import { hashHistory, IndexRoute, Router, Route, Link } from 'react-router';
import Provider from './smartComponent/root';
import TimeLine from './smartComponent/timeLine';
import Template from './smartComponent/templatePage';
export const app = (store) => {
  return (
      <Router history={hashHistory}>
        <Route path="/" component={Provider(store)}>
          <IndexRoute component={TimeLine}/>
          <Route path="template" component={Template}/>
        </Route>
      </Router>
  )
}

          // 
          // <Route path="movie/:id" component={MovieDetail}/>
          // <Route path="cast/:id" component={CastDetail}/>
          // <Route path="searc" component={MovieSearch}/>
          // <Route path="accoun" component={Account}/>