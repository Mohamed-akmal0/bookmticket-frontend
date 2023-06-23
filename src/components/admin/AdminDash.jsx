import React , {useEffect, useState , useRef} from 'react'
import Header from './header/Header'
import '../../stylesheets/adminDashboard.css'
import {Axios} from '../../common/axiosInstance'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function AdminDash() {
    const navigate = useNavigate()
    const [clients , setClients] = useState([])
    const admin = Cookies.get('admin_jwt')
    let config = {
        headers: {
        'Authorization': 'Bearer ' + admin
        }
    }
    useEffect(() => {
        try {
            Axios.get('/admin/clients',config).then(response => setClients(response.data))
        } catch (error) {
            console.log('from api get clients' , error.message)
            navigate('/admin/Login')
        }
    } , [])
return (
    <div>
        <Header />
        <br /><br /><br /><br />
        <div className="container">
            <h1>Clients</h1>
            <table>
            <tr class="heading">
            <th>Username</th>
            <th>Email</th>
            </tr>
            <tbody>
            {clients.map((data, i) => {
                return(
                        <tr key={i}>
                            <td key={i} >{data.username}</td>
                            <td key={i} >{data.email}</td>
                        </tr>
                    )
            })}
            </tbody>
            </table>
        </div>
    </div>
)
}

export default AdminDash