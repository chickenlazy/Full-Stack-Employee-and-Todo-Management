import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployee,
  updateEmployee,
  createEmployee,
} from "../service/EmployeeService";
import {  getListDepartment } from "../service/DepartmentService";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "", // Changed from "departments"
  });

  useEffect(() => {
    getListDepartment()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();
  const navigator = useNavigate();

  // Trong useEffect khi nhận dữ liệu nhân viên
useEffect(() => {
  if (id) {
    getEmployee(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setDepartmentId(response.data.departmentId); // Sửa đổi dòng này
      })
      .catch((error) => {
        console.log(error);
      });
  }
}, [id]);


  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        email,
        departmentId,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then(() => {
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (!firstName.trim()) {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    } else {
      errorsCopy.firstName = "";
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    } else {
      errorsCopy.lastName = "";
    }

    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsCopy.email = "Invalid email format";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!departmentId || departmentId === "Select Department") {
      errorsCopy.department = "Please select a department";
      valid = false;
    } else {
      errorsCopy.department = "";
    }

    setErrors(errorsCopy);

    return valid;
  };

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update Employee</h2>
    ) : (
      <h2 className="text-center">Add Employee</h2>
    );
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          
          <div className="card-body">
            <form className="needs-validation">
              <div className="form-group mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""
                    }`}
                  id="firstName"
                  placeholder="Enter employee's first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""
                    }`}
                  id="lastName"
                  placeholder="Enter employee's last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""
                    }`}
                  id="email"
                  placeholder="Enter employee's email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="department" className="form-label">
                  Select Department
                </label>
                <select
                  className={`form-control ${errors.department ? "is-invalid" : ""
                    }`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>     
                  {departments.map((department) => (
                    
                    <option key={department.id} value={department.id}>
                      {department.departmentName} ({department.departmentDescription})
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
