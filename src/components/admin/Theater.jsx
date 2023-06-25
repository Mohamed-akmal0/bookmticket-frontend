import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import "../../stylesheets/adminDashboard.css";
import { Axios } from "../../common/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import {
  handleTheaterBlock,
  handleTheaterData,
} from "../../redux/actions/theaterAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TheaterDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theaterData = useSelector((state) => state.theater.theater ?? []);
  const [block, setBlock] = useState(false);
  const genMsg = (msg) => toast.success(msg, { position: "top-center" });

  const blockTheater = async (id) => {
    try {
      const res = await handleTheaterBlock(dispatch, id, theaterData);
      if(res.message === 'blocked'){
        const msg = `Blocked ${res.username}`
        genMsg(msg)
      }
    } catch (e) {
      console.log("api call error in block theater");
      console.log(e);
    }
  };

  const unBlockTheater = (id) => {
    try {
      Axios.patch(`/admin/unBlock/${id}`).then(({ data }) => {
        setBlock(false);
        const msg = `UnBlocked ${data.username}`;
        genMsg(msg);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleTheaterData(dispatch);
  }, []);

  const handleNavigation = () => {
    navigate("/admin/blocked");
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <button className="movie_btn" onClick={handleNavigation}>
          Blocked
        </button>
        <h1>Theaters</h1>
        <table>
          <tr class="heading">
            <th>Username</th>
            <th>Email</th>
            <th>Theater_name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
          <tbody>
            {theaterData.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.theaterName}</td>
                  <td>{data.location}</td>
                  {data.isBlocked === false && (
                    <button
                      className="block"
                      onClick={() => blockTheater(data._id)}
                    >
                      BLOCK
                    </button>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer
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
  );
}

export default TheaterDisplay;
