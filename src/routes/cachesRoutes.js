const express = require('express');
const router = express.Router();
const {CacheController} = require('../controllers');
const controller = new CacheController();

router.get('/:cacheKey', async function (req, res) {
	const result = await controller.get(req.params);
	res.send(result);
});

module.exports = router;