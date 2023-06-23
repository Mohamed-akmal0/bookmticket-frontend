import React , {useState , useEffect} from 'react'
import '../header/header.css'
import { Modal} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {Axios} from '../../../common/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'

function Header() {
   // const adminCookie = Cookies.get('admin_jwt')
   const navigate = useNavigate()
   const [show , setShow ] = useState(false)
   const [Show , SEtShow] = useState(false) 
   const [applications , setApplications] = useState([])
   const [selApplication , setSelApplication] = useState({})

   const handleShow = () => setShow(true)
   const handleClose = () => setShow(false)

   const openModal = () => SEtShow(true)
   const closeModal = () => SEtShow(false)

   const genMessage = (msg) => toast.success(msg)

   useEffect(() => {
      Axios.get('/admin/notification/theater').then((response) => {
         setApplications(response.data)
      })
   } , [])

   const open = (data) => {
      openModal()
      setSelApplication(data)
   }
   const theater = ()=> {
      navigate('/admin/theater')
   }
   const movies = () => {
      navigate('/admin/movies')
   }
   const logout = () => {
      Cookies.remove('admin_jwt')
      navigate('/admin/login')
   }

   const approve = async (id) => {
      console.log(id)
      try{
         await Axios.patch(`/admin/approve/${id}`).then((response) => {
            closeModal()
            setApplications(val => val.filter(value => value._id !== id))
            const msg = 'Approved'
            genMessage(msg)
         })
      }catch(e){
         console.log('from approve function')
      }
   }
   
   const reject = async (id) => {
      try{
         await Axios.patch(`/admin/reject/${id}`).then((response) => {
            closeModal()
            setApplications(val => val.filter(Id => Id._id !== id))
            if(response.data.message === 'rejected'){
               const msg = 'Rejected'
               genMessage(msg)
            }
         })
      }catch(e){
         console.log(e)
      }
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
               <li  >Clients</li>
               <li onClick={theater} > Theaters</li>
               <li onClick={movies} > Movies</li>
               <li onClick = {handleShow} >Notification</li>
               <li onClick={logout} >Logout</li>
         </ul>
         <h1 class="logo">Admin Panel</h1>
      </div>
   </nav>
   </div>
   {/* modal */}
   <Modal show={show} onHide={handleClose} backdrop = "static" animation = {false}
   style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}}
   >
      {/* 1st Modal */}
         <Modal.Header closeButton >
            <Modal.Title>Applications</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {applications.map((data,i) => {
               return (
                  <div className="d-flex justify-content-between">
                     <p className="small">Theater Name</p>
                     <p className="small">{data.username}</p>
                     <button className='model_button' onClick={() => open(data)} >View</button>
                  </div>
               )
            })}
         </Modal.Body>
         <Modal.Footer>
         </Modal.Footer>
      </Modal>
   {/* 2nd modal */}
   <Modal show={Show} onHide={closeModal}  size="lg"
      >
      <Modal.Header closeButton >
         <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4 className="mb-1" style={{ color: "#35558a" }}>
            {selApplication.username}
      </h4>
      <div className="d-flex justify-content-between">
         <p className="small">Theater Name</p>
         <p className="small">{selApplication.theaterName}</p>
      </div>
      <div className="d-flex justify-content-between">
         <p className="small">Email</p>
         <p className="small">{selApplication.email}</p>
      </div>
      <div className="d-flex justify-content-between">
         <p className="small">Location</p>
         <p className="small">{selApplication.location}</p>
      </div>
      <div className="d-flex justify-content-between">
         <p className="small">No of Screens</p>
         <p className="small">{selApplication.no_of_screens}</p>
      </div>
      <div className="d-flex justify-content-between">
         <button className='reject' onClick={() => reject(selApplication._id)} >Reject</button>
         <button className='approve' onClick={() => approve(selApplication._id)} >Approve</button>
      </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
   </Modal>
   <ToastContainer
      position="bottom-right"
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

export default Header