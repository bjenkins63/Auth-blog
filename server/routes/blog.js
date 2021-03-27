const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')




router.get('/', blogController.view);
// router.post('/', blogController.find);
router.get('/addBlog', blogController.form);






module.exports = router;