import axios from "axios";

export const registerActions =
  (name, email, phone, password, confirmpassword) => async (dispatch) => {
    try {
      const data = {
        users_name: name,
        users_email: email,
        users_phone: phone,
        users_password: password,
        users_confirmpassword: confirmpassword,
      };
      const users = await axios.post(
        "http://192.168.1.8:7474/users/register",
        data
      );
      if (users.data.statusCode === 201) {
        alert("Register Success");
      }
      const result = users.data.data;

      dispatch({ type: "CREATE_USERS", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };
