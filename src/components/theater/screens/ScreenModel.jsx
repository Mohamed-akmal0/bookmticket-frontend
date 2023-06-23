import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import { Axios } from '../../../common/axiosInstance'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

function ScreenModel({show , setShow}) {
    const theaterToken =  Cookies.get('theaterToken')
    const decodedToken = jwt_decode(theaterToken)
    const {id} = decodedToken
    const theaterId = id
    const {handleSubmit,register, formState:{errors}} = useForm()
    const close = () => setShow(false)

    const onSubmit = async (data) => {
        const {name , rows , cols} = data
        const Data={
            theaterId,
            name,
            cols,
            rows
        }
        try {
            await Axios.patch(`/theater/addScreens`,Data).then((response) => {
                console.log(response.data)
                close()
                window.location.reload()
            })
        } catch (error) {
            
        }
    }

return (
    <>
        <Modal show={show} onHide={close} backdrop = "static"
        style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}} >
            <Modal.Header closeButton >
                <Modal.Title>Add Screen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    <div className="row">
                        <div className="col-md-6   pt-2">
                            <input type="text" placeholder='screen name' name='name' required
                            {...register("name", {
                                required: true,
                            })}
                            />
                        </div>
                        <div className="col-md-6   pt-2">
                            <input type="number" placeholder='No of rows' name='rows' required
                            {...register("rows", {
                                required: true,
                            })}
                            />
                        </div>
                        <div className="col-md-6   pt-2">
                            <input type="number" placeholder='No of cols' name='cols' required
                            {...register("cols", {
                                required: true,
                            })}
                            />
                        </div>
                    </div>
                    <br />
                    <button className='login_btn' type="submit">Submit</button>
                </form>
            </Modal.Body>
        </Modal>
    </>
)
}

export default ScreenModel