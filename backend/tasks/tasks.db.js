const AppError = require('../utils/custom.err');
const Tasks= require('./tasks.model'); 

      const getAllTasksFromDB = async (user) => {
try {
    if (user.role === "admin") {
      return await Tasks.find();
    }
  const tasks = await Tasks.find({ user: String(user._id) });
   console.log(tasks);
   
   return tasks
  } catch (error) {
    throw new AppError("Error fetching tasks", 500);
  }
};

module.exports = {getAllTasksFromDB}
