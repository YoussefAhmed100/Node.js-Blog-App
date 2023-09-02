const mongoose =require ("mongoose")



const userSchema =new mongoose.Schema({
    username: {
        type:String,
        required:[true , "Please enter your username"],
        unique :[true , "username alrdy token"],
        min:3,
        max:20
    },
    email :{
        type:String,
        required:[true , "Please enter your email"],
        unique :true,
        trim :true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email "
        ]

    },
    password :{
        type:String,
        required:[true , "Please enter your password"],
        minLength:[6 , "password must be up to 6 character"],


        
    },
    profilePic:{
        type:String,
        default:""
    }
 

 

},{timestamps:true});

 








module.exports = mongoose.model("User" , userSchema);
