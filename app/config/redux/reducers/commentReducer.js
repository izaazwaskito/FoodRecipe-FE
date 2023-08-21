const initialState = {
  comment: [],
  commentDetail: [],
};

const commentReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_COMMENT") {
    return {
      ...state,
      comment: action.payload,
    };
  } else if (action.type === "GET_DETAIL_COMMENT") {
    return {
      ...state,
      commentDetail: action.payload,
    };
  } else if (action.type === "CREATE_COMMENT") {
    return state;
  } else if (action.type === "UPDATE_COMMENT") {
    return state;
  } else if (action.type === "DELETE_COMMENT") {
    return state;
  } else {
    return state;
  }
};

export default commentReducer;
