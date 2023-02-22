const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  firstName :{
    type : String
  },
  lastName :{
    type : String
  },
  age :{
    type : Number
  },
  phoneNumber :{
    type : Number
  },
  address :{
    type : String
  },
  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pass'
  },
})
const User = mongoose.model("user", userSchema)
 module.exports = User