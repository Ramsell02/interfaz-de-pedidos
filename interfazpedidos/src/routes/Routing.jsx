import React from 'react'
import PrivatesRoutes from './PrivatesRoutes'
import Home from '../pages/Home'
import AdminDash from '../pages/AdminDash'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UsersInter from '../pages/UsersInter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Admin' element={<PrivatesRoutes><AdminDash/></PrivatesRoutes>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/UsersInter' element={<UsersInter />} />
      </Routes>
    </Router>
  )
}

export default Routing