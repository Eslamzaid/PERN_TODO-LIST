import { useEffect, useState } from "react";
import EditTodo from "./editTodo";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  //! change this to use .push instead of window.location 
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch("http://localhost:5000/todos/" + id, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, ind) => (
            <tr key={ind}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo}/></td>
              <td>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListTodos;
