import {Schema , model} from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true,
        index : true  // when we need to search user by username , it will be fast  many indexing also create problem
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password :{
        type : String, // hased password
        required : true,
        trim: true
    }, 
    fullName :{
        type : String,
        required : true
    },
    avatar : {
        type : String,   //cloudinary url
        default : null
    },
    coverImage : {
        type : String,   //cloudinary url
    },
    refreshtoken : {
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ]


}, {timestamps : true})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
})

userSchema.methods.isPasswordMatch = async function(plainPassword){
    return await bcrypt.compare(plainPassword , this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        username : this.username,
        email : this.email
    }, 
    process.env.ACCESS_TOKEN,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
        username : this.username,
        email : this.email
    },
    process.env.REFRESH_TOKEN ,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    }
)
} 
const User = model("User" , userSchema)
export {User}
