import React , {useState} from 'react'
import {useNavigate , NavLink} from 'react-router-dom'
import {toast , ToastContainer} from 'react-toastify'
import {Axios} from '../../common/axiosInstance'
import '../../stylesheets/login.css'

function SignupUser() {

    const navigate = useNavigate()
    const [error , setError] = useState({})
    const [values , setValues] = useState({
        username : "",
        email : "",
        password : ""
    })
    const generateError = (err) => toast.error(err)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        setError(validate(values))
        try{
            const {data} = await Axios.post('/client/signup' , {
                ...values
               
            })
            console.log(data)
            navigate('/login')
        }catch(e){
            console.log('api calling error')
            console.log(e.message)
            if(e){
                const err = 'Email already registered'
                generateError(err)
            }
        }
    }

    const validate = (details) => {
        console.log(details)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!details.username){
            const error = 'Username is required'
            generateError(error)
        }
        if(!details.email){
            const error = "Email is required"
            generateError(error)
        }
        else if(!regex.test(details.email)){
            const error = "This is not a valid email"
            generateError(error)
        }
        if(!details.password){
            const error = "Password is required"
            generateError(error)
        }else if(details.password.length <3){
            const error = "password must be 3 character"
            generateError(error)
        }
    }

  return (
    <> 
    <div className="page">
        <div className="cover" >
        <h3> SignUp</h3>
        
            <input type="text" placeholder="username" 
            name="username"
            required
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            <br></br>
            <input type="email" placeholder="Enter email"
            name= "email" 
            
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            <br></br>

            <input type="password" placeholder="Password"

            name = "password"
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            
        <div className="login_btn" onClick={handleSubmit}  >
            Submit
        </div>
        <p>Already have an account?
            <NavLink to='/login' >Click here</NavLink>
        </p>
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
        </div>
    </div>
    </>
  )
}

export default SignupUser