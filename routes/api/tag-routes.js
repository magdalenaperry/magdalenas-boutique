const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// SUCCESSFUL
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// SUCCESSFUL
router.get('/:id', async (req, res) => {
  try {
    // finds by the primary key
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    // server error
    console.log(err)
    res.status(500).json(err);
  }
});

// successful!
router.post('/', async(req, res) => {
  try {
    // pass it the req.body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    // when in doubt use 400 error
    res.status(400).json(err);
  }
  });

// successful
router.put('/:id', async (req, res) => {
try {
  const tagData = await Tag.update(req.body, {
    where: {id: req.params.id, 
    },
  });
  if (!tagData[0]){
    res.status(404).json({message: 'No tag ID.'})
    return;
  }
  res.status(200).json(tagData);
} catch(err){
  res.status(500).json(err);
}
});



// SUCCESSFUL
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
 try {
   const tagData = await Tag.destroy({
     where: { id: req.params.id }
   })

   if (!tagData) {
     res.status(404).json({
       message: 'No Product found with that ID.'
     });
     return;
   }
   res.status(200).json(tagData);
 } catch (err) {
   console.log(err);
   res.status(500).json(err);
 }
});

module.exports = router;
