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

import React from 'react';
import {Appointment} from './appointment';

export const AppointmentsList = ({appointments}) => //its a name export. with const, u cannot export default
  <div>
    {appointments.map(function(appointment) {
      return (
        <Appointment appointment={appointment} key={appointment.id} />
      )
    })}
    </div>
