const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get All Tags 
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({
        message: 'No Tags found.'
      });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Tags by ID 
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Tags
router.post('/', async(req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.status(404).json({
        message: 'Tag was not created.'
      });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  });

// Update Tags by ID 
router.put('/:id', async (req, res) => {
try {
  const tagData = await Tag.update(req.body, {
    where: {id: req.params.id, 
    },
  });
  if (!tagData[0]){
    res.status(404).json({message: 'No tag found with this ID.'})
    return;
  }
  res.status(200).json(tagData);
} catch(err){
  res.status(500).json(err);
}
});

// Delete Tags by ID 
router.delete('/:id', async (req, res) => {
 try {
   const tagData = await Tag.destroy({
     where: { id: req.params.id }
   })
   if (!tagData) {
     res.status(404).json({
       message: 'No Tag found with this ID.'
     });
     return;
   }
   res.status(200).json(tagData);
 } catch (err) {
   res.status(500).json(err);
 }
});

module.exports = router;
