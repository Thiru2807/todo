const express = require('express');
const cors  = require('cors');
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());
const router = express.Router();

router.get("/gettodo", (req, res) => {
    pool.query('SELECT * FROM todo;')
        .then((response) => {
            console.log('Todo list retrieved successfully');
            console.log(response.rows);
            res.json(response.rows); // Sending the todo items as JSON
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error retrieving todo list");
        });
});

router.post("/addtodo", (req,res) => {
    const title = req.body["title"];

    console.log("Todo List Title is " + title);

    const insertSTMT = `INSERT INTO todo (title) VALUES ('${title}');`;

    pool.query(insertSTMT).then((response)=>{
        console.log('Data Inserted');
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    console.log("Response is"+req.body);
    res.send("Responce received : " + req.body);
});

router.put("/updatetodo/:id", (req, res) => {
    const todoId = req.params.id;
    const complete = req.body.complete;

    const updateSTMT = `UPDATE todo SET complete = ${complete} WHERE id = ${todoId};`;

    pool.query(updateSTMT)
        .then((response) => {
            console.log('Todo item updated successfully');
            console.log(response);
            res.send("Todo item updated successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating todo item");
        });
});

router.delete("/deletetodo/:id", (req, res) => {
    const todoId = req.params.id;

    const deleteSTMT = `DELETE FROM todo WHERE id = ${todoId};`;

    pool.query(deleteSTMT)
        .then((response) => {
            console.log('Todo item deleted successfully');
            console.log(response);
            res.send("Todo item deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting todo item");
        });
});

module.exports = router;