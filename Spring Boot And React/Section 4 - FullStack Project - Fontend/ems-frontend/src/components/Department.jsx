import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, getDepartmentById, updateDepartment } from "../service/DepartmentService";

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  
  const {id} =useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentById(id)
      .then((response) => {
        console.log(response);
        if (response.data.departmentName !== undefined && response.data.departmentDescription !== undefined) {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        }
        else {
          console.log("error getDepartmentById in Department Component");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  
  

  const saveDepartment = (e) => {
    e.preventDefault();
    const department = {
      departmentName,
      departmentDescription,
    };

    if(id) {
      updateDepartment(id, department)
      .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
      .catch((error) => {
          console.error(error);
        });
    }
    else {
      createDepartment(department)
      .then(() => {
        navigator("/departments");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const pageTitle = () => {
    if(id) {
      return <h2 className="text-center">Update Department</h2>
    }
    else {
      return <h2 className="text-center">Add Department</h2>
    }
  }
  return (
    <Fragment>
      <div className="container">
        
        <br />
        <div className="row">
        {pageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department name"
                  name="departmentName"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department description"
                  name="departmentDescription"
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                />
              </div>

              <button className="btn btn-success mb-2" onClick={saveDepartment}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Department;
