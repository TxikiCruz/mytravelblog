const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/scoresController');

router.get('/', controller.findAllScores);
router.post('/add', controller.addNewScore);
router.post('/delete', controller.deleteScore);
router.post('/update', controller.updateScore);

module.exports = router;