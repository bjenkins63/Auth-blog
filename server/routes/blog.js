const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')




router.get('/', blogController.view);






module.exports = router;