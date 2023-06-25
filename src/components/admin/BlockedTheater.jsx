import React, { useEffect } from "react";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { handleBlockedTheater } from "../../redux/actions/theaterAction";

export const TheaterBlocked = () => {
  const dispatch = useDispatch();
  const blockedTheater = useSelector((state) => state.theater.BlockedTheater);

  useEffect(() => {
    handleBlockedTheater(dispatch);
  }, []);

  console.log(blockedTheater);
  const unBlockTheater = (id) => {};
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* <button className="movie_btn" onClick={handleNavigation}>
          Blocked
        </button> */}
        <h1>Blocked Theaters</h1>
        <table>
          <tr class="heading">
            <th>Username</th>
            <th>Email</th>
            <th>Theater_name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
          <tbody>
            {blockedTheater.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.theaterName}</td>
                  <td>{data.location}</td>
                  {data.isBlocked === true && (
                    <button
                      className="unblock"
                      onClick={() => unBlockTheater(data._id)}
                    >
                      UNBLOCK
                    </button>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <ToastContainer
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </>
  );
};
