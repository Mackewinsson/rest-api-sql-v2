const { Sequelize } = require("sequelize");


// Testing the connection to sqlite
const sequelize = new Sequelize("sqlite::memory:");
const testconection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = testconection;