const baseLogger = require('./logger');
const configStorage = require('./configStorage');

/**
 * Includes things that are commonly imported into the modules of this app
 */
class BaseAppClass{
	constructor(config = configStorage, logger = baseLogger) {
		this.config = config;
		this.logger = logger;
	}
}

module.exports = BaseAppClass;