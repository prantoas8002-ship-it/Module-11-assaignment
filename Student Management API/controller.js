const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require("mongoose");
const { userModel } = require("./model");

const test = async (req, res) => {
    try {
        res.status(200).json({
            "status": "true",
            "message": "all ok!"
        })
    } catch (error) {
        res.status(500).json({
            "status": "false",
            "message": error
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const info = req.body;

        info.password = await bcrypt.hash(info.password, 10);

        const result = await userModel.create(info);

        res.status(200).json({
            "message": "user register successfully...",
            "information": result
        })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            "message": "error register",
            "error": error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const info = req.body;
        const user = await userModel.findOne({ "email": info.email });
        if (!user) {
            return res.status(401).json({ message: "invalid username or password" });
        }
        const isMatch = await bcrypt.compare(info.password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            )
            res.status(200).json({
                message: "login successfull!",
                token: token
            })
        }
        else {
            res.status(401).json({ message: "invalid username or password" });
        }

    } catch (error) {
        console.error("login falid : ", error);
        res.status(500).json({
            message: "invalid username or password"
        })
    }
}

module.exports = { test, registerUser, loginUser };