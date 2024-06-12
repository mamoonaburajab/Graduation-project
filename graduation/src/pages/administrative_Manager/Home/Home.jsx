import React from 'react';
import Navbar_Manager from '../../../component/Narbar_Manager/Navbar_Manager';
import "./Home.css";
import HomeA from '../../../component/HomeA/HomeA';

const Home_manager = () => {
  return (
    <div className='div-manager'>
      <div className='bg-img'>
        <Navbar_Manager />
        <HomeA />
      </div>
    </div>
  )
}

export default Home_manager;
