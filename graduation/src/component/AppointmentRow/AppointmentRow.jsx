import React from 'react';
import { Link } from 'react-router-dom';
import './AppointmentRow.css'; // Import CSS file for styling

const AppointmentRow = ({ name,appointmentTime }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{appointmentTime}</td>
   
    </tr>
  );
};

export default AppointmentRow;
