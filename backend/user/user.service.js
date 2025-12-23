const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const  {findUserByEmail}=require('./user.db')
const  {createNewUser}=require('./user.db');
const { AppError,NotfoundError } = require('../utils/custom.err');
const globalError = require('../utils/Globalerror');
const UserService = {
    createUser: async (username, email, password,role='normal') => {
        try { 
            if(username==undefined){
        
                throw new AppError('Username is required')
            }
            if(email=='' || email==undefined){
                throw  new AppError('Email is required')
            }

            const exist = await findUserByEmail(email);
            if (exist) {
                throw new AppError('User already exists, please login');
            }

            const newUser = await createNewUser(username, email, password,role);
            return newUser;

        } catch (error) {
            throw error
        }
    },
    loginUser: async (email, password) => {
        try {
            const user = await findUserByEmail(email);
            if (!user) {
                throw new AppError('Invalid email. Try again.');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new AppError('Invalid password');
            }
            const token = jwt.sign({ email }, 'abcd');        
            const u={role:user.role,email:user.email,username:user.username}    
            return { token, u};
        } catch (error) {
            throw error
        }
    },
    getuser:async(token)=>{
        const secretkey='abcd'
        if (!token) {
throw new AppError('No token provided',401)
          }
        
          try {
            const tk = jwt.verify(token, process.env.SECRET_KEY || secretkey);
            const user = await findUserByEmail(tk.email );
            if (!user) {
                throw new AppError('No user found') 
            }
            return user
          } 
          catch (err) {
            console.log(err);
            
            throw new AppError('No user found')
          }
    }
    ,getrole:async(token)=>{
        const secretkey='abcd'
        if (!token) {
throw new AppError('No token provided',401)
          }
        
          try {
            const tk = jwt.verify(token, process.env.SECRET_KEY || secretkey);
            const user = await findUserByEmail(tk.email );
            if (!user) {
                throw new AppError('No user found') 
            }
            return user.role
          } 
          catch (err) {
            console.log(err);
            
            throw new AppError('No user found')
          }
    }
};

module.exports = UserService;
