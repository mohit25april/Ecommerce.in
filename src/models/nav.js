const mongoose = require("mongoose");
const nav =  mongoose.Schema({
    imageUrl: String,
    label: String,
    Url: String
})

module.exports =mongoose.model("nav", nav)