import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from '../utils/validations';
import {FormErrors} from './FormErrors';
import update from 'immutability-helper';


export default class AppointmentForm extends React.Component{

  constructor(props, _railsContext){ //puting rails context here gives you helpful rails helper methods
      super(props) //calls the constructor of the parent class
      this.state = {
        title: {value: '', valid: false},
        appt_time: {value: '', valid: false},
        formErrors: {},
        formValid: false
      }
  }

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) },
      (s) => { return(validations.checkMaxLength(s, 10)) }
    ],
    appt_time: [
      (t) =>  { return(validations.timeShouldBeInTheFuture(t)) }
    ]
  }

  // example of using ref on an input. eg, we make use of titleinput ref to make field on focus
  focus = () => {
    this.titleInput.focus();
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

  handleFormSubmit = (e) => {
    e.preventDefault();

    const appointment = {title: this.state.title.value, appt_time: this.state.appt_time.value};
    $.post('/appointments',
            {appointment: appointment}) //replacing the below function with arrow function
          .done( (data) => { //function(data) {
            this.props.handleNewAppointment(data);
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

  handleChange = (e) => {
    const fieldName = this.titleInput.name;
    const fieldValue = this.titleInput.value;
    this.handleUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.handleUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
  }

  render () {
    const inputProps = {
      name: 'appt_time'
    };

    return (
      <div>
        <h2>Make a new appointment</h2>
        <FormErrors formErrors={this.state.formErrors} />

        <form onSubmit={this.handleFormSubmit}>
          <input name='title' placeholder='Appointment Title'
            ref={(input) => {this.titleInput = input}}
            value={this.state.title.value}
            onChange={this.handleChange} />

          <input type="button" value="Focus on text input" onClick={this.focus}/>

          <Datetime input={false} open={true} inputProps={inputProps}
            value={moment(this.state.appt_time.value)}
            onChange={this.setApptTime} />

          <input type='submit' value='Make Appointment' className='submit-button' disabled={!this.state.formValid} />
        </form>
      </div>
    )
  }
};
