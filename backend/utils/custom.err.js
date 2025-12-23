
class AppError extends Error {
    constructor(msg, statusCode = 400) {
      super(msg);
      this.statusCode = statusCode;
      this.isOperational = true; 
    }
  }
  module.exports = AppError;
  


module.exports={AppError}

