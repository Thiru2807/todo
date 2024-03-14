const express = require('express');
const cors = require('cors');
const pool = require("./database");
const userRoutes = require("./auth");
const userTodo = require("./todo")

const app = express();

app.use(express.json());
app.use(cors());

// Mounting user routes
app.use(userRoutes);
app.use(userTodo);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
