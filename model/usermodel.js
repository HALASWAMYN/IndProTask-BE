const mongoose = require('mongoose'); 
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }


},
{
    timeseries:true
}
);

//encrpting password before saving in the db

userSchema.pre("save", async function (){
    if(this.isModified("password")){
        const salt = await bcrypt.genSaltSync(10);
        this.password=await bcrypt.hash(this.password,salt)
    }
})


module.exports = mongoose.model('User', userSchema);