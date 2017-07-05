import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //calling browserrouter as Router.
import Appointments from './Appointments';
import Appointment from './Appointment';

export default (props) => {
  // creating a router component that defines all routes
  // routeprops below is just a made up name to represent props being passed through
  // putting 'exact' for root means the path have to be just '/'. without it, it will return all the path that contains the '/'
  return (
    <Router>
      <div>
        <Route exact path="/" render={routeProps => (
          <Appointments {...routeProps} appointments={props.appointments} />
        )} />

        <Route path ="/appointments/:id" component={Appointment} />
      </div>
    </Router>
  )
}
