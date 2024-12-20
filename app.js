const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const dbconnect = require("database")

app.use(server);

const port = 2020;

app.listen(port, server) = () => {
    console.log("server Started on port `$port`");
}

app.post("/signup", req, res) = () => {

    const { email, phone, password, cpassword } = req.body;

    if(!email) {
        res.send("Email required");
        return;
    }

    if(!phone) {
        res.send("Phone required");
        return;
    }

    if(!password) {
        res.send("password required");
        return;
    }

    if(password !== cpassword) {
        res.send("invalid password");
        return;
    }

    const user = new User();
    const result = user.insertOne({email: email, phone: phone, password: password});
    res.status(201).send("user registered successfully ", result);
}

app.get("/profile/_id", req, res) = () => {

    const { userId} = req.params._id;

    if(!userId) {
        res.send("User id not found");
        return;
    }
    const user = new User();
    const result = user.findOne({_id: userId});
    res.status(200).send("user", result);
}


app.update("/profile/_id", req, res) = () => {

    const { userId } = req.params._id;

    const {email, phone, name} =  req.body;


    if(!userId) {
        res.send("User id not found");
        return;
    }
    const user = new User();
    const result = user.updateOne({_id: userId, set:{email: email, phone: phone, name:name}});
    res.status(200).send("user", result);
}

app.get("/users", req, res) = () => {
    const user = new User();
    const result = user.find({});
    res.status(200).send("users", result);
}

app.get("/removeUser/_id", req, res) = () => {

    const { userId} = req.params._id;

    if(!userId) {
        res.send("User id not found");
        return;
    }
    const user = new User();
    const result = user.deleteOne({_id: userId});
    res.status(200).send("user", result);
}

exports.app = app;






