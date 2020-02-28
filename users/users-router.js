const bcrypt=require('bcryptjs');
const express = require('express');
const restricted=require('../auth/authenticate-middleware')
const router = express.Router();

const Users=require("./users-model");



router.get('/hash', (req,res)=>{
    const authentication=req.headers.authentication;
  
  
    const hash=bcrypt.hashSync(authentication, 8);
  
  
    res.json({originalValue: authentication , hashedValue:hash})
})



//GET ALL USERS
router.get('/users',restricted, (req, res) => {
    Users.find().then(user=>{
        res.status(200).json(user);
    }).catch(err=>{
        res.status(500).json({errorMessage:'Something Went Wrong'})
    })
});
//GET USER BY ID
router.get('/users/:id', restricted, (req, res) => {
    const { id } = req.params;
    Users.findById(id).then(user=>{
        res.status(200).json(user);
    }).catch(err=>{
        res.status(500).json({errorMessage:'Something Went Wrong'})
    })
});

  
  //PUT (EDIT ACTION) 

router.put('/users/:id', (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params;
    Users.update(id,actionInfo).then(user=>{
        res.status(201).json(user);
    }).catch(err=>{
        res.status(500).json({errorMessage:'ERROR'})
    })
  });
  

//DELETE ACTION 
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    Users.remove(id).then(user=>{
        res.status(201).json(user);
    }).catch(err=>{
        res.status(500).json({errorMessage:'FAILED TO DELETE'})
    })
});


  
  module.exports = router;