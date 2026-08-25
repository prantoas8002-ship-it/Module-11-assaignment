const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require("mongoose");
const { userModel, studentModel } = require("./model");

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

// creating students 

const createStudent = async (req, res) => {
    try {
        const info = req.body;
        const result = await studentModel.create(info);

        res.status(200).json({
            "operation": "success",
            "information": result
        })
    } catch (error) {
        console.log("error : ", error);
        res.status(500).json({
            "operation": "unsuccessfull",
        })
    }
}

// get all students

const getAllStudents = async (req, res) => {
    try {
        const result = await studentModel.find();

        res.status(200).json({
            "operation": "success",
            "information": result
        })
    } catch (error) {
        console.log("error : ", error);
        res.status(500).json({
            "operation": "unsuccessfull",
        })
    }
}

// get single student

const getSingleStudents = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await studentModel.findById(id);

        res.status(200).json({
            "operation": "success",
            "information": result
        })
    } catch (error) {
        console.log("error : ", error);
        res.status(500).json({
            "operation": "unsuccessfull"
        })
    }
}


// update student

const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const result = await studentModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// delete students

const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await studentModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = { test, registerUser, loginUser, createStudent, getAllStudents, getSingleStudents, updateStudent, deleteStudent };