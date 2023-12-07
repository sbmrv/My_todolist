import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/config";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/read`, {
        headers: {
          token: token,
        },
      });
      const todoz = response.data;
      setTodos(todoz);
    } catch (err) {
      console.error("error in fetching todoz", err);
    }
  };
  useEffect(() => {
       if (token) {
         fetchTodos();
       }
  }, [token]);

  const handleAddTodo = async () => {
    if (!newTodo) return; // Check if newTodo is empty
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        {
          task: newTodo,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  const handleEditTodo = async (todo) => { 
    try{
      console.log(todo._id);
      console.log(todo.task);
      setEditTodo(todo.task)
    }catch (error) {
      console.error("Error adding todo:", error);
  }
}
  const handleUpdateTodo = async (todo) => {
    try{
      
      console.log(todo._id); 
      const response = await axios.post(`${API_URL}/update?id=${todo._id}`,
        {
          task: newTodo,
        },
        {
          headers: {
          token: token,
        }
        }
      );
      console.log(response);
     fetchTodos();
    }catch (error) {  
      console.error("Error updating todo:", error);
    }
  };
  const handleDeleteTodo = async (todo) => {
    try {
      console.log(todo._id);
      const response = await axios.get(`${API_URL}/delete?id=${todo._id}`, {
        headers: {
          token: token,
        },
      });
      console.log(response);
     fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const deleteAllTodo = async () => {
    try {
      const response = await axios.get(`${API_URL}/deleteall`, {
        headers: {
          token: token,
        },
      });
      console.log(response);
     fetchTodos();
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };
    const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
    };
  return (
    <div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h1>Todo list</h1>
      <div className="apptodo">
        <div className="container">
          <div className="addtodo">
            <input
              type="text"
              name="newtodo"
              value={newTodo || editTodo }
              onChange={(event) => setNewTodo(event.target.value)}
              style={{
                borderRadius: "10px",
                border: "1px solid grey",
                width: "75%",
                fontSize: "1.2rem",
                color: "grey",
                boxSizing: "border-box",
                padding: " 0 20px",
              }}
            />
            <button onClick={handleAddTodo}>Add</button>
          </div>
          <div style={{ marginTop: "20px" }}>
            {todos.map((todo) => (
              <li key={todo._id} style={{ listStyle: "none" }}>
                <div className="_todoDiv">{todo.task}</div>

                <div className="_btn-group">
                  <div
                    className="_btn"
                    onClick={() => handleEditTodo(todo)}
                    style={{
                      backgroundColor: "orange",
                      textAlign: "center",
                    }}
                  >
                    edit
                  </div>
                  <div
                    className="_btn update_btn"
                    onClick={() => handleUpdateTodo(todo)}
                    style={{
                      backgroundColor: "skyblue",
                      textAlign: "center",
                    }}
                  >
                    update
                  </div>
                  <div
                    className="_btn"
                    onClick={() => handleDeleteTodo(todo)}
                    style={{
                      backgroundColor: "#B60016",
                      textAlign: "center",
                    }}
                  >
                    X
                  </div>
                </div>
              </li>
            ))}
          </div>
          <br />
          <button
            onClick={deleteAllTodo}
            style={{ backgroundColor: "#B60016", marginLeft: "70%" }}
          >
            delete all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
