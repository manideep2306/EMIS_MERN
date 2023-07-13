const mongoose=require("mongoose")

const comment=new mongoose.Schema({
    text:{type:String,required:true},
    name:{type:String,required:true},
    videoid:{type:mongoose.Schema.Types.ObjectId,ref:'Videos'},
    timestamp: { type: Date, required: true},
},
{
    collection:'comment-data'
})

const model=mongoose.model('comment',comment)

module.exports=model