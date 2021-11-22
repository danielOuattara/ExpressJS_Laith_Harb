
const express = require('express');
const {v4: uuidv4} = require('uuid')


// todos array
const todos = [];


const app = express();

app.use(express.json());  // we need to parse json, to get data for the request

app.get('/', (req, res) => {
    return res.send('Hello Express !')
});

app.get('/todos', (req, res) => {
    return res.json(todos)
});

app.get('/todos/:todoId', (req, res) => {
    const itemToShow = todos.find((todo) => todo.id === req.params.todoId);
    if(itemToShow === undefined) {
        return res.json("item not found")
    } else {
        return res.json(itemToShow)
    }
});

app.post('/todos', (req, res) => {
    const { title } = req.body;
    const newTodo = {
        id: uuidv4(),
        title, 
        completed: false
    };
    todos.push(newTodo);
    return res.json({"message":` new todo --> ${title} added`,newTodo});
});

app.put('/todos/:todoId', (req, res) => {
    const itemToUpdate = todos.find((todo) => todo.id === req.params.todoId)
    if(itemToUpdate === undefined) {
        return res.json("item not found");
    } else {
        itemToUpdate.completed = ! itemToUpdate.completed
        return res.json({itemToUpdate, todos})
    }
});

app.delete('/todos/:todoId', (req, res) => {
    const itemToRemoveIndex = todos.findIndex((todo) => todo.id === req.params.todoId)
    if(itemToRemoveIndex === -1) {
        return res.json("item not found");
    } else {
        todos.splice(itemToRemoveIndex, 1)
        return res.json(todos)
    }
});

app.listen(3000, ()=> {
    console.log(`Server is running on port  3000`);
});