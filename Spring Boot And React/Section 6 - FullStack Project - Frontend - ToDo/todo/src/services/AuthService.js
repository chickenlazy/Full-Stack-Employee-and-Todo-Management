import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/auth";

export const register = (data) => {
  return axios.post(BASE_REST_API_URL + "/register", data);
};

export const login = (data) => {
  return axios.post(BASE_REST_API_URL + "/login", data);
};

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = (token) => localStorage.getItem("token", token);

export const saveLoggedInUser = (username) =>
  sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");

  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};
