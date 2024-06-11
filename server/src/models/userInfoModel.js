import mongoose from "mongoose";

const userInfoSchema  = new mongoose.Schema({
    username : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    email : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    password:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    role : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    user_direction : {
        type: String
    },
    user_favorites : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }],

})

const userInfoModel = mongoose.model("usersInfo",userInfoSchema);

export default userInfoModel;