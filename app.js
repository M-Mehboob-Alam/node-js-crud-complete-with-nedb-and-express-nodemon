const express = require('express');
const app = express();
const port = 4300;
const students = require('./students');
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended: true}));

app.get('/api/v1/test/' , function(req, res){
    res.send('Node Crud is running now');
    
});
// including students module 
app.use('/', students);
app.listen(port, ()=>{console.log('app is running now')});
