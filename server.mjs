import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

let todos = []

app.get('/todos', (req, res) => {
    res.json(todos);
})

app.post('/submit', (req, res) => {
    if (!req.body.todo) {
        res.status(400).send("invalid data");
    } else {
        todos.push({
            todo: req.body.todo
        });
        res.send('Todo Submitted!!');
    }
})

app.listen(port, () => {
    console.log(`Express started on: http://localhost:${port}`);
})