import React , {useState } from 'react'
import {  Form } from 'react-bootstrap'
import '../../stylesheets/login.css'
import {useNavigate} from 'react-router-dom'
import {Axios} from '../../common/axiosInstance'
import {toast , ToastContainer} from 'react-toastify'
function Signup() {

    const navigate = useNavigate()
    const [values , setValues] = useState({
        username : "",
        email: "",
        theaterName : "",
        location : "",
        no_of_screens: "",
        isBlocked : false,
        isDelete : false,
        isApproved : false
    })

    const warning = (err) => toast.warning(err)

    const handleSubmit =  (e) => {
        e.preventDefault()
        console.log(values)
        try{
            const {data} =  Axios.post('/theater/signup',{
                ...values
            })
            console.log(data)
            if(data === undefined)  navigate('/theater/login') 
        }catch(e){
            console.log('api calling error  theaterRegister')
            console.log(e)
            if(e){const err = 'Email already registered'
            warning(err)}
        }
    }

  return (
    <>
        <div className="page">
            <div className="cover">
                <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder='username'
                name='username'
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />
                </Form.Group>
                {/* <br /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="email" placeholder='email' 
                name='email'
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}} 
                />
                </Form.Group>
                {/* <br /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="text" placeholder='Theater-name'
                name='theaterName'
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder='location'
                name='location' 
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password"  placeholder='password' 
                name='password'
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />
                </Form.Group>
                <br />
                <button className='login_btn' type="submit">
                Submit
                </button>
                </Form>
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
        </div>
    </>
  )
}

export default Signup