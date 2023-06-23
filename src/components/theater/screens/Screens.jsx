import React , {useState , useEffect}from 'react'
// import { useNavigate } from 'react-router-dom'
import {Axios} from '../../../common/axiosInstance'
import TheaterNavbar from '../Header/TheaterNavbar'
import '../Header/navbar.css'
import ScreenModel from './ScreenModel'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import AddMovieModel from './AddMovieModel'

function Screens() {
    const theaterToken = Cookies.get('theaterToken')
    const decodedToken = jwt_decode(theaterToken)
    const {id} = decodedToken
    const [Screens , setScreens] =useState([])
    const [selectedScreen , setSelectedScreen] = useState('')
    const [show , setShow] = useState(false)
    const [model , setModel] = useState(false)

    const open = () => {
        setShow(true)
    }

    const openAddMoviesModel = (id) => {
        setSelectedScreen(id)
        setModel(true)
    }
    useEffect(() => {
        try{
            Axios.get(`/theater/getScreens/${id}`).then((response) => {
                console.log(response.data)
                setScreens(response.data)
            })
        }catch(e){
            console.log('from api screens')
            console.log(e.message)
        }
    },[])
return (
    <>
    <TheaterNavbar/>
    <br /><br /><br /><br />
        <div className="container">
        <button className='movie_btn' onClick={open}  >Add Screens</button> 
            <h1>Screens</h1>
            <table>
            <tr class="heading">
            <th>Name</th>
            <th>No:Of Rows</th>
            <th>No:Of Columns</th>
            <th>Add Movies</th>
            </tr>
            <tbody>
            {Screens.screens?.map((data,i) => {
                console.log(data)
            return(
                <tr key={i+1} >
                    <td>{data.name}</td>
                    <td>{data.row}</td>
                    <td>{data.col}</td>
                    <td><button className='model_button' onClick={()=>openAddMoviesModel(data._id)} >Add Movies</button></td>
                </tr>
                )
                }) } 
            </tbody>
            </table>
        </div>
        <ScreenModel show={show} setShow={setShow} />
        <AddMovieModel model={model} setModel={setModel} screenId={selectedScreen} />
    </>
)
}

export default Screens