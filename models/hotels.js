const mongoose=require('mongoose');
const hotelsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    cusine:{
        type : Array , 
        default : [] 
    },
    address:{
        type: String
    }
}, {strict:false});
module.exports=mongoose.model('hotels',hotelsSchema);