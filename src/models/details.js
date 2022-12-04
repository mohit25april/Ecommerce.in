const mongoose = require ("mongoose");
const detail= mongoose.Schema({
    name:String,
    address:String,
    pincode:String,
    mail:String,
    payment:String,
    number:String

})
    module.exports= mongoose.model("detail",detail)
