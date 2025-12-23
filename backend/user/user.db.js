
const User = require('./user.model');

const findUserByEmail = async (email) => {
        const user = await User.findOne({email:email});
        return user;
};

const createNewUser = async (username, email, password,role='normal') => {
    try {
        
        const u={
            username:username,
            email:email,
            password:password,
            role:role
        }
        const user = await User.create(u)
        return user;
    } catch (error) {
        throw new Error('User creation failed');
    }
};
module.exports={findUserByEmail,createNewUser }