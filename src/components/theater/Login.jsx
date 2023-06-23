import React  , {useState} from 'react'
import {useNavigate , NavLink} from 'react-router-dom'
import {toast , ToastContainer} from 'react-toastify'
import Swal from 'sweetalert2'
import { Axios } from '../../common/axiosInstance'
import '../../stylesheets/login.css'
function Login() {

    const navigate = useNavigate()
    const [values , setValues] = useState({
        email: "",
        password : ""
    })
    console.log(values.email)
    const genError = (err) => toast.error(err)
    const genMessage = () =>{
        Swal.fire({
            position: 'top-bottom',
            title: 'Message',
            text:'Admin should confirm your account.Then only you can log In to website.',
            showConfirmButton: false,
            allowOutsideClick : false,
            timer: 4500
        })
    }
    const button = () => {}
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await Axios.post('/theater/login',{
                ...values
            },{
                withCredentials : true
            })
            console.log(data)
            if(data.message === 'notApproved'){
                const err = 'Not Approved by Admin';
                genError(err)
            }
            if(data.message === 'rejected'){
                const err = 'rejected by admin'
                genError(err)
            }
            if(data.message === 'blocked'){
                const err = 'Account is blocked'
                genError(err)
            }
            if(data.message === 'success') navigate('/theater/screen')
        }catch(e){
            console.log('from api calling inside theater login component')
            console.log(e.message)
        }
    }

  return (
    <>
        <div className="page">
            <div className="cover" >
                <h3>THEATER LOGIN</h3>
                    <input type="text" name="email" id="" placeholder='email'  
                    onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}} 
                    />


                    <input type="password" name="password" id="" placeholder='password' 
                    onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                    />


                    <div className= "login_btn"   onClick={handleSubmit} >Login</div>
                    <p className= "text" > orCreate account <NavLink to={'/theater/signup'} >Click here</NavLink></p>

            </div>
        <button className='help_btn' onClick={genMessage}>?</button>
        </div>
        <ToastContainer
        position="top-right"
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

export default Login