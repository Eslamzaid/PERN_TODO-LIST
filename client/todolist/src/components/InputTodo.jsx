import { useState } from "react";

function InputTodo() {
  const [description, setDesc] = useState("");
  const [message, setMessage] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
      setMessage(true);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">PERN Todo-list</h1>
      {message ? (
        <p className="text-center text-bg-light">Your todo has been add!</p>
      ) : (
        ""
      )}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control mr-4"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="btn btn-success" disabled={description.length === 0}>
          Add
        </button>
      </form>
    </>
  );
}

export default InputTodo;
