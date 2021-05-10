/* eslint-disable */

// Configure below depending on local or heroku environment

// const ROOT_URL = "https://shoppies-2021.herokuapp.com";
const ROOT_URL = "http://localhost:3000";

// Post request handling user login with passport local strategy
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    const data = await response.json();
    if (data.username && data.id) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      // localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
