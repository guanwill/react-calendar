import React from 'react';
import AppointmentForm from './AppointmentForm';
import {AppointmentsList} from './AppointmentsList'; //braces because its a name import. an es6 thing
import update from 'immutability-helper';

export default class Appointments extends React.Component{

  static defaultProps = {
    appointments: []
  }

  constructor(props, _railsContext){ //puting rails context here gives you helpful rails helper methods
      super(props) //calls the constructor of the parent class
      // console.log(props)
      this.state = {
        appointments: this.props.appointments,
        // title: '',
        // appt_time: '',
        // title: {value: '', valid: false},
        // appt_time: {value: new Date(), valid: false},
        // formErrors: {},
        // formValid: false
      }
  }

  componentDidMount () {
    if(this.props.match){
      $.ajax({
        type: "GET",
        url: "/appointments",
        datatype: "JSON"
      }).done((data) => {
        console.log('data')
        console.log(data)
        this.setState({appointments: data});
      })
    }
  }

  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  render() {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
