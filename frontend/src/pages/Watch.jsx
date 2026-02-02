import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WatchPage from '../components/WatchPage'

const Watch = (props) => {
  return (
    <div>
      <Navbar/>
      <WatchPage {...props}/>
      <Footer/>
    </div>
  )
}

export default Watch
