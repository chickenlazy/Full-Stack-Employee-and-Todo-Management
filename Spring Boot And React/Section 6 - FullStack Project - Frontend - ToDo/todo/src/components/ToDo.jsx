import React, { useState, useEffect } from "react";
import { saveToDo, getToDoById, updateToDo } from "../services/ToDoService";
import { useNavigate, useParams } from "react-router-dom";

const ToDo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Sử dụng useEffect để lấy ToDo khi component được tạo
    if (id) {
      // Nếu có id, lấy ToDo từ API
      getToDoById(id)
        .then((response) => {
          const todo = response.data;
          setTitle(todo.title);
          setDescription(todo.description);
          setCompleted(todo.completed);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdate = async (e) => {
    e.preventDefault();

    // Kiểm tra xem title và description có giá trị hợp lệ không
    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    } else {
      setTitleError(""); // Reset titleError if title is provided
    }

    if (!description.trim()) {
      setDescriptionError("Description is required.");
      return;
    } else {
      setDescriptionError(""); // Reset descriptionError if description is provided
    }

    const todo = { title, description, completed };
    console.log(todo);

    try {
      if (id) {
        // Nếu có id, gửi yêu cầu cập nhật ToDo
        await updateToDo(id, todo);
      } else {
        // Ngược lại, gửi yêu cầu tạo mới ToDo
        await saveToDo(todo);
      }

      // Chuyển hướng sau khi lưu thành công
      navigate("/todos");
    } catch (error) {
      console.error("Error saving ToDo:", error);
    }
  };

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update ToDo</h2>
    ) : (
      <h2 className="text-center">Add New ToDo</h2>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdate}>
              <div className="mb-3">
                <label>Title:</label>
                <input
                  type="text"
                  className={`form-control ${titleError ? "is-invalid" : ""}`}
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError(""); // Reset titleError when the input changes
                  }}
                />
                {titleError && (
                  <div className="invalid-feedback">{titleError}</div>
                )}
              </div>

              <div className="mb-3">
                <label>Description:</label>
                <input
                  className={`form-control ${
                    descriptionError ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescriptionError(""); // Reset descriptionError when the input changes
                  }}
                />
                {descriptionError && (
                  <div className="invalid-feedback">{descriptionError}</div>
                )}
              </div>

              <div className="mb-3">
                <label>Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value === "true")}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
