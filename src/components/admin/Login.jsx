import React  , {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Axios} from '../../common/axiosInstance'
import{toast , ToastContainer} from 'react-toastify'
import '../../stylesheets/login.css'

function SignInAdmin() {
    const navigate = useNavigate()
    const [values , setValues] = useState({
        email : "",
        password : ""
    })
    const generateError = (err) => toast.error(err)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try{
            const {data} = await Axios.post('/admin/login',{
                ...values
            },{
                withCredentials : true
            })
            console.log(data)
            if(data.message === 'wrong_email'){
                const error = 'Email is incorrect'
                generateError(error)
            }else if(data.message === 'wrong_pass'){
                const error = 'Invalid credentials'
                generateError(error)
            }
            navigate('/admin/dashboard')
            
        }catch(e){
            console.log('api error in admin login component')
            console.log(e)
        }
    }
  return (
    <>
    <div className="page">
        <div className="cover" >
            <h3>ADMIN LOGIN</h3>
                <input type="text" name="email" id="" placeholder='email'  
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}} 
                />


                <input type="password" name="password" id="" placeholder='password' 
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />


                <div className= "login_btn"   onClick={handleSubmit} >Login</div>
        </div>
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

export default SignInAdmin