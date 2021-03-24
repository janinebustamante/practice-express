const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');


//create todo that takes a message from body
router.post('/', (req, res) => {
    const message = req.body.message;    
    const currentDate = new Date();
    const createdAt = currentDate.toISOString();

    let newTodo = new Todo({
        message: message,
        done: false,
        createdAt: createdAt
    })

    newTodo.save((err, savedTodo) => {
        if (err) return console.error(err);
        return res.status(201).json({
            data: savedTodo
        })
    })
})



//get all todos
router.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: todos
        })
    })
});



//return 1 todo using id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: todo
        })
    })
});



//delete todo using id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id, (err) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: "Todo deleted"
        })
    })
});



//update message
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const message = req.body.message;
    Todo.findById(id, (err, todo) => {
        if(err) return console.error(err);
        todo.message = message
        todo.save((err, updatedTodo) => {
            if (err) return console.error(err);
            return res.status(200).json({
                data: updatedTodo
            })
        })
    })
});





module.exports = router;