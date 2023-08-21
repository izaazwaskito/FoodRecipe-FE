const initialState = {
  saved: [],
  savedDetail: [],
};

const savedReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_SAVED") {
    return {
      ...state,
      saved: action.payload,
    };
  } else if (action.type === "GET_DETAIL_SAVED") {
    return {
      ...state,
      savedDetail: action.payload,
    };
  } else if (action.type === "CREATE_SAVED") {
    return state;
  } else if (action.type === "UPDATE_SAVED") {
    return state;
  } else if (action.type === "DELETE_SAVED") {
    return state;
  } else {
    return state;
  }
};

export default savedReducer;
