// const express = require("express");
// const Router = express.Router;

// const userRouter = Router(); or 
require('dotenv').config();


const express = require("express");
const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();
// userRouter.use(express.json());

const requiredBody = z.object({
  email:z.string()
  .min(3,{message:"Email must be at least 3 characters long"})
  .max(100,{message:"Email cannot exceed 100 characters"})
  .email({message:"Must be a valid email address"})
  .refine((value)=> value.endsWith("@mail.com"),{
    message:"Email must end with @mail.com"
  }),
  password: z
  .string()
  .min(8, {message:"Password must be at least 8 characters long"})
  .max(15, {message:"Password cannot exceed 15 characters"})
  .regex(/[A-Z]/, { message:"Password must contain at least one uppercase"})
  .regex(/[a-z]/, {message:"Password must contain at least one lower case"})
  .regex(/[0-9]/, {message:"Password must contain at least one number"})
  .regex(/[@#!$?&]/, {message:"Password must contain at least 1 special character"}),
  firstName:z
  .string()
  .min(3,{message:"First Name must be at least 3 characters long"})
  .max(100, {message:"Name cannot exceed 100 characters"}),
  lastName: z
  .string()
  .min(3,{message:"Last Name must be at least 3 characters long"})
  .max(100,{message:"Name cannot exceed 100 characters"})
})

userRouter.post("/signup",async (req, res)=>{
  
  const parsedDatawithSuccess = requiredBody.safeParse(req.body);
  if(!parsedDatawithSuccess.success){
    res.json({
      message:"Incorrect format",
      error:parsedDatawithSuccess.error
    })
    return 
  }
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try{
    const ifuseralreadyExist = await userModel.findOne({email:email});
    if(ifuseralreadyExist){
      return res.json({
        message:"user already exists!"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email,
      password:hashedPassword,
      firstName,
      lastName
    })
    return res.json({
      message:"You're signup!"
    })
  }
  catch(e){
    return res.status(500).json({
      message:"An error occured",
      error: e.message
    })
  }
});

userRouter.post("/signin",async function(req, res){
  const { email, password } = req.body;

try {
  const user = await userModel.findOne({ email: email});
  if(!user){
    res.json({
      message: "Incorrect Credentials :("
    })
    return
  }
  // console.log("Provided password:", password);
  // console.log("Stored hashed password:", user.password);

  const ispasswordValid = await bcrypt.compare(password, user.password);
  if(ispasswordValid){
    const token = jwt.sign({
      id: user._id
    },process.env.JWT_USER_SECRET);
    //Alternatives: Use cookies or session based authenticatio
    return res.json({
      token:token
    })
  }else{
    return res.status(403).json({
      message:"Incorrect Credentials :("
    })
  }
  
}catch(error){
  console.error(error);
  res.status(500).json({
    message:"An error occured during signin"
  })
}

})

userRouter.get("/purchases", (req, res)=>{

})

module.exports = {
  userRouter: userRouter
}