const express = require('express');
const router = express.Router();
const controller = require('../controllers/blog.controller');

router.get('/', controller.getBlogs);
router.post('/', controller.createBlog);
router.put('/:id', controller.updateBlog);
router.get('/:id', controller.getBlogById);
router.delete('/:id', controller.deleteBlog);
router.put('/like/:id', controller.likeBlog);
router.put('/view/:id', controller.viewBlog);
module.exports = router;