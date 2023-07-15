const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (e) {
    throw e;
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo);
  } catch (e) {
    throw e;
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );

  res.json(updateTodo);
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo is deleted!");
  } catch (e) {
    throw e.message;
  }
});
// create a todo

// gat all todos

// update a todo

// delete a todo

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
