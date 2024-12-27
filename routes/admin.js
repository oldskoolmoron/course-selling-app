require('dotenv').config();


const { Router } = require('express');
const adminRouter = Router();
const { adminModel, userModel, courseModel } = require("../db");
const { requiredBody } = require("./user");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middleware/admin');


adminRouter.post('/signup', async (req, res) => {
  const parsedDatawithSuccess = requiredBody.safeParse(req.body);
  // console.log(parsedDatawithSuccess);
  if(!parsedDatawithSuccess.success){
    res.json({
      message:"Incorrect format",
      error:parsedDatawithSuccess.error
    })
    return  
  }
  else{
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    try{
      const ifuseralreadyexist = await adminModel.findOne({email: email});
      if(ifuseralreadyexist){
        return res.json({
          message:"user already exists!"
        })
      }else{
        const hashedPassword = await bcrypt.hash(password, 5);
        await adminModel.create({
          email,
          password:hashedPassword,
          firstName,
          lastName
        })
        return res.json({
          message:"You are signed up!"
        })
      }
    }catch(error){
      return res.status(500).json({
        message:"An error occured :(",
        error:error.message
      })
    }
  }
})

adminRouter.post('/signin',async (req, res) =>{
  const { email , password } = req.body;
  try{
    const admin = await adminModel.findOne({email:email});
    if(!admin){
      res.json({
        message:"Incorrect credentials!"
      })
      return 
    }
    const ispasswordValid = await bcrypt.compare(password, admin.password);
    if(ispasswordValid){
      const token = jwt.sign({
        id: admin._id
      },process.env.JWT_ADMIN_SECRET);
      return res.json({
        message:"Successfully signed in",
        token:token
      })
    }else{
      res.status(403).json({
        message:"Incorrect credentials :("
      })
    }
  }catch(error){
    return res.status(500).json({
      message:"An error occured during signin!",
      error:error.message
    })
  }
})

adminRouter.post('/createCourses',adminMiddleware,async function(req, res){
  const adminId = req.userId;
  const {title , description, imageUrl, price} = req.body;
  // const course = await courseModel.findOne({
  //   _id: courseId,
  //   creatorId: adminId
  // })
  // if(!course){

  // }
  //creating a web3 saas 
  const course = await courseModel.create({
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price,
    creatorId:adminId
  })
  res.json({
    message:"Course created",
    course:course._id
  })
})

adminRouter.get('/course/bulk',adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId :adminId
  });
  res.json({
    message:"course retrieved",
    courses
  })
})

adminRouter.put('/updatecourse', adminMiddleware, async (req, res) => {
  try {
    const adminId = req.userId; // Verify this is being set correctly
    const { title, description, imageUrl, price, courseId } = req.body;

    // Log input for debugging
    console.log("Request body:", req.body);
    console.log("Admin ID:", adminId);

    // Attempt to find and update the course
    const course = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId }, // Match by course ID and creator ID
      { title, description, imageUrl, price }, // Update fields
      { new: true } // Return the updated document
    );

    if (!course) {
      // Course not found or user not authorized
      return res.status(404).json({
        message: "Course not found or not authorized to update",
      });
    }

    res.json({
      message: "Course Updated",
      courseId: course._id,
      updatedCourse: course, // Include updated course details in response
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({
      message: "An error occurred while updating the course",
      error: error.message,
    });
  }
});



module.exports = {
  adminRouter: adminRouter
}