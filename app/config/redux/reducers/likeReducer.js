const initialState = {
  like: [],
  likeDetail: [],
};

const likeReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_LIKE") {
    return {
      ...state,
      like: action.payload,
    };
  } else if (action.type === "GET_DETAIL_LIKE") {
    return {
      ...state,
      likeDetail: action.payload,
    };
  } else if (action.type === "CREATE_LIKE") {
    return state;
  } else if (action.type === "UPDATE_LIKE") {
    return state;
  } else if (action.type === "DELETE_LIKE") {
    return state;
  } else {
    return state;
  }
};

export default likeReducer;
