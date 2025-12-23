const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    res.status(statusCode).json({
      success: false
      ,statusCode:statusCode,
      message: err.message,
    });
  };
  module.exports = globalError;
  