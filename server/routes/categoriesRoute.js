const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/categoriesController');

router.get('/', controller.findAllCategories);
router.post('/add', controller.addNewCategory);
router.post('/delete', controller.deleteCategory);
router.post('/update', controller.updateCategory);
router.get('/:category', controller.findOneCategory);

module.exports = router;