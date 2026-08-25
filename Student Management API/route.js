const express = require('express');
const { test, registerUser, loginUser, createStudent, getAllStudents, getSingleStudents, updateStudent, deleteStudent } = require('./controller');
const authMiddleware = require('./middleware');

const router = express.Router();

router.get('/', test);
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/students', authMiddleware, createStudent);
router.get('/students', authMiddleware, getAllStudents);
router.get('/students/:id', authMiddleware, getSingleStudents);
router.put("/api/students/:id", authMiddleware, updateStudent);
router.delete("/api/students/:id", authMiddleware, deleteStudent);



module.exports = router;