const mongoose=require("mongoose")

const Course=new mongoose.Schema({
    
    title:{type:String},
    author:{type:String},
    imageUrl:{type:String},
    videoUrl:{type:String}
},
{
    collection:'course-data'
})

const model=mongoose.model('Course',Course)

module.exports=model