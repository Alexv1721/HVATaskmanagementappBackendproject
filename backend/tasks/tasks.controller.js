const asyncErrorhandler = require('../utils/asyncErrorhandler');
const TaskService = require('./tasks.service');
const getAllTasks = asyncErrorhandler(
        async (req,res) => {
            const tasks = await TaskService.getAllTasks(req.user);
                return res.status(200).json({data:tasks});
            } 
)
module.exports = {
  getAllTasks
};
