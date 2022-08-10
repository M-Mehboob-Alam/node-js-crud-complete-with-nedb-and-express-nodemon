const express = require('express');
const router = express.Router();

const datastore = require('nedb');
const students = new datastore({filename: './database/students.db', autoload: true});

// get all students 
// Endpoint: api/v1/students
router.get('/api/v1/students/', async(req, res)=>{
    try{
        await students.find({}).exec(function(err, data){
            if(err){
                return res.status(500).json({
                    message: 'Error ' + err
                })
            }
            res.send(data);
        });

    }
    catch(error){
         res.status(500).json({
            message: 'Error in this function ' + error
        })
    }
});

// get one students 
// Endpoint: api/v1/students
router.get('/api/v1/students/:id', async(req, res)=>{
    try{
        await students.findOne({_id: req.params.id}).exec(function(err, data){
            if(err){
                return res.status(500).json({
                    message: 'Error ' + err
                })
            }
            if(data){
                res.send(data);
            }else{
                res.status(404).json({
                    message: "student not found"
                });
            }
            
        });

    }
    catch(error){
         res.status(500).json({
            message: 'Error in this function ' + error
        })
    }
});
// post students 
// Endpoint: api/v1/students
router.post('/api/v1/students/', async(req, res)=>{
    try{
        await students.insert(req.body,(err, data)=>{
            if(err){
                return res.status(500).json({
                    message: 'Error ' + err
                })
            }
            console.log('data inserted ', data);
            res.json({
                message: 'data inserted successfully',
                data: data
            });
        });

    }

    catch(error){
         res.status(500).json({
            message: 'Error in this function ' + error
        })
    }
});
// Delete a student 
// endpoint: api/vi1/id
router.delete('/api/v1/students/:id', async(req, res)=>{
    try{
        await students.remove({_id: req.params.id}, (err, data)=>{
            if(err){
                return res.status(500).json({
                    message: "Error "+ err
                });
            }
            if(data){
                res.json({
                    message: 'student record is deleted',
                });
            }else{
                res.status(404).json({
                    message: 'student not found',
                });
            }
          
        });
    }
    catch(error){
        res.status(500).json({
           message: 'Error in this function ' + error
       });
   }
});


// Update a student 
// endpoint: api/vi1/id
router.patch('/api/v1/students/:id', async(req, res)=>{
    try{
        await students.update({_id: req.params.id},req.body, {upsert: false} ,(err, data)=>{
            if(err){
                return res.status(500).json({
                    message: "Error "+ err
                });
            }
            if(data){
                res.json({
                    message: 'student record is updated',
                });
            }else{
                res.status(404).json({
                    message: 'student not found',
                });
            }
          
        });
    }
    catch(error){
        res.status(500).json({
           message: 'Error in this function ' + error
       });
   }
});

module.exports = router;