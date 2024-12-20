const express = require("express");

const bcrpt = require("bcrypt");

const User = require("../models/user");

const authRouter = express.Router()


authRouter.post("/signup", async(req, res) => {
    console.log(req.body);

    try{
        const {firtsName, lastName, phone, email, password} = req.body;

        const passwordHash = await bcrpt.hash(password, 10);
        const user = new User({
            firtsName, lastName, phone, email, password: passwordHash
        });

        await user.save();

        res.send("User added successfully");
    }catch(e) {
        res.status(400).send("Error savinfg the user: " + e.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            
            const token = await user.getJWT();
            //console.log(token);

            res.cookie("token", token, { expires: new Date(Date.now() + 900000)});
            res.send("Login successfull");
        }else {
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
