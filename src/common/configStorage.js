const dotenv = require('dotenv');

class ConfigStorage {

	// Simplistic config storage that loads different config depending on the environment
	// If app is growing should be split by reference or by sources
	constructor() {
		if (process.env.NODE_ENV === 'DEV'){
			dotenv.config();
		}
		this.dbName = process.env.DB_NAME;
		this.dbHost = process.env.DB_HOST;
		this.dbPort = process.env.DB_PORT;
		this.port = process.env.PORT;

		this.TTL_MS=1000*20;
		this.CRYPTO_LENGTH=100;
		this.CACHE_MAX = 5;
	}

}

module.exports = new ConfigStorage();
