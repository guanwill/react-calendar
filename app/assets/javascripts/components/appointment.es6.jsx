// class Appointment extends React.Component {
//   render() {
//     return (
//       <div className='appointment'>
//         <h3>{this.props.appointment.title}</h3>
//         <p>{formatDate(this.props.appointment.appt_time)}</p>
//       </div>
//     )
//   }
// }


// Rendering a stateless functional component , replaces the above code
// const Appointment = (props) => {
//     return (
//       <div className='appointment'>
//         <h3>{props.appointment.title}</h3>
//         <p>{formatDate(props.appointment.appt_time)}</p>
//       </div>
//     )
// }

//Rendering a stateless functional component , by specifying incoming argument as props. the incoming props has appointment property coming through
// const Appointment = ({appointment}) => { //by specifying appointment, you can remove this.appointment in return function
//     return (
//       <div className='appointment'>
//         <h3>{appointment.title}</h3>
//         <p>{formatDate(appointment.appt_time)}</p>
//       </div>
//     )
// }

//further simplication
const Appointment = ({appointment}) =>
  <div className='appointment'>
    <h3>{appointment.title}</h3>
    <p>{formatDate(appointment.appt_time)}</p>
  </div>
