class Appointments extends React.Component{

  constructor(props){
      super(props) //calls the constructor of the parent class
      this.state = {
        appointments: this.props.appointments,
        title: 'Team standup meeting',
        appt_time: '25 January 2016 9am'
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

  handleUserInput(obj) {
    this.setState(obj);
  }

  handleFormSubmit() {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
    $.post('/appointments',
            {appointment: appointment}) //replacing the below function with arrow function
          .done( (data) => { //function(data) {
            this.addNewAppointment(data);
          }) //.bind(this));
  }

  addNewAppointment(appointment) {
    const appointments = React.addons.update(this.state.appointments, { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  render() {
    return (
      <div>
        <AppointmentForm input_title={this.state.title}
          input_appt_time={this.state.appt_time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
