import React from 'react'
import VacTable from '../../../component/VacTable/VacTable'
import NavbarM from '../../../component/navbarMom/NavbarM'
import Footer1 from '../../../component/Footer/Footer1'
const Vac = () => {
  return (
    <div>
        <div>
          <NavbarM/>
        </div>
        <div>
          <VacTable/>
        </div>
        <div>
          <Footer1/>
        </div>
    </div>
  )
}

export default Vac