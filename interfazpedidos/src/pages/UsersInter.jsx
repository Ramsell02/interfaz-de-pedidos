import React from 'react'
import GetProducts from '../components/getproducts/GetProducts'
import PostProducts from '../components/postproducts/PostProducts'
import Carousel from '../components/Carousel/Carousel'
import Footer from '../components/footer/Footer'
function UsersInter() {
  return (
    <div>
      <Carousel/>
      <PostProducts />
      <GetProducts />
      <Footer />
    </div>
  )
}

export default UsersInter