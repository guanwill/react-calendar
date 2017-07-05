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
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'; //this is a react link library to create links. similar to a tag
import { formatDate } from '../utils/format';


export default class Appointment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appointment: props.appointment
    }
  }

  // specifying prop type for appointment. it must be an object and is required
  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  // setting default prop
  static defaultProps = {
    appointment: {}
  }

  componentDidMount () {
    if(this.props.match){
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        datatype: "JSON"
      }).done((data) => {
        this.setState({appointment:data});
      })
    }
  }

  render () {
    return (
      <div className='appointment'>
        <Link to={ `/appointments/${this.state.appointment.id}` }>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.state.appointment.appt_time)}</p>
      </div>
    )
  }
}

// export const Appointment = ({appointment}) =>
//   <div className='appointment'>
//
//     <Link to={ `/appointments/${appointment.id}` }>
//       <h3>{appointment.title}</h3>
//     </Link>
//
//     <p>{formatDate(appointment.appt_time)}</p>
//   </div>
