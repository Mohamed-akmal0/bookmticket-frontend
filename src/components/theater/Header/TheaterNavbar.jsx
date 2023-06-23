import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function TheaterNavbar() {

    const navigate = useNavigate()
    const logout = () => {
        Cookies.remove('theater_jwt')
        navigate('/theater/login')
    }

return (
    <>
    <div>
    <nav class="navbar">
        <div class="navbar-container container">
            <input type="checkbox" name="" id=""/>
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <li  > Screens</li>
                <li  > Movies</li>
                <li  > Chat</li>
                <li onClick={logout} >Logout</li>
            </ul>
            <h1 class="logo">Theater Panel</h1>
        </div>
    </nav>
    </div>
    </>
)
}
