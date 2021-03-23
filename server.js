const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
const mongoConnection = require('./config').mongoConnection

mongoose.connect(mongoConnection, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
}); 

let db = mongoose.connection;

db.on('error', (console.error.bind(console, 'connection error: '))); 
db.once('open', () => console.log("We're connected to our database."));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



//schema of todo
//message-string, done-boolean, createdAt-string
const todoSchema = new mongoose.Schema({
    message: String,
    done: Boolean,
    createdAt: String
});

const Todo = mongoose.model('Todo', todoSchema);



//path parameters
app.get('/hello/:name1/:name2', (req, res) => {
    console.log(req.params);
    res.json({
        message: `Hello ${req.params.name1}, ${req.params.name2}`
    });
});


//query parameters
app.get('/hi', (req,  res) => {
    console.log(req.query);
    res.json({
        message: `Hi ${req.query.firstName} ${req.query.lastName}`
    })
})



//create todo that takes a message from body
app.post('/todos', (req, res) => {
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
app.get('/todos', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: todos
        })
    })
});



//return 1 todo using id
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: todo
        })
    })
});



//delete todo using id
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id, (err) => {
        if (err) return console.error(err);
        return res.status(200).json({
            data: "Todo deleted"
        })
    })
});



//update message
app.put('/todos/:id', (req, res) => {
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


const port = 3000;
app.listen(port, () => {console.log(`Listening on port ${port}`)})


