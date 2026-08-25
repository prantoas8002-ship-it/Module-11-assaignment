const express = require('express');
const { test, registerUser } = require('./controller');

const router = express.Router();

router.get('/', test);
router.post('/auth/register', registerUser);


module.exports = router;