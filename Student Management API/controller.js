const bcrypt = require('bcrypt');
const { default: mongoose } = require("mongoose");
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

module.exports = { test, registerUser };