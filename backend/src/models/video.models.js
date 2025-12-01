import {Schema , model} from 'mongoose'
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFileUrl : {
        type : String,          //cloudinary url
        required : true
    },
    thumbnailUrl : {
        type : String,        //cloudinary url
        required : true
    },
    title:{
        type : String,
        required : true,
    },
    duration : {
        type : Number,   // in seconds from cloudainary
        required : true
    },
    owner: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
    ],
    views :{
        type : Number,
        default : 0
    },
    description : {
        type : String,
        default : ""
    },
    isPublic : {
        type : Boolean,
        default : true
    },

}, {
    timestamps : true
})

videoSchema.plugin(aggregatePaginate)

export const Video = model("Video" , videoSchema)