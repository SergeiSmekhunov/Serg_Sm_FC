const mongoose = require('mongoose');

const {BaseAppClass} = require ('../common');

mongoose.Promise = Promise;

class MongooseConnector extends BaseAppClass{
	async  getConnection() {
		mongoose.connection
			.on('error', this.logger.error)
			.on('connected', () => this.logger.info('Connection Established'));

		await mongoose.connect(
			`mongodb://${this.config.dbHost}:${this.config.dbPort}/${this.config.dbName}`,
			{
				autoReconnect: true,
				reconnectTries: 10,
				reconnectInterval: 2000,
				useNewUrlParser: true
			});
	}
}


module.exports = MongooseConnector;