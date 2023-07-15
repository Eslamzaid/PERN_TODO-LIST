import { useState } from "react";

function EditTodo({ todo }) {
  const [description, setdescription] = useState(todo.description);

  const updatedescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        onClick={() => setdescription(todo.description)}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel4"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel4">
                Edit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setdescription(todo.description)}
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="edit">Edit Todo</label>
              <input
                type="text"
                id="edit"
                name="edit"
                className="form-control"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setdescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => updatedescription(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
