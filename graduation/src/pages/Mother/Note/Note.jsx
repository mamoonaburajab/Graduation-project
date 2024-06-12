import React from 'react'
import NavbarM from '../../../component/navbarMom/NavbarM'
import Notes from '../../../component/Notes/Notes'
import './note.css'
import Footer1 from '../../../component/Footer/Footer1'
const Note = () => {
  return (
    <div className='note-cont'>
        <NavbarM/>
        <Notes/>
        <Footer1/>
    </div>
  )
}

export default Note