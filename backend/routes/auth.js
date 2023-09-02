const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
     try {
          //generate password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          //create new user
          const newUser = new User({
               username: req.body.username,
               email: req.body.email,
               password: hashedPassword,
          });
          //save new User
          const user = await newUser.save();
          res.status(200).json(user);
     } catch (err) {
          res.status(500).json(err);
     }
});

// login
router.get("/login", async(req,res)=>{
    try {
      //find user 
      const user =await User.findOne({username:req.body.username})
      !user && res.status(400).json("invalid username or Password ")
 
 
      //compare password
      const validPassword =await bcrypt.compare(req.body.password , user.password);
      !validPassword && res.status(400).json("invalid username or password")
      //send response
      const {password ,...others}= user._doc
      res.status(200).json(others)
     
    } catch (err) {
     res.status(500).json(err);

     
    }
})


module.exports = router
