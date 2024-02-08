const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')
const validator = require('validator')



const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        isUnique:true
    },
    password:{
        type:String,
        required:true,
        
    }

   

})

//static signup
userSchema.statics.signup=async function(email,password){

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Enter a valid email address')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }


    // email already in use
    const exist=await this.findOne({email})
    if (exist){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})
    return user
}


//static login
userSchema.statics.login=async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    //check email matches
    const user=await this.findOne({email})

    if (!user){
        throw Error('Incorrect password or email')
    }

    //check if passwords match
    const match=await bcrypt.compare(password,user.password)
    if (!match){
        throw Error('Incorrect password or email')

    }
    return user
}

module.exports=mongoose.model('User',userSchema)