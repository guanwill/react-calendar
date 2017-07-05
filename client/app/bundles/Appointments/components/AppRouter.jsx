import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //calling browserrouter as Router.
import Appointments from './Appointments';

export default (props) => {
  // creating a router component that defines all routes
  // routeprops below is just a made up name to represent props being passed through
  return (
    <Router>
      <Route path="/" render={routeProps => (
        <Appointments {...routeProps} appointments={props.appointments} />
      )} />
    </Router>
  )
}
