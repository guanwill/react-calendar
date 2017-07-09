import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //calling browserrouter as Router.
import Appointments from './Appointments';
import Appointment from './Appointment';
import {AppHeader} from './AppHeader';
import AppointmentForm from './AppointmentForm';

export default (props) => {
  // creating a router component that defines all routes
  // routeprops below is just a made up name to represent props being passed through
  // putting 'exact' for root means the path have to be just '/'. without it, it will return all the path that contains the '/'
  return (
    <Router>
      <div>
        <Route path="/" component={AppHeader} />
        <Route exact path="/" component={Appointments} />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route path="/appointments/:id/edit" component={AppointmentForm} />
      </div>
    </Router>
  )
}
