const crypto = require('crypto');


const { cacheModel } = require('../models');
const { BaseAppClass } = require('../common');


class CacheController extends  BaseAppClass {
	constructor(model = cacheModel, config, logger) {
		super(config, logger);
		this.model = model;
	}

	generateCacheData() {
		return crypto.randomBytes(this.config.CRYPTO_LENGTH)
			.toString('base64');
	}

	async save(cacheKey, cacheData){
		const newCache = await this.model.findOneAndUpdate(
			{cacheKey},
			{
				cacheKey,
				cacheData,
			},
			{
				upsert:true,
				new: true
			}
		);

		const cacheCount = await this.model.count();

		if (cacheCount>this.config.CACHE_MAX) {
			await this.model
				.deleteOne({})
				.sort({'accessedAt': -1});
		}

		return newCache;
	}

	async get(cacheKey){
		let cache = await this.model.findOne({
			cacheKey,
			accessedAt: { $gt: Date.now() - this.config.TTL_MS}
		});

		if (!cache) {
			this.logger.info('Cache miss');
			cache  =  await this.save(cacheKey, this.generateCacheData());
		} else {
			this.logger.info('Cache hit');
		}

		return cache.cacheData;
	}

	async update(cacheKey, cacheData) {
		const newCache = await this.model.findOneAndUpdate(
			{cacheKey},
			{
				cacheKey,
				cacheData,
			},
			{
				new: true
			}
		);

		return newCache;
	}

	async delete (cacheKey){
		return this.model.deleteOne(
			{cacheKey},
		);
	}


	async deleteAll () {
		return this.model.delete({});
	}

	async retrieveAllKeys () {
		const entries = await this.model.find({});

		return entries.map(entry=>entry.cacheKey);
	}


}

module.exports = CacheController;