const { NotfoundError, AppError } = require('../utils/custom.err');
const { getAllTasksFromDB } = require('./tasks.db');
const TasksService = {
getAllTasks: async (user) => {
        try {
            const tasks = await getAllTasksFromDB(user);
        return tasks;
    } catch (error) {
            throw new AppError('Error in get products')
        }
    }

}

module.exports = TasksService;
