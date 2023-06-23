import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../common/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "../../stylesheets/login.css";
import { handleAdminLogin } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function SignInAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //redux state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  //state
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const generateError = (err) => toast.error(err);

  useEffect(() => {
    if(isLoggedIn){
        navigate("/admin/dashboard")
    }
  },[isLoggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleAdminLogin(dispatch, values);
    if (data.message === "wrong_email") {
      const error = "Email is incorrect";
      generateError(error);
    } else if (data.message === "wrong_pass") {
      const error = "Invalid password";
      generateError(error);
    } else {
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <div className="page">
        <div className="cover">
          <h3>ADMIN LOGIN</h3>
          <input
            type="text"
            name="email"
            id=""
            placeholder="email"
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />

          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />

          <div className="login_btn" onClick={handleSubmit}>
            Login
          </div>
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
  );
}

export default SignInAdmin;
