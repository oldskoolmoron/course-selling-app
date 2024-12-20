const express = require("express");
const { createUserRoutes } = require('./routes/user');
const { createCourseRoutes } = require('./routes/course');
const app = express();

const jsonwebtoken = require('jsonwebtoken');

app.use("/user")



app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})

