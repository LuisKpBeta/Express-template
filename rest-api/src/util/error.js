const createError = (message, statusCode, details = []) => {
  let error;
  if (!message) {
    error = new Error('Something went Wrong. Please contact us.')
  } else {
    error = new Error(message)
  }
  if (!statusCode) {
    error.statusCode = 500;
  } else {
    error.statusCode = statusCode;
  }

  error.details = details.map(detail => {
    return { param: detail.param, message: detail.msg}
  });
  
  return error;
};

exports.createError = createError;