const dotenv = require('dotenv');

class ConfigStorage {

	// Simplistic config storage that loads different config depending on the environment
	constructor() {
		if (process.env.NODE_ENV === 'DEV'){
			dotenv.config();
		}
		this.dbName = process.env.DB_NAME;
		this.dbHost = process.env.DB_HOST;
		this.dbPort = process.env.DB_PORT;
		this.port = process.env.PORT;
	}
}

module.exports = new ConfigStorage();
