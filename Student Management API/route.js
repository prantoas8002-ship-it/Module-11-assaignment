const express = require('express');
const { test, registerUser, loginUser } = require('./controller');

const router = express.Router();

router.get('/', test);
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);


module.exports = router;