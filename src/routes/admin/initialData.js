const router = require('express').Router();

const { initialData } = require('../../controllers/admin/initialData.controller');

router.post('/initialData', initialData);

module.exports = router;