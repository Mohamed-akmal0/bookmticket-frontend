import React, { useState } from "react";
import { Axios } from "../../common/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { clientLogin } from "../../redux/actions/clientAction";
import { useDispatch } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const generateError = (err) => toast.error(err);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = (details) => {
      if (!details.email) {
        const error = "Email is required";
        generateError(error);
        return;
      }
      if (!details.password) {
        const error = "Password is required";
        generateError(error);
        return;
      }
    };
    setError(validate(values));
    const response = await clientLogin(dispatch, values);
    if (response === "wrong_email") {
      const error = "Wrong Email";
      generateError(error);
    } else if (response === "wrong_password") {
      const error = "Wrong Password";
      generateError(error);
    }else{
        navigate("/dashboard")
    }
  };
  return (
    <>
      <div className="page">
        <div className="cover">
          <h3>LOGIN</h3>
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
          <p className="text">
            {" "}
            orCreate account <NavLink to={"/signup"}>Click here</NavLink>
          </p>
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

export default Login;
