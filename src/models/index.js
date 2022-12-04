const mongoose = require("mongoose");
const flipkart = mongoose.Schema({
    imageUrl:String,
    name:String,
    brand:String,
    price:String,
    description:String,
    category:String
})


module.exports=mongoose.model("flipkart",flipkart)