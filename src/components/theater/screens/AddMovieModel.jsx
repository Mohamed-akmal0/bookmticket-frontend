import React , {useEffect , useState} from 'react'
import { Modal , Dropdown, Form} from 'react-bootstrap'
import {Axios} from '../../../common/axiosInstance'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

function AddMovieModel({model , setModel , screenId}) {
    const [movies , setMovies] = useState([])
    const [movieId , setMovieId] = useState({})
    const token = Cookies.get('theaterToken')
    const decodedToken = jwt_decode(token)
    const {id} = decodedToken
    const theaterId = id
    const [addedMovie , setAddedMovie] = useState({
        price : '',
        screenType:'',
        time:''

    })
    const closeModel = () => {
        setModel(false)
    }
    const movie = (id) => {
        setMovieId(id)
    }

    useEffect(() => {
        try{
            Axios.get('/theater/getAllMovies').then((response) => {
                setMovies(response.data)
            })
        }catch(e){
            console.log('from addMovies model' , e)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const movieData={
            theaterId,
            screenId,
            addedMovie,
            movieId
        }
        closeModel()
        const {data} = await Axios.patch('/theater/addMovieToScreen',{
            theaterId,screenId,addedMovie,movieId
        })
    }

return (
    <Modal show={model} onHide={closeModel} backdrop='static' size='m' >
        <Modal.Header closeButton >
            <Modal.Title>Add Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Dropdown  autoClose="outside" key={'end'}  drop={'end'} >
                <Dropdown.Toggle  id="dropdown-basic-button">
                Select Movie
                </Dropdown.Toggle>
                <Dropdown.Menu variant='dark' >
                {movies.map((data,i) => {
                    return(<Dropdown.Item value={data._id} name='movieId' onClick={() => movie(data._id)} >{data.title}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <Form onSubmit={handleSubmit} >
                <input type="time" placeholder='Time' className='form-control' name='time'
                onChange={(e) => {setAddedMovie({...addedMovie , [e.target.name] : e.target.value})}}
                />
                <br />
                <input type="text" placeholder='2D/3D' className='form-control' name='screenType'
                onChange={(e) => {setAddedMovie({...addedMovie , [e.target.name] : e.target.value})}}
                />
                <br />
                <input type="number" placeholder='Price' className='form-control' name='price'
                onChange={(e) => {setAddedMovie({...addedMovie , [e.target.name] : e.target.value})}} 
                />
                <br />
                <button type='submit'  className='login_btn'  > Save </button>
            </Form>
        </Modal.Body>
    </Modal>
)
}

export default AddMovieModel