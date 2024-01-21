import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api/todos";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = getToken();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const getAllTodo = () => {
  return axios.get(BASE_REST_API_URL);
};

export const saveToDo = (data) => {
  return axios.post(BASE_REST_API_URL, data);
};

export const getToDoById = (id) => {
  // Thêm id vào URL của yêu cầu GET
  const url = `${BASE_REST_API_URL}/${id}`;
  return axios.get(url);
};

export const updateToDo = (id, data) => {
  return axios.put(BASE_REST_API_URL + `/${id}`, data);
};

export const deleteToDo = (id) => {
  return axios.delete(BASE_REST_API_URL + `/${id}`);
};

export const completeToDo = (id) => {
  return axios.put(BASE_REST_API_URL + `/${id}` + "/complete");
};

export const inCompleteToDo = (id) => {
  return axios.put(BASE_REST_API_URL + `/${id}` + "/in-complete");
};
