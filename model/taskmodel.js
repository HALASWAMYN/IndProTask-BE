const mongoose = require('mongoose'); 

const taskSchema=new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        default:'todo'
    }

},
{
    timestamps:true
}
)
module.exports=mongoose.model('task',taskSchema)