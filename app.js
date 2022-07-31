// including  express
const express = require('express');
// making contructor or initiating
const app = express();

// port
const port = 4300;
// including student module file
const students = require('./students');

// limiting response json not receiving response waiting
app.use(express.json({limit: "54mb"}));
// for understanding json format for node js
app.use(express.urlencoded({extended:true}));


// included students endpoint
app.use('/api/v1/students', students);
app.listen(port, function(){
    console.log('server is running now');
})