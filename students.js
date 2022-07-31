const express = require('express');
const router = express.Router();

// connecting to the db
const datastore = require('nedb');
const students = new datastore({filename: 'database/students.db', autoload: true});


// Get api for students data
// Endpoint: localhost:4300/api/v1/students
router.get('/', async(req, res)=>{
    try{
        await students.find({}).exec(function(err, data){
            if(err){
                res.status(500).json({
                    message: 'Error '+ err
                });
            }
            res.send(data);
        });
    }
    catch(error){
        res.status(500).json({
            message: 'error in this function '+ error
        });
    }
});

// post the student data
router.post('/', async(req, res)=>{
    try{
        await students.insert(req.body, (err, data)=>{
            if(err){
                res.status(500).json({
                    message: 'Error '+ err
                });
            }

            console.log('inserted student', data);
            return res.json({
                message: 'student data added successfully',
                student_id : data._id
            });
        });
    }
    catch(error){
        res.status(500).json({
            message: 'error in this function '+ error
        });
    }
    
});



// remove student data 
router.delete('/:id', async(req, res)=>{
    try{
        await students.remove({_id: req.params.id}, (err, deletedata)=>{
            if(err)
            {
                return res.status(500).json({
                    message: 'Error ' + err
                });
            }

            if(deletedata){
                return res.json({
                    message : 'student removed successfully',
                    student_id : req.params.id
                });
            }
            res.status(404).json(
                {
                    message : 'not found this student ' + req.params.id 
                }
            )
           
        });
    }

    catch(error){
        res.status(500).json({
            message: 'error in this function '+ error
        });
    }
});

module.exports = router