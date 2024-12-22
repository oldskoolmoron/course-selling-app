// const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose
const ObjectId = mongoose.Types.ObjectId;
// const { stringify } = require('querystring');


const userSchema = Schema({
  email: { type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String
});

const adminSchema = Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String
});

const courseSchema = Schema({
  title:String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId
});

const purchaseSchema = Schema({
  courseId: String,
  userId: ObjectId

});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}
