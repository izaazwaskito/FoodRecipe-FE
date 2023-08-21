import axios from "axios";

export const createCommentActions =
  (id, dataUser, commentText) => async (dispatch) => {
    try {
      const data = {
        recipes_id: id,
        comment_text: commentText,
        users_id: dataUser,
      };
      const comments = await axios.post(
        "http://192.168.1.8:7474/comments",
        data
      );
      if (comments.data.statusCode === 201) {
        alert("Comment Recipe Success");
      }
      const result = comments.data.data;

      dispatch({ type: "CREATE_COMMENT", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };

export const getUserCommentActions = (id) => async (dispatch) => {
  try {
    const comments = await axios.get(`http://192.168.1.8:7474/comments/${id}`);
    const result = comments.data.data;
    dispatch({ type: "GET_ALL_COMMENT", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
