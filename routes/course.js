const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { purchaseModel,courseModel } = require("../db");
const jwt = require("jsonwebtoken");


courseRouter.get("/purchase",userMiddleware,async (req, res)=>{
  const userId = req.userId;
  const courseId =req.body.courseId;
  //One thing left is that I also need to add a checkpoint to verify that the user has actually paid the price.
  await purchaseModel.create({
    userId,
    courseId
  })
  res.json({
    message:"Your have successfully bought the course"
  })
})

courseRouter.get("/preview",async(req, res) =>{
  const courses= await courseModel.find({});
  res.json({
    courses
  })
})


module.exports = {
  courseRouter: courseRouter
}