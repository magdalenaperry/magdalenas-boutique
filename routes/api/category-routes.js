const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // find all productsx
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  // be sure to include its associated Category and Tag data
  });





// SUCCESSFUL!
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  // finds by the primary key
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
  if (!categoryData) {
    res.status(404).json({
      message: 'No user with this id!'
    });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  // server error
  console.log(err)
  res.status(500).json(err);
}
});

// SUCCESSFUL!
router.post('/', async (req, res) => {
try {
  // pass it the req.body
  const categoryData = await Category.create(req.body);
  res.status(200).json(categoryData);
} catch (err) {
  // when in doubt use 400 error
  res.status(400).json(err);
}
});



// SUCCESSFUL!
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData[0]) {
    res.status(404).json({
      message: 'No category ID.'
    })
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});







router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({
        message: 'No Category found with that ID.'
      });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });;

module.exports = router;
