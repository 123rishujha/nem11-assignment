const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type:String,require},
    email: {type:String,require},
    gender: {type:String,require},
    password: {type:String,require},
    age: {type:Number,require},
    city: {type:String,require},
    is_married: {type:Boolean,require}
},{
    versionKey:false
})


const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}