require('dotenv').config();

const express = require("express");
const { createUserRoutes, userRouter } = require('./routes/user');
const { createCourseRoutes, courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {})
.then(()=>{
  console.log("connected to MongoDB");
}).catch((error)=>{
  console.error("MongoDB connection error:", error.message);
})

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
  
app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})

