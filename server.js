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


//path parameters
app.get('/hello/:name1/:name2', (req, res) => {
    console.log(req.params)
    res.json({
        message: `Hello ${req.params.name1}, ${req.params.name2}`
    });
});






const port = 3000;
app.listen(port, () => {console.log(`Listening on port ${port}`)})

