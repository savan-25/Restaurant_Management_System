const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/signup',async(req,res)=>
{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }catch(err)
    {
        res.status(400).send(err.message);
    }
});

module.exports = router;