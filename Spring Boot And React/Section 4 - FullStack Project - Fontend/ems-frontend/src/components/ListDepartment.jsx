import { useEffect, useState } from "react";
import { getListDepartment, deleteDepartment } from "../service/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartment = () => {
  const [data, setData] = useState([]);

  const navigator = useNavigate();

  const listOfDepartment = () => {
    getListDepartment()
      .then((department) => {
        setData(department.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Gọi hàm listOfDepartment() bằng cách thêm dấu ngoặc đơn
    listOfDepartment();
  }, []);

  const updateDepartmentHandler = (id) => {
    navigator(`/edit-department/${id}`);
  };

  const deleteDepartmentHandler = (id) => {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        // Gọi hàm listOfDepartment() khi xóa phòng ban thành công
        listOfDepartment();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">List Of department</h2>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>department Id</th>
            <th>department Name</th>
            <th>department Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateDepartmentHandler(department.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteDepartmentHandler(department.id)}
                  style={{ marginLeft: '10px'}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
