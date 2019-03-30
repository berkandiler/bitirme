const mongoose=require('mongoose');

const productSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true}, // bilgi girilsin bos birakilmasin diye
    price:{type:Number,required:true},
    type:{type:String,required:true},
    productImage:{type:String},
    cafe:{type:mongoose.Schema.Types.ObjectId,ref:'Cafe',required:true},
});

module.exports=mongoose.model('Product',productSchema);