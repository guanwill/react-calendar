// class AppointmentsList extends React.Component {
//   render () {
//     return (
//       <div>
//         {this.props.appointments.map(function(appointment) {
//           return (
//             <Appointment appointment={appointment} key={appointment.id} />
//           )
//         })}
//       </div>
//     )
//   }
// };


//rendering stateless functional component
// const AppointmentsList = ({appointments}) => {
//     return (
//       <div>
//         {appointments.map(function(appointment) {
//           return (
//             <Appointment appointment={appointment} key={appointment.id} />
//           )
//         })}
//       </div>
//     )
// };

//furhter simplified
const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map(function(appointment) {
      return (
        <Appointment appointment={appointment} key={appointment.id} />
      )
    })}
    </div>
