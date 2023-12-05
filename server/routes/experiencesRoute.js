const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/experiencesController');

router.get('/', controller.findAllExperiences);
router.get('/:id', controller.findExperience);
router.post('/add', controller.addNewExperience);
router.post('/delete', controller.deleteExperience);
router.post('/update', controller.updateExperience);
router.post('/update_score', controller.updateScoreExperience);

module.exports = router;