const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
userRouter.get("/users", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      message: "Data fetched successfully",
      data: users,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

userRouter.post("/user", userAuth, async (req, res) => {
  
})


module.exports = userRouter;
