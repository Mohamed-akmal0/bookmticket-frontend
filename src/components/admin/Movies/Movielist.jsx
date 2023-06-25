import React , {useEffect, useState}from 'react'
import Header from '../header/Header'
import '../../../stylesheets/adminDashboard.css'
import ModalMovie from './Modal'
import {Axios} from '../../../common/axiosInstance'
function Movielist() {
    const [show  , setShow] = useState(false)
    const [movies , setMovies] = useState([])
    const open = () => {
        setShow(true)
    }
    useEffect(() => {
      Axios.get('/admin/getMovies').then((response) => {
        setMovies(response.data)
      })
    },[setMovies])
  return (
    <>
        <Header/>
        <br /><br /><br /><br />
        <div className="container">
        <button className='movie_btn' onClick={open} >Add Movies</button>
            <h1>Movies</h1>
            <table>
            <tr class="heading">
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Director</th>
            <th>Date</th>
            <th>Trailer link</th>
            <th>Image</th>
            </tr>
            <tbody>
              {movies.map((data,i)=> {
                return(
                  <tr key={i} >
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.genre}</td>
                    <td>{data.duration}</td>
                    <td>{data.director}</td>
                    <td>{data.date}</td>
                    <td>{data.link}</td>
                    <td><img src={`http://localhost:4000/uploads/${data._id}.jpg`} /></td>
                  </tr>
                )
              })}
            </tbody>
            </table>
        </div>
        <ModalMovie show={show} setShow={setShow}></ModalMovie>
    </>
  )
}

export default Movielist