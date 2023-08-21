const initialState = {
  user: [],
  userDetail: [],
};

const userReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "GET_DETAIL_USER") {
    return {
      ...state,
      userDetail: action.payload,
    };
  } else if (action.type === "CREATE_USER") {
    return state;
  } else if (action.type === "UPDATE_USER") {
    return state;
  } else if (action.type === "DELETE_USER") {
    return state;
  } else {
    return state;
  }
};

export default userReducer;
