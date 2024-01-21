import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

export const getListDepartment = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (department) =>
  axios.post(REST_API_BASE_URL, department);

export const getDepartmentById = (departmentId) =>
  axios.get(REST_API_BASE_URL + "/" + departmentId);

export const updateDepartment = (employeeId, department) =>
  axios.put(REST_API_BASE_URL + "/" + employeeId, department);

export const deleteDepartment = (employeeId) =>
  axios.delete(REST_API_BASE_URL + "/" + employeeId);
