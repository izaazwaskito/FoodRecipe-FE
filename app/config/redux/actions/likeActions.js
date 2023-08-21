import axios from "axios";

export const createLikeActions = (id, dataUser) => async (dispatch) => {
  try {
    const data = {
      recipes_id: id,
      users_id: dataUser,
    };
    const likes = await axios.post("http://192.168.1.8:7474/likeds", data);
    if (likes.data.statusCode === 201) {
      alert("Like Recipe Success");
    } else if (likes.data.message === "Like Already") {
      alert("Liked Already");
    }
    const result = likes.data.data;

    dispatch({ type: "CREATE_LIKE", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};

export const getUserLikeActions = (dataUser) => async (dispatch) => {
  try {
    const likes = await axios.get(
      `http://192.168.1.8:7474/likeds/users/${dataUser}`
    );
    const result = likes.data.data;
    dispatch({ type: "GET_ALL_LIKE", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
export const deleteLikeActions = (likeds_id) => async (dispatch) => {
  try {
    const likes = await axios.delete(
      `http://192.168.1.8:7474/likeds/${likeds_id}`
    );
    const result = likes.data.data;
    dispatch({ type: "DELETE_LIKE", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
