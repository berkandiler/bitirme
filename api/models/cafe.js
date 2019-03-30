const mongoose=require('mongoose');

const cafeSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    cafeName:{type:String,required:true}, 
    cafeImage:{type:String},
    rateOfCafe:{type:Number,default:0},
});

module.exports=mongoose.model('Cafe',cafeSchema);