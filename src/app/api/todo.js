// pages/api/todos.js
let todos = [];
 
export default function handler(req, res) {
  if (req.method === "GET") {
    res.json(todos);
  } else if (req.method === "POST") {
    const { task } = req.body;
    todos.push({ id: Date.now(), task });
    res.json(todos);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    todos = todos.filter((todo) => todo.id !== Number(id));
    res.json(todos);
  }
}