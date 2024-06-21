import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    lastname : {
        type: String,
    },
    password:{
        type: String,
        required: true
    },
    passwordRepeat : {
        type: String,
        required: true
    },
    phone:{
        type: Number,
    },
    role : {
        type:String,
        enum : ["user","admin"],
        default: "user"
    },
    user_direction : {
        type: String
    },
    user_favorites : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }],
})

const userModel = mongoose.model("users",userSchema);

export default userModel;