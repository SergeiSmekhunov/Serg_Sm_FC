const express = require('express');
const router = express.Router();
const {CacheController} = require('../controllers');
const controller = new CacheController();

router.get('/:cacheKey', async function (req, res) {
	const result = await controller.get(req.params.cacheKey);
	res.send(result);
});

router.delete('/:cacheKey', async function (req, res) {
	const result = await controller.delete(req.params.cacheKey);
	res.send(result);

});

router.put('/:cacheKey', async function (req, res) {
	const result = await controller.update(req.params.cacheKey, req.body.cacheData);

	if (!result){
		res.status(404).send('Cannot update key: value not found');
	} else {
		res.send(result);
	}

});

router.get('/', async function (req, res) {
	const result = await controller.retrieveAllKeys(req.params.cacheKey);
	res.send(result);
});

router.delete('', async function (req, res) {
	const result = await controller.deleteAll();
	res.send(result);
});



module.exports = router;