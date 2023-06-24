import { Axios } from "../../common/axiosInstance";
import { setTheater } from "../features/theater";

export const handleTheaterData = async (dispatch) => {
  try {
    Axios.get("/admin/approved-theater").then((response) => {
      dispatch(setTheater( response.data));
    });
  } catch (error) {
    console.log(error, "in handleTheaterData ");
  }
};
