const mongoose = require("mongoose")
var placeSchema = new mongoose.Schema({
    address: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    requiredPassLevel: {
        type: Number,
        required : true
    },
    requiredAgeLevel: {
        type: String,
        required : true
    }
})
const Place = mongoose.model("place", placeSchema)
module.exports = Place