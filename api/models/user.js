const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
        email:{type : String,
            required:true, 
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },//match email bloguna email duzeninde yazi girilsin diye 
        password:{type :String ,required:true}
});

module.exports=mongoose.model('User',userSchema);