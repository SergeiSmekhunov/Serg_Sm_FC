const { Schema, model } = require('mongoose');


const cacheSchema = new Schema({
	cacheKey: { type: String, default: '' },
	cacheData: { type: String, default: '' },
	accessedAt: {type: Date, default: Date.now}
});

/**
 * Middleware to keep track of cache access
 */


cacheSchema.post('findOne', async function() {
	await this.update({accessedAt: Date.now()});
});

cacheSchema.post('updateOne', async function() {
	await this.update({accessedAt: Date.now()});
});

cacheSchema.index({cacheKey:1});

module.exports = model('Cache', cacheSchema);