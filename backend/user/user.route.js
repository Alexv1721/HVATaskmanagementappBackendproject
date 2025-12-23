const express = require('express');
const router = express.Router();
const { createUser, loginUser,user,role } = require('./user.contoller');
const verifyToken=require('../middleware/verifyuser')
router.post('/register',createUser);
router.post('/login', loginUser);
router.get('/user',user)
router.get('/role',role)

module.exports = router;
