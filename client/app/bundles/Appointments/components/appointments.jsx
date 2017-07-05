import React from 'react';
import AppointmentForm from './AppointmentForm';
import {AppointmentsList} from './AppointmentsList'; //braces because its a name import. an es6 thing
import update from 'immutability-helper';
import {FormErrors} from './FormErrors'
import moment from 'moment'

export default class Appointments extends React.Component{

  constructor(props, _railsContext){ //puting rails context here gives you helpful rails helper methods
      super(props) //calls the constructor of the parent class
      console.log(props)
      this.state = {
        appointments: this.props.appointments,
        // title: '',
        // appt_time: '',
        title: {value: '', valid: false},
        appt_time: {value: '', valid: false},
        formErrors: {},
        formValid: false
      }
  }

  // getinitialstate is es5, replaced by constructor in es6
  // getInitialState () {
  //   return {
  //     appointments: this.props.appointments,
  //     title: 'Team standup meeting',
  //     appt_time: '25 January 2016 9am'
  //   }
  // }

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

    // let fieldErrors = [];
    // switch (fieldName) {
    //   case 'title':
    //     fieldValid = this.state.title.value.trim().length > 2
    //     if(!fieldValid){
    //       fieldErrors=[' should be at least 3 characters long'];
    //     }
    //     break;
    //   case 'appt_time':
    //     fieldValid = moment(this.state.appt_time.value).isValid() && moment(this.state.appt_time.value).isAfter();
    //     if(!fieldValid){
    //       fieldErrors=[' should not be in the past'];
    //     }
    //   default:
    //     break;
    // }
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
