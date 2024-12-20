const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const authRouter = require("./auth");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;;
        if(!user) {
            throw new Error("User doesnot exist");
        }
        
        res.send(user);
    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
     
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your profile updated successfully`);
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;
