const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true }
});

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, requied: true }
});


const studentModel = mongoose.model('Student', studentSchema);
const userModel = mongoose.model('User', userSchema);


module.exports = { studentModel, userModel };