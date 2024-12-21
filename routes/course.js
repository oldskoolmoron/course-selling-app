const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/purchase", (req, res)=>{

})

courseRouter.get("/preview", (req, res)=> {
  //in the real world you would expect money interference


})

module.exports = {
  courseRouter: courseRouter
}