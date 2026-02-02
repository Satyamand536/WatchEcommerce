import React from 'react'
import BrandPage from '../components/BrandPage'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Brand = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20"> {/* Add padding for sticky navbar */}
        <BrandPage/>
      </div>
      <Footer />
    </div>
  )
}

export default Brand
