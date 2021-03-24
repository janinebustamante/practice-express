const mongoose = require('mongoose');

//schema of todo
//message-string, done-boolean, createdAt-string
const todoSchema = new mongoose.Schema({
    message: String,
    done: Boolean,
    createdAt: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;