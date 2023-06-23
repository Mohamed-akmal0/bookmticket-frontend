import {Modal} from 'react-bootstrap'
import '../../../stylesheets/adminDashboard.css'
import {useForm} from 'react-hook-form'
import {Axios} from '../../../common/axiosInstance'
import { useNavigate } from 'react-router-dom'

function ModalMovie({show,setShow}) {
    const closeModal = () => setShow(false)
    const navigate = useNavigate()
    const {handleSubmit,register,formState:{errors}} = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData()
        formData.append("image" , data.file[0] )
        Axios.post('/admin/movieInfo' , data).then(async(response) => {
            let id = response.data._id
            Axios.post(`/admin/movieImage/${id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((response) => {
                console.log(response.data)
                console.clear()
                closeModal()
                // window.refresh()
            })
        })
    }
  return (
    <>
    {show && <Modal show={show} onHide={closeModal} animation={false} 
    style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}} size='lg' >
        <Modal.Header closeButton ><Modal.Title>Movies</Modal.Title></Modal.Header>
        <Modal.Body>
            <form  enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}  >
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="text" name="title"  className='form-control' placeholder='Title'
                        {...register("title", {
                            required: true,
                            minLength: 4,
                            maxLength: 20,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Title is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="text" name="description"  className='form-control' placeholder='Description' 
                        // onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                        {...register("description", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="text" name="genre"  className='form-control' placeholder='Genre' 
                        // onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                        {...register("genre", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="time" name="duration"  className='form-control' placeholder='Duration' 
                        {...register("duration", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="text" name="director"  className='form-control' placeholder='Director' 
                        {...register("director", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="date" name="date"  className='form-control' placeholder='Date' 
                        {...register("date", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="url" name="link"  className='form-control' placeholder='Trailer link' 
                        {...register("link", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                        <span className="text-danger">
                  {errors.YoutubeLink?.type === "required" && (
                    <span>Youtube Link is required</span>
                  )}
                  {errors.YoutubeLink?.type === "minLength" && (
                    <span>Youtube Link must more than or equal to 4 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "maxLength" && (
                    <span>Youtube Link must less than 50 Character</span>
                  )}
                  {errors.YoutubeLink?.type === "pattern" && (
                    <span>Youtube Link not have spaces</span>
                  )}
                </span>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 pt-2">
                        <input type="file" name="file"  className='form-control' placeholder='upload' 
                        {...register("file", {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                            pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                          })}
                        />
                    </div>
                    <button type='submit' className='unblock' >
                        submit
                    </button>
                </div>
            </form>
        </Modal.Body>
    </Modal>
    }
    </>
    
  )
}

export default ModalMovie