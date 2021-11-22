
const router = require('express').Router()
const {v4: uuidv4} = require('uuid')
const checkAuth = require('./../middleware/checkAuth');

const todos = [];


router.get('/', checkAuth, (req, res) => {
    return res.json(todos)
});

router.get('/:todoId', checkAuth, (req, res) => {
    const itemToShow = todos.find((todo) => todo.id === req.params.todoId);
    if(itemToShow === undefined) {
        return res.json("item not found")
    } else {
        return res.json(itemToShow)
    }
});

router.post('/', checkAuth, (req, res) => {
    const { title } = req.body;
    const newTodo = {
        id: uuidv4(),
        title, 
        completed: false
    };
    todos.push(newTodo);
    return res.json({"message":` new todo --> ${title} added`,newTodo});
});

router.put('/:todoId', checkAuth, (req, res) => {
    const itemToUpdate = todos.find((todo) => todo.id === req.params.todoId)
    if(itemToUpdate === undefined) {
        return res.json("item not found");
    } else {
        itemToUpdate.completed = ! itemToUpdate.completed
        return res.json({itemToUpdate, todos})
    }
});

router.delete('/:todoId', checkAuth, (req, res) => {
    const itemToRemoveIndex = todos.findIndex((todo) => todo.id === req.params.todoId)
    if(itemToRemoveIndex === -1) {
        return res.json("item not found");
    } else {
        todos.splice(itemToRemoveIndex, 1)
        return res.json(todos)
    }
});

module.exports = router;