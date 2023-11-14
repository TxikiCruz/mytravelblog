const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/commentsController');

router.get('/', controller.findAllComments);
router.post('/add', controller.addNewComment);
router.post('/delete', controller.deleteComment);
router.post('/update', controller.updateComment);

module.exports = router;