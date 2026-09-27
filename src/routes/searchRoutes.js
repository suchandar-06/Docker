const express = require('express');
const router = express.Router();
const { searchTransport, getItemById } = require('../controllers/searchController');

router.get('/', searchTransport);
router.get('/:type/:id', getItemById);

module.exports = router;
