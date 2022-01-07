const router = require('express').Router();
const studentRouter = require('./profile');

// There's only 1 entity in this project "customers"
router.use('/students', studentRouter);

module.exports = router;