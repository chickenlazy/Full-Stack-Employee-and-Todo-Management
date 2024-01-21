import { Fragment, useEffect, useState } from "react";
import { listEmployee, deleteEmployee } from "../service/EmployeeService";
import { getDepartmentById } from "../service/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [Employees, setEmployees] = useState([]);
  const [Department, setDepartment] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployeeList(); // Gọi hàm fetchEmployeeList khi component được mount
  }, []); // Rỗng để chỉ chạy một lần khi component mount

  const fetchEmployeeList = () => {
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const deleteEmployeeHandler = (id) => {
    deleteEmployee(id)
      .then((response) => {
        console.log(response);
        fetchEmployeeList(); // Gọi lại danh sách nhân viên sau khi xóa
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center">List of Employees</h2>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
          Add Employee
        </button>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.departmentId}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmployeeHandler(employee.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListEmployeeComponent;
