import { Axios } from "../../common/axiosInstance";
import { setBlockedTheater, setTheater } from "../features/theater";

export const handleTheaterData = async (dispatch) => {
  try {
    Axios.get("/admin/approved-theater").then((response) => {
      dispatch(setTheater(response.data));
    });
  } catch (error) {
    console.log(error, "in handleTheaterData ");
  }
};

export const handleTheaterBlock = async (dispatch, id, ) => {
  try {
    const { data } = await Axios.patch(`/admin/block/${id}`);
     return data
  } catch (error) {
    console.log(error, "in handleTheaterBlock");
  }
};

export const handleBlockedTheater = async (dispatch) => {
  try {
    const {data} = await Axios.get('/admin/getBlockedTheater')
    dispatch(setBlockedTheater(data) ?? [])
  } catch (error) {
    console.log(error,'in handleBlockedTheater');
  }
}

export const handleUnBlockTheater = async (dispatch) => {
  try {
    
  } catch (error) {
    console.log(error,'in handleUnBlockTheater');
  }
}
