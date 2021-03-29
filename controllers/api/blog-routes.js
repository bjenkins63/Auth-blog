const router = require('express').Router();
const Blog = require('../../models/blogModel');

// route to create/add a dish
router.post('/', async (req, res) => {
  try { 
    const blogData = await Blog.create({
    title: req.body.title,
    description: req.body.description,
  });
  res.status(200).json(blogData)
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {

  try {
    const blog = await Blog.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(blog);
  } catch (err) {
      res.status(500).json(err);
    };
});

module.exports = router;
