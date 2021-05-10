// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    // console.log(req);
    // console.log(res);
    if (req.user) {
      console.log("Access Granted");
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    console.log("Permission Denied - Please Login");
    return res.status(401).json(false);
  }