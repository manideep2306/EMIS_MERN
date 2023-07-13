const mongoose=require("mongoose")

const District=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dist:{type:String,required:true,unique:true},
},
{
    collection:'district-data'
})

const model=mongoose.model('District',District)

module.exports=model