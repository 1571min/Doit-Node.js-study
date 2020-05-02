const express = require('express');
const router = express.Router();

router.use('/process/adduser', require('./adduser.routes'));
router.use('/process/login', require('./authuser.routes'));

module.exports = router;
