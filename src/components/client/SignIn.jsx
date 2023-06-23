import React , {useState } from 'react'
import {Axios} from '../../common/axiosInstance'
import {toast , ToastContainer} from 'react-toastify'
import {useNavigate , NavLink} from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const [error , setError] = useState({}) 
    const [values , setValues] = useState({
        email : "",
        password : ""
    })
    const generateError = (err) => toast.error(err)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        setError(validate(values))
        try{
            console.log('inside axios of login component')
            const {data} = await Axios.post('/client/login' , {
                ...values
            },{
                withCredentials : true
            })
            console.log(data)
            if(data.message === 'success'){
                navigate('/dashboard')
            }else if(data.message === 'wrong_email'){
                const error = 'Wrong Email'
                generateError(error)
            }else if(data.message === 'wrong_password'){
                const error = 'Wrong Password'
                generateError(error)
            }
        }catch(e){
            console.log('api call error in login component')
        }

        const validate = (details) => {
            console.log(details)
            if(!details.email){
                const error = 'Email is required'
                generateError(error)
            }
            if(!details.password){
                const error = 'Password is required'
                generateError(error)
            }
        }
    }
  return (
    <>
        <div className="page">
        <div className="cover" >
            <h3>LOGIN</h3>
                <input type="text" name="email" id="" placeholder='email'  
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}} 
                />


                <input type="password" name="password" id="" placeholder='password' 
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />


                <div className= "login_btn"   onClick={handleSubmit} >Login</div>
                <p className= "text" > orCreate account <NavLink to={'/signup'} >Click here</NavLink></p>

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

export default Login