const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");
const { User } = require("../models/");


// authentication middleware
const authenticateUser = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);
  
    const users = await User.findAll();
    // users = users.map(user => user.get({plain: true}))
    // console.log(users.map(u => u.password))
  
    if (credentials) {
      // console.log(credentials)
      const user = users.find((u) => u.emailAddress === credentials.name);
      // console.log(user.firstName)
      if (user) {
        const authenticated = bcryptjs.compareSync(
          credentials.pass,
          user.password
        );
        // console.log(authenticated)
        if (authenticated) {
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${credentials.name}`;
        }
      } else {
        message = `User not found for username: ${credentials.name}`;
      }
    } else {
      message = "Auth header not found";
    }
  
    if (message) {
      console.warn(message);
      res.status(401).json({ message: "Access Denied" });
    } else {
      next();
    }
  };

module.exports = authenticateUser;