import React from 'react';
import AppointmentForm from './AppointmentForm';
import {AppointmentsList} from './AppointmentsList'; //braces because its a name import. an es6 thing
import update from 'immutability-helper';
import {FormErrors} from './FormErrors'
import moment from 'moment'

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
        title: {value: '', valid: false},
        appt_time: {value: new Date(), valid: false},
        formErrors: {},
        formValid: false
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

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName], {value: {$set: fieldValue}})
    this.setState({[fieldName]: newFieldState}, () => {this.validateField(fieldName, fieldValue, validations)} );
  }

  validateField (fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if (e !== ''){
        errors.push(e)
      }
      return(errors)
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName], {valid: {$set: fieldValid}});
    const newFormErrors = update(this.state.formErrors, {$merge: {[fieldName]: fieldErrors}});
    this.setState({[fieldName]: newFieldState, formErrors: newFormErrors}, this.validateForm);
  }

  validateForm () {
    this.setState({formValid: this.state.title.valid && this.state.appt_time.valid });
  }

  handleFormSubmit = () => {
    const appointment = {title: this.state.title.value, appt_time: this.state.appt_time.value};
    $.post('/appointments',
            {appointment: appointment}) //replacing the below function with arrow function
          .done( (data) => { //function(data) {
            this.addNewAppointment(data);
            this.resetFormErrors();
          }) //.bind(this));
          .fail( (response) => {
            console.log(response)
            this.setState({formErrors: response.responseJSON})
          })
  }

  resetFormErrors () {
    this.setState({formErrors: {} })
  }

  addNewAppointment(appointment) {
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
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm title={this.state.title}
          appt_time={this.state.appt_time}
          formValid = {this.state.formValid}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
