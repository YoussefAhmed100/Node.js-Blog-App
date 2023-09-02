const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const bodyParser = require("body-parser");
const multer =require("multer")
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")
const categoryRouter = require("./routes/categories")




app.get("/", (req, res) => {
  res.send("my home page");
});



mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true,
  })
  .then((res) => {
    console.log("mongodb connection successfully");
  })
  .catch((error) => {
    console.log(error);
  }); 

  //upload file 

  const storage = multer.diskStorage({
    destination:(req ,file,cb)=>{
      cb(null ,req.body.name)
    },filename:(req,file,cb)=>{
      cb(null,req.body.name )
    }
  });
  const upload = multer({storage:storage});
  app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
  })

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended:false}));




app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log("Backend server is running on port",PORT);
});
