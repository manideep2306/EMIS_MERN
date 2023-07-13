const mongoose=require("mongoose")

const Faculty=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    subject:{type:String,required:true},
    school:{type:String,required:true},
    dist:{type:String,required:true},
    schoolid:{type:mongoose.Schema.Types.ObjectId,ref:'School'},
    distid:{type:mongoose.Schema.Types.ObjectId,ref:'District'}
},
{
    collection:'faculty-data'
})

const model=mongoose.model('Faculty',Faculty)

module.exports=model