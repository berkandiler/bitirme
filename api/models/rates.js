const mongoose=require('mongoose');


const rateSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    cafeRate:{type:Number,default:1}, // bilgi girilsin bos birakilmasin diye
    rateCount:{type:Number,default:1},
    cafe:{type:mongoose.Schema.Types.ObjectId,ref:'Cafe',required:true},
    
});
module.exports=mongoose.model('Rate',rateSchema);