import { Axios } from "../../common/axiosInstance";
import { setAdminData, setIsLoggedIn } from "../features/auth";

export const handleAdminLogin = async (dispatch,values) => {
  try {
    const { data } = await Axios.post(
      "/admin/login",
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );
    if(data.message === "success"){
        dispatch(setAdminData(values))
        dispatch(setIsLoggedIn(true))
    }else{
        dispatch(setAdminData({}))
        dispatch(setIsLoggedIn(false))
    }
    return data
  } catch (e) {
    console.log("error in handle admin login");
    console.log(e);
  }
};
