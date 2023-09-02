const router = require("express").Router();
const Category = require("../models/Category");



//create categories

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(200).json(err);
  }
});

//get categories
router.get("/", async (req, res) => {
  
    try {
        const category = await Category.find();
      res.status(200).json(category);
    } catch (err) {
      res.status(200).json(err);
    }
 });
  


module.exports = router;
