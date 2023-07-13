const mongoose=require("mongoose")

const School=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    distr:{type:String,required:true},
    distid:{type:mongoose.Schema.Types.ObjectId,ref:'District'}
},
{
    collection:'school-data'
})

const model=mongoose.model('School',School)

module.exports=model