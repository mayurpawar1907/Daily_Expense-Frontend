import Sidebar from './Sidebar'
import React from 'react'
import image from '../Images/Home-img.jpg' 
import { ToastContainer } from 'react-toastify'

function Homepage() {
  return (
    <div style={{overflow:"hidden"}}>
    <Sidebar/>
    <div className="image" style={{width:"1670px", height:"100vh", position:"relative", left:"250px", backgroundImage:`url("${image}")`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"cover", }}>
    <ToastContainer/>
    
    </div>
        
      
    </div>
  )
}

export default Homepage
