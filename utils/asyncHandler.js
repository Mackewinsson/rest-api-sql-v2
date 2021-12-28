/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        console.error(error)
        next(error);
      }
    };
  }

module.exports = asyncHandler;