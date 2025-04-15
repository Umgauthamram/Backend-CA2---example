const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

let users = [];
let currentId = 1;

app.get("/", (req, res) => {
  res.send("<h1>Hello, server is running.</h1>");
});

app.post("/post", (req, res) => {
  const newUser = { id: currentId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/get", (req, res) => {
  res.json(users);
});

app.put("/put/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
