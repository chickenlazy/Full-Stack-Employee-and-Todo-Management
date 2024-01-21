import React, { useState, useEffect } from 'react';
import { getAllTodo, deleteToDo, completeToDo, inCompleteToDo } from '../services/ToDoService';  // Thay thế đường dẫn tới file api của bạn
import { useNavigate } from 'react-router-dom';
const ListToDo = () => {
  const [toDos, setToDos] = useState([]);
  const navigate = useNavigate();

  const fetchToDos = () => {
    // Gọi hàm getAllTodo để lấy danh sách to-do
    getAllTodo()
      .then(response => {
        // Cập nhật state với dữ liệu từ API
        setToDos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  useEffect(() => {
    // Gọi hàm getAllTodo khi component được mount
    getAllTodo()
      .then(response => {
        // Cập nhật state với dữ liệu từ API
        setToDos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);  // [] đảm bảo useEffect chỉ chạy một lần khi component mount


  const addNewTodo = () => {
    navigate('/add-todo');
  }

  const updateToDo = (id) => {
    console.log(id);
    navigate(`/update-todo/${id}`);
    
  }

  const Delete = (id) => {
    // Gọi hàm deleteToDo để xóa to-do
    deleteToDo(id)
      .then(() => {
        // Sau khi xóa thành công, gọi lại hàm fetchToDos để cập nhật danh sách
        fetchToDos();
      })
      .catch(error => {
        console.error('Error deleting ToDo:', error);
      });
  }

  const Complete = (id) => {
    completeToDo(id)
    .then(() => {
      fetchToDos();
    })
    .catch(error => {
      console.error('Error Complete ToDo:', error);
    });
  }

  const inComplete  = (id) => {
    inCompleteToDo(id)
    .then(() => {
      fetchToDos();
    })
    .catch(error => {
      console.error('Error In Complete ToDo:', error);
    });
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Todo</h2>
      <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add</button>
      <div>
        <br />
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {toDos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateToDo(todo.id)} >Update</button>
                  <button className='btn btn-danger' style={{marginLeft: 6}} onClick={() => Delete(todo.id)} >Delete</button>
                  <button className='btn btn-success' style={{marginLeft: 6}} onClick={() => Complete(todo.id)} >Complete</button>
                  <button className='btn btn-info' style={{marginLeft: 6}} onClick={() => inComplete(todo.id)} >In Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListToDo;
