const mongoose=require('mongoose')

const scoreSchema=new mongoose.Schema({
    score:{
        type:Number,
        require:true
    },
    player:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('Score',scoreSchema)