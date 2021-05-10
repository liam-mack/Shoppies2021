/* eslint-disable */
import API from "../utils/API";

// Handle login states during authentication
const { username, id } = API.getUser()

export const initialState = {
  user: "" || username,
  id: "" || id,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
  case "REQUEST_LOGIN":
    return {
      ...initialState,
      loading: true,
    };
  case "LOGIN_SUCCESS":
    return {
      ...initialState,
      user: action.payload.username,
      id: action.payload.id,
      loading: false,
    };
  case "LOGOUT":
    return {
      ...initialState,
      user: "",
      id: "",
    };

  case "LOGIN_ERROR":
    return {
      ...initialState,
      loading: false,
      errorMessage: action.error,
    };

  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};
