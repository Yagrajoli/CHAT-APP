import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import signupPage from './pages/signupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/signup' element = {<signupPage/>} />
        <Route path='/login' element = {<LoginPage/>} />
        <Route path='/settings' element = {<SettingPage/>} />
        <Route path='/profile' element = {<ProfilePage/>} />
      </Routes>

    </>
  )
}
