// const express = require("express");
// const Router = express.Router;

// const userRouter = Router(); or 
const { Router } = require("express");

const userRouter = Router();

userRouter.post("signup", (req, res)=>{

})

userRouter.post("/signin", (req, res)=>{

})

userRouter.get("/purchases", (req, res)=>{

})

module.exports = {
  userRouter: userRouter
}