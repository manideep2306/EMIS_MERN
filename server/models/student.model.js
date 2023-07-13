const mongoose=require("mongoose")

const Stud=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    study:{type:Number,required:true},
    school:{type:String,required:true},
    aggr:{type:Number,required:true},
    gender:{type:String,required:true},
    dist:{type:String,required:true,ref: 'District' },
    schoolid:{type:mongoose.Schema.Types.ObjectId,ref:'School'},
    distid:{type:mongoose.Schema.Types.ObjectId,ref:'District'}
},
{
    collection:'student-data'
})

const model=mongoose.model('Student',Stud)

module.exports=model