const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// Use `/api/categories` in Insomnia

// Find all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product
      }],
    });
    if (!categoryData) {
      res.status(404).json({
        message: 'No categories found!'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Get Categories by ID
router.get('/:id', async (req, res) => {
  try {
    // finds by the primary key
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!categoryData) {
      res.status(404).json({
        message: 'No category found with this id.'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Categories
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    if (!categoryData) {
      res.status(404).json({
        message: 'Category was not created.'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({
        message: 'No category found with this id.'
      })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete category by ID 
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({
        message: 'No Category found with this id.'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;