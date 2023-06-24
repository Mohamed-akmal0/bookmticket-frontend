import { Axios } from "../../common/axiosInstance";
import { setClientData } from "../features/client";

export const clientLogin = async (dispatch, values) => {
  try {
    const { data } = await Axios.post(
      "/client/login",
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );
    if (data.message === "success") {
      dispatch(setClientData(data.details));
    }
    return data.message;
  } catch (error) {
    console.log(error, "in client login method");
  }
};
