const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({


    name:String,
    age:String,
    username:String,
    email:String,
    password:String,
    conformpassword:String,
    admin: Number
})

// UserSchema.pre("save", async function (next){
//     console.log(`the current password is ${this.password}`)

//     this.password =await bcrypt.hash(this.password, 10);

//     console.log(`the current password is ${this.password}`)
//     next()
// })

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.password)
    return result
    }


const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel