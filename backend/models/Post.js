const mongoose =require ("mongoose")

const postSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
   
    title:{
        type:String,
        required:true,
        min:3,
        unique:true

    },
    desc:{
        type:String,
        required:true,
        min:3

    },
    photo:{
        type:String,
        required:false,
       
    },
    categories:{
        type:Array ,
        required:false,
      
     
       
    },
 

  
 

 

},{timestamps:true});






const Post = mongoose.model("Post" , postSchema);
module.exports = Post;