import React from 'react'
import NavbarD from '../../../component/NavbarDoc/NavbarDoc'
import Appointments from '../../../component/Appointment/Appointments'
import './AppointmentPage.css'
const AppointmentPage = () => {
  return (
    <div className='bg-img'>
        <div><NavbarD/></div>
        <div className='tableDoc'>
            <Appointments/>
        </div>
    </div>
  )
}

export default AppointmentPage