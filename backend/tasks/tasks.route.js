const router = require('express').Router();
const {  getAllTasks} = require('./tasks.controller');  
const verifyToken = require('../middleware/verifyuser');

 router.get('/tasks', verifyToken,getAllTasks);
module.exports=router
