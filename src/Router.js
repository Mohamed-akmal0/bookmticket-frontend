import React from 'react'
import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './pages/client/Signup' 
import SignIn from './pages/client/Login'
import Dashboard from './pages/client/Dashboard'
import Login from './pages/admin/Login'
import DashAdmin from './pages/admin/DashAdmin'
import Movies from './pages/admin/movies'
import Theater from './pages/admin/Theater'
import TheaterSignup from './pages/theater/TheaterSignup'
import TheaterLogin from './pages/theater/TheaterLogin'
import Screen from './pages/theater/Screen'
import { BlockedTheater } from './pages/admin/Blocked'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/login' element = {<SignIn/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>

        {/* theater */}
        <Route path='/theater/signup' element = {<TheaterSignup/>}/>
        <Route path='/theater/login' element = {<TheaterLogin/>}/>
        <Route path='/theater/screen' element = {<Screen/>}/>


        {/* admin */}
        <Route path='/admin/login' element = {<Login/>}/>
        <Route path='/admin/dashboard' element = {<DashAdmin/>}/>
        <Route path='/admin/theater' element = {<Theater/>}/>
        <Route path='/admin/movies' element = {<Movies/>}/>
        <Route path='/admin/blocked' element = {<BlockedTheater/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router