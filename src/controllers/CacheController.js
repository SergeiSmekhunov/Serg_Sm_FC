const { cacheModel } = require('../models');
const { BaseAppClass } = require('../common');

class CacheController extends  BaseAppClass {
	constructor(model = cacheModel, config, logger) {
		super(config, logger);
		this.model = model;
	}

	async save (cacheKey, cacheData){

	}

	async get(cacheKey){
		const cache = await this.model.findOne(cacheKey);
		return cache.cacheData;
	}

	async update (cacheKey, cacheData) {

	}

	async delete (cacheId){

	}


	async deleteAll () {

	}

	async retrieveAll () {

	}


}

module.exports = CacheController;