import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Dashboard from '../../pages/Dashboard'

function Layout({children}) {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col'>
       
        <div>
            {children}
        </div>
        <div>
            <Footer/>
        </div>
      </div>
    </div>
  )
}

export default Layout
