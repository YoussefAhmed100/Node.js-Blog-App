const router = require("express").Router();
const User = require("../models/userModel");
const Post = require("../models/Post");

// create anew post

router.post("/create", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Updated Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can Update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(200).json("you can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all post
router.get("/", async (req, res) => {
    const username = req.query.username;
    const catName = req.query.cat
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if (catName){
            posts = await Post.find({categories:{$in:[catName]}});
        }else{
            posts = await Post.find();

        };
        res.status(200).json(posts)
      
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
