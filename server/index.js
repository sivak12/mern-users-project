const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://siva:siva1234@cluster0.ib9gvwr.mongodb.net/mernusers?retryWrites=true&w=majority");

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.post("/postUser", async(req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server Running.");
});