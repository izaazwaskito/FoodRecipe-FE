import axios from "axios";

export const createSavedActions = (id, dataUser) => async (dispatch) => {
  try {
    const data = {
      recipes_id: id,
      users_id: dataUser,
    };
    const saveds = await axios.post("http://192.168.1.8:7474/bookmarks", data);
    if (saveds.data.statusCode === 201) {
      alert("Bookmark Recipe Success");
    } else if (saveds.data.message === "Bookmark Already") {
      alert("Bookmark Already");
    }
    const result = saveds.data.data;

    dispatch({ type: "CREATE_SAVED", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};

export const getUserSavedActions = (dataUser) => async (dispatch) => {
  try {
    const saveds = await axios.get(
      `http://192.168.1.8:7474/bookmarks/users/${dataUser}`
    );
    const result = saveds.data.data;
    dispatch({ type: "GET_ALL_SAVED", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
export const deleteSavedActions = (bookmarks_id) => async (dispatch) => {
  try {
    const saved = await axios.delete(
      `http://192.168.1.8:7474/bookmarks/${bookmarks_id}`
    );
    const result = saved.data.data;
    dispatch({ type: "DELETE_SAVED", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
