import React , {useState , useEffect} from 'react'
import Header from './header/Header'
import '../../stylesheets/adminDashboard.css'
import { Axios } from '../../common/axiosInstance'
import {toast , ToastContainer} from 'react-toastify'

function TheaterDisplay() {

    const [theater , SetTheater] = useState([])
    const [block , setBlock] = useState(false)
    const genMsg = (msg) => toast.success(msg,{position : 'top-center'})

    const blockTheater = (id) => {
        try{    
            Axios.patch(`/admin/block/${id}`).then(({data}) => {
                setBlock(true)
                const msg = `Blocked ${data.username}`
                genMsg(msg)
            })
        }catch(e){
            console.log('api call error in block theater')
            console.log(e)
        }
    }

    const unBlockTheater = (id) => {
        try{
            Axios.patch(`/admin/unBlock/${id}`).then(({data}) => {
                setBlock(false)
                const msg = `UnBlocked ${data.username}`
                genMsg(msg)
            })
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        Axios.get('/admin/approved-theater').then((response => SetTheater(response.data)))
    },[])

  return (
    <>
        <Header/>
        <br /><br /><br /><br />
        <div className="container">
            <h1>Theaters</h1>
            <table>
            <tr class="heading">
            <th>Username</th>
            <th>Email</th>
            <th>Theater_name</th>
            <th>Location</th>
            <th>Status</th>
            </tr>
            <tbody>
            {theater.map((data, i) => {
                return(
                        <tr key={i}>
                            <td key={i} >{data.username}</td>
                            <td key={i} >{data.email}</td>
                            <td key={i} >{data.theaterName}</td>
                            <td key={i} >{data.location}</td>
                            {data.isBlocked === false? (
                                <button className='block' onClick={()=>blockTheater(data._id)} >BLOCK</button>
                            ):(
                                <button className='unblock' onClick={()=>unBlockTheater(data._id)} >UNBLOCK</button>
                            )}
                        </tr>
                    )
            })}
            </tbody>
            </table>
        </div>
        <ToastContainer
      autoClose={1800}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </>
  )
}

export default TheaterDisplay