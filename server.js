const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/', express.static(__dirname + '/static'));

let todos = []

app.get('/todos', (req, res) => {
    console.log(todos)
    res.json(todos);
})

app.post('/submit', (req, res) => {
    if (!req.body.todo) {
        res.status(400).send("invalid data");
    } else {
        todos.push({
            name: req.body.name,
            todo: req.body.todo
        });
        res.send('Todo Submitted!!');
    }
})

app.put('/updateTodo', (req, res) => {
    if (!req.body) {
        res.status(400).send("invalid data");
    } else {
        let index;
        todos.map((v, i) => {
            if (v.name === req.body.name && v.todo === req.body.oldTodo) {
                todos[i] = { name: req.body.name, todo: req.body.newTodo };
                index = i;
            }
        })
        res.json(todos[index]);
    }
})

app.delete('/deleteTodo', (req, res) => {
    if (!req.body) {
        res.status(400).send("invalid data");
    } else {
        todos.map((v, i) => {
            if (v.name === req.body.name && v.todo === req.body.todo) {
                todos.splice(i, 1);
            }
        })
        res.send("Todo deleted!!");
    }
})

app.delete('/deleteAll', (req, res) => {
    if (!req.body) {
        res.status(400).send("invalid data");
    } else {
        todos = todos.filter(v => v.name != req.body.name);
        res.send("Todos Deleted!!");
    }
})

app.listen(port, () => {
    console.log(`Express started on: http://localhost:${port}`);
})